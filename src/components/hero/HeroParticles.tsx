"use client";

import { useMemo } from "react";

type HeroParticlesProps = {
  count: number;
  width: number;
  height: number;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  r: number;
  hue: "gold" | "blue";
  duration: number;
  delay: number;
};

/**
 * Ambient dust layer for the Dungeon of Miners hero banner. Purely
 * presentational — useDungeonHeroAnimation finds these nodes via the
 * `.hero-particle` class and drives their drift/fade loop.
 */
export function HeroParticles({ count, width, height }: HeroParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: height * 0.25 + Math.random() * height * 0.7,
      r: 1.2 + Math.random() * 2.2,
      hue: Math.random() > 0.55 ? "blue" : "gold",
      duration: 6 + Math.random() * 6,
      delay: -Math.random() * 10,
    }));
  }, [count, width, height]);

  return (
    <g id="particles" aria-hidden>
      {particles.map((p) => (
        <circle
          key={p.id}
          className="hero-particle"
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={p.hue === "gold" ? "#FFCC4D" : "#63E5FF"}
          data-duration={p.duration}
          data-delay={p.delay}
          data-drift={height * 0.3}
          opacity={0}
        />
      ))}
    </g>
  );
}
