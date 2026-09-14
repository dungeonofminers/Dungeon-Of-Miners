// ---------------------------------------------------------------------------
// Ellipse geometry helpers shared by the visible orbit rings and the coin
// motion driver. Coins are positioned with the same parametric formula used
// to draw the ring, so the glowing line and the coins riding it never drift
// apart.
// ---------------------------------------------------------------------------

export type OrbitConfig = {
  id: "orbit-01" | "orbit-02";
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** Tilt of the ellipse itself, in degrees — gives the "seen in 3D space" look. */
  rotationDeg: number;
};

export const orbits: Record<"orbit-01" | "orbit-02", OrbitConfig> = {
  "orbit-01": { id: "orbit-01", cx: 960, cy: 372, rx: 505, ry: 138, rotationDeg: -7 },
  "orbit-02": { id: "orbit-02", cx: 960, cy: 392, rx: 615, ry: 178, rotationDeg: 5 },
};

/** Builds a closed SVG path `d` string tracing a rotated ellipse (two arcs). */
export function ellipsePathD({ cx, cy, rx, ry, rotationDeg }: OrbitConfig): string {
  const rot = (rotationDeg * Math.PI) / 180;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);
  const p1x = cx + rx * cosR;
  const p1y = cy + rx * sinR;
  const p2x = cx - rx * cosR;
  const p2y = cy - rx * sinR;
  return [
    `M ${p1x.toFixed(2)} ${p1y.toFixed(2)}`,
    `A ${rx} ${ry} ${rotationDeg} 0 1 ${p2x.toFixed(2)} ${p2y.toFixed(2)}`,
    `A ${rx} ${ry} ${rotationDeg} 0 1 ${p1x.toFixed(2)} ${p1y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

export type OrbitPoint = {
  x: number;
  y: number;
  /** -1 (deep back) .. +1 (deep front), the coin's own local position before the ellipse tilt is applied. */
  depth: number;
};

/**
 * Position of a point at parametric angle `t` (0-1 = one full lap) along an
 * orbit, plus a depth cue used to fake front/behind-the-logo perspective.
 */
export function pointOnOrbit(orbit: OrbitConfig, t: number): OrbitPoint {
  const theta = t * Math.PI * 2;
  const localX = orbit.rx * Math.cos(theta);
  const localY = orbit.ry * Math.sin(theta);
  const rot = (orbit.rotationDeg * Math.PI) / 180;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);
  const worldX = localX * cosR - localY * sinR;
  const worldY = localX * sinR + localY * cosR;
  return {
    x: orbit.cx + worldX,
    y: orbit.cy + worldY,
    depth: Math.sin(theta),
  };
}
