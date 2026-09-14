import { Hero } from "@/components/sections/Hero";
import { DungeonStatusStrip } from "@/components/sections/DungeonStatusStrip";
import { Platforms } from "@/components/sections/Platforms";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TheDescent } from "@/components/sections/TheDescent";
import { Floors } from "@/components/sections/Floors";
import { Ranks } from "@/components/sections/Ranks";
import { Wallets } from "@/components/sections/Wallets";
import { Features } from "@/components/sections/Features";
import { Guild } from "@/components/sections/Guild";
import { Roadmap } from "@/components/sections/Roadmap";
import { Honesty } from "@/components/sections/Honesty";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <DungeonStatusStrip />
      <Platforms />
      <About />
      <HowItWorks />
      <TheDescent />
      <Floors />
      <Ranks />
      <Wallets />
      <Features />
      <Guild />
      <Roadmap />
      <Honesty />
      <FAQ />
      <CTA />
    </>
  );
}
