# Dungeon of Miners — Landing Page

Marketing site for **Dungeon of Miners (DOM)**, a Telegram Mini App idle-mining
game. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer
Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder structure

```
DOM/
├─ public/
│  └─ assets/              ← drop your final images here (see below)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx        ← fonts, <head> metadata, Navbar/Footer shell
│  │  ├─ page.tsx          ← assembles all sections in order
│  │  └─ globals.css       ← design tokens / shared utility classes
│  ├─ content/
│  │  └─ site.ts           ← ALL copy, links, and asset paths live here
│  ├─ components/
│  │  ├─ layout/           ← Navbar, Footer
│  │  ├─ sections/         ← one file per landing page section
│  │  └─ ui/                ← shared primitives (cards, headings, placeholders, effects)
│  └─ lib/
│     └─ utils.ts
├─ tailwind.config.ts       ← color palette, fonts, animations
└─ next.config.mjs
```

## Editing copy

Everything text-based — headings, descriptions, FAQ, floor names, rank
thresholds, feature list, links — lives in one file:

**[`src/content/site.ts`](src/content/site.ts)**

Change a value there and it updates everywhere it's used. You should not need
to touch any component file to update copy, numbers, or links.

## Replacing social & app links

Also in `src/content/site.ts`, near the top:

```ts
export const links = {
  miniApp: "https://t.me/DungeonOfMinersBot/play",
  telegramCommunity: "https://t.me/DungeonOfMiners",
  telegramChannel: "https://t.me/DungeonOfMinersAnnouncements",
  twitter: "https://x.com/DungeonOfMiners",
};
```

Replace each URL with your real ones. Every button and footer icon on the
site reads from this object.

## Replacing images

Drop files into `public/assets/` using the exact filenames listed in
[`public/assets/README.md`](public/assets/README.md) (also mirrored in the
`assets` object in `src/content/site.ts`). Until a file exists, the site
shows a clean, on-brand placeholder instead of a broken image — so you can
launch now and swap in real art later with zero code changes.

Key files:

| File | Section |
| --- | --- |
| `logo-dom.png` | Navbar, footer, hero badge, **and the animated hero banner's `#main-logo`** |
| `floor-*.png` (×6) | Floors section cards |
| `miniapp-*.png` (×5) | Reserved for future Mini App screenshots |

`hero-dungeon.png` is no longer used — the hero's illustration slot is now
the animated banner described below.

## Animated hero banner

The hero section's centerpiece is a fully custom, hand-built animated SVG
composition (not a static image): the DOM dragon logo sits at the center,
orbited by six crypto coins on two tilted elliptical paths, with floating
rock debris, drifting dust particles, mouse parallax, and an entrance
sequence — all driven by GSAP.

**Files** (`src/components/hero/`):

| File | Responsibility |
| --- | --- |
| `DungeonHeroBanner.tsx` | Renders the full SVG markup — background, orbit rings, logo, coins, rocks, particles — plus the HTML tooltip overlay. Pure markup; no animation logic. |
| `useDungeonHeroAnimation.ts` | All GSAP logic: entrance timeline, idle loops, orbit math wiring, parallax, hover/tooltip handlers, reduced-motion gating. Everything here finds elements by the `id`s below within the container it's given — no refs threaded through props. |
| `orbitPath.ts` | Ellipse geometry: builds the visible orbit `<path>` `d` string and computes a coin's `{x, y, depth}` at any point 0–1 along its lap. `depth` (-1 back … +1 front) drives the scale/opacity/blur "behind the logo" illusion and the real front/back DOM swap. |
| `coinDefs.tsx` | Per-coin config (orbit, lap duration, start offset, spin speed, size, tooltip copy) and `<CoinGraphic>`, the SVG mark for each coin (BNB, BTC, ETH, USDT, SOL, DOGE). |
| `HeroParticles.tsx` | Generates the ambient gold/blue dust circles; the hook animates them by class name. |
| `src/styles/dungeon-hero.css` | Container sizing (aspect-ratio desktop/tablet, fixed height + crop on mobile), tooltip styling, `will-change` hints, reduced-motion fallback. |

It's wired into [`src/components/sections/Hero.tsx`](src/components/sections/Hero.tsx)
via `next/dynamic(..., { ssr: false })`, since it's a heavily
DOM/animation-driven client component with no need to render on the server.

### 1. Folder structure

See the file table above — everything lives under `src/components/hero/` plus
one CSS file in `src/styles/`.

### 2. SVG layer IDs

| ID | What it is |
| --- | --- |
| `#layer-background`, `#layer-mid`, `#layer-foreground` | Parallax depth layers (background → logo/coins/orbits → foreground props), each moved a different amount on mouse move. |
| `#main-logo` | The `<image>` using `logo-dom.png` (dragon + wordmark, fused in the source art). |
| `#logo-glow` | The pulsing warm backlight ellipse behind the logo. |
| `#helmet-light` | Glow positioned over the lamp on the logo artwork's worn helmet. |
| `#orbit-01`, `#orbit-02` | The two visible glowing orbit rings (also used as the literal path coins/lights travel). |
| `#orbit-01-light`, `#orbit-02-light` | The traveling "energy" dots on each ring (MotionPathPlugin). |
| `#coins-back`, `#coins-front` | Coins are moved between these two groups live, depending on which half of their orbit they're in — real DOM depth, not just a fade. |
| `#coin-bnb`, `#coin-btc`, `#coin-eth`, `#coin-usdt`, `#coin-sol`, `#coin-doge` | Each coin's outer group (`.coin-outer`), containing `.coin-hover` → `.coin-spinfloat` → the coin graphic + `.coin-hit` (invisible, larger hover target). |
| `#foreground-rocks` / `.rock` | Scattered floating debris. |
| `#particles` / `.hero-particle` | Ambient dust. |

