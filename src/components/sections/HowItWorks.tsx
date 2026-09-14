import { coreLoop } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="How It Works"
          title="From first tap to guild expedition"
          description="This is how mining will work once Genesis begins. Six simple steps take you from opening the Mini App to descending through the dungeon with a full guild behind you."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coreLoop.map((step, i) => (
              <Reveal key={step.step} delay={(i % 3) * 0.08}>
                <div className="surface-panel group relative h-full p-7 transition-colors hover:border-gold/25">
                  <span className="font-display text-4xl text-white/10 transition-colors group-hover:text-gold/30">
                    {step.step}
                  </span>
                  <h3 className="heading-md mt-3 text-xl">{step.title}</h3>
                  <p className="body-lg mt-3 text-sm">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
