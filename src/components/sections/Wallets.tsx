import { Vault, Coins, Link2, ArrowRight } from "lucide-react";
import { claimRules, balanceModel } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Wallets() {
  const [storage, , available] = balanceModel.steps;
  const connected = balanceModel.steps[balanceModel.steps.length - 1];

  return (
    <section id="economy" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Balance System"
          title="No wallet split. 100% of every claim is yours."
          description="Mining Storage holds what you've earned. Claim moves it, in full, into your Available DOM Balance — which is eligible for on-chain withdrawal."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="surface-panel p-8 sm:p-10">
              <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <BalanceCard icon={Vault} title={storage.label} description={storage.description} tone="gold" />

                <FlowArrow label="Claim" />

                <BalanceCard icon={Coins} title={available.label} description={available.description} tone="emerald" />

                <FlowArrow label="Withdraw" />

                <BalanceCard icon={Link2} title={connected.label} description={connected.description} tone="gold" />
              </div>

              <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
                <p className="text-sm text-ink-muted">
                  <span className="font-semibold text-ink">No 70/30 split.</span>{" "}
                  {claimRules.note}
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

              <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Accounting states
                </p>
                <p className="mt-2 font-mono text-xs text-ink-muted sm:text-sm">
                  {balanceModel.accountingStates.join(" → ")}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                  {balanceModel.integrityNote}
                </p>
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

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-row items-center justify-center gap-2 md:flex-col">
      <ArrowRight className="h-5 w-5 shrink-0 text-ink-faint md:rotate-0" />
      <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-ink-faint">
        {label}
      </span>
    </div>
  );
}

function BalanceCard({
  icon: Icon,
  title,
  description,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tone: "gold" | "emerald";
}) {
  const toneClasses =
    tone === "gold"
      ? "border-gold/25 bg-gold/5 text-gold"
      : "border-emerald-glow/25 bg-emerald-glow/5 text-emerald-glow";

  return (
    <div className={`flex flex-col rounded-xl border p-6 ${toneClasses}`}>
      <Icon className="h-6 w-6" />
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
    </div>
  );
}
