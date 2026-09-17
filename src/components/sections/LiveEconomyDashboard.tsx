import { Activity } from "lucide-react";
import { liveDashboardMetrics, halvings, economyConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const currentHalving = halvings.find((h) => h.number === economyConfig.currentHalving)!;

export function LiveEconomyDashboard() {
  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Live Economy"
          title="The Dungeon Is Mining"
          description="Every value below is either a known configuration fact or an honest placeholder — never a fabricated statistic. Live figures appear the moment the backend can supply them."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-14 max-w-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-ink">
                Current Halving — {currentHalving.number} / {halvings.length} · {currentHalving.name}
              </p>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-glow">
                <Activity className="h-3 w-3" />
                {economyConfig.miningStatus}
              </span>
            </div>
            <div className="relative mt-4 h-3 w-full overflow-hidden rounded-full bg-white/5">
              <div className="absolute inset-y-0 left-0 w-0 rounded-full bg-gradient-to-r from-torch-ember to-torch" />
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              Halving progress: Awaiting Live Data — shown honestly rather than an invented percentage.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {liveDashboardMetrics.map((metric, i) => (
            <Reveal key={metric.label} delay={0.05 + (i % 8) * 0.03}>
              <div className="surface-panel flex h-full flex-col items-center gap-1.5 p-5 text-center">
                <p className="text-[10px] uppercase tracking-wider text-ink-faint">{metric.label}</p>
                <p
                  className={`font-display text-base sm:text-lg ${
                    metric.value === "Awaiting Live Data" ? "text-ink-faint" : "text-gold"
                  }`}
                >
                  {metric.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
