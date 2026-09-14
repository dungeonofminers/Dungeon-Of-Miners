"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered plainly"
          description="No jargon walls. Just clear answers about how Dungeon of Miners actually works."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.03}>
                <div className="border-b border-white/[0.06]">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-ink sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-gold transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="body-lg pb-6 text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
