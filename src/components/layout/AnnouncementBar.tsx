import { Megaphone } from "lucide-react";
import { announcementBar } from "@/content/site";

export function AnnouncementBar() {
  if (!announcementBar.visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-gold-dark via-gold to-gold-dark px-4">
      {/* Shimmer sweep — a subtle light gliding across the bar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 motion-safe:animate-shimmer bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] bg-[length:200%_100%]"
      />
      <Megaphone className="relative h-3.5 w-3.5 shrink-0 text-void-200" />
      <span className="relative truncate text-[11px] font-bold uppercase tracking-[0.18em] text-void-200 sm:text-xs">
        {announcementBar.text}
      </span>
    </div>
  );
}
