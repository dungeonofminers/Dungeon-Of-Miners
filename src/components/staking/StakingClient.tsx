"use client";

import { useEffect, useState } from "react";
import { Lock, ArrowLeft, EyeOff } from "lucide-react";
import { Web3Provider } from "@/components/providers/Web3Provider";
import { StakingPage } from "@/components/staking/StakingPage";
import { navTopRight } from "@/content/site";
import { STAKING_PREVIEW_KEY } from "@/content/staking.config";

const PREVIEW_STORAGE_KEY = "dom_staking_team_preview";

export default function StakingClient() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // If Staking is publicly launched (`comingSoon` removed/false), everyone can view
    if (!navTopRight.comingSoon) {
      setAuthorized(true);
      setIsPreviewMode(false);
      return;
    }

    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1";
    const params = new URLSearchParams(window.location.search);
    const previewParam = params.get("preview");

    // Allow `?preview=off` to lock the page again after testing
    if (previewParam === "off") {
      try {
        localStorage.removeItem(PREVIEW_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setAuthorized(false);
      return;
    }

    if (previewParam === STAKING_PREVIEW_KEY) {
      try {
        localStorage.setItem(PREVIEW_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setAuthorized(true);
      setIsPreviewMode(true);
      return;
    }

    let saved = false;
    try {
      saved = localStorage.getItem(PREVIEW_STORAGE_KEY) === "1";
    } catch {
      saved = false;
    }

    if (isLocal || saved) {
      setAuthorized(true);
      setIsPreviewMode(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) {
    return <div className="min-h-screen" />;
  }

  if (!authorized) {
    return (
      <section className="relative flex min-h-[80vh] items-center justify-center pb-24 pt-32">
        <div className="section-shell">
          <div className="surface-panel mx-auto max-w-md p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <Lock className="h-6 w-6" />
            </div>
            <span className="eyebrow mt-5 inline-flex">Coming Soon</span>
            <h1 className="heading-md mt-3 text-2xl">DOM Staking is in Final Preparation</h1>
            <p className="body-lg mt-3 text-sm">
              Fixed-term DOM staking on BNB Smart Chain is currently undergoing final internal review
              before public launch. Follow our official announcements for the opening schedule.
            </p>
            <div className="mt-6 flex justify-center">
              <a href="/" className="btn-primary">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Web3Provider>
      {isPreviewMode && (
        <div className="fixed bottom-3 right-3 z-[90] flex items-center gap-2 rounded-full border border-gold/40 bg-void-100/95 px-3 py-1.5 text-[11px] font-semibold text-gold shadow-lg backdrop-blur-md sm:bottom-4 sm:right-4 sm:gap-2.5 sm:px-4 sm:py-2 sm:text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-glow" />
          <span>Team Preview</span>
          <a
            href="/staking?preview=off"
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-ink-muted transition-colors hover:border-torch/40 hover:text-torch"
            title="Exit team preview mode"
          >
            <EyeOff className="h-3 w-3" />
            Lock
          </a>
        </div>
      )}
      <StakingPage />
    </Web3Provider>
  );
}
