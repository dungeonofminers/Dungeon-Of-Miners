import type { Metadata } from "next";
import { UserPlus, Gift, ShieldAlert, Send } from "lucide-react";
import {
  siteConfig,
  referralProgram,
  referralProgramDashboardShape,
  referralBooster,
  marketingRewardPool,
} from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: `Referral Program — ${siteConfig.name} (${siteConfig.ticker})`,
  description: `Invite friends and earn ${referralProgram.rewardDom} DOM for each one who joins the official Telegram channel and makes their first mining claim.`,
};

export default function ReferralPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
        <GlowOrb color="emerald" className="right-0 top-1/3 h-[350px] w-[350px]" />

        <div className="section-shell relative">
          <SectionHeading
            eyebrow="Referral Program"
            title={`Invite a friend. Earn ${referralProgram.rewardDom} DOM.`}
            description={referralProgram.communityMessage}
          />
        </div>
      </section>

      <section className="relative pb-20">
        <div className="section-shell">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            <Reveal>
              <div className="surface-panel h-full p-6 text-center">
                <UserPlus className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-2xl text-gold">{referralProgram.rewardDom} DOM</p>
                <p className="mt-1 text-sm text-ink-muted">For every friend who joins the channel and makes their first mining claim</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="surface-panel h-full p-6 text-center">
                <Gift className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-2xl text-gold">{referralProgram.maxFriends} friends</p>
                <p className="mt-1 text-sm text-ink-muted">
                  Up to {referralProgram.maxTotalDom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DOM per inviter
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="surface-panel h-full p-6 text-center">
                <Send className="mx-auto h-6 w-6 text-emerald-glow" />
                <p className="mt-4 font-display text-2xl text-emerald-glow">1 step</p>
                <p className="mt-1 text-sm text-ink-muted">
                  Your friend joins the Telegram channel and makes their first mining claim
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="surface-panel mx-auto mt-6 max-w-4xl p-8 sm:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Your Referral Stats</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {referralProgramDashboardShape.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center">
                    <p
                      className={`font-display text-sm sm:text-base ${
                        stat.value === "Awaiting Live Data" ? "text-ink-faint" : "text-gold"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint">{stat.label}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-5 flex flex-col gap-2">
                {referralProgram.yourView.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink-faint">
                One level only — there is no downline, and no Level 2 or Level 3 referral reward.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="surface-panel mx-auto mt-6 max-w-4xl p-8 sm:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">How it works</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {referralProgram.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                    {rule}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {referralProgram.friendStatuses.map((status) => (
                  <span
                    key={status}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      status === "Qualified"
                        ? "border-emerald-glow/30 bg-emerald-glow/10 text-emerald-glow"
                        : "border-white/10 bg-white/[0.03] text-ink-muted"
                    }`}
                  >
                    {status}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
                <p className="text-xs text-ink-faint">
                  Self-referrals, automated accounts, and multi-account farming are not allowed
                  and can invalidate rewards. Referral manipulation is covered by our{" "}
                  <a href="/fair-play" className="text-gold underline-offset-4 hover:underline">
                    Fair Play Policy
                  </a>{" "}
                  — we don&apos;t publish exact detection logic.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
              <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">Reward pool:</span> {referralProgram.note}{" "}
                (Pool size: {marketingRewardPool.size} · Source: {marketingRewardPool.source}.)
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Referral Booster — planned.</span> A capped
                mining-weight boost (+{referralBooster.weightPerActiveReferral}% per active qualified
                referral, up to +{referralBooster.maxBoostPercent}%) is paused at 0% during the
                launch phase and is the planned long-term replacement. See{" "}
                <a href="/docs/referral" className="text-gold underline-offset-4 hover:underline">
                  the docs
                </a>{" "}
                and{" "}
                <a href="/docs/rewards" className="text-gold underline-offset-4 hover:underline">
                  Earn &amp; Daily Check-In
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
