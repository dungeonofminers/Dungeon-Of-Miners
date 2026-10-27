import type { Metadata } from "next";
import { siteConfig, leaderboardConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderboardBoard } from "@/components/sections/LeaderboardBoard";

export const metadata: Metadata = {
  title: `Leaderboard — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "The Dungeon of Miners Player leaderboard. No fake rankings, ever.",
};

export default function LeaderboardPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Rankings"
            title="Leaderboard"
            description="Ranked by verified activity — DOM mined, active days, and season points — never by wallet balance. No placeholder or fake entries, ever."
          />

          <LeaderboardBoard />

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-ink-faint">
            {leaderboardConfig.rewardPhilosophy}
          </p>
        </div>
      </section>
    </div>
  );
}
