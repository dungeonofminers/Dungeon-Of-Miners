import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { siteConfig, links } from "@/content/site";
import { docsIntro, docsNav } from "@/content/docs";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: `Documentation — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "The full Dungeon of Miners reference documentation: economy, mining rate, wallets, on-chain withdrawal, and policy.",
};

export default function DocsIndexPage() {
  return (
    <article className="flex flex-col gap-10">
      <div>
        <span className="eyebrow">{docsIntro.eyebrow}</span>
        <h1 className="heading-lg mt-4">{docsIntro.title}</h1>
        <p className="body-lg mt-3 max-w-2xl">{docsIntro.description}</p>
      </div>

      <DocsContent blocks={docsIntro.blocks} />

      <div className="divider-glow" />

      <div>
        <h2 className="heading-md text-xl">Browse the documentation</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {docsNav.map((category) => (
            <div key={category.title} className="surface-panel p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                {category.title}
              </p>
              <div className="mt-3 flex flex-col gap-1">
                {category.items.map((item) => (
                  <a
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-ink-muted transition-colors hover:bg-white/[0.04] hover:text-gold"
                  >
                    {item.title}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-panel flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Ready to start mining?</p>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">
            Mining is live right now inside the {siteConfig.name} Mini App.
          </p>
        </div>
        <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
          Enter Mini App
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
