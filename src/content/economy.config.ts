// ---------------------------------------------------------------------------
// Dungeon of Miners — canonical economy constants.
//
// This file is the ONE place raw economy numbers live. site.ts imports these
// constants and builds the richer, display-shaped data (halvings[],
// tokenAllocation[], pickaxeLevels[], etc.) from them — it never restates a
// number independently. If a number needs to change, change it here.
//
// Values marked "example config" are real, working defaults for a system
// that has no live backend yet (this repository is a static marketing site
// with no database, API, or smart contract). They are meant to be tuned
// once the actual mining engine is built — they are not a price, date, or
// legal claim, so they are safe to ship as sensible starting numbers rather
// than "TBA". Anything that WOULD be a factual/legal claim if invented
// (treasury wallet addresses, launch dates) is left as TBA in site.ts
// instead of guessed here.
// ---------------------------------------------------------------------------

// ---- Network -----------------------------------------------------------
export const NETWORK = "BNB Smart Chain";
export const TOKEN_STANDARD = "BEP-20";
export const CHAIN_ID = 56;
export const BLOCK_EXPLORER_NAME = "BscScan";
export const BLOCK_EXPLORER_URL = "https://bscscan.com";

// ---- Supply & allocations (DOM) -----------------------------------------
export const TOTAL_SUPPLY = 1_000_000_000;
export const MINING_ALLOCATION = 550_000_000;
export const LIQUIDITY_ALLOCATION = 100_000_000;
export const TEAM_ALLOCATION = 50_000_000;
export const TREASURE_ALLOCATION = 100_000_000;
export const ECOSYSTEM_ALLOCATION = 150_000_000;
export const PUBLIC_STRATEGIC_ALLOCATION = 50_000_000;

// Sanity check (runs once, at build/import time): every allocation above
// must sum to exactly TOTAL_SUPPLY. If this ever throws, an allocation
// number was edited without updating the others.
const ALLOCATION_SUM =
  MINING_ALLOCATION +
  LIQUIDITY_ALLOCATION +
  TEAM_ALLOCATION +
  TREASURE_ALLOCATION +
  ECOSYSTEM_ALLOCATION +
  PUBLIC_STRATEGIC_ALLOCATION;
if (ALLOCATION_SUM !== TOTAL_SUPPLY) {
  throw new Error(
    `economy.config: allocations sum to ${ALLOCATION_SUM}, expected TOTAL_SUPPLY ${TOTAL_SUPPLY}`
  );
}

// ---- Halvings -------------------------------------------------------------
// The Mining Allocation is split into HALVING_COUNT equal eras. Each era is
// mined out fully (there is no daily/hourly ceiling) before the network
// advances to the next. HALVING_EMISSION_RATES is a *relative* pacing
// multiplier per era (halves every era, like Bitcoin) — it governs how fast
// the backend releases a given era's fixed allocation per mining epoch, not
// a separate additional supply. It is NOT a public "DOM per day" number;
// the actual per-epoch budget is calculated server-side from real network
// mining weight (see EPOCH SYSTEM below).
export const HALVING_COUNT = 6;
export const CURRENT_HALVING = 1;

export const HALVING_ALLOCATIONS: number[] = [
  91_666_667, 91_666_667, 91_666_667, 91_666_667, 91_666_667, 91_666_665,
];

const HALVING_ALLOCATIONS_SUM = HALVING_ALLOCATIONS.reduce((a, b) => a + b, 0);
if (HALVING_ALLOCATIONS_SUM !== MINING_ALLOCATION) {
  throw new Error(
    `economy.config: HALVING_ALLOCATIONS sum to ${HALVING_ALLOCATIONS_SUM}, expected MINING_ALLOCATION ${MINING_ALLOCATION}`
  );
}

// Relative emission-rate multiplier per era: 100%, 50%, 25%, 12.5%, 6.25%, 3.125%.
export const HALVING_EMISSION_RATES: number[] = HALVING_ALLOCATIONS.map((_, i) => 0.5 ** i);

// Nominal (illustrative) era durations in days — used only to express the
// halving pacing; the real trigger remains allocation-based (no fixed date).
export const HALVING_NOMINAL_DURATION_DAYS: number[] = [60, 120, 240, 480, 960, 1920];

// ---- Epoch system ---------------------------------------------------------
// Mining runs in fixed 10-minute epochs (6 per hour). Each epoch, a fixed
// budget is split among all active miners proportional to their power:
//   epoch_budget = era_allocation ÷ epochs_in_era
//   per_weight   = epoch_budget ÷ max(total_power, 200_000)
//   your_reward  = your_power × per_weight
// A short, fixed epoch (rather than per-second calculation) keeps reward
// accounting cheap at scale: the backend accumulates a global "reward per
// weight" index once per epoch, and each user's balance updates lazily from
// that index instead of iterating every user on every tick.
export const EPOCH_DURATION_MINUTES = 10;

// ---- Pickaxe progression --------------------------------------------------
// Base Mining Power replaces the retired "Rank" + "Equipment Multiplier"
// system: a Pickaxe Level sets this value directly, nothing multiplies it.
// Kept intentionally within a ~3x range (not the old 100x spread). Each
// step adds slightly more than the last (+30, +35, +40, +45, +50), so every
// upgrade is noticeable, but a higher-DOM-holding miner never snowballs
// far ahead — rewards are a *share* of a fixed pool, so wide gaps would
// directly squeeze out lower levels.
export const PICKAXE_LEVELS = 6;
export const PICKAXE_POWER: number[] = [100, 130, 165, 205, 250, 300]; // 3.0x L1→L6, recommended config

