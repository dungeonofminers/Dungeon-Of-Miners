// ---------------------------------------------------------------------------
// Dungeon of Miners — central content & config file.
// Edit copy, links, and asset paths here. Raw economy numbers live in
// economy.config.ts — this file turns them into the display-shaped data
// every page/component reads. Nothing else needs to change.
//
// ECONOMY v4.0 — CURRENT MODEL (see economyChangelog for full history)
// DOM has a permanently FIXED max supply of 1,000,000,000 on BNB Smart
// Chain (BEP-20). The entire supply is created once; minting is disabled
// after deployment. 55% (550,000,000 DOM) is the Mining Allocation,
// distributed — never minted — to miners through a server-authoritative
// Global Emission System across six equal Halving eras.
//
// There is no Holding/Pool wallet split. 100% of every claim becomes
// Available DOM Balance, eligible for instant, automated BSC withdrawal at
// zero fee to the miner.
//
// Progression is Pickaxe Level 1–6, driven by Mining XP (not wallet
// balance or an Equipment Multiplier — neither exists). TGE (public market
// launch) and Exchange Listing are both status: Coming Soon.
// ---------------------------------------------------------------------------

import {
  NETWORK,
  TOKEN_STANDARD,
  CHAIN_ID,
  BLOCK_EXPLORER_NAME,
  BLOCK_EXPLORER_URL,
  TOTAL_SUPPLY,
  MINING_ALLOCATION,
  LIQUIDITY_ALLOCATION,
  TEAM_ALLOCATION,
  TREASURE_ALLOCATION,
  ECOSYSTEM_ALLOCATION,
  PUBLIC_STRATEGIC_ALLOCATION,
  HALVING_COUNT,
  CURRENT_HALVING,
  HALVING_ALLOCATIONS,
  HALVING_EMISSION_RATES,
  EPOCH_DURATION_MINUTES,
  PICKAXE_POWER,
  XP_THRESHOLDS,
  STORAGE_CAPACITY,
  REFERRAL_BOOST_PER_ACTIVE_USER,
  MAX_REFERRAL_BOOST,
  MAX_QUALIFIED_REFERRALS,
  REFERRAL_ACTIVE_WINDOW_DAYS,
  REFERRAL_STARTER_BOOST_PERCENT,
  REFERRAL_STARTER_BOOST_HOURS,
  MAX_GUILD_MEMBERS,
  GUILD_COOLDOWN_HOURS,
  MAX_GUILD_BOOST,
  GUILD_BOOSTER_TIERS,
  BOOST_CAP,
  MIN_WITHDRAWAL,
  WITHDRAWAL_COOLDOWN_HOURS,
  formatDOM,
  formatPercent,
} from "./economy.config";

export const siteConfig = {
  name: "Dungeon of Miners",
  ticker: "DOM",
  tagline: "Mine DOM. Upgrade Your Pickaxe. Build Your Guild. Survive the Halving.",
  taglineShort: "Mine DOM. Withdraw On-Chain. Survive the Halving.",
  description:
    "Dungeon of Miners is a mining ecosystem powered by a fixed supply of 1 billion DOM, six Halving eras, Pickaxe progression, community Guilds and on-chain BSC withdrawals.",
  url: "https://dungeonofminers.com",
};

// Replace these with your real links.
export const links = {
  miniApp: "https://t.me/DungeonOfMinersBot",
  telegramCommunity: "https://t.me/DungeonOfMiners",
  telegramChannel: "https://t.me/DungeonOfMinersAnnouncements",
  twitter: "https://x.com/DungeonOfMiners",
};

// ---------------------------------------------------------------------------
// Navigation — grouped for the desktop dropdown / mobile accordion navbar.
// Hash links are prefixed with "/" so they resolve correctly from any page,
// not just the page that owns the section. "Rank" is intentionally absent —
// the primary progression system is Pickaxe Level 1–6.
// ---------------------------------------------------------------------------
export type NavItem = { label: string; href: string; external?: boolean; comingSoon?: boolean };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Game",
    items: [
      { label: "Overview", href: "/game" },
      { label: "How It Works", href: "/game#how-it-works" },
      { label: "Pickaxe Levels", href: "/game#pickaxes" },
      { label: "Features", href: "/game#features" },
    ],
  },
  {
    label: "Economy",
    items: [
      { label: "Mining Economy", href: "/economy" },
      { label: "Tokenomics", href: "/tokenomics" },
      { label: "Halvings", href: "/halving" },
      { label: "Live Dashboard", href: "/#dashboard" },
      { label: "On-Chain Withdrawal", href: "/economy#withdrawal" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Guilds", href: "/community/guilds" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Referral Program", href: "/referral" },
      { label: "Announcements", href: links.telegramChannel, external: true },
    ],
  },
  {
    label: "Docs",
    items: [
      { label: "Documentation", href: "/docs" },
      { label: "Transparency", href: "/transparency" },
      { label: "FAQ", href: "/faq" },
      { label: "Fair Play", href: "/fair-play" },
      { label: "Changelog", href: "/changelog" },
      { label: "Risk Disclosure", href: "/risk-disclosure" },
    ],
  },
];

export const navTopLevel: NavItem = { label: "Roadmap", href: "/roadmap" };

export const footerLegalLinks: NavItem[] = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Risk Disclosure", href: "/risk-disclosure" },
  { label: "Fair Play", href: "/fair-play" },
  { label: "Token Disclaimer", href: "/token-disclaimer" },
  { label: "Data Deletion", href: "/data-deletion" },
  { label: "Support", href: "/support" },
];

// ---------------------------------------------------------------------------
// Assets — drop your files into /public/assets using these exact names
// and every image on the site updates automatically. Until then, an
// elegant placeholder is rendered in its place. The six "halving*" keys
// reuse the existing floor artwork (Rubble→Abyss) purely as dungeon-depth
// brand lore/visual identity for Halving 1→6 — the retired "Floor" economic
// mechanic itself no longer exists anywhere in the emission model.
// ---------------------------------------------------------------------------
export const assets = {
  logoDom: "/assets/logo-dom.png",
  logoDragonCoin: "/assets/logo-dragon-coin.png",
  logoMinerHat: "/assets/logo-miner-hat.png",
  iconLivingEconomy: "/assets/icon-living-economy.png",
  iconScarcityWatch: "/assets/icon-scarcity-watch.png",
  iconHonestPretge: "/assets/icon-honest-pretge.png",
  iconZeroWithdrawFee: "/assets/icon-zero-withdraw-fee.png",
  heroDungeon: "/assets/hero-dungeon.png",
  telegramMockup: "/assets/telegram-mini-app-mockup.png",
  miniAppMine: "/assets/miniapp-mine-screen.png",
  miniAppEarn: "/assets/miniapp-earn-screen.png",
  miniAppBoost: "/assets/miniapp-boost-screen.png",
  miniAppReferral: "/assets/miniapp-referral-screen.png",
  miniAppMe: "/assets/miniapp-me-screen.png",
  halving1: "/assets/floor-rubble.png",
  halving2: "/assets/floor-hollow.png",
  halving3: "/assets/floor-gloom.png",
  halving4: "/assets/floor-ember.png",
  halving5: "/assets/floor-cinder.png",
  halving6: "/assets/floor-abyss.png",
  domEcosystem: "/assets/Oracle.svg",
  pickaxeLevel1: "/assets/pickaxe/pickaxe-level-1.png",
  pickaxeLevel2: "/assets/pickaxe/pickaxe-level-2.png",
  pickaxeLevel3: "/assets/pickaxe/pickaxe-level-3.png",
  pickaxeLevel4: "/assets/pickaxe/pickaxe-level-4.png",
  pickaxeLevel5: "/assets/pickaxe/pickaxe-level-5.png",
  pickaxeLevel6: "/assets/pickaxe/pickaxe-level-6.png",
};

// ---------------------------------------------------------------------------
// How It Works
// ---------------------------------------------------------------------------
export const coreLoop = [
  {
    step: "01",
    title: "Join the Mini App",
    description:
      "Open Dungeon of Miners inside Telegram. No downloads, no wallets to configure — just connect and step inside.",
  },
  {
    step: "02",
    title: "Start Mining — It's Live",
    description:
      "Your rig runs idle, mining DOM around the clock at a rate set by your Pickaxe Level and the current Halving era.",
  },
  {
    step: "03",
    title: "Claim to Available Balance",
    description:
      "Claim regularly. 100% of every claim moves from Mining Storage straight into your Available DOM Balance — no split.",
  },
  {
    step: "04",
    title: "Level Up Your Pickaxe",
    description:
      "Mining activity earns Mining XP. XP progresses your Pickaxe through Level 1–6, raising your Base Mining Power and Storage Capacity.",
  },
  {
    step: "05",
    title: "Boost Your Mining Weight",
    description:
      "Stack a Referral Booster and a Guild Booster on top of your Base Mining Power — both capped, so no one multiplier explodes.",
  },
  {
    step: "06",
    title: "Withdraw On-Chain",
    description:
      "Connect a BEP-20 wallet and withdraw eligible Available Balance instantly on BNB Smart Chain — zero withdrawal fee, network fee sponsored.",
  },
];

