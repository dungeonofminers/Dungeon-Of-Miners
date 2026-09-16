import { Archive, ScrollText } from "lucide-react";
import { halvingLedger, halvingRecord, halvingArchive, economyChangelog, economyConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function GenesisLedger() {
  return (
    <section id="genesis-ledger" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Public Ledger"
          title="Global Halving Ledger & Economy Record"
          description="Everything below is publicly readable. Values marked as awaiting the backend are shown honestly, never fabricated."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-panel h-full p-7 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Global Halving Ledger
              </h3>
              <dl className="mt-5 flex flex-col gap-3">
                {halvingLedger.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                    <dt className="text-ink-muted">{row.label}</dt>
                    <dd className="text-right font-semibold text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-panel h-full p-7 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Economy Record
              </h3>
              <dl className="mt-5 flex flex-col gap-3">
                {halvingRecord.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                    <dt className="text-ink-muted">{row.label}</dt>
                    <dd className="text-right font-semibold text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div id="genesis-ledger-archive" className="mx-auto mt-6 grid max-w-none grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={0.12}>
            <div className="surface-panel flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <Archive className="h-6 w-6 text-ink-faint" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Halving Archive
              </h3>
              {halvingArchive.length === 0 ? (
                <p className="max-w-sm text-sm text-ink-muted">
                  No Halving eras have completed yet. Once a Halving ends, its full history —
                  duration, DOM mined, participating miners, top guild — will appear here
                  permanently.
                </p>
              ) : (
                <p className="text-sm text-ink-muted">{halvingArchive.length} Halving(s) recorded.</p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div id="economy-rules" className="surface-panel h-full p-7 sm:p-8">
              <div className="flex items-center gap-2">
                <ScrollText className="h-4 w-4 text-gold" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                  Economy Rules — {economyConfig.economyVersion}
                </h3>
              </div>
              <p className="mt-1 text-xs text-ink-faint">
                Status: Live Mining · Last Updated: {economyConfig.economyLastUpdated}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {economyChangelog.map((entry) => (
                  <li key={entry.version} className="border-l-2 border-gold/30 pl-3">
                    <p className="text-sm font-semibold text-ink">
                      Economy {entry.version} <span className="text-ink-faint">· {entry.date}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-ink-muted">{entry.summary}</p>
                    {"changes" in entry && entry.changes && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {entry.changes.map((change) => (
                          <li key={change} className="flex items-start gap-2 text-xs text-ink-faint">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
