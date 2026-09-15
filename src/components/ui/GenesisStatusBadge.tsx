import { economyConfig } from "@/content/site";

export function GenesisStatusBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-glow ${className ?? ""}`}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-glow" />
      Mining {economyConfig.miningStatus}
    </span>
  );
}
