// ---------------------------------------------------------------------------
// Dungeon of Miners — central content & config file.
// Edit copy, links, and asset paths here. Nothing else needs to change.
//
// ECONOMY v3.0 — CORE MODEL
// DOM has a permanently FIXED max supply of 1,000,000,000. The entire supply
// is created once; minting is disabled after deployment. 55% (550,000,000
// DOM) is the Mining Allocation, distributed — never minted — to miners
// through a shared Global Emission Pool across six Halving eras. Mining is
// distribution of a finite, pre-allocated pool, not token creation.
//
// There is no Holding/Pool wallet split. 100% of every claim becomes
// Available DOM Balance, which is eligible for instant, automated on-chain
// withdrawal (BNB Smart Chain / BEP20, via WalletConnect) at zero fee to
// the miner.
//
// Progression is Pickaxe Level 1–6 (driven by Mining XP, not wallet
// balance) — there is no separate Rank System and no Pickaxe Equipment
// Multiplier. TGE (public market launch) and Exchange Listing are both
// status: Coming Soon.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Dungeon of Miners",
  ticker: "DOM",
  tagline: "Mine DOM. Withdraw On-Chain. Survive the Halving.",
  description:
    "Dungeon of Miners is a Telegram mining ecosystem powered by a fixed supply of 1 billion DOM, six Halving eras, community Guilds, and instant on-chain withdrawals.",
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
      { label: "FAQ", href: "/faq" },
      { label: "Fair Play", href: "/fair-play" },
      { label: "Changelog", href: "/changelog" },
      { label: "Risk Disclosure", href: "/risk-disclosure" },
    ],
  },
];

export const navTopLevel: NavItem = { label: "Roadmap", href: "/roadmap" };

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
      "Mining activity earns Mining XP. XP progresses your Pickaxe through Level 1–6, permanently raising your Base Mining Power.",
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
      "Connect a BEP20 wallet and withdraw eligible Available Balance instantly — zero withdrawal fee, network fee sponsored.",
  },
];

// ---------------------------------------------------------------------------
// The Six Halvings — the mining allocation is split into six EQUAL 91.67M
// DOM eras. Each era carries its own daily global emission ceiling, halved
// from the previous era. A new Halving begins once the current era's
// allocation is fully distributed — there is no time-based forced Halving.
// `status` should ultimately be driven by the backend once real distributed
// totals exist — CURRENT/UPCOMING/LOCKED reflect today's known state, not an
// invented date.
// ---------------------------------------------------------------------------
export type HalvingStatus = "CURRENT" | "UPCOMING" | "LOCKED";

export const halvings = [
  {
    number: 1,
    name: "Starting Era",
    image: assets.halving1,
    allocation: "91,666,667 DOM",
    emissionCeiling: "1,000,000 DOM/day",
    status: "CURRENT" as HalvingStatus,
    vibe: "The surface tunnels. The network's highest daily emission ceiling — the richest era to start extracting DOM.",
  },
  {
    number: 2,
    name: "First Reduction",
    image: assets.halving2,
    allocation: "91,666,667 DOM",
    emissionCeiling: "500,000 DOM/day",
    status: "UPCOMING" as HalvingStatus,
    vibe: "Empty caverns swallow sound. The daily emission ceiling is cut in half — early miners keep their edge.",
  },
  {
    number: 3,
    name: "Deep Mining",
    image: assets.halving3,
    allocation: "91,666,667 DOM",
    emissionCeiling: "250,000 DOM/day",
    status: "LOCKED" as HalvingStatus,
    vibe: "Torchlight barely holds the dark back. Only committed miners make it this far.",
  },
  {
    number: 4,
    name: "Scarcity Era",
    image: assets.halving4,
    allocation: "91,666,667 DOM",
    emissionCeiling: "125,000 DOM/day",
    status: "LOCKED" as HalvingStatus,
    vibe: "Heat rises from the deep rock. DOM is harder to extract, and every claim counts more.",
  },
  {
    number: 5,
    name: "Last Vein",
    image: assets.halving5,
    allocation: "91,666,667 DOM",
    emissionCeiling: "62,500 DOM/day",
    status: "LOCKED" as HalvingStatus,
    vibe: "Ash drifts through cracked tunnels. Scarcity is no longer a warning — it's the reality.",
  },
  {
    number: 6,
    name: "Final Depth",
    image: assets.halving6,
    allocation: "91,666,665 DOM",
    emissionCeiling: "31,250 DOM/day",
    status: "LOCKED" as HalvingStatus,
    vibe: "The deepest chamber. The lowest emission ceiling the mining era will ever reach.",
  },
];

