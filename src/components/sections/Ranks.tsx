import { Pickaxe } from "lucide-react";
import { ranks } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Ranks() {
  return (
    <section id="ranks" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Rank System"
          title="Hold your ground. Climb the ranks."
          description="Your Holding Wallet balance sets your rank. Each rank permanently unlocks a higher base mining rate — no gambling, no luck, just commitment."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {ranks.map((rank, i) => (
            <Reveal key={rank.name} delay={i * 0.06}>
              <div className="surface-panel group relative flex h-full flex-col items-center gap-4 overflow-hidden p-5 text-center transition-transform hover:-translate-y-1">
                <div
                  className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${rank.accent} opacity-20 blur-2xl`}
                />
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${rank.accent} shadow-lg`}
                >
                  <Pickaxe className="h-6 w-6 text-void-300" />
                </div>
                <div className="relative">
                  <h3 className="font-display text-lg text-ink">{rank.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-faint">
                    Holds {rank.holding}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gold">{rank.rate}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
