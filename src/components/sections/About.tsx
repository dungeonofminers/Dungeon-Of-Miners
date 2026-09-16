import { assets, withdrawalConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const pillars = [
  {
    image: assets.iconLivingEconomy,
    title: "Finite Supply",
    description: "Only 1 billion DOM will ever exist. Every claim brings the network closer to full emission.",
  },
  {
    image: assets.iconScarcityWatch,
    title: "Six Halvings",
    description:
      "Mining emissions decrease as the ecosystem advances through six Halving eras — the deeper it goes, the scarcer new DOM becomes.",
  },
  {
    image: assets.iconHonestPretge,
    title: "On-Chain Withdrawal",
    description: "Withdraw eligible DOM directly to your wallet — a real on-chain transaction, tracked to confirmation.",
  },
  {
    image: assets.iconZeroWithdrawFee,
    title: "Zero Withdrawal Fee",
    description: `No withdrawal fee is charged to miners. Network Fee: ${withdrawalConfig.networkFeeLabel} — network transaction costs are covered by the ecosystem.`,
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About Dungeon of Miners"
          title="A Mining Economy Built Around Scarcity"
          description="Dungeon of Miners takes the idle-mining format and gives it a mechanic that actually matters: a shared, shrinking supply that the entire community mines against — together."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="surface-panel group h-full p-7 transition-colors hover:border-gold/25">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 -z-10 rounded-full bg-gold/25 blur-2xl transition-opacity duration-300 group-hover:bg-gold/40" />
                  <PlaceholderImage
                    src={pillar.image}
                    alt={pillar.title}
                    label={pillar.title}
                    className="h-20 w-20 rounded-2xl shadow-glow-gold transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="heading-md mt-5 text-xl">{pillar.title}</h3>
                <p className="body-lg mt-3 text-sm">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
