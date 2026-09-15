// ---------------------------------------------------------------------------
// Dungeon of Miners — central content & config file.
// Edit copy, links, and asset paths here. Nothing else needs to change.
//
// ECONOMIC MODEL (live mining economy, not Pre-TGE):
// DOM has a fixed max supply of 1,000,000,000. 55% (550,000,000 DOM) is the
// mining/community reward pool, emitted progressively through six Halving
// eras. Each Halving cuts the mining emission multiplier in half. Eligible
// mined DOM can be requested for on-chain withdrawal at zero fee to the
// miner (network gas is sponsored by the ecosystem — the chain itself still
// has real gas cost, the miner just doesn't pay it).
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Dungeon of Miners",
  ticker: "DOM",
  tagline: "Mine DOM. Survive the Halving.",
  description:
    "Dungeon of Miners is a live Web3 mining ecosystem powered by a fixed supply of 1 billion DOM. Mine, upgrade your equipment, build your guild, survive six Halving eras, and withdraw eligible DOM directly on-chain.",
  url: "https://dungeonofminers.com",
};

// Replace these with your real links.
export const links = {
  miniApp: "https://t.me/DungeonOfMinersBot/play",
  telegramCommunity: "https://t.me/DungeonOfMiners",
  telegramChannel: "https://t.me/DungeonOfMinersAnnouncements",
  twitter: "https://x.com/DungeonOfMiners",
};

// ---------------------------------------------------------------------------
// Navigation — grouped for the desktop dropdown / mobile accordion navbar.
// Hash links are prefixed with "/" so they resolve correctly from any page,
// not just the page that owns the section.
// ---------------------------------------------------------------------------
export type NavItem = { label: string; href: string; external?: boolean; comingSoon?: boolean };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Game",
    items: [
      { label: "Overview", href: "/game" },
      { label: "How It Works", href: "/game#how-it-works" },
      { label: "The Halvings", href: "/game#halvings" },
      { label: "Ranks", href: "/game#ranks" },
      { label: "Features", href: "/game#features" },
    ],
  },
  {
    label: "Economy",
    items: [
      { label: "Mining Economy", href: "/economy" },
      { label: "Tokenomics", href: "/tokenomics" },
      { label: "Halving", href: "/halving" },
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
      { label: "Documentation", href: "#", comingSoon: true },
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
// reuse the existing floor artwork (Rubble→Abyss) as the visual identity
// for Halving 1→6 — the dungeon-depth aesthetic carries over even though
// the economic "Floor" mechanic itself is retired.
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
      "Your rig runs idle, mining DOM around the clock at a rate set by your current rank and Halving era.",
  },
  {
    step: "03",
    title: "Claim Into Your Wallets",
    description:
      "Claim regularly. Every claim splits automatically — 70% to your Holding Wallet, 30% to your Pool Wallet.",
  },
  {
    step: "04",
    title: "Hold to Rank Up",
    description:
      "Your Holding Wallet balance determines your rank. Higher ranks permanently increase your base mining rate.",
  },
  {
    step: "05",
    title: "Upgrade Tools & Capacity",
    description:
      "Spend your Pool Wallet on torches, pickaxes, and storage to mine faster and hold more before you overflow.",
  },
  {
    step: "06",
    title: "Withdraw On-Chain",
    description:
      "Request an on-chain withdrawal of eligible DOM straight to your wallet — zero withdrawal fee, gas sponsored by the ecosystem.",
  },
];

// ---------------------------------------------------------------------------
// The Six Halvings — replaces the old Floor allocation/scarcity mechanic.
// Halvings do NOT carry their own supply pool; they cut the mining-emission
// multiplier applied against the shared 550,000,000 DOM mining allocation.
// `status` and `trigger` should ultimately be driven by the backend once a
// mined-supply threshold or timestamp trigger is configured — TBA for now,
// not invented.
// ---------------------------------------------------------------------------
export type HalvingStatus = "CURRENT" | "UPCOMING" | "LOCKED";

