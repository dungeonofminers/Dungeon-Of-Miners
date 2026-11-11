"use client";

import { useState } from "react";
import {
  Lock,
  Coins,
  TrendingUp,
  Users,
  Clock,
  Percent,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { assets, SAFE_WALLETS } from "@/content/site";
import {
  EXPLORER_URL,
  STAKING_CONTRACT_ADDRESS,
  stakingRules,
} from "@/content/staking.config";
import { ConnectWallet, AddDomToWalletButton } from "@/components/staking/ConnectWallet";
import { StakePanel } from "@/components/staking/StakePanel";
import { PositionsPanel } from "@/components/staking/PositionsPanel";
import { useStaking } from "@/components/staking/useStaking";
import { fmtApr, fmtCompactDom, fmtDays, fmtDom } from "@/components/staking/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { EmberField } from "@/components/ui/EmberField";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is DOM staking?",
    a: "Staking lets you lock your DOM into a fixed-term plan (30, 90, or 180 days) to earn a guaranteed fixed APR paid in DOM at maturity. Every position's full reward is reserved from the on-chain reward pool the moment you stake.",
  },
  {
    q: "What are the staking plans and APR rates?",
    a: "There are three fixed-term tiers: Shallow Vein (30 days at 6% APR), Deep Vein (90 days at 12% APR), and Abyssal Vein (180 days at 20% APR). APR is simple (non-compounding): reward = amount × APR × days ÷ 365.",
  },
  {
    q: "How are rewards guaranteed?",
    a: "When you open a stake, the smart contract immediately reserves your full maturity reward from the unallocated reward pool. If the pool cannot cover a new stake's reward, the transaction reverts — so the contract can never owe more than it holds.",
  },
  {
    q: "When can I withdraw my DOM and rewards?",
    a: "Once your chosen lock period ends (maturity), you can unstake in a single transaction to receive 100% of your principal plus the full reserved DOM reward.",
  },
  {
    q: "What happens if I unlock before maturity?",
    a: "You can exit early at any time. If you unlock before maturity, your accrued rewards are forfeited back to the reward pool. Additionally, if you unlock within the first 7 days of staking, a 10% early-unlock penalty is deducted from your principal (and recycled into the reward pool). After 7 days, there is no principal penalty — you receive 100% of your principal back.",
  },
  {
    q: "Can the owner touch my staked DOM?",
    a: "No. Staked principal and reserved rewards for active positions are strictly locked in the contract. The owner (the Staking Reward multi-sig Safe) can only withdraw unreserved excess rewards, and even if new stakes are paused, unstaking is never blocked.",
  },
];

