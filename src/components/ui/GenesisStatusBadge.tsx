import { economyConfig, GENESIS_STATUS_LABEL } from "@/content/site";

export function GenesisStatusBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold ${className ?? ""}`}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
      {GENESIS_STATUS_LABEL[economyConfig.genesisStatus]}
    </span>
  );
}
