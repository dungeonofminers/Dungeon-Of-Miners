import type { Metadata } from "next";
import { ShieldCheck, ArrowRight, Send, Zap } from "lucide-react";
import { siteConfig, links, assets, totalSupply, withdrawalConfig, tokenAllocation, supplyFacts, balanceModel } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { EmberField } from "@/components/ui/EmberField";
import { TokenDistributionChart } from "@/components/tokenomics/TokenDistributionChart";
import { AllocationCard } from "@/components/tokenomics/AllocationCard";

export const metadata: Metadata = {
  title: `Tokenomics — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "DOM has a fixed maximum supply of 1,000,000,000 tokens, created once with minting permanently disabled, distributed across mining rewards, liquidity, ecosystem growth, reserves, the team, and strategic expansion.",
};

const keyFacts = [
  { label: "Ticker", value: siteConfig.ticker },
  { label: "Network", value: withdrawalConfig.network },
  { label: "Max Supply", value: totalSupply },
  { label: "Mining Status", value: "Live" },
  { label: "Withdrawal Fee", value: `${withdrawalConfig.feeDom} DOM` },
];

export default function TokenomicsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0A0C0F)]" />
        <GlowOrb color="gold" className="left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2" />
        <EmberField count={16} />

        <div className="section-shell relative">
          <SectionHeading
            eyebrow="Tokenomics"
            title="1 Billion DOM. Built for the Dungeon."
            description="DOM has a fixed maximum supply of 1,000,000,000 tokens, distributed across mining rewards, liquidity, ecosystem growth, reserves, the team, and strategic expansion."
          />

          {/* Token identity card */}
          <Reveal delay={0.1}>
            <div className="surface-panel mx-auto mt-14 max-w-3xl p-8 sm:p-10">
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-2xl" />
                  <PlaceholderImage
                    src={assets.logoDragonCoin}
                    alt="Dungeon of Miners DOM token"
                    label="DOM Token"
                    className="h-32 w-32 rounded-full shadow-glow-gold"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="heading-md text-xl">Dungeon of Miners (DOM)</h3>
                  <p className="body-lg mt-2 text-sm">
                    The native token of the Dungeon of Miners economy — mined by players and
                    eligible for instant on-chain withdrawal.
                  </p>
                  <div className="mt-4 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-glow/25 bg-emerald-glow/10 px-3.5 py-2 text-xs">
                      <Zap className="h-3.5 w-3.5 text-emerald-glow" />
                      <span className="text-ink-faint">Mining</span>
                      <span className="font-semibold text-emerald-glow">Live</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6 sm:grid-cols-3 lg:grid-cols-5">
                {keyFacts.map((fact) => (
                  <div key={fact.label} className="text-center sm:text-left">
                    <p className="text-xs uppercase tracking-wider text-ink-faint">{fact.label}</p>
                    <p className="mt-1 font-display text-lg text-gold">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Distribution breakdown */}
      <section className="relative py-20 sm:py-28">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Supply Breakdown"
            title="1,000,000,000 DOM across six allocations"
            description="55% of DOM supply is allocated directly to mining and community rewards, while the remaining supply supports liquidity, development, ecosystem growth, reserves, and strategic expansion."
          />

          <div className="mt-14">
            <TokenDistributionChart />
          </div>

          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            {supplyFacts.map((fact) => (
              <span
                key={fact.label}
                className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-xs"
              >
                <span className="font-bold uppercase tracking-wider text-gold">{fact.label}</span>
                <span className="text-ink-muted">{fact.value}</span>
              </span>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tokenAllocation.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 0.05}>
                <AllocationCard entry={entry} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How supply enters circulation */}
      <section className="relative py-20 sm:py-28">
        <div className="section-shell">
          <div className="surface-panel mx-auto max-w-4xl p-8 sm:p-10">
            <SectionHeading
              align="left"
              eyebrow="Circulation"
              title="How DOM actually enters circulation"
              description="Mining distributes DOM from the fixed Mining Allocation — there is no Holding Wallet / Pool Wallet split. 100% of every claim becomes your Available DOM Balance."
              className="items-start text-left"
            />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {balanceModel.steps
                .filter((s) => s.label !== "Claim")
                .map((step) => (
                  <div key={step.label} className="rounded-xl border border-gold/25 bg-gold/5 p-6">
                    <h4 className="text-sm font-semibold text-ink">{step.label}</h4>
                    <p className="mt-1 text-sm text-ink-muted">{step.description}</p>
                  </div>
                ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-glow" />
              <p className="text-sm text-ink-muted">
                100% of every claimed amount becomes Available DOM Balance — there is no split,
                and no separate locked portion. Withdrawal validation is always
                server-authoritative.{" "}
                <a href="/economy#withdrawal" className="text-gold underline-offset-4 hover:underline">
                  Read how on-chain withdrawal works
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <GlowOrb color="torch" className="left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2" />
        <div className="section-shell relative">
          <Reveal>
            <div className="surface-panel mx-auto max-w-2xl px-8 py-14 text-center sm:px-12">
              <h2 className="heading-lg">
                Mine your share of <span className="text-gradient-gold">DOM</span>
              </h2>
              <p className="body-lg mx-auto mt-4 max-w-lg">
                Every DOM you hold is real, mined supply — no shortcuts, no presale bags. Eligible
                DOM can be withdrawn directly to your wallet.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href={links.miniApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open Mini App
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={links.telegramCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Send className="h-4 w-4" />
                  Join Community
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
