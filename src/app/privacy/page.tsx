import type { Metadata } from "next";
import { siteConfig, economyConfig } from "@/content/site";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "What Dungeon of Miners collects, why, and how it's protected.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated={economyConfig.economyLastUpdated}
      intro="This Privacy Policy explains what information Dungeon of Miners collects when you use the website and the Telegram Mini App, and how that information is used and protected."
      placeholderNote="Draft in preparation: the data categories and safeguards below describe the intended architecture. The operating entity's legal name, contact address, and data-protection officer (if applicable) have not been provided and must be added before this page is final."
      sections={[
        {
          heading: "1. Information We Collect",
          body: [
            "Telegram account identifiers (such as your Telegram user ID) needed to operate your mining account, verified server-side via Telegram's own authentication data — never trusted from the frontend alone.",
            "Gameplay data: mining activity, Mining XP, Pickaxe Level, claims, guild membership, and referral relationships.",
            "If you connect a wallet: the public wallet address and a signed ownership message. We never receive or store your seed phrase or private key.",
            "Standard technical data (such as device/browser type) automatically collected by hosting and analytics infrastructure.",
          ],
        },
        {
          heading: "2. How We Use Information",
          body: [
            "To operate mining, claim, withdrawal, referral, and guild features; to protect the economy against fraud and abuse; and to communicate important updates through official channels.",
            "We do not sell personal information to third parties.",
          ],
        },
        {
          heading: "3. Public vs. Private Data",
          body: [
            "Leaderboards and guild pages may show your chosen display name, Pickaxe Level, and activity-based stats. We do not display your Telegram username or wallet address publicly unless you explicitly opt in. Recent on-chain withdrawals are shown with a shortened wallet address only.",
          ],
        },
        {
          heading: "4. Data Retention & Deletion",
          body: [
            "We retain account and ledger data for as long as needed to operate the Service and meet accounting/audit requirements. You can request deletion of your personal data — see the Data Deletion page for how.",
          ],
        },
        {
          heading: "5. Security",
          body: [
            "Balance-affecting actions (mining accrual, claim, withdrawal) are processed server-side with atomic transactions and audit logging. We do not store wallet private keys or seed phrases anywhere in our systems.",
          ],
        },
        {
          heading: "6. Third-Party Services",
          body: [
            "The Service relies on Telegram for authentication and messaging, and on BNB Smart Chain infrastructure (wallets, block explorers) for on-chain withdrawal. Each of those providers has its own privacy practices.",
          ],
        },
        {
          heading: "7. Contact",
          body: [
            "Questions about this Privacy Policy can be sent through the official Dungeon of Miners Telegram community — see the Support page.",
          ],
        },
      ]}
    />
  );
}
