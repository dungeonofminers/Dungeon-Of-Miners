// ---------------------------------------------------------------------------
// Documentation content — the /docs GitBook-style reference. This is the
// dense, reference-manual counterpart to the marketing pages: it restates
// the same facts already centralized in site.ts (never new numbers) in a
// sidebar-navigated, section-by-section format.
//
// Economy v3.0: no Holding/Pool wallet split, Pickaxe Level 1–6 (not a Rank
// System), no Pickaxe Equipment Multiplier, a hard Global Emission Pool, and
// TGE / Exchange Listing both status Coming Soon. Every figure below traces
// back to an existing site.ts export — this file adds structure and prose,
// not new data.
// ---------------------------------------------------------------------------

import type { DocBadgeTone, DocPage, DocsNavCategory } from "./docsBlocks";
import {
  siteConfig,
  totalSupply,
  MINING_ALLOCATION_DOM,
  halvingTrigger,
  economyConfig,
  supplyFacts,
  halvings,
  tokenAllocation,
  miningFormula,
  emissionModel,
  boostRules,
  storageRules,
  claimRules,
  balanceModel,
  pickaxeLevels,
  withdrawalConfig,
  fairPlay,
  guildConfig,
  guildBoosterTiers,
  guildCreationFlow,
  guildRuleDetails,
  guildStats,
  referralBooster,
  featureGroups,
  roadmap,
  economyChangelog,
  riskDisclosure,
} from "./site";

export const docsNav: DocsNavCategory[] = [
  {
    title: "The Economy",
    items: [
      { slug: "token", title: "Token Overview" },
      { slug: "tokenomics", title: "Tokenomics & Allocation" },
      { slug: "halvings", title: "The Halvings" },
      { slug: "mining-rate", title: "Mining Rewards Formula" },
    ],
  },
  {
    title: "Player Systems",
    items: [
      { slug: "pickaxe-levels", title: "Pickaxe Levels" },
      { slug: "balances", title: "Mining Storage & Balance" },
      { slug: "withdrawal", title: "On-Chain Withdrawal" },
      { slug: "guilds", title: "Guilds" },
      { slug: "referral", title: "Referral Booster" },
      { slug: "activities", title: "Mining Activities" },
      { slug: "features", title: "Full Feature List" },
    ],
  },
  {
    title: "Trust & Policy",
    items: [
      { slug: "transparency", title: "Transparency Commitments" },
      { slug: "fair-play", title: "Fair Play Policy" },
      { slug: "risk-disclosure", title: "Risk Disclosure" },
    ],
  },
  {
    title: "Reference",
    items: [
      { slug: "roadmap", title: "Roadmap" },
      { slug: "changelog", title: "Version History" },
      { slug: "valuation-model", title: "Tokenomics & Valuation Model" },
    ],
  },
];

const currentHalving = halvings.find((h) => h.number === economyConfig.currentHalving)!;

export const docsIntro: DocPage = {
  slug: "",
  eyebrow: "Documentation — 00",
  title: "A fixed-supply mining economy",
  description: `${siteConfig.name} is a live mining ecosystem powered by a permanently fixed supply of ${totalSupply}.`,
  blocks: [
    {
      type: "lede",
      text: "Players mine idly, level up their Pickaxe through Mining XP, join Telegram-community Guilds, and advance through six Halving eras that progressively cut the network's daily emission ceiling — and eligible DOM can be withdrawn on-chain today, instantly.",
    },
    {
      type: "paragraph",
      text: "There is no Holding Wallet / Pool Wallet split. 100% of every claim becomes Available DOM Balance. Mining began at Halving 1 — the highest daily emission ceiling the economy will ever run at — and will step down five more times before settling at its final, lowest ceiling.",
    },
    { type: "heading", id: "why-different", text: "Why it's built differently" },
    {
      type: "keyValueGrid",
      items: [
        { label: "Fixed Supply", value: `${totalSupply}, created once. ${economyConfig.mintingStatus}.` },
        { label: "Six Halvings", value: "Equal 91,666,667 DOM eras, each with a halved daily emission ceiling." },
        { label: "Global Emission Pool", value: "Rewards are a capped, shared pool — more miners divide it, never exceed it." },
        { label: "Instant On-Chain Withdrawal", value: "Automated backend validation and broadcast on BNB Smart Chain, via WalletConnect." },
      ],
    },
    { type: "heading", id: "where-things-stand", text: "Where the ecosystem stands today" },
    {
      type: "tiles",
      items: [
        { label: "Mining Status", value: economyConfig.miningStatus, accent: "emerald" },
        { label: "Withdrawal", value: economyConfig.withdrawalStatus, accent: "emerald" },
        { label: "TGE", value: economyConfig.tgeStatus },
        { label: "Exchange Listing", value: economyConfig.exchangeListingStatus },
      ],
    },
    {
      type: "note",
      text: `This documentation describes the mechanics and economics of ${siteConfig.name} exactly as published on the live site, current as of Economy Rules ${economyConfig.economyVersion} (${economyConfig.economyLastUpdated}), including the parameters the team has explicitly left undecided. It supersedes the retired Pre-TGE / Floor-system and Rank System models — see Version History.`,
    },
  ],
};

