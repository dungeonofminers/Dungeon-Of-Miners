import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Leaderboard — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "The live Dungeon of Miners leaderboard. No fake rankings, ever.",
};

const rankingBasis = [
  "Total Mined",
  "Current Mining Rate",
  "Rank",
  "Current Halving",
  "Guild Contribution",
];

export default function LeaderboardPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Live Rankings"
            title="Leaderboard"
            description="Miners are ranked by mining activity and progression — never by exposing private wallet balances."
          />

          <Reveal delay={0.1}>
            <div className="surface-panel mx-auto mt-14 flex max-w-xl flex-col items-center gap-4 p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                <Trophy className="h-6 w-6 text-gold" />
              </div>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink-faint">
                Awaiting Live Backend Connection
              </span>
              <p className="body-lg max-w-sm text-sm">
                Rankings render here once this page is connected to the live backend — we
                don&apos;t show placeholder or fake leaderboard entries. Miners are ranked by:
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
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
