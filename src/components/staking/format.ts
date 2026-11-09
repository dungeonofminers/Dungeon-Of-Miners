import { formatUnits } from "viem";

/** Truncating DOM formatter (never rounds up a balance). */
export function fmtDom(value: bigint | undefined | null, maxFrac = 2): string {
  if (value === undefined || value === null) return "—";
  const [int, frac = ""] = formatUnits(value, 18).split(".");
  const intFmt = BigInt(int).toLocaleString("en-US");
  const fracTrim = frac.slice(0, maxFrac).replace(/0+$/, "");
  return fracTrim ? `${intFmt}.${fracTrim}` : intFmt;
}

export function fmtCompactDom(value: bigint | undefined | null): string {
  if (value === undefined || value === null) return "—";
  const n = Number(formatUnits(value, 18));
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);
}

export function fmtApr(aprBps: number): string {
  const pct = aprBps / 100;
  return `${Number.isInteger(pct) ? pct : pct.toFixed(2)}%`;
}

export function fmtDays(sec: number): string {
  const d = Math.round(sec / 86_400);
  return `${d} day${d === 1 ? "" : "s"}`;
}

export function fmtDate(unixSec: number): string {
  return new Date(unixSec * 1000).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function fmtCountdown(secondsLeft: number): string {
  if (secondsLeft <= 0) return "Unlocked";
  const d = Math.floor(secondsLeft / 86_400);
  const h = Math.floor((secondsLeft % 86_400) / 3_600);
  const m = Math.floor((secondsLeft % 3_600) / 60);
  const s = Math.floor(secondsLeft % 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

/** Strict decimal input check (max 18 fractional digits). */
export function isValidAmountInput(v: string): boolean {
  return /^\d*\.?\d{0,18}$/.test(v);
}
