"use client";

import { useEffect, useRef, useState } from "react";
import { domEcosystem, assets } from "@/content/site";
import { useEcosystemAnimation } from "./useEcosystemAnimation";
import { cn } from "@/lib/utils";

const CORE_X = 50;
const CORE_Y = 46;

const STATUS_CLASS: Record<string, string> = {
  LIVE: "border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow",
  "IN PROGRESS": "border-gold/30 bg-gold/10 text-gold",
  PLANNED: "border-white/15 bg-white/[0.04] text-ink-faint",
  "COMING SOON": "border-white/15 bg-white/[0.04] text-ink-faint",
};

const DUST_PARTICLES = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  x: 8 + ((i * 37) % 84),
  y: 6 + ((i * 53) % 88),
  delay: (i * 0.9) % 4,
  duration: 5 + (i % 3),
}));

export function EcosystemDiagram({ play }: { play: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particleRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const primaryRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  const [introDone, setIntroDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Dim inactive nodes on hover by writing style.opacity directly — GSAP
  // owns this same property for the intro/ambient animation, and inline
  // styles always beat CSS-class opacity, so this has to use the same
  // mechanism rather than a Tailwind class to actually take visible effect.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isMobile || !introDone) return;
    const nodeEls = root.querySelectorAll<HTMLDivElement>("[data-node]");
    nodeEls.forEach((el) => {
      const id = el.dataset.node;
      el.style.opacity = hoveredId && hoveredId !== id ? "0.55" : "1";
    });
  }, [hoveredId, isMobile, introDone]);

  useEcosystemAnimation(
    {
      root: rootRef,
      core: coreRef,
      rings: ringRefs,
      particle: particleRef,
      trails: trailRefs,
      narrativePrimary: primaryRef,
      narrativeSecondary: secondaryRef,
      badge: badgeRef,
    },
    domEcosystem.nodes,
    domEcosystem.intro,
    domEcosystem.core,
    domEcosystem.finalScene,
    play,
    () => setIntroDone(true)
  );

  const activeId = isMobile ? tappedId : hoveredId;
  const activeNode = domEcosystem.nodes.find((n) => n.id === activeId);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={rootRef}
        className="relative mx-auto aspect-square w-full max-w-[640px]"
        style={{ opacity: 0.45 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.domEcosystem}
          alt="DOM ecosystem diagram: the DOM token at the center, connected to mining, progress, the treasury, guilds, governance, liquidity, and swap"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
        />

        {/* Mask patch — hides the stray light-beam artifact baked into the
            source artwork above the center coin. Approximate; adjust the
            coordinates below if it doesn't line up with the actual render. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: "42%",
            top: "0%",
            width: "16%",
            height: "30%",
            background:
              "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(9,11,14,0.95) 0%, rgba(9,11,14,0.75) 45%, rgba(9,11,14,0) 85%)",
          }}
        />

        {/* Connection lines + core glow */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dom-energy-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F7B64A" />
              <stop offset="50%" stopColor="#FF9D2E" />
              <stop offset="100%" stopColor="#FFD27A" />
            </linearGradient>
          </defs>
          {domEcosystem.nodes.map((node) => (
            <line
              key={node.id}
              data-connection={node.id}
              x1={CORE_X}
              y1={CORE_Y}
              x2={node.x}
              y2={node.y}
              pathLength={1}
              stroke="url(#dom-energy-gradient)"
              strokeWidth={0.4}
              strokeLinecap="round"
              opacity={0.06}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          ))}
        </svg>

        {/* DOM Core — layered pulsing rings, never the artwork itself */}
        <div
          ref={coreRef}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${CORE_X}%`,
            top: `${CORE_Y}%`,
            width: "36%",
            height: "36%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(247,182,74,0.35) 0%, rgba(255,157,46,0.12) 55%, transparent 75%)",
          }}
        />

        {/* Brand coin logo — sits directly over the artwork's baked-in center coin */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.logoDragonCoin}
          alt=""
          aria-hidden
          className="pointer-events-none absolute select-none rounded-full object-contain"
          style={{
            left: `${CORE_X}%`,
            top: `${CORE_Y}%`,
            width: "34%",
            height: "34%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {[0, 1].map((i) => (
          <div
            key={i}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
            className="pointer-events-none absolute rounded-full border"
            style={{
              left: `${CORE_X}%`,
              top: `${CORE_Y}%`,
              width: "38%",
              height: "38%",
              transform: "translate(-50%, -50%) scale(1)",
              borderColor: "rgba(255,190,110,0.5)",
              borderWidth: 1,
              opacity: 0,
            }}
          />
        ))}

        {/* Traveling energy particle + comet trail */}
        {[0, 1].map((i) => (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${CORE_X}%`,
              top: `${CORE_Y}%`,
              width: `${1.6 - i * 0.4}%`,
              height: `${1.6 - i * 0.4}%`,
              transform: "translate(-50%, -50%)",
              background: "#FFD27A",
              boxShadow: "0 0 6px 2px rgba(255,210,122,0.5)",
              opacity: 0,
            }}
          />
        ))}
        <div
          ref={particleRef}
          className="pointer-events-none absolute h-[2.2%] w-[2.2%] rounded-full"
          style={{
            left: `${CORE_X}%`,
            top: `${CORE_Y}%`,
            transform: "translate(-50%, -50%)",
            background: "#FFD27A",
            boxShadow: "0 0 10px 3px rgba(255,210,122,0.7)",
            opacity: 0,
          }}
        />

        {/* Ambient gold dust — extremely subtle, fixed pseudo-random positions */}
        {DUST_PARTICLES.map((d) => (
          <div
            key={d.id}
            data-dust={d.id}
            className="pointer-events-none absolute h-[0.35%] w-[0.35%] rounded-full opacity-0 motion-safe:animate-dust-drift"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              background: "#FFD27A",
              boxShadow: "0 0 4px 1px rgba(255,210,122,0.6)",
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
            }}
          />
        ))}

        {/* Node hotspots */}
        {domEcosystem.nodes.map((node) => (
          <div
            key={node.id}
            data-node={node.id}
            className="absolute flex items-center justify-center transition-opacity duration-300"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: "16%",
              height: "16%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
            }}
          >
            <div
              data-node-glow={node.id}
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(247,182,74,0.55) 0%, rgba(255,157,46,0.18) 60%, transparent 78%)",
                opacity: 0,
              }}
            />
            <button
              type="button"
              aria-label={node.tooltip.title}
              className="absolute inset-0 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold/60"
              onMouseEnter={() => introDone && !isMobile && setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId((v) => (v === node.id ? null : v))}
              onFocus={() => introDone && !isMobile && setHoveredId(node.id)}
              onBlur={() => setHoveredId((v) => (v === node.id ? null : v))}
              onClick={() => introDone && isMobile && setTappedId((v) => (v === node.id ? null : node.id))}
            />

            {/* Desktop floating tooltip */}
            {introDone && !isMobile && hoveredId === node.id && (
              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-44 -translate-x-1/2 rounded-[10px] border px-3 py-2.5 text-center"
                style={{
                  background: "rgba(18,14,10,0.94)",
                  borderColor: "rgba(244,166,57,0.24)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <p className="text-xs font-semibold text-ink">{node.tooltip.title}</p>
                <p className="mt-1 text-[11px] leading-snug text-ink-muted">{node.tooltip.text}</p>
                <span
                  className={cn(
                    "mt-1.5 inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                    STATUS_CLASS[node.status]
                  )}
                >
                  {node.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Narrative text — kept for screen readers, hidden visually below the diagram per request */}
      <div className="sr-only">
        <p ref={primaryRef} />
        <p ref={secondaryRef} />
        <span ref={badgeRef} />
      </div>

      {/* Mobile tap info panel */}
      {isMobile && introDone && activeNode && (
        <div
          className="mt-4 w-full max-w-sm rounded-[10px] border px-4 py-3 text-center"
          style={{ background: "rgba(18,14,10,0.94)", borderColor: "rgba(244,166,57,0.24)" }}
        >
          <p className="text-sm font-semibold text-ink">{activeNode.tooltip.title}</p>
          <p className="mt-1 text-xs text-ink-muted">{activeNode.tooltip.text}</p>
          <span
            className={cn(
              "mt-2 inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
              STATUS_CLASS[activeNode.status]
            )}
          >
            {activeNode.status}
          </span>
        </div>
      )}
    </div>
  );
}
