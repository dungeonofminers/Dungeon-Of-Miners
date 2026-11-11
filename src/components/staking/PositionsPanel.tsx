"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  History,
  Layers,
  Loader2,
  ShieldCheck,
  Unlock,
  X,
  Zap,
} from "lucide-react";
import { ConnectWallet } from "@/components/staking/ConnectWallet";
import type { UiPosition, useStaking } from "@/components/staking/useStaking";
import { TxStatus } from "@/components/staking/StakePanel";
import { fmtCountdown, fmtDate, fmtDom } from "@/components/staking/format";
import { stakingRules } from "@/content/staking.config";
import { cn } from "@/lib/utils";

type S = ReturnType<typeof useStaking>;

const EARLY_WINDOW = stakingRules.earlyWindowDays * 86_400;
const PENALTY_BPS = BigInt(stakingRules.earlyPenaltyPct * 100);

/** Mirrors DomStaking._exitQuote using the browser clock (the chain is final). */
function exitQuote(p: UiPosition, now: number) {
  if (now >= p.end) return { principal: p.amount, reward: p.reward, penalty: 0n, matured: true, inEarly: false };
  const inEarly = now < p.start + EARLY_WINDOW;
  const penalty = inEarly ? (p.amount * PENALTY_BPS) / 10_000n : 0n;
  return { principal: p.amount - penalty, reward: 0n, penalty, matured: false, inEarly };
}

