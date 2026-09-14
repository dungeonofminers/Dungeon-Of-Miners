import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Roadmap } from "@/components/sections/Roadmap";

export const metadata: Metadata = {
  title: `Roadmap — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Qualitative phases for Dungeon of Miners — not marketing dates.",
};

export default function RoadmapPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <Roadmap />
    </div>
  );
}
