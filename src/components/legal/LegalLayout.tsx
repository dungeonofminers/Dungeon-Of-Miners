import { siteConfig } from "@/content/site";

export type LegalSection = { heading: string; body: string[] };

export function LegalLayout({
  title,
  updated,
  intro,
  sections,
  placeholderNote,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
  placeholderNote?: string;
}) {
  return (
    <div className="pt-24 sm:pt-28">
      <div className="section-shell pb-24">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">{siteConfig.name}</span>
          <h1 className="heading-lg mt-4">{title}</h1>
          <p className="mt-2 text-xs uppercase tracking-wider text-ink-faint">Last updated: {updated}</p>

          {intro && <p className="body-lg mt-6 text-sm sm:text-base">{intro}</p>}

          {placeholderNote && (
            <div className="mt-6 rounded-xl border border-gold/25 bg-gold/5 px-5 py-4">
              <p className="text-xs leading-relaxed text-ink-muted sm:text-sm">{placeholderNote}</p>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-base font-semibold text-ink sm:text-lg">{section.heading}</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-muted sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
