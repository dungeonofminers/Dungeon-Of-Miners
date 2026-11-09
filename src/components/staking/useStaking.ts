"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { erc20Abi, maxUint256 } from "viem";
import { domStakingAbi } from "@/lib/stakingAbi";
import { DOM_TOKEN_ADDRESS, stakingChain } from "@/lib/wagmi";
import {
  STAKING_CHAIN_ID,
  STAKING_CONTRACT_ADDRESS,
  isStakingLive,
  plannedPlans,
  planNames,
  stakingRules,
} from "@/content/staking.config";

const DAY = 86_400;
const YEAR = 365n * 86_400n;
const BPS = 10_000n;
const DECIMALS = 18;

export type UiPlan = {
  id: number;
  name: string;
  durationSec: number;
  aprBps: number;
  active: boolean;
};

export type UiPosition = {
  id: number;
  planId: number;
  planName: string;
  amount: bigint;
  reward: bigint;
  start: number;
  end: number;
  closed: boolean;
};

export type TxAction = "approve" | "stake" | "unstake";

/** Same formula as DomStaking._reward (simple APR, floor division). */
export function calcReward(amount: bigint, aprBps: number, durationSec: number): bigint {
  return (amount * BigInt(aprBps) * BigInt(durationSec)) / (BPS * YEAR);
}

/**
 * Maximum principal that `rewardPool` can cover for a given plan so that
 * `calcReward(amount, aprBps, durationSec) <= rewardPool`.
 *
 * Because `calcReward(A) = floor(A * num / den)`, the largest integer `A`
 * satisfying `floor(A * num / den) <= R` is `floor(((R + 1) * den - 1) / num)`.
 */
export function maxPrincipalForPool(rewardPool: bigint, aprBps: number, durationSec: number): bigint {
  if (aprBps <= 0 || durationSec <= 0) return maxUint256;
  const num = BigInt(aprBps) * BigInt(durationSec);
  const den = BPS * YEAR;
  return ((rewardPool + 1n) * den - 1n) / num;
}

const contract = {
  address: (isStakingLive ? STAKING_CONTRACT_ADDRESS : undefined) as `0x${string}` | undefined,
  abi: domStakingAbi,
  chainId: stakingChain.id,
} as const;