### 3. Replacing a coin

Edit `coinDefs.tsx`: change the brand colors in `coinColors[id]`, and adjust
or replace the shape drawn in `CoinMark()` for that `id`. The gradients
(`#coin-face-<id>`, `#coin-rim-<id>`) are generated automatically from
`coinColors`, so you don't need to touch `DungeonHeroBanner.tsx`.

### 4. Changing orbit speed

In `coinDefs.tsx`, change a coin's `duration` (seconds per lap) or `spin`
(seconds per self-flip). Lower `duration` = faster orbit.

### 5. Changing orbit size

In `orbitPath.ts`, edit `orbits["orbit-01"|"orbit-02"]` — `rx`/`ry` control
the ellipse's width/height, `cx`/`cy` its center, `rotationDeg` its tilt.

### 6. Adding a new coin

1. Add its id to the `CoinId` union and an entry to `coinColors` in `coinDefs.tsx`.
2. Add a `case` for it in `CoinMark()` with its SVG mark.
3. Add a `CoinDef` entry to `coinDefs` — pick an orbit, a unique `offset`
   (0–1) so it doesn't start on top of another coin, and a `duration`.

Nothing else needs to change — `DungeonHeroBanner` renders `coinDefs.map(...)`
and the hook wires up every coin it finds automatically.

### 7. Replacing the Dungeon of Miners logo

Drop a new `logo-dom.png` into `public/assets/` (see "Replacing images"
above) — it updates everywhere, including this banner. To resize/reposition
it within the banner, edit `CENTER_X`, `CENTER_Y`, and `LOGO_SIZE` at the top
of `DungeonHeroBanner.tsx`.

### 8. Mobile behavior

`DungeonHeroBanner.tsx` tracks a `tier` (`desktop` / `tablet` / `mobile`) from
`window.innerWidth`. This drives:
- `TIER_CONFIG`: fewer rocks/particles and a smaller orbit radius (`radiusScale`) on smaller screens.
- The container's CSS (`dungeon-hero.css`): desktop/tablet keep the banner's aspect ratio; mobile switches to a fixed `height: clamp(650px, 130vw, 750px)` with `preserveAspectRatio="xMidYMid slice"` on the `<svg>`, so the composition crops in tighter (bigger, centered logo/coins) instead of shrinking to a thin letterboxed strip.
- Mouse parallax is skipped entirely on mobile (`isMobile` passed into the hook).

### 9. Where each animation lives in the code

All in `useDungeonHeroAnimation.ts`:
- **Entrance sequence** — the `gsap.timeline()` built at the top of the `gsap.context()` callback.
- **Logo float + glow pulse, helmet lamp pulse** — start of `startIdleLoops()`.
- **Coin orbit + depth illusion + back/front DOM swap** — the `driver = gsap.to(state, {... onUpdate ...})` block inside the `coinDefs.forEach(...)` loop.
- **Coin self-spin (flip) + floating jitter** — right after the driver, inside the same `forEach`.
- **Coin hover (scale, orbit slow-down, tooltip)** — `handleEnter`/`handleLeave` in the same `forEach`.
- **Traveling orbit lights** — the two `gsap.to(lightN, { motionPath: {...} })` calls (this is the one place MotionPathPlugin is actually used; coin positions themselves use the hand-rolled parametric driver so the depth illusion stays perfectly in sync — see the comment at the top of the file for why).
- **Rocks / particles drifting** — the two `qa(...).forEach(...)` blocks at the end of `startIdleLoops()`.
- **Mouse parallax** — the `onMouseMove`/`onMouseLeave` handlers below the `gsap.context()` call.
- **Reduced motion** — `prefersReduced` gates orbit rotation, self-spin, floating, parallax, and rock/particle drift throughout; entrance and static coin placement still render.

## Design system

- Colors, fonts, shadows, and animation keyframes are defined in
  [`tailwind.config.ts`](tailwind.config.ts).
- Shared component classes (`.btn-primary`, `.surface-panel`, `.heading-lg`,
  etc.) are defined in [`src/app/globals.css`](src/app/globals.css).
- Fonts: **Cinzel** (display/headings) + **Inter** (body), loaded via
  `next/font/google` in `src/app/layout.tsx`.

## Deployment

The site is a standard Next.js app — deploy it anywhere Next.js runs.

**Vercel (recommended, zero-config):**

```bash
npx vercel
```

or connect the repo at [vercel.com/new](https://vercel.com/new).

**Any Node host:**

```bash
npm run build
npm run start
```

**Static export:** if you don't need any server features (this site
currently doesn't use any), you can add `output: "export"` to
`next.config.mjs` and run `npm run build` to produce a static `/out` folder
deployable to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3).

## Notes

- `next.config.mjs` sets `images.unoptimized: true` so local placeholder/
  real images work without extra image-domain configuration.
- No backend, database, or environment variables are required — this is a
  static marketing site that links out to the Telegram Mini App and
  community channels.
