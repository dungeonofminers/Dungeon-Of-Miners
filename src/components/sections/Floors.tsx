import { floors, totalSupply } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Floors() {
  return (
    <section id="floors" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow={`Total Supply · ${totalSupply}`}
          title="Six floors. Every allocation, every rate."
          description="What exists on each floor: its DOM allocation, its mining rate, and how scarce it gets. The deeper you go, the scarcer — and slower — mining becomes."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {floors.map((floor, i) => (
            <Reveal key={floor.name} delay={(i % 3) * 0.1}>
              <div className="surface-panel group h-full overflow-hidden">
                <div className="relative">
                  <PlaceholderImage
                    src={floor.image}
                    alt={`${floor.name} floor`}
                    label={`Floor ${floor.roman} · ${floor.name}`}
                    aspect="aspect-[4/3]"
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void-100 via-void-100/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-void-300/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                    Floor {floor.roman}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="heading-md text-xl">{floor.name}</h3>
                    <ScarcityDots level={floor.scarcity} />
                  </div>
                  <p className="body-lg mt-2 text-sm">{floor.vibe}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-faint">Allocation</p>
                      <p className="mt-1 text-sm font-semibold text-ink">{floor.allocation}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-faint">Mining Rate</p>
                      <p className="mt-1 text-sm font-semibold text-torch">{floor.rateMultiplier}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScarcityDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" title={`Scarcity level ${level}/6`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < level ? "bg-torch" : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}
