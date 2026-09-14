import { Lock, ShieldCheck, XCircle, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  {
    icon: FileText,
    title: "Withdraw Requests Are Recorded",
    description: "Every withdraw request you make is logged against your account, in order.",
  },
  {
    icon: Lock,
    title: "Status Shown Honestly",
    description: "Each request displays exactly what it is: Pre-TGE · Locked until listing.",
  },
  {
    icon: XCircle,
    title: "No Fake Payouts",
    description: "No manufactured transaction proofs, no fake \"processing\" status, no fabricated payout screenshots — ever.",
  },
];

export function Honesty() {
  return (
    <section id="honesty" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <div className="surface-panel relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-glow/10 blur-[100px]" />

          <div className="relative">
            <SectionHeading
              align="left"
              eyebrow="Transparency"
              title="We tell you exactly where DOM stands today"
              description="Dungeon of Miners is a Pre-TGE ecosystem. That's not a footnote — it's stated clearly, everywhere it matters, so your expectations are always accurate."
              className="items-start text-left"
            />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {points.map((point, i) => (
                <Reveal key={point.title} delay={i * 0.08}>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                    <point.icon className="h-5 w-5 text-emerald-glow" />
                    <h3 className="mt-4 text-sm font-semibold text-ink">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-glow/25 bg-emerald-glow/5 px-5 py-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-glow" />
              <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">
                  Dungeon of Miners is funded through optional rewarded advertising and future
                  Telegram Stars purchases.
                </span>{" "}
                DOM does not represent revenue sharing or ownership of platform revenue. There is
                currently no prize pool and no live payout to users — stated plainly, not buried
                in terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
