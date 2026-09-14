import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: `FAQ — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Clear answers about how Dungeon of Miners actually works.",
};

export default function FaqPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <FAQ />
    </div>
  );
}
