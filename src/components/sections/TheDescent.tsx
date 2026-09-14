"use client";

import { motion } from "framer-motion";
import { Flame, Timer, TrendingDown, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

const triggers = [
  {
    icon: TrendingDown,
    title: "Floor Allocation Runs Out",
    description: "Every floor carries a fixed DOM supply. Once the community mines it dry, the descent triggers.",
  },
  {
    icon: Timer,
    title: "Or 90 Days Pass",
    description: "Whichever comes first. No floor lasts forever — scarcity is on a clock as well as a counter.",
  },
  {
    icon: Flame,
    title: "Global Speed Is Halved",
    description: "The next floor begins with mining speed cut by half for the entire community, worldwide.",
  },
];

export function TheDescent() {
  return (
    <section id="the-descent" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(185,74,29,0.15),transparent)]" />
      <GlowOrb color="torch" className="left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2" />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="The Signature Mechanic"
          title="The Descent: scarcity, made visible"
          description="This is what sets Dungeon of Miners apart. Not a promise of scarcity — a public, unavoidable event the entire world experiences at once."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-16 max-w-4xl overflow-hidden p-8 sm:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-torch">Current Floor</p>
                <p className="heading-md mt-1">Floor 2 · Hollow</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-torch/30 bg-torch/10 px-4 py-2">
                <Zap className="h-4 w-4 text-torch" />
                <span className="text-xs font-semibold text-torch">Descent Hour: 2× bonus live</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>Floor allocation mined</span>
                <span className="font-semibold text-ink">742,000,000 / 1,200,000,000 DOM</span>
              </div>
              <div className="relative mt-3 h-4 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "62%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="relative h-full rounded-full bg-gradient-to-r from-torch-ember via-torch to-gold"
                >
                  <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] bg-[length:200%_100%]" />
                </motion.div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-ink-faint">
                <span>62% depleted</span>
                <span>34 days remaining · 90-day cap</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
              <Stat label="Global Rate" value="150 DOM/hr avg" />
              <Stat label="Next Floor Rate" value="½× current" accent />
              <Stat label="Miners Active" value="On Floor 2" />
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {triggers.map((t, i) => (
            <Reveal key={t.title} delay={0.15 + i * 0.1}>
              <div className="surface-panel h-full p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-torch/25 bg-torch/10">
                  <t.icon className="h-4.5 w-4.5 text-torch" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{t.title}</h3>
                <p className="body-lg mt-2 text-sm">{t.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-ink-faint">{label}</p>
      <p className={`mt-1 font-display text-lg ${accent ? "text-torch" : "text-ink"}`}>{value}</p>
    </div>
  );
}
