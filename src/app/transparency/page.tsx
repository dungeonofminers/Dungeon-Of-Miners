import type { Metadata } from "next";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { siteConfig, transparencyConfig, supplyFacts } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: `Transparency — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "DOM's network, token standard, contract status, and supply facts — never fabricated.",
};

const contractRows: { label: string; value: string; badge?: boolean }[] = [
  { label: "Network", value: transparencyConfig.network },
  { label: "Token", value: transparencyConfig.token },
  { label: "Standard", value: transparencyConfig.standard },
  { label: "Contract Address", value: transparencyConfig.contractAddress, badge: true },
  { label: "Total Supply", value: transparencyConfig.totalSupply },
  { label: "Additional Minting", value: transparencyConfig.additionalMinting },
  { label: "Contract Status", value: transparencyConfig.contractStatus, badge: true },
];

export default function TransparencyPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden pb-16 pt-8">
        <GlowOrb color="gold" className="left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2" />
        <div className="section-shell relative">
          <SectionHeading
            eyebrow="BSC Transparency"
            title="Everything about the DOM contract, in one place"
            description="If a figure below isn't known yet, it says so plainly — Dungeon of Miners never fabricates a contract address, an audit, or a security badge."
          />

          <Reveal delay={0.1}>
            <div className="surface-panel mx-auto mt-14 max-w-2xl p-8 sm:p-10">
              <dl className="flex flex-col gap-4">
                {contractRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                    <dt className="text-sm text-ink-muted">{row.label}</dt>
                    <dd
                      className={
                        row.badge
                          ? "rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-faint"
                          : "font-display text-base text-ink"
                      }
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-ink-muted">
                  <ExternalLink className="h-4 w-4 text-ink-faint" />
                  {transparencyConfig.explorerName}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {transparencyConfig.explorerUrl}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-glow" />
              <p className="text-xs leading-relaxed text-ink-faint">
                Once the DOM contract is deployed and verified, this page will show the real
                contract address, its BscScan link, and its verified status. Until then, every
                field above stays exactly as shown — never a placeholder address dressed up as
                real.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-2xl">
            <h3 className="heading-md text-lg">Fixed-supply facts</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {supplyFacts.map((fact) => (
                <div key={fact.label} className="surface-panel p-4 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-ink-faint">{fact.label}</p>
                  <p className="mt-1 font-display text-sm text-gold sm:text-base">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 text-center">
            <a href="/treasury" className="text-sm text-gold underline-offset-4 hover:underline">
              See the full Treasury & Vesting breakdown →
            </a>
            <a href="/#dashboard" className="text-sm text-gold underline-offset-4 hover:underline">
              View the Live Economy Dashboard →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
