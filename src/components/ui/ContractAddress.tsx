"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type ContractAddressProps = {
  address: string;
  className?: string;
};

export function truncateAddress(address: string) {
  if (address.length <= 14) return address;
  return `${address.slice(0, 8)}…${address.slice(-6)}`;
}

export function ContractAddress({ address, className }: ContractAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={address}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs transition-colors hover:border-gold/30 hover:bg-white/[0.06]",
        className
      )}
    >
      <span className="text-ink-faint">DOM Contract</span>
      <span className="font-mono text-ink">{truncateAddress(address)}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-glow" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-ink-faint" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Address copied" : ""}
      </span>
    </button>
  );
}
