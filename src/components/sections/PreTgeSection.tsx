import { Wallet, ShieldCheck, Fuel } from "lucide-react";
import { withdrawalConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const flowSteps = [
  "Connect wallet",
  "Enter withdrawal amount",
  "Server validates eligible balance",
  "Confirm withdrawal",
  "Backend creates withdrawal request",
  "Approved request is broadcast on-chain",
  "Transaction hash + block explorer link returned",
  "Status tracked to Confirmed",
];

export function PreTgeSection() {
  return (
    <section id="withdrawal" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="On-Chain Withdrawal"
          title="Mine DOM. Withdraw On-Chain."
          description="Eligible DOM balances can be requested for withdrawal directly to your connected wallet."
        />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-panel h-full p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                <Fuel className="h-5 w-5 text-gold" />
              </div>
              <h3 className="heading-md mt-4 text-lg">Zero Withdrawal Fee</h3>
              <p className="body-lg mt-2 text-sm">
                Dungeon of Miners charges miners no withdrawal fee. Network transaction costs are
                sponsored by the ecosystem.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-glow">
                  {withdrawalConfig.feeDom} DOM Fee
                </span>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                  {withdrawalConfig.gasSponsorLabel}
                </span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-faint">
                This describes the fee the miner pays — not the blockchain itself. The network
                still has a real transaction cost; the ecosystem covers it on the miner&apos;s
                behalf.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-panel h-full p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Wallet className="h-5 w-5 text-ink-faint" />
              </div>
              <h3 className="heading-md mt-4 text-lg">Network Configuration</h3>
              <dl className="mt-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">Network</dt>
                  <dd className="font-semibold text-ink-faint">{withdrawalConfig.network}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">DOM Contract</dt>
                  <dd className="font-semibold text-ink-faint">{withdrawalConfig.domContractAddress}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">Block Explorer</dt>
                  <dd className="font-semibold text-ink-faint">{withdrawalConfig.blockExplorerUrl}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">Minimum Withdrawal</dt>
                  <dd className="font-semibold text-ink-faint">{withdrawalConfig.minimumWithdrawal}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-ink-muted">Maximum Withdrawal</dt>
                  <dd className="font-semibold text-ink-faint">{withdrawalConfig.maximumWithdrawal}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="surface-panel mx-auto mt-6 max-w-4xl p-7 sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Withdrawal Flow
            </h3>
            <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {flowSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-ink-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[11px] font-bold text-gold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
              {withdrawalConfig.statuses.map((status) => (
                <span
                  key={status}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint"
                >
                  {status}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-glow" />
            <p className="text-xs text-ink-faint">
              Withdrawal approval is always server-authoritative — the frontend never decides the
              final withdrawable amount. Balances move through <code>available</code> →{" "}
              <code>pendingWithdrawal</code> → <code>withdrawn</code> with atomic database
              transactions to prevent duplicate withdrawals.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
