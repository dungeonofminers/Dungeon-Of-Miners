"use client";

import { useState } from "react";
import { ShieldCheck, Copy, Check, ExternalLink } from "lucide-react";
import { safeWalletUrl, safeWalletExplorerUrl } from "@/content/site";

export function SafeWalletAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable — the address remains visible to copy manually.
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-glow">
          <ShieldCheck className="h-3.5 w-3.5" />
          Multi-Sig
        </span>
        <button
          type="button"
          onClick={copyAddress}
          aria-label="Copy wallet address"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-ink-faint transition-colors hover:text-gold"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-glow" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p
        className="mt-2 break-all font-mono text-[11px] leading-relaxed text-ink-muted"
        title={address}
      >
        {address}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={safeWalletUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-gold/10 px-3 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Safe
        </a>
        <a
          href={safeWalletExplorerUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-ink-muted transition-colors hover:border-white/20 hover:text-ink"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          BscScan
        </a>
      </div>
    </div>
  );
}
