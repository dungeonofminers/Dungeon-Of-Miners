"use client";

import { motion } from "framer-motion";
import { ChevronDown, Gauge, GitCommitVertical } from "lucide-react";
import { halvings, assets, economyConfig, halvingTrigger, withdrawalConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";

const CURRENT_HALVING = economyConfig.currentHalving;

const STATUS_CLASS: Record<string, string> = {
  CURRENT: "border-gold/30 bg-gold/10 text-gold",
  UPCOMING: "border-white/15 bg-white/[0.06] text-ink-muted",
  LOCKED: "border-white/15 bg-white/[0.06] text-ink-faint",
};

export function TheDescent() {
  const current = halvings.find((h) => h.number === CURRENT_HALVING)!;
  const next = halvings.find((h) => h.number === CURRENT_HALVING + 1);

  return (
    <section id="halvings" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(185,74,29,0.15),transparent)]" />
      <GlowOrb color="torch" className="left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2" />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="The Six Halvings"
          title="Every Halving Makes DOM Harder to Mine."
          description="DOM mining begins at its highest emission rate. As the network advances through six Halving eras, mining emissions progressively decrease, making every new DOM harder to extract. The deeper the ecosystem goes, the scarcer the rewards become."
        />

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 text-center">
            <span className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-faint">
              Halving Trigger: {halvingTrigger}
            </span>
            <p className="mt-2 text-sm text-ink-faint">
              Mine early. Upgrade wisely. Prepare for the next Halving.
            </p>
          </div>
        </Reveal>

        {/* Current Halving status */}
        <Reveal delay={0.2}>
          <div className="surface-panel mx-auto mt-6 max-w-4xl overflow-hidden p-8 sm:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-torch">Current Halving</p>
                <p className="heading-md mt-1">
                  Halving {current.number} · {current.name}
                </p>
              </div>
              <GenesisStatusBadge />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
              <Stat label="Current Multiplier" value={current.multiplier} accent />
              <Stat label="Next Halving Multiplier" value={next?.multiplier ?? "—"} />
              <Stat label="Next Halving Trigger" value={halvingTrigger} />
            </div>
          </div>
        </Reveal>

        {/* Timeline: H1 -> H6 */}
        <div className="relative mx-auto mt-20 max-w-md">
          {/* Flanking ornaments — desktop only. Network config is not yet confirmed. */}
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
                <NetworkBadge className="h-24 w-24" />
              </div>
              <span className="max-w-[150px] text-center text-[11px] text-ink-faint">
                Network: {withdrawalConfig.network}
              </span>
            </motion.div>
          </div>

          <div className="text-center">
            <p className="eyebrow mx-auto">The Full Timeline</p>
            <h3 className="heading-md mt-4">Six Halvings. One mining economy.</h3>
          </div>

          <div className="mx-auto mt-10 flex flex-col items-center">
            {halvings.map((halving, i) => (
              <div key={halving.number} className="flex w-full flex-col items-center">
                <Reveal delay={i * 0.12}>
                  <div
                    className={`relative flex w-64 flex-col items-center rounded-2xl border px-8 py-5 text-center ${
                      halving.status === "CURRENT"
                        ? "border-torch/40 bg-torch/10 shadow-glow-torch"
                        : "border-white/10 bg-white/[0.03] opacity-70"
                    }`}
                  >
                    <span
                      className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${STATUS_CLASS[halving.status]}`}
                    >
                      {halving.status === "LOCKED" && <GitCommitVertical className="h-2.5 w-2.5" />}
                      {halving.status}
                    </span>
                    <span className="font-display text-3xl text-gold">H{halving.number}</span>
                    <span className="mt-1 text-sm font-semibold text-ink">{halving.name}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 font-mono text-xs font-bold text-torch">
                      <Gauge className="h-3 w-3" />
                      {halving.multiplier}
                    </span>
                  </div>
                </Reveal>

                {i < halvings.length - 1 && (
                  <Reveal delay={i * 0.12 + 0.06}>
                    <div className="flex flex-col items-center py-2">
                      <ChevronDown className="h-4 w-4 text-torch/50" />
                      <span className="my-1.5 rounded-full border border-torch/30 bg-torch/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-torch">
                        Halving
                      </span>
                      <ChevronDown className="h-4 w-4 text-torch/50" />
                    </div>
                  </Reveal>
                )}
              </div>
            ))}
          </div>

          <Reveal delay={halvings.length * 0.12 + 0.1}>
            <p className="mx-auto mt-8 max-w-sm text-center text-xs text-ink-faint">
              There is no Halving 7. Once Halving 6 is reached, DOM mining emission runs at its
              lowest, final rate.
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

/** Self-contained network coin mark — no shared <defs>, safe to render alongside other SVGs on the page. */
function NetworkBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Network">
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
