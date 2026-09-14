"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { genesisFacts } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";

export function TheGenesis() {
  return (
    <section id="genesis" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(244,181,68,0.12),transparent)]" />
      <GlowOrb color="gold" className="right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2" />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="The Genesis"
          title="The First Descent Begins Here"
          description="Genesis Mining has not started. Floor I — Rubble — carries the largest allocation in the game, and it stays locked until Genesis officially opens."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-14 max-w-4xl overflow-hidden p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <Lock className="h-5 w-5 text-ink-faint" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-faint">Current Floor</p>
                  <p className="heading-md mt-1">Floor I · Rubble</p>
                </div>
              </div>
              <GenesisStatusBadge />
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>Floor allocation mined</span>
                <span className="font-semibold text-ink">0 / 3,000,000,000 DOM</span>
              </div>
              <div className="relative mt-3 h-4 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "0%" }}
                  viewport={{ once: true }}
                  className="relative h-full rounded-full bg-gradient-to-r from-torch-ember via-torch to-gold"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-ink-faint">
                <span>0% depleted</span>
                <span>90-Day Countdown Begins at Genesis</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/[0.06] pt-8 sm:grid-cols-4">
              {genesisFacts.map((fact) => (
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
