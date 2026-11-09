"use client";

import { useMemo, useState } from "react";
import { parseUnits } from "viem";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Coins,
  ExternalLink,
  Flame,
  Loader2,
  Lock,
  Sparkles,
  Timer,
  Wallet,
} from "lucide-react";
import { ConnectWallet } from "@/components/staking/ConnectWallet";
import { calcReward, maxPrincipalForPool, type useStaking } from "@/components/staking/useStaking";
import { fmtApr, fmtDate, fmtDays, fmtDom, isValidAmountInput } from "@/components/staking/format";
import { EXPLORER_URL, stakingRules } from "@/content/staking.config";
import { cn } from "@/lib/utils";

type S = ReturnType<typeof useStaking>;

export function StakePanel({
  s,
  planId: controlledPlanId,
  onPlanChange,
}: {
  s: S;
  planId?: number;
  onPlanChange?: (id: number) => void;
}) {
  const defaultPlan = s.plans[1]?.active ? 1 : (s.plans.find((p) => p.active)?.id ?? 0);
  const [internalPlanId, setInternalPlanId] = useState<number>(defaultPlan);
  const planId = controlledPlanId ?? internalPlanId;
  const setPlanId = (id: number) => {
    setInternalPlanId(id);
    onPlanChange?.(id);
    if (s.txStatus === "error") s.clearTx();
  };

  const [input, setInput] = useState("");

  const plan = s.plans.find((p) => p.id === planId) ?? s.plans[0];

  const amount: bigint | null = useMemo(() => {
    if (!input || input === ".") return null;
    try {
      return parseUnits(input, s.decimals);
    } catch {
      return null;
    }
  }, [input, s.decimals]);

  const reward = amount && plan ? calcReward(amount, plan.aprBps, plan.durationSec) : 0n;

  // Maximum principal that the current on-chain reward pool can cover for the selected plan
  const poolMaxPrincipal: bigint | null = useMemo(() => {
    if (!s.stats || !plan) return null;
    return maxPrincipalForPool(s.stats.rewardPool, plan.aprBps, plan.durationSec);
  }, [s.stats, plan]);

  const validation: string | null = (() => {
    if (amount === null || amount === 0n) return null;
    if (amount < s.minStake) return `Minimum stake is ${fmtDom(s.minStake)} DOM.`;
    if (s.maxStake > 0n && amount > s.maxStake) return `Maximum per position is ${fmtDom(s.maxStake)} DOM.`;
    if (s.isConnected && s.balance !== undefined && amount > s.balance) return "Amount exceeds your DOM balance.";
    if (plan && !plan.active) return "This plan is not accepting new stakes.";
    if (s.stats && reward > s.stats.rewardPool) {
      if (poolMaxPrincipal !== null && poolMaxPrincipal >= s.minStake) {
        return `Reward pool can currently cover up to ${fmtDom(poolMaxPrincipal)} DOM on ${plan.name}.`;
      }
      return "The reward pool is currently awaiting top-up for this plan. Try a shorter term or check back soon.";
    }
    return null;
  })();

  const needsApproval = s.isConnected && amount !== null && amount > 0n && s.allowance < amount;
  const canSubmit =
    s.isConnected &&
    s.live &&
    !s.stats?.paused &&
    amount !== null &&
    amount > 0n &&
    !validation &&
    !s.busy &&
    !s.wrongNetwork;

  const setPct = (pct: number) => {
    if (s.txStatus === "error") s.clearTx();
    if (s.balance !== undefined && s.isConnected) {
      let v = (s.balance * BigInt(pct)) / 100n;
      if (s.maxStake > 0n && v > s.maxStake) v = s.maxStake;
      if (poolMaxPrincipal !== null && poolMaxPrincipal >= s.minStake && v > poolMaxPrincipal) {
        v = poolMaxPrincipal;
      }
      const str = fmtDom(v, pct === 100 ? 18 : 6).replace(/,/g, "");
      setInput(str);
      return;
    }
    // Calculator presets for visitors who haven't connected their wallet yet
    const presetMap: Record<number, string> = {
      25: "1000",
      50: "5000",
      75: "10000",
      100: "50000",
    };
    setInput(presetMap[pct] ?? "1000");
  };

  const fillPoolMax = () => {
    if (poolMaxPrincipal === null || poolMaxPrincipal <= 0n) return;
    let v = poolMaxPrincipal;
    if (s.maxStake > 0n && v > s.maxStake) v = s.maxStake;
    if (s.isConnected && s.balance !== undefined && v > s.balance) v = s.balance;
    setInput(fmtDom(v, 2).replace(/,/g, ""));
  };

  const onSubmit = async () => {
    if (!canSubmit || amount === null || !plan) return;
    if (needsApproval) {
      await s.approve();
      return;
    }
    const hash = await s.stake(amount, plan.id);
    if (hash) setInput("");
  };

  const unlockAt = plan ? Math.floor(Date.now() / 1000) + plan.durationSec : 0;
  const termReturnPct = plan
    ? ((plan.aprBps / 100) * (plan.durationSec / 86_400)) / 365
    : 0;

  let buttonLabel = "Stake DOM";
  if (!s.live) buttonLabel = "Staking opens soon";
  else if (s.stats?.paused) buttonLabel = "New stakes paused";
  else if (s.busy && s.action?.kind === "approve") buttonLabel = "Approving DOM…";
  else if (s.busy && s.action?.kind === "stake") buttonLabel = "Staking DOM…";
  else if (needsApproval) buttonLabel = "Step 1: Approve DOM";
  else if (amount && amount > 0n) buttonLabel = `Stake ${fmtDom(amount)} DOM`;

  return (
    <div id="stake-panel" className="surface-panel flex h-full flex-col p-6 sm:p-8">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="heading-md">Stake DOM</h2>
          <p className="mt-0.5 text-xs text-ink-faint">
            Select a lock period & calculate your guaranteed maturity reward
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
          <Lock className="h-3.5 w-3.5" />
          Fixed-term
        </span>
      </div>

      {/* Plan selector */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">1. Choose a term</p>
        {plan && (
          <span className="text-[11px] font-medium text-emerald-glow">
            +{termReturnPct.toFixed(2)}% total return over {fmtDays(plan.durationSec)}
          </span>
        )}
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        {s.plans.map((p) => {
          const isSelected = p.id === planId;
          const badge = p.id === 1 ? "Popular" : p.id === 2 ? "Best APR" : null;
          return (
            <button
              key={p.id}
              type="button"
              disabled={!p.active}
              onClick={() => setPlanId(p.id)}
              className={cn(
                "relative flex flex-col items-center gap-0.5 rounded-xl border px-2 py-3.5 text-center transition-all disabled:cursor-not-allowed disabled:opacity-40",
                isSelected
                  ? "border-gold/70 bg-gradient-to-b from-gold/15 to-gold/5 shadow-glow-gold"
                  : "border-white/[0.08] bg-white/[0.02] hover:border-gold/30 hover:bg-white/[0.04]"
              )}
            >
              {badge && (
                <span
                  className={cn(
                    " -top-2.5 absolute inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                    p.id === 2
                      ? "border-emerald-glow/40 bg-void-100 text-emerald-glow"
                      : "border-gold/40 bg-void-100 text-gold"
                  )}
                >
                  {p.id === 2 ? <Flame className="h-2.5 w-2.5" /> : <Sparkles className="h-2.5 w-2.5" />}
                  {badge}
                </span>
              )}
              <span className="mt-0.5 font-display text-lg text-gold sm:text-xl">{fmtApr(p.aprBps)}</span>
              <span className="text-[10px] uppercase tracking-wider text-ink-faint">APR</span>
              <span className="mt-1 rounded-md bg-white/[0.05] px-2 py-0.5 text-xs font-semibold text-ink">
                {fmtDays(p.durationSec)}
              </span>
              <span className="mt-0.5 hidden text-[10px] text-ink-faint sm:block">{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Amount & Calculator — always interactive even before connecting wallet */}
      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-ink-faint">2. Enter amount</span>
          {s.isConnected ? (
            <button
              type="button"
              onClick={() => setPct(100)}
              disabled={s.balance === undefined}
              className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-gold"
            >
              <Wallet className="h-3.5 w-3.5 text-gold" />
              <span>Balance:</span>
              <span className="font-semibold text-ink">{fmtDom(s.balance)} DOM</span>
            </button>
          ) : (
            <span className="text-ink-faint">Min {fmtDom(s.minStake)} DOM</span>
          )}
        </div>

        <div
          className={cn(
            "mt-2 flex items-center gap-2 rounded-xl border bg-white/[0.02] px-4 py-3 transition-colors",
            validation ? "border-torch/50 bg-torch/[0.02]" : "border-white/[0.08] focus-within:border-gold/50"
          )}
        >
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={input}
            onChange={(e) => {
              const v = e.target.value.replace(",", ".");
              if (isValidAmountInput(v)) {
                setInput(v);
                if (s.txStatus === "error") s.clearTx();
              }
            }}
            className="w-full bg-transparent text-xl font-semibold text-ink outline-none placeholder:text-ink-faint"
            aria-label="Amount to stake"
          />
          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-ink-faint hover:bg-white/5 hover:text-ink"
            >
              Clear
            </button>
          )}
          <span className="rounded-lg border border-gold/25 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold">
            DOM
          </span>
        </div>

        {/* Quick-fill buttons */}
        <div className="mt-2 flex gap-2">
          {s.isConnected
            ? [25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPct(p)}
                  disabled={s.balance === undefined}
                  className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5 text-xs font-semibold text-gold transition-colors hover:border-gold/30 hover:bg-gold/10 disabled:opacity-40"
                >
                  {p === 100 ? "MAX" : `${p}%`}
                </button>
              ))
            : [
                { label: "1,000", val: "1000" },
                { label: "5,000", val: "5000" },
                { label: "10,000", val: "10000" },
                { label: "50,000", val: "50000" },
              ].map((preset) => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setInput(preset.val)}
                  className={cn(
                    "flex-1 rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors",
                    input === preset.val
                      ? "border-gold/50 bg-gold/15 text-gold"
                      : "border-white/10 bg-white/[0.02] text-ink-muted hover:border-gold/30 hover:text-gold"
                  )}
                >
                  {preset.label}
                </button>
              ))}
        </div>

        {/* Validation or Pool capacity hint */}
        {validation && (
          <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg border border-torch/30 bg-torch/10 px-3 py-2 text-xs text-torch">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              {validation}
            </span>
            {s.stats &&
              reward > s.stats.rewardPool &&
              poolMaxPrincipal !== null &&
              poolMaxPrincipal >= s.minStake && (
                <button
                  type="button"
                  onClick={fillPoolMax}
                  className="shrink-0 rounded-md border border-torch/40 bg-torch/20 px-2 py-0.5 text-[11px] font-bold text-ink hover:bg-torch/30"
                >
                  Use Max
                </button>
              )}
          </div>
        )}

        {/* Reward Summary Box */}
        {plan && (
          <dl className="mt-5 space-y-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm">
            <Row label="Selected plan" value={`${plan.name} (${fmtDays(plan.durationSec)})`} />
            <Row label="Fixed APR" value={`${fmtApr(plan.aprBps)} (+${termReturnPct.toFixed(2)}% term)`} />
            <Row
              label="Guaranteed reward"
              value={amount && amount > 0n ? `+${fmtDom(reward, 4)} DOM` : "0 DOM"}
              highlight={!!amount && amount > 0n}
            />
            <div className="my-1 h-px bg-white/[0.06]" />
            <Row
              label="Total at maturity"
              value={amount && amount > 0n ? `${fmtDom(amount + reward, 4)} DOM` : "—"}
              highlight={!!amount && amount > 0n}
            />
            <Row label="Unlocks on" value={amount && amount > 0n ? `≈ ${fmtDate(unlockAt)}` : fmtDays(plan.durationSec)} />
            {s.stats && poolMaxPrincipal !== null && (
              <div className="flex items-center justify-between gap-4 pt-1 text-xs">
                <dt className="flex items-center gap-1 text-ink-faint">
                  <Coins className="h-3 w-3 text-gold" />
                  Pool capacity ({plan.name})
                </dt>
                <dd className="text-right font-mono text-ink-muted">
                  {poolMaxPrincipal >= s.minStake
                    ? `Up to ${fmtDom(poolMaxPrincipal > s.maxStake && s.maxStake > 0n ? s.maxStake : poolMaxPrincipal, 0)} DOM`
                    : "Awaiting reward top-up"}
                </dd>
              </div>
            )}
          </dl>
        )}

        {/* Action area */}
        <div className="mt-auto pt-6">
          {!s.isConnected ? (
            <div className="flex flex-col items-center gap-2.5 rounded-xl border border-gold/20 bg-gold/[0.04] p-4 text-center">
              <p className="text-xs text-ink-muted">
                Connect your BNB Smart Chain wallet to lock DOM and reserve your reward on-chain.
              </p>
              <ConnectWallet className="w-full" />
            </div>
          ) : s.wrongNetwork ? (
            <div className="flex flex-col items-center gap-2.5 rounded-xl border border-torch/30 bg-torch/5 p-4 text-center">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-torch">
                <AlertTriangle className="h-4 w-4" /> Wrong network — switch to {s.chainName}
              </p>
              <button
                type="button"
                onClick={s.switchToStakingChain}
                disabled={s.isSwitching}
                className="btn-primary w-full"
              >
                {s.isSwitching ? "Switching…" : `Switch to ${s.chainName}`}
              </button>
            </div>
          ) : (
            <>
              {/* 2-step indicator when amount is valid */}
              {amount !== null && amount > 0n && !validation && s.live && !s.stats?.paused && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs">
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                      needsApproval
                        ? "bg-gold text-void"
                        : "bg-emerald-glow/20 text-emerald-glow"
                    )}
                  >
                    {needsApproval ? "1" : <Check className="h-3 w-3" />}
                  </span>
                  <span className={cn("font-semibold", needsApproval ? "text-ink" : "text-emerald-glow")}>
                    Approve DOM
                  </span>
                  <span className="mx-1 h-px flex-1 bg-white/10" />
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                      !needsApproval ? "bg-gold text-void" : "bg-white/10 text-ink-faint"
                    )}
                  >
                    2
                  </span>
                  <span className={cn("font-semibold", !needsApproval ? "text-ink" : "text-ink-faint")}>
                    Stake DOM
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {s.busy && (s.action?.kind === "approve" || s.action?.kind === "stake") && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {buttonLabel}
              </button>
              <TxStatus s={s} kinds={["approve", "stake"]} />
            </>
          )}

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
            <Timer className="h-3.5 w-3.5 shrink-0 text-gold/70" />
            <span>
              Early exit &lt; {stakingRules.earlyWindowDays}d: {stakingRules.earlyPenaltyPct}% fee · ≥{" "}
              {stakingRules.earlyWindowDays}d: 0% principal fee (rewards forfeited)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={cn("text-right font-semibold", highlight ? "text-emerald-glow" : "text-ink")}>{value}</dd>
    </div>
  );
}