// Minimum Available DOM Balance a miner needs to USE each Pickaxe Level
// (Level 1 is free). Steps of 10,000 DOM. This is the ONLY unlock rule —
// there is no XP. Measured against the in-game Available DOM Balance, not a
// withdrawal address and not unclaimed Mining Storage.
export const PICKAXE_MIN_HOLD: number[] = [0, 10_000, 20_000, 30_000, 40_000, 50_000];

// Mining Storage capacity (DOM) unlocked at each Pickaxe Level. Example config.
export const STORAGE_CAPACITY: number[] = [5_000, 7_500, 11_000, 16_000, 23_000, 32_000];

// ---- Launch-phase marketing rewards (DOM) -----------------------------------
// Source: DOM-Marketing-v2. These are the rewards ACTIVE during the launch
// phase and they replace the Referral Booster below until the team re-enables
// it. All of them are paid in DOM from the treasury. The numbers below are
// config values that can be changed without a code change.
export const REFERRAL_REWARD_DOM = 20; // per qualified friend (friend must join the channel and claim their first mining session)
export const MAX_REWARDED_REFERRALS = 50; // → max 1,000 DOM per inviter
export const QUEST_JOIN_CHANNEL_DOM = 10; // one-time per account
export const QUEST_FOLLOW_X_DOM = 10; // one-time per account (honor-mode follow)
export const AD_WATCH_REWARD_DOM = 20; // DOM per ad
export const AD_WATCH_DAILY_LIMIT = 3;

// Daily Check-In — once per UTC day. Days 1–6 climb 5→25, every 7th day is
// 25 + 25 bonus = 50, other days after day 7 pay 25. Missing a day resets the
// streak to day 1.
const CHECKIN_CLIMB = [5, 10, 15, 20, 25, 25];
export const CHECKIN_BASE_DOM = 25;
export const CHECKIN_BONUS_DOM = 25; // added on every 7th day
export function checkInReward(streakDay: number): number {
  if (streakDay % 7 === 0) return CHECKIN_BASE_DOM + CHECKIN_BONUS_DOM;
  return streakDay <= CHECKIN_CLIMB.length ? CHECKIN_CLIMB[streakDay - 1] : CHECKIN_BASE_DOM;
}
export const CHECKIN_MIN_DOM = checkInReward(1);
export const CHECKIN_MAX_DOM = checkInReward(7);
export const CHECKIN_FIRST_WEEK_TOTAL = [1, 2, 3, 4, 5, 6, 7].reduce((sum, d) => sum + checkInReward(d), 0); // 150
export const CHECKIN_FULL_WEEK_TOTAL = [8, 9, 10, 11, 12, 13, 14].reduce((sum, d) => sum + checkInReward(d), 0); // 200

// ---- Referral Booster V2 (PLANNED — not active in the launch phase) --------
// Mining-weight boosters (Referral and Guild) sit at 0% during launch. These
// constants describe the capped design that will replace the DOM-reward
// referral above when the team enables boosters.
export const REFERRAL_BOOST_PER_ACTIVE_USER = 0.5; // % Mining Weight per active qualified referral
export const MAX_REFERRAL_BOOST = 15; // %
export const MAX_QUALIFIED_REFERRALS = 30;
export const REFERRAL_ACTIVE_WINDOW_DAYS = 7; // rolling window a referral must stay active within
export const REFERRAL_STARTER_BOOST_PERCENT = 5; // temporary boost for a new invitee
export const REFERRAL_STARTER_BOOST_HOURS = 24;

// ---- Guild V2 --------------------------------------------------------------
export const MAX_GUILD_MEMBERS = 30;
export const GUILD_COOLDOWN_HOURS = 72; // required wait after leaving a guild before joining another
export const MAX_GUILD_BOOST = 10; // %
export const GUILD_BOOSTER_TIERS: { activeThreshold: number; bonusPercent: number }[] = [
  { activeThreshold: 30, bonusPercent: 2 },
  { activeThreshold: 50, bonusPercent: 5 },
  { activeThreshold: 70, bonusPercent: 8 },
  { activeThreshold: 90, bonusPercent: 10 },
];

// ---- Boost engine ----------------------------------------------------------
// TotalBoost = min(Referral + Guild + Temporary, BOOST_CAP)
// EffectiveWeight = PickaxeBasePower × (1 + TotalBoost)
export const BOOST_CAP = MAX_REFERRAL_BOOST + MAX_GUILD_BOOST; // % — event/temporary boosters still apply on top up to this combined ceiling

// ---- Withdrawal ------------------------------------------------------------
// Minimum is measured against the combined balance (mined DOM + all rewards).
// There is currently NO maximum limit; one will be introduced later, so it
// stays TBA rather than guessed. The network fee is covered by the team.
export const MIN_WITHDRAWAL: number | "TBA" = 250;
export const WITHDRAWAL_COOLDOWN_HOURS: number | "TBA" = "TBA";

// ---------------------------------------------------------------------------
// Deterministic number formatting — never use Number.prototype.toLocaleString
// for user-facing DOM amounts. It's locale-dependent and can format
// differently between the Node.js server render and the browser, which
// causes React hydration mismatches. This regex-based formatter is fixed
// and identical on both sides.
// ---------------------------------------------------------------------------
export function formatNumber(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDOM(amount: number): string {
  return `${formatNumber(amount)} DOM`;
}

export function formatPercent(fraction: number): string {
  const pct = fraction * 100;
  const rounded = Math.round(pct * 100) / 100;
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2)}%`;
}
