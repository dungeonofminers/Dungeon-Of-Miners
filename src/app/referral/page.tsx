import type { Metadata } from "next";
import { ArrowRight, UserPlus, Gift, ShieldAlert, Zap } from "lucide-react";
import { siteConfig, links, referralBooster, referralDashboardShape } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: `Referral Booster — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Invite active miners, earn a capped Mining Weight boost — not revenue sharing.",
};

export default function ReferralPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,138,30,0.18),transparent)]" />
        <GlowOrb color="emerald" className="right-0 top-1/3 h-[350px] w-[350px]" />

        <div className="section-shell relative">
          <SectionHeading
            eyebrow="Referral Booster"
            title="Invite active miners. Earn Mining Weight."
            description="This isn't revenue sharing — it's a capped, activity-based boost to your own Effective Mining Weight."
          />
        </div>
      </section>

      <section className="relative pb-20">
        <div className="section-shell">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            <Reveal>
              <div className="surface-panel h-full p-6 text-center">
                <UserPlus className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-2xl text-gold">+{referralBooster.weightPerActiveReferral}%</p>
                <p className="mt-1 text-sm text-ink-muted">Mining Weight per active qualified referral</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="surface-panel h-full p-6 text-center">
                <Gift className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-2xl text-gold">{referralBooster.maxQualifiedReferrals} max</p>
                <p className="mt-1 text-sm text-ink-muted">
                  Qualified referrals count toward the cap — up to +{referralBooster.maxBoostPercent}%
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="surface-panel h-full p-6 text-center">
                <Zap className="mx-auto h-6 w-6 text-emerald-glow" />
                <p className="mt-4 font-display text-2xl text-emerald-glow">
                  +{referralBooster.starterBoost.percent}%
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Starter Mining Boost your invited friend gets for {referralBooster.starterBoost.durationHours}h
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="surface-panel mx-auto mt-6 max-w-4xl p-8 sm:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Your Referral Stats</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {referralDashboardShape.map((stat) => (
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
              <p className="mt-3 text-xs text-ink-faint">
                One level only — there is no downline, and no Level 2 or Level 3 referral reward.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="surface-panel mx-auto mt-6 max-w-4xl p-8 sm:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Milestones</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {referralBooster.milestones.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold"
                  >
                    {m} Qualified Miner{m > 1 ? "s" : ""}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                Milestones unlock badges, cosmetics, and titles — never additional uncapped DOM
                rewards.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="surface-panel mx-auto mt-6 max-w-4xl p-8 sm:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                How a referral qualifies
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {referralBooster.qualificationRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                    {rule}
                  </li>
                ))}
              </ul>
              <p className="body-lg mt-4 text-sm">
                Referral ownership is immutable once attributed — a referred account can never
                switch referrers later, and the same referral is never credited twice.
              </p>
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

          <Reveal delay={0.22}>
            <div className="mx-auto mt-8 flex max-w-4xl justify-center">
              <a href={links.miniApp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Enter Mini App
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
