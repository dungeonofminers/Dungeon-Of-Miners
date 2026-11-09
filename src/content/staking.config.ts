// ---------------------------------------------------------------------------
// DOM Staking — single source of truth for the /staking page.
//
// These values MIRROR the constructor arguments in contracts/scripts/deploy.cjs.
// Once a contract address is configured, the page reads plans, limits and
// stats from the chain and only falls back to these numbers for display
// before launch.
// ---------------------------------------------------------------------------

/** Deployed DomStaking address on BNB Smart Chain Mainnet. */
export const STAKING_CONTRACT_ADDRESS = (
  process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS ??
  "0xB510D3f1E5651D4EC619B82C8aE846B3033AC190"
).trim() as `0x${string}` | "";

/** 56 = BNB Smart Chain mainnet, 97 = BSC testnet (for rehearsals with tDOM). */
export const STAKING_CHAIN_ID = Number(process.env.NEXT_PUBLIC_STAKING_CHAIN_ID || 56) === 97 ? 97 : 56;

export const isStakingLive = /^0x[0-9a-fA-F]{40}$/.test(STAKING_CONTRACT_ADDRESS);

export type StakingPlanConfig = {
  id: number;
  name: string;
  days: number;
  aprBps: number;
};

/** Planned launch plans: 30d @ 6% · 90d @ 12% · 180d @ 20% APR (simple, non-compounding). */
export const plannedPlans: StakingPlanConfig[] = [
  { id: 0, name: "Shallow Vein", days: 30, aprBps: 600 },
  { id: 1, name: "Deep Vein", days: 90, aprBps: 1200 },
  { id: 2, name: "Abyssal Vein", days: 180, aprBps: 2000 },
];

/** Friendly names by plan id (plans added later on-chain fall back to "Plan N"). */
export const planNames = plannedPlans.map((p) => p.name);

export const stakingRules = {
  minStake: 100, // DOM
  maxStake: 5_000_000, // DOM per position
  earlyWindowDays: 7,
  earlyPenaltyPct: 10,
  rewardPoolSource: "Staking Reward Wallet (15% of supply, 150,000,000 DOM)",
};

export const EXPLORER_URL = STAKING_CHAIN_ID === 97 ? "https://testnet.bscscan.com" : "https://bscscan.com";

/**
 * Secret team preview key. While `navTopRight.comingSoon` is true in `site.ts`,
 * the `/staking` page is gated on production domains unless unlocked via:
 *   `/staking?preview=domteam`
 * (or automatically unlocked on `localhost`).
 */
export const STAKING_PREVIEW_KEY =
  process.env.NEXT_PUBLIC_STAKING_PREVIEW_KEY || "domteam";

