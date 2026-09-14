"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { coinDefs, coinColors, CoinGraphic, type CoinDef } from "./coinDefs";
import { orbits, ellipsePathD, pointOnOrbit, type OrbitConfig } from "./orbitPath";
import { HeroParticles } from "./HeroParticles";
import { useDungeonHeroAnimation } from "./useDungeonHeroAnimation";
import "@/styles/dungeon-hero.css";

const VIEW_W = 1920;
const VIEW_H = 760;
const CENTER_X = 960;
const CENTER_Y = 385;
const LOGO_SIZE = 560;
const LOGO_SRC = "/assets/logo-dom.png";

type Tier = "desktop" | "tablet" | "mobile";

const TIER_CONFIG: Record<Tier, { rocks: number; particles: number; radiusScale: number }> = {
  desktop: { rocks: 16, particles: 26, radiusScale: 1 },
  tablet: { rocks: 10, particles: 16, radiusScale: 0.92 },
  mobile: { rocks: 6, particles: 10, radiusScale: 0.76 },
};

export default function DungeonHeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<Tier>("desktop");

  useEffect(() => {
    const computeTier = (): Tier => {
      const w = window.innerWidth;
      if (w < 640) return "mobile";
      if (w < 1024) return "tablet";
      return "desktop";
    };
    setTier(computeTier());
    const onResize = () => setTier(computeTier());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { rocks: rockCount, particles: particleCount, radiusScale } = TIER_CONFIG[tier];

  const effectiveOrbits = useMemo<Record<"orbit-01" | "orbit-02", OrbitConfig>>(() => {
    const scale = (o: OrbitConfig): OrbitConfig => ({ ...o, rx: o.rx * radiusScale, ry: o.ry * radiusScale });
    return { "orbit-01": scale(orbits["orbit-01"]), "orbit-02": scale(orbits["orbit-02"]) };
  }, [radiusScale]);

  const rocks = useMemo(() => makeRocks(rockCount), [rockCount]);

  useDungeonHeroAnimation(containerRef, effectiveOrbits, tier === "mobile");

  return (
    <div ref={containerRef} className="dungeon-hero" data-tier={tier}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio={tier === "mobile" ? "xMidYMid slice" : "xMidYMid meet"}
        className="dungeon-hero-svg"
        role="img"
        aria-label="Dungeon of Miners mascot dragon wearing a mining helmet, orbited by BNB, Bitcoin, Ethereum, Tether, Solana and Dogecoin above a glowing dungeon"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1020" />
            <stop offset="55%" stopColor="#10182B" />
            <stop offset="100%" stopColor="#161D31" />
          </linearGradient>
          <radialGradient id="logoGlowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFCC4D" stopOpacity={0.55} />
            <stop offset="45%" stopColor="#FF8A18" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#FF8A18" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE8A3" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#FF8A18" stopOpacity={0} />
          </radialGradient>
          <linearGradient id="orbitGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB52A" stopOpacity={0.05} />
            <stop offset="50%" stopColor="#FFB52A" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#FF6B18" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="orbitGradient2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF6B18" stopOpacity={0.05} />
            <stop offset="50%" stopColor="#FFCC4D" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#FFB52A" stopOpacity={0.05} />
          </linearGradient>
          <radialGradient id="lightDotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF6DC" />
            <stop offset="100%" stopColor="#FFB52A" stopOpacity={0} />
          </radialGradient>
          <linearGradient id="rockGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#454C64" />
            <stop offset="100%" stopColor="#23283A" />
          </linearGradient>

          {(Object.entries(coinColors) as Array<[keyof typeof coinColors, (typeof coinColors)[keyof typeof coinColors]]>).map(
            ([id, c]) => (
              <g key={id}>
                <radialGradient id={`coin-face-${id}`} cx="38%" cy="32%" r="75%">
                  <stop offset="0%" stopColor={c.faceFrom} />
                  <stop offset="100%" stopColor={c.faceTo} />
                </radialGradient>
                <linearGradient id={`coin-rim-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF3D0" />
                  <stop offset="45%" stopColor={c.faceTo} />
                  <stop offset="100%" stopColor={c.rim} />
                </linearGradient>
              </g>
            )
          )}

          <filter id="soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soft-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* -------------------------------------------------------------- */}
        <g id="layer-background">
          <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="url(#bgGradient)" />
          <ellipse cx={CENTER_X} cy={VIEW_H * 0.62} rx={VIEW_W * 0.42} ry={VIEW_H * 0.3} fill="#000000" opacity={0.25} />
        </g>

        {/* -------------------------------------------------------------- */}
        <g id="layer-mid">
          <path
            id="orbit-01"
            className="orbit-ring"
            d={ellipsePathD(effectiveOrbits["orbit-01"])}
            fill="none"
            stroke="url(#orbitGradient)"
            strokeWidth={2.5}
          />
          <path
            id="orbit-02"
            className="orbit-ring"
            d={ellipsePathD(effectiveOrbits["orbit-02"])}
            fill="none"
            stroke="url(#orbitGradient2)"
            strokeWidth={2.5}
          />
          <circle id="orbit-01-light" className="orbit-light" r={5} fill="url(#lightDotGradient)" filter="url(#soft-glow)" />
          <circle id="orbit-02-light" className="orbit-light" r={5} fill="url(#lightDotGradient)" filter="url(#soft-glow)" />

          <g id="coins-back" />

          <g id="main-logo-wrap">
            <ellipse id="logo-glow" cx={CENTER_X} cy={CENTER_Y} rx={290} ry={250} fill="url(#logoGlowGradient)" style={{ mixBlendMode: "screen" }} />
            <image
              id="main-logo"
              href={LOGO_SRC}
              x={CENTER_X - LOGO_SIZE / 2}
              y={CENTER_Y - LOGO_SIZE / 2}
              width={LOGO_SIZE}
              height={LOGO_SIZE}
              preserveAspectRatio="xMidYMid meet"
            />
            <circle id="helmet-light" cx={CENTER_X} cy={CENTER_Y - 158} r={22} fill="url(#lampGlow)" opacity={0.6} style={{ mixBlendMode: "screen" }} />
          </g>

          <g id="coins-front">
            {coinDefs.map((def) => (
              <CoinInstance key={def.id} def={def} orbit={effectiveOrbits[def.orbit]} />
            ))}
          </g>
        </g>

        {/* -------------------------------------------------------------- */}
        <g id="layer-foreground">
          <g id="foreground-rocks">
            {rocks.map((r) => (
              <polygon
                key={r.id}
                className="rock"
                data-opacity={r.opacity}
                transform={`translate(${r.x},${r.y}) rotate(${r.rotate})`}
                points={r.points}
                fill="url(#rockGradient)"
                stroke="#10141C"
                strokeWidth={1}
              />
            ))}
          </g>
        </g>

        <HeroParticles count={particleCount} width={VIEW_W} height={VIEW_H} />
      </svg>

      <div className="hero-tooltip" role="tooltip">
        <span className="hero-tooltip-title" />
        <span className="hero-tooltip-sub" />
      </div>
    </div>
  );
}

function CoinInstance({ def, orbit }: { def: CoinDef; orbit: OrbitConfig }) {
  const { x, y } = pointOnOrbit(orbit, def.offset);
  return (
    <g id={`coin-${def.id}`} className="coin-outer" transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}>
      <g className="coin-hover">
        <g className="coin-spinfloat">
          <circle className="coin-hit" r={def.size + 12} fill="transparent" />
          <ellipse
            cx={0}
            cy={def.size * 0.82}
            rx={def.size * 0.85}
            ry={def.size * 0.22}
            fill="#000000"
            opacity={0.3}
            filter="url(#soft-glow-sm)"
            style={{ pointerEvents: "none" }}
          />
          <g style={{ pointerEvents: "none" }}>
            <CoinGraphic id={def.id} size={def.size} />
          </g>
        </g>
      </g>
    </g>
  );
}

type Rock = { id: number; x: number; y: number; rotate: number; opacity: number; points: string };

function makeRocks(count: number): Rock[] {
  return Array.from({ length: count }).map((_, i) => {
    const onSide = Math.random() < 0.4;
    let x: number;
    let y: number;
    if (onSide) {
      x = Math.random() < 0.5 ? Math.random() * 210 : VIEW_W - Math.random() * 210;
      y = 180 + Math.random() * 480;
    } else {
      x = Math.random() * VIEW_W;
      y = 560 + Math.random() * 190;
    }
    const size = 8 + Math.random() * 15;
    return {
      id: i,
      x,
      y,
      rotate: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.5,
      points: makeRockPoints(size),
    };
  });
}

function makeRockPoints(size: number): string {
  const sides = 6 + Math.floor(Math.random() * 2);
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const r = size * (0.7 + Math.random() * 0.3);
    pts.push(`${(Math.cos(angle) * r).toFixed(1)},${(Math.sin(angle) * r).toFixed(1)}`);
  }
  return pts.join(" ");
}
