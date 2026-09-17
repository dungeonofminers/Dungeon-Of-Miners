"use client";

import { useState } from "react";
import { ScrollText } from "lucide-react";
import { transactionHistoryFilters } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function TransactionsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Your Activity"
            title="Transaction History"
            description="Every mining accrual, claim, withdrawal, reward, and adjustment to your account, in one auditable list."
          />

          <Reveal delay={0.06}>
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
              {["All", ...transactionHistoryFilters].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setFilter(label)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                    filter === label
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-white/10 bg-white/[0.02] text-ink-faint hover:text-ink"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-panel mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 p-10 text-center">
              <ScrollText className="h-6 w-6 text-ink-faint" />
              <p className="text-sm font-semibold text-ink">Connect your account to view history</p>
              <p className="max-w-sm text-sm text-ink-muted">
                Open Dungeon of Miners inside Telegram to see your own {filter === "All" ? "Mining, Claim, Withdrawal, Rewards, and Adjustment" : filter}{" "}
                entries here — type, amount, date, status, and transaction hash where applicable.
                This page never shows another player&apos;s activity or a placeholder entry.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
