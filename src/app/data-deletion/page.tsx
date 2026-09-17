import type { Metadata } from "next";
import { siteConfig, links, economyConfig } from "@/content/site";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: `Data Deletion — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "How to request deletion of your Dungeon of Miners account data.",
};

export default function DataDeletionPage() {
  return (
    <LegalLayout
      title="Data Deletion"
      updated={economyConfig.economyLastUpdated}
      intro="You can request deletion of your personal data at any time. This page explains what that means and what we're able to remove."
      sections={[
        {
          heading: "How to request deletion",
          body: [
            `Send a deletion request through the official Dungeon of Miners Telegram community (${links.telegramCommunity}) from the Telegram account associated with your mining account, so we can verify the request belongs to you.`,
          ],
        },
        {
          heading: "What gets deleted",
          body: [
            "Your Telegram account link, profile information, and any personal identifiers we hold.",
            "Any wallet-linking record tied to your account (the linked address and its verification signature).",
          ],
        },
        {
          heading: "What we may retain",
          body: [
            "Anonymized or aggregated gameplay statistics that no longer identify you personally.",
            "On-chain withdrawal records that already exist permanently on BNB Smart Chain — a blockchain transaction cannot be deleted once confirmed, only the personal account record linking it to you can be removed from our systems.",
            "Records we are legally required to retain for a limited period (for example, to investigate confirmed fraud or to meet applicable financial/audit obligations).",
          ],
        },
        {
          heading: "What happens to your mining progress",
          body: [
            "Deleting your account removes your ability to access your Mining XP, Pickaxe Level, guild membership, and any unclaimed Mining Storage balance. Claim any eligible DOM and complete any pending withdrawal before requesting deletion — a deleted account cannot be recovered.",
          ],
        },
      ]}
    />
  );
}
