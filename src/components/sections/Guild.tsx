import { Trophy, Send, Crown, ShieldPlus, LogIn, LogOut, ArrowLeftRight, UserMinus, Star, Swords, CalendarClock } from "lucide-react";
import { guildStats, guildRuleDetails, guildBoosterTiers, guildCreationFlow, guildConfig, guildXP, guildExpeditions, guildSeasons } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

export function Guild() {
  return (
    <section id="guild" className="relative overflow-hidden py-24 sm:py-32">
      <GlowOrb color="emerald" className="right-0 top-1/3 h-[350px] w-[350px]" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Guild System"
          title="No one mines alone"
          description="Connect your Telegram community, coordinate expeditions, and earn a shared Guild Booster that rewards guilds who actually show up together."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="surface-panel h-full p-8 sm:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-glow/25 bg-emerald-glow/10">
                <Send className="h-5 w-5 text-emerald-glow" />
              </div>
              <h3 className="heading-md mt-5">Connect Your Telegram Group</h3>
              <p className="body-lg mt-3">
                Any Telegram Group or Supergroup admin can create a Guild and bind it to their
                community&rsquo;s permanent chat ID — not a username that can change.
              </p>

              <ol className="mt-6 flex flex-col gap-2.5">
                {guildCreationFlow.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[11px] font-bold text-gold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="surface-panel h-full p-8 sm:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                <Trophy className="h-5 w-5 text-gold" />
              </div>
              <h3 className="heading-md mt-5 text-xl">Guild Leaderboard</h3>
              <p className="body-lg mt-3 text-sm">
                Guilds are ranked by verified activity and mining contribution — never by raw
                member count. Standings are recorded permanently, Halving by Halving.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="surface-panel mx-auto mt-6 max-w-5xl p-8 sm:p-10">
            <h3 className="heading-md text-lg">Guild Booster — tiered, always capped</h3>
            <p className="body-lg mt-2 text-sm">
              The booster scales with how active your guild really is, recalculated daily.
              Empty or inactive guilds earn nothing — it modifies mining weight only and never
              creates DOM beyond the global emission ceiling.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {guildBoosterTiers.map((tier) => (
                <div
                  key={tier.activeThreshold}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center"
                >
                  <p className="font-display text-2xl text-emerald-glow">+{tier.weightBonus}%</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                    {tier.activeThreshold}%+ active
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={0.24}>
            <div className="surface-panel h-full p-7">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gold" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Guild XP & Levels</h3>
              </div>
              <p className="body-lg mt-3 text-sm">
                Guild XP is earned by the whole guild — not any one member — and unlocks cosmetic
                banners, badges, titles, and profile frames. It never creates uncapped DOM.
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-ink-faint">Earned from</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {guildXP.sources.map((source) => (
                  <li key={source} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-muted">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="surface-panel h-full p-7">
              <div className="flex items-center gap-2">
                <Swords className="h-4 w-4 text-emerald-glow" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Guild Expeditions</h3>
              </div>
              <p className="body-lg mt-3 text-sm">
                {guildExpeditions.cadences.join(" and ")} targets the whole guild completes
                together — for example: {guildExpeditions.examples.slice(0, 3).join("; ")}.
              </p>
              <p className="mt-3 text-xs text-ink-faint">
                Rewards: {guildExpeditions.rewards.join(", ")} — never an unlimited DOM faucet.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.32}>
          <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-ink">
                {guildSeasons.current} — running alongside {guildSeasons.tiedTo}
              </span>
            </div>
            <p className="text-xs text-ink-faint">{guildSeasons.onSeasonEnd}</p>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {guildStats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.15 + i * 0.05}>
              <div className="surface-panel flex flex-col items-center gap-1 p-6 text-center">
                <p className="font-display text-2xl text-ink sm:text-3xl">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-ink-faint">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={0.3}>
            <div className="surface-panel h-full p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Guild Roles & Actions
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <RoleTag icon={Crown} label="Owner" />
                <RoleTag icon={ShieldPlus} label="Officer" />
                <RoleTag icon={LogIn} label="Join Guild" />
                <RoleTag icon={LogOut} label="Leave Guild" />
                <RoleTag icon={ArrowLeftRight} label="Transfer Ownership" />
                <RoleTag icon={UserMinus} label="Kick Member" />
              </div>
              <p className="mt-4 text-xs text-ink-faint">
                A player can belong to only one guild at a time. After leaving, rejoining another
                guild requires a {guildConfig.joinCooldownHours}-hour cooldown.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="surface-panel h-full p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Guild Rules
              </h3>
              <dl className="mt-4 flex flex-col gap-2.5">
                {guildRuleDetails.map((rule) => (
                  <div key={rule.label} className="flex items-center justify-between text-sm">
                    <dt className="text-ink-muted">{rule.label}</dt>
                    <dd className="font-semibold text-ink-faint">{rule.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RoleTag({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs text-ink-muted">
      <Icon className="h-3.5 w-3.5 text-emerald-glow" />
      {label}
    </div>
  );
}
