import { ArrowRight, Send } from "lucide-react";
import { links } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { EmberField } from "@/components/ui/EmberField";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(244,181,68,0.12),transparent)]" />
      <GlowOrb color="gold" className="left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2" />
      <EmberField count={16} />

      <div className="section-shell relative">
        <Reveal>
          <div className="surface-panel mx-auto max-w-3xl px-8 py-16 text-center sm:px-14">
            <div className="flex justify-center">
              <GenesisStatusBadge />
            </div>
            <h2 className="heading-xl mt-6 text-4xl">
              Ready to <span className="text-gradient-gold">Prepare for Genesis?</span>
            </h2>
            <p className="body-lg mx-auto mt-5 max-w-xl">
              Mining hasn&apos;t started yet. Join the community, create your miner profile, and be
              ready the moment The First Descent begins.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={links.miniApp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Enter Mini App
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={links.telegramCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Send className="h-4 w-4" />
                Join Community
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