export const halvings = [
  {
    number: 1,
    name: "Starting Era",
    image: assets.halving1,
    multiplier: "×1.000",
    percent: "100%",
    status: "CURRENT" as HalvingStatus,
    vibe: "The surface tunnels. Mining emissions run at full rate — the richest era to start extracting DOM.",
  },
  {
    number: 2,
    name: "First Reduction",
    image: assets.halving2,
    multiplier: "×0.500",
    percent: "50%",
    status: "UPCOMING" as HalvingStatus,
    vibe: "Empty caverns swallow sound. Emissions cut in half — early miners keep their edge.",
  },
  {
    number: 3,
    name: "Deep Mining",
    image: assets.halving3,
    multiplier: "×0.250",
    percent: "25%",
    status: "LOCKED" as HalvingStatus,
    vibe: "Torchlight barely holds the dark back. Only committed miners make it this far.",
  },
  {
    number: 4,
    name: "Scarcity Era",
    image: assets.halving4,
    multiplier: "×0.125",
    percent: "12.5%",
    status: "LOCKED" as HalvingStatus,
    vibe: "Heat rises from the deep rock. DOM is harder to extract, and every claim counts more.",
  },
  {
    number: 5,
    name: "Last Vein",
    image: assets.halving5,
    multiplier: "×0.0625",
    percent: "6.25%",
    status: "LOCKED" as HalvingStatus,
    vibe: "Ash drifts through cracked tunnels. Scarcity is no longer a warning — it's the reality.",
  },
  {
    number: 6,
    name: "Final Depth",
    image: assets.halving6,
    multiplier: "×0.03125",
    percent: "3.125%",
    status: "LOCKED" as HalvingStatus,
    vibe: "The deepest chamber. The lowest emission rate the mining era will ever reach.",
  },
];

export const halvingTrigger = "Dynamic Supply Trigger — TBA";

export const totalSupply = "1,000,000,000 DOM";

// ---------------------------------------------------------------------------
// Economy status — SINGLE SOURCE OF TRUTH for live mining/Halving state.
// Every component that shows mining/Halving status reads from this object
// instead of hardcoding its own copy. Update `currentHalving` and
// `miningStatus` here as the real backend state changes — nothing else in
// the codebase needs to change.
// ---------------------------------------------------------------------------
export type MiningStatus = "LIVE" | "MAINTENANCE";

export const economyConfig = {
  miningStatus: "LIVE" as MiningStatus,
  currentHalving: 1,
  economyVersion: "v2.0",
  economyLastUpdated: "2026-09-15",
  claimSplit: { holding: 70, pool: 30 },
};

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
// it's the honest structural shape the strip renders (see
// DungeonStatusStrip.tsx for the "unavailable" fallback state).
// ---------------------------------------------------------------------------
export const miningStatusStrip = {
  miningLabel: "LIVE",
  currentHalvingLabel: `Halving ${economyConfig.currentHalving}`,
  withdrawalLabel: "ON-CHAIN",
  withdrawalFeeLabel: "0 DOM",
};

// ---------------------------------------------------------------------------
// Halving status facts — shown on the Halving page for the current era.
// ---------------------------------------------------------------------------
export const halvingFacts = [
  { label: "Current Halving", value: "Halving 1 · Starting Era" },
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Current Multiplier", value: "×1.000" },
  { label: "Mining Status", value: "LIVE" },
  { label: "Next Halving Trigger", value: halvingTrigger },
  { label: "Total Halvings", value: "6" },
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
    description: "Invite miners and grow your network for a permanent hashrate boost.",
    reward: "+2% Hashrate",
  },
  {
    icon: "users",
    title: "Guild Registration",
    description: "Create or join a guild and coordinate daily expeditions.",
    reward: "Guild Bonus",
  },
  {
    icon: "list-checks",
    title: "Daily Tasks",
    description: "Complete community missions and objectives for steady rewards.",
    reward: "XP + Chest Key",
  },
];

// ---------------------------------------------------------------------------
// Mining formula — how the final per-hour rate is calculated. Multipliers
// without an official number yet are marked TBA rather than invented.
// ---------------------------------------------------------------------------
export const miningFormula = {
  chain: [
    "Base Rank Rate",
    "× Halving Multiplier",
    "× Equipment Multiplier",
    "× Referral Multiplier",
    "× Guild Multiplier",
    "× Temporary Boost",
  ],
  example: {
    label: "Example Miner",
    rows: [
      { label: "Base Rate", value: "10 DOM/hour" },
      { label: "Halving", value: "×1.000" },
      { label: "Referral", value: "×1.10" },
      { label: "Guild", value: "×1.15" },
    ],
    final: { label: "Final Rate", value: "12.65 DOM/hour" },
  },
};