export const docsPages: Record<string, DocPage> = {
  token: {
    slug: "token",
    eyebrow: "The Economy — 01",
    title: "Token Overview",
    description: "DOM is the single token of the Dungeon of Miners economy.",
    blocks: [
      {
        type: "lede",
        text: "DOM is the single token of the Dungeon of Miners economy — mined by players and eligible for instant on-chain withdrawal.",
      },
      {
        type: "table",
        headers: ["Property", "Value"],
        rows: [
          ["Ticker", siteConfig.ticker],
          ["Network", withdrawalConfig.network],
          ["Wallet Connector", withdrawalConfig.walletConnector],
          ["Max supply", totalSupply],
          ["Minting", economyConfig.mintingStatus],
          ["Mining status", { text: economyConfig.miningStatus, badge: "live" }],
          ["Withdrawal status", { text: economyConfig.withdrawalStatus, badge: "live" }],
          ["TGE", { text: economyConfig.tgeStatus, badge: "tba" }],
          ["Exchange listing", { text: economyConfig.exchangeListingStatus, badge: "tba" }],
          ["Withdrawal fee", withdrawalConfig.feeLabel],
        ],
      },
      {
        type: "paragraph",
        text: "DOM currently has no guaranteed market value. Mining or holding DOM does not guarantee financial value, profit, or return — see Risk Disclosure.",
      },
    ],
  },

  tokenomics: {
    slug: "tokenomics",
    eyebrow: "The Economy — 02",
    title: "Tokenomics & Allocation",
    description: "1,000,000,000 DOM, split across six fixed allocations. Created once — never minted again.",
    blocks: [
      {
        type: "lede",
        text: `DOM has a fixed maximum supply of ${totalSupply}. The entire supply is created once; minting is permanently disabled after deployment. 55% is allocated directly to mining; the remainder supports liquidity, the team, ecosystem reserves, ecosystem growth, and strategic/public opportunities.`,
      },
      {
        type: "tiles",
        items: supplyFacts.map((f) => ({ label: f.label, value: f.value })),
      },
      { type: "heading", id: "allocations", text: "The six allocations" },
      {
        type: "table",
        headers: ["Allocation", "% of Supply", "DOM"],
        rows: tokenAllocation.map((a) => [
          a.label,
          { text: `${a.percent}%`, align: "right" as const },
          { text: a.amount, align: "right" as const },
        ]),
      },
      {
        type: "list",
        items: tokenAllocation.map((a) => `${a.label} — ${a.description}`),
      },
      { type: "heading", id: "circulation", text: "How DOM enters circulation" },
      {
        type: "paragraph",
        text: "Mining distributes DOM from the fixed 550,000,000 DOM Mining Allocation — it never creates new supply. There is no Holding Wallet / Pool Wallet split: every claim moves 100% of the claimed amount into your Available DOM Balance, which is eligible for on-chain withdrawal in full.",
      },
      {
        type: "linkGrid",
        items: [
          {
            title: "See the live allocation chart",
            description: "The full visual breakdown of the six allocations.",
            href: "/tokenomics",
          },
          {
            title: "Read the independent valuation model",
            description: "Fixed-supply and emission-based scenario analysis — not a price prediction.",
            href: "/docs/valuation-model",
          },
        ],
      },
    ],
  },

  halvings: {
    slug: "halvings",
    eyebrow: "The Economy — 03",
    title: "The Halvings",
    description: "Six equal eras of the mining allocation, each with a halved daily emission ceiling.",
    blocks: [
      {
        type: "lede",
        text: "The 550,000,000 DOM Mining Allocation is split into six equal 91,666,667 DOM eras. Each era carries its own daily global emission ceiling, halved from the previous era — the network's highest ceiling runs at Halving 1, its lowest at Halving 6.",
      },
      {
        type: "callout",
        tone: "gold",
        title: "Halving trigger",
        text: `${halvingTrigger} There is no Halving 7: once Halving 6 is reached, DOM mining runs permanently at its lowest, final emission ceiling.`,
      },
      {
        type: "tiles",
        items: [
          { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
          { label: "Current Era Allocation", value: currentHalving.allocation },
          { label: "Current Emission Ceiling", value: currentHalving.emissionCeiling },
          { label: "Total Halvings", value: String(halvings.length) },
        ],
      },
      { type: "heading", id: "eras", text: "Six eras, one shrinking emission ceiling" },
      {
        type: "table",
        headers: ["Era", "Allocation", "Daily Emission Ceiling", "Status"],
        rows: halvings.map((h) => [
          `H${h.number} · ${h.name}`,
          { text: h.allocation, align: "right" as const },
          { text: h.emissionCeiling, align: "right" as const },
          {
            text: h.status,
            badge: h.status === "CURRENT" ? "live" : h.status === "UPCOMING" ? "gold" : "tba",
          },
        ]),
      },
      {
        type: "note",
        text: "Each era's 91,666,667 DOM allocation (91,666,665 DOM for Halving 6) is a fixed slice of the shared 550,000,000 DOM pool — not a separate, additional supply. The Halving does not multiply an individual miner's rate; it sets the finite global emission ceiling the entire network shares.",
      },
      {
        type: "linkGrid",
        items: [
          {
            title: "Explore the Halving timeline",
            description: "The full visual timeline, Halving status widget, and Halving Ledger.",
            href: "/halving",
          },
        ],
      },
    ],
  },

  "mining-rate": {
    slug: "mining-rate",
    eyebrow: "The Economy — 04",
    title: "Mining Rewards Formula",
    description: "Effective Mining Weight, and the global emission pool it shares.",
    blocks: [
      {
        type: "lede",
        text: "Every miner's reward comes from two layers: a personal Effective Mining Weight, and a network-wide Global Emission Pool that Weight shares from. Neither layer is hidden.",
      },
      { type: "heading", id: "weight", text: "Effective Mining Weight" },
      { type: "formula", text: miningFormula.weightChain.join(" ") },
      {
        type: "note",
        text: "There is no Pickaxe Equipment Multiplier. Pickaxe Base Mining Power is set directly by your Pickaxe Level — see Pickaxe Levels.",
      },
      { type: "heading", id: "worked-example", text: "Worked example" },
      {
        type: "tiles",
        items: [
          ...miningFormula.example.rows.map((r) => ({ label: r.label, value: r.value })),
          { label: miningFormula.example.final.label, value: miningFormula.example.final.value, accent: "gold" as const },
        ],
      },
      { type: "heading", id: "global-emission", text: "Global Emission Model" },
      { type: "formula", text: emissionModel.shareFormula },
      { type: "formula", text: emissionModel.rewardFormula },
      {
        type: "note",
        text: emissionModel.note,
      },
      { type: "heading", id: "boosters", text: "Booster reference" },
      {
        type: "table",
        headers: ["Booster", "Rule"],
        rows: boostRules.map((b) => [b.label, b.value]),
      },
    ],
  },

  "pickaxe-levels": {
    slug: "pickaxe-levels",
    eyebrow: "Player Systems — 05",
    title: "Pickaxe Levels",
    description: "Pickaxe Level 1–6 is the primary mining progression system.",
    blocks: [
      {
        type: "lede",
        text: "Pickaxe Level 1–6 replaces the retired Rank System as the primary progression system. Levels are driven by persistent Mining XP and lifetime activity — never by your current wallet balance, so withdrawing DOM never costs you progress.",
      },
      {
        type: "table",
        headers: ["Level", "Cosmetic Name", "Base Mining Power", "XP Required"],
        rows: pickaxeLevels.map((p) => [
          `Level ${p.level}`,
          p.cosmeticName,
          { text: p.basePower, align: "right" as const },
          p.xpRequired === "TBA" ? { text: "TBA", badge: "tba" as const } : p.xpRequired,
        ]),
      },
      {
        type: "note",
        text: "Base Mining Power sets your share of the network's daily emission — it is not a guaranteed DOM/hour rate (see Mining Rewards Formula). Cosmetic names (Novice → Legend) are optional secondary flavor; the primary system is the numeric Pickaxe Level.",
      },
      {
        type: "callout",
        tone: "gold",
        title: "No Equipment Multiplier",
        text: "Dungeon of Miners does not have a Pickaxe Equipment Multiplier. Each level sets Base Mining Power directly rather than applying an extra multiplicative modifier on top of a base rate.",
      },
    ],
  },

  balances: {
    slug: "balances",
    eyebrow: "Player Systems — 06",
    title: "Mining Storage & Balance",
    description: "Mining Storage → Claim → Available Balance → Withdraw. No wallet split.",
    blocks: [
      {
        type: "lede",
        text: "This replaces the retired Holding Wallet / Pool Wallet / 70:30 split entirely. There is one balance flow, and 100% of every claim becomes spendable and withdrawal-eligible.",
      },
      {
        type: "steps",
        items: balanceModel.steps.map((s) => ({ title: s.label, description: s.description })),
      },
      {
        type: "note",
        text: `Internal accounting states: ${balanceModel.accountingStates.join(" → ")}. ${balanceModel.integrityNote}`,
      },
      { type: "heading", id: "mining-storage", text: "Mining Storage" },
      { type: "paragraph", text: storageRules.description },
      {
        type: "table",
        headers: ["Property", "Value"],
        rows: [
          ["Base storage capacity", { text: storageRules.baseStorage, badge: "tba" }],
          ["Storage upgrade", storageRules.storageUpgrade],
          ["Minimum claim", { text: claimRules.minimumClaim, badge: "tba" }],
          ["Claim cooldown", { text: claimRules.claimCooldown, badge: "tba" }],
          ["Maximum claim", { text: claimRules.maximumClaim, badge: "tba" }],
        ],
      },
      { type: "note", text: claimRules.note },
    ],
  },

  withdrawal: {
    slug: "withdrawal",
    eyebrow: "Player Systems — 07",
    title: "On-Chain Withdrawal",
    description: "Mine DOM. Withdraw on-chain, instantly.",
    blocks: [
      {
        type: "lede",
        text: "All of your Available DOM Balance is eligible for withdrawal — there is no separate locked portion. Withdrawal is instant: the backend automatically validates and broadcasts the transaction, with no manual approval queue.",
      },
      {
        type: "tiles",
        items: [
          { label: "Withdrawal fee", value: `${withdrawalConfig.feeDom} DOM` },
          { label: "Network fee", value: withdrawalConfig.networkFeeLabel, accent: "emerald" },
          { label: "Network", value: withdrawalConfig.network },
          { label: "Wallet Connector", value: withdrawalConfig.walletConnector },
        ],
      },
      {
        type: "note",
        text: "Zero fee describes what the miner pays, not the blockchain itself — BNB Smart Chain still has a real transaction cost, which the ecosystem covers on the miner's behalf.",
      },
      { type: "heading", id: "withdrawal-flow", text: "Withdrawal flow" },
      {
        type: "steps",
        items: [
          { title: `Connect a BEP20 wallet via ${withdrawalConfig.walletConnector}` },
          { title: "Enter withdrawal amount" },
          { title: "Server validates your Available Balance" },
          { title: "Confirm withdrawal" },
          { title: "Backend automatically validates and broadcasts the transaction" },
          { title: "Transaction hash + block explorer link returned" },
          { title: "Status tracked to Confirmed" },
        ],
      },
      { type: "heading", id: "status", text: "Status is always shown honestly" },
      {
        type: "badgeRow",
        items: withdrawalConfig.statuses.map((s) => ({
          label: s,
          tone: (s === "Confirmed" || s === "Broadcasted"
            ? "live"
            : s === "Failed"
              ? "warn"
              : "gold") as DocBadgeTone,
        })),
      },
      {
        type: "note",
        text: withdrawalConfig.instantNote,
      },
      {
        type: "paragraph",
        text: "Withdrawal validation is always server-authoritative — the frontend never decides the final withdrawable amount. Balances move through availableBalance → pendingWithdrawal → withdrawnBalance with atomic database transactions, so one reward can never be withdrawn twice.",
      },
      { type: "heading", id: "network-config", text: "Network configuration" },
      {
        type: "table",
        headers: ["Property", "Value"],
        rows: [
          ["Network", withdrawalConfig.network],
          ["Wallet Connector", withdrawalConfig.walletConnector],
          ["DOM contract", { text: withdrawalConfig.domContractAddress, badge: "tba" }],
          ["Block explorer", { text: withdrawalConfig.blockExplorerUrl, badge: "tba" }],
          ["Minimum withdrawal", { text: withdrawalConfig.minimumWithdrawal, badge: "tba" }],
          ["Maximum withdrawal", { text: withdrawalConfig.maximumWithdrawal, badge: "tba" }],
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Wallet safety",
        text: "Dungeon of Miners never asks for your seed phrase, private key, or recovery phrase — for any reason, on any channel.",
      },
    ],
  },

  guilds: {
    slug: "guilds",
    eyebrow: "Player Systems — 08",
    title: "Guilds",
    description: "Telegram-community-based guilds, with a tiered activity booster.",
    blocks: [
      {
        type: "lede",
        text: "A Guild binds one Telegram Group or Supergroup to a shared mining team of up to 30 miners. The connection is anchored to the group's permanent telegram_chat_id, not a mutable @username.",
      },
      {
        type: "tiles",
        items: guildStats.map((s) => ({ label: s.label, value: s.value })),
      },
      { type: "heading", id: "creation", text: "Guild creation flow" },
      {
        type: "steps",
        items: guildCreationFlow.map((step) => ({ title: step })),
      },
      { type: "heading", id: "roles", text: "Roles & rules" },
      {
        type: "table",
        headers: ["Property", "Value"],
        rows: [
          ["Roles", guildConfig.roles.join(", ")],
          ["Actions", "Join, leave, transfer ownership, kick member"],
          ...guildRuleDetails.map((r) => [r.label, r.value === "TBA" ? { text: r.value, badge: "tba" as const } : r.value]),
        ],
      },
      { type: "heading", id: "booster", text: "Guild Booster — tiered, never unlimited" },
      {
        type: "table",
        headers: ["Active Members", "Mining Weight Bonus"],
        rows: guildBoosterTiers.map((t) => [
          `${t.activeThreshold}%+ active`,
          { text: `+${t.weightBonus}%`, align: "right" as const },
        ]),
      },
      {
        type: "note",
        text: "Recalculated daily. Empty or inactive guilds earn no booster. The Guild Booster modifies mining weight only — it never creates additional DOM beyond the global emission ceiling.",
      },
    ],
  },

  referral: {
    slug: "referral",
    eyebrow: "Player Systems — 09",
    title: "Referral Booster",
    description: "A capped mining-weight boost — not revenue sharing, not a payout.",
    blocks: [
      {
        type: "lede",
        text: "Inviting active miners raises your own Effective Mining Weight. It is capped, tied to activity, and never framed as revenue sharing.",
      },
      {
        type: "tiles",
        items: [
          { label: "Per active referral", value: `+${referralBooster.weightPerActiveReferral}% Weight` },
          { label: "Cap", value: `${referralBooster.maxQualifiedReferrals} referrals (+${referralBooster.maxBoostPercent}%)` },
          { label: "Starter Boost", value: `+${referralBooster.starterBoost.percent}% for ${referralBooster.starterBoost.durationHours}h`, accent: "emerald" },
          { label: "Qualification", value: "3 active days" },
        ],
      },
      { type: "heading", id: "qualification", text: "How a referral qualifies" },
      { type: "list", items: referralBooster.qualificationRules },
      { type: "heading", id: "milestones", text: "Milestones" },
      {
        type: "badgeRow",
        items: referralBooster.milestones.map((m) => ({ label: `${m} Qualified Miner${m > 1 ? "s" : ""}`, tone: "gold" as const })),
      },
      {
        type: "note",
        text: "Milestones unlock badges, cosmetics, and titles — never additional uncapped DOM rewards.",
      },
      { type: "heading", id: "statuses", text: "Referral status lifecycle" },
      {
        type: "badgeRow",
        items: referralBooster.statuses.map((s) => ({
          label: s,
          tone: (s === "Active" || s === "Qualified" ? "live" : s === "Flagged" || s === "Invalidated" ? "warn" : "tba") as DocBadgeTone,
        })),
      },
      {
        type: "callout",
        tone: "gold",
        text: "Referral ownership is immutable after successful attribution — a referred account cannot switch referrers later. Every qualification event is idempotent: the same referral is never credited twice.",
      },
      {
        type: "note",
        text: "Self-referrals, automated accounts, and multi-account farming are not allowed and can invalidate rewards — see the Fair Play Policy, whose exact detection logic is intentionally not published.",
      },
    ],
  },

  activities: {
    slug: "activities",
    eyebrow: "Player Systems — 10",
    title: "Mining Activities",
    description: "Mining is live — here's how to build your position.",
    blocks: [
      {
        type: "lede",
        text: "Beyond idle mining, these ongoing activities build a miner's profile, Mining XP, and boosters.",
      },
      {
        type: "list",
        items: [
          "Miner Profile — set up your profile and start tracking your mining progress.",
          "Delver Badges — earn permanent badges tied to milestones and Halving eras.",
          "Daily Check-In — stay active every day to keep your streak and bonuses going.",
          "Referrals — invite active miners to grow your Referral Booster.",
          "Guild Registration — connect your Telegram community and coordinate daily expeditions.",
          "Daily Tasks — complete community missions and objectives.",
        ],
      },
      {
        type: "note",
        text: "The Leaderboard ranks players by total DOM mined, current mining weight, Pickaxe Level, current Halving, and guild contribution — never by exposing private wallet balances, and never with placeholder or fake entries.",
      },
    ],
  },

  features: {
    slug: "features",
    eyebrow: "Player Systems — 11",
    title: "Full Feature List",
    description: "Only real, current, or confirmed-planned systems — organized by group.",
    blocks: featureGroups.flatMap((group): import("./docsBlocks").DocBlock[] => [
      { type: "heading" as const, id: group.group.toLowerCase().replace(/\s+/g, "-"), text: group.group },
      {
        type: "table" as const,
        headers: ["Feature", "Description"],
        rows: group.items.map((f) => [f.title, f.description]),
      },
    ]),
  },

  transparency: {
    slug: "transparency",
    eyebrow: "Trust & Policy — 12",
    title: "Transparency Commitments",
    description: "We tell you exactly where DOM stands today.",
    blocks: [
      {
        type: "lede",
        text: "Dungeon of Miners is a live mining economy with real, instant on-chain withdrawal. That's stated clearly, everywhere it matters, so expectations stay accurate.",
      },
      {
        type: "table",
        headers: ["Economy Record", "Value"],
        rows: [
          ["Economy version", economyConfig.economyVersion],
          ["Last updated", economyConfig.economyLastUpdated],
          ["Total supply", totalSupply],
          ["Minting", economyConfig.mintingStatus],
          ["Mining allocation", MINING_ALLOCATION_DOM],
          ["Current Halving", `${economyConfig.currentHalving} of ${halvings.length}`],
          ["Mining status", { text: economyConfig.miningStatus, badge: "live" }],
          ["Withdrawal status", { text: economyConfig.withdrawalStatus, badge: "live" }],
          ["TGE", { text: economyConfig.tgeStatus, badge: "tba" }],
          ["Exchange listing", { text: economyConfig.exchangeListingStatus, badge: "tba" }],
        ],
      },
      { type: "heading", id: "commitments", text: "Stated commitments" },
      {
        type: "list",
        items: [
          "Eligible DOM withdrawals are broadcast on-chain with a real transaction hash and a block explorer link.",
          "Every withdrawal request shows its real status — Processing, Broadcasted, Confirmed, or Failed — never a vague placeholder.",
          "No manufactured transaction proofs, no fabricated hashes, no fake payout screenshots — ever.",
          "No placeholder or fake leaderboard entries — live mining totals and rankings render only once the connected backend is live.",
          "No TGE date, exchange name, listing date, opening price, market cap, or liquidity amount is published until officially confirmed.",
          "Mining or holding DOM does not guarantee financial value or profit. Dungeon of Miners does not promise price appreciation, exchange listing, or guaranteed liquidity — stated plainly, not buried in terms.",
        ],
      },
      {
        type: "note",
        text: "A permanent Halving Archive will preserve every completed era's history — duration, DOM mined, participating miners, top guild — once the first Halving closes.",
      },
    ],
  },

  "fair-play": {
    slug: "fair-play",
    eyebrow: "Trust & Policy — 13",
    title: "Fair Play Policy",
    description: "Protecting a shared, finite supply.",
    blocks: [
      {
        type: "lede",
        text: "Because every player mines against the same capped allocation, abuse by one miner is a direct cost to everyone else in the economy.",
      },
      { type: "heading", id: "not-allowed", text: "Not allowed" },
      { type: "list", items: fairPlay.notAllowed },
      { type: "heading", id: "possible-actions", text: "Possible actions" },
      { type: "list", items: fairPlay.possibleActions },
      {
        type: "note",
        text: "Exact detection logic is not published, by design — publishing it would only help players work around it.",
      },
      {
        type: "linkGrid",
        items: [
          {
            title: "Read the full Fair Play page",
            description: "The player-facing version of this policy.",
            href: "/fair-play",
          },
        ],
      },
    ],
  },

  "risk-disclosure": {
    slug: "risk-disclosure",
    eyebrow: "Trust & Policy — 14",
    title: "Risk Disclosure",
    description: "Read this before you participate.",
    blocks: [
      { type: "callout", tone: "danger", text: riskDisclosure },
      {
        type: "note",
        text: "Numerous parameters in this documentation — the DOM contract address, XP thresholds, claim limits, guild creation cost, minimum/maximum withdrawal, and the exact Halving trigger timing — are marked TBA because they are genuinely undecided at the time of writing, not omitted. Treat any figure not marked TBA as the current published rule, and any TBA field as subject to change before it is finalized and announced.",
      },
    ],
  },

  roadmap: {
    slug: "roadmap",
    eyebrow: "Reference — 15",
    title: "Roadmap",
    description: "Qualitative phases, not marketing dates.",
    blocks: [
      {
        type: "lede",
        text: "No phase carries a promised date — the stated preference is to ship a phase late rather than promise a date that can't be honestly kept.",
      },
      ...roadmap.flatMap((p): import("./docsBlocks").DocBlock[] => {
        const label =
          p.status === "done"
            ? "Live"
            : p.status === "active"
              ? "In Progress"
              : p.status === "comingSoon"
                ? "Coming Soon"
                : p.status === "future"
                  ? "Future"
                  : "Planned";
        const tone: DocBadgeTone =
          p.status === "done" ? "live" : p.status === "active" ? "gold" : p.status === "comingSoon" ? "tba" : "planned";
        return [
          { type: "heading" as const, id: p.phase.toLowerCase().replace(/\s+/g, "-"), text: `${p.phase} — ${p.title}` },
          { type: "badgeRow" as const, items: [{ label, tone }] },
          { type: "list" as const, items: p.items },
        ];
      }),
    ],
  },

  changelog: {
    slug: "changelog",
    eyebrow: "Reference — 16",
    title: "Version History",
    description: "What changed, and why.",
    blocks: [
      {
        type: "lede",
        text: "Dungeon of Miners publishes its economy rules with a version number and a changelog — including when a prior model is retired outright.",
      },
      ...economyChangelog.flatMap((v): import("./docsBlocks").DocBlock[] => [
        {
          type: "heading" as const,
          id: `economy-${v.version.replace(/\W+/g, "")}`,
          text: `Economy ${v.version} — ${v.date}`,
        },
        { type: "paragraph" as const, text: v.summary },
        ...("changes" in v && v.changes ? [{ type: "list" as const, items: v.changes }] : []),
      ]),
    ],
  },

  "valuation-model": {
    slug: "valuation-model",
    eyebrow: "Reference — 17",
    title: "Tokenomics & Valuation Model",
    description: "An independent, illustrative analysis — not an official specification, not investment advice, not a price prediction.",
    blocks: [
      {
        type: "badgeRow",
        items: [{ label: "Illustrative Only · Not Investment Advice", tone: "tba" }],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Can DOM be given a fair value today?",
        text: "No — not with any real precision, and any document claiming otherwise should be treated with suspicion. DOM has no live market: the exact Halving trigger timing and several network parameters remain TBA, no exchange listing exists, and TGE status is Coming Soon. What follows is a scenario model built on the fixed, disclosed supply mechanics — not a price prediction.",
      },
      { type: "heading", id: "methodology", text: "Methodology — disclosed vs. TBA" },
      {
        type: "list",
        items: [
          "Disclosed — taken directly from Dungeon of Miners' published Economy Rules v3.0: total supply, the six allocations, the six Halving allocations and emission ceilings, Pickaxe base mining power, and booster caps.",
          "TBA — officially undisclosed by the project itself: exact Halving trigger timing, DOM contract address, minimum/maximum withdrawal, and listing venue/timing. No number is invented to fill these gaps.",
        ],
      },
      { type: "heading", id: "supply", text: "Fixed supply, not inflation" },
      {
        type: "tiles",
        items: supplyFacts.map((f) => ({ label: f.label, value: f.value })),
      },
      {
        type: "note",
        text: "There is no scenario in this model where total supply exceeds 1,000,000,000 DOM. Mining distributes the pre-allocated 550,000,000 DOM Mining Allocation — it is never token creation.",
      },
      { type: "heading", id: "emission-schedule", text: "Emission schedule across six Halvings" },
      {
        type: "table",
        headers: ["Era", "Allocation", "Daily Emission Ceiling", "Illustrative Duration at Ceiling"],
        rows: [
          ["H1 · Starting Era", { text: "91,666,667 DOM", align: "right" }, { text: "1,000,000 DOM/day", align: "right" }, { text: "≈ 91.7 days", align: "right" }],
          ["H2 · First Reduction", { text: "91,666,667 DOM", align: "right" }, { text: "500,000 DOM/day", align: "right" }, { text: "≈ 183.3 days", align: "right" }],
          ["H3 · Deep Mining", { text: "91,666,667 DOM", align: "right" }, { text: "250,000 DOM/day", align: "right" }, { text: "≈ 366.7 days", align: "right" }],
          ["H4 · Scarcity Era", { text: "91,666,667 DOM", align: "right" }, { text: "125,000 DOM/day", align: "right" }, { text: "≈ 733.3 days", align: "right" }],
          ["H5 · Last Vein", { text: "91,666,667 DOM", align: "right" }, { text: "62,500 DOM/day", align: "right" }, { text: "≈ 1,466.7 days", align: "right" }],
          ["H6 · Final Depth", { text: "91,666,665 DOM", align: "right" }, { text: "31,250 DOM/day", align: "right" }, { text: "≈ 2,933.3 days", align: "right" }],
        ],
      },
      {
        type: "note",
        text: "Illustrative Duration assumes every era's daily emission ceiling is fully claimed every single day — a theoretical upper bound, not a forecast. In practice a Halving advances only once its era's allocation is fully distributed, which depends on real network activity. Total theoretical emission lifecycle at these ceilings is roughly 5,775 days (≈ 15.8 years).",
      },
      { type: "heading", id: "emission-pool", text: "Why 1,000,000 users can't out-mine the pool" },
      { type: "formula", text: emissionModel.shareFormula },
      { type: "formula", text: emissionModel.rewardFormula },
      {
        type: "note",
        text: "Referral, Guild, and event boosters change how the emission pool is split between miners — they never change the size of the pool. 10 miners, 10,000 miners, or 1,000,000 miners all divide the same finite daily ceiling.",
      },
      { type: "heading", id: "value-drivers", text: "Value driver assessment" },
      {
        type: "table",
        headers: ["Driver", "Status", "Note"],
        rows: [
          ["Buyback / burn mechanism", { text: "TBA", badge: "tba" }, "Not mentioned in published Economy Rules or Roadmap."],
          ["Utility sink (in-game spend)", { text: "Yes", badge: "good" }, "Available Balance DOM is spent on upgrades, guild costs, and Stone Breaker."],
          ["Staking", { text: "Planned", badge: "planned" }, "Roadmap Phase 5/6 lists ecosystem utilities — no rate or lockup published yet."],
          ["Liquidity provisioning", { text: "Allocated", badge: "good" }, "10% of supply (100,000,000 DOM) earmarked — deployment timing and venue are TBA."],
          ["TGE / Market launch", { text: "Coming Soon", badge: "tba" }, "No date has been set. Announced only through official Dungeon of Miners channels."],
          ["Exchange listing", { text: "Coming Soon", badge: "tba" }, "No venue or date confirmed. No promise of guaranteed liquidity."],
        ],
      },
      { type: "heading", id: "dilution-risk", text: "Dilution & vesting" },
      {
        type: "list",
        items: [
          "450,000,000 DOM (Liquidity, Team, Treasure & Reserve, Ecosystem, Public/Strategic — 45% of total supply) has no published vesting schedule at the time of writing.",
          "The Mining Allocation (55%) is the only allocation with a disclosed release mechanism: the six-Halving emission schedule above.",
        ],
      },
      { type: "heading", id: "key-unknowns", text: "Key unknowns" },
      {
        type: "list",
        items: [
          "Exact Halving trigger timing — depends on real network mining activity, not a fixed date.",
          "Vesting schedule for the 450M non-mining allocation.",
          "TGE date and exchange listing venue/timing.",
          "Active miner count — sets the realistic per-miner emission share; currently unbounded from public data.",
          "DOM contract address and block explorer — published only once deployed.",
        ],
      },
      { type: "heading", id: "disclaimer", text: "Disclaimer" },
      {
        type: "callout",
        tone: "danger",
        text: "This page is an illustrative analytical model, not investment advice. Every figure is either taken directly from published Economy Rules v3.0 or explicitly marked TBA. Nothing here is a price prediction, a price target, or a guarantee of any kind. DOM has no live market, no guaranteed exchange listing, and mining or holding it does not guarantee financial value or profit.",
      },
    ],
  },
};

export const docsAllSlugs = Object.keys(docsPages);
