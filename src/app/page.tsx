import { Hero } from "@/components/sections/Hero";
import { DungeonStatusStrip } from "@/components/sections/DungeonStatusStrip";
import { Platforms } from "@/components/sections/Platforms";
import { About } from "@/components/sections/About";
import { TheGenesis } from "@/components/sections/TheGenesis";
import { PrepareForGenesis } from "@/components/sections/PrepareForGenesis";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MiningFormula } from "@/components/sections/MiningFormula";
import { TheDescent } from "@/components/sections/TheDescent";
import { Floors } from "@/components/sections/Floors";
import { Ranks } from "@/components/sections/Ranks";
import { Wallets } from "@/components/sections/Wallets";
import { Features } from "@/components/sections/Features";
import { Guild } from "@/components/sections/Guild";
import { GenesisLedger } from "@/components/sections/GenesisLedger";
import { Roadmap } from "@/components/sections/Roadmap";
import { Honesty } from "@/components/sections/Honesty";
import { PreTgeSection } from "@/components/sections/PreTgeSection";
import { FAQ } from "@/components/sections/FAQ";
import { RiskDisclosure } from "@/components/sections/RiskDisclosure";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <DungeonStatusStrip />
      <Platforms />
      <About />
      <TheGenesis />
      <PrepareForGenesis />
      <HowItWorks />
      <MiningFormula />
      <TheDescent />
      <Floors />
      <Ranks />
      <Wallets />
      <Features />
      <Guild />
      <GenesisLedger />
      <Roadmap />
      <Honesty />
      <PreTgeSection />
      <FAQ />
      <RiskDisclosure />
      <CTA />
    </>
  );
}
