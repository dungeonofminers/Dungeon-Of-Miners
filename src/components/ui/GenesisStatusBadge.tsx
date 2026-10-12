import { economyConfig } from "@/content/site";

export function GenesisStatusBadge({ className }: { className?: string }) {
  const isLive = economyConfig.miningStatus === "LIVE";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
        isLive
          ? "border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow"
          : "border-gold/30 bg-gold/10 text-gold"
      } ${className ?? ""}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isLive ? "animate-pulse bg-emerald-glow" : "bg-gold"}`}
      />
      Mining {economyConfig.miningStatus}
    </span>
  );
}
