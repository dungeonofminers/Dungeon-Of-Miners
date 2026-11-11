"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Users, Wallet } from "lucide-react";
import { assets, referralProgram, links } from "@/content/site";
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
              Mining Ecosystem
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-xl mt-6 max-w-xl"
            >
              Mine DOM.
              <br />
              Upgrade Your Pickaxe.
              <br />
              <span className="text-gradient-gold">Survive the Halving.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="body-lg mt-5 max-w-lg"
            >
              Mine DOM through the Dungeon of Miners ecosystem. Fixed{" "}
              <span className="font-semibold text-ink">1B supply</span>, six Halving eras,
              and on-chain BSC withdrawals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
            >
              <GenesisStatusBadge />
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                <Zap className="h-3 w-3" />
                Halving 1 · Starting Era
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-7 flex w-full max-w-xs flex-col gap-3 sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
            >
              <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
                <Zap className="h-4 w-4" />
                Start Mining
              </a>
              <a href="/economy" className="btn-secondary w-full sm:w-auto">
                View Economy
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5"
            >
              <a
                href="/economy#withdrawal"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs transition-colors hover:border-gold/30 hover:bg-white/[0.06]"
              >
                <Wallet className="h-3.5 w-3.5 text-gold" />
                <span className="text-ink-faint">Withdrawal</span>
                <span className="font-semibold text-gold">On-Chain · Zero Fee</span>
                <ArrowRight className="h-3 w-3 text-gold" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-5 text-xs uppercase tracking-widest text-ink-faint"
            >
              1B Fixed Supply · 6 Halvings · Zero Withdrawal Fee
            </motion.p>
          </div>

          {/* Right: large floating & 3D spinning/flipping logo with dual mining pickaxes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto flex flex-col items-center justify-center"
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-gold/40 blur-3xl"
              animate={{ opacity: [0.45, 0.9, 0.45], scale: [0.88, 1.18, 0.88] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex items-center justify-center">
              {/* Top-Right Pickaxe mining the coin */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-5 z-20 sm:-right-10 sm:-top-11 lg:-right-12 lg:-top-12"
              >
                <motion.div
                  style={{ transformOrigin: "70% 80%" }}
                  animate={{
                    rotate: [18, -32, 18],
                    x: [6, -8, 6],
                    y: [-6, 10, -6],
                  }}
                  transition={{
                    duration: 1.35,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],
                    times: [0, 0.38, 1],
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assets.pickaxeLevel6}
                    alt=""
                    className="h-[4.25rem] w-[4.25rem] -scale-x-100 select-none object-contain drop-shadow-[0_10px_22px_rgba(244,181,68,0.55)] sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                  />
                </motion.div>
                {/* Impact spark at top-right rim */}
                <motion.span
                  className="absolute bottom-3 left-3 h-2.5 w-2.5 rounded-full bg-gold-light blur-[2px] shadow-[0_0_18px_6px_rgba(252,217,138,0.95)] sm:bottom-5 sm:left-4 sm:h-3.5 sm:w-3.5"
                  animate={{ scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.35,
                    repeat: Infinity,
                    times: [0.3, 0.39, 0.58],
                  }}
                />
              </div>

              {/* Bottom-Left Pickaxe mining the coin */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-5 -left-4 z-20 sm:-bottom-10 sm:-left-10 lg:-bottom-12 lg:-left-12"
              >
                <motion.div
                  style={{ transformOrigin: "30% 85%" }}
                  animate={{
                    rotate: [-22, 28, -22],
                    x: [-6, 8, -6],
                    y: [6, -10, 6],
                  }}
                  transition={{
                    duration: 1.35,
                    delay: 0.67,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],
                    times: [0, 0.38, 1],
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assets.pickaxeLevel3}
                    alt=""
                    className="h-[4.25rem] w-[4.25rem] select-none object-contain drop-shadow-[0_10px_22px_rgba(244,181,68,0.5)] sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                  />
                </motion.div>
                {/* Impact spark at bottom-left rim */}
                <motion.span
                  className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-gold-light blur-[2px] shadow-[0_0_18px_6px_rgba(252,217,138,0.95)] sm:right-4 sm:top-5 sm:h-3.5 sm:w-3.5"
                  animate={{ scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.35,
                    delay: 0.67,
                    repeat: Infinity,
                    times: [0.3, 0.39, 0.58],
                  }}
                />
              </div>

              <div className="coin-levitate-3d relative z-10">
                <PlaceholderImage
                  src={assets.logoDragonCoin}
                  alt="Dungeon of Miners DOM token"
                  label="DOM Token"
                  className="h-48 w-48 rounded-full shadow-glow-gold sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                />
              </div>
            </div>

            {/* Levitation ground shadow + Symmetrical Hologram Terminal Pedestal */}
            <div className="relative mt-5 flex w-full flex-col items-center sm:mt-6">
              <motion.div
                aria-hidden
                className="-top-3 absolute h-5 w-40 rounded-full bg-gold/30 blur-xl sm:w-64"
                animate={{ scaleX: [1, 0.75, 1], opacity: [0.6, 0.28, 0.6] }}
                transition={{ duration: 3.25, repeat: Infinity, ease: "easeInOut" }}
              />
              <GlitchTerminalTag />
            </div>
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

            {/* Floating UI cards — game rules and live facts, never fake live stats */}
            <FloatingCard
              className="-left-4 top-8 hidden sm:flex lg:-left-10"
              delay={0.6}
              icon={<Zap className="h-4 w-4 text-torch" />}
              label="Current Halving"
              value="Halving 1 · Starting Era"
            />
            <FloatingCard
              className="-right-4 top-4 hidden sm:flex lg:-right-10"
              delay={0.7}
              icon={<Wallet className="h-4 w-4 text-gold" />}
              label="Withdrawal"
              value="On-Chain"
            />
            <FloatingCard
              className="-bottom-6 left-6 hidden sm:flex lg:left-16"
              delay={0.8}
              icon={<Sparkles className="h-4 w-4 text-gold" />}
              label="Pickaxe Level"
              value="Level 1 → Level 6"
            />
            <FloatingCard
              className="-bottom-6 right-6 hidden sm:flex lg:right-16"
              delay={0.9}
              icon={<Users className="h-4 w-4 text-emerald-glow" />}
              label="Referral Reward"
              value={`${referralProgram.rewardDom} DOM / friend`}
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

const TERMINAL_PHRASES = [
  "[ // MINE YOUR FIRST $DOM // ]",
  "[ // COME JOIN THE $DOM FAMILY // ]",
  "[ // 1,000,000,000 FIXED SUPPLY // ]",
  "[ // ZERO FEE ON-CHAIN WITHDRAW // ]",
];

const GLITCH_CHARS = "01#$%&*@/\\<>[]_~=";

function GlitchTerminalTag() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [display, setDisplay] = useState(TERMINAL_PHRASES[0]);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const holdTimer = setTimeout(() => {
      if (cancelled) return;
      const nextIdx = (phraseIdx + 1) % TERMINAL_PHRASES.length;
      const nextTarget = TERMINAL_PHRASES[nextIdx];
      setGlitching(true);

      let step = 0;
      const totalSteps = 12;

      const decodeTimer = setInterval(() => {
        if (cancelled) return;
        step++;
        const revealRatio = step / totalSteps;

        const out = nextTarget
          .split("")
          .map((ch, i) => {
            if (ch === " " || ch === "[" || ch === "]" || ch === "/") return ch;
            const charProgress = i / nextTarget.length;
            if (revealRatio > charProgress + 0.25) return ch;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("");

        setDisplay(out);

        if (step >= totalSteps) {
          clearInterval(decodeTimer);
          setDisplay(nextTarget);
          setGlitching(false);
          setPhraseIdx(nextIdx);
        }
      }, 40);
    }, 2800);

    return () => {
      cancelled = true;
      clearTimeout(holdTimer);
    };
  }, [phraseIdx]);

  return (
    <div
      className={`relative inline-flex w-full max-w-[275px] items-center justify-center gap-2 overflow-hidden rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-wide backdrop-blur-md transition-all duration-200 sm:w-auto sm:max-w-none sm:min-w-[330px] sm:gap-2.5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-wider ${
        glitching
          ? "glitch-terminal border-torch/60 bg-void-100/95 text-torch shadow-[0_0_28px_-4px_rgba(255,138,42,0.65)]"
          : "border-gold/35 bg-void-200/85 text-gold-light shadow-[0_0_30px_-6px_rgba(244,181,68,0.45)]"
      }`}
    >
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-glow" />
      <span className="truncate whitespace-nowrap">{display}</span>
      <span className="inline-block h-3 w-1 shrink-0 animate-pulse bg-gold sm:h-3.5 sm:w-1.5" />
    </div>
  );
}
