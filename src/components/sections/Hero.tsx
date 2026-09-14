"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Lock, Users, Compass } from "lucide-react";
import { links, assets } from "@/content/site";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EmberField } from "@/components/ui/EmberField";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";
import { DungeonStatusStrip } from "@/components/sections/DungeonStatusStrip";

const DungeonHeroBanner = dynamic(() => import("@/components/hero/DungeonHeroBanner"), {
  ssr: false,
});

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0A0C0F)]" />
      <GlowOrb color="torch" className="left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2" />
      <GlowOrb color="gold" className="-right-32 top-40 h-[300px] w-[300px]" />
      <EmberField count={20} />

      <div className="section-shell relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Left: copy, stats, CTAs — left-aligned */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Telegram Mini App · Idle Mining
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-xl mt-6 max-w-xl"
            >
              Mine Deep. Rise Higher.
              <br />
              <span className="text-gradient-gold">Survive The Descent.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="body-lg mt-5 max-w-lg"
            >
              Dungeon of Miners is a Telegram Mini App idle-mining game where players mine{" "}
              <span className="font-semibold text-ink">DOM</span>, rank up by holding, upgrade
              their tools, and descend deeper as the global community unlocks new floors.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-3 max-w-lg text-sm text-ink-muted"
            >
              Mining has not started yet. Prepare your miner, join the community, and secure your
              place before the first descent begins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
            >
              <GenesisStatusBadge />
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                <Lock className="h-3 w-3" />
                Floor I: Locked
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Enter Mini App
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/game#the-descent" className="btn-secondary">
                Explore The Descent
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5"
            >
              <a
                href="/tokenomics"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs transition-colors hover:border-gold/30 hover:bg-white/[0.06]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-ink-faint">Token Status</span>
                <span className="font-semibold text-gold">Pre-TGE</span>
                <ArrowRight className="h-3 w-3 text-gold" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-5 text-xs uppercase tracking-widest text-ink-faint"
            >
              Pre-TGE · No prize pool · Fully transparent economy
            </motion.p>
          </div>

          {/* Right: large floating logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto flex justify-center lg:justify-end"
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-gold/40 blur-3xl"
              animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <PlaceholderImage
                src={assets.logoDragonCoin}
                alt="Dungeon of Miners DOM token"
                label="DOM Token"
                className="h-64 w-64 rounded-full shadow-glow-gold sm:h-80 sm:w-80 lg:h-96 lg:w-96"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-14 w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]"
        >
          <DungeonStatusStrip />
        </motion.div>

        {/* Hero visual composition — skipped entirely on mobile, not just hidden */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto mt-10 max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <DungeonHeroBanner />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void-300 via-transparent to-transparent" />
            </div>

            {/* Floating UI cards — game rules and Genesis facts, never fake live stats */}
            <FloatingCard
              className="-left-4 top-8 hidden sm:flex lg:-left-10"
              delay={0.6}
              icon={<Lock className="h-4 w-4 text-torch" />}
              label="Current Floor"
              value="Floor I · Rubble"
            />
            <FloatingCard
              className="-right-4 top-4 hidden sm:flex lg:-right-10"
              delay={0.7}
              icon={<Compass className="h-4 w-4 text-gold" />}
              label="Genesis"
              value="Not Started"
            />
            <FloatingCard
              className="-bottom-6 left-6 hidden sm:flex lg:left-16"
              delay={0.8}
              icon={<Sparkles className="h-4 w-4 text-gold" />}
              label="Rank System"
              value="Novice → Legend"
            />
            <FloatingCard
              className="-bottom-6 right-6 hidden sm:flex lg:right-16"
              delay={0.9}
              icon={<Users className="h-4 w-4 text-emerald-glow" />}
              label="Guild Bonus"
              value="+15%"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function FloatingCard({
  icon,
  label,
  value,
  className,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute z-10 animate-float-slow items-center gap-3 rounded-xl border border-white/10 bg-void-200/90 px-4 py-3 shadow-2xl backdrop-blur-md ${className}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-ink-faint">{label}</p>
        <p className="text-sm font-bold text-ink">{value}</p>
      </div>
    </motion.div>
  );
}
