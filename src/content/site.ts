// ---------------------------------------------------------------------------
// Dungeon of Miners — central content & config file.
// Edit copy, links, and asset paths here. Nothing else needs to change.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Dungeon of Miners",
  ticker: "DOM",
  tagline: "Mine Deep. Rise Higher. Survive The Descent.",
  description:
    "Dungeon of Miners is a Telegram Mini App idle-mining game where players mine DOM, rank up by holding, upgrade their tools, and descend deeper as the global community unlocks new floors.",
  url: "https://dungeonofminers.com",
};

// Replace with the real deployed address once the DOM token contract goes live.
export const contractAddress = "0x000000000000000000000000000000000";

// Replace these with your real links.
export const links = {
  miniApp: "https://t.me/DungeonOfMinersBot/play",
  telegramCommunity: "https://t.me/DungeonOfMiners",
  telegramChannel: "https://t.me/DungeonOfMinersAnnouncements",
  twitter: "https://x.com/DungeonOfMiners",
};

// Hash links are prefixed with "/" so they resolve correctly from any page
// (e.g. from /tokenomics), not just the homepage.
export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "The Descent", href: "/#the-descent" },
  { label: "Economy", href: "/#economy" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Features", href: "/#features" },
  { label: "Guild", href: "/#guild" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "FAQ", href: "/#faq" },
];

// ---------------------------------------------------------------------------
// Assets — drop your files into /public/assets using these exact names
// and every image on the site updates automatically. Until then, an
// elegant placeholder is rendered in its place.
// ---------------------------------------------------------------------------
export const assets = {
  logoDom: "/assets/logo-dom.png",
  logoDragonCoin: "/assets/logo-dragon-coin.png",
  logoMinerHat: "/assets/logo-miner-hat.png",
  iconLivingEconomy: "/assets/icon-living-economy.png",
  iconScarcityWatch: "/assets/icon-scarcity-watch.png",
  iconHonestPretge: "/assets/icon-honest-pretge.png",
  heroDungeon: "/assets/hero-dungeon.png",
  telegramMockup: "/assets/telegram-mini-app-mockup.png",
  miniAppMine: "/assets/miniapp-mine-screen.png",
  miniAppEarn: "/assets/miniapp-earn-screen.png",
  miniAppBoost: "/assets/miniapp-boost-screen.png",
  miniAppReferral: "/assets/miniapp-referral-screen.png",
  miniAppMe: "/assets/miniapp-me-screen.png",
  floorRubble: "/assets/floor-rubble.png",
  floorHollow: "/assets/floor-hollow.png",
  floorGloom: "/assets/floor-gloom.png",
  floorEmber: "/assets/floor-ember.png",
  floorCinder: "/assets/floor-cinder.png",
  floorAbyss: "/assets/floor-abyss.png",
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
    title: "Start Mining DOM",
    description:
      "Your rig runs idle, mining DOM around the clock at a rate set by your current rank.",
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
    title: "Join a Guild & Descend",
    description:
      "Team up with up to 30 delvers, complete daily expeditions, and push deeper as the world advances toward The Descent.",
  },
];

// ---------------------------------------------------------------------------
// Floors
// ---------------------------------------------------------------------------
export const floors = [
  {
    index: 1,
    name: "Rubble",
    image: assets.floorRubble,
    allocation: "1,500,000,000 DOM",
    scarcity: 1,
    vibe: "The surface tunnels. Loose stone, easy air, and the first taste of the dark.",
  },
  {
    index: 2,
    name: "Hollow",
    image: assets.floorHollow,
    allocation: "1,200,000,000 DOM",
    scarcity: 2,
    vibe: "Empty caverns swallow sound. The walls narrow and the crowd thins out.",
  },
  {
    index: 3,
    name: "Gloom",
    image: assets.floorGloom,
    allocation: "1,000,000,000 DOM",
    scarcity: 3,
    vibe: "Torchlight barely holds the dark back. Only committed miners make it this far.",
  },
  {
    index: 4,
    name: "Ember",
    image: assets.floorEmber,
    allocation: "800,000,000 DOM",
    scarcity: 4,
    vibe: "Heat rises from the deep rock. Yields are richer, and so is the risk of falling behind.",
  },
  {
    index: 5,
    name: "Cinder",
    image: assets.floorCinder,
    allocation: "800,000,000 DOM",
    scarcity: 5,
    vibe: "Ash drifts through cracked tunnels. Scarcity is no longer a warning — it's the reality.",
  },
  {
    index: 6,
    name: "The Abyss",
    image: assets.floorAbyss,
    allocation: "700,000,000 DOM",
    scarcity: 6,
    vibe: "The final floor. What's left of the supply lives here, guarded by the deepest Descent.",
  },
];

export const totalSupply = "6,000,000,000 DOM";

