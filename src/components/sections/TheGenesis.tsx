"use client";

import { Zap } from "lucide-react";
import { halvingFacts, halvings, economyConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";

export function TheGenesis() {
  const currentHalving = halvings.find((h) => h.number === economyConfig.currentHalving);
  if (!currentHalving) return null;

  return (
    <section id="halving-status" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(244,181,68,0.12),transparent)]" />
      <GlowOrb color="gold" className="right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2" />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="The Halving Status"
          title="Mining Is Live — Halving 1 Is Underway"
          description="Halving 1 is the first of six equal eras carved from the mining pool. Each Halving must be fully mined out before the network advances to the next."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-14 max-w-4xl overflow-hidden p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-torch/25 bg-torch/10">
                  <Zap className="h-5 w-5 text-torch" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-faint">Current Halving</p>
                  <p className="heading-md mt-1">
                    Halving {currentHalving.number} · {currentHalving.name}
                  </p>
                </div>
              </div>
              <GenesisStatusBadge />
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm text-ink-muted">
              Live mining totals (DOM mined, remaining allocation, active miners) are displayed
              once the connected backend is live. This page never shows a fabricated number.
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
              {halvingFacts.map((fact) => (
                <div key={fact.label}>
                  <p className="text-xs uppercase tracking-wider text-ink-faint">{fact.label}</p>
                  <p className="mt-1 font-display text-base text-ink sm:text-lg">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
