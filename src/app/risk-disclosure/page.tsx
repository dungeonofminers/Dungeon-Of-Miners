import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { RiskDisclosure } from "@/components/sections/RiskDisclosure";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `Risk Disclosure — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Dungeon of Miners is a live blockchain-based mining ecosystem. Read the risk disclosure before participating.",
};

export default function RiskDisclosurePage() {
  return (
    <div className="pt-24 sm:pt-28">
      <div className="section-shell">
        <SectionHeading eyebrow="Risk Disclosure" title="Read this before you participate" />
      </div>
      <RiskDisclosure />
    </div>
  );
}
