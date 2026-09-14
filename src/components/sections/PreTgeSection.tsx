import { Lock, ArrowRight } from "lucide-react";
import { tgeMigration } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function PreTgeSection() {
  return (
    <section id="pre-tge" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Pre-TGE DOM"
          title="From Ledger to On-Chain"
          description="DOM earned before the Token Generation Event exists as an internal ledger balance — not an on-chain token yet."
        />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-panel h-full p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                <Lock className="h-5 w-5 text-gold" />
              </div>
              <h3 className="heading-md mt-4 text-lg">Pre-TGE DOM</h3>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm text-ink-muted">
                <li>DOM earned before TGE exists as an internal ledger balance.</li>
                <li>DOM is not currently withdrawable on-chain.</li>
                <li>
                  Withdraw requests remain{" "}
                  <span className="font-semibold text-ink">Pre-TGE · Locked until listing</span>.
                </li>
              </ul>
              <div className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-relaxed text-ink-faint">
                DOM currently has no guaranteed market value. There is no live payout pool. No
                withdrawal is processed before the official TGE/listing conditions are met.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-panel h-full p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <ArrowRight className="h-5 w-5 text-ink-faint" />
              </div>
              <h3 className="heading-md mt-4 text-lg">TGE Migration</h3>
              <dl className="mt-3 flex flex-col gap-2.5">
                {tgeMigration.map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <dt className="text-ink-muted">{row.label}</dt>
                    <dd className="font-semibold text-ink-faint">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
