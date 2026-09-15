import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import { siteConfig, economyConfig, economyChangelog } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Changelog — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Every change to the Dungeon of Miners economy rules, tracked by version.",
};

export default function ChangelogPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Economy Changelog"
            title={`Economy Rules — ${economyConfig.economyVersion}`}
            description={`Status: Live Mining · Last updated ${economyConfig.economyLastUpdated}`}
          />

          <div className="mx-auto mt-14 max-w-2xl">
            {economyChangelog.map((entry, i) => (
              <Reveal key={entry.version} delay={i * 0.06}>
                <div className="surface-panel mb-4 flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10">
                    <ScrollText className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Economy {entry.version} <span className="text-ink-faint">· {entry.date}</span>
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{entry.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
