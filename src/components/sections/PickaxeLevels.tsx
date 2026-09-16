import { pickaxeLevels } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function PickaxeLevels() {
  return (
    <section id="pickaxes" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Pickaxe Levels"
          title="Level up your pickaxe. Raise your mining power."
          description="Pickaxe Level 1–6 is your core mining progression. It's driven by persistent Mining XP and lifetime activity — never by your current wallet balance, so withdrawing DOM never costs you progress."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {pickaxeLevels.map((pickaxe, i) => (
            <Reveal key={pickaxe.level} delay={i * 0.06}>
              <div className="surface-panel group relative flex h-full flex-col items-center gap-4 overflow-hidden p-5 text-center transition-transform hover:-translate-y-1">
                <div
                  className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${pickaxe.accent} opacity-20 blur-2xl`}
                />
                <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                  <div
                    className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-br ${pickaxe.accent} opacity-40 blur-xl`}
                  />
                  <PlaceholderImage
                    src={pickaxe.image}
                    alt={`Pickaxe Level ${pickaxe.level}`}
                    label={`Level ${pickaxe.level}`}
                    className="h-28 w-28 rounded-xl sm:h-32 sm:w-32"
                    imgClassName="object-contain"
                  />
                </div>
                <div className="relative">
                  <h3 className="font-display text-lg text-ink">Level {pickaxe.level}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-faint">
                    {pickaxe.cosmeticName}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gold">
                    Base Mining Power {pickaxe.basePower}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint">
                    XP Required: {pickaxe.xpRequired}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 text-center">
            <p className="text-sm text-ink-muted">
              Base Mining Power sets your share of the network&apos;s daily emission — it is not a
              guaranteed DOM/hour rate.{" "}
              <span className="text-ink-faint">There is no Pickaxe Equipment Multiplier.</span> See{" "}
              <a href="/economy#mining-formula" className="text-gold underline-offset-4 hover:underline">
                how mining rewards work
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
