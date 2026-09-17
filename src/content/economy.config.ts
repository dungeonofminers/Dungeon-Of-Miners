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
// (contract address, exact withdrawal limits, launch dates) is left as TBA
// in site.ts instead of guessed here.
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

// ---- Epoch system (backend architecture reference — not yet deployed) -----
// EraEmissionRate  = BaseEmissionRate × HALVING_EMISSION_RATES[haltingIndex]
// EpochBudget      = min(EraEmissionRate × EPOCH_DURATION_MINUTES, RemainingHalvingAllocation)
// UserShare        = UserEffectiveWeight / TotalNetworkWeight
// UserReward       = EpochBudget × UserShare
// A short, fixed epoch (rather than per-second calculation) keeps reward
// accounting cheap at scale: the backend accumulates a global "reward per
// weight" index once per epoch, and each user's balance updates lazily from
// that index instead of iterating every user on every tick.
export const EPOCH_DURATION_MINUTES = 5;

// ---- Pickaxe progression --------------------------------------------------
// Base Mining Power replaces the retired "Rank" + "Equipment Multiplier"
// system: a Pickaxe Level sets this value directly, nothing multiplies it.
// Kept intentionally within a 3x-5x range (not the old 100x spread) so
// early and late levels stay in the same order of magnitude.
export const PICKAXE_LEVELS = 6;
export const PICKAXE_POWER: number[] = [100, 135, 180, 245, 330, 450]; // ~4.5x L1→L6, example config

// Mining XP required to REACH each level (index 0 = Level 1 = 0 XP).
// Examples config — tune once the real mining engine defines XP gain rates.
export const XP_THRESHOLDS: number[] = [0, 1_000, 3_000, 7_000, 15_000, 30_000];

// Mining Storage capacity (DOM) unlocked at each Pickaxe Level. Example config.
export const STORAGE_CAPACITY: number[] = [5_000, 7_500, 11_000, 16_000, 23_000, 32_000];

// ---- Referral Booster V2 --------------------------------------------------
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
// Not yet decided by the team — kept as TBA in site.ts rather than guessed
// here, since a withdrawal limit is an operational/financial commitment.
export const MIN_WITHDRAWAL: number | "TBA" = "TBA";
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