export function TxStatus({ s, kinds, positionId }: { s: S; kinds: string[]; positionId?: number }) {
  if (!s.action || !kinds.includes(s.action.kind)) return null;
  if (positionId !== undefined && s.action.positionId !== positionId) return null;
  const link = s.txHash ? (
    <a
      href={`${EXPLORER_URL}/tx/${s.txHash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-gold underline-offset-4 hover:underline"
    >
      View on BscScan <ExternalLink className="h-3 w-3" />
    </a>
  ) : null;

  switch (s.txStatus) {
    case "wallet":
      return (
        <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-ink-muted">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" /> Confirm the transaction in your wallet…
        </p>
      );
    case "pending":
      return (
        <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-ink-muted">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" /> Waiting for on-chain confirmation… {link}
        </p>
      );
    case "success":
      return (
        <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-emerald-glow">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {s.action.kind === "approve"
            ? "DOM approved! Click Stake DOM above to lock your position."
            : s.action.kind === "stake"
              ? "Stake confirmed on-chain!"
              : "Withdrawal confirmed on-chain!"}{" "}
          {link}
        </p>
      );
    case "error":
      return (
        <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-torch">
          <AlertTriangle className="h-3.5 w-3.5" /> {s.txError ?? "Transaction failed."} {link}
        </p>
      );
    default:
      return null;
  }
}
