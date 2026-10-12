import { Megaphone } from "lucide-react";
import { announcementBar } from "@/content/site";

export function AnnouncementBar() {
  if (!announcementBar.visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-gold to-gold-dark px-4">
      <Megaphone className="h-3.5 w-3.5 shrink-0 text-void-200" />
      <span className="truncate text-[11px] font-bold uppercase tracking-[0.18em] text-void-200 sm:text-xs">
        {announcementBar.text}
      </span>
    </div>
  );
}