export function useStaking() {
  const { address, isConnected, chainId } = useAccount();
  const wrongNetwork = isConnected && chainId !== stakingChain.id;
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  // ---- Protocol reads -----------------------------------------------------
  const core = useReadContracts({
    contracts: [
      { ...contract, functionName: "stats" },
      { ...contract, functionName: "getPlans" },
      { ...contract, functionName: "stakingToken" },
    ],
    query: { enabled: isStakingLive, refetchInterval: 20_000 },
  });

  const statsRaw = core.data?.[0]?.result;
  const plansRaw = core.data?.[1]?.result;
  const tokenFromChain = core.data?.[2]?.result;
  const tokenAddress: `0x${string}` | undefined =
    tokenFromChain ?? (STAKING_CHAIN_ID === 56 ? DOM_TOKEN_ADDRESS : undefined);

  const stats = statsRaw
    ? {
        totalStaked: statsRaw[0],
        totalReserved: statsRaw[1],
        rewardPool: statsRaw[2],
        totalRewardsPaid: statsRaw[3],
        totalPenalties: statsRaw[4],
        activeStakers: statsRaw[5],
        minStake: statsRaw[6],
        maxStake: statsRaw[7],
        paused: statsRaw[8],
      }
    : null;

  const plans: UiPlan[] = useMemo(() => {
    if (plansRaw && plansRaw.length > 0) {
      return plansRaw.map((p, i) => ({
        id: i,
        name: planNames[i] ?? `Plan ${i + 1}`,
        durationSec: Number(p.duration),
        aprBps: Number(p.aprBps),
        active: p.active,
      }));
    }
    return plannedPlans.map((p) => ({
      id: p.id,
      name: p.name,
      durationSec: p.days * DAY,
      aprBps: p.aprBps,
      active: true,
    }));
  }, [plansRaw]);

  const minStake = stats?.minStake ?? BigInt(stakingRules.minStake) * 10n ** 18n;
  const maxStake = stats ? stats.maxStake : BigInt(stakingRules.maxStake) * 10n ** 18n;

  // ---- User reads ---------------------------------------------------------
  const balance = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: stakingChain.id,
    query: { enabled: !!address && !!tokenAddress, refetchInterval: 20_000 },
  });

  const allowance = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: address && contract.address ? [address, contract.address] : undefined,
    chainId: stakingChain.id,
    query: { enabled: !!address && !!tokenAddress && isStakingLive },
  });

  const positionsQuery = useReadContract({
    ...contract,
    functionName: "getPositions",
    args: address ? [address] : undefined,
    query: { enabled: !!address && isStakingLive, refetchInterval: 30_000 },
  });

  const positions: UiPosition[] = useMemo(
    () =>
      (positionsQuery.data ?? []).map((p, i) => ({
        id: i,
        planId: Number(p.planId),
        planName: planNames[Number(p.planId)] ?? `Plan ${Number(p.planId) + 1}`,
        amount: p.amount,
        reward: p.reward,
        start: Number(p.start),
        end: Number(p.end),
        closed: p.closed,
      })),
    [positionsQuery.data]
  );

  // ---- Writes -------------------------------------------------------------
  const { writeContractAsync, reset: resetWrite } = useWriteContract();
  const [action, setAction] = useState<{ kind: TxAction; positionId?: number } | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [txError, setTxError] = useState<string | null>(null);
  const [awaitingWallet, setAwaitingWallet] = useState(false);

  const receipt = useWaitForTransactionReceipt({ hash: txHash, chainId: stakingChain.id });

  const refetchAll = useCallback(() => {
    core.refetch();
    balance.refetch();
    allowance.refetch();
    positionsQuery.refetch();
  }, [core, balance, allowance, positionsQuery]);

  useEffect(() => {
    if (receipt.isSuccess || receipt.isError) refetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt.isSuccess, receipt.isError]);

  const clearTx = useCallback(() => {
    setAction(null);
    setTxError(null);
    setTxHash(undefined);
    resetWrite();
  }, [resetWrite]);

  const run = useCallback(
    async (kind: TxAction, fn: () => Promise<`0x${string}`>, positionId?: number) => {
      setAction({ kind, positionId });
      setTxError(null);
      setTxHash(undefined);
      resetWrite();
      setAwaitingWallet(true);
      try {
        const hash = await fn();
        setTxHash(hash);
        return hash;
      } catch (err) {
        setTxError(friendlyError(err));
        return undefined;
      } finally {
        setAwaitingWallet(false);
      }
    },
    [resetWrite]
  );

  const approve = useCallback(
    () =>
      run("approve", () =>
        writeContractAsync({
          address: tokenAddress!,
          abi: erc20Abi,
          functionName: "approve",
          args: [contract.address!, maxUint256],
          chainId: stakingChain.id,
        })
      ),
    [run, writeContractAsync, tokenAddress]
  );

  const stake = useCallback(
    (amount: bigint, planId: number) =>
      run("stake", () =>
        writeContractAsync({
          ...contract,
          address: contract.address!,
          functionName: "stake",
          args: [amount, planId],
        })
      ),
    [run, writeContractAsync]
  );

  const unstake = useCallback(
    (positionId: number) =>
      run(
        "unstake",
        () =>
          writeContractAsync({
            ...contract,
            address: contract.address!,
            functionName: "unstake",
            args: [BigInt(positionId)],
          }),
        positionId
      ),
    [run, writeContractAsync]
  );

  const busy = awaitingWallet || (!!txHash && receipt.isLoading);
  const txStatus: "idle" | "wallet" | "pending" | "success" | "error" = awaitingWallet
    ? "wallet"
    : txError
      ? "error"
      : txHash && receipt.isLoading
        ? "pending"
        : txHash && receipt.isSuccess
          ? receipt.data?.status === "success"
            ? "success"
            : "error"
          : txHash && receipt.isError
            ? "error"
            : "idle";

  return {
    live: isStakingLive,
    address,
    isConnected,
    wrongNetwork,
    switchToStakingChain: () => switchChain({ chainId: stakingChain.id }),
    isSwitching,
    chainName: stakingChain.name,
    decimals: DECIMALS,
    stats,
    statsLoading: isStakingLive && core.isLoading,
    plans,
    minStake,
    maxStake,
    balance: balance.data,
    allowance: allowance.data ?? 0n,
    positions,
    positionsLoading: isStakingLive && positionsQuery.isLoading,
    approve,
    stake,
    unstake,
    clearTx,
    busy,
    action,
    txHash,
    txStatus,
    txError:
      txError ?? (receipt.data?.status === "reverted" ? "Transaction reverted on-chain." : null),
  };
}

const ERROR_TEXT: Record<string, string> = {
  BelowMinStake: "Amount is below the minimum stake.",
  AboveMaxStake: "Amount is above the maximum stake per position.",
  InsufficientRewardPool: "The reward pool can't cover this stake right now. Try a smaller amount or shorter plan.",
  PlanInactive: "This plan is not accepting new stakes.",
  InvalidPlan: "Unknown staking plan.",
  EnforcedPause: "New stakes are temporarily paused. Unstaking still works.",
  TooManyPositions: "This wallet has reached the maximum number of positions.",
  AlreadyClosed: "This position is already closed.",
  InvalidPosition: "Position not found.",
  UnsupportedToken: "Token transfer amount mismatch.",
  ERC20InsufficientAllowance: "Approval is too low. Approve DOM first.",
  ERC20InsufficientBalance: "Insufficient DOM balance.",
};

function friendlyError(err: unknown): string {
  const e = err as { shortMessage?: string; message?: string; name?: string; cause?: unknown };
  const text = `${e?.shortMessage ?? ""} ${e?.message ?? ""}`;
  if (/User rejected|User denied|rejected the request/i.test(text)) return "Transaction rejected in wallet.";
  for (const [name, msg] of Object.entries(ERROR_TEXT)) {
    if (text.includes(name)) return msg;
  }
  return e?.shortMessage ?? "Transaction failed. Please try again.";
}