export const halvingTrigger =
  "Allocation-Based — the next Halving begins once the current era's mining allocation is fully distributed. There is no fixed date or timer.";

export const totalSupply = "1,000,000,000 DOM";

// ---------------------------------------------------------------------------
// Economy status — SINGLE SOURCE OF TRUTH for live mining/Halving/withdrawal
// state. Every component that shows this state reads from this object
// instead of hardcoding its own copy.
// ---------------------------------------------------------------------------
export type MiningStatus = "LIVE" | "MAINTENANCE";
export type LaunchStatus = "LIVE" | "COMING SOON";

export const economyConfig = {
  miningStatus: "LIVE" as MiningStatus,
  withdrawalStatus: "LIVE" as LaunchStatus,
  tgeStatus: "COMING SOON" as LaunchStatus,
  exchangeListingStatus: "COMING SOON" as LaunchStatus,
  currentHalving: 1,
  network: "BNB Smart Chain (BEP20)",
  walletConnector: "WalletConnect",
  mintingStatus: "Disabled — No Additional Minting",
  economyVersion: "v3.0",
  economyLastUpdated: "2026-09-17",
};

// ---------------------------------------------------------------------------
// Visible fixed-supply / minting labels — shown wherever the tokenomics
// architecture needs to be stated plainly.
// ---------------------------------------------------------------------------
export const supplyFacts = [
  { label: "Fixed Supply", value: totalSupply },
  { label: "Minting", value: economyConfig.mintingStatus },
  { label: "Mining Allocation", value: "550,000,000 DOM" },
  { label: "Halving Eras", value: "6" },
];

// ---------------------------------------------------------------------------
// Token allocation — exact 1,000,000,000 DOM split. Percentages and amounts
// must never be changed without an explicit, approved economic decision.
// ---------------------------------------------------------------------------
export const tokenAllocation = [
  {
    id: "mining",
    label: "Mining Rewards",
    percent: 55,
    amount: "550,000,000 DOM",
    color: "#F4B544", // primary gold
    description: "The largest allocation belongs to miners and community distribution.",
  },
  {
    id: "liquidity",
    label: "Liquidity",
    percent: 10,
    amount: "100,000,000 DOM",
    color: "#D98A1E", // amber
    description: "Reserved to support healthy DOM market liquidity.",
  },
  {
    id: "team",
    label: "Team",
    percent: 5,
    amount: "50,000,000 DOM",
    color: "#8a5a3c", // bronze
    description: "Long-term allocation for the core team.",
  },
  {
    id: "treasury",
    label: "Treasure & Ecosystem Reserve",
    percent: 10,
    amount: "100,000,000 DOM",
    color: "#B8860B", // deep gold
    description: "Strategic reserve supporting rewards, campaigns, and long-term ecosystem requirements.",
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    percent: 15,
    amount: "150,000,000 DOM",
    color: "#FF8A2A", // warm orange
    description: "Allocated for product growth, guilds, partnerships, integrations, and ecosystem expansion.",
  },
  {
    id: "public",
    label: "Public / Strategic",
    percent: 5,
    amount: "50,000,000 DOM",
    color: "#a9825a", // muted copper
    description: "Reserved for public and strategic ecosystem opportunities.",
  },
];

export const MINING_ALLOCATION_DOM = "550,000,000 DOM";

// ---------------------------------------------------------------------------
// Live mining status strip — every value here must come from the real
// backend once it's wired up. Nothing below is a fabricated live statistic;
// it's the honest structural shape the strip renders.
// ---------------------------------------------------------------------------
export const miningStatusStrip = {
  miningLabel: economyConfig.miningStatus,
  currentHalvingLabel: `Halving ${economyConfig.currentHalving} / ${halvings.length}`,
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
  { label: "Current Emission Ceiling", value: currentHalvingEntry.emissionCeiling },
  { label: "Mining Status", value: economyConfig.miningStatus },
  { label: "Total Halvings", value: String(halvings.length) },
];