// ---------------------------------------------------------------------------
// The Six Halvings — built entirely from economy.config's HALVING_ALLOCATIONS
// / HALVING_EMISSION_RATES, never restated by hand. Each era is an EQUAL
// slice of the Mining Allocation; emissionRate is a relative pacing
// multiplier (halves every era) that governs how fast the backend releases
// that era's fixed allocation per epoch — it is NOT a separate additional
// supply, and NOT a publicly fixed "DOM per day" number. `status` should
// ultimately be backend-driven once real distributed totals exist.
// ---------------------------------------------------------------------------
export type HalvingStatus = "CURRENT" | "UPCOMING" | "LOCKED";

const HALVING_META: { name: string; vibe: string }[] = [
  { name: "Starting Era", vibe: "The surface tunnels. The first slice of the mining pool — the richest era to start extracting DOM." },
  { name: "First Reduction", vibe: "Empty caverns swallow sound. Halving 1's allocation is fully mined out — early miners keep their edge." },
  { name: "Deep Mining", vibe: "Torchlight barely holds the dark back. Only committed miners make it this far." },
  { name: "Scarcity Era", vibe: "Heat rises from the deep rock. DOM is harder to extract, and every claim counts more." },
  { name: "Last Vein", vibe: "Ash drifts through cracked tunnels. Scarcity is no longer a warning — it's the reality." },
  { name: "Final Depth", vibe: "The deepest chamber. The final slice of the mining pool." },
];

const HALVING_IMAGES = [assets.halving1, assets.halving2, assets.halving3, assets.halving4, assets.halving5, assets.halving6];

export const halvings = HALVING_ALLOCATIONS.map((allocation, i) => {
  const number = i + 1;
  return {
    number,
    name: HALVING_META[i].name,
    image: HALVING_IMAGES[i],
    allocation: formatDOM(allocation),
    percentOfPool: formatPercent(allocation / MINING_ALLOCATION),
    emissionRate: formatPercent(HALVING_EMISSION_RATES[i]),
    status: (number === CURRENT_HALVING ? "CURRENT" : number < CURRENT_HALVING ? "LOCKED" : number === CURRENT_HALVING + 1 ? "UPCOMING" : "LOCKED") as HalvingStatus,
    // Real-time figures — never fabricated. Populated once the backend
    // surfaces them; the UI shows "Awaiting Live Data" until then.
    distributed: "Awaiting Live Data",
    remaining: "Awaiting Live Data",
    progressPercent: null as number | null,
    vibe: HALVING_META[i].vibe,
  };
});

export const halvingTrigger =
  "Allocation-Based — the next Halving begins once the current era's mining allocation is fully distributed. There is no fixed date or timer.";

export const totalSupply = formatDOM(TOTAL_SUPPLY);

// ---------------------------------------------------------------------------
// Economy status — SINGLE SOURCE OF TRUTH for live mining/Halving/withdrawal
// state. Every component that shows this state reads from this object
// instead of hardcoding its own copy. Only flip a status to "LIVE" once the
// corresponding backend functionality is actually deployed.
// ---------------------------------------------------------------------------
export type MiningStatus = "LIVE" | "MAINTENANCE";
export type LaunchStatus = "LIVE" | "COMING SOON";

export const economyConfig = {
  miningStatus: "LIVE" as MiningStatus,
  withdrawalStatus: "LIVE" as LaunchStatus,
  tgeStatus: "COMING SOON" as LaunchStatus,
  exchangeListingStatus: "COMING SOON" as LaunchStatus,
  currentHalving: CURRENT_HALVING,
  network: `${NETWORK} (${TOKEN_STANDARD})`,
  walletConnector: "WalletConnect",
  mintingStatus: "Disabled — No Additional Minting",
  economyVersion: "v4.0",
  economyLastUpdated: "2026-09-17",
};

// ---------------------------------------------------------------------------
// Visible fixed-supply / minting labels — shown wherever the tokenomics
// architecture needs to be stated plainly.
// ---------------------------------------------------------------------------
export const supplyFacts = [
  { label: "Fixed Supply", value: totalSupply },
  { label: "Minting", value: economyConfig.mintingStatus },
  { label: "Mining Allocation", value: formatDOM(MINING_ALLOCATION) },
  { label: "Halving Eras", value: String(HALVING_COUNT) },
  { label: "Network", value: NETWORK },
  { label: "Token Standard", value: TOKEN_STANDARD },
];

