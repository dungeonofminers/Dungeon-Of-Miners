import { Trophy, Swords } from "lucide-react";
import { guildStats } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

export function Guild() {
  return (
    <section id="guild" className="relative overflow-hidden py-24 sm:py-32">
      <GlowOrb color="emerald" className="right-0 top-1/3 h-[350px] w-[350px]" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Guild System"
          title="No one descends alone"
          description="Form a guild of up to 30 delvers, coordinate daily expeditions, and earn a shared hashrate bonus that rewards teams who show up together."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="surface-panel h-full p-8 sm:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-glow/25 bg-emerald-glow/10">
                <Swords className="h-5 w-5 text-emerald-glow" />
              </div>
              <h3 className="heading-md mt-5">Daily Expedition</h3>
              <p className="body-lg mt-3">
                Each day, your guild has one shot at the Expedition bonus. If{" "}
                <span className="font-semibold text-ink">60% or more</span> of members claim
                that day, the entire guild earns a{" "}
                <span className="font-semibold text-emerald-glow">+15% hashrate bonus</span> —
                stacked on top of everyone&rsquo;s individual mining rate.
              </p>

              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span>Members claimed today</span>
                  <span className="font-semibold text-ink">18 / 30</span>
                </div>
                <div className="relative mt-3 h-3 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-emerald-glow/70 to-emerald-glow" />
                  <div className="absolute inset-y-0 left-[60%] w-px bg-white/30" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-ink-faint">
                  <span>0%</span>
                  <span className="text-emerald-glow">60% threshold</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="surface-panel h-full p-8 sm:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                <Trophy className="h-5 w-5 text-gold" />
              </div>
              <h3 className="heading-md mt-5 text-xl">Permanent Floor Leaderboard</h3>
              <p className="body-lg mt-3 text-sm">
                Every floor&rsquo;s guild standings are recorded permanently — a public history of
                which guilds led the descent, floor by floor.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {guildStats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.15 + i * 0.05}>
              <div className="surface-panel flex flex-col items-center gap-1 p-6 text-center">
                <p className="font-display text-2xl text-ink sm:text-3xl">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-ink-faint">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
