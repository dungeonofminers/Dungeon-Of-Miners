import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Leaderboard — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "The Dungeon of Miners leaderboard opens at Genesis. No fake rankings, ever.",
};

const rankingBasis = [
  "Genesis Points",
  "Tasks Completed",
  "Qualified Referrals",
  "Daily Activity",
  "Guild Contribution",
];

export default function LeaderboardPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Pre-Genesis Rankings"
            title="Genesis Leaderboard"
            description="This ranks players by activity, not DOM. The DOM mining leaderboard opens once Genesis begins."
          />

          <Reveal delay={0.1}>
            <div className="surface-panel mx-auto mt-14 flex max-w-xl flex-col items-center gap-4 p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                <Trophy className="h-6 w-6 text-gold" />
              </div>
              <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold">
                Coming at Genesis
              </span>
              <p className="body-lg max-w-sm text-sm">
                No rankings exist yet — we don&apos;t show placeholder or fake leaderboard entries.
                Once Genesis begins, real player standings will appear here, ranked by:
              </p>
              <ul className="flex flex-wrap justify-center gap-2">
                {rankingBasis.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink-faint">DOM mining leaderboard opens after Genesis.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
