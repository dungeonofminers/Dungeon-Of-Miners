import { cn } from "@/lib/utils";

type GlowOrbProps = {
  className?: string;
  color?: "gold" | "torch" | "emerald";
};

const colorMap = {
  gold: "bg-gold/25",
  torch: "bg-torch/20",
  emerald: "bg-emerald-glow/15",
};

export function GlowOrb({ className, color = "gold" }: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[100px]",
        colorMap[color],
        className
      )}
    />
  );
}
