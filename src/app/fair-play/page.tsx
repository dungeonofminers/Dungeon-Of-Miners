import type { Metadata } from "next";
import { XCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { siteConfig, links, fairPlay } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { EmberField } from "@/components/ui/EmberField";

export const metadata: Metadata = {
  title: `Fair Play Policy — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "What's not allowed in Dungeon of Miners, and what happens if the rules are broken.",
};

export default function FairPlayPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0A0C0F)]" />
        <GlowOrb color="torch" className="left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2" />
        <EmberField count={16} />

        <div className="section-shell relative">
          <SectionHeading
            eyebrow="Fair Play"
            title="Fair Play Policy"
            description="Dungeon of Miners is a shared, finite economy. Everyone mining against the same supply deserves a level playing field — here's how we protect it."
          />
        </div>
      </section>

      <section className="relative py-16">
        <div className="section-shell">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="surface-panel h-full p-7 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="heading-md mt-4 text-lg">Not Allowed</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {fairPlay.notAllowed.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="surface-panel h-full p-7 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                  <ShieldAlert className="h-5 w-5 text-gold" />
                </div>
                <h3 className="heading-md mt-4 text-lg">Possible Actions</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {fairPlay.possibleActions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-ink-faint">
                  We don&apos;t publish the exact detection logic behind these actions — doing so would
                  only help people work around it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="section-shell relative">
          <Reveal>
            <div className="surface-panel mx-auto max-w-2xl px-8 py-12 text-center sm:px-12">
              <h2 className="heading-lg">Play clean. Mine deep.</h2>
              <p className="body-lg mx-auto mt-4 max-w-lg">
                Fair Play protects a shared, finite supply — which means it protects your share of
                it too.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Enter Mini App
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
