import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { siteConfig, links, totalSupply, halvings, pickaxeLevels } from "@/content/site";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TheDescent } from "@/components/sections/TheDescent";
import { PickaxeLevels } from "@/components/sections/PickaxeLevels";
import { Features } from "@/components/sections/Features";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { EmberField } from "@/components/ui/EmberField";

export const metadata: Metadata = {
  title: `Game — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "How Dungeon of Miners plays: the live mining loop, the six Halvings, Pickaxe Levels, and features.",
};

const overviewStats = [
  { value: totalSupply, label: "Max Supply" },
  { value: `${halvings.length} Halvings`, label: "Mining Eras" },
  { value: `${pickaxeLevels.length} Pickaxe Levels`, label: "Level 1 → Level 6" },
];

export default function GamePage() {
  return (
    <>
      <section id="overview" className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#0A0C0F)]" />
        <GlowOrb color="torch" className="left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2" />
        <EmberField count={16} />

        <div className="section-shell relative text-center">
          <span className="eyebrow mx-auto">The Game</span>
          <h1 className="heading-xl mx-auto mt-6 max-w-2xl">
            A live dungeon-mining loop built on <span className="text-gradient-gold">real scarcity</span>
          </h1>
          <p className="body-lg mx-auto mt-5 max-w-xl">
            Idle mining, Pickaxe Level progression, and six Halving eras that progressively cut
            mining emissions as the shared supply is mined.
          </p>
          <div className="mx-auto mt-7 flex flex-wrap justify-center gap-2.5">
            {overviewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm"
              >
                <span className="font-semibold text-gold">{stat.value}</span>{" "}
                <span className="text-ink-muted">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Enter Mini App
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <HowItWorks />
      <TheDescent />
      <PickaxeLevels />
      <Features />
    </>
  );
}
