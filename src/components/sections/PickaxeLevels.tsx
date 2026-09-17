"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { pickaxeLevels, type PickaxeLevel } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function PickaxeLevels() {
  const [active, setActive] = useState<PickaxeLevel | null>(null);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="pickaxes" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Pickaxe Levels"
          title="Level up your pickaxe. Raise your mining power."
          description="Pickaxe Level 1–6 is your core mining progression. It's driven by persistent Mining XP and lifetime activity — never by your current wallet balance, so withdrawing DOM never costs you progress. Tap a pickaxe for full details."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {pickaxeLevels.map((pickaxe, i) => (
            <Reveal key={pickaxe.level} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setActive(pickaxe)}
                className={`surface-panel group relative flex h-full w-full flex-col items-center gap-4 overflow-hidden p-5 text-center transition-transform hover:-translate-y-1 ${
                  pickaxe.level === 1 ? "ring-1 ring-gold/30" : ""
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${pickaxe.accent} opacity-20 blur-2xl`} />
                <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                  <div className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-br ${pickaxe.accent} opacity-40 blur-xl`} />
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
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-faint">{pickaxe.cosmeticName}</p>
                  <p className="mt-2 text-sm font-semibold text-gold">Base Mining Power {pickaxe.basePower}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint">
                    XP Required: {pickaxe.xpRequired.toLocaleString("en-US")}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 text-center">
            <p className="text-sm text-ink-muted">
              Base Mining Power sets your share of the current Halving&apos;s fixed allocation —
              it is not a guaranteed DOM/hour rate.{" "}
              <span className="text-ink-faint">There is no Pickaxe Equipment Multiplier.</span> See{" "}
              <a href="/economy#mining-formula" className="text-gold underline-offset-4 hover:underline">
                how mining rewards work
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={`Pickaxe Level ${active.level} details`} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActive(null)} aria-hidden />

          <div className="surface-panel relative z-10 w-full max-w-md overflow-hidden p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0">
                  <div className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-br ${active.accent} opacity-50 blur-lg`} />
                  <PlaceholderImage
                    src={active.image}
                    alt={`Pickaxe Level ${active.level}`}
                    label={`Level ${active.level}`}
                    className="h-16 w-16 rounded-xl"
                    imgClassName="object-contain"
                  />
                </div>
                <div>
                  <span className="eyebrow">Level {active.level}</span>
                  <h3 className="heading-md mt-2 text-lg">{active.cosmeticName}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-ink-faint transition-colors hover:border-gold/30 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <dl className="mt-6 flex flex-col gap-3">
              <Row label="Base Mining Power" value={String(active.basePower)} />
              <Row label="Storage Capacity" value={active.storageCapacity} />
              <Row label="Mining XP Required" value={active.xpRequired.toLocaleString("en-US")} />
              {active.xpToNext !== null && <Row label="XP for Next Level" value={active.xpToNext.toLocaleString("en-US")} />}
              <Row label="Current Progress" value="Awaiting Live Data" muted />
            </dl>

            <div className="mt-5 border-t border-white/[0.06] pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Features Unlocked</p>
              <ul className="mt-3 flex flex-col gap-2">
                {active.unlocks.map((unlock) => (
                  <li key={unlock} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                    {unlock}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={`font-semibold ${muted ? "text-ink-faint" : "text-ink"}`}>{value}</dd>
    </div>
  );
}