// ---------------------------------------------------------------------------
// Ranks
// ---------------------------------------------------------------------------
export const ranks = [
  { name: "Novice", holding: "0 DOM", rate: "10 DOM/hr", accent: "from-stone-800 to-stone-900" },
  { name: "Bronze", holding: "2,500 DOM", rate: "50 DOM/hr", accent: "from-[#8a5a3c] to-[#5a3822]" },
  { name: "Silver", holding: "10,000 DOM", rate: "150 DOM/hr", accent: "from-[#9aa4b2] to-[#5c6472]" },
  { name: "Gold", holding: "40,000 DOM", rate: "300 DOM/hr", accent: "from-gold-light to-gold-dark" },
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
    title: "The Descent",
    description: "A global halving event that resets mining speed as floors empty out.",
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
    description: "Rewarded ads convert your attention directly into DOM.",
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
    description: "Invite friends into the dungeon and earn a share of their progress.",
    icon: "user-plus",
  },
  {
    title: "Miner Card Sharing",
    description: "Show off your rank, rig, and floor with a shareable miner card.",
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
      "Dungeon of Miners is a Telegram Mini App idle-mining game. You mine DOM passively, rank up by holding, upgrade your gear, and progress through six dungeon floors alongside a global community of miners.",
  },
  {
    question: "How do I start mining?",
    answer:
      "Open the Dungeon of Miners Mini App inside Telegram and tap Start Mining. There's nothing to install and no wallet setup required to begin.",
  },
  {
    question: "What is The Descent?",
    answer:
      "The Descent is our signature event. Each floor has a limited DOM allocation. When that allocation runs out — or 90 days pass, whichever comes first — the world descends to the next floor and global mining speed is cut in half. It's a permanent, public scarcity mechanic, not a marketing gimmick.",
  },
  {
    question: "What's the difference between the Holding Wallet and the Pool Wallet?",
    answer:
      "Every claim splits 70/30. The Holding Wallet receives 70% and determines your rank — it isn't spendable. The Pool Wallet receives 30% and is what you spend on upgrades and queue for withdrawal.",
  },
  {
    question: "How do ranks work?",
    answer:
      "Your rank is set by your Holding Wallet balance. Six ranks exist, from Novice to Legend, each permanently unlocking a higher base mining rate once you reach the required holding threshold.",
  },
  {
    question: "What are Guilds?",
    answer:
      "Guilds are teams of up to 30 miners. If 60% or more of a guild's members claim on a given day, the entire guild receives a +15% hashrate bonus for that Daily Expedition. Guild rankings per floor are permanently recorded on the leaderboard.",
  },
  {
    question: "What is Pre-TGE withdraw?",
    answer:
      "Dungeon of Miners is currently in a Pre-TGE (Token Generation Event) stage. Withdrawal requests are recorded and queued, but shown honestly as 'Pre-TGE · Locked until listing.' There is no live payout right now, and we will never claim otherwise.",
  },
  {
    question: "Is this available on Telegram?",
    answer:
      "Yes. Dungeon of Miners runs entirely as a Telegram Mini App — accessible directly from a chat, with no separate app download required.",
  },
  {
    question: "How do Watch & Earn and tasks work?",
    answer:
      "Watch & Earn lets you view rewarded ads in exchange for DOM. Daily tasks include check-ins, joining or boosting our Telegram channel, and inviting friends — each contributing small, steady rewards toward your Pool Wallet.",
  },
];

// ---------------------------------------------------------------------------
// Guild section stats
// ---------------------------------------------------------------------------
export const guildStats = [
  { label: "Max Members", value: "30" },
  { label: "Claim Threshold", value: "60%" },
  { label: "Guild Bonus", value: "+15% Hashrate" },
  { label: "Leaderboard", value: "Recorded Per Floor" },
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
      "Telegram Mini App launch",
      "Idle mining core loop",
      "Rank system — Novice to Legend",
      "Holding Wallet / Pool Wallet split",
      "Daily tasks & Watch-to-Earn",
    ],
  },
  {
    phase: "Phase 2",
    title: "Depth & Guilds",
    status: "active" as const,
    items: [
      "Guild system — up to 30 members",
      "Daily Expedition hashrate bonus",
      "Delver Badges",
      "Stone Breaker mini-game",
      "Referral program",
    ],
  },
  {
    phase: "Phase 3",
    title: "The Descent, Live",
    status: "planned" as const,
    items: [
      "Full six-floor rollout",
      "Descent Hour global bonus events",
      "Permanent per-floor guild leaderboards",
      "Miner Card sharing",
    ],
  },
  {
    phase: "Phase 4",
    title: "Pre-TGE → TGE",
    status: "planned" as const,
    items: [
      "Withdraw queue activation",
      "Exchange listing preparation",
      "DOM Token Generation Event",
      "Migration from Pre-TGE ledger to on-chain token",
    ],
  },
];