export const boostRules = [
  { label: "Halving Multiplier", value: "Set per Halving era — see The Halvings" },
  { label: "Pickaxe (Equipment) Multiplier", value: "TBA" },
  { label: "Referral Multiplier", value: "+2% per qualified referral (max +100%)" },
  { label: "Guild Multiplier", value: "+15% on qualifying days (60%+ guild claim rate)" },
  { label: "Temporary Boost", value: "TBA" },
  { label: "Maximum Mining Multiplier", value: "TBA" },
  { label: "Temporary Boost Duration", value: "TBA" },
  { label: "Boost Stacking", value: "TBA" },
];

export const storageRules = {
  description:
    "DOM accumulates inside Mining Storage. If storage fills up, mining pauses until you claim — DOM is never automatically deleted.",
  baseStorage: "TBA",
  storageUpgrade: "Available now",
  storageCapacity: "Displayed inside the Mini App",
  exampleCurrent: 2400,
  exampleMax: 5000,
};

export const claimRules = {
  minimumClaim: "TBA",
  claimCooldown: "TBA",
  maximumClaim: "TBA",
};

// ---------------------------------------------------------------------------
// Public Halving Ledger — transparency data. Structural shape only; once the
// real backend is wired up these should be live reads, not edited by hand.
// No live numbers are fabricated here.
// ---------------------------------------------------------------------------
export const halvingLedger = [
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Total Mined", value: "Awaiting backend" },
  { label: "Remaining Mining Allocation", value: "Awaiting backend" },
  { label: "Current Halving", value: "Halving 1 · Starting Era" },
  { label: "Current Multiplier", value: "×1.000" },
  { label: "Next Halving Trigger", value: halvingTrigger },
  { label: "Number of Miners", value: "Awaiting backend" },
];

export const halvingRecord = [
  { label: "Economy Version", value: economyConfig.economyVersion },
  { label: "Last Updated", value: economyConfig.economyLastUpdated },
  { label: "Total Supply", value: totalSupply },
  { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
  { label: "Current Halving", value: "1 of 6" },
  { label: "Mining Status", value: "LIVE" },
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
    version: "v2.0",
    date: economyConfig.economyLastUpdated,
    summary:
      "DOM Live Economy Update: Pre-TGE model retired, supply updated to 1,000,000,000 DOM, new six-part token allocation introduced, the Floor system replaced by a six-Halving emission model, and on-chain withdrawal introduced at zero fee to miners (network gas sponsored by the ecosystem).",
  },
  {
    version: "v1.0",
    date: "2026-09-14",
    summary: "Original Pre-TGE economy rules established (retired in v2.0): 6-floor allocation, ×1.00–×0.03125 Descent multipliers, 70/30 claim split.",
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
  gasSponsored: true,
  gasSponsorLabel: "Gas Sponsored",
  network: "TBA",
  chainId: "TBA",
  domContractAddress: "TBA",
  blockExplorerUrl: "TBA",
  statuses: ["Pending", "Processing", "Broadcasted", "Confirmed", "Failed"] as const,
  minimumWithdrawal: "TBA",
  maximumWithdrawal: "TBA",
};

export const riskDisclosure =
  "Dungeon of Miners is a live blockchain-based mining ecosystem. Mining DOM does not guarantee financial value or profit. Digital assets can be volatile, and participation carries smart contract risk, wallet risk, blockchain and network risk, technical failure, network congestion, market volatility, liquidity risk, and the possibility of ecosystem changes. Dungeon of Miners does not promise financial return, profit, price appreciation, exchange listing, or guaranteed liquidity. Users should independently evaluate the risks of holding or using blockchain assets.";

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
    "Referral abuse",
    "Sybil attacks",
    "API abuse",
    "Exploit abuse",
    "Tampering with mining calculation",
    "Withdrawal exploits",
    "Balance manipulation",
    "Smart contract exploitation",
  ],
  possibleActions: [
    "Reward rollback",
    "Leaderboard removal",
    "Mining suspension",
    "Withdrawal security review",
    "Account restriction",
    "Account ban",
  ],
};

// ---------------------------------------------------------------------------
// Guild rules — numeric details beyond the existing guildStats. TBA where a
// number hasn't been decided.
// ---------------------------------------------------------------------------
export const guildRuleDetails = [
  { label: "Guild Creation Cost", value: "TBA" },
  { label: "Join Cooldown", value: "TBA" },
  { label: "Leave Cooldown", value: "TBA" },
  { label: "Guild Boost Duration", value: "TBA" },
];

