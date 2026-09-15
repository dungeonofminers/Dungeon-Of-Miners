import { Vault, Coins, ArrowRight } from "lucide-react";
import { claimRules } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Wallets() {
  return (
    <section id="economy" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Wallet System"
          title="Two wallets. One clear purpose each."
          description="Every claim is split automatically so that rank progress and spending power never compete with each other."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="surface-panel p-8 sm:p-10">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="eyebrow">Every Claim</span>
                <p className="text-sm text-ink-muted">splits automatically into</p>
              </div>

              <div className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
                <WalletCard
                  icon={Vault}
                  percent="70%"
                  title="Holding Wallet"
                  description="Determines your rank. Not spendable — this is your commitment, permanently reflected in a higher mining rate."
                  tone="gold"
                />

                <div className="hidden items-center justify-center md:flex">
                  <ArrowRight className="h-6 w-6 rotate-90 text-ink-faint md:rotate-0" />
                </div>

                <WalletCard
                  icon={Coins}
                  percent="30%"
                  title="Pool Wallet"
                  description="Spendable balance. Used for upgrades, guild costs, Stone Breaker rounds, and eligible for on-chain withdrawal."
                  tone="emerald"
                />
              </div>

              <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
                <p className="text-sm text-ink-muted">
                  <span className="font-semibold text-ink">Why two wallets?</span> Ranking up
                  rewards long-term holders, while the Pool Wallet keeps day-to-day progression —
                  upgrades, guild play, on-chain withdrawal — separate and always usable.
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                  Claim System
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <ClaimStat label="Minimum Claim" value={claimRules.minimumClaim} />
                  <ClaimStat label="Claim Cooldown" value={claimRules.claimCooldown} />
                  <ClaimStat label="Maximum Claim" value={claimRules.maximumClaim} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClaimStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-wider text-ink-faint">{label}</p>
      <p className={`mt-1 font-display text-lg ${value === "TBA" ? "text-ink-faint" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

function WalletCard({
  icon: Icon,
  percent,
  title,
  description,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  percent: string;
  title: string;
  description: string;
  tone: "gold" | "emerald";
}) {
  const toneClasses =
    tone === "gold"
      ? "border-gold/25 bg-gold/5 text-gold"
      : "border-emerald-glow/25 bg-emerald-glow/5 text-emerald-glow";

  return (
    <div className={`rounded-xl border p-6 ${toneClasses}`}>
      <div className="flex items-center justify-between">
        <Icon className="h-6 w-6" />
        <span className="font-display text-2xl">{percent}</span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
    </div>
  );
}
