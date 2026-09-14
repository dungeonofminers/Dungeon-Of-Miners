import type { Metadata } from "next";
import { ArrowRight, UserPlus, Gift, ShieldAlert } from "lucide-react";
import { siteConfig, links } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: `Referral Program — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Invite miners, earn permanent hashrate — not revenue sharing.",
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
            title="Invite miners. Earn permanent hashrate."
            description="This isn't revenue sharing — it's a permanent, capped boost to your own mining rate."
          />
        </div>
      </section>

      <section className="relative pb-20">
        <div className="section-shell">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            <Reveal>
              <div className="surface-panel h-full p-6 text-center">
                <UserPlus className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-2xl text-gold">+2%</p>
                <p className="mt-1 text-sm text-ink-muted">Permanent hashrate per qualified referral</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="surface-panel h-full p-6 text-center">
                <Gift className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-2xl text-gold">50 max</p>
                <p className="mt-1 text-sm text-ink-muted">Referrals count toward the cap — up to +100%</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="surface-panel h-full p-6 text-center">
                <Gift className="mx-auto h-6 w-6 text-emerald-glow" />
                <p className="mt-4 font-display text-2xl text-emerald-glow">+50 DOM</p>
                <p className="mt-1 text-sm text-ink-muted">Starter bonus your invited friend receives</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="surface-panel mx-auto mt-6 max-w-4xl p-8 sm:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                How a referral qualifies
              </h3>
              <p className="body-lg mt-3 text-sm">
                A referral only qualifies once your friend claims on 3 different days. Self-referrals,
                automated accounts, and multi-account farming are not allowed and can invalidate
                rewards.
              </p>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
                <p className="text-xs text-ink-faint">
                  Referral manipulation is covered by our{" "}
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
