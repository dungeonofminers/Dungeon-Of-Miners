import { Hero } from "@/components/sections/Hero";
import { Platforms } from "@/components/sections/Platforms";
import { About } from "@/components/sections/About";
import { Honesty } from "@/components/sections/Honesty";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Platforms />
      <About />
      <Honesty />
      <CTA />
    </>
  );
}