// ---------------------------------------------------------------------------
// Mining activities — live mining is already on, so these are ongoing ways
// to build progression, not pre-launch busywork. All of these can reward
// real DOM or in-game progression now that mining is live.
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
    reward: "DOM + XP",
  },
  {
    icon: "user-plus",
    title: "Referrals",
    description: "Invite active miners to grow the Referral Booster on your Mining Weight.",
    reward: "+0.5% Mining Weight",
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
    description: "Complete community missions and objectives for steady rewards.",
    reward: "XP + Chest Key",
  },
];

// ---------------------------------------------------------------------------
// Effective Mining Weight — Pickaxe Base Mining Power stacked with capped
// boosters. This is NOT a per-user DOM/hour guarantee: the Halving does not
// multiply an individual's rate, it sets the finite GLOBAL daily emission
// ceiling the entire network shares (see emissionModel below). A miner's
// actual reward is their share of that shared, capped pool — never an
// unbounded number, no matter how many boosters stack.
// ---------------------------------------------------------------------------
export const miningFormula = {
  weightChain: [
    "Pickaxe Base Mining Power",
    "× Referral Booster",
    "× Guild Booster",
    "× Temporary Event Booster",
  ],
  example: {
    label: "Effective Mining Weight Example",
    rows: [
      { label: "Pickaxe Base Mining Power (Level 3)", value: "150" },
      { label: "Referral Booster (16 active referrals)", value: "+8%" },
      { label: "Guild Booster (guild 50%+ active)", value: "+5%" },
    ],
    final: { label: "Effective Mining Weight", value: "≈ 170.1" },
  },
};

// ---------------------------------------------------------------------------
// Global Emission Model — the hard ceiling that protects the 550,000,000
// DOM Mining Allocation no matter how many miners join or how many boosters
// they stack.
// ---------------------------------------------------------------------------
export const emissionModel = {
  shareFormula: "userEmissionShare = userEffectiveMiningWeight ÷ totalEffectiveMiningWeight",
  rewardFormula: "userReward = globalEmissionForPeriod × userEmissionShare",
  note: "Every miner receives a proportional share of the current Halving's daily emission ceiling — never an unbounded per-user rate. 10 miners, 10,000 miners, or 1,000,000 miners all divide the same finite emission budget; they can never exceed it.",
};

export const boostRules = [
  { label: "Referral Booster", value: "+0.5% Mining Weight per active qualified referral (max 30) — up to +15%" },
  { label: "Guild Booster", value: "Tiered by guild activity — up to +10% Mining Weight" },
  { label: "Temporary / Event Booster", value: "TBA — configurable, always capped" },
  { label: "Global Emission Ceiling", value: "Always wins — no booster combination can exceed it" },
];

export const storageRules = {
  description:
    "Your miner stores earned DOM here until you claim it. DOM accumulates inside Mining Storage; it is never an external crypto wallet, and it is never silently deleted.",
  baseStorage: "TBA",
  storageUpgrade: "Higher Pickaxe Levels may unlock higher storage capacity — TBA",
  storageCapacity: "Displayed inside the Mini App",
  exampleCurrent: 2400,
  exampleMax: 5000,
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
      description: "Request withdrawal of eligible Available Balance to your connected wallet.",
    },
    {
      label: "Connected Wallet",
      description: "Your external BEP20 wallet, connected via WalletConnect.",
    },
  ],
  accountingStates: ["miningStorage", "availableBalance", "pendingWithdrawal", "withdrawnBalance"],
  integrityNote:
    "Withdrawal validation always happens server-side with atomic transactions — the frontend only displays state, it never owns it. One reward can never be claimed or withdrawn twice.",
};

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
  { label: "Current Emission Ceiling", value: currentHalvingEntry.emissionCeiling },
  { label: "Number of Active Miners", value: "Awaiting Live Data" },
];

