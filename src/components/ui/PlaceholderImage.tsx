"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

type PlaceholderImageProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  aspect?: string;
};

/**
 * Renders /public asset images with a graceful, on-brand fallback.
 * Until the real asset is dropped into /public/assets, this shows a
 * dungeon-styled placeholder instead of a broken image icon.
 */
export function PlaceholderImage({
  src,
  alt,
  label,
  className,
  imgClassName,
  aspect = "aspect-square",
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // The <img> starts loading during SSR HTML parsing, before React
    // hydrates and attaches onError — so a load that already failed by
    // mount time needs to be caught here instead of relying on the event.
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  if (failed) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-stone-900 via-void-100 to-void-200",
          aspect,
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,181,68,0.12),transparent_60%)]" />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          <ImageOff className="h-6 w-6 text-gold/50" strokeWidth={1.5} />
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
            {label ?? alt}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 border border-white/5" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={cn("object-cover", aspect, className, imgClassName)}
    />
  );
}
