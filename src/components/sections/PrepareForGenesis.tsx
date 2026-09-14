import { User, Shield, CalendarCheck, UserPlus, Users, ListChecks, type LucideIcon } from "lucide-react";
import { prepareForGenesis, genesisBadge } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  user: User,
  shield: Shield,
  "calendar-check": CalendarCheck,
  "user-plus": UserPlus,
  users: Users,
  "list-checks": ListChecks,
};

export function PrepareForGenesis() {
  return (
    <section id="prepare" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Prepare for Genesis"
          title="Mining hasn't started — but there's already plenty to do"
          description="None of these activities pay out DOM. They earn Genesis Points, XP, badges, and Chest Keys that carry meaning once Genesis begins."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {prepareForGenesis.map((card, i) => {
            const Icon = iconMap[card.icon] ?? Shield;
            return (
              <Reveal key={card.title} delay={(i % 6) * 0.06}>
                <div className="surface-panel group h-full p-6 transition-colors hover:border-gold/25">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors group-hover:border-gold/30 group-hover:bg-gold/10">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="body-lg mt-2 text-sm">{card.description}</p>
                  <span className="mt-4 inline-flex items-center rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                    Reward: {card.reward}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="surface-panel mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 shadow-glow-gold">
              <Shield className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h3 className="heading-md text-lg">{genesisBadge.name}</h3>
              <p className="body-lg mt-1 text-sm">{genesisBadge.description}</p>
              <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-start">
                {genesisBadge.rules.map((rule) => (
                  <li key={rule} className="text-xs text-ink-faint">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 text-center">
            <p className="text-sm text-ink-muted">
              <span className="font-semibold text-ink">Genesis Leaderboard</span> ranks players by
              Genesis Points, tasks completed, qualified referrals, and guild contribution — never
              by DOM. The DOM mining leaderboard opens after Genesis.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
