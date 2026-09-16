"use client";

import { usePathname } from "next/navigation";
import { docsNav } from "@/content/docs";
import { cn } from "@/lib/utils";

function LinkList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isIntroActive = pathname === "/docs";

  return (
    <nav className="flex flex-col gap-6">
      <div>
        <a
          href="/docs"
          onClick={onNavigate}
          className={cn(
            "flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold transition-colors",
            isIntroActive ? "bg-gold/10 text-gold" : "text-ink hover:bg-white/[0.04] hover:text-gold"
          )}
        >
          Introduction
        </a>
      </div>

      {docsNav.map((category) => (
        <div key={category.title}>
          <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            {category.title}
          </p>
          <div className="flex flex-col gap-0.5">
            {category.items.map((item) => {
              const href = `/docs/${item.slug}`;
              const active = pathname === href;
              return (
                <a
                  key={item.slug}
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "flex min-h-[44px] items-center rounded-lg px-3 text-sm transition-colors",
                    active
                      ? "bg-gold/10 font-semibold text-gold"
                      : "text-ink-muted hover:bg-white/[0.04] hover:text-ink"
                  )}
                >
                  {item.title}
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)] lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:pb-10 lg:pr-2">
      <LinkList />
    </aside>
  );
}

export function DocsMobileNav() {
  return (
    <details className="group mb-2 rounded-xl border border-white/[0.08] bg-white/[0.02] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink">
        Browse Documentation
        <span className="text-ink-faint transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="max-h-[60vh] overflow-y-auto border-t border-white/[0.08] px-2 py-3">
        <LinkList />
      </div>
    </details>
  );
}
