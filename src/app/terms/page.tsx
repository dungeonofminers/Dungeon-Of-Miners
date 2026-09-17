import type { Metadata } from "next";
import { siteConfig, economyConfig } from "@/content/site";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: `Terms of Service — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "The terms that govern your use of Dungeon of Miners.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated={economyConfig.economyLastUpdated}
      intro="These Terms of Service ('Terms') govern your access to and use of Dungeon of Miners (the 'Service'), including the website, the Telegram Mini App, and any related bots or community channels. By using the Service you agree to these Terms."
      placeholderNote="Draft in preparation: this page uses standard, generic terms appropriate for a Telegram Mini App mining game. It does not yet include the operating entity's legal name, registered address, or governing jurisdiction, since none of that has been provided. These must be added by the team before this page is treated as final and legally binding."
      sections={[
        {
          heading: "1. Eligibility",
          body: [
            "You must be able to form a legally binding contract in your jurisdiction to use Dungeon of Miners, and you are responsible for complying with any laws that apply to you, including rules about cryptocurrency and gaming in your country or region.",
          ],
        },
        {
          heading: "2. The Service",
          body: [
            "Dungeon of Miners is a mining ecosystem: you accrue DOM through gameplay, level up a Pickaxe through Mining XP, participate in Guilds, and may request on-chain withdrawal of eligible DOM to a BEP-20 wallet on BNB Smart Chain.",
            "The Service, including specific mechanics, rates, and features, may change over time. Material economy changes are recorded in the public Changelog.",
          ],
        },
        {
          heading: "3. No Financial Advice, No Guarantees",
          body: [
            "Nothing in the Service constitutes financial, investment, legal, or tax advice. Dungeon of Miners does not guarantee any price, return, exchange listing, or liquidity outcome for DOM. See the Risk Disclosure for details.",
          ],
        },
        {
          heading: "4. Account & Wallet Responsibility",
          body: [
            "You are responsible for the security of your Telegram account and any wallet you connect. Dungeon of Miners will never ask for your seed phrase, private key, or recovery phrase, and you should never provide them to anyone claiming to represent the project.",
          ],
        },
        {
          heading: "5. Fair Play",
          body: [
            "Automation, multi-accounting, referral or guild abuse, and any attempt to manipulate mining, claim, or withdrawal accounting are prohibited. Violations may result in reward rollback, account restriction, or a ban — see the Fair Play Policy for the full list.",
          ],
        },
        {
          heading: "6. Changes to the Service",
          body: [
            "We may modify, suspend, or discontinue any part of the Service, including temporary maintenance windows. We will not silently change previously published economy rules without recording the change in the Changelog.",
          ],
        },
        {
          heading: "7. Limitation of Liability",
          body: [
            "To the maximum extent permitted by law, Dungeon of Miners and its team are not liable for indirect, incidental, or consequential damages arising from your use of the Service, including losses related to digital asset volatility, network congestion, or third-party wallet software.",
          ],
        },
        {
          heading: "8. Contact",
          body: [
            "Questions about these Terms can be sent through the official Dungeon of Miners Telegram community — see the Support page for details.",
          ],
        },
      ]}
    />
  );
}
