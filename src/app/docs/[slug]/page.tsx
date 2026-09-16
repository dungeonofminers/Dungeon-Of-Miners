import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import { docsPages, docsAllSlugs, docsNav } from "@/content/docs";
import { DocsContent } from "@/components/docs/DocsContent";

export function generateStaticParams() {
  return docsAllSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = docsPages[params.slug];
  if (!page) return {};
  return {
    title: `${page.title} — Docs — ${siteConfig.name} (${siteConfig.ticker})`,
    description: page.description,
  };
}

function findAdjacent(slug: string) {
  const flat = docsNav.flatMap((c) => c.items);
  const index = flat.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : null,
  };
}

export default function DocsPage({ params }: { params: { slug: string } }) {
  const page = docsPages[params.slug];
  if (!page) notFound();

  const { prev, next } = findAdjacent(params.slug);

  return (
    <article className="flex flex-col gap-8">
      <div>
        <span className="eyebrow">{page.eyebrow}</span>
        <h1 className="heading-lg mt-4 text-2xl sm:text-3xl">{page.title}</h1>
        <p className="body-lg mt-3 max-w-2xl">{page.description}</p>
      </div>

      <DocsContent blocks={page.blocks} />

      {(prev || next) && (
        <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-2">
          {prev ? (
            <a
              href={`/docs/${prev.slug}`}
              className="surface-panel p-4 text-left transition-colors hover:border-gold/25"
            >
              <p className="text-[10px] uppercase tracking-wider text-ink-faint">Previous</p>
              <p className="mt-1 text-sm font-semibold text-ink">{prev.title}</p>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a
              href={`/docs/${next.slug}`}
              className="surface-panel p-4 text-right transition-colors hover:border-gold/25 sm:col-start-2"
            >
              <p className="text-[10px] uppercase tracking-wider text-ink-faint">Next</p>
              <p className="mt-1 text-sm font-semibold text-ink">{next.title}</p>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
