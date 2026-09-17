"use client";

import { useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { halvings, MINING_ALLOCATION_DOM } from "@/content/site";

type AllocationEntry = {
  id: string;
  label: string;
  percent: number;
  amount: string;
  color: string;
  description: string;
};

const STATUS_CLASS: Record<string, string> = {
  CURRENT: "border-gold/30 bg-gold/10 text-gold",
  UPCOMING: "border-white/15 bg-white/[0.06] text-ink-muted",
  LOCKED: "border-white/15 bg-white/[0.06] text-ink-faint",
};

export function AllocationCard({ entry }: { entry: AllocationEntry }) {
  const [open, setOpen] = useState(false);
  const isMining = entry.id === "mining";

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="surface-panel flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="font-display text-2xl text-ink">{entry.percent}%</span>
        </div>
        <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-ink">{entry.label}</h3>
        <p className="mt-1 text-xs text-ink-faint">{entry.amount}</p>
        <p className="mt-3 text-sm text-ink-muted">{entry.description}</p>

        {isMining && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-gold underline-offset-4 hover:underline"
          >
            Read More Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isMining && open && (
        <div role="dialog" aria-modal="true" aria-label="Mining Allocation Halving breakdown" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />

          <div className="surface-panel relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">Mining Rewards — 55%</span>
                <h3 className="heading-md mt-3 text-xl">
                  Where the {MINING_ALLOCATION_DOM} Mining Allocation goes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-ink-faint transition-colors hover:border-gold/30 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="body-lg mt-3 text-sm">
              This 55% allocation is what miners actually earn. It is split into six equal eras —
              each Halving mines out its own fixed share before the network advances to the
              next. There is no daily cap; a Halving only ends once its own allocation is fully
              distributed.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {halvings.map((h) => (
                <div
                  key={h.number}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Halving {h.number} · {h.name}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">{h.percentOfPool} of Mining Allocation</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="font-display text-base text-gold">{h.allocation}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${STATUS_CLASS[h.status]}`}
                    >
                      {h.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
              <p className="text-xs leading-relaxed text-ink-faint">
                Once a Halving&apos;s allocation is fully mined out, the network advances to the
                next era — there is no fixed date and no per-day limit. There is no Halving 7:
                once Halving 6&apos;s allocation is mined out, the entire {MINING_ALLOCATION_DOM}{" "}
                Mining Allocation will be completely distributed.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
