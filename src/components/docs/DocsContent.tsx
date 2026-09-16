import { cn } from "@/lib/utils";
import type { DocBadgeTone, DocBlock, DocTableCell } from "@/content/docsBlocks";

const BADGE_CLASS: Record<DocBadgeTone, string> = {
  tba: "border-white/15 bg-white/[0.06] text-ink-faint",
  live: "border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow",
  good: "border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow",
  warn: "border-red-500/25 bg-red-500/10 text-red-400",
  planned: "border-white/10 bg-white/[0.04] text-ink-muted",
  gold: "border-gold/25 bg-gold/10 text-gold",
};

function Badge({ label, tone }: { label: string; tone: DocBadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        BADGE_CLASS[tone]
      )}
    >
      {label}
    </span>
  );
}

function Cell({ cell }: { cell: DocTableCell }) {
  if (typeof cell === "string") return <>{cell}</>;
  if (cell.badge) return <Badge label={cell.text} tone={cell.badge} />;
  return <>{cell.text}</>;
}

function cellAlign(cell: DocTableCell) {
  return typeof cell === "object" && cell.align === "right" ? "text-right" : "text-left";
}

export function DocsContent({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, i) => (
        <DocBlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function DocBlockRenderer({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 id={block.id} className="heading-md scroll-mt-28 pt-2 text-xl sm:text-2xl">
          {block.text}
        </h2>
      );

    case "lede":
      return <p className="body-lg max-w-3xl text-base sm:text-lg">{block.text}</p>;

    case "paragraph":
      return <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">{block.text}</p>;

    case "note":
      return (
        <p className="max-w-3xl text-xs leading-relaxed text-ink-faint sm:text-sm">{block.text}</p>
      );

    case "list":
      return (
        <ul className="flex max-w-3xl flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted sm:text-base">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="flex flex-col gap-3">
          {block.items.map((step, i) => (
            <li key={step.title} className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 font-display text-xs text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink sm:text-base">{step.title}</p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-ink-muted sm:text-sm">{step.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      );

    case "tiles":
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {block.items.map((tile) => (
            <div key={tile.label} className="surface-panel p-4">
              <p className="text-[10px] uppercase tracking-wider text-ink-faint">{tile.label}</p>
              <p
                className={cn(
                  "mt-1.5 font-display text-base sm:text-lg",
                  tile.accent === "emerald" ? "text-emerald-glow" : "text-gold"
                )}
              >
                {tile.value}
              </p>
              {tile.sub && <p className="mt-1 text-[11px] text-ink-faint">{tile.sub}</p>}
            </div>
          ))}
        </div>
      );

    case "keyValueGrid":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.label} className="surface-panel p-4">
              <p className="text-sm font-semibold text-ink">{item.label}</p>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="w-full overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="w-full min-w-[440px] border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.03]">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="border-b border-white/[0.08] px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-ink-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/[0.06] last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className={cn("px-4 py-2.5 text-ink-muted", cellAlign(cell))}>
                      <Cell cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout": {
      const tone = block.tone ?? "gold";
      const borderClass =
        tone === "danger"
          ? "border-l-red-500/70"
          : tone === "emerald"
            ? "border-l-emerald-glow/70"
            : "border-l-gold/70";
      return (
        <div className={cn("surface-panel border-l-2 p-5", borderClass)}>
          {block.title && <p className="mb-1.5 font-display text-sm text-ink sm:text-base">{block.title}</p>}
          <p className="text-sm leading-relaxed text-ink-muted sm:text-base">{block.text}</p>
        </div>
      );
    }

    case "badgeRow":
      return (
        <div className="flex flex-wrap gap-2">
          {block.items.map((item) => (
            <Badge key={item.label} label={item.label} tone={item.tone} />
          ))}
        </div>
      );

    case "formula":
      return (
        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 font-mono text-xs text-ink sm:text-sm">
          {block.text}
          {block.note && <p className="mt-2 font-body text-[11px] text-ink-faint">{block.note}</p>}
        </div>
      );

    case "divider":
      return <div className="divider-glow" />;

    case "linkGrid":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="surface-panel group flex flex-col gap-1 p-5 transition-colors hover:border-gold/25"
            >
              <p className="text-sm font-semibold text-ink transition-colors group-hover:text-gold">
                {item.title} →
              </p>
              <p className="text-xs text-ink-muted sm:text-sm">{item.description}</p>
            </a>
          ))}
        </div>
      );

    default:
      return null;
  }
}
