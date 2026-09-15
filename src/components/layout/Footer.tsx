import { Send, Twitter, MessageCircle } from "lucide-react";
import { siteConfig, links, navTopLevel, assets } from "@/content/site";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const exploreLinks = [
  { label: "Game", href: "/game" },
  { label: "Economy", href: "/economy" },
  { label: "Halving", href: "/halving" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Guilds", href: "/community/guilds" },
  { label: navTopLevel.label, href: navTopLevel.href },
];

const resourceLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Fair Play", href: "/fair-play" },
  { label: "Changelog", href: "/changelog" },
  { label: "Risk Disclosure", href: "/risk-disclosure" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-void-200">
      <div className="section-shell py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          <div className="col-span-2">
            <a href="/#top" className="flex items-center gap-2.5">
              <PlaceholderImage
                src={assets.logoDom}
                alt="Dungeon of Miners logo"
                label="DOM"
                className="h-9 w-9 rounded-lg"
              />
              <span className="font-display text-lg text-ink">Dungeon of Miners</span>
            </a>
            <p className="body-lg mt-3 max-w-sm text-sm">{siteConfig.description}</p>
            <div className="mt-5 flex items-center gap-3">
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">Explore</h4>
            <ul className="mt-3 flex flex-col gap-2.5">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-block py-0.5 text-sm text-ink-muted transition-colors hover:text-gold">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">Resources</h4>
            <ul className="mt-3 flex flex-col gap-2.5">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-block py-0.5 text-sm text-ink-muted transition-colors hover:text-gold">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.telegramCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-0.5 text-sm text-ink-muted transition-colors hover:text-gold"
                >
                  Contact / Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-glow my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Dungeon of Miners. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Live mining ecosystem. Terms of Service and Privacy Policy — Soon.
          </p>
        </div>
      </div>
    </footer>
  );
}
