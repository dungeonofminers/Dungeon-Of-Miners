import type { Metadata } from "next";
import { siteConfig, leaderboardConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderboardBoard } from "@/components/sections/LeaderboardBoard";

export const metadata: Metadata = {
  title: `Leaderboard — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "The live Dungeon of Miners Player and Guild leaderboards. No fake rankings, ever.",
};

export default function LeaderboardPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Live Rankings"
            title="Leaderboard"
            description="Ranked by Mining XP and verified activity — never by wallet balance. No placeholder or fake entries, ever."
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
