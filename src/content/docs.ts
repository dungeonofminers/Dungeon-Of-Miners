// ---------------------------------------------------------------------------
// Documentation content — the /docs GitBook-style reference. This is the
// dense, reference-manual counterpart to the marketing pages: it restates
// the same facts already centralized in site.ts (never new numbers) in a
// sidebar-navigated, section-by-section format.
//
// Source material: the Dungeon of Miners Whitepaper (Economy Rules v2.0) and
// the companion "DOM Tokenomics & Valuation Model" analysis supplied by the
// team. Every figure below traces back to an existing site.ts export — this
// file adds structure and prose, not new data.
// ---------------------------------------------------------------------------

import type { DocBadgeTone, DocPage, DocsNavCategory } from "./docsBlocks";
import {
  siteConfig,
  totalSupply,
  MINING_ALLOCATION_DOM,
  halvingTrigger,
  economyConfig,
  halvings,
  tokenAllocation,
  miningFormula,
  boostRules,
  storageRules,
  claimRules,
  ranks,
  withdrawalConfig,
  fairPlay,
  guildRuleDetails,
  guildStats,
  features,
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
      { slug: "mining-rate", title: "Mining Rate Formula" },
    ],
  },
  {
    title: "Player Systems",
    items: [
      { slug: "ranks", title: "Rank System" },
      { slug: "wallets", title: "Wallets & Storage" },
      { slug: "withdrawal", title: "On-Chain Withdrawal" },
      { slug: "guilds", title: "Guilds" },
      { slug: "referral", title: "Referral Program" },
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
  title: "A mining economy built around real scarcity",
  description: `${siteConfig.name} is a live mining ecosystem powered by a fixed supply of ${totalSupply}.`,
  blocks: [
    {
      type: "lede",
      text: `Players mine idly, upgrade equipment, build guilds, and advance through six Halving eras that progressively cut mining emissions as the shared supply is mined — and, unlike most Telegram idle-mining games, eligible DOM can be withdrawn directly to an on-chain wallet today.`,
    },
    {
      type: "paragraph",
      text: `Every claim splits automatically between a rank-defining Holding Wallet (${economyConfig.claimSplit.holding}%) and a spendable, withdrawal-eligible Pool Wallet (${economyConfig.claimSplit.pool}%). Mining began at Halving 1 — the highest emission rate the economy will ever run at — and will step down five more times before settling at its final, lowest rate.`,
    },
    { type: "heading", id: "why-different", text: "Why it's built differently" },
    {
      type: "keyValueGrid",
      items: [
        { label: "Finite Supply", value: `Only ${totalSupply} will ever exist. Every claim brings the network closer to full emission.` },
        { label: "Six Halvings", value: "Mining emissions decrease as the ecosystem advances through six Halving eras." },
        { label: "On-Chain Withdrawal", value: "Withdraw eligible DOM directly to your wallet — a real on-chain transaction, tracked to confirmation." },
        { label: "Zero Withdrawal Fee", value: "No withdrawal fee is charged to miners. Network transaction costs are sponsored by the ecosystem." },
      ],
    },
    { type: "heading", id: "where-things-stand", text: "Where the ecosystem stands today" },
    {
      type: "tiles",
      items: [
        { label: "Mining Status", value: economyConfig.miningStatus, accent: "emerald" },
        { label: "Current Halving", value: `H${currentHalving.number} · ${currentHalving.name}` },
        { label: "Current Multiplier", value: currentHalving.multiplier },
        { label: "Withdrawal", value: "On-Chain · Zero Fee" },
      ],
    },
    {
      type: "note",
      text: `This documentation describes the mechanics and economics of ${siteConfig.name} exactly as published on the live site, current as of Economy Rules ${economyConfig.economyVersion} (${economyConfig.economyLastUpdated}), including the parameters the team has explicitly left undecided. It supersedes the original Pre-TGE / Floor-system model, which has been formally retired — see Version History.`,
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
        text: "DOM is the single token of the Dungeon of Miners economy — mined by players, ranked by holding, and eligible for on-chain withdrawal.",
      },
      {
        type: "table",
        headers: ["Property", "Value"],
        rows: [
          ["Ticker", siteConfig.ticker],
          ["Network", { text: "TBA", badge: "tba" }],
          ["Max supply", totalSupply],
          ["Mining status", { text: economyConfig.miningStatus, badge: "live" }],
          ["Withdrawal fee", withdrawalConfig.feeLabel],
        ],
      },
      {
        type: "paragraph",
        text: "Dungeon of Miners no longer uses a Pre-TGE mining model. DOM currently has no guaranteed market value, and mining it does not guarantee financial value or profit — see Risk Disclosure.",
      },
    ],
  },

  tokenomics: {
    slug: "tokenomics",
    eyebrow: "The Economy — 02",
    title: "Tokenomics & Allocation",
    description: "1,000,000,000 DOM, split across six fixed allocations.",
    blocks: [
      {
        type: "lede",
        text: `DOM has a fixed maximum supply of ${totalSupply}. 55% is allocated directly to mining and community rewards; the remainder supports liquidity, the team, ecosystem reserves, ecosystem growth, and strategic/public opportunities.`,
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
        type: "keyValueGrid",
        items: [
          { label: "Holding Wallet", value: `${economyConfig.claimSplit.holding}% of every claim` },
          { label: "Pool Wallet", value: `${economyConfig.claimSplit.pool}% of every claim` },
        ],
      },
      {
        type: "callout",
        tone: "gold",
        title: "Transparency note",
        text: "Today, only the Pool Wallet's 30% share is eligible for on-chain withdrawal — the Holding Wallet's 70% share is a rank-progression balance, not a withdrawable one. This split is under active review now that on-chain withdrawal is live; the team will announce clearly, here and in the Mini App, if the rule changes.",
      },
      {
        type: "linkGrid",
        items: [
          {
            title: "See the live allocation chart",
            description: "The full visual breakdown with the Pool/Holding split explainer.",
            href: "/tokenomics",
          },
          {
            title: "Read the independent valuation model",
            description: "Scenario-based supply, emission, and market-cap sensitivity analysis.",
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
    description: "Six eras of progressively lower mining emissions.",
    blocks: [
      {
        type: "lede",
        text: "DOM mining runs at its highest emission rate during Halving 1. As the network advances through six Halving eras, mining emissions progressively decrease, making every new DOM harder to extract — the deeper the ecosystem goes, the scarcer the rewards become.",
      },
      {
        type: "callout",
        tone: "gold",
        title: "Halving trigger",
        text: `${halvingTrigger}. The exact condition that advances the economy from one Halving era to the next has not yet been published. There is no Halving 7: once Halving 6 is reached, DOM mining runs permanently at its lowest, final emission rate.`,
      },
      {
        type: "tiles",
        items: [
          { label: "Mining Allocation", value: MINING_ALLOCATION_DOM },
          { label: "Current Multiplier", value: currentHalving.multiplier },
          { label: "Total Halvings", value: "6" },
          { label: "Mining Status", value: economyConfig.miningStatus, accent: "emerald" },
        ],
      },
      { type: "heading", id: "eras", text: "Six eras, one decreasing emission rate" },
      {
        type: "table",
        headers: ["Era", "Multiplier", "Status"],
        rows: halvings.map((h) => [
          `H${h.number} · ${h.name}`,
          { text: h.multiplier, align: "right" as const },
          {
            text: h.status,
            badge:
              h.status === "CURRENT" ? "live" : h.status === "UPCOMING" ? "gold" : "tba",
          },
        ]),
      },
      {
        type: "note",
        text: `The ${MINING_ALLOCATION_DOM} Mining Allocation is one shared pool drawn down across all six Halving eras — it is not split into six separate per-era allocations the way the retired Floor system was.`,
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
    title: "Mining Rate Formula",
    description: "Every miner's hourly rate is the product of six factors.",
    blocks: [
      {
        type: "lede",
        text: "None of the factors below are hidden — they stack in one visible formula.",
      },
      { type: "formula", text: miningFormula.chain.join(" ") },
      { type: "heading", id: "worked-example", text: "Worked example" },
      {
        type: "tiles",
        items: [
          ...miningFormula.example.rows.map((r) => ({ label: r.label, value: r.value })),
          { label: miningFormula.example.final.label, value: miningFormula.example.final.value, accent: "gold" as const },
        ],
      },
      { type: "heading", id: "multiplier-reference", text: "Multiplier reference" },
      {
        type: "table",
        headers: ["Factor", "Rule"],
        rows: boostRules.map((b) => [
          b.label,
          b.value === "TBA" ? { text: "TBA", badge: "tba" as const } : b.value,
        ]),
      },
    ],
  },

  ranks: {
    slug: "ranks",
    eyebrow: "Player Systems — 05",
    title: "Rank System",
    description: "Rank is set entirely by the balance sitting in a player's Holding Wallet.",
    blocks: [
      {
        type: "lede",
        text: "Rank is set entirely by the balance sitting in a player's Holding Wallet — not by luck, spend, or a gacha roll. Reaching a threshold permanently raises the base mining rate.",
      },
      {
        type: "table",
        headers: ["Rank", "Holding required", "Base rate"],
        rows: ranks.map((r) => [
          r.name,
          { text: r.holding, align: "right" as const },
          { text: r.rate, align: "right" as const },
        ]),
      },
      {
        type: "note",
        text: "Rank downgrade policy, and whether a rank once reached is permanent, are both explicitly undecided — the team won't publish a rule here until it's final.",
      },
      {
        type: "badgeRow",
        items: [
          { label: "Rank downgrade — TBA", tone: "tba" },
          { label: "Permanent rank — TBA", tone: "tba" },
        ],
      },
    ],
  },

  wallets: {
    slug: "wallets",
    eyebrow: "Player Systems — 06",
    title: "Wallets & Storage",
    description: "Two wallets, one purpose each.",
    blocks: [
      {
        type: "lede",
        text: "Every claim is split automatically the instant it lands, so ranking up and spending never compete for the same balance.",
      },
      {
        type: "keyValueGrid",
        items: [
          {
            label: `Holding Wallet — ${economyConfig.claimSplit.holding}%`,
            value: "Determines rank. Not itself withdrawable on-chain — this is long-term commitment supply.",
          },
          {
            label: `Pool Wallet — ${economyConfig.claimSplit.pool}%`,
            value: "Spendable balance. Used for upgrades, guild costs, Stone Breaker rounds, and eligible for on-chain withdrawal.",
          },
        ],
      },
      { type: "heading", id: "mining-storage", text: "Mining storage" },
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
    ],
  },

  withdrawal: {
    slug: "withdrawal",
    eyebrow: "Player Systems — 07",
    title: "On-Chain Withdrawal",
    description: "Mine DOM. Withdraw on-chain.",
    blocks: [
      {
        type: "lede",
        text: "Eligible DOM balances — the Pool Wallet's share — can be requested for withdrawal directly to a connected wallet.",
      },
      {
        type: "tiles",
        items: [
          { label: "Withdrawal fee", value: `${withdrawalConfig.feeDom} DOM` },
          { label: "Gas cost to miner", value: withdrawalConfig.gasSponsorLabel, accent: "emerald" },
          { label: "Network", value: withdrawalConfig.network },
          { label: "DOM contract", value: withdrawalConfig.domContractAddress },
        ],
      },
      {
        type: "note",
        text: "Zero fee describes what the miner pays, not the blockchain itself — the network still has a real transaction cost, which the ecosystem covers on the miner's behalf.",
      },
      { type: "heading", id: "withdrawal-flow", text: "Withdrawal flow" },
      {
        type: "steps",
        items: [
          { title: "Connect wallet" },
          { title: "Enter withdrawal amount" },
          { title: "Server validates eligible balance" },
          { title: "Confirm withdrawal" },
          { title: "Backend creates withdrawal request" },
          { title: "Approved request is broadcast on-chain" },
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
              : s === "Processing"
                ? "gold"
                : "tba") as DocBadgeTone,
        })),
      },
      {
        type: "paragraph",
        text: "Withdrawal approval is always server-authoritative — the frontend never decides the final withdrawable amount. Balances move through available → pendingWithdrawal → withdrawn with atomic database transactions to prevent duplicate withdrawals.",
      },
      { type: "heading", id: "network-config", text: "Network configuration" },
      {
        type: "table",
        headers: ["Property", "Value"],
        rows: [
          ["Network", { text: withdrawalConfig.network, badge: "tba" }],
          ["DOM contract", { text: withdrawalConfig.domContractAddress, badge: "tba" }],
          ["Block explorer", { text: withdrawalConfig.blockExplorerUrl, badge: "tba" }],
          ["Minimum withdrawal", { text: withdrawalConfig.minimumWithdrawal, badge: "tba" }],
          ["Maximum withdrawal", { text: withdrawalConfig.maximumWithdrawal, badge: "tba" }],
        ],
      },
    ],
  },

  guilds: {
    slug: "guilds",
    eyebrow: "Player Systems — 08",
    title: "Guilds",
    description: "No one mines alone.",
    blocks: [
      {
        type: "lede",
        text: "Guilds hold up to thirty delvers who coordinate a Daily Expedition: if 60% or more of the guild claims that day, every member's mining rate gets a hashrate bonus for the day.",
      },
      {
        type: "tiles",
        items: guildStats.map((s) => ({ label: s.label, value: s.value })),
      },
      {
        type: "table",
        headers: ["Property", "Value"],
        rows: [
          ["Roles", "Guild Owner, Guild Officer"],
          ["Actions", "Join, leave, transfer ownership, kick member"],
          ...guildRuleDetails.map((r) => [r.label, { text: r.value, badge: "tba" as const }]),
        ],
      },
    ],
  },

  referral: {
    slug: "referral",
    eyebrow: "Player Systems — 09",
    title: "Referral Program",
    description: "A hashrate boost, not a payout.",
    blocks: [
      {
        type: "lede",
        text: "Inviting miners raises a player's own mining rate — it is explicitly not framed as revenue sharing.",
      },
      {
        type: "tiles",
        items: [
          { label: "Per referral", value: "+2% hashrate" },
          { label: "Cap", value: "50 referrals (+100%)" },
          { label: "Invitee bonus", value: "+50 DOM", accent: "emerald" },
          { label: "Qualification", value: "Claims on 3 different days" },
        ],
      },
      {
        type: "note",
        text: "Self-referrals, automated accounts, and multi-account farming invalidate rewards and fall under the Fair Play Policy, whose exact detection logic is intentionally not published.",
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
        text: "Beyond idle mining, these ongoing activities build a miner's profile, badges, and hashrate bonuses.",
      },
      {
        type: "list",
        items: [
          "Miner Profile — set up your profile and start tracking your mining progress.",
          "Delver Badges — earn permanent badges tied to milestones and Halving eras.",
          "Daily Check-In — stay active every day to keep your streak and bonuses going.",
          "Referrals — invite miners and grow your network.",
          "Guild Registration — create or join a guild and coordinate daily expeditions.",
          "Daily Tasks — complete community missions and objectives.",
        ],
      },
      {
        type: "note",
        text: "The Leaderboard ranks players by total DOM mined, current mining rate, rank, current Halving, and guild contribution — never by exposing private wallet balances, and never with placeholder or fake entries.",
      },
    ],
  },

  features: {
    slug: "features",
    eyebrow: "Player Systems — 11",
    title: "Full Feature List",
    description: "The full progression loop, in one reference table.",
    blocks: [
      {
        type: "lede",
        text: "Mining, upgrades, a mini-game, daily tasks, and social play — all connected to the same shared economy.",
      },
      {
        type: "table",
        headers: ["Feature", "Description"],
        rows: features.map((f) => [f.title, f.description]),
      },
    ],
  },

  transparency: {
    slug: "transparency",
    eyebrow: "Trust & Policy — 12",
    title: "Transparency Commitments",
    description: "We tell you exactly where DOM stands today.",
    blocks: [
      {
        type: "lede",
        text: "Dungeon of Miners is a live mining economy with real on-chain withdrawal. That's stated clearly, everywhere it matters, so expectations stay accurate.",
      },
      {
        type: "table",
        headers: ["Economy Record", "Value"],
        rows: [
          ["Economy version", economyConfig.economyVersion],
          ["Last updated", economyConfig.economyLastUpdated],
          ["Total supply", totalSupply],
          ["Mining allocation", MINING_ALLOCATION_DOM],
          ["Current Halving", `${economyConfig.currentHalving} of ${halvings.length}`],
          ["Mining status", { text: economyConfig.miningStatus, badge: "live" }],
        ],
      },
      { type: "heading", id: "commitments", text: "Stated commitments" },
      {
        type: "list",
        items: [
          "Eligible DOM withdrawals are broadcast on-chain with a real transaction hash and a block explorer link.",
          "Every withdrawal request shows its real status — Pending, Processing, Broadcasted, Confirmed, or Failed — never a vague placeholder.",
          "No manufactured transaction proofs, no fabricated hashes, no fake payout screenshots — ever.",
          "No placeholder or fake leaderboard entries — live mining totals and rankings render only once the connected backend is live.",
          "Mining DOM does not guarantee financial value or profit. Dungeon of Miners does not promise price appreciation, exchange listing, or guaranteed liquidity — stated plainly, not buried in terms.",
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
        text: "Numerous parameters in this documentation — the network, contract address, equipment multipliers, claim limits, guild costs, and the Halving trigger itself — are marked TBA because they are genuinely undecided at the time of writing, not omitted. Treat any figure not marked TBA as the current published rule, and any TBA field as subject to change before it is finalized and announced.",
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
      ...roadmap.flatMap((p): import("./docsBlocks").DocBlock[] => [
        { type: "heading" as const, id: p.phase.toLowerCase().replace(/\s+/g, "-"), text: `${p.phase} — ${p.title}` },
        {
          type: "badgeRow" as const,
          items: [
            {
              label: p.status === "done" ? "Shipped" : p.status === "active" ? "In Progress" : "Planned",
              tone: (p.status === "done" ? "live" : p.status === "active" ? "gold" : "planned") as DocBadgeTone,
            },
          ],
        },
        { type: "list" as const, items: p.items },
      ]),
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
      ]),
    ],
  },

  "valuation-model": {
    slug: "valuation-model",
    eyebrow: "Reference — 17",
    title: "Tokenomics & Valuation Model",
    description: "An independent scenario-based analysis — not an official specification, not investment advice.",
    blocks: [
      {
        type: "badgeRow",
        items: [{ label: "Independent Modeling Document · Not Official Specs", tone: "tba" }],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Can DOM be given a fair value today?",
        text: "No — not with any real precision, and any document claiming otherwise should be treated with suspicion. DOM has no live market: network is TBA, the contract is TBA, no exchange listing exists, and the mechanism that even advances the emission schedule — the Dynamic Supply Trigger — is itself TBA. What follows is a scenario model, not a price prediction: the supply math that is knowable today, plus sensitivity tables showing what different hypothetical prices would imply.",
      },
      { type: "heading", id: "methodology", text: "Methodology — disclosed vs. modeled vs. unknown" },
      {
        type: "list",
        items: [
          "Disclosed — taken directly from Dungeon of Miners' published Economy Rules v2.0: supply, allocations, rank rates, referral/guild multipliers, fee structure.",
          "Modeled — derived by applying a clearly stated assumption to disclosed data. Alternate models are shown side by side, not hidden.",
          "Unknown (TBA) — officially undisclosed by the project itself: network, contract, Halving trigger, vesting schedules, listing venue. No number is invented to fill these gaps.",
        ],
      },
      { type: "heading", id: "emission-modeling", text: "Emission modeling — how the 550M pool might release" },
      {
        type: "note",
        text: "The Halving multipliers (×1.000 → ×0.03125) are disclosed. How much DOM each era actually releases before triggering the next Halving is not — the trigger is a Dynamic Supply Trigger, officially TBA. Two illustrative models below show how much that single unknown changes the picture.",
      },
      {
        type: "table",
        headers: ["Era", "Model A — weighted by multiplier", "Model B — equal split"],
        rows: [
          ["H1 · Starting Era", { text: "279,365,079 (50.79%)", align: "right" }, { text: "91,666,667", align: "right" }],
          ["H2 · First Reduction", { text: "139,682,540 (25.40%)", align: "right" }, { text: "91,666,667", align: "right" }],
          ["H3 · Deep Mining", { text: "69,841,270 (12.70%)", align: "right" }, { text: "91,666,667", align: "right" }],
          ["H4 · Scarcity Era", { text: "34,920,635 (6.35%)", align: "right" }, { text: "91,666,667", align: "right" }],
          ["H5 · Last Vein", { text: "17,460,317 (3.17%)", align: "right" }, { text: "91,666,667", align: "right" }],
          ["H6 · Final Depth", { text: "8,730,159 (1.59%)", align: "right" }, { text: "91,666,667", align: "right" }],
        ],
      },
      {
        type: "callout",
        tone: "gold",
        title: "Takeaway",
        text: "Under Model A, roughly three-quarters of all DOM that will ever be mined (76.2%) is released in the first two eras alone. Under Model B, mining stays roughly linear across all six. A single undisclosed parameter — the Halving trigger — is the difference between these two very different supply curves, and no one outside the team can currently know which (or neither) is closer to reality.",
      },
      { type: "heading", id: "circulating-supply", text: "Circulating supply & withdrawability" },
      { type: "paragraph", text: "Three different numbers matter here, and conflating them is the most common error in a low-quality tokenomics writeup." },
      {
        type: "formula",
        text: "Total Mined(t) × 70% → Holding Wallet (rank-only, not withdrawable today) · × 30% → Pool Wallet (spendable AND withdrawal-eligible)",
      },
      {
        type: "tiles",
        items: [
          { label: "Max ever mined", value: "550,000,000", sub: "100% of mining allocation" },
          { label: "Max Holding-locked", value: "385,000,000", sub: "70% — not withdrawable under current rules" },
          { label: "Max withdrawal-eligible", value: "165,000,000", sub: "30% — the entire tradable-supply ceiling today", accent: "emerald" },
        ],
      },
      {
        type: "note",
        text: "This 165,000,000 DOM ceiling — not the 1,000,000,000 max supply, and not even the 550,000,000 mining allocation — is the realistic upper bound on what could ever reach a market under the current 70/30 rule. The project itself flags this split as under active review now that on-chain withdrawal is live; if it changes, this ceiling changes with it.",
      },
      { type: "heading", id: "fdv-sensitivity", text: "FDV / market cap sensitivity" },
      {
        type: "paragraph",
        text: "Not a forecast. A sensitivity table — the standard way analysts communicate valuation for an asset with no live price, so a reader can plug in their own price assumption rather than being handed someone else's.",
      },
      {
        type: "table",
        headers: ["Hypothetical price", "FDV (1B supply)", "Market cap (165M ceiling)"],
        rows: [
          ["$0.0001", { text: "$100,000", align: "right" }, { text: "$16,500", align: "right" }],
          ["$0.001", { text: "$1,000,000", align: "right" }, { text: "$165,000", align: "right" }],
          ["$0.01", { text: "$10,000,000", align: "right" }, { text: "$1,650,000", align: "right" }],
          ["$0.10", { text: "$100,000,000", align: "right" }, { text: "$16,500,000", align: "right" }],
        ],
      },
      {
        type: "note",
        text: "The FDV/market-cap ratio is a constant 6.06× at every price under the current 70/30 rule (Max Supply ÷ Withdrawal-Eligible Ceiling = 1,000,000,000 ÷ 165,000,000). A 6× gap between fully-diluted and realistically-tradable supply is a meaningful overhang for anyone pricing this token off market cap alone.",
      },
      { type: "heading", id: "value-drivers", text: "Value driver assessment" },
      {
        type: "table",
        headers: ["Driver", "Status", "Note"],
        rows: [
          ["Protocol revenue backing", { text: "None disclosed", badge: "warn" }, "Ecosystem is funded by optional rewarded ads + future Telegram Stars purchases — not revenue sharing."],
          ["Buyback / burn mechanism", { text: "TBA", badge: "tba" }, "Not mentioned in published Economy Rules or Roadmap."],
          ["Utility sink (in-game spend)", { text: "Yes", badge: "good" }, "Pool Wallet DOM is spent on upgrades, guild costs and Stone Breaker."],
          ["Staking", { text: "Planned", badge: "planned" }, "Roadmap Phase 4 lists Treasury Mechanics — no rate or lockup published yet."],
          ["Liquidity provisioning", { text: "Allocated", badge: "good" }, "10% of supply (100,000,000 DOM) earmarked — deployment timing and venue are TBA."],
          ["Exchange listing", { text: "Not guaranteed", badge: "warn" }, "No promise of exchange listing or guaranteed liquidity."],
        ],
      },
      { type: "heading", id: "dilution-risk", text: "Dilution & unlock risk" },
      {
        type: "list",
        items: [
          "The 70/30 split is under active review — if the Holding Wallet's 70% becomes withdrawable, the eligible-for-market ceiling jumps from 165,000,000 to as much as 550,000,000 DOM (a 3.33× supply shock) the moment the rule changes.",
          "450,000,000 DOM has no published vesting — Liquidity, Team, Treasure & Reserve, Ecosystem and Public/Strategic together are 45% of total supply, with no disclosed cliff, vesting curve, or release date.",
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Combined worst-case framing",
        text: "Under current disclosure, there is no published ceiling that rules out more than half of the 1,000,000,000 DOM max supply becoming liquid-eligible without further notice. This is not a claim that it will happen — it is the range the current disclosures leave open.",
      },
      { type: "heading", id: "key-unknowns", text: "Key unknowns & sensitivities" },
      {
        type: "list",
        items: [
          "Network — determines gas economics and available liquidity venues.",
          "Halving trigger (Dynamic Supply Trigger) — decides which emission model, if either, resembles reality.",
          "Vesting for the 450M non-mining allocation — sets the real dilution timeline.",
          "70/30 wallet-split outcome — sets the FDV/MC ratio, currently 6.06×.",
          "Active miner count — sets the realistic per-miner allocation; currently unbounded from public data.",
          "Listing venue / timing — no price exists until one does.",
        ],
      },
      { type: "heading", id: "disclaimer", text: "Disclaimer" },
      {
        type: "callout",
        tone: "danger",
        text: "This document is an independent analytical model, not an official Dungeon of Miners publication and not investment advice. Every figure is either taken directly from published Economy Rules v2.0, a clearly labeled hypothetical or modeling assumption, or explicitly marked as an unknown the project itself has not disclosed. Nothing here is a price prediction, a price target, or a guarantee of any kind. DOM has no live market, no guaranteed exchange listing, and mining or holding it does not guarantee financial value or profit.",
      },
    ],
  },
};

export const docsAllSlugs = Object.keys(docsPages);
