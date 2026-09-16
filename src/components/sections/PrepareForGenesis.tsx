import { User, Shield, CalendarCheck, UserPlus, Users, ListChecks, type LucideIcon } from "lucide-react";
import { miningActivities } from "@/content/site";
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
          eyebrow="Mining Activities"
          title="Mining is live — here's how to build your position"
          description="Beyond idle mining, these ongoing activities build your profile, badges, and Mining Weight boosters."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {miningActivities.map((card, i) => {
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

        <Reveal delay={0.25}>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 text-center">
            <p className="text-sm text-ink-muted">
              <span className="font-semibold text-ink">Leaderboard</span> ranks players by total
              mined, Pickaxe Level, referrals, and guild contribution. See the full{" "}
              <a href="/leaderboard" className="text-gold underline-offset-4 hover:underline">
                Leaderboard
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
