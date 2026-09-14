import { Send, Smartphone, ArrowRight, Bell } from "lucide-react";
import { assets, links } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { GlowOrb } from "@/components/ui/GlowOrb";

export function Platforms() {
  return (
    <section id="platforms" className="relative overflow-hidden py-24 sm:py-32">
      <GlowOrb color="gold" className="-left-32 top-1/3 h-[380px] w-[380px]" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Where to Play"
          title="Available on Telegram. Android is on the way."
          description="No download, no setup — the Dungeon of Miners Mini App is open now for Genesis prep, even though mining itself hasn't started. A dedicated Android app is next for players who want it on their home screen."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            <Reveal>
              <div className="surface-panel flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-glow/30 bg-emerald-glow/10">
                  <Send className="h-5 w-5 text-emerald-glow" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-ink">Telegram Mini App</h3>
                    <span className="rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-glow">
                      Open for Genesis Prep
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">
                    Open it directly inside Telegram — nothing to install.
                  </p>
                </div>
                <a
                  href={links.miniApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary shrink-0 !px-4 !py-2.5 text-sm"
                >
                  Open
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="surface-panel flex items-center gap-4 p-6 opacity-80">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <Smartphone className="h-5 w-5 text-ink-faint" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-ink">Android App</h3>
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                      Coming Soon
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">
                    A standalone app is in development for a home-screen experience.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-ink-faint">
                  <Bell className="h-3.5 w-3.5" />
                  Soon
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-gold/20 blur-[100px]"
              />
              <PlaceholderImage
                src={assets.telegramMockup}
                alt="Dungeon of Miners Telegram Mini App screens — Mine and Me tabs"
                label="Telegram Mini App Mockup"
                aspect="aspect-auto"
                className="w-full min-h-[320px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