// ---------------------------------------------------------------------------
// Ranks
// ---------------------------------------------------------------------------
export const ranks = [
  { name: "Novice", holding: "0 DOM", rate: "10 DOM/hr", accent: "from-stone-800 to-stone-900" },
  { name: "Bronze", holding: "5,000 DOM", rate: "50 DOM/hr", accent: "from-[#8a5a3c] to-[#5a3822]" },
  { name: "Silver", holding: "15,000 DOM", rate: "150 DOM/hr", accent: "from-[#9aa4b2] to-[#5c6472]" },
  { name: "Gold", holding: "50,000 DOM", rate: "300 DOM/hr", accent: "from-gold-light to-gold-dark" },
  { name: "Diamond", holding: "150,000 DOM", rate: "600 DOM/hr", accent: "from-[#9fe8e0] to-[#3fa9a0]" },
  { name: "Legend", holding: "500,000 DOM", rate: "1000 DOM/hr", accent: "from-torch to-torch-ember" },
];

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------
export const features = [
  {
    title: "Idle Mining",
    description: "DOM accumulates around the clock, on-rank, whether you're online or not.",
    icon: "pickaxe",
  },
  {
    title: "The Halvings",
    description: "Six eras of progressively lower mining emissions — DOM gets harder to mine as the network advances.",
    icon: "flame",
  },
  {
    title: "Torch Boost",
    description: "Light the way to a temporary mining speed increase.",
    icon: "flashlight",
  },
  {
    title: "Pickaxe Upgrade",
    description: "Permanently raise your base mining rate with better gear.",
    icon: "hammer",
  },
  {
    title: "Storage Upgrade",
    description: "Expand how much DOM you can hold before you're forced to claim.",
    icon: "box",
  },
  {
    title: "Stone Breaker",
    description: "A quick mini-game that rewards sharp timing with bonus DOM.",
    icon: "gem",
  },
  {
    title: "Daily Tasks",
    description: "Check in, complete objectives, and keep your streak alive.",
    icon: "check-circle",
  },
  {
    title: "Watch & Earn",
    description: "Rewarded ads convert your attention into DOM and mining boosts. Daily ad limit: TBA.",
    icon: "play-circle",
  },
  {
    title: "Guild Expedition",
    description: "Team objectives that unlock a shared hashrate bonus.",
    icon: "users",
  },
  {
    title: "Delver Badges",
    description: "Permanent bonuses earned through milestones and achievements.",
    icon: "shield",
  },
  {
    title: "Referral Bonus",
    description: "+2% permanent hashrate per qualified friend (up to 50, +100% max). They start with a +50 DOM bonus.",
    icon: "user-plus",
  },
  {
    title: "On-Chain Withdrawal",
    description: "Request a real on-chain withdrawal of eligible DOM — zero fee to the miner, gas sponsored by the ecosystem.",
    icon: "share-2",
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const faqs = [
  {
    question: "What is Dungeon of Miners?",
    answer:
      "Dungeon of Miners is a live Telegram Mini App mining ecosystem. You mine DOM passively, rank up by holding, upgrade your gear, and progress through six Halving eras alongside a global community of miners.",
  },
  {
    question: "Is DOM live?",
    answer:
      "Yes. DOM powers the live Dungeon of Miners mining economy. Miners can earn DOM through gameplay, and eligible balances can be requested for on-chain withdrawal.",
  },
  {
    question: "Is Dungeon of Miners Pre-TGE?",
    answer: "No. Dungeon of Miners no longer uses a Pre-TGE mining model.",
  },
  {
    question: "Can I withdraw DOM?",
    answer: "Yes. Eligible DOM balances can be requested for withdrawal to a supported wallet.",
  },
  {
    question: "Is there a withdrawal fee?",
    answer:
      "No withdrawal fee is charged to miners. Blockchain transaction costs are sponsored by the Dungeon of Miners ecosystem.",
  },
  {
    question: "What is the maximum DOM supply?",
    answer: "1,000,000,000 DOM.",
  },
  {
    question: "What is a Halving?",
    answer: "A Halving reduces the DOM mining emission rate, making new DOM progressively harder to mine.",
  },
  {
    question: "How many Halvings are planned?",
    answer: "Six Halving eras define the mining emission lifecycle.",
  },
  {
    question: "Can the supply exceed 1 billion?",
    answer: "No. DOM has a fixed maximum supply of 1,000,000,000 tokens.",
  },
  {
    question: "What's the difference between the Holding Wallet and the Pool Wallet?",
    answer:
      "Every claim splits 70/30. The Holding Wallet receives 70% and determines your rank — it is not itself withdrawable on-chain. The Pool Wallet receives 30% and is what you spend on upgrades and request for on-chain withdrawal. This split is an existing game-progression mechanic under active review as on-chain withdrawal rolls out — we'll announce clearly if it changes.",
  },
  {
    question: "How do ranks work?",
    answer:
      "Your rank is set by your Holding Wallet balance. Six ranks exist, from Novice to Legend, each permanently unlocking a higher base mining rate once you reach the required holding threshold.",
  },
  {
    question: "What are Guilds?",
    answer:
      "Guilds are teams of up to 30 miners. If 60% or more of a guild's members claim on a given day, the entire guild receives a +15% hashrate bonus for that Daily Expedition. Guild rankings are permanently recorded on the leaderboard.",
  },
  {
    question: "Is this available on Telegram?",
    answer:
      "Yes. Dungeon of Miners runs entirely as a Telegram Mini App — accessible directly from a chat, with no separate app download required.",
  },
  {
    question: "How do Watch & Earn and tasks work?",
    answer:
      "Watch & Earn lets you view rewarded ads in exchange for DOM and mining boosts. Daily tasks include check-ins, joining or boosting our Telegram channel, and inviting friends — each contributing steady rewards toward your Pool Wallet. Daily ad limits apply to prevent unlimited ad farming.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "Each qualified referral gives you +2% permanent hashrate, up to 50 referrals (+100% max). A referral only qualifies once your friend claims on 3 different days, and they get a +50 DOM starter bonus for joining. Self-referrals, automated accounts, and multi-account farming are not allowed and can invalidate rewards — see our Fair Play Policy.",
  },
  {
    question: "What happens during maintenance?",
    answer:
      "Mining and claim behavior during maintenance follows server-authoritative timestamps and official maintenance announcements — nothing is ever calculated client-side. We don't promise automatic compensation unless that logic has actually shipped.",
  },
];

// ---------------------------------------------------------------------------
// Guild section stats
// ---------------------------------------------------------------------------
export const guildStats = [
  { label: "Max Members", value: "30" },
  { label: "Claim Threshold", value: "60%" },
  { label: "Guild Bonus", value: "+15% Hashrate" },
  { label: "Leaderboard", value: "Recorded Live" },
];

// ---------------------------------------------------------------------------
// Roadmap — qualitative phases, not fixed dates. Update `status` as each
// phase actually ships: "done" | "active" | "planned".
// ---------------------------------------------------------------------------
export const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done" as const,
    items: [
      "Website",
      "Telegram Mini App",
      "Mining Engine",
      "Account System",
      "Mining Economy",
    ],
  },
  {
    phase: "Phase 2",
    title: "Mining Network",
    status: "active" as const,
    items: [
      "Live Mining",
      "Equipment Upgrades",
      "Rank System — Novice to Legend",
      "Daily Tasks & Referral Program",
      "Guild System — up to 30 members",
    ],
  },
  {
    phase: "Phase 3",
    title: "On-Chain Economy",
    status: "active" as const,
    items: [
      "Wallet Connection",
      "DOM Token Integration",
      "On-Chain Withdrawal",
      "Gas Sponsorship",
      "Withdrawal Tracking & Block Explorer Verification",
    ],
  },
  {
    phase: "Phase 4",
    title: "Halving Expansion",
    status: "planned" as const,
    items: [
      "Halving 2 through Halving 6",
      "Advanced Guild Expeditions",
      "Treasury Mechanics",
      "Liquidity Expansion & Swap Integration",
      "Community Governance",
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
        secondary: "Mine DOM, build your position, and climb the ranks.",
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
        secondary: "Upgrade your tools and increase your rate before the next Halving.",
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
        secondary: "Tasks, upgrades, achievements, and activity shape your journey.",
      },
      tooltip: { title: "Progress", text: "Activity, upgrades, and achievements move you forward." },
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
        secondary: "Miners form guilds, complete expeditions, and progress together.",
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
        secondary: "Liquidity infrastructure that supports healthy DOM market activity.",
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
        secondary: "Move between supported ecosystem assets.",
      },
      tooltip: { title: "Swap", text: "Move between supported ecosystem assets." },
    },
  ] satisfies EcosystemNode[],
};
