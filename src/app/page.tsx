import { Hero } from "@/components/sections/Hero";
import { LiveEconomyDashboard } from "@/components/sections/LiveEconomyDashboard";
import { Platforms } from "@/components/sections/Platforms";
import { About } from "@/components/sections/About";
import { ProductFlow } from "@/components/sections/ProductFlow";
import { DomEcosystem } from "@/components/sections/DomEcosystem";
import { Honesty } from "@/components/sections/Honesty";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveEconomyDashboard />
      <Platforms />
      <About />
      <ProductFlow />
      <DomEcosystem />
      <Honesty />
      <CTA />
    </>
  );
}