export const halvingRecord = [
  { label: "Economy Version", value: economyConfig.economyVersion },
  { label: "Last Updated", value: economyConfig.economyLastUpdated },
  { label: "Total Supply", value: totalSupply },
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Current Halving", value: `${economyConfig.currentHalving} of ${halvings.length}` },
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

export const economyChangelog = [
  {
    version: "v3.0",
    date: economyConfig.economyLastUpdated,
    summary:
      "DOM Fixed-Supply Economy Update: removed the retired Holding/Pool Wallet split, migrated Ranks to Pickaxe Level 1–6, removed the Pickaxe Equipment Multiplier, introduced a hard Global Emission Pool, standardized the six Halving allocations, rebuilt Referral and Guild boosters, and added TGE / Exchange Listing status.",
    changes: [
      "Removed the Holding Wallet / Pool Wallet split — 100% of claimed DOM becomes Available Balance.",
      "Clarified the fixed 1,000,000,000 DOM supply: created once, no additional minting, ever.",
      "Introduced a Global Emission Pool — total network rewards can never exceed the 550,000,000 DOM mining allocation.",
      "Standardized the six Halving eras into equal 91,666,667 DOM allocations with halving daily emission ceilings.",
      "Migrated the Rank System to Pickaxe Level 1–6, progressed by Mining XP instead of wallet balance.",
      "Removed the Pickaxe Equipment Multiplier — Pickaxe Level now sets Base Mining Power directly.",
      "Redesigned the Referral Program into Referral Booster V2 (+0.5% Mining Weight per active qualified referral, max +15%).",
      "Redesigned the flat Guild Bonus into a tiered Guild Booster (up to +10% Mining Weight) tied to Telegram-community Guilds.",
      "Added TGE (Coming Soon) and Exchange Listing (Coming Soon) status.",
      "Removed the Protocol Revenue Backing row from the Tokenomics & Valuation Model.",
      "Removed remaining legacy Pre-TGE, Floor-system, and 6,000,000,000 DOM references from documentation.",
      "Confirmed the launch network as BNB Smart Chain (BEP20), connected via WalletConnect.",
    ],
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
  networkFeeLabel: "Sponsored",
  network: "BNB Smart Chain (BEP20)",
  walletConnector: "WalletConnect",
  chainId: "56 (BNB Smart Chain Mainnet)",
  domContractAddress: "TBA",
  blockExplorerUrl: "BscScan (bscscan.com)",
  statuses: ["Processing", "Broadcasted", "Confirmed", "Failed"] as const,
  minimumWithdrawal: "TBA",
  maximumWithdrawal: "TBA",
  instantNote:
    "Instant withdrawal means the backend automatically validates and broadcasts your transaction — no manual approval queue. BNB Smart Chain itself can still take a short time to confirm the transaction on-chain.",
};

export const riskDisclosure =
  "Dungeon of Miners is a live Telegram Mini App mining ecosystem. Mining or holding DOM does not guarantee financial value, profit, or return. Digital assets can be volatile, and participation carries smart contract risk, wallet risk, blockchain and network risk, technical failure, network congestion, market volatility, liquidity risk, and the possibility of ecosystem changes. DOM's TGE (public market launch) and Exchange Listing are both status: Coming Soon — no date, exchange venue, opening price, market cap, or liquidity amount has been announced, and none should be assumed until officially confirmed through Dungeon of Miners' own channels. Dungeon of Miners does not promise financial return, profit, price appreciation, exchange listing, or guaranteed liquidity. Users should independently evaluate the risks of holding or using blockchain assets.";

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
  maxMembers: 30,
  joinCooldownHours: 72,
  maxBoostPercent: 10,
  roles: ["Owner", "Officer", "Member"],
};

export const guildBoosterTiers = [
  { activeThreshold: 30, weightBonus: 2 },
  { activeThreshold: 50, weightBonus: 5 },
  { activeThreshold: 70, weightBonus: 8 },
  { activeThreshold: 90, weightBonus: 10 },
];

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

// ---------------------------------------------------------------------------
// Referral Booster V2 — replaces the retired +2%/50-referral/+100%/+50 DOM
// model. Capped and tied to ACTIVE qualified referrals so it can never
// create unbounded emission or reward dead/farmed accounts.
// ---------------------------------------------------------------------------
export type ReferralStatus = "Pending" | "Qualified" | "Active" | "Inactive" | "Flagged" | "Invalidated";

export const referralBooster = {
  weightPerActiveReferral: 0.5,
  maxQualifiedReferrals: 30,
  maxBoostPercent: 15,
  starterBoost: { percent: 5, durationHours: 24 },
  milestones: [1, 3, 5, 10, 20, 30],
  qualificationRules: [
    "Unique Telegram account",
    "Passes account-age / anti-abuse checks",
    "Mines on at least 3 separate days",
    "Completes initial onboarding",
    "No self-referral",
    "No duplicated referral attribution",
  ],
  statuses: ["Pending", "Qualified", "Active", "Inactive", "Flagged", "Invalidated"] as ReferralStatus[],
};

// ---------------------------------------------------------------------------
// Pickaxe Levels — the PRIMARY progression system, replacing the retired
// Rank System. Progression is driven by persistent Mining XP / lifetime
// activity, never by current wallet balance — withdrawing DOM must never
// cost a player their level. Cosmetic names (Novice → Legend) are secondary
// flavor only. "basePower" is a dimensionless mining-weight unit, not a
// guaranteed DOM/hour rate — see emissionModel for why.
// ---------------------------------------------------------------------------
export type PickaxeLevel = {
  level: number;
  cosmeticName: string;
  basePower: string;
  xpRequired: string;
  image: string;
  accent: string;
};

export const pickaxeLevels: PickaxeLevel[] = [
  { level: 1, cosmeticName: "Novice", basePower: "10", xpRequired: "0 XP", image: assets.pickaxeLevel1, accent: "from-stone-800 to-stone-900" },
  { level: 2, cosmeticName: "Bronze", basePower: "50", xpRequired: "TBA", image: assets.pickaxeLevel2, accent: "from-[#8a5a3c] to-[#5a3822]" },
  { level: 3, cosmeticName: "Silver", basePower: "150", xpRequired: "TBA", image: assets.pickaxeLevel3, accent: "from-[#9aa4b2] to-[#5c6472]" },
  { level: 4, cosmeticName: "Gold", basePower: "300", xpRequired: "TBA", image: assets.pickaxeLevel4, accent: "from-gold-light to-gold-dark" },
  { level: 5, cosmeticName: "Diamond", basePower: "600", xpRequired: "TBA", image: assets.pickaxeLevel5, accent: "from-[#9fe8e0] to-[#3fa9a0]" },
  { level: 6, cosmeticName: "Legend", basePower: "1000", xpRequired: "TBA", image: assets.pickaxeLevel6, accent: "from-torch to-torch-ember" },
];

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
      { title: "Fixed Supply Mining", description: "Mining distributes DOM from a capped 550,000,000 DOM allocation — it never creates new supply.", icon: "lock" },
      { title: "Six Halving Eras", description: "Six equal allocations of the mining pool, each with a halved daily emission ceiling.", icon: "flame" },
      { title: "Global Emission Pool", description: "Rewards are a share of a finite daily emission — more miners divide the pool, they never exceed it.", icon: "gauge" },
      { title: "Mining Storage", description: "Unclaimed DOM accumulates safely until you claim it — nothing is ever deleted.", icon: "box" },
      { title: "Claim System", description: "Claim moves stored DOM into your Available Balance — 100%, no split.", icon: "check-circle" },
      { title: "Pickaxe Level 1–6", description: "Progress your pickaxe through Mining XP to raise your Base Mining Power.", icon: "hammer" },
    ],
  },
  {
    group: "On-Chain",
    items: [
      { title: "WalletConnect", description: "Connect an external BEP20 wallet — Dungeon of Miners never asks for your seed phrase.", icon: "wallet" },
      { title: "Available DOM Balance", description: "The spendable, withdrawal-eligible balance created the moment you claim.", icon: "coins" },
      { title: "Instant On-Chain Withdrawal", description: "Automated backend validation and broadcast — no manual approval queue.", icon: "send" },
      { title: "Zero DOM Withdrawal Fee", description: "Dungeon of Miners charges 0 DOM to withdraw. Network fee: sponsored.", icon: "shield" },
      { title: "Transaction Status", description: "Processing, Broadcasted, Confirmed, or Failed — always shown honestly.", icon: "activity" },
      { title: "Transaction Hash", description: "Every confirmed withdrawal returns a real, verifiable transaction hash.", icon: "hash" },
      { title: "Block Explorer Verification", description: "Verify any withdrawal directly on a public block explorer.", icon: "search" },
    ],
  },
  {
    group: "Social",
    items: [
      { title: "Telegram Guilds", description: "Bind your Telegram group or supergroup to its own Dungeon of Miners Guild.", icon: "users" },
      { title: "Guild Invitations", description: "Deep-link invites bring your Telegram community straight into the Guild.", icon: "user-plus" },
      { title: "Guild Expeditions", description: "Daily and weekly community targets that reward Guild XP and cosmetics.", icon: "swords" },
      { title: "Guild Booster", description: "A tiered mining-weight boost based on how active your guild really is — up to +10%.", icon: "trophy" },
      { title: "Guild Leaderboard", description: "Guilds ranked by verified activity and contribution, never raw member count.", icon: "list-checks" },
      { title: "Referral Booster", description: "+0.5% Mining Weight per active qualified referral, up to +15%.", icon: "user-plus" },
      { title: "Referral Milestones", description: "Badges and cosmetics for 1, 3, 5, 10, 20, and 30 qualified referrals.", icon: "shield" },
    ],
  },
  {
    group: "Engagement",
    items: [
      { title: "Daily Tasks", description: "Community missions and objectives for steady progression.", icon: "check-circle" },
      { title: "Daily Check-In", description: "Stay active every day to keep your streak alive.", icon: "calendar-check" },
      { title: "Stone Breaker", description: "A quick timing mini-game that rewards bonus DOM.", icon: "gem" },
      { title: "Watch & Earn", description: "Rewarded ads convert attention into DOM and mining boosts.", icon: "play-circle" },
      { title: "Delver Badges", description: "Permanent cosmetics earned through milestones and achievements.", icon: "shield" },
      { title: "Miner Card Sharing", description: "Share your miner profile and progress with your community.", icon: "share-2" },
    ],
  },
  {
    group: "Transparency",
    items: [
      { title: "Fixed Supply Counter", description: "1,000,000,000 DOM — always the same number, never inflated.", icon: "lock" },
      { title: "Mining Allocation Remaining", description: "Live-tracked once the backend surfaces it — never fabricated.", icon: "gauge" },
      { title: "Current Halving", description: "Which of the six Halving eras the network is in right now.", icon: "flame" },
      { title: "Global Emission Ledger", description: "A public record of network-wide mining distribution.", icon: "scroll" },
      { title: "Current Network Emission", description: "Today's live emission ceiling, shown honestly or marked awaiting live data.", icon: "activity" },
      { title: "Fair Play", description: "The rules that protect a shared, finite mining economy.", icon: "shield" },
      { title: "Anti-Abuse", description: "Layered protection against Sybil accounts, farming, and reward manipulation.", icon: "shield-alert" },
      { title: "Economy Version History", description: "Every economy rule change tracked publicly by version.", icon: "scroll" },
    ],
  },
  {
    group: "Upcoming",
    items: [
      { title: "TGE", description: "Official DOM market launch — status: Coming Soon.", icon: "rocket" },
      { title: "Exchange Listing", description: "Announced only through official Dungeon of Miners channels — status: Coming Soon.", icon: "trending-up" },
      { title: "Android App", description: "A standalone home-screen experience, in development.", icon: "smartphone" },
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
      "Dungeon of Miners is a live Telegram Mini App mining ecosystem. You mine DOM passively, level up your Pickaxe through Mining XP, and progress through six Halving eras alongside a global community of miners and Telegram-based Guilds.",
  },
  {
    question: "Is mining live?",
    answer: "Yes. Mining is live right now inside the Mini App, and eligible DOM can already be withdrawn on-chain.",
  },
  {
    question: "What is DOM?",
    answer: "DOM is the single token of the Dungeon of Miners economy — mined by players and eligible for on-chain withdrawal.",
  },
  {
    question: "What is the maximum DOM supply?",
    answer: "1,000,000,000 DOM. The entire supply is fixed and created once.",
  },
  {
    question: "Can more DOM be minted?",
    answer:
      "No. Minting is permanently disabled after the full 1,000,000,000 DOM supply is created. Mining is distribution of the pre-allocated 550,000,000 DOM Mining Allocation — it is never token creation, and it can never push total supply beyond 1 billion.",
  },
  {
    question: "How much DOM is allocated to mining?",
    answer: "550,000,000 DOM — 55% of total supply — is the fixed Mining Allocation shared by every miner across all six Halving eras.",
  },
  {
    question: "How does mining work?",
    answer:
      "Mining is idle and server-authoritative. Your Pickaxe Level sets your Base Mining Power, which is boosted by your Referral and Guild Boosters into an Effective Mining Weight. Each miner then receives a proportional share of the network's capped daily emission — never an unlimited per-user rate.",
  },
  {
    question: "What are the six Halvings?",
    answer:
      "The 550,000,000 DOM Mining Allocation is split into six equal 91,666,667 DOM eras. Each era has its own daily global emission ceiling, halved from the previous era — 1,000,000 DOM/day at Halving 1 down to 31,250 DOM/day at Halving 6.",
  },
  {
    question: "What happens when a Halving occurs?",
    answer:
      "The next Halving begins once the current era's 91,666,667 DOM allocation is completely distributed — there is no fixed date or timer. The daily emission ceiling then halves for the new era.",
  },
  {
    question: "What are Pickaxe Levels?",
    answer:
      "Pickaxe Level 1–6 is the primary mining progression system, replacing the old Rank System. Levels are driven by persistent Mining XP and lifetime activity, not by your current wallet balance — withdrawing DOM never costs you progress. Optional cosmetic names (Novice → Legend) map to each level.",
  },
  {
    question: "Does Pickaxe use an Equipment Multiplier?",
    answer:
      "No. Dungeon of Miners does not have a Pickaxe Equipment Multiplier. Each Pickaxe Level sets your Base Mining Power directly — it is not a separate multiplicative modifier on top of a base rate.",
  },
  {
    question: "How does Mining Storage work?",
    answer:
      "Mining Storage is server-authoritative state, not an external wallet — your miner stores earned DOM here until you claim it. If storage fills up, mining pauses until you claim; DOM is never deleted.",
  },
  {
    question: "How does Claim work?",
    answer: "Pressing Claim moves your stored DOM into your Available DOM Balance. 100% of the claimed amount becomes available — there is no wallet split.",
  },
  {
    question: "Can I withdraw all eligible claimed DOM?",
    answer: "Yes. All of your Available DOM Balance is eligible for on-chain withdrawal — there is no separate locked portion.",
  },
  {
    question: "How does on-chain withdrawal work?",
    answer:
      "Connect your BEP20 wallet, enter an amount, and confirm. The backend validates your Available Balance server-side and automatically broadcasts the transaction — no manual approval queue. You'll see a real transaction hash, a BscScan link, and a status of Processing, Broadcasted, Confirmed, or Failed.",
  },
  {
    question: "What network does Dungeon of Miners use?",
    answer: "BNB Smart Chain (BEP20), for DOM token distribution and on-chain withdrawal.",
  },
  {
    question: "What wallet can I connect?",
    answer: "Any BEP20-compatible wallet via WalletConnect — including MetaMask and Trust Wallet.",
  },
  {
    question: "Does Dungeon of Miners request my seed phrase?",
    answer: "No. Dungeon of Miners never asks for your seed phrase, private key, or recovery phrase — for any reason.",
  },
  {
    question: "What does zero withdrawal fee mean?",
    answer:
      "Dungeon of Miners charges you 0 DOM to withdraw. This describes the fee the miner pays, not the blockchain itself — BNB Smart Chain still has a real transaction cost, which the ecosystem sponsors on your behalf.",
  },
  {
    question: "What is a Guild?",
    answer: "A Guild is a Telegram-community-based team of up to 30 miners who coordinate expeditions and earn a shared Guild Booster.",
  },
  {
    question: "Can my Telegram community create a Guild?",
    answer: "Yes. A Telegram Group or Supergroup admin can create a Guild and connect it directly to their community.",
  },
  {
    question: "How do Guild invitations work?",
    answer: "Each Guild gets a shareable deep-link invite. Opening it shows the Guild's name, community, member count, and activity, with a one-tap Join Guild action.",
  },
  {
    question: "How does the Guild Booster work?",
    answer:
      "The Guild Booster scales with how active your guild really is: 30% of members active grants +2% Mining Weight, 50% grants +5%, 70% grants +8%, and 90%+ grants the maximum +10%. It's recalculated daily and never rewards empty or inactive guilds.",
  },
  {
    question: "How does the Referral Booster work?",
    answer: "Each active, qualified referral adds +0.5% Mining Weight, up to a maximum of 30 referrals for a +15% cap.",
  },
  {
    question: "How does a referral qualify?",
    answer:
      "A referral must be a unique Telegram account that passes anti-abuse checks, mines on at least 3 separate days, and completes onboarding. Self-referrals and duplicated attribution are never counted.",
  },
  {
    question: "How does Dungeon of Miners prevent referral farming?",
    answer:
      "Layered anti-abuse checks watch for self-referrals, multi-account farms, duplicated identities, abnormal signup bursts, and referral rings. Referrals move through Pending → Qualified → Active status, and any confirmed fraud can reverse the reward. Exact detection thresholds are intentionally not published.",
  },
  {
    question: "When is the TGE?",
    answer: "Status: Coming Soon. No TGE date has been set — one will be announced only through official Dungeon of Miners channels.",
  },
  {
    question: "When will DOM be listed on an exchange?",
    answer: "Status: Coming Soon. No exchange, venue, or listing date has been confirmed — announcements will come only through official Dungeon of Miners channels.",
  },
  {
    question: "Is DOM guaranteed to have a particular price?",
    answer: "No. Dungeon of Miners never guarantees a price, return, exchange venue, or liquidity outcome for DOM.",
  },
];

