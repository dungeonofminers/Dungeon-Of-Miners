import { Pickaxe, Users, Gauge, Box, CheckCircle2, Coins, Send, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const flow = [
  { icon: Gauge, label: "Global Halving Pool" },
  { icon: Pickaxe, label: "Mine" },
  { icon: Users, label: "Pickaxe + Referral + Guild" },
  { icon: Gauge, label: "Mining Weight" },
  { icon: Box, label: "Mining Storage" },
  { icon: CheckCircle2, label: "Claim" },
  { icon: Coins, label: "Available DOM" },
  { icon: Send, label: "Withdraw" },
  { icon: Wallet, label: "BSC Wallet" },
];

export function ProductFlow() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="How It All Connects"
          title="One flow, start to finish"
          description="From the shared Halving pool to DOM in your own wallet — understandable in under 10 seconds."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
            {flow.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-4 text-center sm:px-4">
                  <step.icon className="h-5 w-5 text-gold" />
                  <span className="max-w-[6.5rem] text-[10px] font-semibold uppercase leading-tight tracking-wider text-ink-muted sm:max-w-[8rem]">
                    {step.label}
                  </span>
                </div>
                {i < flow.length - 1 && (
                  <span aria-hidden className="text-ink-faint">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
