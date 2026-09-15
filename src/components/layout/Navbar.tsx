"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navGroups, navTopLevel, links, assets, economyConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setOpenAccordion(null);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.05] bg-void-300/55 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="section-shell flex h-16 items-center justify-between sm:h-20">
        <a href="/#top" className="flex h-full shrink-0 items-center gap-2.5">
          <PlaceholderImage
            src={assets.logoDom}
            alt="Dungeon of Miners logo"
            label="DOM"
            className="h-10 w-10 rounded-lg sm:h-11 sm:w-11"
            aspect="aspect-square"
          />
          <span className="font-display text-base tracking-wide text-ink sm:text-lg">
            Dungeon of Miners
          </span>
        </a>

        <div className="hidden items-center gap-1 xl:flex">
          {navGroups.map((group) => (
            <NavDropdown
              key={group.label}
              group={group}
              isOpen={openGroup === group.label}
              onOpen={() => setOpenGroup(group.label)}
              onClose={() => setOpenGroup((v) => (v === group.label ? null : v))}
            />
          ))}
          <a
            href={navTopLevel.href}
            className="whitespace-nowrap rounded-lg px-3.5 py-2 text-sm text-ink-muted transition-colors hover:text-gold"
          >
            {navTopLevel.label}
          </a>
        </div>

        <div className="hidden xl:block">
          <a
            href={links.miniApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/15"
          >
            Enter Mini App
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-ink xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-void-300 backdrop-blur-xl xl:hidden">
          <div className="section-shell flex flex-col gap-1 py-4">
            {navGroups.map((group) => {
              const isOpen = openAccordion === group.label;
              return (
                <div key={group.label} className="border-b border-white/[0.06] last:border-0">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : group.label)}
                    className="flex min-h-[44px] w-full items-center justify-between py-3 text-left text-sm font-semibold text-ink"
                    aria-expanded={isOpen}
                  >
                    {group.label}
                    <span className="text-lg leading-none text-ink-faint">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden pb-2">
                      {group.items.map((item) =>
                        item.comingSoon ? (
                          <span
                            key={item.label}
                            className="flex min-h-[44px] items-center px-3 text-sm text-ink-faint"
                          >
                            {item.label} · Coming Soon
                          </span>
                        ) : (
                          <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            onClick={() => setOpen(false)}
                            className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-gold"
                          >
                            {item.label}
                            {item.label === "Halving" && <GenesisDot />}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <a
              href={navTopLevel.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center py-3 text-sm font-semibold text-ink"
            >
              {navTopLevel.label}
            </a>

            <a
              href={links.miniApp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 justify-center"
            >
              Enter Mini App
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-glow">
                Mining Live
              </span>
              <span className="text-[10px] text-ink-faint">· Halving 1 · Starting Era</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function GenesisDot() {
  if (economyConfig.miningStatus !== "LIVE") return null;
  return <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-glow" aria-hidden />;
}

function NavDropdown({
  group,
  isOpen,
  onOpen,
  onClose,
}: {
  group: { label: string; items: { label: string; href: string; external?: boolean; comingSoon?: boolean }[] };
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
        className="flex items-center gap-1 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm text-ink-muted transition-colors hover:text-gold"
      >
        {group.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <div
        className={cn(
          "absolute left-0 top-full z-50 w-56 origin-top-left pt-2 transition-all duration-150",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="overflow-hidden rounded-xl border border-white/10 bg-void-100 p-1.5 shadow-2xl shadow-black/50">
          {group.items.map((item) =>
            item.comingSoon ? (
              <span
                key={item.label}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink-faint"
              >
                {item.label}
                <span className="text-[9px] uppercase tracking-wider">Soon</span>
              </span>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-gold/10 hover:text-gold"
              >
                {item.label}
                {item.label === "Halving" && <GenesisDot />}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
