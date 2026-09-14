"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { domEcosystem, links } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { EcosystemDiagram } from "@/components/ecosystem/EcosystemDiagram";

export function DomEcosystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section id="dom-ecosystem" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(247,182,74,0.08) 0%, transparent 70%)" }}
      />

      <div ref={sectionRef} className="section-shell relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          {/* Text — first on mobile, left on desktop */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Reveal>
              <span className="eyebrow">{domEcosystem.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-lg mt-5 max-w-md">
                {domEcosystem.headline[0]}
                <br />
                <span className="text-gradient-gold">{domEcosystem.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="body-lg mt-5 max-w-md">{domEcosystem.paragraph}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink-faint">
                {domEcosystem.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-col items-center gap-2 lg:items-start">
              <p className="max-w-sm text-sm text-ink-muted sm:text-base">
                {domEcosystem.finalScene.lineOne} {domEcosystem.finalScene.lineTwo}
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                {domEcosystem.finalScene.tagline}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: prefersReduced ? 0 : 9.2 }}
                className="mt-4"
              >
                <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {domEcosystem.finalScene.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </Reveal>
          </div>

          {/* Diagram — second on mobile, right on desktop */}
          <div className="w-full">
            <EcosystemDiagram play={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
