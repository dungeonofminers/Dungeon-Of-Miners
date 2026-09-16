import {
  Pickaxe,
  Flame,
  Hammer,
  Box,
  Gem,
  CheckCircle,
  PlayCircle,
  Users,
  Shield,
  ShieldAlert,
  UserPlus,
  Share2,
  Lock,
  Gauge,
  Wallet,
  Coins,
  Send,
  Activity,
  Hash,
  Search,
  Swords,
  Trophy,
  ListChecks,
  CalendarCheck,
  ScrollText,
  Rocket,
  TrendingUp,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { featureGroups } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  pickaxe: Pickaxe,
  flame: Flame,
  hammer: Hammer,
  box: Box,
  gem: Gem,
  "check-circle": CheckCircle,
  "play-circle": PlayCircle,
  users: Users,
  shield: Shield,
  "shield-alert": ShieldAlert,
  "user-plus": UserPlus,
  "share-2": Share2,
  lock: Lock,
  gauge: Gauge,
  wallet: Wallet,
  coins: Coins,
  send: Send,
  activity: Activity,
  hash: Hash,
  search: Search,
  swords: Swords,
  trophy: Trophy,
  "list-checks": ListChecks,
  "calendar-check": CalendarCheck,
  scroll: ScrollText,
  rocket: Rocket,
  "trending-up": TrendingUp,
  smartphone: Smartphone,
};

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Features"
          title="Everything a deep-mining game needs"
          description="A full progression loop — mining, on-chain withdrawal, social play, and engagement — built around one shared, fixed-supply economy."
        />

        <div className="mt-16 flex flex-col gap-14">
          {featureGroups.map((group, gi) => (
            <div key={group.group}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{group.group}</h3>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((feature, i) => {
                  const Icon = iconMap[feature.icon] ?? Gem;
                  return (
                    <Reveal key={feature.title} delay={((gi * 3 + i) % 6) * 0.05}>
                      <div className="surface-panel group h-full p-6 transition-colors hover:border-gold/25">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors group-hover:border-gold/30 group-hover:bg-gold/10">
                          <Icon className="h-5 w-5 text-gold" />
                        </div>
                        <h4 className="mt-4 text-base font-semibold text-ink">{feature.title}</h4>
                        <p className="body-lg mt-2 text-sm">{feature.description}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
