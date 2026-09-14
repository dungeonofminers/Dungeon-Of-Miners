"use client";

import { floors, totalSupply } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

const FLOOR_COLORS = [
  "#F4B544", // Rubble — gold
  "#FF8A2A", // Hollow — torch orange
  "#D98A1E", // Gloom — amber
  "#63E5FF", // Ember — crystal blue
  "#3FA97A", // Cinder — emerald
  "#B94A1D", // The Abyss — deep ember
];

function parseAmount(value: string) {
  return Number(value.replace(/[^0-9]/g, ""));
}

const totalAmount = parseAmount(totalSupply);
const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const segments = floors.map((floor, i) => {
  const amount = parseAmount(floor.allocation);
  const share = amount / totalAmount;
  return {
    ...floor,
    amount,
    share,
    percent: (share * 100).toFixed(1),
    color: FLOOR_COLORS[i % FLOOR_COLORS.length],
  };
});

export function TokenDistributionChart() {
  let offset = 0;

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr]">
      <Reveal className="mx-auto">
        <svg viewBox="0 0 200 200" className="h-64 w-64 sm:h-72 sm:w-72">
          <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="#1A1F26" strokeWidth={28} />
          <g transform="rotate(-90 100 100)">
            {segments.map((seg) => {
              const dash = seg.share * CIRCUMFERENCE;
              const circle = (
                <circle
                  key={seg.name}
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={28}
                  strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                />
              );
              offset += dash;
              return circle;
            })}
          </g>
          <text
            x="100"
            y="94"
            textAnchor="middle"
            className="fill-ink font-display"
            style={{ fontSize: 18 }}
          >
            {totalSupply.split(" ")[0]}
          </text>
          <text
            x="100"
            y="114"
            textAnchor="middle"
            className="fill-ink-faint"
            style={{ fontSize: 10, letterSpacing: 1 }}
          >
            MAX SUPPLY (DOM)
          </text>
        </svg>
      </Reveal>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {segments.map((seg, i) => (
          <Reveal key={seg.name} delay={i * 0.05}>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Floor {seg.roman} · {seg.name}
                  </p>
                  <p className="text-xs text-ink-faint">{seg.allocation}</p>
                </div>
              </div>
              <span className="font-display text-lg text-ink">{seg.percent}%</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
