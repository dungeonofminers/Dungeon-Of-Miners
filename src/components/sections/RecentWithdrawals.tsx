"use client";

import { ExternalLink, Inbox } from "lucide-react";
import { useLiveEconomy, formatDom, shortAddress } from "@/lib/live-economy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function RecentWithdrawals() {
  const data = useLiveEconomy();
  const items = data?.withdrawals?.items ?? null;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="On-Chain Proof"
          title="Recent On-Chain Withdrawals"
          description="Real BNB Smart Chain withdrawals only — shortened addresses, no Telegram usernames, and never a placeholder transaction."
        />

        <Reveal delay={0.1}>
          <div className="surface-panel mx-auto mt-14 max-w-3xl overflow-hidden">
            {items === null ? (
              <div className="flex flex-col items-center gap-3 p-10 text-center">
                <Inbox className="h-6 w-6 text-ink-faint" />
                <p className="text-sm font-semibold text-ink">Loading live withdrawals…</p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center gap-3 p-10 text-center">
                <Inbox className="h-6 w-6 text-ink-faint" />
                <p className="text-sm font-semibold text-ink">No confirmed withdrawals yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {items.map((w, i) => (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
                    <span className="font-mono text-xs text-ink-muted sm:text-sm">{shortAddress(w.address)}</span>
                    <span className="font-display text-xs text-gold sm:text-sm">{formatDom(w.amount)}</span>
                    <span className="rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-glow sm:px-2.5 sm:py-1 sm:text-[10px]">
                      Confirmed
                    </span>
                    <a
                      href={`https://bscscan.com/tx/${w.txHash}`}
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
