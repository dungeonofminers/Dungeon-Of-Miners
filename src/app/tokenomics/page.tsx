import type { Metadata } from "next";
import { ShieldCheck, Vault, Coins, ArrowRight, Send, Lock } from "lucide-react";
import { siteConfig, links, assets, totalSupply } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { EmberField } from "@/components/ui/EmberField";
import { TokenDistributionChart } from "@/components/tokenomics/TokenDistributionChart";

export const metadata: Metadata = {
  title: `Tokenomics — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "DOM token distribution and max supply for Dungeon of Miners — a Pre-TGE, fully transparent idle-mining economy. No contract is deployed yet.",
};

const keyFacts = [
  { label: "Ticker", value: siteConfig.ticker },
  { label: "Network", value: "BNB Chain (BEP-20)" },
  { label: "Max Supply", value: totalSupply },
  { label: "Status", value: "Pre-TGE" },
  { label: "Allocation Model", value: "100% Mined" },
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
            title="DOM Token & Distribution"
            description="Every DOM in existence is mined, not pre-sold. Here's the full supply and exactly how it's split across the six dungeon floors."
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
                    The native token of the Dungeon of Miners economy — mined by players,
                    ranked by holding, and spent through the Pool Wallet.
                  </p>
                  <div className="mt-4 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs">
                      <Lock className="h-3.5 w-3.5 text-ink-faint" />
                      <span className="text-ink-faint">Contract</span>
                      <span className="font-semibold text-gold">Not Deployed Yet</span>
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
            title="100% of DOM is mined — floor by floor"
            description="There is no team allocation, presale, or private round baked into this chart — the entire max supply is released to players as they mine through each dungeon floor."
          />

          <div className="mt-14">
            <TokenDistributionChart />
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
              description="Mining doesn't hand out spendable DOM directly — every claim is split the moment it lands."
              className="items-start text-left"
            />

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-gold/25 bg-gold/5 p-6">
                <div className="flex items-center justify-between">
                  <Vault className="h-5 w-5 text-gold" />
                  <span className="font-display text-2xl text-gold">70%</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold text-ink">Holding Wallet</h4>
                <p className="mt-1 text-sm text-ink-muted">
                  Determines rank. Not spendable, not liquid — this is long-term commitment
                  supply.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-glow/25 bg-emerald-glow/5 p-6">
                <div className="flex items-center justify-between">
                  <Coins className="h-5 w-5 text-emerald-glow" />
                  <span className="font-display text-2xl text-emerald-glow">30%</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold text-ink">Pool Wallet</h4>
                <p className="mt-1 text-sm text-ink-muted">
                  Spendable — used for upgrades, guild costs, and queued for withdrawal.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-glow" />
              <p className="text-sm text-ink-muted">
                Dungeon of Miners is currently{" "}
                <span className="font-semibold text-ink">Pre-TGE</span>. Withdraw requests are
                recorded and shown honestly as{" "}
                <span className="font-semibold text-ink">Pre-TGE · Locked until listing</span> —
                there is no live payout or prize pool today.{" "}
                <a href="/#honesty" className="text-gold underline-offset-4 hover:underline">
                  Read our full transparency commitment
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
                Start mining your share of <span className="text-gradient-gold">DOM</span>
              </h2>
              <p className="body-lg mx-auto mt-4 max-w-lg">
                Every DOM you hold today is real, mined supply — no shortcuts, no presale bags.
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
