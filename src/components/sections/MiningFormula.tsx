import { Info } from "lucide-react";
import { miningFormula, emissionModel, boostRules, storageRules } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function MiningFormula() {
  return (
    <section id="mining-formula" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Economy Rules"
          title="How Mining Rewards Work"
          description="Your Effective Mining Weight is never a mystery number — every booster you've earned is stacked in one formula, then shared out of a hard-capped global emission."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-14 max-w-4xl p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
              {miningFormula.weightChain.map((part, i) => (
                <span
                  key={part}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-semibold ${
                    i === 0
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-white/10 bg-white/[0.03] text-ink-muted"
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/[0.06] pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-faint">
                  {miningFormula.example.label}
                </p>
                <dl className="mt-4 flex flex-col gap-2.5">
                  {miningFormula.example.rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <dt className="text-ink-muted">{row.label}</dt>
                      <dd className="font-semibold text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-torch/30 bg-torch/10 p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-torch">
                  {miningFormula.example.final.label}
                </p>
                <p className="mt-2 font-display text-3xl text-torch">
                  {miningFormula.example.final.value}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                Global Emission Model
              </p>
              <div className="mt-3 flex flex-col gap-2 font-mono text-xs text-ink-muted sm:text-sm">
                <p>{emissionModel.shareFormula}</p>
                <p>{emissionModel.rewardFormula}</p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-faint sm:text-sm">
                {emissionModel.note}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={0.15}>
            <div className="surface-panel h-full p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Boost & Multiplier Rules
              </h3>
              <dl className="mt-4 flex flex-col gap-3">
                {boostRules.map((rule) => (
                  <div key={rule.label} className="flex items-start justify-between gap-4 text-sm">
                    <dt className="text-ink-muted">{rule.label}</dt>
                    <dd
                      className={`text-right font-semibold ${
                        rule.value === "TBA" ? "text-ink-faint" : "text-ink"
                      }`}
                    >
                      {rule.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="surface-panel flex h-full flex-col p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Mining Storage
              </h3>
              <p className="body-lg mt-3 text-sm">{storageRules.description}</p>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    Storage
                    <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-ink-faint">
                      Example
                    </span>
                  </span>
                  <span className="font-semibold text-ink">
                    {storageRules.exampleCurrent.toLocaleString()} /{" "}
                    {storageRules.exampleMax.toLocaleString()} DOM
                  </span>
                </div>
                <div className="relative mt-2 h-3 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-torch-ember to-torch"
                    style={{
                      width: `${(storageRules.exampleCurrent / storageRules.exampleMax) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <dl className="mt-5 flex flex-col gap-2.5 border-t border-white/[0.06] pt-5">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">Base Storage</dt>
                  <dd className="font-semibold text-ink-faint">{storageRules.baseStorage}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">Storage Upgrade</dt>
                  <dd className="font-semibold text-ink">{storageRules.storageUpgrade}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">Storage Capacity</dt>
                  <dd className="font-semibold text-ink">{storageRules.storageCapacity}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-start gap-2 text-xs text-ink-faint">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                If storage fills up, mining pauses until you claim — DOM is never deleted.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
