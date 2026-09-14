import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { siteConfig, links, faqs } from "@/content/site";
import { TheGenesis } from "@/components/sections/TheGenesis";
import { PrepareForGenesis } from "@/components/sections/PrepareForGenesis";
import { GenesisLedger } from "@/components/sections/GenesisLedger";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `Genesis — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "Everything about Genesis Mining: current status, Floor I facts, how to prepare, and the public Genesis Ledger. Mining has not started yet.",
};

const genesisFaqSlugs = ["Has mining started yet?", "What is The Descent?"];
const genesisFaqs = faqs.filter((faq) => genesisFaqSlugs.includes(faq.question));

export default function GenesisPage() {
  return (
    <div className="pt-8">
      <TheGenesis />
      <PrepareForGenesis />
      <GenesisLedger />

      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="Genesis FAQ" title="Quick answers before Genesis" />
          <div className="mx-auto mt-10 max-w-2xl">
            {genesisFaqs.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 0.06}>
                <div className="border-b border-white/[0.06] py-5">
                  <p className="text-sm font-semibold text-ink sm:text-base">{faq.question}</p>
                  <p className="body-lg mt-2 text-sm">{faq.answer}</p>
                </div>
              </Reveal>
            ))}
            <div className="mt-6 text-center">
              <a href="/faq" className="text-sm text-gold underline-offset-4 hover:underline">
                See the full FAQ →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="section-shell relative">
          <Reveal>
            <div className="surface-panel mx-auto max-w-2xl px-8 py-14 text-center sm:px-12">
              <h2 className="heading-lg">Be ready before The First Descent</h2>
              <p className="body-lg mx-auto mt-4 max-w-lg">
                Mining hasn&apos;t started yet — but your profile, badge, and guild can be.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Enter Mini App
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

