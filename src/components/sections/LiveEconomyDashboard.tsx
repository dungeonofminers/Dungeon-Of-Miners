"use client";

import { Activity } from "lucide-react";
import { halvings, economyConfig, totalSupply, MINING_ALLOCATION_DOM } from "@/content/site";
import { MINING_ALLOCATION } from "@/content/economy.config";
import {
  useLiveEconomy,
  formatDom,
  formatInt,
  miningRemainingDom,
  AWAITING,
} from "@/lib/live-economy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function LiveEconomyDashboard() {
  const data = useLiveEconomy();

  const floor = data?.floor ?? null;
  const epoch = data?.economy?.epoch ?? null;
  const stats = data?.stats ?? null;

  const halvingNumber = floor?.floor ?? economyConfig.currentHalving;
  const halvingEntry = halvings[halvingNumber - 1];
  const halvingName = floor?.name ?? halvingEntry?.name ?? "";
  const emissionRate = halvingEntry?.emissionRate ?? "";

  const totalMined = formatDom(floor?.totalMinted);
  const activeMiners = formatInt(epoch?.activeMiners);
  const networkWeight = formatInt(epoch?.effectiveWeight);
  const miningRemaining = miningRemainingDom(floor?.totalMinted, MINING_ALLOCATION);
  const totalClaimed = formatDom(stats?.totalClaimed);
  const totalWithdrawn = formatDom(stats?.totalWithdrawn);
  const qualifiedReferrals = formatInt(stats?.qualifiedReferrals);
  const progressPct = floor?.progress?.pct ?? null;

  const metrics: { label: string; value: string }[] = [
    { label: "Total Supply", value: totalSupply },
    { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
    { label: "Total Mined", value: totalMined ?? AWAITING },
    { label: "Mining Allocation Remaining", value: miningRemaining ?? AWAITING },
    { label: "Current Halving", value: `${halvingNumber} / ${halvings.length}` },
    { label: "Current Emission Rate", value: emissionRate },
    { label: "Current Network Mining Weight", value: networkWeight ?? AWAITING },
    { label: "Active Miners", value: activeMiners ?? AWAITING },
    { label: "Total Claimed", value: totalClaimed ?? AWAITING },
    { label: "Total Withdrawn", value: totalWithdrawn ?? AWAITING },
    { label: "Qualified Referrals", value: qualifiedReferrals ?? AWAITING },
  ];

  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Economy Dashboard"
          title="The Dungeon Is Mining"
          description="Total Mined, Active Miners, and network weight are read live from the Dungeon of Miners backend every few seconds. Where the backend has not published a figure yet, it stays an honest placeholder."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-14 max-w-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-ink">
                Current Halving — {halvingNumber} / {halvings.length} · {halvingName}
              </p>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                <Activity className="h-3 w-3" />
                {economyConfig.miningStatus}
              </span>
            </div>
            <div className="relative mt-4 h-3 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-torch-ember to-torch transition-[width] duration-700 ease-out"
                style={{ width: `${progressPct ?? 0}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              {progressPct != null
                ? `Halving progress: ${progressPct}% of the current era allocation mined`
                : "Halving progress updates live from the network."}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={0.05 + (i % 8) * 0.03}>
              <div className="surface-panel flex h-full flex-col items-center gap-1.5 p-5 text-center">
                <p className="text-[10px] uppercase tracking-wider text-ink-faint">{metric.label}</p>
                <p
                  className={`font-display text-base sm:text-lg ${
                    metric.value === AWAITING ? "text-ink-faint" : "text-gold"
                  }`}
                >
                  {metric.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
