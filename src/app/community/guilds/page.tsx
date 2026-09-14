import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Guild } from "@/components/sections/Guild";

export const metadata: Metadata = {
  title: `Guilds — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Form a guild of up to 30 delvers, coordinate daily expeditions, and earn a shared hashrate bonus.",
};

export default function GuildsPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <Guild />
    </div>
  );
}
