import { Lock, Gauge, CalendarClock, ArrowDownCircle } from "lucide-react";
import { floors, economyConfig, genesisStatusStrip } from "@/content/site";
import { GenesisStatusBadge } from "@/components/ui/GenesisStatusBadge";

export function DungeonStatusStrip() {
  const currentFloor = floors.find((f) => f.index === economyConfig.currentFloorIndex);
  if (!currentFloor) return null;

  const items = [
    {
      label: "Current Floor",
      value: `Floor ${currentFloor.roman} · ${currentFloor.name}`,
    },
    {
      icon: Lock,
      label: "Mining Status",
      value: "NOT STARTED",
    },
    {
      icon: Gauge,
      label: "Mined",
      value: `${genesisStatusStrip.percentMined}%`,
    },
    {
      icon: CalendarClock,
      label: "Genesis Start",
      value: genesisStatusStrip.genesisStart,
    },
    {
      icon: ArrowDownCircle,
      label: "Descent Trigger",
      value: "Supply Exhausted OR 90 Days",
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
