import { ExternalLink, Inbox } from "lucide-react";
import { recentWithdrawals } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function RecentWithdrawals() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="On-Chain Proof"
          title="Recent On-Chain Withdrawals"
          description="Real BNB Smart Chain withdrawals only — shortened addresses, no Telegram usernames unless a miner opts in, and never a placeholder transaction."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-14 max-w-3xl overflow-hidden">
            {recentWithdrawals.length === 0 ? (
              <div className="flex flex-col items-center gap-3 p-10 text-center">
                <Inbox className="h-6 w-6 text-ink-faint" />
                <p className="text-sm font-semibold text-ink">Awaiting Live Data</p>
                <p className="max-w-sm text-sm text-ink-muted">
                  Confirmed on-chain withdrawals will appear here in real time once the backend is
                  connected. Nothing is shown until it&apos;s real.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {recentWithdrawals.map((w, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                    <span className="font-mono text-sm text-ink-muted">{w.address}</span>
                    <span className="font-display text-sm text-gold">{w.amount}</span>
                    <span className="rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-glow">
                      {w.status}
                    </span>
                    <a
                      href={w.txUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gold underline-offset-4 hover:underline"
                    >
                      View TX
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
