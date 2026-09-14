"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, links, assets } from "@/content/site";
import { cn } from "@/lib/utils";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.05] bg-void-300/55 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="section-shell flex h-14 items-center justify-between sm:h-16">
        <a href="#top" className="flex items-center gap-2.5">
          <PlaceholderImage
            src={assets.logoDom}
            alt="Dungeon of Miners logo"
            label="DOM"
            className="h-8 w-8 rounded-lg sm:h-9 sm:w-9"
            aspect="aspect-square"
          />
          <span className="font-display text-base tracking-wide text-ink sm:text-lg">
            Dungeon of Miners
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href={links.miniApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/15"
          >
            Open Mini App
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-void-300/98 backdrop-blur-xl lg:hidden">
          <div className="section-shell flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href={links.miniApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2"
            >
              Open Mini App
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
