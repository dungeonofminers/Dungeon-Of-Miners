import type { Metadata } from "next";
import { siteConfig, economyConfig } from "@/content/site";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: `Token Disclaimer — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "What DOM is, and what it explicitly is not.",
};

export default function TokenDisclaimerPage() {
  return (
    <LegalLayout
      title="Token Disclaimer"
      updated={economyConfig.economyLastUpdated}
      intro="This page states plainly what the DOM token is, and what it is not, so nothing here is left open to interpretation."
      sections={[
        {
          heading: "What DOM is",
          body: [
            "DOM is a BEP-20 utility token on BNB Smart Chain with a permanently fixed maximum supply of 1,000,000,000. It is earned through gameplay in the Dungeon of Miners mining ecosystem and can be requested for on-chain withdrawal once eligible.",
          ],
        },
        {
          heading: "What DOM is not",
          body: [
            "DOM is not equity, a share, or ownership of Dungeon of Miners or any related entity.",
            "DOM does not represent a claim on protocol revenue, and holding or mining it does not entitle you to revenue sharing of any kind.",
            "DOM does not carry a guaranteed price, guaranteed return, or guaranteed yield.",
            "DOM is not a promise of exchange listing, liquidity, or market value at any point in time.",
            "Mining DOM is reward distribution from a fixed, pre-allocated pool — it is never described as, or equivalent to, an investment contract or a security offering.",
          ],
        },
        {
          heading: "Supply integrity",
          body: [
            "The entire 1,000,000,000 DOM supply is created once. Additional minting is disabled after deployment. Mining distributes DOM from the pre-allocated 550,000,000 DOM Mining Allocation and can never push total supply beyond 1 billion.",
          ],
        },
        {
          heading: "TGE & Exchange Listing",
          body: [
            "The public market launch (TGE) and any exchange listing are both status: Coming Soon. No date, venue, opening price, market cap, or liquidity amount has been set. Any of these details will be announced only through official Dungeon of Miners channels — never assume one is confirmed until it is.",
          ],
        },
        {
          heading: "Your own responsibility",
          body: [
            "Digital assets are volatile and carry risk, including smart contract risk, wallet risk, and market risk. You should independently evaluate these risks before participating — see the full Risk Disclosure.",
          ],
        },
      ]}
    />
  );
}