// ---------------------------------------------------------------------------
// Guild section stats
// ---------------------------------------------------------------------------
export const guildStats = [
  { label: "Max Members", value: String(guildConfig.maxMembers) },
  { label: "Booster Tiers", value: "4" },
  { label: "Max Guild Booster", value: `+${guildConfig.maxBoostPercent}%` },
  { label: "Leaderboard", value: "Recorded Live" },
];

// ---------------------------------------------------------------------------
// Roadmap — qualitative phases, not fixed dates. Update `status` as each
// phase actually ships.
// ---------------------------------------------------------------------------
export type RoadmapStatus = "done" | "active" | "comingSoon" | "planned" | "future";

export const roadmap: { phase: string; title: string; status: RoadmapStatus; items: string[] }[] = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done",
    items: [
      "Website",
      "Telegram Mini App",
      "Account System",
      "Mining Engine",
      "Fixed 1B Supply Economy",
      "Halving 1",
      "Mining Storage",
      "Claim System",
      "On-Chain Withdrawal",
    ],
  },
  {
    phase: "Phase 2",
    title: "Mining Network V2",
    status: "active",
    items: [
      "Pickaxe Level 1–6",
      "Mining XP",
      "Storage progression",
      "Referral Booster V2",
      "Anti-Sybil system",
      "Global emission dashboard",
      "Public mining ledger",
    ],
  },
  {
    phase: "Phase 3",
    title: "Social Mining",
    status: "active",
    items: [
      "Telegram Group → Guild creation",
      "Guild deep links",
      "Guild roles",
      "Guild expeditions",
      "Guild booster",
      "Guild leaderboard",
      "Community mining statistics",
    ],
  },
  {
    phase: "Phase 4",
    title: "TGE & Market",
    status: "comingSoon",
    items: [
      "Final token contract verification",
      "Fixed supply verification",
      "Liquidity deployment",
      "TGE / Market Launch",
      "Public contract information",
      "Exchange Listing announcements",
    ],
  },
  {
    phase: "Phase 5",
    title: "Expansion",
    status: "planned",
    items: [
      "Halving progression",
      "Android app",
      "Advanced guild events",
      "More mining activities",
      "Ecosystem integrations",
    ],
  },
  {
    phase: "Phase 6",
    title: "Deep Economy",
    status: "future",
    items: [
      "Halving 6 / final emission era",
      "Long-term ecosystem utilities",
      "Community-driven features",
    ],
  },
];

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
      id: "dao",
      x: 86,
      y: 46,
      status: "PLANNED",
      narrative: {
        primary: "Beyond mining comes coordination.",
        secondary: "Community governance for the evolving DOM ecosystem.",
      },
      tooltip: { title: "Governance", text: "Community governance for the evolving ecosystem." },
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
      id: "swap",
      x: 74,
      y: 27,
      status: "COMING SOON",
      narrative: {
        primary: "From mining utility to an open token economy.",
        secondary: "Move between supported ecosystem assets after TGE.",
      },
      tooltip: { title: "Swap", text: "Move between supported ecosystem assets." },
    },
  ] satisfies EcosystemNode[],
};