// ---------------------------------------------------------------------------
// Token allocation — exact 1,000,000,000 DOM split, derived from
// economy.config (which enforces the sum at import time). Percentages and
// amounts must never be changed without an explicit, approved economic
// decision — change the numbers in economy.config.ts, not here.
// ---------------------------------------------------------------------------
export const tokenAllocation = [
  {
    id: "mining",
    label: "Mining Rewards",
    percent: Math.round((MINING_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(MINING_ALLOCATION),
    color: "#F4B544", // primary gold
    description: "The largest allocation belongs to miners and community distribution.",
  },
  {
    id: "liquidity",
    label: "Liquidity",
    percent: Math.round((LIQUIDITY_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(LIQUIDITY_ALLOCATION),
    color: "#D98A1E", // amber
    description: "Reserved to support healthy DOM market liquidity.",
  },
  {
    id: "team",
    label: "Team",
    percent: Math.round((TEAM_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(TEAM_ALLOCATION),
    color: "#8a5a3c", // bronze
    description: "Long-term allocation for the core team.",
  },
  {
    id: "treasury",
    label: "Treasure & Ecosystem Reserve",
    percent: Math.round((TREASURE_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(TREASURE_ALLOCATION),
    color: "#B8860B", // deep gold
    description: "Strategic reserve supporting rewards, campaigns, and long-term ecosystem requirements.",
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    percent: Math.round((ECOSYSTEM_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(ECOSYSTEM_ALLOCATION),
    color: "#FF8A2A", // warm orange
    description: "Allocated for product growth, guilds, partnerships, integrations, and ecosystem expansion.",
  },
  {
    id: "public",
    label: "Public / Strategic",
    percent: Math.round((PUBLIC_STRATEGIC_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(PUBLIC_STRATEGIC_ALLOCATION),
    color: "#a9825a", // muted copper
    description: "Reserved for public and strategic ecosystem opportunities.",
  },
];

export const MINING_ALLOCATION_DOM = formatDOM(MINING_ALLOCATION);

// ---------------------------------------------------------------------------
// Live mining status strip — every value here must come from the real
// backend once it's wired up. Nothing below is a fabricated live statistic;
// it's the honest structural shape the strip renders.
// ---------------------------------------------------------------------------
export const miningStatusStrip = {
  miningLabel: economyConfig.miningStatus,
  currentHalvingLabel: `Halving ${economyConfig.currentHalving} / ${HALVING_COUNT}`,
  withdrawalLabel: "ON-CHAIN",
  withdrawalFeeLabel: "0 DOM",
  tgeLabel: economyConfig.tgeStatus,
  listingLabel: economyConfig.exchangeListingStatus,
};

// ---------------------------------------------------------------------------
// Halving status facts — shown on the Halving page for the current era.
// ---------------------------------------------------------------------------
const currentHalvingEntry = halvings.find((h) => h.number === economyConfig.currentHalving)!;

export const halvingFacts = [
  { label: "Current Halving", value: `Halving ${currentHalvingEntry.number} · ${currentHalvingEntry.name}` },
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Current Era Allocation", value: currentHalvingEntry.allocation },
  { label: "Share of Mining Pool", value: currentHalvingEntry.percentOfPool },
  { label: "Relative Emission Rate", value: currentHalvingEntry.emissionRate },
  { label: "Mining Status", value: economyConfig.miningStatus },
  { label: "Total Halvings", value: String(HALVING_COUNT) },
];

// ---------------------------------------------------------------------------
// Mining XP — the main progression currency. Mining XP is NOT DOM: it never
// touches the token supply, and it is earned from activity, not holdings.
// ---------------------------------------------------------------------------
export const miningXPSources = [
  "Active mining",
  "Claim",
  "Daily check-in",
  "Stone Breaker",
  "Daily tasks",
  "Guild Expedition participation",
  "Guild contribution",
  "Achievements",
  "Qualified referrals",
];

export const xpThresholds = XP_THRESHOLDS;

// ---------------------------------------------------------------------------
// Mining activities — live mining is already on, so these are ongoing ways
// to build progression, not pre-launch busywork. Rewards are XP/boosters
// first — DOM only where it comes from a defined, capped budget.
// ---------------------------------------------------------------------------
export const miningActivities = [
  {
    icon: "user",
    title: "Miner Profile",
    description: "Set up your profile and start tracking your mining progress.",
    reward: "Profile Setup",
  },
  {
    icon: "shield",
    title: "Delver Badges",
    description: "Earn permanent badges tied to milestones and Halving eras.",
    reward: "Badge",
  },
  {
    icon: "calendar-check",
    title: "Daily Check-In",
    description: "Stay active every day to keep your streak and bonuses going.",
    reward: "Mining XP",
  },
  {
    icon: "user-plus",
    title: "Referrals",
    description: "Invite active miners to grow the Referral Booster on your Mining Weight.",
    reward: `+${REFERRAL_BOOST_PER_ACTIVE_USER}% Mining Weight`,
  },
  {
    icon: "users",
    title: "Guild Registration",
    description: "Connect your Telegram community and coordinate daily expeditions.",
    reward: "Guild Booster",
  },
  {
    icon: "list-checks",
    title: "Daily Tasks",
    description: "Complete community missions and objectives for steady progression.",
    reward: "Mining XP",
  },
];

// ---------------------------------------------------------------------------
// Effective Mining Weight — Pickaxe Base Mining Power stacked with capped
// boosters. This is NOT a per-user DOM/hour guarantee: the Halving does not
// multiply an individual's rate, it sets the finite GLOBAL allocation the
// entire network shares for that era (see emissionModel below). A miner's
// actual reward is their share of that shared, capped pool — never an
// unbounded number, no matter how many boosters stack.
// ---------------------------------------------------------------------------
export const miningFormula = {
  weightChain: [
    "Pickaxe Base Mining Power",
    "× (1 + Referral Booster + Guild Booster + Temporary Booster)",
  ],
  example: {
    label: "Effective Mining Weight Example",
    rows: [
      { label: "Pickaxe Base Mining Power (Level 3)", value: String(PICKAXE_POWER[2]) },
      { label: "Referral Booster (16 active referrals)", value: "+8%" },
      { label: "Guild Booster (guild 50%+ active)", value: "+5%" },
    ],
    final: { label: "Effective Mining Weight", value: `≈ ${Math.round(PICKAXE_POWER[2] * (1 + 0.08 + 0.05))}` },
  },
};

// ---------------------------------------------------------------------------
// Global Emission System — no per-user daily cap, no infinite mint. Each
// Halving has a fixed allocation; a relative emission rate paces how much
// of that fixed pool is released per mining epoch (a short, fixed interval
// — not a per-second loop, so the backend can scale to any miner count
// using an accumulated reward-per-weight index rather than recalculating
// every user on every tick).
// ---------------------------------------------------------------------------
export const emissionModel = {
  architecture: [
    "Halving Emission Rate",
    "→ Epoch Budget",
    "→ Total Mining Weight",
    "→ User Mining Weight",
    "→ User Reward",
  ],
  eraRateFormula: "EraEmissionRate = BaseEmissionRate × HalvingEmissionRate(currentHalving)",
  epochBudgetFormula: "EpochBudget = min(EraEmissionRate × EpochDuration, RemainingHalvingAllocation)",
  shareFormula: "userShare = userEffectiveMiningWeight ÷ totalNetworkMiningWeight",
  rewardFormula: "userReward = epochBudget × userShare",
  epochDurationLabel: `${EPOCH_DURATION_MINUTES}-minute epochs`,
  note: "Every miner receives a proportional share of the current epoch's budget, itself capped by the current Halving's remaining allocation — never an unbounded per-user rate. 10 miners, 10,000 miners, or 1,000,000 miners all draw from the same fixed era pool; they can never mine beyond it. All of this math runs server-side — the frontend only displays the result.",
};

export const boostRules = [
  { label: "Referral Booster", value: `+${REFERRAL_BOOST_PER_ACTIVE_USER}% Mining Weight per active qualified referral (max ${MAX_QUALIFIED_REFERRALS}) — up to +${MAX_REFERRAL_BOOST}%` },
  { label: "Guild Booster", value: `Tiered by guild activity — up to +${MAX_GUILD_BOOST}% Mining Weight` },
  { label: "Temporary / Event Booster", value: "TBA — configurable, always capped" },
  { label: "Combined Booster Ceiling", value: `+${BOOST_CAP}% before any event booster — the Halving's allocation always wins` },
];

export const storageRules = {
  description:
    "Your miner stores earned DOM here until you claim it. DOM accumulates inside Mining Storage; it is never an external crypto wallet, and it is never silently deleted.",
  capacityByLevel: STORAGE_CAPACITY,
  baseStorage: formatDOM(STORAGE_CAPACITY[0]),
  storageUpgrade: "Higher Pickaxe Levels unlock higher storage capacity — see Pickaxe Levels.",
  storageCapacity: "Displayed inside the Mini App",
  exampleCurrent: 2482,
  exampleMax: STORAGE_CAPACITY[0],
  fullStateTitle: "Mining Paused — Storage Full",
  fullStateNote: "Claim DOM to resume mining. Earned DOM is never deleted while storage is full.",
};

export const claimRules = {
  minimumClaim: "TBA",
  claimCooldown: "TBA",
  maximumClaim: "TBA",
  note: "100% of every claimed amount becomes Available DOM Balance immediately — there is no wallet split.",
};

// ---------------------------------------------------------------------------
// Balance & withdrawal flow — replaces the retired Holding Wallet / Pool
// Wallet / 70:30 split entirely. Mining Storage is server-authoritative
// mining state, not an external wallet; only the Connected Wallet step
// touches the blockchain.
// ---------------------------------------------------------------------------
export const balanceModel = {
  steps: [
    {
      label: "Mining Storage",
      description: "Unclaimed mining rewards accumulate here. Server-authoritative mining state — not an external wallet.",
    },
    {
      label: "Claim",
      description: "Press Claim to move stored DOM into your Available Balance.",
    },
    {
      label: "Available DOM Balance",
      description: "100% of the claimed amount becomes available — no split.",
    },
    {
      label: "Withdraw",
      description: "Request withdrawal of eligible Available Balance to your connected BEP-20 wallet.",
    },
    {
      label: "Connected Wallet",
      description: "Your external BEP-20 wallet on BNB Smart Chain, connected via WalletConnect.",
    },
  ],
  accountingStates: ["miningStorage", "availableBalance", "pendingWithdrawal", "withdrawnBalance"],
  integrityNote:
    "Withdrawal validation always happens server-side with atomic database transactions and idempotency keys — the frontend only displays state, it never owns it. One reward can never be claimed or withdrawn twice.",
};

// ---------------------------------------------------------------------------
// Wallet linking — signature-based ownership verification. Dungeon of
// Miners never asks for a seed phrase, private key, or recovery phrase.
// ---------------------------------------------------------------------------
export const walletLinkingFlow = [
  "Connect an EVM (BSC-compatible) wallet",
  "Backend issues a single-use nonce",
  "User signs an ownership message with their wallet — never a transaction, never a key",
  "Backend verifies the signature against the nonce",
  "Wallet is linked to the account",
];

export const walletLinkingRecord = ["wallet_address", "verified_at", "network", "signature_nonce_history"];

// ---------------------------------------------------------------------------
// Transaction / ledger types — every balance-affecting event is recorded,
// never a silent edit.
// ---------------------------------------------------------------------------
export const transactionTypes = [
  "MINING_ACCRUAL",
  "CLAIM",
  "WITHDRAWAL_PENDING",
  "WITHDRAWAL_CONFIRMED",
  "WITHDRAWAL_FAILED",
  "REFERRAL_REWARD",
  "EVENT_REWARD",
  "ADMIN_ADJUSTMENT",
];

export const transactionHistoryFilters = ["Mining", "Claim", "Withdrawal", "Rewards", "Adjustment"];

// ---------------------------------------------------------------------------
// Public Halving Ledger — transparency data. Structural shape only; once the
// real backend is wired up these should be live reads, not edited by hand.
// No live numbers are fabricated here.
// ---------------------------------------------------------------------------
export const halvingLedger = [
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Total Mined", value: "Awaiting Live Data" },
  { label: "Remaining Mining Allocation", value: "Awaiting Live Data" },
  { label: "Current Halving", value: `Halving ${currentHalvingEntry.number} · ${currentHalvingEntry.name}` },
  { label: "Current Era Allocation", value: currentHalvingEntry.allocation },
  { label: "Remaining Era Allocation", value: "Awaiting Live Data" },
  { label: "Current Network Mining Weight", value: "Awaiting Live Data" },
  { label: "Number of Active Miners", value: "Awaiting Live Data" },
];

export const halvingRecord = [
  { label: "Economy Version", value: economyConfig.economyVersion },
  { label: "Last Updated", value: economyConfig.economyLastUpdated },
  { label: "Total Supply", value: totalSupply },
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Current Halving", value: `${economyConfig.currentHalving} of ${HALVING_COUNT}` },
  { label: "Mining Status", value: economyConfig.miningStatus },
];

// Filled in by the backend once a Halving era actually completes — empty by design.
export type HalvingArchiveEntry = {
  halving: string;
  started: string;
  ended: string;
  duration: string;
  domMined: string;
  participatingMiners: string;
  totalClaims: string;
  topGuild: string;
  trigger: string;
};
export const halvingArchive: HalvingArchiveEntry[] = [];

// ---------------------------------------------------------------------------
// Live Economy Dashboard — one of the most important sections on the site.
// Every value is either a known configuration fact or an honest
// "Awaiting Live Data" placeholder. Never a fabricated statistic.
// ---------------------------------------------------------------------------
export const liveDashboardMetrics = [
  { label: "Total Supply", value: totalSupply },
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Total Mined", value: "Awaiting Live Data" },
  { label: "Mining Allocation Remaining", value: "Awaiting Live Data" },
  { label: "Current Halving", value: `${economyConfig.currentHalving} / ${HALVING_COUNT}` },
  { label: "Current Emission Rate", value: currentHalvingEntry.emissionRate },
  { label: "Current Network Mining Weight", value: "Awaiting Live Data" },
  { label: "Active Miners", value: "Awaiting Live Data" },
  { label: "Total Claimed", value: "Awaiting Live Data" },
  { label: "Total Withdrawn", value: "Awaiting Live Data" },
  { label: "Number of Guilds", value: "Awaiting Live Data" },
  { label: "Qualified Referrals", value: "Awaiting Live Data" },
];

// Real withdrawals only — this stays empty until the backend can supply
// genuine on-chain data. Never seed it with example rows.
export type RecentWithdrawal = { address: string; amount: string; status: string; txUrl: string };
export const recentWithdrawals: RecentWithdrawal[] = [];

export const economyChangelog = [
  {
    version: "v4.0",
    date: economyConfig.economyLastUpdated,
    summary:
      "DOM Mining Ecosystem Update: confirmed BNB Smart Chain (BEP-20) as the permanent network, introduced a centralized economy configuration, rebalanced Pickaxe Base Mining Power to a 4.5x (not 100x) spread, added Mining XP as the progression currency, and deepened Guild V2 with Guild XP, Levels, Expeditions, and Seasons.",
    changes: [
      "Confirmed BNB Smart Chain (BEP-20) as the final network — DOM does not use TON.",
      "Centralized every economy number in economy.config.ts — no more independently hardcoded values.",
      "Rebalanced Pickaxe Base Mining Power from a 100x (10 → 1000) spread to a 4.5x (100 → 450) spread.",
      "Introduced Mining XP as the main progression currency, separate from DOM, earned from activity rather than holdings.",
      "Documented the Global Emission System as an epoch-based accumulator (Halving Rate → Epoch Budget → Mining Weight → Reward), not a flat daily/hourly rate.",
      "Expanded Guild V2 with Guild XP, Guild Levels, Guild Expeditions, and Guild Seasons.",
      "Rebuilt the Leaderboard into Player (Daily/Weekly/Halving/All-Time) and Guild (Weekly/Season/Halving/All-Time) boards, ranked by XP and activity, never wallet balance.",
      "Added a Live Economy Dashboard, a BSC Transparency page, and a Treasury & Vesting page — all honestly marked Awaiting Live Data / Pending Final Approval where real figures don't exist yet.",
      "Documented the signature-based wallet linking flow — Dungeon of Miners never requests a seed phrase, private key, or recovery phrase.",
    ],
  },
  {
    version: "v3.0",
    date: "2026-09-17",
    summary:
      "HISTORICAL / RETIRED — Removed the Holding/Pool Wallet split, migrated Ranks to Pickaxe Level 1–6, removed the Pickaxe Equipment Multiplier, introduced a Global Emission Pool, standardized the six Halving allocations, rebuilt Referral and Guild boosters, and added TGE / Exchange Listing status. Superseded by v4.0.",
  },
  {
    version: "v2.0",
    date: "2026-09-15",
    summary:
      "HISTORICAL / RETIRED — DOM Live Economy Update: Pre-TGE model retired, supply updated to 1,000,000,000 DOM, new six-part token allocation introduced, the Floor system replaced by a six-Halving multiplier model, and on-chain withdrawal introduced at zero fee to miners.",
  },
  {
    version: "v1.0",
    date: "2026-09-14",
    summary: "HISTORICAL / RETIRED — Original Pre-TGE economy rules: 6-floor allocation of a 6,000,000,000 DOM supply, ×1.00–×0.03125 Descent multipliers, 70/30 claim split.",
  },
];

// ---------------------------------------------------------------------------
// On-chain withdrawal — network/contract configuration. Anything not yet
// officially deployed/confirmed is TBA rather than invented. Server secrets
// (signer keys, treasury credentials) must never live here or anywhere in
// frontend code — this object is safe-to-ship public configuration only.
// ---------------------------------------------------------------------------
export const withdrawalConfig = {
  feeDom: 0,
  feeLabel: "Zero Withdrawal Fee",
  networkFeeLabel: "Sponsored by Dungeon of Miners",
  network: `${NETWORK} (${TOKEN_STANDARD})`,
  walletConnector: "WalletConnect",
  chainId: `${CHAIN_ID} (${NETWORK} Mainnet)`,
  domContractAddress: "Coming Soon",
  blockExplorerUrl: `${BLOCK_EXPLORER_NAME} (${BLOCK_EXPLORER_URL.replace("https://", "")})`,
  statuses: ["Processing", "Broadcasted", "Confirming", "Confirmed", "Failed"] as const,
  minimumWithdrawal: typeof MIN_WITHDRAWAL === "number" ? formatDOM(MIN_WITHDRAWAL) : "TBA",
  maximumWithdrawal: "TBA",
  withdrawalCooldown: typeof WITHDRAWAL_COOLDOWN_HOURS === "number" ? `${WITHDRAWAL_COOLDOWN_HOURS} hours` : "TBA",
  instantNote:
    "Instant withdrawal means the backend automatically validates and broadcasts your transaction — no manual approval queue. BNB Smart Chain itself still needs real confirmations: status only reaches Confirmed after the network confirms the transaction, never immediately after sending it.",
};

export const withdrawalSecurityMeasures = [
  "Minimum withdrawal threshold",
  "Withdrawal cooldown per account",
  "Per-user rate limiting",
  "Idempotency keys on every withdrawal request",
  "Atomic balance locking (no double-spend)",
  "Hot wallet balance monitoring",
  "BNB gas monitoring for the sponsoring wallet",
  "Failed-transaction reconciliation",
  "Daily treasury safety limit",
  "Emergency pause capability",
  "Full withdrawal audit log",
];

export const antiCheatMeasures = [
  "Multiple-account detection",
  "Self-referral detection",
  "Bot / automation detection",
  "Referral farm detection",
  "Duplicate claim prevention",
  "Duplicate withdrawal prevention",
  "Guild abuse detection",
  "Fake activity detection",
  "API replay protection",
  "Client-side balance manipulation rejection",
  "Direct endpoint abuse protection",
  "Race-condition–safe accounting",
];

export const serverAuthoritativeState = [
  "Mining balance",
  "Mining Storage",
  "Available Balance",
  "Mining XP",
  "Pickaxe Level",
  "Referral status",
  "Referral Booster",
  "Guild membership",
  "Guild Booster",
  "Global emission accounting",
  "Halving progression",
  "Claim",
  "Withdrawal",
];

export const riskDisclosure =
  "Dungeon of Miners is a live mining ecosystem on BNB Smart Chain. Mining or holding DOM does not guarantee financial value, profit, or return. Digital assets can be volatile, and participation carries smart contract risk, wallet risk, blockchain and network risk, technical failure, network congestion, market volatility, liquidity risk, and the possibility of ecosystem changes. DOM's TGE (public market launch) and Exchange Listing are both status: Coming Soon — no date, exchange venue, opening price, market cap, or liquidity amount has been announced, and none should be assumed until officially confirmed through Dungeon of Miners' own channels. Dungeon of Miners does not promise financial return, profit, price appreciation, exchange listing, or guaranteed liquidity. Users should independently evaluate the risks of holding or using blockchain assets.";

// ---------------------------------------------------------------------------
// Fair Play policy
// ---------------------------------------------------------------------------
export const fairPlay = {
  notAllowed: [
    "Automation scripts",
    "Bots",
    "Modified clients",
    "Request manipulation",
    "Multiple-account farming",
    "Referral farming / referral abuse",
    "Guild manipulation",
    "Sybil attacks",
    "API abuse",
    "Exploit abuse",
    "Tampering with mining calculation",
    "Withdrawal exploits",
    "Balance manipulation",
    "Duplicate reward events",
    "Smart contract exploitation",
  ],
  possibleActions: [
    "Reward rollback",
    "Referral/Guild booster reversal",
    "Leaderboard removal",
    "Mining suspension",
    "Withdrawal security review",
    "Account restriction",
    "Account ban",
  ],
};

// ---------------------------------------------------------------------------
// Guild V2 — Telegram-community-based guilds. One Telegram group binds to
// exactly one Guild via its permanent telegram_chat_id, not a mutable
// @username. Guild Booster is tiered and capped; it modifies mining WEIGHT
// only and never creates additional DOM beyond the global emission ceiling.
// ---------------------------------------------------------------------------
export const guildConfig = {
  maxMembers: MAX_GUILD_MEMBERS,
  joinCooldownHours: GUILD_COOLDOWN_HOURS,
  maxBoostPercent: MAX_GUILD_BOOST,
  roles: ["Owner", "Officer", "Member"],
};

export const guildRolePermissions = [
  { role: "Owner", actions: ["Edit Guild", "Manage Officers", "Remove members", "Transfer ownership", "Manage invitations", "Dissolve Guild"] },
  { role: "Officer", actions: ["Moderate members", "Manage community activities", "Handle invitations"] },
  { role: "Member", actions: ["Mine", "Contribute", "Participate in Expeditions", "Leave Guild"] },
];

export const guildBoosterTiers = GUILD_BOOSTER_TIERS.map((t) => ({
  activeThreshold: t.activeThreshold,
  weightBonus: t.bonusPercent,
}));

export const guildCreationFlow = [
  "Open the Guild section in the Mini App",
  'Press "Create Guild"',
  'Press "Connect Telegram Group"',
  "Choose an eligible Telegram Group or Supergroup",
  "Backend verifies the connected group and your creator/admin role",
  "Your Telegram group's chat ID is permanently bound to your Guild",
];

export const guildRuleDetails = [
  { label: "Max Members", value: String(guildConfig.maxMembers) },
  { label: "Join Cooldown (after leaving)", value: `${guildConfig.joinCooldownHours} hours` },
  { label: "Maximum Guild Booster", value: `+${guildConfig.maxBoostPercent}% Mining Weight` },
  { label: "Guild Creation Cost", value: "TBA" },
];

// Guild XP — separate from a member's personal Mining XP. Earned by the
// guild as a whole; unlocks cosmetics and access, never uncapped DOM.
export const guildXP = {
  sources: ["Active members", "Expedition completion", "Mining contribution", "Guild achievements", "Weekly participation"],
  unlocks: ["Guild Levels", "Cosmetic banners", "Badges", "Titles", "Profile frames", "Special expedition access"],
};

export const guildExpeditions = {
  cadences: ["Daily Guild Expedition", "Weekly Guild Expedition"],
  examples: [
    "20 members mine today",
    "15 members claim today",
    "Complete 100 Daily Tasks (guild-wide)",
    "Break X Stones in Stone Breaker (guild-wide)",
    "Reach a cumulative Guild XP target",
    "Reach a guild activity percentage target",
  ],
  rewards: ["Guild XP", "Season Points", "Cosmetic reward", "Temporary capped mining boost", "Achievement"],
};

export const guildSeasons = {
  current: "Season 1",
  tiedTo: "Halving 1",
  durationNote: "Season duration is configurable — tied to Halving progression rather than a fixed calendar date.",
  onSeasonEnd: "The season leaderboard resets. The All-Time Hall of Fame is permanent, so new guilds can always compete for it later.",
};

export const guildProfileFields = [
  "Guild ID", "Guild Name", "Guild Logo", "Description", "Community link", "Owner", "Officers", "Members",
  "Member capacity", "Guild Level", "Guild XP", "Activity %", "Current Booster", "Season Points",
  "Mining Contribution", "Expedition Progress", "Leaderboard Rank", "Invite Link",
];

// ---------------------------------------------------------------------------
// Referral Booster V2 — replaces the retired +2%/50-referral/+100%/+50 DOM
// model. Capped, ONE LEVEL ONLY (no downline/MLM tree), and tied to ACTIVE
// qualified referrals so it can never create unbounded emission or reward
// dead/farmed accounts.
// ---------------------------------------------------------------------------
export type ReferralStatus = "Invited" | "Pending" | "Qualified" | "Active" | "Inactive" | "Flagged" | "Invalidated";

export const referralBooster = {
  weightPerActiveReferral: REFERRAL_BOOST_PER_ACTIVE_USER,
  maxQualifiedReferrals: MAX_QUALIFIED_REFERRALS,
  maxBoostPercent: MAX_REFERRAL_BOOST,
  activeWindowDays: REFERRAL_ACTIVE_WINDOW_DAYS,
  starterBoost: { percent: REFERRAL_STARTER_BOOST_PERCENT, durationHours: REFERRAL_STARTER_BOOST_HOURS },
  milestones: [1, 3, 5, 10, 20, 30],
  levels: "One level only — no downline, no MLM reward tree.",
  qualificationRules: [
    "Unique Telegram account",
    "Valid referral attribution, no self-referral",
    "Completes onboarding",
    "Mines on multiple separate days",
    "Passes anti-abuse checks",
    "Stays active within the rolling activity window to keep contributing to the booster",
  ],
  statuses: ["Invited", "Pending", "Qualified", "Active", "Inactive", "Flagged", "Invalidated"] as ReferralStatus[],
};

// Example/empty dashboard shape — real numbers are per-account and require
// a live backend. Shown as "Awaiting Live Data" until then, never guessed.
export const referralDashboardShape = [
  { label: "Invited", value: "Awaiting Live Data" },
  { label: "Qualified", value: "Awaiting Live Data" },
  { label: "Active", value: "Awaiting Live Data" },
  { label: "Current Booster", value: "Awaiting Live Data" },
  { label: "Maximum Booster", value: `+${referralBooster.maxBoostPercent}%` },
];

// ---------------------------------------------------------------------------
// Pickaxe Levels — the PRIMARY progression system, replacing the retired
// Rank System. Progression is driven by persistent Mining XP / lifetime
// activity, never by current wallet balance — withdrawing DOM must never
// cost a player their level. Cosmetic names (Novice → Legend) are secondary
// flavor only. Base Mining Power is deliberately kept within a ~4.5x range
// (not the old 100x spread) so no single level dominates the economy.
// ---------------------------------------------------------------------------
export type PickaxeLevel = {
  level: number;
  cosmeticName: string;
  basePower: number;
  xpRequired: number;
  xpToNext: number | null;
  storageCapacity: string;
  image: string;
  accent: string;
  unlocks: string[];
};

const PICKAXE_COSMETIC_NAMES = ["Novice", "Bronze", "Silver", "Gold", "Diamond", "Legend"];
const PICKAXE_IMAGES = [assets.pickaxeLevel1, assets.pickaxeLevel2, assets.pickaxeLevel3, assets.pickaxeLevel4, assets.pickaxeLevel5, assets.pickaxeLevel6];
const PICKAXE_ACCENTS = [
  "from-stone-800 to-stone-900",
  "from-[#8a5a3c] to-[#5a3822]",
  "from-[#9aa4b2] to-[#5c6472]",
  "from-gold-light to-gold-dark",
  "from-[#9fe8e0] to-[#3fa9a0]",
  "from-torch to-torch-ember",
];
const PICKAXE_UNLOCKS = [
  ["Miner Profile", "Base Storage Capacity"],
  ["Delver Badge: Bronze", "Expanded Storage"],
  ["Delver Badge: Silver", "Guild Officer eligibility"],
  ["Delver Badge: Gold", "Profile prestige frame"],
  ["Delver Badge: Diamond", "Priority Stone Breaker rewards"],
  ["Delver Badge: Legend", "Maximum Storage Capacity", "Legend profile effects"],
];

export const pickaxeLevels: PickaxeLevel[] = PICKAXE_POWER.map((power, i) => ({
  level: i + 1,
  cosmeticName: PICKAXE_COSMETIC_NAMES[i],
  basePower: power,
  xpRequired: XP_THRESHOLDS[i],
  xpToNext: i < XP_THRESHOLDS.length - 1 ? XP_THRESHOLDS[i + 1] : null,
  storageCapacity: formatDOM(STORAGE_CAPACITY[i]),
  image: PICKAXE_IMAGES[i],
  accent: PICKAXE_ACCENTS[i],
  unlocks: PICKAXE_UNLOCKS[i],
}));

// ---------------------------------------------------------------------------
// Leaderboards — ranked by XP and verified activity, never by wallet
// balance. Player and Guild boards each span multiple timeframes.
// ---------------------------------------------------------------------------
export const leaderboardConfig = {
  playerTabs: ["Daily", "Weekly", "Halving", "All-Time"],
  guildTabs: ["Weekly", "Season", "Halving", "All-Time"],
  playerMetrics: ["Mining XP", "DOM Mined", "Pickaxe Level", "Active Days", "Guild Contribution", "Season Points"],
  guildMetrics: ["Guild XP", "Verified Activity", "Mining Contribution", "Expedition Completion", "Season Points"],
  rewardPhilosophy: "Leaderboard rewards favor XP, badges, cosmetics, and titles over large direct DOM payouts, so ranking well never distorts the capped emission model.",
};

// ---------------------------------------------------------------------------
// Features — organized by system group. Only real/current/planned systems.
// ---------------------------------------------------------------------------
export type FeatureItem = { title: string; description: string; icon: string };
export type FeatureGroup = { group: string; items: FeatureItem[] };

export const featureGroups: FeatureGroup[] = [
  {
    group: "Core Mining",
    items: [
      { title: "Idle Mining", description: "DOM accumulates around the clock, whether you're online or not.", icon: "pickaxe" },
      { title: "Global Emission", description: "Mining distributes DOM from a capped 550,000,000 DOM allocation via a server-side epoch system — it never creates new supply.", icon: "gauge" },
      { title: "Six Halvings", description: "Six equal allocations of the mining pool — each era mines out fully before the next Halving begins.", icon: "flame" },
      { title: "Mining Storage", description: "Unclaimed DOM accumulates safely until you claim it — nothing is ever deleted.", icon: "box" },
      { title: "Claim", description: "Claim moves stored DOM into your Available Balance — 100%, no split.", icon: "check-circle" },
      { title: "Mining XP", description: "A dedicated progression currency, separate from DOM, earned through activity.", icon: "star" },
      { title: "Pickaxe Level 1–6", description: "Progress your pickaxe through Mining XP to raise your Base Mining Power and Storage Capacity.", icon: "hammer" },
    ],
  },
  {
    group: "Blockchain",
    items: [
      { title: "BNB Smart Chain", description: "DOM is issued and distributed on BNB Smart Chain.", icon: "link" },
      { title: "BEP-20 DOM", description: "A standard BEP-20 token — compatible with the BSC wallet ecosystem.", icon: "coins" },
      { title: "Wallet Linking", description: "Signature-based ownership verification — never a seed phrase or private key.", icon: "wallet" },
      { title: "Available DOM Balance", description: "The spendable, withdrawal-eligible balance created the moment you claim.", icon: "coins" },
      { title: "BSC Withdrawal", description: "Instant, automated backend validation and broadcast — no manual approval queue.", icon: "send" },
      { title: "Transaction Status", description: "Processing, Broadcasted, Confirming, Confirmed, or Failed — always shown honestly.", icon: "activity" },
      { title: "BscScan Verification", description: "Every confirmed withdrawal is verifiable on a public block explorer.", icon: "search" },
    ],
  },
  {
    group: "Social",
    items: [
      { title: "Guilds", description: "Bind your Telegram group or supergroup to its own Dungeon of Miners Guild.", icon: "users" },
      { title: "Guild XP", description: "Earned from active members, expeditions, and mining contribution.", icon: "star" },
      { title: "Guild Levels", description: "Guild XP unlocks cosmetic banners, badges, titles, and profile frames.", icon: "trophy" },
      { title: "Guild Expeditions", description: "Daily and weekly community targets that reward Guild XP and cosmetics.", icon: "swords" },
      { title: "Guild Seasons", description: "Season leaderboards reset periodically; the All-Time Hall of Fame never does.", icon: "calendar-check" },
      { title: "Guild Leaderboard", description: "Guilds ranked by verified activity and contribution, never raw member count.", icon: "list-checks" },
      { title: "Referral Booster", description: `+${REFERRAL_BOOST_PER_ACTIVE_USER}% Mining Weight per active qualified referral, up to +${MAX_REFERRAL_BOOST}%.`, icon: "user-plus" },
      { title: "Referral Milestones", description: "Badges and cosmetics for 1, 3, 5, 10, 20, and 30 qualified referrals.", icon: "shield" },
    ],
  },
  {
    group: "Engagement",
    items: [
      { title: "Daily Check-In", description: "Stay active every day to keep your streak alive.", icon: "calendar-check" },
      { title: "Daily Tasks", description: "Community missions and objectives for steady progression.", icon: "check-circle" },
      { title: "Stone Breaker", description: "A quick timing mini-game rewarding Mining XP, boosters, and cosmetics.", icon: "gem" },
      { title: "Achievements", description: "Permanent milestones tracked across your entire mining history.", icon: "shield" },
      { title: "Miner Card", description: "Share your miner profile and progress with your community.", icon: "share-2" },
      { title: "Temporary Boosters", description: "Short-duration, capped mining-weight boosts from events and activities.", icon: "zap" },
    ],
  },
  {
    group: "Transparency",
    items: [
      { title: "Fixed Supply", description: "1,000,000,000 DOM — always the same number, never inflated.", icon: "lock" },
      { title: "Supply Dashboard", description: "Live-tracked mining allocation and distribution once the backend surfaces it — never fabricated.", icon: "gauge" },
      { title: "Halving Dashboard", description: "Which of the six Halving eras the network is in right now, and its progress.", icon: "flame" },
      { title: "Treasury Wallets", description: "Every non-mining allocation's wallet, purpose, and status in one place.", icon: "scroll" },
      { title: "Vesting", description: "The unlock model for the 45% non-mining supply, published as soon as it's finalized.", icon: "calendar-check" },
      { title: "Recent Withdrawals", description: "Real on-chain withdrawals, shown with shortened addresses and a BscScan link.", icon: "activity" },
      { title: "Fair Play", description: "The rules that protect a shared, finite mining economy.", icon: "shield" },
      { title: "Changelog", description: "Every economy rule change tracked publicly by version.", icon: "scroll" },
    ],
  },
  {
    group: "Upcoming",
    items: [
      { title: "TGE / Public Market Launch", description: "Status: Coming Soon.", icon: "rocket" },
      { title: "Exchange Listing", description: "Announced only through official Dungeon of Miners channels — status: Coming Soon.", icon: "trending-up" },
    ],
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const faqs = [
  {
    question: "What is Dungeon of Miners?",
    answer:
      "Dungeon of Miners is a live mining ecosystem. You mine DOM passively, level up your Pickaxe through Mining XP, and progress through six Halving eras alongside a global community of miners and Telegram-based Guilds.",
  },
  {
    question: "What blockchain does DOM use?",
    answer: "BNB Smart Chain. DOM is a BEP-20 token, compatible with the standard BSC wallet ecosystem (MetaMask, Trust Wallet, and other WalletConnect-compatible wallets).",
  },
  {
    question: "What is DOM?",
    answer: "DOM is the single token of the Dungeon of Miners economy — mined by players and eligible for on-chain withdrawal on BNB Smart Chain.",
  },
  {
    question: "What is the maximum supply?",
    answer: "1,000,000,000 DOM. The entire supply is fixed and created once.",
  },
  {
    question: "Can more DOM be minted?",
    answer:
      "No. Minting is permanently disabled after the full 1,000,000,000 DOM supply is created. Mining is distribution of the pre-allocated 550,000,000 DOM Mining Allocation — it is never token creation, and it can never push total supply beyond 1 billion.",
  },
  {
    question: "How does mining work?",
    answer:
      "Mining is idle and server-authoritative. Your Pickaxe Level sets your Base Mining Power, boosted by your Referral and Guild Boosters into an Effective Mining Weight. Each mining epoch, you receive a share of that epoch's budget proportional to your weight — never an unlimited per-user rate.",
  },
  {
    question: "What is Global Emission?",
    answer:
      "Global Emission is the system that turns a Halving's fixed allocation into rewards: Halving Emission Rate → Epoch Budget → Total Mining Weight → Your Mining Weight → Your Reward. It guarantees the network can never distribute more than the current Halving's allocation, no matter how many miners join.",
  },
  {
    question: "What are the Six Halvings?",
    answer: `The ${MINING_ALLOCATION_DOM} Mining Allocation is split into six equal eras (${halvings[0].allocation} each, ${halvings[5].allocation} for Halving 6). Each era also has a relative emission rate that halves from the previous era, pacing how quickly that era's allocation is released.`,
  },
  {
    question: "How does a Halving happen?",
    answer: "The next Halving begins only once the current era's fixed allocation is completely mined out — there is no fixed date, timer, or daily cap.",
  },
  {
    question: "What is Mining XP?",
    answer: "Mining XP is your main progression currency — it is not DOM and never touches token supply. You earn it from mining, claiming, daily check-ins, Stone Breaker, daily tasks, Guild Expeditions, guild contribution, achievements, and qualified referrals. XP progresses your Pickaxe Level.",
  },
  {
    question: "What are Pickaxe Levels?",
    answer:
      "Pickaxe Level 1–6 is the primary mining progression system, replacing the old Rank System. Levels are driven by persistent Mining XP, never by your current wallet balance — withdrawing DOM never costs you progress. Optional cosmetic names (Novice → Legend) map to each level.",
  },
  {
    question: "Does Pickaxe use an Equipment Multiplier?",
    answer:
      "No. Dungeon of Miners does not have a Pickaxe Equipment Multiplier. Each Pickaxe Level sets your Base Mining Power directly — it is not a separate multiplicative modifier on top of a base rate.",
  },
  {
    question: "How does Mining Storage work?",
    answer: "Mining Storage is server-authoritative state, not an external wallet — your miner stores earned DOM here until you claim it. Higher Pickaxe Levels unlock higher storage capacity.",
  },
  {
    question: "What happens if storage becomes full?",
    answer: "Mining pauses — you'll see \"Storage Full, Claim DOM to Resume Mining.\" Earned DOM is never deleted; claim to pick mining back up.",
  },
  {
    question: "How does Claim work?",
    answer: "Pressing Claim moves your stored DOM into your Available DOM Balance. 100% of the claimed amount becomes available — there is no wallet split.",
  },
  {
    question: "How does withdrawal work?",
    answer:
      "Connect your BEP-20 wallet, enter an amount, and confirm. The backend validates your Available Balance server-side and automatically broadcasts the transaction on BNB Smart Chain — no manual approval queue. You'll see a real transaction hash, a BscScan link, and a status of Processing, Broadcasted, Confirming, Confirmed, or Failed.",
  },
  {
    question: "What wallet can I use?",
    answer: "Any BEP-20-compatible wallet via WalletConnect — including MetaMask and Trust Wallet.",
  },
  {
    question: "Does Dungeon of Miners request a seed phrase?",
    answer: "No. Dungeon of Miners never asks for your seed phrase, private key, or recovery phrase — for any reason. Wallet linking uses a signed message, not your keys.",
  },
  {
    question: "What does zero withdrawal fee mean?",
    answer:
      "Dungeon of Miners charges you 0 DOM to withdraw. This describes the fee the miner pays, not the blockchain itself — BNB Smart Chain still has a real transaction cost, which the ecosystem sponsors on your behalf.",
  },
  {
    question: "What is the minimum withdrawal?",
    answer: "Not yet finalized — shown as TBA until the team publishes an official minimum.",
  },
  {
    question: "What is a Guild?",
    answer: "A Guild is a Telegram-community-based team of up to 30 miners who coordinate expeditions and earn a shared Guild Booster.",
  },
  {
    question: "How does Guild Booster work?",
    answer:
      "The Guild Booster scales with how active your guild really is: 30% of members active grants +2% Mining Weight, 50% grants +5%, 70% grants +8%, and 90%+ grants the maximum +10%. It's recalculated on a regular basis and never rewards empty or inactive guilds.",
  },
  {
    question: "What is Guild XP?",
    answer: "Guild XP is earned by the whole guild from active members, expedition completion, mining contribution, and achievements. It unlocks Guild Levels, cosmetic banners, badges, and titles — never uncapped DOM.",
  },
  {
    question: "What is a Guild Expedition?",
    answer: "A daily or weekly guild-wide target (e.g. a claim quota or a cumulative Stone Breaker goal) that rewards Guild XP, Season Points, and cosmetics when completed together.",
  },
  {
    question: "What is a Guild Season?",
    answer: "A recurring competitive period (Season 1 runs alongside Halving 1). Season leaderboards reset at the end of each season, while the All-Time Hall of Fame stays permanent.",
  },
  {
    question: "How does Referral Booster work?",
    answer: `Each active, qualified referral adds +${REFERRAL_BOOST_PER_ACTIVE_USER}% Mining Weight, up to a maximum of ${MAX_QUALIFIED_REFERRALS} referrals for a +${MAX_REFERRAL_BOOST}% cap. It's one level only — there is no downline or multi-level reward tree.`,
  },
  {
    question: "What is a qualified referral?",
    answer:
      "A unique Telegram account with valid attribution (no self-referral) that completes onboarding and mines on multiple separate days. It must also stay active within a rolling window to keep contributing to your booster — otherwise it stops counting until it's active again.",
  },
  {
    question: "How does anti-fraud work?",
    answer:
      "Layered anti-abuse checks watch for self-referrals, multi-account farms, duplicated identities, abnormal signup bursts, bot activity, and referral rings. Referrals and accounts move through clear statuses, and any confirmed fraud can reverse the reward. Exact detection thresholds are intentionally not published.",
  },
  {
    question: "When is the TGE?",
    answer: "Status: Coming Soon. Mining and on-chain withdrawal already operate before the public market launch. No TGE date has been set — one will be announced only through official Dungeon of Miners channels.",
  },
  {
    question: "When will DOM be listed?",
    answer: "Status: Coming Soon. No exchange, venue, or listing date has been confirmed — announcements will come only through official Dungeon of Miners channels.",
  },
  {
    question: "Is DOM guaranteed to have a particular value?",
    answer: "No. Dungeon of Miners never guarantees a price, return, exchange venue, or liquidity outcome for DOM.",
  },
];

// ---------------------------------------------------------------------------
// Guild section stats
// ---------------------------------------------------------------------------
export const guildStats = [
  { label: "Max Members", value: String(guildConfig.maxMembers) },
  { label: "Booster Tiers", value: String(guildBoosterTiers.length) },
  { label: "Max Guild Booster", value: `+${guildConfig.maxBoostPercent}%` },
  { label: "Current Season", value: guildSeasons.current },
];

// ---------------------------------------------------------------------------
// Roadmap — qualitative phases, not fixed dates. Update `status` as each
// phase actually ships. No governance/staking/DAO/swap/NFT/launchpad items
// — none of those are approved features.
// ---------------------------------------------------------------------------
export type RoadmapStatus = "done" | "active" | "comingSoon" | "planned" | "future";

export const roadmap: { phase: string; title: string; status: RoadmapStatus; items: string[] }[] = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done",
    items: ["Website", "Mining engine", "Fixed Supply Economy", "BSC architecture", "Mining Storage", "Claim"],
  },
  {
    phase: "Phase 2",
    title: "Mining Network V2",
    status: "active",
    items: ["Six Halvings", "Global Emission", "Pickaxe Level 1–6", "Mining XP", "Storage progression", "Referral Booster V2"],
  },
  {
    phase: "Phase 3",
    title: "Social Mining",
    status: "active",
    items: ["Guild system", "Guild XP", "Guild Levels", "Guild Expeditions", "Guild Seasons", "Leaderboards"],
  },
  {
    phase: "Phase 4",
    title: "On-Chain Economy",
    status: "active",
    items: ["DOM BEP-20", "Supply verification", "BSC withdrawal", "Treasury transparency", "Vesting", "Explorer integration"],
  },
  {
    phase: "Phase 5",
    title: "Public Market Launch",
    status: "comingSoon",
    items: ["TGE / public market launch", "Liquidity", "Contract information", "Exchange listing announcements"],
  },
  {
    phase: "Phase 6",
    title: "Long-Term Dungeon",
    status: "future",
    items: ["Halving progression", "Advanced Guild content", "New activities", "Ecosystem expansion"],
  },
];

// ---------------------------------------------------------------------------
// BSC Transparency page data — never fabricate a contract address. Show
// "Coming Soon" until the contract is actually deployed and verified.
// ---------------------------------------------------------------------------
export const transparencyConfig = {
  network: NETWORK,
  token: siteConfig.ticker,
  standard: TOKEN_STANDARD,
  contractAddress: "Coming Soon",
  totalSupply,
  additionalMinting: "None",
  contractStatus: "Not Yet Deployed",
  explorerName: BLOCK_EXPLORER_NAME,
  explorerUrl: "Coming Soon",
};

// ---------------------------------------------------------------------------
// Treasury — one row per non-mining (and mining distribution) wallet. Never
// fabricate an address or balance; both stay honest placeholders until the
// team publishes real wallets.
// ---------------------------------------------------------------------------
export type TreasuryWallet = {
  id: string;
  label: string;
  purpose: string;
  allocation: string;
  address: string;
  balance: string;
  vesting: string;
  explorer: string;
};

export const treasuryWallets: TreasuryWallet[] = [
  {
    id: "mining",
    label: "Mining Distribution Wallet",
    purpose: "Source of all mining rewards released to players through the Global Emission System.",
    allocation: formatDOM(MINING_ALLOCATION),
    address: "Coming Soon",
    balance: "Awaiting Live Data",
    vesting: "Released via mining, paced by the Halving schedule",
    explorer: "Coming Soon",
  },
  {
    id: "liquidity",
    label: "Liquidity Wallet",
    purpose: "Reserved to support healthy DOM market liquidity at and after TGE.",
    allocation: formatDOM(LIQUIDITY_ALLOCATION),
    address: "Coming Soon",
    balance: "Awaiting Live Data",
    vesting: "Pending Final Approval",
    explorer: "Coming Soon",
  },
  {
    id: "team",
    label: "Team Wallet / Vesting Contract",
    purpose: "Long-term allocation for the core team.",
    allocation: formatDOM(TEAM_ALLOCATION),
    address: "Coming Soon",
    balance: "Awaiting Live Data",
    vesting: "Pending Final Approval",
    explorer: "Coming Soon",
  },
  {
    id: "treasure",
    label: "Treasure & Ecosystem Reserve",
    purpose: "Strategic reserve supporting rewards, campaigns, and long-term ecosystem requirements.",
    allocation: formatDOM(TREASURE_ALLOCATION),
    address: "Coming Soon",
    balance: "Awaiting Live Data",
    vesting: "Pending Final Approval",
    explorer: "Coming Soon",
  },
  {
    id: "ecosystem",
    label: "Ecosystem Wallet",
    purpose: "Product growth, guilds, partnerships, integrations, and ecosystem expansion.",
    allocation: formatDOM(ECOSYSTEM_ALLOCATION),
    address: "Coming Soon",
    balance: "Awaiting Live Data",
    vesting: "Pending Final Approval",
    explorer: "Coming Soon",
  },
  {
    id: "public",
    label: "Public / Strategic Wallet",
    purpose: "Reserved for public and strategic ecosystem opportunities.",
    allocation: formatDOM(PUBLIC_STRATEGIC_ALLOCATION),
    address: "Coming Soon",
    balance: "Awaiting Live Data",
    vesting: "Pending Final Approval",
    explorer: "Coming Soon",
  },
];

export const vestingConfig = {
  status: "Pending Final Approval",
  note: "The 45% non-mining supply (Liquidity, Team, Treasure & Reserve, Ecosystem, Public/Strategic) needs a published unlock schedule. No cliff, vesting curve, or release date has been approved yet — this page will be updated the moment one is finalized, and will never show an invented number before then.",
  covers: ["Team", "Ecosystem", "Public / Strategic", "Treasure & Reserve", "Liquidity (where relevant)"],
};

// ---------------------------------------------------------------------------
// DOM Ecosystem — cinematic storytelling section (between About and the
// Game/How-It-Works content). `nodes` positions are percentages against the
// Oracle.svg illustration, hand-measured from the artwork — the image is a
// single flattened illustration (no separate vector elements per node), so
// every interactive/animated effect is an overlay positioned on top of it,
// never a modification of the artwork itself.
// ---------------------------------------------------------------------------
export type EcosystemStatus = "LIVE" | "IN PROGRESS" | "PLANNED" | "COMING SOON";

export type EcosystemNode = {
  id: string;
  x: number; // percent, left
  y: number; // percent, top
  status: EcosystemStatus;
  narrative: { primary: string; secondary: string };
  tooltip: { title: string; text: string };
};

export const domEcosystem = {
  eyebrow: "The DOM Ecosystem",
  headline: ["One Token.", "One Living Economy."],
  headlineHighlight: 1, // index into headline[] to render in the gold accent
  paragraph:
    "DOM powers the entire Dungeon of Miners ecosystem. Every miner, upgrade, guild action, reward, and on-chain withdrawal connects back to one shared economy.",
  tagline: "Mine. Progress. Connect. Withdraw.",
  intro: {
    lineOne: "The dungeon is more than a mine.",
    lineTwo: "It is a live economy.",
  },
  core: {
    lineOne: "At its center is DOM.",
    lineTwo: "The resource that connects every path through the dungeon.",
  },
  finalScene: {
    lineOne: "Different paths.",
    lineTwo: "One shared economy.",
    lineThree: "Everything leads back to DOM.",
    tagline: "MINE • UPGRADE • CONNECT • WITHDRAW",
    cta: "Enter the Dungeon",
  },
  // Narrative sequence order.
  nodes: [
    {
      id: "miner",
      x: 50,
      y: 13.5,
      status: "LIVE",
      narrative: {
        primary: "Every journey begins with a miner.",
        secondary: "Mine DOM and progress your Pickaxe through six levels.",
      },
      tooltip: { title: "Miner", text: "Every journey through the dungeon begins here." },
    },
    {
      id: "mining",
      x: 27.5,
      y: 27,
      status: "LIVE",
      narrative: {
        primary: "Mine DOM through the live mining economy.",
        secondary: "Level up your Pickaxe and increase your mining weight before the next Halving.",
      },
      tooltip: { title: "Mining", text: "Extract DOM and improve your mining power." },
    },
    {
      id: "rewards",
      x: 25.5,
      y: 67,
      status: "LIVE",
      narrative: {
        primary: "Every action pushes your progress forward.",
        secondary: "Tasks, Mining XP, achievements, and activity shape your journey.",
      },
      tooltip: { title: "Progress", text: "Activity, Mining XP, and achievements move you forward." },
    },
    {
      id: "treasury",
      x: 17.5,
      y: 46,
      status: "LIVE",
      narrative: {
        primary: "Progress creates resources.",
        secondary: "The treasury supports ecosystem rewards and long-term development.",
      },
      tooltip: { title: "Treasury", text: "Supports ecosystem rewards and long-term development." },
    },
    {
      id: "community",
      x: 50,
      y: 77,
      status: "IN PROGRESS",
      narrative: {
        primary: "No one mines alone.",
        secondary: "Telegram communities form Guilds, complete expeditions, and progress together.",
      },
      tooltip: { title: "Guilds", text: "Coordinate miners and strengthen your expedition." },
    },
    {
      id: "expansion",
      x: 86,
      y: 46,
      status: "PLANNED",
      narrative: {
        primary: "Beyond mining comes growth.",
        secondary: "Long-term ecosystem utilities for the evolving DOM economy.",
      },
      tooltip: { title: "Expansion", text: "Long-term ecosystem utilities, expanded as they're approved." },
    },
    {
      id: "liquidity",
      x: 75,
      y: 67,
      status: "COMING SOON",
      narrative: {
        primary: "DOM supports its own market.",
        secondary: "Liquidity infrastructure that supports healthy DOM market activity at TGE.",
      },
      tooltip: { title: "Liquidity", text: "Supports DOM market liquidity." },
    },
    {
      id: "market",
      x: 74,
      y: 27,
      status: "COMING SOON",
      narrative: {
        primary: "From mining utility to an open token economy.",
        secondary: "Public market access after TGE.",
      },
      tooltip: { title: "Public Market", text: "Public market access once TGE is live." },
    },
  ] satisfies EcosystemNode[],
};
