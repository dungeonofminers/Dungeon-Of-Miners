import { CheckCircle2, Loader2, CircleDashed } from "lucide-react";
import { roadmap } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const STATUS_META = {
  done: { label: "Shipped", icon: CheckCircle2, className: "border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow" },
  active: { label: "In Progress", icon: Loader2, className: "border-gold/30 bg-gold/10 text-gold" },
  planned: { label: "Planned", icon: CircleDashed, className: "border-white/15 bg-white/[0.04] text-ink-faint" },
} as const;

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Roadmap"
          title="Where Dungeon of Miners is headed"
          description="Qualitative phases, not marketing dates — we'd rather ship a phase late than promise a date we can't honestly keep."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((phase, i) => {
              const meta = STATUS_META[phase.status];
              const Icon = meta.icon;
              return (
                <Reveal key={phase.phase} delay={i * 0.08}>
                  <div className="surface-panel h-full p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                        {phase.phase}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                          meta.className
                        )}
                      >
                        <Icon className={cn("h-3 w-3", phase.status === "active" && "animate-spin")} />
                        {meta.label}
                      </span>
                    </div>
                    <h3 className="heading-md mt-4 text-lg">{phase.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
