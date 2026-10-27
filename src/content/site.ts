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
// Available DOM Balance, eligible for automated BSC withdrawal at
// zero fee to the miner.
//
// Progression is Pickaxe Level 1–6, unlocked by holding a minimum Available
// DOM Balance (Level 1 is free). There is no XP and no Equipment
// Multiplier. TGE (public market
// launch) and Exchange Listing are both status: TBA.
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
  HALVING_NOMINAL_DURATION_DAYS,
  EPOCH_DURATION_MINUTES,
  PICKAXE_POWER,
  PICKAXE_MIN_HOLD,
  STORAGE_CAPACITY,
  REFERRAL_REWARD_DOM,
  MAX_REWARDED_REFERRALS,
  QUEST_JOIN_CHANNEL_DOM,
  QUEST_FOLLOW_X_DOM,
  AD_WATCH_REWARD_DOM,
  AD_WATCH_DAILY_LIMIT,
  CHECKIN_MIN_DOM,
  CHECKIN_MAX_DOM,
  CHECKIN_BASE_DOM,
  CHECKIN_FIRST_WEEK_TOTAL,
  CHECKIN_FULL_WEEK_TOTAL,
  checkInReward,
  REFERRAL_BOOST_PER_ACTIVE_USER,
  MAX_REFERRAL_BOOST,
  MAX_QUALIFIED_REFERRALS,
  REFERRAL_ACTIVE_WINDOW_DAYS,
  REFERRAL_STARTER_BOOST_PERCENT,
  REFERRAL_STARTER_BOOST_HOURS,
  BOOST_CAP,
  MIN_WITHDRAWAL,
  WITHDRAWAL_COOLDOWN_HOURS,
  formatDOM,
  formatPercent,
} from "./economy.config";

export const siteConfig = {
  name: "Dungeon of Miners",
  ticker: "DOM",
  tagline: "Mine DOM. Upgrade Your Pickaxe. Survive the Halving.",
  taglineShort: "Mine DOM. Withdraw On-Chain. Survive the Halving.",
  description:
    "Dungeon of Miners is a mining ecosystem powered by a fixed supply of 1 billion DOM, six Halving eras, Pickaxe progression, and on-chain BSC withdrawals.",
  url: "https://dungeonofminers.com",
};

// Replace these with your real links.
export const contactEmail = "official@dungeonofminers.xyz";

// Team — real people behind the game. Each entry: name, role, a short Web3
// background, a profile photo (in /public/assets/team/), and an optional
// LinkedIn or X link.
export const teamMembers: {
  name: string;
  role: string;
  image: string;
  bio: string;
  link?: string;
}[] = [
  {
    name: "Georgie Zec",
    role: "Founder",
    image: "/assets/team/georgie-zec.png",
    bio: "Product founder of Dungeon of Miners. Background in token economies, Web3 product strategy, and community-driven growth.",
  },
  {
    name: "Jeff",
    role: "CTO",
    image: "/assets/team/jeff.png",
    bio: "Technical lead behind the mining engine and on-chain infrastructure. Experienced in smart contracts, backend systems, and secure on-chain payout architecture.",
  },
  {
    name: "Aliana Angel",
    role: "Marketing",
    image: "/assets/team/aliana-angel.png",
    bio: "Leads marketing and community. Skilled in Web3 growth, community building, and campaign strategy across crypto-native audiences.",
  },
  {
    name: "Nichi",
    role: "Finance",
    image: "/assets/team/nichi.png",
    bio: "Heads finance and treasury. Background in DeFi, tokenomics modeling, and sustainable treasury management.",
  },
];

export const links = {
  miniApp: "https://t.me/DungeonOfMinersBot",
  telegramCommunity: "https://t.me/DungeonOfMiners",
  telegramChannel: "https://t.me/DungeonOfMinersAnnouncements",
  twitter: "https://x.com/DungeonOfMiners",
};

// ---------------------------------------------------------------------------
// Announcement bar — a slim, always-on banner shown above the navbar.
// Set `visible` to false to hide it site-wide.
// ---------------------------------------------------------------------------
export const announcementBar = {
  text: "DOM Mining Is Live",
  visible: true,
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
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Referral Program", href: "/referral" },
      { label: "Announcements", href: links.telegramChannel, external: true },
    ],
  },
  {
    label: "Docs",
    items: [
      { label: "Documentation", href: "/docs" },
      { label: "About", href: "/about" },
      { label: "Transparency", href: "/transparency" },
      { label: "FAQ", href: "/faq" },
      { label: "Fair Play", href: "/fair-play" },
      { label: "Risk Disclosure", href: "/risk-disclosure" },
    ],
  },
];

