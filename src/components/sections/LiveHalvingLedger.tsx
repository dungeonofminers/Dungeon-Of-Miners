"use client";

import { halvings, MINING_ALLOCATION_DOM } from "@/content/site";
import { MINING_ALLOCATION } from "@/content/economy.config";
import {
  useLiveEconomy,
  formatDom,
  formatInt,
  miningRemainingDom,
  AWAITING,
} from "@/lib/live-economy";

/**
 * Global Halving Ledger — the live counterpart of the static `halvingLedger`
 * config. Static facts (Mining Allocation, era identity) are mixed with live
 * reads (Total Mined, remaining, weight, active miners) from the backend.
 */
export function LiveHalvingLedger() {
  const data = useLiveEconomy();
  const floor = data?.floor ?? null;
  const era = data?.economy?.era ?? null;
  const epoch = data?.economy?.epoch ?? null;

  const halvingNumber = floor?.floor ?? 1;
  const halvingName = floor?.name ?? halvings[halvingNumber - 1]?.name ?? "";

  const rows: { label: string; value: string }[] = [
    { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
    { label: "Total Mined", value: formatDom(floor?.totalMinted) ?? AWAITING },
    {
      label: "Remaining Mining Allocation",
      value: miningRemainingDom(floor?.totalMinted, MINING_ALLOCATION) ?? AWAITING,
    },
    { label: "Current Halving", value: `Halving ${halvingNumber} · ${halvingName}` },
    {
      label: "Current Era Allocation",
      value: formatDom(floor?.allocation) ?? halvings[halvingNumber - 1]?.allocation ?? AWAITING,
    },
    { label: "Remaining Era Allocation", value: formatDom(era?.remaining) ?? AWAITING },
    {
      label: "Current Network Mining Weight",
      value: formatInt(epoch?.effectiveWeight) ?? AWAITING,
    },
    { label: "Number of Active Miners", value: formatInt(epoch?.activeMiners) ?? AWAITING },
  ];

  return (
    <dl className="mt-5 flex flex-col gap-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
          <dt className="text-ink-muted">{row.label}</dt>
          <dd
            className={`text-right font-semibold ${
              row.value === AWAITING ? "text-ink-faint" : "text-ink"
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
