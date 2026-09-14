import { Users, Gauge, CalendarClock, ArrowDownCircle } from "lucide-react";
import { floors, dungeonStatusPreview } from "@/content/site";

export function DungeonStatusStrip() {
  const currentFloor = floors.find((f) => f.index === dungeonStatusPreview.currentFloorIndex);
  if (!currentFloor) return null;

  const items = [
    {
      label: "Current Floor",
      value: `Floor ${currentFloor.roman} · ${currentFloor.name}`,
    },
    {
      icon: Gauge,
      label: "Mined",
      value: `${dungeonStatusPreview.percentMined}%`,
    },
    {
      icon: CalendarClock,
      label: "Days Remaining",
      value: `${dungeonStatusPreview.daysRemaining}`,
    },
    {
      icon: Users,
      label: "Miners Active",
      value: dungeonStatusPreview.minersActive,
    },
    {
      icon: ArrowDownCircle,
      label: "Next Descent",
      value: dungeonStatusPreview.nextMultiplier,
    },
  ];

  return (
    <div className="relative border-y border-white/[0.06] bg-void-200/60 backdrop-blur-sm">
      <div className="section-shell">
        <div className="flex items-center gap-6 overflow-x-auto py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Dungeon Preview
          </span>

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
