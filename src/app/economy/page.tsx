import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { EmberField } from "@/components/ui/EmberField";
import { MiningFormula } from "@/components/sections/MiningFormula";
import { Wallets } from "@/components/sections/Wallets";

export const metadata: Metadata = {
  title: `Mining Economy — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "How the Dungeon of Miners economy works end to end: mining rate, boosts, storage, claims, and the 70/30 wallet split.",
};

export default function EconomyPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0A0C0F)]" />
        <GlowOrb color="gold" className="left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2" />
        <EmberField count={16} />

        <div className="section-shell relative">
          <SectionHeading
            eyebrow="Mining Economy"
            title="Every multiplier, every wallet, one shared supply"
            description="From your base rank rate to the 70/30 claim split — here's exactly how DOM moves through the economy, floor by floor."
          />
        </div>
      </section>

      <MiningFormula />
      <Wallets />
    </>
  );
}
