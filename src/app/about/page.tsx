import type { Metadata } from "next";
import { Mail, Send, Twitter, Linkedin, Users } from "lucide-react";
import { siteConfig, links, contactEmail, teamMembers } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "Who builds Dungeon of Miners, how to reach the team, and what the game is about.",
};

function isLinkedIn(url: string): boolean {
  return /linkedin\.com/i.test(url);
}

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden pb-20 pt-8">
        <GlowOrb color="gold" className="left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2" />
        <div className="section-shell relative">
          <SectionHeading
            eyebrow="About"
            title="The team behind the Dungeon"
            description="Dungeon of Miners is built by a small team of miners, engineers, and community operators on BNB Smart Chain."
          />

          <Reveal delay={0.1}>
            <div className="surface-panel mx-auto mt-14 max-w-3xl p-8 sm:p-10">
              <h3 className="heading-md text-lg">What is Dungeon of Miners?</h3>
              <p className="body-lg mt-3 text-sm">
                Dungeon of Miners is an idle-mining ecosystem on BNB Smart Chain. Players mine DOM
                around the clock, upgrade their Pickaxe through six levels by holding DOM, and
                progress through six Halving eras — each of which mines out its own fixed slice of a
                capped 550,000,000 DOM Mining Allocation. Eligible DOM can be withdrawn on-chain.
              </p>
              <p className="body-lg mt-4 text-sm">
                The economy is built on a permanently fixed supply of 1,000,000,000 DOM with
                minting disabled, a server-authoritative emission system, and on-chain verification
                of every withdrawal.
              </p>
            </div>
          </Reveal>

          {/* Team */}
          <div className="mx-auto mt-20 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                  <Users className="h-5 w-5 text-gold" />
                </div>
                <h3 className="heading-md mt-4 text-xl">Meet the Miners</h3>
                <p className="body-lg mt-2 text-sm">
                  The people building the dungeon, the economy, and the community.
                </p>
              </div>
            </Reveal>

            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
              {teamMembers.map((member, i) => (
                <Reveal key={member.name} delay={0.08 + i * 0.08}>
                  <div className="group relative flex h-full flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.04]">
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-full bg-gold/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <PlaceholderImage
                        src={member.image}
                        alt={member.name}
                        label={member.name}
                        className="relative h-24 w-24 rounded-full border-2 border-gold/40 shadow-glow-gold transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="mt-4 font-display text-base text-ink">{member.name}</h4>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{member.bio}</p>
                    {member.link && (
                      <a
                        href={member.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-ink-muted transition-colors hover:border-gold/40 hover:text-gold"
                      >
                        {isLinkedIn(member.link) ? (
                          <Linkedin className="h-3.5 w-3.5" />
                        ) : (
                          <Twitter className="h-3.5 w-3.5" />
                        )}
                        Profile
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Reveal delay={0.2}>
            <div className="surface-panel mx-auto mt-16 max-w-3xl p-8 text-center sm:p-10">
              <h3 className="heading-md text-lg">Contact</h3>
              <p className="body-lg mt-3 text-sm">
                Official channels — no other account speaks for the project.
              </p>
              <div className="mt-6 flex flex-col items-center gap-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {contactEmail}
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href={links.telegramCommunity}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram community"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink-muted transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Send className="h-4 w-4" />
                  </a>
                  <a
                    href={links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X / Twitter"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink-muted transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
