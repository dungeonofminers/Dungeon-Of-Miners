import { NextResponse } from "next/server";
import { liveApiBaseUrl } from "@/content/site";

// ---------------------------------------------------------------------------
// GET /api/live — server-side proxy to the Mini App's public read-only API.
//
// The Mini App API (app.dungeonofminers.xyz) has no CORS headers, so the
// browser can't call it directly from a different origin. This route fetches
// server-side and re-exposes the two public endpoints the site needs:
//   /v1/floor   → totalMinted + halving progress
//   /v1/economy → activeMiners + network weight
//
// Both upstream responses are cached (max-age 5s / 10s). This route mirrors
// that with a short s-maxage so the CDN absorbs repeat traffic and the API
// is hit at most once per few seconds no matter how many visitors load the
// dashboard.
// ---------------------------------------------------------------------------

type FloorResponse = {
  floor: number;
  name: string;
  startedAt: string | null;
  endsBy: string | null;
  minted: string;
  allocation: string;
  totalMinted: string;
  progress: { supplyPct: number; timePct: number; pct: number };
};

type EconomyResponse = {
  era: {
    floor: number;
    name: string;
    allocation: string;
    minted: string;
    remaining: string;
    nominalDays: number | null;
  };
  epoch: {
    start: string;
    budgetPerHour: string;
    totalWeight: string;
    effectiveWeight: string;
    activeMiners: number;
    perWeight: string;
  } | null;
  params: { epochMinutes: number; minNetworkWeight: string; activeWindowHours: number };
};

type StatsResponse = {
  totalClaimed: string;
  totalWithdrawn: string;
  qualifiedReferrals: number;
};

type WithdrawalItem = {
  address: string;
  amount: string;
  txHash: string;
  confirmedAt: string;
};

type WithdrawalsResponse = {
  items: WithdrawalItem[];
};

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${liveApiBaseUrl}${path}`, {
      next: { revalidate: 5 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const [floor, economy, stats, withdrawals] = await Promise.all([
    fetchJson<FloorResponse>("/v1/floor"),
    fetchJson<EconomyResponse>("/v1/economy"),
    fetchJson<StatsResponse>("/v1/stats"),
    fetchJson<WithdrawalsResponse>("/v1/stats/withdrawals"),
  ]);

  return NextResponse.json(
    { floor, economy, stats, withdrawals, fetchedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10" } },
  );
}