export const navTopLevel: NavItem = { label: "Roadmap", href: "/roadmap" };
export const navTopRight: NavItem = { label: "Staking", href: "/staking", comingSoon: true };

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
  bnbLogo: "/assets/bnb-logo.png",
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
      "Hold more Available DOM to unlock higher Pickaxe levels (Level 1 is free, Level 6 needs 50,000 DOM). Each level raises your Base Mining Power and Storage Capacity.",
  },
  {
    step: "05",
    title: "Boost Your Mining Weight",
    description:
      "Planned Referral Boosters will stack on top of your Base Mining Power — capped, so no one multiplier explodes. 0% during the launch phase.",
  },
  {
    step: "06",
    title: "Withdraw On-Chain",
    description:
      "Paste your BEP-20 wallet address and withdraw eligible Available Balance on BNB Smart Chain — zero withdrawal fee, network fee sponsored. Withdrawals are processed automatically in order, usually within minutes.",
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
    nominalDuration: `${HALVING_NOMINAL_DURATION_DAYS[i]} days`,
    status: (number === CURRENT_HALVING ? "CURRENT" : number < CURRENT_HALVING ? "LOCKED" : number === CURRENT_HALVING + 1 ? "UPCOMING" : "LOCKED") as HalvingStatus,
    // Real-time figures — never fabricated. Populated once the backend
    // surfaces them; the UI shows "Awaiting Live Data" until then.
    distributed: "—",
    remaining: "—",
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
export type MiningStatus = "LIVE" | "MAINTENANCE" | "COMING SOON";
export type LaunchStatus = "LIVE" | "TBA";

export const economyConfig = {
  miningStatus: "LIVE" as MiningStatus,
  withdrawalStatus: "LIVE" as LaunchStatus,
  tgeStatus: "TBA" as LaunchStatus,
  exchangeListingStatus: "TBA" as LaunchStatus,
  currentHalving: CURRENT_HALVING,
  network: `${NETWORK} (${TOKEN_STANDARD})`,
  walletConnector: "any BEP-20 address (pasted)",
  mintingStatus: "Disabled — No Additional Minting",
  economyVersion: "v4",
  economyLastUpdated: "2026-10-12",
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
// Multi-sig (Safe) treasury wallets — real, published BNB Smart Chain
// addresses. Every allocation below is held in a multi-signature Safe wallet.
// ---------------------------------------------------------------------------
export const SAFE_WALLETS = {
  mining: "0xC1F93ADc7e00a8117943fAFdACdD520d6e6434D9",
  liquidity: "0x2036c4Dd6Be3e713c282AEe3538e2f01d53decF3",
  ecosystem: "0x10ADfD32f15778a9F2CA09662e34074D79F3C62B",
  public: "0xf95aB72E4a1EEDcF6d23Df1EF75402D3e71A9192",
  treasury: "0x5ad3D39d9875E329595b3432ab3e723426E1b68A",
  team: "0xdB275039d182e5F715F369ED1Ae7211193aD02D9",
} as const;

export function safeWalletUrl(address: string): string {
  return `https://app.safe.global/home?safe=bnb:${address}`;
}

export function safeWalletExplorerUrl(address: string): string {
  return `${BLOCK_EXPLORER_URL}/address/${address}`;
}

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
    description: "The largest allocation belongs to miners.",
    safeAddress: SAFE_WALLETS.mining,
  },
  {
    id: "liquidity",
    label: "Liquidity",
    percent: Math.round((LIQUIDITY_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(LIQUIDITY_ALLOCATION),
    color: "#D98A1E", // amber
    description: "Reserved to support healthy DOM market liquidity.",
    safeAddress: SAFE_WALLETS.liquidity,
  },
  {
    id: "team",
    label: "Team",
    percent: Math.round((TEAM_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(TEAM_ALLOCATION),
    color: "#8a5a3c", // bronze
    description: "Long-term allocation for the core team.",
    safeAddress: SAFE_WALLETS.team,
  },
  {
    id: "treasury",
    label: "Treasure & Ecosystem Reserve",
    percent: Math.round((TREASURE_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(TREASURE_ALLOCATION),
    color: "#B8860B", // deep gold
    description: "Strategic reserve supporting rewards, campaigns, and long-term ecosystem requirements.",
    safeAddress: SAFE_WALLETS.treasury,
  },
  {
    id: "ecosystem",
    label: "Staking Reward",
    percent: Math.round((ECOSYSTEM_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(ECOSYSTEM_ALLOCATION),
    color: "#FF8A2A", // warm orange
    description: "Reserved for staking rewards to incentivize holding DOM.",
    safeAddress: SAFE_WALLETS.ecosystem,
  },
  {
    id: "public",
    label: "Public / Strategic",
    percent: Math.round((PUBLIC_STRATEGIC_ALLOCATION / TOTAL_SUPPLY) * 100),
    amount: formatDOM(PUBLIC_STRATEGIC_ALLOCATION),
    color: "#a9825a", // muted copper
    description: "Reserved for public and strategic ecosystem opportunities.",
    safeAddress: SAFE_WALLETS.public,
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
// Mining activities — ways to build progression alongside idle mining.
// Rewards are DOM/boosters first — DOM only where it comes from a defined,
// capped budget.
// ---------------------------------------------------------------------------
export const miningActivities: { icon: string; title: string; description: string; reward: string; comingSoon?: boolean }[] = [
  {
    icon: "user",
    title: "Miner Profile",
    description: "Set up your profile and start tracking your mining progress.",
    reward: "Profile Setup",
    comingSoon: true,
  },
  {
    icon: "shield",
    title: "Delver Badges",
    description: "Earn permanent badges tied to milestones and Halving eras.",
    reward: "Badge",
    comingSoon: true,
  },
  {
    icon: "calendar-check",
    title: "Daily Check-In",
    description: "Stay active every day to keep your streak and bonuses going.",
    reward: `${CHECKIN_MIN_DOM}–${CHECKIN_MAX_DOM} DOM (streak)`,
  },
  {
    icon: "user-plus",
    title: "Referrals",
    description: "Invite friends. Once they join the official Telegram channel and claim their first mining session, you earn DOM.",
    reward: `${REFERRAL_REWARD_DOM} DOM per friend`,
  },
  {
    icon: "send",
    title: "Join Telegram Channel",
    description: "Join the official channel and tap Verify — the bot confirms your membership.",
    reward: `${QUEST_JOIN_CHANNEL_DOM} DOM (one-time)`,
  },
  {
    icon: "at-sign",
    title: "Follow on X",
    description: "Connect your X account, follow the official profile, and claim.",
    reward: `${QUEST_FOLLOW_X_DOM} DOM (one-time)`,
  },
  {
    icon: "play-circle",
    title: "Watch an Ad",
    description: `Up to ${AD_WATCH_DAILY_LIMIT} ads per day, each paying ${AD_WATCH_REWARD_DOM} DOM.`,
    reward: `${AD_WATCH_REWARD_DOM} DOM per ad`,
  },
  {
    icon: "list-checks",
    title: "Daily Tasks",
    description: "Complete community missions and objectives for steady progression.",
    reward: "Task rewards",
    comingSoon: true,
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
    "× (1 + Referral Booster + Temporary Booster)",
  ],
  example: {
    label: "Effective Mining Weight Example",
    rows: [
      { label: "Pickaxe Base Mining Power (Level 3)", value: String(PICKAXE_POWER[2]) },
      { label: "Referral Booster (launch phase)", value: "0%" },
    ],
    final: { label: "Effective Mining Weight", value: String(PICKAXE_POWER[2]) },
    note: "The Referral Booster is 0% during the launch phase, so Effective Mining Weight equals Base Mining Power. The chain above shows how it will stack once enabled.",
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
  epochDurationLabel: `${EPOCH_DURATION_MINUTES}-minute epochs (6 per hour)`,
  formulas: [
    "epoch_budget = era_allocation ÷ epochs_in_era",
    "per_weight   = epoch_budget ÷ max(total_power, 200,000)",
    "your_reward  = your_power × per_weight   (per epoch)",
    "mining_rate  = your_power × per_weight × 6",
  ],
  symbols: [
    { symbol: "era_allocation", meaning: "91,666,667 DOM for every era (91,666,665 for era 6)" },
    { symbol: "epochs_in_era", meaning: "nominal era duration in days × 144 (a 10-minute epoch = 144 per day)" },
    { symbol: "total_power", meaning: "sum of mining power of all active miners" },
    { symbol: "your_power", meaning: "your pickaxe's mining power (100–300)" },
  ],
  floorNote:
    "The 200,000 floor (equal to 2,000 Novice miners) prevents the very first miners from taking an entire epoch's budget alone.",
  precisionNote:
    "All amounts are computed as integer µDOM (1 DOM = 1,000,000 µDOM) and never rounded up — the game never shows more DOM than actually exists.",
  note: "More miners lower the rate (per_weight is shared by everyone), and each new era halves it. What never changes: Legend (300) always mines exactly 3× Novice (100) at the same moment.",
};

export const boostRules = [
  { label: "Referral Booster", value: `0% during the launch phase (referrals pay DOM instead). Planned: +${REFERRAL_BOOST_PER_ACTIVE_USER}% per active qualified referral, up to +${MAX_REFERRAL_BOOST}%` },
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
  fullStateNote: "Claim DOM to resume mining. Mining pauses when storage is full, or after 8 hours — whichever comes first. Earned DOM is never deleted.",
};

export const claimRules = {
  minimumClaim: "1 DOM",
  claimCooldown: "TBA",
  maximumClaim: "TBA",
  note: "100% of every claimed amount becomes Available DOM Balance immediately — there is no wallet split.",
};

// ---------------------------------------------------------------------------
// Balance & withdrawal flow — replaces the retired Holding Wallet / Pool
// Wallet / 70:30 split entirely. Mining Storage is server-authoritative
// mining state, not an external wallet; only the withdrawal-address step
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
      description: "Request withdrawal of eligible Available Balance to the BEP-20 address you enter.",
    },
    {
      label: "Your Withdrawal Address",
      description: "Your external BEP-20 wallet on BNB Smart Chain — the BEP-20 address you enter when withdrawing.",
    },
  ],
  accountingStates: ["miningStorage", "availableBalance", "pendingWithdrawal", "withdrawnBalance"],
  integrityNote:
    "Withdrawal validation always happens server-side with atomic database transactions and idempotency keys — the frontend only displays state, it never owns it. One reward can never be claimed or withdrawn twice.",
};

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

// Global Halving Ledger is now a live read (see LiveHalvingLedger.tsx), not a
// hand-edited list here. Static economy facts remain in halvingRecord below.
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
  trigger: string;
};
export const halvingArchive: HalvingArchiveEntry[] = [];

// ---------------------------------------------------------------------------
// Live backend — the Telegram Mini App's public, read-only API. `/v1/floor`
// and `/v1/economy` are public (no auth) and expose the real network totals
// (totalMinted, activeMiners, halving progress). The site reads them through
// its own `/api/live` route so the browser never talks cross-origin.
// ---------------------------------------------------------------------------
export const liveApiBaseUrl = "https://app.dungeonofminers.xyz";

// ---------------------------------------------------------------------------
// Live Economy Dashboard — now a live read (see LiveEconomyDashboard.tsx) via
// /api/live; no longer hand-edited here. Never fabricate a statistic.
// ---------------------------------------------------------------------------

// Recent on-chain withdrawals are now read live from the backend via /api/live
// (see RecentWithdrawals.tsx) — no longer a hand-edited list here.

// Public changelog visibility. While false, the /changelog route, its nav and
// footer link, the docs "Version History" page, and the version-history list
// on the home-page ledger are all hidden. The data below is kept; to bring it
// back, flip this flag and re-add the "Changelog" link to the Docs nav group
// (navGroups) in this file.
export const SHOW_PUBLIC_CHANGELOG = false;

export const economyChangelog = [
  {
    version: "v4.2",
    date: economyConfig.economyLastUpdated,
    summary:
      "Launch-phase rewards: referrals temporarily pay DOM instead of a mining-weight booster, Earn quests and a streak-based Daily Check-In are documented, and the minimum withdrawal is set to 250 DOM.",
    changes: [
      `Referral Program (temporary): ${REFERRAL_REWARD_DOM} DOM per friend who joins the official Telegram channel and verifies, up to ${MAX_REWARDED_REFERRALS} friends. Referral Booster V2 is paused (0%) and kept as the planned replacement.`,
      `Earn quests: Join Telegram Channel = ${QUEST_JOIN_CHANNEL_DOM} DOM, Follow on X = ${QUEST_FOLLOW_X_DOM} DOM (both one-time).`,
      `Daily Check-In: streak rewards from ${CHECKIN_MIN_DOM} to ${CHECKIN_MAX_DOM} DOM per day; a missed day resets the streak.`,
      `Watch an Ad: up to ${AD_WATCH_DAILY_LIMIT} per day, each paying ${AD_WATCH_REWARD_DOM} DOM.`,
      `Minimum withdrawal set to ${typeof MIN_WITHDRAWAL === "number" ? formatDOM(MIN_WITHDRAWAL) : "TBA"} on the combined balance; no maximum for now; network fee paid by the team.`,
      "Referral Booster is 0% during the launch phase.",
    ],
  },
  {
    version: "v4.1",
    date: economyConfig.economyLastUpdated,
    summary:
      "Pickaxe update: Mining XP is removed and each Pickaxe Level is now unlocked solely by a minimum Available DOM Balance in the game (Level 1 free, then +10,000 DOM per level up to 50,000 DOM for Level 6), and Base Mining Power was retuned to a 3.0x spread (100 → 300).",
    changes: [
      "Added a minimum Available DOM Balance (in-game, claimed DOM) to use each Pickaxe: Level 1 = 0 (free), Level 2 = 10,000, Level 3 = 20,000, Level 4 = 30,000, Level 5 = 40,000, Level 6 = 50,000 DOM.",
      "Removed Mining XP entirely: the minimum Available DOM Balance is now the only requirement to unlock a Pickaxe level.",
      "Retuned Pickaxe Base Mining Power from 100 → 450 (4.5x) to 100 → 300 (3.0x) so higher-holding miners do not snowball.",
    ],
  },
  {
    version: "v4.0",
    date: "2026-09-17",
    summary:
      "HISTORICAL / RETIRED — superseded by v4.1. DOM Mining Ecosystem Update: confirmed BNB Smart Chain (BEP-20) as the permanent network, introduced a centralized economy configuration, rebalanced Pickaxe Base Mining Power to a 4.5x (not 100x) spread, added Mining XP as the progression currency, and deepened Guild V2 with Guild XP, Levels, Expeditions, and Seasons.",
    changes: [
      "Confirmed BNB Smart Chain (BEP-20) as the final network — DOM does not use TON.",
      "Centralized every economy number in economy.config.ts — no more independently hardcoded values.",
      "Rebalanced Pickaxe Base Mining Power from a 100x (10 → 1000) spread to a 4.5x (100 → 450) spread.",
      "Introduced Mining XP as the main progression currency, separate from DOM, earned from activity rather than holdings (using a Pickaxe additionally requires a minimum DOM holding).",
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
  walletConnector: "any BEP-20 address (pasted)",
  chainId: `${CHAIN_ID} (${NETWORK} Mainnet)`,
  domContractAddress: "0xB33A511B88b6691bE265DdBCD0c8dbE6A4fCf515",
  blockExplorerUrl: `${BLOCK_EXPLORER_NAME} (${BLOCK_EXPLORER_URL.replace("https://", "")})`,
  statuses: ["Processing", "Broadcasted", "Confirming", "Confirmed", "Failed"] as const,
  minimumWithdrawal: typeof MIN_WITHDRAWAL === "number" ? formatDOM(MIN_WITHDRAWAL) : "TBA",
  minimumNote: "Counted against your combined balance — mined DOM plus every reward you have earned.",
  maximumWithdrawal: "Daily limit grows with your Pickaxe Level — 1,000 / 2,000 / 3,000 / 5,000 / 8,000 / 12,000 DOM (Novice → Legend). A new withdrawal address is limited to 500 DOM in its first 24 hours.",
  withdrawalCooldown: typeof WITHDRAWAL_COOLDOWN_HOURS === "number" ? `${WITHDRAWAL_COOLDOWN_HOURS} hours` : "TBA",
  instantNote:
    "Withdrawals are processed automatically in order, usually within minutes — there is no manual approval queue. BNB Smart Chain itself still needs real confirmations: status only reaches Confirmed after the network confirms the transaction, never immediately after sending it.",
  unlockNote:
    "Withdrawals unlock after you claim mined DOM on 3 different UTC days. Requests are processed automatically in order, usually within minutes.",
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
  "Pickaxe Level",
  "Referral status",
  "Referral Booster",
  "Global emission accounting",
  "Halving progression",
  "Claim",
  "Withdrawal",
];

export const riskDisclosure =
  "Dungeon of Miners is a mining ecosystem on BNB Smart Chain. Mining or holding DOM does not guarantee financial value, profit, or return. Digital assets can be volatile, and participation carries smart contract risk, wallet risk, blockchain and network risk, technical failure, network congestion, market volatility, liquidity risk, and the possibility of ecosystem changes. DOM's TGE (public market launch) and Exchange Listing are both status: TBA — no date, exchange venue, opening price, market cap, or liquidity amount has been announced, and none should be assumed until officially confirmed through Dungeon of Miners' own channels. Dungeon of Miners does not promise financial return, profit, price appreciation, exchange listing, or guaranteed liquidity. Users should independently evaluate the risks of holding or using blockchain assets.";

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
    "Referral booster reversal",
    "Leaderboard removal",
    "Mining suspension",
    "Withdrawal security review",
    "Account restriction",
    "Account ban",
  ],
};

// Guilds are planned but not yet shipped — they live only in the Roadmap, not
// as an active feature or in the docs. Kept out of the feature list and menu
// per the BscScan review.

// ---------------------------------------------------------------------------
// Launch-phase Referral Program (ACTIVE, temporary) — source: DOM-Marketing-v2.
// For now referrals pay a flat DOM reward instead of a mining-weight booster.
// One level only (no downline). The reward is paid from the treasury.
// Referral Booster V2 below is the planned replacement.
// ---------------------------------------------------------------------------
export const referralProgram = {
  rewardDom: REFERRAL_REWARD_DOM,
  maxFriends: MAX_REWARDED_REFERRALS,
  maxTotalDom: REFERRAL_REWARD_DOM * MAX_REWARDED_REFERRALS,
  communityMessage: `Invite a friend — once they join our Telegram channel and claim their first mining session, you get ${REFERRAL_REWARD_DOM} DOM. Up to ${MAX_REWARDED_REFERRALS} friends.`,
  friendStatuses: ["Pending", "Qualified"],
  rules: [
    "Your inviter is recorded once, when a friend's account is first created. An account that has already played cannot be invited later.",
    "A referral becomes valid only after your friend joins the official Telegram channel and claims their first mining session. This is the only requirement.",
    `You earn ${REFERRAL_REWARD_DOM} DOM per valid friend, up to ${MAX_REWARDED_REFERRALS} friends (${formatDOM(REFERRAL_REWARD_DOM * MAX_REWARDED_REFERRALS)} maximum).`,
    "If a friend leaves the channel after the referral is valid, the reward is not taken back.",
    "You cannot invite yourself. A banned inviter does not receive DOM.",
  ],
  yourView: [
    "A personal invite link with Copy and Share buttons",
    "How many friends you invited and how many are valid",
    "Your friend list with each status: Pending or Qualified",
  ],
  note: "Referral rewards are paid in DOM from the treasury.",
};

// What a miner sees on the Referral tab — real numbers are per-account and
// need a live backend, so they are "Awaiting Live Data" until then.
export const referralProgramDashboardShape = [
  { label: "Friends Invited", value: "—" },
  { label: "Qualified Friends", value: "—" },
  { label: "DOM Earned", value: "—" },
  { label: "Friend Limit", value: `${MAX_REWARDED_REFERRALS}` },
];

// ---------------------------------------------------------------------------
// Launch-phase Earn quests, Daily Check-In, ads, and bot messages — source:
// DOM-Marketing-v2. Amounts come from economy.config.ts; the backend can
// change them via config, so treat them as the current published rule.
// ---------------------------------------------------------------------------
export const earnQuests = [
  {
    title: "Join our Telegram channel",
    reward: `${QUEST_JOIN_CHANNEL_DOM} DOM`,
    rules: [
      "Tap Open to visit the official channel, join it, then tap Verify. The bot asks Telegram directly whether your account is a member.",
      "If you have not joined yet you will see \"Join the channel first, then tap Verify.\"",
      `${QUEST_JOIN_CHANNEL_DOM} DOM once per account. Leaving the channel afterwards does not take the DOM back.`,
      "Completing this quest is also what makes a friend's referral valid.",
    ],
  },
  {
    title: "Follow us on X",
    reward: `${QUEST_FOLLOW_X_DOM} DOM`,
    rules: [
      "Three steps: Connect X (log in and authorize the app), Open (visit the official profile and follow), then Claim.",
      "Following is not checked through the X API — it is honor-based. What is checked is that the X account really belongs to you, via X login.",
      "One X account can be linked to one game account, permanently.",
      "Your X token is not stored. The app only asks for read permission — it cannot post or follow on your behalf.",
    ],
  },
];

export const dailyCheckIn = {
  summary: `Once per UTC day. The reward climbs with consecutive days: ${CHECKIN_MIN_DOM} DOM on day 1 up to ${CHECKIN_MAX_DOM} DOM on bonus days.`,
  streakTable: [
    { day: "Day 1", dom: checkInReward(1) },
    { day: "Day 2", dom: checkInReward(2) },
    { day: "Day 3", dom: checkInReward(3) },
    { day: "Day 4", dom: checkInReward(4) },
    { day: "Day 5", dom: checkInReward(5) },
    { day: "Day 6", dom: checkInReward(6) },
    { day: "Day 7", dom: checkInReward(7) },
    { day: "Days 8–13", dom: checkInReward(8) },
    { day: "Day 14", dom: checkInReward(14) },
    { day: "Days 15–20", dom: checkInReward(15) },
    { day: "Day 21", dom: checkInReward(21) },
  ],
  rules: [
    `Day 7 and every multiple of 7 (14, 21, 28 …) pay ${CHECKIN_BASE_DOM} + 25 bonus = ${CHECKIN_MAX_DOM} DOM.`,
    `After day 7, regular days pay ${CHECKIN_BASE_DOM} DOM.`,
    `Missing a single day resets your streak to day 1 (${CHECKIN_MIN_DOM} DOM).`,
    `Totals: ${CHECKIN_FIRST_WEEK_TOTAL} DOM in the first week, then ${CHECKIN_FULL_WEEK_TOTAL} DOM per week while the streak stays unbroken.`,
  ],
};

export const adRewards = {
  summary: `Watch an ad to earn ${AD_WATCH_REWARD_DOM} DOM, up to ${AD_WATCH_DAILY_LIMIT} times per day.`,
};

export const botMessages = {
  dailyReport: {
    time: "12:00 UTC (19:00 WIB)",
    contents: [
      "Era progress — what percent of the era's allocation has been released",
      "Number of active miners",
      "Estimated DOM per hour for a Level 1 pickaxe",
      "Total number of players",
      "A Play button that opens the game",
    ],
    note: "Only network-wide totals are posted — never any individual player's data.",
  },
  storageFull: "When your Mining Storage is full, the bot sends a reminder with a Claim DOM button that takes you back to the game.",
  honestyNote:
    "Your mining result per person goes down as more players join, because each epoch's DOM is split across all active miners. That is how the model works. Do not treat mainnet withdrawal as guaranteed until the team announces it officially.",
};

// ---------------------------------------------------------------------------
// Referral Booster V2 (PLANNED — not active in the launch phase). Replaces
// the retired +2%/50-referral/+100%/+50 DOM model once enabled. Capped, ONE
// LEVEL ONLY (no downline/MLM tree), and tied to ACTIVE qualified referrals
// so it can never create unbounded emission or reward dead/farmed accounts.
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
  { label: "Invited", value: "—" },
  { label: "Qualified", value: "—" },
  { label: "Active", value: "—" },
  { label: "Current Booster", value: "—" },
  { label: "Maximum Booster", value: `+${referralBooster.maxBoostPercent}%` },
];

// ---------------------------------------------------------------------------
// Pickaxe Levels — the PRIMARY progression system, replacing the retired
// Rank System. There is no XP: a level is unlocked solely by holding its
// minimum Available DOM Balance (Level 1 is free, then +10,000 DOM per
// level), measured against the in-game Available DOM Balance — so
// withdrawing below that minimum pauses access to that pickaxe until the
// balance is restored. Cosmetic names (Novice → Legend) are secondary
// flavor only. Base Mining Power is deliberately kept within a ~3x range
// (not the old 100x spread) so no single level dominates the economy.
// ---------------------------------------------------------------------------
export type PickaxeLevel = {
  level: number;
  cosmeticName: string;
  basePower: number;
  minHold: number;
  minHoldLabel: string;
  storageCapacity: string;
  image: string;
  accent: string;
  unlocks: string[];
  domPerHour: string;
  domPerEpoch: string;
  domPerEpochMicro: string;
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
  ["Delver Badge: Silver", "Profile badge"],
  ["Delver Badge: Gold", "Profile prestige frame"],
  ["Delver Badge: Diamond", "Priority Stone Breaker rewards"],
  ["Delver Badge: Legend", "Maximum Storage Capacity", "Legend profile effects"],
];

const PICKAXE_DOM_PER_HOUR = ["31.83", "41.38", "52.52", "65.25", "79.57", "95.48"];
const PICKAXE_DOM_PER_EPOCH = ["5.30", "6.90", "8.75", "10.87", "13.26", "15.91"];
const PICKAXE_DOM_PER_EPOCH_MICRO = ["5,304,700", "6,896,110", "8,752,755", "10,874,635", "13,261,750", "15,914,100"];

export const pickaxeLevels: PickaxeLevel[] = PICKAXE_POWER.map((power, i) => ({
  level: i + 1,
  cosmeticName: PICKAXE_COSMETIC_NAMES[i],
  basePower: power,
  minHold: PICKAXE_MIN_HOLD[i],
  minHoldLabel: PICKAXE_MIN_HOLD[i] === 0 ? "Free — no DOM required" : formatDOM(PICKAXE_MIN_HOLD[i]),
  storageCapacity: formatDOM(STORAGE_CAPACITY[i]),
  image: PICKAXE_IMAGES[i],
  accent: PICKAXE_ACCENTS[i],
  unlocks: PICKAXE_UNLOCKS[i],
  domPerHour: `±${PICKAXE_DOM_PER_HOUR[i]}`,
  domPerEpoch: PICKAXE_DOM_PER_EPOCH[i],
  domPerEpochMicro: PICKAXE_DOM_PER_EPOCH_MICRO[i],
}));

export const pickaxeMiningRateNote =
  "Reference figures for Era 1 at minimum network weight (200,000): epoch budget ≈ 10,609.57 DOM, per weight ≈ 53.047 µDOM. Per epoch: power × 53.047 µDOM; per hour: × 6 (6 epochs/hour). Rates are estimates and scale with live network mining weight.";

// ---------------------------------------------------------------------------
// Leaderboards — ranked by verified activity (DOM mined, active days, and
// season points). A single Player board spans multiple timeframes.
// ---------------------------------------------------------------------------
export const leaderboardConfig = {
  playerTabs: ["Daily", "Weekly", "Halving", "All-Time"],
  playerMetrics: ["DOM Mined", "Pickaxe Level", "Active Days", "Season Points"],
  rewardPhilosophy: "Leaderboard rewards favor badges, cosmetics, and titles over large direct DOM payouts, so ranking well never distorts the capped emission model.",
};

// ---------------------------------------------------------------------------
// Features — organized by system group. Only real/current/planned systems.
// ---------------------------------------------------------------------------
export type FeatureItem = { title: string; description: string; icon: string; comingSoon?: boolean };
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
      { title: "Pickaxe Level 1–6", description: "Hold more Available DOM to unlock higher pickaxes — Level 1 is free, Level 6 needs 50,000 DOM.", icon: "hammer" },
    ],
  },
  {
    group: "Blockchain",
    items: [
      { title: "BNB Smart Chain", description: "DOM is issued and distributed on BNB Smart Chain.", icon: "link" },
      { title: "BEP-20 DOM", description: "A standard BEP-20 token — compatible with the BSC wallet ecosystem.", icon: "coins" },
      { title: "Wallet Address", description: "Paste any BEP-20 address; double-check it, on-chain transfers can't be reversed.", icon: "wallet" },
      { title: "Available DOM Balance", description: "The spendable, withdrawal-eligible balance created the moment you claim.", icon: "coins" },
      { title: "BSC Withdrawal", description: "Automated backend validation and broadcast, processed in order — no manual approval. Unlocks after you claim mined DOM on 3 different days.", icon: "send" },
      { title: "Transaction Status", description: "Processing, Broadcasted, Confirming, Confirmed, or Failed — always shown honestly.", icon: "activity" },
      { title: "BscScan Verification", description: "Every confirmed withdrawal is verifiable on a public block explorer.", icon: "search" },
    ],
  },
  {
    group: "Referrals",
    items: [
      { title: "Referral Rewards", description: `${REFERRAL_REWARD_DOM} DOM for every friend you invite who joins the official Telegram channel and claims their first mining session, up to ${MAX_REWARDED_REFERRALS} friends.`, icon: "user-plus" },
      { title: "Referral Booster (Planned)", description: `A capped mining-weight boost, currently 0% and planned to replace DOM referral rewards later.`, icon: "shield" },
    ],
  },
  {
    group: "Engagement",
    items: [
      { title: "Daily Check-In", description: `${CHECKIN_MIN_DOM}–${CHECKIN_MAX_DOM} DOM per day, rising with your streak.`, icon: "calendar-check" },
      { title: "Daily Tasks", description: "Community missions and objectives for steady progression.", icon: "check-circle", comingSoon: true },
      { title: "Stone Breaker", description: "A quick timing mini-game rewarding boosters and cosmetics.", icon: "gem", comingSoon: true },
      { title: "Achievements", description: "Permanent milestones tracked across your entire mining history.", icon: "shield", comingSoon: true },
      { title: "Miner Card", description: "Share your miner profile and progress with your community.", icon: "share-2", comingSoon: true },
      { title: "Temporary Boosters", description: "Short-duration, capped mining-weight boosts from events and activities.", icon: "zap", comingSoon: true },
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
    ],
  },
  {
    group: "Upcoming",
    items: [
      { title: "TGE / Public Market Launch", description: "Status: TBA.", icon: "rocket" },
      { title: "Exchange Listing", description: "Announced only through official Dungeon of Miners channels — status: TBA.", icon: "trending-up" },
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
      "Dungeon of Miners is a mining ecosystem. You mine DOM passively, unlock higher Pickaxe levels by holding DOM, and progress through six Halving eras alongside a global community of miners.",
  },
  {
    question: "What blockchain does DOM use?",
    answer: "BNB Smart Chain. DOM is a BEP-20 token, compatible with the standard BSC wallet ecosystem (MetaMask, Trust Wallet, and other BEP-20 wallets).",
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
      "Mining is idle and server-authoritative. Your Pickaxe Level sets your Base Mining Power, optionally boosted by a capped Referral Booster (0% during the launch phase) into an Effective Mining Weight. Each mining epoch, you receive a share of that epoch's budget proportional to your weight — never an unlimited per-user rate.",
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
    question: "What are Pickaxe Levels?",
    answer:
      "Pickaxe Level 1–6 is the primary mining progression system, replacing the old Rank System. You unlock each level by keeping a minimum Available DOM Balance in the game (there is no XP): Level 1 is free (0 DOM), then Level 2 = 10,000, Level 3 = 20,000, Level 4 = 30,000, Level 5 = 40,000, and Level 6 = 50,000 DOM. If your balance drops below a level's minimum, that pickaxe pauses until you hold enough again. Optional cosmetic names (Novice → Legend) map to each level.",
  },
  {
    question: "How much DOM do I need to hold to use a Pickaxe?",
    answer: "Level 1 is free — no DOM needed. The requirement is measured against your Available DOM Balance in the game (DOM you've claimed — not unclaimed Mining Storage, and not a wallet address you've entered). Level 2 requires 10,000 DOM, Level 3 requires 20,000, Level 4 requires 30,000, Level 5 requires 40,000, and Level 6 requires 50,000 DOM. If your Available DOM Balance drops below a level's minimum (for example after a withdrawal), that pickaxe is paused until you hold enough again.",
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
      "Paste your BEP-20 wallet address, enter an amount, and confirm. The backend validates your Available Balance server-side and automatically broadcasts the transaction on BNB Smart Chain — no manual approval queue. You'll see a real transaction hash, a BscScan link, and a status of Processing, Broadcasted, Confirming, Confirmed, or Failed.",
  },
  {
    question: "What wallet can I use?",
    answer: "Any BEP-20 wallet on BNB Smart Chain (MetaMask, Trust Wallet, etc.) — just paste its address.",
  },
  {
    question: "Does Dungeon of Miners request a seed phrase?",
    answer: "No. Dungeon of Miners never asks for your seed phrase, private key, or recovery phrase — for any reason.",
  },
  {
    question: "What does zero withdrawal fee mean?",
    answer:
      "Dungeon of Miners charges you 0 DOM to withdraw. This describes the fee the miner pays, not the blockchain itself — BNB Smart Chain still has a real transaction cost, which the ecosystem sponsors on your behalf.",
  },
  {
    question: "What is the minimum withdrawal?",
    answer: `${withdrawalConfig.minimumWithdrawal}, counted against your combined balance (mined DOM plus all rewards). Withdrawals have a daily limit that grows with your Pickaxe Level (from 1,000 DOM at Novice up to 12,000 DOM at Legend), and a new withdrawal address is limited to 500 DOM in its first 24 hours. The network fee is paid by the team, not by you.`,
  },
  {
    question: "How does the referral program work?",
    answer: `For now, referrals pay DOM: you earn ${REFERRAL_REWARD_DOM} DOM for every friend who joins the official Telegram channel and claims their first mining session, for up to ${MAX_REWARDED_REFERRALS} friends (${formatDOM(REFERRAL_REWARD_DOM * MAX_REWARDED_REFERRALS)} maximum). It's one level only — there is no downline or multi-level reward tree. The mining-weight Referral Booster is paused (0%) and planned for later.`,
  },
  {
    question: "What is a valid referral?",
    answer:
      "A friend with a brand-new account created through your invite link who joins the official Telegram channel and claims their first mining session. Until then, the referral shows as \"Pending\". If they leave the channel later, your reward is not taken back. You cannot invite yourself.",
  },
  {
    question: "How does the Daily Check-In work?",
    answer: `Once per UTC day. Rewards climb ${CHECKIN_MIN_DOM}, 10, 15, 20, 25, 25, then ${CHECKIN_MAX_DOM} DOM on day 7. After that, regular days pay ${CHECKIN_BASE_DOM} DOM and every multiple of 7 pays ${CHECKIN_MAX_DOM} DOM. Missing a day resets your streak to day 1.`,
  },
  {
    question: "What Earn quests are there?",
    answer: `Join the official Telegram channel (${QUEST_JOIN_CHANNEL_DOM} DOM, one-time), follow the project on X (${QUEST_FOLLOW_X_DOM} DOM, one-time), and watch up to ${AD_WATCH_DAILY_LIMIT} ads per day for ${AD_WATCH_REWARD_DOM} DOM each. Amounts can be adjusted through config.`,
  },
  {
    question: "How does anti-fraud work?",
    answer:
      "Layered anti-abuse checks watch for self-referrals, multi-account farms, duplicated identities, abnormal signup bursts, bot activity, and referral rings. Referrals and accounts move through clear statuses, and any confirmed fraud can reverse the reward. Exact detection thresholds are intentionally not published.",
  },
  {
    question: "When is the TGE?",
    answer: "Status: TBA. Mining and on-chain withdrawal already operate before the public market launch. No TGE date has been set — one will be announced only through official Dungeon of Miners channels.",
  },
  {
    question: "When will DOM be listed?",
    answer: "Status: TBA. No exchange, venue, or listing date has been confirmed — announcements will come only through official Dungeon of Miners channels.",
  },
  {
    question: "Is DOM guaranteed to have a particular value?",
    answer: "No. Dungeon of Miners never guarantees a price, return, exchange venue, or liquidity outcome for DOM.",
  },
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
    status: "active",
    items: ["Website", "Mining engine", "Fixed Supply Economy", "BSC architecture", "Mining Storage", "Claim"],
  },
  {
    phase: "Phase 2",
    title: "Mining Network V2",
    status: "active",
    items: ["Six Halvings", "Global Emission", "Pickaxe Level 1–6", "Storage progression", "Referral rewards (DOM)", "Daily Check-In & Earn quests"],
  },
  {
    phase: "Phase 3",
    title: "Social Mining",
    status: "planned",
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
// BSC Transparency page data — the contract is deployed and verified on BscScan.
// ---------------------------------------------------------------------------
export const transparencyConfig = {
  network: NETWORK,
  token: siteConfig.ticker,
  standard: TOKEN_STANDARD,
  contractAddress: "0xB33A511B88b6691bE265DdBCD0c8dbE6A4fCf515",
  totalSupply,
  additionalMinting: "None",
  contractStatus: "Deployed & Verified",
  explorerName: BLOCK_EXPLORER_NAME,
  explorerUrl: "https://bscscan.com/address/0xB33A511B88b6691bE265DdBCD0c8dbE6A4fCf515",
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
};

export const treasuryWallets: TreasuryWallet[] = [
  {
    id: "mining",
    label: "Mining Reward Wallet",
    purpose: "Source of all mining rewards released to players through the Global Emission System.",
    allocation: formatDOM(MINING_ALLOCATION),
    address: SAFE_WALLETS.mining,
    balance: "—",
    vesting: "Released via mining, paced by the Halving schedule",
  },
  {
    id: "liquidity",
    label: "Liquidity Wallet",
    purpose: "Reserved to support healthy DOM market liquidity at and after TGE.",
    allocation: formatDOM(LIQUIDITY_ALLOCATION),
    address: SAFE_WALLETS.liquidity,
    balance: "—",
    vesting: "Pending Final Approval",
  },
  {
    id: "team",
    label: "Team Wallet",
    purpose: "Long-term allocation for the core team.",
    allocation: formatDOM(TEAM_ALLOCATION),
    address: SAFE_WALLETS.team,
    balance: "—",
    vesting: "Pending Final Approval",
  },
  {
    id: "treasury",
    label: "Treasure & Ecosystem Reserve",
    purpose: "Strategic reserve supporting rewards, campaigns, and long-term ecosystem requirements.",
    allocation: formatDOM(TREASURE_ALLOCATION),
    address: SAFE_WALLETS.treasury,
    balance: "—",
    vesting: "Pending Final Approval",
  },
  {
    id: "ecosystem",
    label: "Staking Reward Wallet",
    purpose: "Reserved for staking rewards to incentivize holding DOM.",
    allocation: formatDOM(ECOSYSTEM_ALLOCATION),
    address: SAFE_WALLETS.ecosystem,
    balance: "—",
    vesting: "Pending Final Approval",
  },
  {
    id: "public",
    label: "Public / Strategic Wallet",
    purpose: "Reserved for public and strategic ecosystem opportunities.",
    allocation: formatDOM(PUBLIC_STRATEGIC_ALLOCATION),
    address: SAFE_WALLETS.public,
    balance: "—",
    vesting: "Pending Final Approval",
  },
];

export const vestingConfig = {
  status: "Pending Final Approval",
  note: "The 45% non-mining supply (Liquidity, Team, Treasure & Reserve, Staking Reward, Public/Strategic) needs a published unlock schedule. No cliff, vesting curve, or release date has been approved yet — this page will be updated the moment one is finalized, and will never show an invented number before then.",
  covers: ["Team", "Staking Reward", "Public / Strategic", "Treasure & Reserve", "Liquidity (where relevant)"],
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
    "DOM powers the entire Dungeon of Miners ecosystem. Every miner, upgrade, reward, and on-chain withdrawal connects back to one shared economy.",
  tagline: "Mine. Progress. Connect. Withdraw.",
  intro: {
    lineOne: "The dungeon is more than a mine.",
    lineTwo: "It is a growing economy.",
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
      status: "COMING SOON",
      narrative: {
        primary: "Mine DOM through the mining economy.",
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
        secondary: "Tasks, achievements, and activity shape your journey.",
      },
      tooltip: { title: "Progress", text: "Activity and achievements move you forward." },
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
        secondary: "The Telegram community mines together and advances through each Halving era.",
      },
      tooltip: { title: "Community", text: "Mine alongside the Dungeon of Miners community." },
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
