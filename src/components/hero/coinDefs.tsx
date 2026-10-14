// ---------------------------------------------------------------------------
// Orbiting objects for the Dungeon of Miners animated hero banner.
//
// Each entry drives:
//   - which orbit ellipse the object travels on ("orbit-01" | "orbit-02")
//   - how long one full lap takes (duration) and where it starts (offset)
//   - the self-rotation + floating timings used by useDungeonHeroAnimation
//   - the tooltip copy shown on hover
//
// To add an object: add an entry here (pick an unused `offset` so it doesn't
// overlap another object at t=0) and drop its image into /public/assets.
// ---------------------------------------------------------------------------

export type CoinDef = {
  id: string;
  name: string;
  fullName: string;
  /** Path to the image in /public/assets. */
  image: string;
  orbit: "orbit-01" | "orbit-02";
  /** Seconds for one full orbit lap. */
  duration: number;
  /** Starting position along the path, 0-1 (keeps objects from clumping). */
  offset: number;
  /** Seconds for one full self-rotation (rotateY illusion via scaleX). */
  spin: number;
  /** Base radius in px of the object graphic. */
  size: number;
};

export const coinDefs: CoinDef[] = [
  { id: "1", name: "Pickaxe", fullName: "your mining pickaxe", image: "/assets/coin-orbit-1.png", orbit: "orbit-01", duration: 18, offset: 0, spin: 6, size: 34 },
  { id: "2", name: "BNB", fullName: "launch on BNB Smart Chain", image: "/assets/coin-orbit-2.png", orbit: "orbit-01", duration: 21, offset: 0.5, spin: 5, size: 32 },
  { id: "3", name: "USDT", fullName: "paired with USDT", image: "/assets/coin-orbit-3.png", orbit: "orbit-02", duration: 23, offset: 0.25, spin: 6.5, size: 34 },
  { id: "4", name: "DOM", fullName: "DOM Tokens Reward", image: "/assets/coin-orbit-4.png", orbit: "orbit-02", duration: 19, offset: 0.75, spin: 5.5, size: 33 },
];

/** Renders the orbiting object image, clipped to a circle. */
export function CoinGraphic({ def }: { def: CoinDef }) {
  const r = def.size;
  return (
    <>
      <defs>
        <clipPath id={`coin-clip-${def.id}`}>
          <circle r={r} />
        </clipPath>
      </defs>
      <image
        href={def.image}
        x={-r}
        y={-r}
        width={r * 2}
        height={r * 2}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#coin-clip-${def.id})`}
      />
      <circle r={r - 0.5} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
    </>
  );
}
