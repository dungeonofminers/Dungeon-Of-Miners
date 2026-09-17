import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { siteConfig, treasuryWallets, vestingConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Treasury & Vesting — ${siteConfig.name} (${siteConfig.ticker})`,
  description: "Every non-mining DOM wallet, its purpose, and its unlock status — no fabricated addresses or balances.",
};

export default function TreasuryPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Treasury & Allocation"
            title="Where every allocation actually lives"
            description="Each wallet below will carry a real, verifiable BNB Smart Chain address once published. Until then, Address, Balance, and Vesting stay honest placeholders — never invented."
          />

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-2">
            {treasuryWallets.map((wallet, i) => (
              <Reveal key={wallet.id} delay={i * 0.06}>
                <div className="surface-panel h-full p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-ink">{wallet.label}</h3>
                    <span className="shrink-0 font-display text-lg text-gold">{wallet.allocation}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">{wallet.purpose}</p>

                  <dl className="mt-5 flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <dt className="text-ink-faint">Address</dt>
                      <dd className="font-semibold text-ink-faint">{wallet.address}</dd>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <dt className="text-ink-faint">Balance</dt>
                      <dd className="font-semibold text-ink-faint">{wallet.balance}</dd>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <dt className="text-ink-faint">Vesting / Lock</dt>
                      <dd className="font-semibold text-ink-faint">{wallet.vesting}</dd>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <dt className="text-ink-faint">Explorer</dt>
                      <dd className="font-semibold text-ink-faint">{wallet.explorer}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="surface-panel mx-auto mt-10 max-w-3xl p-8 sm:p-10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-torch" />
                <div>
                  <h3 className="heading-md text-lg">Token Unlock Schedule</h3>
                  <span className="mt-2 inline-flex rounded-full border border-torch/30 bg-torch/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-torch">
                    {vestingConfig.status}
                  </span>
                  <p className="body-lg mt-4 text-sm">{vestingConfig.note}</p>
                  <p className="mt-4 text-xs uppercase tracking-wider text-ink-faint">Covers</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {vestingConfig.covers.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
