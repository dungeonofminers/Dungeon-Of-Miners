// ---------------------------------------------------------------------------
// Crypto coin definitions for the Dungeon of Miners animated hero banner.
//
// Each entry drives:
//   - which orbit ellipse the coin travels on ("orbit-01" | "orbit-02")
//   - how long one full lap takes (duration) and where it starts (offset)
//   - the self-rotation + floating timings used by useDungeonHeroAnimation
//   - the tooltip copy shown on hover
//
// To add a new coin: add an entry here (pick an unused `offset` so it
// doesn't overlap another coin at t=0) and add its <CoinGraphic> case below.
// ---------------------------------------------------------------------------

export type CoinId = "bnb" | "btc" | "eth" | "usdt" | "sol" | "doge";

/** Brand-tinted face colors per coin, used to build the <defs> gradients. */
export const coinColors: Record<CoinId, { faceFrom: string; faceTo: string; rim: string }> = {
  bnb: { faceFrom: "#FFE9A8", faceTo: "#F0B90B", rim: "#8A6A12" },
  btc: { faceFrom: "#FFC773", faceTo: "#F7931A", rim: "#8A4E0E" },
  eth: { faceFrom: "#B9C2F0", faceTo: "#627EEA", rim: "#33408A" },
  usdt: { faceFrom: "#7BD9BE", faceTo: "#26A17B", rim: "#155A46" },
  sol: { faceFrom: "#C8A6FF", faceTo: "#8752E0", rim: "#4B2C86" },
  doge: { faceFrom: "#F5DFA0", faceTo: "#C2A633", rim: "#7A621C" },
};

export type CoinDef = {
  id: CoinId;
  name: string;
  fullName: string;
  orbit: "orbit-01" | "orbit-02";
  /** Seconds for one full orbit lap. */
  duration: number;
  /** Starting position along the path, 0-1 (keeps coins from clumping). */
  offset: number;
  /** Seconds for one full self-rotation (rotateY illusion via scaleX). */
  spin: number;
  /** Base radius in px of the coin graphic. */
  size: number;
};

export const coinDefs: CoinDef[] = [
  { id: "bnb", name: "BNB", fullName: "BNB Smart Chain", orbit: "orbit-01", duration: 16, offset: 0.02, spin: 6, size: 34 },
  { id: "eth", name: "ETH", fullName: "Ethereum", orbit: "orbit-01", duration: 18, offset: 0.36, spin: 5, size: 32 },
  { id: "sol", name: "SOL", fullName: "Solana", orbit: "orbit-01", duration: 19, offset: 0.7, spin: 4.5, size: 32 },
  { id: "btc", name: "BTC", fullName: "Bitcoin", orbit: "orbit-02", duration: 20, offset: 0.15, spin: 7, size: 36 },
  { id: "usdt", name: "USDT", fullName: "Tether", orbit: "orbit-02", duration: 22, offset: 0.5, spin: 6.5, size: 32 },
  { id: "doge", name: "DOGE", fullName: "Dogecoin", orbit: "orbit-02", duration: 21, offset: 0.83, spin: 5.5, size: 33 },
];

/** Renders the metallic coin face + brand mark for a given coin id. Purely presentational SVG. */
export function CoinGraphic({ id, size }: { id: CoinId; size: number }) {
  const r = size;
  return (
    <>
      <circle r={r} fill={`url(#coin-rim-${id})`} />
      <circle r={r - 3} fill={`url(#coin-face-${id})`} />
      <circle r={r - 3} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.75} />
      <CoinMark id={id} r={r} />
      <ellipse
        cx={-r * 0.32}
        cy={-r * 0.4}
        rx={r * 0.38}
        ry={r * 0.2}
        fill="rgba(255,255,255,0.55)"
        opacity={0.5}
        transform="rotate(-35)"
        style={{ mixBlendMode: "screen" }}
      />
    </>
  );
}

function CoinMark({ id, r }: { id: CoinId; r: number }) {
  switch (id) {
    case "btc":
      return (
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight={700}
          fontSize={r * 1.15}
          fill="#FFFFFF"
          y={r * 0.04}
        >
          ₿
        </text>
      );
    case "eth":
      return (
        <g fill="#FFFFFF">
          <polygon points={`0,${-r * 0.55} ${r * 0.34},${r * 0.05} 0,${r * 0.32} ${-r * 0.34},${r * 0.05}`} opacity={0.95} />
          <polygon points={`0,${r * 0.4} ${r * 0.34},${r * 0.12} 0,${r * 0.58} ${-r * 0.34},${r * 0.12}`} opacity={0.75} />
        </g>
      );
    case "usdt":
      return (
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight={700}
          fontSize={r * 1.05}
          fill="#FFFFFF"
          y={r * 0.04}
        >
          T
        </text>
      );
    case "sol":
      return (
        <g fill="#FFFFFF">
          <Parallelogram r={r} y={-r * 0.32} />
          <Parallelogram r={r} y={0} opacity={0.85} />
          <Parallelogram r={r} y={r * 0.32} opacity={0.7} />
        </g>
      );
    case "doge":
      return (
        <g>
          <circle r={r * 0.6} fill="#F2C879" />
          <polygon points={`${-r * 0.5},${-r * 0.15} ${-r * 0.25},${-r * 0.55} ${-r * 0.05},${-r * 0.15}`} fill="#F2C879" />
          <polygon points={`${r * 0.5},${-r * 0.15} ${r * 0.25},${-r * 0.55} ${r * 0.05},${-r * 0.15}`} fill="#F2C879" />
          <ellipse cx={-r * 0.2} cy={-r * 0.05} rx={r * 0.07} ry={r * 0.09} fill="#3A2A1A" />
          <ellipse cx={r * 0.2} cy={-r * 0.05} rx={r * 0.07} ry={r * 0.09} fill="#3A2A1A" />
          <ellipse cx={0} cy={r * 0.2} rx={r * 0.18} ry={r * 0.12} fill="#FFFFFF" opacity={0.9} />
        </g>
      );
    case "bnb":
    default:
      return (
        <g fill="#161D31">
          <RotatedDiamond r={r * 0.24} x={0} y={-r * 0.42} />
          <RotatedDiamond r={r * 0.24} x={-r * 0.42} y={0} />
          <RotatedDiamond r={r * 0.3} x={0} y={0} />
          <RotatedDiamond r={r * 0.24} x={r * 0.42} y={0} />
          <RotatedDiamond r={r * 0.24} x={0} y={r * 0.42} />
        </g>
      );
  }
}

function Parallelogram({ r, y, opacity = 1 }: { r: number; y: number; opacity?: number }) {
  const w = r * 0.7;
  const h = r * 0.16;
  const skew = r * 0.14;
  return (
    <polygon
      points={`${-w / 2 + skew},${y - h} ${w / 2 + skew},${y - h} ${w / 2 - skew},${y + h} ${-w / 2 - skew},${y + h}`}
      opacity={opacity}
    />
  );
}

function RotatedDiamond({ r, x, y }: { r: number; x: number; y: number }) {
  return <polygon points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`} />;
}
