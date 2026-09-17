import type { Metadata } from "next";
import { Send, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig, links } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Support — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Get help with Dungeon of Miners through official channels.",
};

const channels = [
  {
    icon: Send,
    title: "Community Chat",
    description: "Ask questions and get help from the community and moderators.",
    href: links.telegramCommunity,
    cta: "Open Telegram",
  },
  {
    icon: MessageCircle,
    title: "Official Announcements",
    description: "Follow this channel for verified updates — economy changes, maintenance, and official news.",
    href: links.telegramChannel,
    cta: "Follow Channel",
  },
];

export default function SupportPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Support"
            title="Get help through official channels"
            description="Dungeon of Miners never asks for your seed phrase, private key, or recovery phrase — not in support chat, not anywhere. Treat any request for these as a scam."
          />

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {channels.map((channel, i) => (
              <Reveal key={channel.title} delay={i * 0.08}>
                <div className="surface-panel flex h-full flex-col p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                    <channel.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="heading-md mt-4 text-lg">{channel.title}</h3>
                  <p className="body-lg mt-2 flex-1 text-sm">{channel.description}</p>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary mt-5 justify-center"
                  >
                    {channel.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="surface-panel mx-auto mt-6 max-w-3xl p-6 text-center">
              <p className="text-sm text-ink-muted">
                Common questions about mining, withdrawal, Guilds, and referrals are already answered
                in the{" "}
                <a href="/faq" className="text-gold underline-offset-4 hover:underline">
                  FAQ
                </a>{" "}
                and the full{" "}
                <a href="/docs" className="text-gold underline-offset-4 hover:underline">
                  Documentation
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
