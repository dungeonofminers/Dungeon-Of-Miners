import {
  Pickaxe,
  Flame,
  Flashlight,
  Hammer,
  Box,
  Gem,
  CheckCircle,
  PlayCircle,
  Users,
  Shield,
  UserPlus,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { features } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  pickaxe: Pickaxe,
  flame: Flame,
  flashlight: Flashlight,
  hammer: Hammer,
  box: Box,
  gem: Gem,
  "check-circle": CheckCircle,
  "play-circle": PlayCircle,
  users: Users,
  shield: Shield,
  "user-plus": UserPlus,
  "share-2": Share2,
};

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Features"
          title="Everything a deep-mining game needs"
          description="A full progression loop — mining, upgrades, mini-games, tasks, and social play — built around one shared economy."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Gem;
            return (
              <Reveal key={feature.title} delay={(i % 6) * 0.06}>
                <div className="surface-panel group h-full p-6 transition-colors hover:border-gold/25">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors group-hover:border-gold/30 group-hover:bg-gold/10">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{feature.title}</h3>
                  <p className="body-lg mt-2 text-sm">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