const steps = [
  {
    n: "01",
    title: "Connect Wallet",
    desc: "Connect your BEP-20 wallet (MetaMask or WalletConnect) on BNB Smart Chain.",
  },
  {
    n: "02",
    title: "Pick a Term & Stake",
    desc: "Choose 30, 90, or 180 days, approve DOM once, and lock your position. Your reward is reserved on-chain immediately.",
  },
  {
    n: "03",
    title: "Hold to Maturity",
    desc: "Track your unlock countdown live. Changing plan rates later never affects positions already opened.",
  },
  {
    n: "04",
    title: "Withdraw Principal + Reward",
    desc: "At maturity, withdraw your full principal and DOM reward in one click with zero protocol fee.",
  },
];

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function StakingPage() {
  const s = useStaking();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const defaultPlan = s.plans[1]?.active ? 1 : (s.plans.find((p) => p.active)?.id ?? 0);
  const [selectedPlanId, setSelectedPlanId] = useState<number>(defaultPlan);

  const selectPlanAndScroll = (id: number) => {
    setSelectedPlanId(id);
    const el = document.getElementById("stake-panel");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const activeAprs = s.plans.filter((p) => p.active).map((p) => p.aprBps);
  const minApr = activeAprs.length ? Math.min(...activeAprs) : 600;
  const maxApr = activeAprs.length ? Math.max(...activeAprs) : 2000;
  const aprRange = minApr === maxApr ? fmtApr(maxApr) : `${fmtApr(minApr)} – ${fmtApr(maxApr)}`;

  const termsLabel = s.plans.map((p) => `${Math.round(p.durationSec / 86_400)}d`).join(" / ");

  const protocolStats = [
    { icon: Percent, label: "Fixed APR", value: aprRange, muted: false },
    {
      icon: Lock,
      label: "Total Staked",
      value: s.stats ? `${fmtCompactDom(s.stats.totalStaked)} DOM` : "Awaiting Launch",
      muted: !s.stats,
    },
    {
      icon: Coins,
      label: "Reward Pool Available",
      value: s.stats ? `${fmtCompactDom(s.stats.rewardPool)} DOM` : "Awaiting Launch",
      muted: !s.stats,
    },
    {
      icon: Users,
      label: "Active Stakers",
      value: s.stats ? s.stats.activeStakers.toString() : "Awaiting Launch",
      muted: !s.stats,
    },
    {
      icon: TrendingUp,
      label: "Rewards Paid",
      value: s.stats ? `${fmtCompactDom(s.stats.totalRewardsPaid)} DOM` : "Awaiting Launch",
      muted: !s.stats,
    },
    { icon: Clock, label: "Fixed Terms", value: termsLabel, muted: false },
  ];

  const maxStakeLabel =
    s.maxStake > 0n ? `${fmtDom(s.maxStake)} DOM / position` : "Unlimited";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0A0C0F)]" />
        <GlowOrb color="gold" className="left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2" />
        <EmberField count={16} />

        <div className="section-shell relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="eyebrow">Fixed-Term Staking · Up to {fmtApr(maxApr)} APR</span>
              <h1 className="heading-xl mt-6 max-w-xl">
                Stake DOM. <span className="text-gradient-gold">Earn Guaranteed Rewards.</span>
              </h1>
              <p className="body-lg mt-5 max-w-lg">
                Lock DOM for 30, 90, or 180 days at a fixed APR. Your full reward is reserved on-chain
                the moment you stake. Unlock within {stakingRules.earlyWindowDays} days and a{" "}
                {stakingRules.earlyPenaltyPct}% principal penalty applies.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <ConnectWallet />
                <AddDomToWalletButton />
                {s.live ? (
                  <a
                    href={`${EXPLORER_URL}/address/${STAKING_CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-glow/30 bg-emerald-glow/[0.06] px-4 py-3 text-xs font-semibold text-emerald-glow transition-colors hover:border-emerald-glow/50 hover:bg-emerald-glow/10"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Verified Contract ({shortAddr(STAKING_CONTRACT_ADDRESS)})
                    <ExternalLink className="h-3 w-3 opacity-80" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-ink-muted">
                    <ShieldCheck className="h-4 w-4 text-gold" />
                    Contract audited in progress · Preview rates below
                  </span>
                )}
              </div>
            </div>

            <div className="relative mx-auto flex flex-col items-center justify-center">
              <div aria-hidden className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-3xl" />
              <div className="coin-levitate-3d relative">
                <PlaceholderImage
                  src={assets.logoDragonCoin}
                  alt="DOM token"
                  label="DOM Token"
                  className="h-56 w-56 rounded-full shadow-glow-gold sm:h-72 sm:w-72"
                />
              </div>
              <div aria-hidden className="mt-4 h-3.5 w-36 rounded-full bg-gold/25 blur-xl sm:w-44" />
            </div>
          </div>
        </div>
      </section>

      {/* Protocol stats */}
      <section className="relative py-12">
        <div className="section-shell">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {protocolStats.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.05}>
                <div className="surface-panel flex h-full flex-col items-center gap-2 p-5 text-center">
                  <item.icon className="h-5 w-5 text-gold" />
                  <p className="text-[10px] uppercase tracking-wider text-ink-faint">{item.label}</p>
                  <p
                    className={cn(
                      "font-display text-sm sm:text-base",
                      item.muted ? "text-ink-faint" : "text-gold"
                    )}
                  >
                    {item.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stake + Your Position */}
      <section className="relative py-12">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal>
              <StakePanel s={s} planId={selectedPlanId} onPlanChange={setSelectedPlanId} />
            </Reveal>
            <Reveal delay={0.08}>
              <PositionsPanel s={s} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Staking Plans breakdown */}
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Staking Tiers"
            title="Choose your depth"
            description="Longer commitments earn a higher fixed APR. Every reward is reserved upfront from the Staking Reward pool."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {s.plans.map((p, i) => {
              const days = Math.round(p.durationSec / 86_400);
              const per10k = Math.floor((10_000 * (p.aprBps / 10_000) * days) / 365);
              const isSelected = p.id === selectedPlanId;
              return (
                <Reveal key={p.id} delay={i * 0.06}>
                  <div
                    className={cn(
                      "surface-panel flex h-full flex-col justify-between p-6 transition-all sm:p-7",
                      isSelected && "border-gold/50 shadow-glow-gold"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                          Tier 0{p.id + 1} · {p.name}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs font-semibold text-ink">
                          {fmtDays(p.durationSec)}
                        </span>
                      </div>
                      <p className="mt-4 font-display text-4xl text-gold">{fmtApr(p.aprBps)}</p>
                      <p className="text-xs uppercase tracking-wider text-ink-faint">
                        Fixed APR (simple)
                      </p>
                      <p className="mt-4 text-sm text-ink-muted">
                        Lock DOM for {days} days. Example: a{" "}
                        <span className="font-semibold text-ink">10,000 DOM</span> stake earns{" "}
                        <span className="font-semibold text-emerald-glow">
                          +{per10k.toLocaleString("en-US")} DOM
                        </span>{" "}
                        at maturity.
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <span className="text-xs text-ink-faint">Upfront on-chain reserve</span>
                      <button
                        type="button"
                        onClick={() => selectPlanAndScroll(p.id)}
                        className="rounded-lg border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
                      >
                        Select {days}d Plan →
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Staking parameters */}
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Staking Parameters"
            title="The rules, clearly"
            description="Enforced directly by the DomStaking smart contract — identical for every wallet."
          />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:grid-cols-2 sm:p-8">
              <ParamRow label="Staking & Reward Token" value="DOM (BEP-20)" />
              <ParamRow label="Network" value={s.chainName} />
              <ParamRow
                label="Plans (Fixed APR)"
                value={s.plans.map((p) => `${Math.round(p.durationSec / 86_400)}d @ ${fmtApr(p.aprBps)}`).join(" · ")}
              />
              <ParamRow label="Reward Model" value="Simple APR, reserved upfront" />
              <ParamRow label="Minimum Stake" value={`${fmtDom(s.minStake)} DOM`} />
              <ParamRow label="Maximum Stake" value={maxStakeLabel} />
              <ParamRow
                label={`Early Unlock (< ${stakingRules.earlyWindowDays} days)`}
                value={`${stakingRules.earlyPenaltyPct}% principal penalty + rewards forfeited`}
              />
              <ParamRow
                label={`Early Unlock (≥ ${stakingRules.earlyWindowDays} days, < maturity)`}
                value="0% principal penalty · rewards forfeited"
              />
              <ParamRow label="Claim Schedule" value="Principal + 100% reward at maturity" />
              <ParamRow
                label="Reward Pool Source"
                value={shortAddr(SAFE_WALLETS.ecosystem)}
                href={`https://bscscan.com/address/${SAFE_WALLETS.ecosystem}`}
              />
              <ParamRow
                label="Staking Contract"
                value={s.live ? shortAddr(STAKING_CONTRACT_ADDRESS) : "Deploying Soon"}
                href={s.live ? `${EXPLORER_URL}/address/${STAKING_CONTRACT_ADDRESS}` : undefined}
                badge={!s.live}
              />
              <ParamRow label="Protocol Fee on Maturity" value="0%" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="How Staking Works"
            title="Four simple steps"
            description="From connecting your wallet to withdrawing your rewards."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <div className="surface-panel h-full p-6">
                  <span className="font-display text-3xl text-white/10">{step.n}</span>
                  <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="mx-auto mt-10 max-w-2xl">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.03}>
                <div className="border-b border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-ink sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-gold transition-transform duration-300",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-300 ease-in-out",
                      openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="body-lg pb-6 text-sm">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Risk disclaimer */}
      <section className="relative pb-24 pt-4">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl border border-torch/30 bg-torch/5 px-6 py-5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-torch" />
              <p className="text-xs leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink">Risk disclosure:</span> staking involves
                smart contract risk and locks your tokens for the selected term. Unlocking before{" "}
                {stakingRules.earlyWindowDays} days incurs a {stakingRules.earlyPenaltyPct}% principal
                penalty, and unlocking before maturity forfeits rewards. Always review the{" "}
                <a href="/risk-disclosure" className="text-gold underline-offset-4 hover:underline">
                  Risk Disclosure
                </a>{" "}
                before participating.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ParamRow({
  label,
  value,
  href,
  badge,
}: {
  label: string;
  value: string;
  href?: string;
  badge?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-2.5 last:border-0">
      <span className="text-sm text-ink-muted">{label}</span>
      {badge ? (
        <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-xs font-semibold text-ink-faint">
          {value}
        </span>
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-gold underline-offset-4 hover:underline"
        >
          {value}
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        <span className="text-right text-sm font-semibold text-ink">{value}</span>
      )}
    </div>
  );
}
