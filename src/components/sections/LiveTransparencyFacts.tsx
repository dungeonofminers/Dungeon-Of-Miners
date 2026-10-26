"use client";

import { MINING_ALLOCATION } from "@/content/economy.config";
import {
  useLiveEconomy,
  formatDom,
  formatInt,
  miningRemainingDom,
  AWAITING,
} from "@/lib/live-economy";

/** Live network totals, read from the backend and refreshed automatically. */
export function LiveTransparencyFacts() {
  const data = useLiveEconomy();
  const floor = data?.floor ?? null;
  const epoch = data?.economy?.epoch ?? null;

  const facts = [
    { label: "Total Mined", value: formatDom(floor?.totalMinted) ?? AWAITING },
    {
      label: "Mining Allocation Remaining",
      value: miningRemainingDom(floor?.totalMinted, MINING_ALLOCATION) ?? AWAITING,
    },
    { label: "Active Miners", value: formatInt(epoch?.activeMiners) ?? AWAITING },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="surface-panel p-4 text-center">
          <p className="text-[10px] uppercase tracking-wider text-ink-faint">{fact.label}</p>
          <p
            className={`mt-1 font-display text-sm sm:text-base ${
              fact.value === AWAITING ? "text-ink-faint" : "text-gold"
            }`}
          >
            {fact.value}
          </p>
        </div>
      ))}
    </div>
  );
}