function useNow(intervalMs = 5_000) {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function PositionsPanel({ s }: { s: S }) {
  const now = useNow(5_000);
  const [showHistory, setShowHistory] = useState(false);
  const [confirm, setConfirm] = useState<UiPosition | null>(null);

  const open = useMemo(() => s.positions.filter((p) => !p.closed).sort((a, b) => a.end - b.end), [s.positions]);
  const closed = useMemo(() => s.positions.filter((p) => p.closed).reverse(), [s.positions]);

  const totals = useMemo(() => {
    let staked = 0n;
    let pending = 0n;
    let claimable = 0n;
    for (const p of open) {
      staked += p.amount;
      pending += p.reward;
      if (now >= p.end) claimable += p.amount + p.reward;
    }
    return { staked, pending, claimable };
  }, [open, now]);

  const onUnstake = async (p: UiPosition) => {
    const q = exitQuote(p, now);
    if (!q.matured) {
      setConfirm(p);
      return;
    }
    await s.unstake(p.id);
  };

  return (
    <div className="surface-panel flex h-full flex-col p-5 sm:p-8">
      <div className="flex items-start justify-between gap-2 sm:items-center">
        <div>
          <h2 className="heading-md">Your Positions</h2>
          <p className="mt-0.5 text-xs text-ink-faint">
            Track unlock countdowns and withdraw matured stakes
          </p>
        </div>
        {s.live && s.isConnected && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-glow sm:px-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-glow" />
            On-Chain
          </span>
        )}
      </div>

      {/* Summary stats always shown for visual balance */}
      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
        <Stat
          label="Active Staked"
          value={s.isConnected ? `${fmtDom(totals.staked)} DOM` : "0 DOM"}
        />
        <Stat
          label="Reserved Rewards"
          value={s.isConnected ? `+${fmtDom(totals.pending)} DOM` : "+0 DOM"}
          accent={s.isConnected && totals.pending > 0n}
        />
        <Stat
          label="Ready to Claim"
          value={s.isConnected ? `${fmtDom(totals.claimable)} DOM` : "0 DOM"}
          accent={s.isConnected && totals.claimable > 0n}
        />
      </div>

      {!s.isConnected ? (
        <div className="mt-5 flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">No wallet connected</p>
            <p className="mt-1 max-w-xs text-xs text-ink-muted">
              Connect your wallet to inspect active stakes, unlock timers, and past withdrawals.
            </p>
          </div>
          <ConnectWallet className="mt-1" />
        </div>
      ) : !s.live ? (
        <div className="mt-5 flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
          <Clock className="h-6 w-6 text-gold" />
          <p className="text-sm font-semibold text-ink">Your staked DOM will appear here once staking opens.</p>
        </div>
      ) : s.wrongNetwork ? (
        <div className="mt-5 flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-torch/30 bg-torch/5 p-8 text-center">
          <AlertTriangle className="h-6 w-6 text-torch" />
          <p className="text-sm font-semibold text-ink">Switch to {s.chainName} to view your positions</p>
          <button
            type="button"
            onClick={s.switchToStakingChain}
            disabled={s.isSwitching}
            className="btn-primary mt-1"
          >
            {s.isSwitching ? "Switching…" : `Switch to ${s.chainName}`}
          </button>
        </div>
      ) : (
        <div className="mt-5 flex flex-1 flex-col">
          <div className="flex-1 space-y-3">
            {s.positionsLoading && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-sm text-ink-faint">
                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                <span>Reading positions from BNB Smart Chain…</span>
              </div>
            )}
            {!s.positionsLoading && open.length === 0 && (
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-ink">No active stakes yet</p>
                <p className="max-w-xs text-xs text-ink-faint">
                  Choose a 30, 90, or 180-day plan on the left to lock DOM and reserve your fixed APR reward on-chain.
                </p>
              </div>
            )}
            {open.map((p) => (
              <PositionCard key={p.id} p={p} now={now} s={s} onUnstake={() => onUnstake(p)} />
            ))}
          </div>

          {closed.length > 0 && (
            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <button
                type="button"
                onClick={() => setShowHistory((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted transition-colors hover:text-gold"
              >
                <History className="h-3.5 w-3.5" />
                {showHistory ? "Hide" : "Show"} closed positions ({closed.length})
              </button>
              {showHistory && (
                <ul className="mt-3 space-y-2">
                  {closed.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-xs text-ink-faint"
                    >
                      <span className="font-medium text-ink-muted">
                        Position #{p.id + 1} · {p.planName}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-glow/70" />
                        {fmtDom(p.amount)} DOM · Withdrawn
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {confirm && (
        <EarlyUnlockModal
          p={confirm}
          now={now}
          busy={s.busy}
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            const id = confirm.id;
            setConfirm(null);
            await s.unstake(id);
          }}
        />
      )}
    </div>
  );
}

function PositionCard({ p, now, s, onUnstake }: { p: UiPosition; now: number; s: S; onUnstake: () => void }) {
  const q = exitQuote(p, now);
  const total = Math.max(1, p.end - p.start);
  const progress = Math.min(100, Math.max(0, ((now - p.start) / total) * 100));
  const thisBusy = s.busy && s.action?.kind === "unstake" && s.action.positionId === p.id;
  const earlyEnd = p.start + EARLY_WINDOW;

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        q.matured
          ? "border-emerald-glow/35 bg-emerald-glow/[0.04]"
          : "border-white/[0.08] bg-white/[0.02]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink-muted">
              #{p.id + 1}
            </span>
            <p className="text-sm font-semibold text-ink">
              {fmtDom(p.amount)} DOM <span className="font-normal text-ink-faint">· {p.planName}</span>
            </p>
          </div>
          <p className="mt-1 text-xs font-medium text-emerald-glow">
            +{fmtDom(p.reward, 4)} DOM guaranteed at maturity
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            q.matured
              ? "border-emerald-glow/40 bg-emerald-glow/15 text-emerald-glow"
              : q.inEarly
                ? "border-torch/35 bg-torch/10 text-torch"
                : "border-gold/35 bg-gold/10 text-gold"
          )}
        >
          {q.matured ? "Matured · Claimable" : q.inEarly ? "Early Fee Window" : "Locked · Safe Exit"}
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={cn("h-full rounded-full transition-all duration-500", q.matured ? "bg-emerald-glow" : "bg-gold")}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-faint">
        <span className="flex items-center gap-1">
          <CalendarClock className="h-3 w-3 text-gold/80" /> Matures {fmtDate(p.end)}
        </span>
        <span className={cn("font-mono font-semibold", q.matured ? "text-emerald-glow" : "text-ink-muted")}>
          {q.matured ? "100% Unlocked" : `${fmtCountdown(p.end - now)} remaining`}
        </span>
      </div>
      {!q.matured && q.inEarly && (
        <p className="mt-1.5 text-[10px] text-ink-faint">
          0% principal penalty after {fmtDate(earlyEnd)} ({fmtCountdown(earlyEnd - now)} left in{" "}
          {stakingRules.earlyPenaltyPct}% fee window)
        </p>
      )}

      <button
        type="button"
        onClick={onUnstake}
        disabled={s.busy}
        className={cn(
          "mt-3.5 w-full disabled:cursor-not-allowed disabled:opacity-50",
          q.matured ? "btn-primary" : "btn-secondary"
        )}
      >
        {thisBusy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : q.matured ? (
          <Zap className="h-4 w-4" />
        ) : (
          <Unlock className="h-4 w-4" />
        )}
        {q.matured ? `Claim ${fmtDom(p.amount + p.reward, 4)} DOM` : "Unlock Early"}
      </button>
      <TxStatus s={s} kinds={["unstake"]} positionId={p.id} />
    </div>
  );
}

function EarlyUnlockModal({
  p,
  now,
  busy,
  onClose,
  onConfirm,
}: {
  p: UiPosition;
  now: number;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const q = exitQuote(p, now);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="surface-panel relative z-10 w-full max-w-sm p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-torch" />
            <h3 className="heading-md text-lg">Unlock early?</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-faint hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          This position matures on <span className="text-ink">{fmtDate(p.end)}</span>. Unlocking now:
        </p>
        <dl className="mt-4 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">Reward forfeited</dt>
            <dd className="font-semibold text-torch">−{fmtDom(p.reward)} DOM</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">
              Penalty {q.inEarly ? `(${stakingRules.earlyPenaltyPct}%, within ${stakingRules.earlyWindowDays} days)` : ""}
            </dt>
            <dd className={cn("font-semibold", q.penalty > 0n ? "text-torch" : "text-ink")}>
              {q.penalty > 0n ? `−${fmtDom(q.penalty)} DOM` : "None"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-white/[0.06] pt-2">
            <dt className="text-ink">You receive</dt>
            <dd className="font-semibold text-ink">{fmtDom(q.principal)} DOM</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] text-ink-faint">
          Forfeited rewards and penalties go back to the staking reward pool. Final amounts are computed by the
          contract at the block your transaction lands in.
        </p>
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Keep staking
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 rounded-xl border border-torch/40 bg-torch/15 px-4 py-3 text-sm font-semibold text-torch transition-colors hover:bg-torch/25 disabled:opacity-50"
          >
            Unlock anyway
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 sm:block sm:p-3">
      <p className="text-[10px] uppercase leading-tight tracking-wider text-ink-faint">{label}</p>
      <p className={cn(" truncate font-display text-sm sm:mt-1 sm:text-base", accent ? "text-emerald-glow" : "text-gold")}>
        {value}
      </p>
    </div>
  );
}
