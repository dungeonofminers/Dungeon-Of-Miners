import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { EmberField } from "@/components/ui/EmberField";
import { MiningFormula } from "@/components/sections/MiningFormula";
import { Wallets } from "@/components/sections/Wallets";
import { PreTgeSection } from "@/components/sections/PreTgeSection";

export const metadata: Metadata = {
  title: `Mining Economy — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "How the Dungeon of Miners live mining economy works end to end: Pickaxe Base Mining Power, boosters, the Global Emission Pool, claims, and instant on-chain withdrawal.",
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
            eyebrow="Live Mining Economy"
            title="Every booster, one shared, capped supply"
            description="From your Pickaxe's Base Mining Power to a claim that's 100% yours to instant on-chain withdrawal — here's exactly how DOM moves through the economy."
          />
        </div>
      </section>

      <MiningFormula />
      <Wallets />
      <PreTgeSection />
    </>
  );
}
