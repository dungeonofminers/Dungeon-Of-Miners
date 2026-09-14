import { AlertTriangle } from "lucide-react";
import { riskDisclosure } from "@/content/site";

export function RiskDisclosure() {
  return (
    <section id="risk-disclosure" className="relative py-16">
      <div className="section-shell">
        <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
          <p className="text-xs leading-relaxed text-ink-faint">{riskDisclosure}</p>
        </div>
      </div>
    </section>
  );
}
