import { assets } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const pillars = [
  {
    image: assets.iconLivingEconomy,
    title: "A Living Dungeon Economy",
    description:
      "DOM isn't mined into an infinite void. Every floor carries a fixed allocation, and every claim brings the world closer to its next Descent.",
  },
  {
    image: assets.iconScarcityWatch,
    title: "Scarcity You Can Watch",
    description:
      "The Descent isn't a whitepaper promise — it's a public countdown. When a floor's supply runs dry or 90 days pass, the whole community feels it together.",
  },
  {
    image: assets.iconHonestPretge,
    title: "Honest, Pre-TGE by Design",
    description:
      "DOM has no live payout and no prize pool today. Withdraw requests are recorded and clearly marked Pre-TGE · Locked until listing — no exceptions, no fine print.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About Dungeon of Miners"
          title="A dungeon-mining game built on real scarcity"
          description="Dungeon of Miners takes the idle-mining format and gives it a mechanic that actually matters: a shared, shrinking supply that the entire community mines against — together."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
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
