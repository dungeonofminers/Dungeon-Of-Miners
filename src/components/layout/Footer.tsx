import { Send, Twitter, MessageCircle } from "lucide-react";
import { siteConfig, links, navLinks, assets } from "@/content/site";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-void-200">
      <div className="section-shell py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <PlaceholderImage
                src={assets.logoDom}
                alt="Dungeon of Miners logo"
                label="DOM"
                className="h-9 w-9 rounded-lg"
              />
              <span className="font-display text-lg text-ink">Dungeon of Miners</span>
            </div>
            <p className="body-lg mt-4 max-w-sm text-sm">{siteConfig.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={links.telegramCommunity}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram community"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink-muted transition-colors hover:border-gold/40 hover:text-gold"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink-muted transition-colors hover:border-gold/40 hover:text-gold"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={links.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram announcement channel"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink-muted transition-colors hover:border-gold/40 hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">Navigate</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">Play</h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={links.miniApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted transition-colors hover:text-gold"
                >
                  Open Mini App
                </a>
              </li>
              <li>
                <a
                  href={links.telegramCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted transition-colors hover:text-gold"
                >
                  Join Community
                </a>
              </li>
              <li>
                <a
                  href={links.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted transition-colors hover:text-gold"
                >
                  Announcements
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-glow my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Dungeon of Miners. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Pre-TGE ecosystem. Product mechanics and features may evolve.
          </p>
        </div>
      </div>
    </footer>
  );
}
