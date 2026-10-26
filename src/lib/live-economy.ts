import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Shared client-side plumbing for the site's own `/api/live` proxy (which
// wraps the Mini App's public /v1/floor + /v1/economy). Kept in one place so
// the homepage dashboard, /halving ledger, and /transparency all read the
// same live totals with the same formatting and the same refresh cadence.
// ---------------------------------------------------------------------------

export type LiveFloor = {
  floor: number;
  name: string;
  minted: string;
  allocation: string;
  totalMinted: string;
  progress: { supplyPct: number; timePct: number; pct: number };
};

export type LiveEra = {
  floor: number;
  name: string;
  allocation: string;
  minted: string;
  remaining: string;
  nominalDays: number | null;
};

export type LiveEpoch = {
  activeMiners: number;
  totalWeight: string;
  effectiveWeight: string;
};

export type LiveStats = {
  totalClaimed: string;
  totalWithdrawn: string;
  qualifiedReferrals: number;
};

export type LiveWithdrawal = {
  address: string;
  amount: string;
  txHash: string;
  confirmedAt: string;
};

export type LiveEconomy = {
  floor: LiveFloor | null;
  economy: { era: LiveEra | null; epoch: LiveEpoch | null } | null;
  stats: LiveStats | null;
  withdrawals: { items: LiveWithdrawal[] } | null;
  fetchedAt: string;
};

export const AWAITING = "—";
export const REFRESH_MS = 15_000;

// DOM amounts arrive as plain decimal strings ("22693.5066") — group the
// integer part for display and append the unit.
export function formatDom(value: string | null | undefined): string | null {
  if (value == null) return null;
  const [whole, frac] = value.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${grouped}${frac ? "." + frac : ""} DOM`;
}

export function formatInt(value: number | string | null | undefined): string | null {
  if (value == null) return null;
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function shortAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

// µDOM-safe arithmetic so "remaining" never drifts from floating point.
const UNIT = BigInt(1_000_000);

export function parseMicro(value: string): bigint {
  const [whole, frac] = value.split(".");
  return BigInt(whole) * UNIT + BigInt((frac ?? "").padEnd(6, "0"));
}

export function microToString(value: bigint): string {
  const whole = value / UNIT;
  const frac = value % UNIT;
  const fracStr = frac === BigInt(0) ? "" : "." + frac.toString().padStart(6, "0").replace(/0+$/, "");
  return whole.toString() + fracStr;
}

/** "550,000,000 − totalMinted" formatted as "549,977,189.79 DOM". */
export function miningRemainingDom(
  totalMinted: string | null | undefined,
  miningAllocation: number,
): string | null {
  if (totalMinted == null) return null;
  return formatDom(microToString(BigInt(miningAllocation) * UNIT - parseMicro(totalMinted)));
}

/**
 * Polls `/api/live` (server-side proxy, so no CORS) and returns the latest
 * totals. Returns null until the first response; keeps the last known value on
 * transient failures so a blip never blanks the board.
 */
export function useLiveEconomy(): LiveEconomy | null {
  const [data, setData] = useState<LiveEconomy | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/live", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as LiveEconomy;
        if (active) setData(json);
      } catch {
        // Keep the last known value.
      }
    };

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  return data;
}
