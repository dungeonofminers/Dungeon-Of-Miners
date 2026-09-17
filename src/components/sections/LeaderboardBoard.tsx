"use client";

import { useState } from "react";
import { Trophy, User, Users } from "lucide-react";
import { leaderboardConfig } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Board = "player" | "guild";

export function LeaderboardBoard() {
  const [board, setBoard] = useState<Board>("player");
  const [tab, setTab] = useState(0);

  const tabs = board === "player" ? leaderboardConfig.playerTabs : leaderboardConfig.guildTabs;
  const metrics = board === "player" ? leaderboardConfig.playerMetrics : leaderboardConfig.guildMetrics;

  const selectBoard = (next: Board) => {
    setBoard(next);
    setTab(0);
  };

  return (
    <>
      <Reveal delay={0.06}>
        <div className="mx-auto mt-10 flex max-w-xs justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-1.5">
          <button
            type="button"
            onClick={() => selectBoard("player")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              board === "player" ? "bg-gold/15 text-gold" : "text-ink-faint hover:text-ink"
            )}
          >
            <User className="h-3.5 w-3.5" />
            Player
          </button>
          <button
            type="button"
            onClick={() => selectBoard("guild")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              board === "guild" ? "bg-gold/15 text-gold" : "text-ink-faint hover:text-ink"
            )}
          >
            <Users className="h-3.5 w-3.5" />
            Guild
          </button>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-2">
          {tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setTab(i)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                tab === i
                  ? "border-gold/30 bg-gold/10 text-gold"
                  : "border-white/10 bg-white/[0.02] text-ink-faint hover:text-ink"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="surface-panel mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 p-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
            <Trophy className="h-6 w-6 text-gold" />
          </div>
          <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink-faint">
            Awaiting Live Data
          </span>
          <p className="body-lg max-w-sm text-sm">
            The {tabs[tab]} {board === "player" ? "Player" : "Guild"} board renders here once
            connected to the live backend — never a placeholder or fake ranking. Ranked by:
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {metrics.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}
