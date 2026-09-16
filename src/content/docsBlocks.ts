// ---------------------------------------------------------------------------
// Shared block schema for the Documentation section (/docs). Every docs page
// is data — an array of DocBlock — rendered by DocsContent.tsx. This keeps
// the docs system content-driven instead of one bespoke component per page,
// matching the rest of the site's "edit content.ts, not components" pattern.
// ---------------------------------------------------------------------------

export type DocBadgeTone = "tba" | "live" | "warn" | "good" | "planned" | "gold";

export type DocTableCell = string | { text: string; badge?: DocBadgeTone; align?: "right" };

export type DocBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "lede"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "note"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: { title: string; description?: string }[] }
  | {
      type: "tiles";
      items: { label: string; value: string; sub?: string; accent?: "gold" | "emerald" }[];
    }
  | { type: "table"; headers: string[]; rows: DocTableCell[][] }
  | { type: "callout"; tone?: "gold" | "emerald" | "danger"; title?: string; text: string }
  | { type: "badgeRow"; items: { label: string; tone: DocBadgeTone }[] }
  | { type: "formula"; text: string; note?: string }
  | { type: "divider" }
  | {
      type: "linkGrid";
      items: { title: string; description: string; href: string; external?: boolean }[];
    }
  | { type: "keyValueGrid"; items: { label: string; value: string }[] };

export type DocPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  blocks: DocBlock[];
};

export type DocsNavItem = { slug: string; title: string };
export type DocsNavCategory = { title: string; items: DocsNavItem[] };
