"use client";

import { motion } from "framer-motion";
import { ChevronDown, Timer, TrendingDown, Lock } from "lucide-react";
import { floors, assets, economyConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";

const CURRENT_FLOOR_INDEX = economyConfig.currentFloorIndex;

const conditions = [
  {
    icon: TrendingDown,
    title: "Floor Allocation Depleted",
    description: "Every floor carries a finite DOM allocation. The instant the community mines it dry, the trigger fires.",
  },
  {
    icon: Timer,
    title: "90 Days Elapsed",
    description: "No floor lasts forever. If 90 days pass before the supply runs out, the trigger fires anyway.",
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
          title="The Descent"
          description="Every floor carries a finite allocation of DOM. When its supply is exhausted — or 90 days pass — the entire dungeon descends. Mining becomes scarcer, a new floor opens, and the next chapter begins."
        />

        {/* Trigger conditions */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
          {conditions.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.1}
              className={i === 0 ? "order-1" : "order-3"}
            >
              <div className="surface-panel flex h-full items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-torch/25 bg-torch/10">
                  <c.icon className="h-4.5 w-4.5 text-torch" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted">{c.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="order-2 flex items-center justify-center">
            <span className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-faint">
              Or — whichever first
            </span>
          </div>
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-faint">
            The Descent begins only after Genesis Mining starts. Each floor stays active until
            either its allocated supply is exhausted or 90 days pass — whichever happens first.
          </p>
        </Reveal>

        {/* Pre-Genesis status */}
        <Reveal delay={0.2}>
          <div className="surface-panel mx-auto mt-6 max-w-4xl overflow-hidden p-8 sm:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-torch">Current Floor</p>
                <p className="heading-md mt-1">Floor I · Rubble</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Locked — Waiting for Genesis
                </p>
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

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
              <Stat label="Base Floor Multiplier" value="×1.00" />
              <Stat label="Next Floor Rate" value="×0.50" accent />
              <Stat label="Genesis Start" value="TBA" />
            </div>
          </div>
        </Reveal>

        {/* Cinematic cascade: what The Descent does across all 6 floors */}
        <div className="relative mx-auto mt-20 max-w-md">
          {/* Flanking ornaments — desktop only. DOM launches on BNB Chain (BEP-20). */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            <motion.div
              className="absolute -left-48 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
              animate={{ y: ["-10px", "10px", "-10px"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-2xl" />
                <PlaceholderImage
                  src={assets.logoDragonCoin}
                  alt="DOM token"
                  label="DOM Token"
                  className="h-24 w-24 rounded-full shadow-glow-gold"
                />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                DOM
              </span>
            </motion.div>

            <motion.div
              className="absolute -right-48 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
              animate={{ y: ["10px", "-10px", "10px"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-full bg-gold/25 blur-2xl" />
                <BnbBadge className="h-24 w-24" />
              </div>
              <span className="max-w-[150px] text-center text-[11px] text-ink-faint">
                DOM launches on BNB Chain (BEP-20)
              </span>
            </motion.div>
          </div>

          <div className="text-center">
            <p className="eyebrow mx-auto">The Full Cascade</p>
            <h3 className="heading-md mt-4">Six floors. Five Descents.</h3>
          </div>

          <div className="mx-auto mt-10 flex flex-col items-center">
            {floors.map((floor, i) => (
            <div key={floor.index} className="flex w-full flex-col items-center">
              <Reveal delay={i * 0.12}>
                <div
                  className={`relative flex w-64 flex-col items-center rounded-2xl border px-8 py-5 text-center ${
                    floor.index === CURRENT_FLOOR_INDEX
                      ? "border-torch/40 bg-torch/10 shadow-glow-torch"
                      : "border-white/10 bg-white/[0.03] opacity-70"
                  }`}
                >
                  <span
                    className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      floor.index === CURRENT_FLOOR_INDEX
                        ? "border-gold/30 bg-gold/10 text-gold"
                        : "border-white/15 bg-white/[0.06] text-ink-faint"
                    }`}
                  >
                    <Lock className="h-2.5 w-2.5" />
                    {floor.index === CURRENT_FLOOR_INDEX ? "Opens at Genesis" : "Locked"}
                  </span>
                  <span className="font-display text-3xl text-gold">{floor.roman}</span>
                  <span className="mt-1 text-sm font-semibold text-ink">{floor.name}</span>
                  <span className="mt-2 rounded-full bg-white/[0.06] px-3 py-1 font-mono text-xs font-bold text-torch">
                    {floor.rateMultiplier}
                  </span>
                </div>
              </Reveal>

              {i < floors.length - 1 && (
                <Reveal delay={i * 0.12 + 0.06}>
                  <div className="flex flex-col items-center py-2">
                    <ChevronDown className="h-4 w-4 text-torch/50" />
                    <span className="my-1.5 rounded-full border border-torch/30 bg-torch/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-torch">
                      The Descent
                    </span>
                    <ChevronDown className="h-4 w-4 text-torch/50" />
                  </div>
                </Reveal>
              )}
            </div>
          ))}
          </div>

          <Reveal delay={floors.length * 0.12 + 0.1}>
            <p className="mx-auto mt-8 max-w-sm text-center text-xs text-ink-faint">
              There is no Floor VII. Once The Abyss&apos;s allocation is exhausted, DOM emission
              ends permanently.
            </p>
          </Reveal>
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

function diamondPoints(cx: number, cy: number, r: number) {
  return `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
}

/** Self-contained BNB Chain coin mark — no shared <defs>, safe to render alongside other SVGs on the page. */
function BnbBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="BNB Chain">
      <defs>
        <linearGradient id="descentBnbRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="100%" stopColor="#D9A614" />
        </linearGradient>
        <radialGradient id="descentBnbFace" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFE070" />
          <stop offset="100%" stopColor="#F0B90B" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#descentBnbRim)" />
      <circle cx="50" cy="50" r="42" fill="url(#descentBnbFace)" stroke="rgba(255,255,255,0.35)" strokeWidth={0.75} />
      <g fill="#161D31">
        <polygon points={diamondPoints(50, 30, 8)} />
        <polygon points={diamondPoints(50, 70, 8)} />
        <polygon points={diamondPoints(30, 50, 8)} />
        <polygon points={diamondPoints(70, 50, 8)} />
        <polygon points={diamondPoints(50, 50, 10)} />
      </g>
    </svg>
  );
}
