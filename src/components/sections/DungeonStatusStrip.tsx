import { Link2, Zap, Coins, ArrowDownCircle, Rocket, TrendingUp } from "lucide-react";
import { economyConfig, halvings, miningStatusStrip, totalSupply } from "@/content/site";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";

export function DungeonStatusStrip() {
  const currentHalving = halvings.find((h) => h.number === economyConfig.currentHalving);
  if (!currentHalving) return null;

  const items = [
    {
      icon: Link2,
      label: "Network",
      value: "BSC",
    },
    {
      icon: Zap,
      label: "Halving",
      value: `${currentHalving.number} / ${halvings.length}`,
    },
    {
      icon: Coins,
      label: "Max Supply",
      value: totalSupply,
    },
    {
      icon: ArrowDownCircle,
      label: "Withdrawal",
      value: miningStatusStrip.withdrawalLabel,
    },
    {
      icon: Rocket,
      label: "TGE",
      value: miningStatusStrip.tgeLabel,
    },
    {
      icon: TrendingUp,
      label: "Listing",
      value: miningStatusStrip.listingLabel,
    },
  ];

  return (
    <div className="relative border-y border-white/[0.06] bg-void-200/60 backdrop-blur-sm">
      <div className="section-shell">
        <div className="flex items-center gap-6 overflow-x-auto py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <GenesisStatusBadge />

          {items.map((item) => (
            <div key={item.label} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
              {item.icon && <item.icon className="h-3.5 w-3.5 text-torch" />}
              <span className="text-[11px] uppercase tracking-wider text-ink-faint">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-ink">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
