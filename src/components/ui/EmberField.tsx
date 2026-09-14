"use client";

import { cn } from "@/lib/utils";

type EmberFieldProps = {
  count?: number;
  className?: string;
};

const SEEDED = Array.from({ length: 24 }).map((_, i) => {
  // deterministic pseudo-random so server/client markup matches
  const seed = (i * 137.5) % 100;
  const seed2 = (i * 71.3) % 100;
  return {
    left: `${seed}%`,
    size: 2 + (i % 4),
    duration: 12 + (i % 7) * 2,
    delay: -(i * 1.3),
    drift: seed2 > 50 ? 1 : -1,
    opacity: 0.25 + (i % 5) * 0.1,
  };
});

/** Ambient floating ember / dust particles used across dark sections. */
export function EmberField({ count = 24, className }: EmberFieldProps) {
  const particles = SEEDED.slice(0, count);
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold animate-drift"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: "0 0 6px 1px rgba(255,138,42,0.6)",
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
}
