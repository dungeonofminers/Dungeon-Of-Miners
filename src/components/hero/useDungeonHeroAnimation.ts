"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { coinDefs } from "./coinDefs";
import { pointOnOrbit, type OrbitConfig } from "./orbitPath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

type EffectiveOrbits = Record<"orbit-01" | "orbit-02", OrbitConfig>;

type TooltipEls = {
  root: HTMLDivElement;
  title: HTMLElement;
  sub: HTMLElement;
};

/**
 * Owns every animation on the Dungeon of Miners hero banner: the entrance
 * sequence, idle loops (logo float/glow, coin orbits + self spin, traveling
 * orbit lights, rocks, particles), mouse parallax, and coin hover/tooltip
 * behavior.
 *
 * Coins ride their ellipse using a hand-rolled parametric driver (see
 * `orbitPath.ts`) rather than MotionPathPlugin, so the "depth" illusion
 * (scale/opacity/blur + real front/behind-logo swap) can be computed from
 * the exact same angle used to place the coin — no drift between the two.
 * MotionPathPlugin is used for the simpler traveling energy-light dots,
 * which only need to trace the ring with no depth bookkeeping.
 */
export function useDungeonHeroAnimation(
  containerRef: RefObject<HTMLDivElement>,
  effectiveOrbits: EffectiveOrbits,
  isMobile: boolean
) {
  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;
    // A plain, non-nullable alias — TS can't carry the `if (!rootEl) return`
    // narrowing into the nested closures below, so this gives them a type
    // they can trust without re-checking.
    const root: HTMLDivElement = rootEl;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
    const qa = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    const coinsBack = q<SVGGElement>("#coins-back");
    const coinsFront = q<SVGGElement>("#coins-front");

    let onMouseMove: ((e: MouseEvent) => void) | undefined;
    let onMouseLeave: (() => void) | undefined;
    const hoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // ---------------------------------------------------------------
      // Initial (pre-entrance) states
      // ---------------------------------------------------------------
      gsap.set("#layer-background", { opacity: 0 });
      gsap.set("#main-logo", { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" });
      gsap.set(".orbit-ring", { opacity: 0 });
      gsap.set(".orbit-light", { opacity: 0 });
      gsap.set(".coin-outer", { opacity: 0, scale: 0 });
      gsap.set(".rock", { opacity: 0 });
      gsap.set("#logo-glow", { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" });

      // ---------------------------------------------------------------
      // Entrance timeline — background, logo, dragon "reveal" (a glow
      // burst standing in for the dragon emerging, since the mascot is
      // fused into the logo artwork), coins, orbit lights.
      // Target total runtime: ~2s.
      // ---------------------------------------------------------------
      const tl = gsap.timeline({ delay: 0.05 });

      tl.to("#layer-background", { opacity: 1, duration: 0.4, ease: "power1.out" })
        .to(
          "#main-logo",
          { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.6)" },
          "-=0.2"
        )
        .to(
          "#logo-glow",
          { opacity: 0.8, scale: 1.15, duration: 0.5, ease: "power2.out" },
          "-=0.45"
        )
        .to(".orbit-ring", { opacity: 1, duration: 0.35 }, "-=0.25")
        .to(
          ".coin-outer",
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.08, ease: "back.out(2.2)" },
          "-=0.15"
        )
        .to(".orbit-light", { opacity: 1, duration: 0.3 }, "-=0.1")
        .to(
          ".rock",
          {
            opacity: (_i, el) => parseFloat(el.dataset.opacity ?? "0.7"),
            duration: 0.6,
            stagger: 0.015,
          },
          "-=0.3"
        )
        .add(() => {
          ctx.add(startIdleLoops);
        });

      // ---------------------------------------------------------------
      // Idle loops (started once entrance settles)
      // ---------------------------------------------------------------
      function startIdleLoops() {
        // Logo: subtle float (skipped under reduced motion) + gold glow pulse
        if (!prefersReduced) {
          gsap.to("#main-logo", {
            y: -6,
            duration: 4.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
        gsap.to("#logo-glow", {
          opacity: 0.9,
          scale: 1.22,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Worn helmet lamp: warm pulse
        gsap.to("#helmet-light", {
          opacity: 1,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });


        // Coins: orbit driver (manual parametric ellipse) + self-spin + float
        coinDefs.forEach((def) => {
          const outer = q<SVGGElement>(`#coin-${def.id}`);
          const hover = outer?.querySelector<SVGGElement>(".coin-hover");
          const spinFloat = outer?.querySelector<SVGGElement>(".coin-spinfloat");
          const hit = outer?.querySelector<SVGCircleElement>(".coin-hit");
          if (!outer || !hover || !spinFloat) return;

          const orbitCfg = effectiveOrbits[def.orbit];
          const state = { t: def.offset };
          let lastSign = 0;

          const driver = gsap.to(state, {
            t: "+=1",
            duration: def.duration,
            ease: "none",
            repeat: -1,
            modifiers: { t: gsap.utils.wrap(0, 1) },
            onUpdate: () => {
              const { x, y, depth } = pointOnOrbit(orbitCfg, state.t);
              const back = depth < 0 ? Math.min(1, -depth) : 0;
              const front = depth > 0 ? Math.min(1, depth) : 0;
              const scale = 1 - back * 0.16 + front * 0.08;
              const opacity = 1 - back * 0.35;
              const brightness = 1 + front * 0.08;
              const blur = back * 1.1;
              gsap.set(outer, {
                x,
                y,
                scale,
                opacity,
                filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(2)})` : `brightness(${brightness.toFixed(2)})`,
              });

              const sign = depth < -0.02 ? -1 : depth > 0.02 ? 1 : lastSign;
              if (sign !== lastSign && coinsBack && coinsFront) {
                lastSign = sign;
                (sign === -1 ? coinsBack : coinsFront).appendChild(outer);
              }
            },
          });

          if (prefersReduced) {
            driver.pause();
          }

          // Self "flip" spin (scaleX oscillation fakes a rotateY in flat SVG)
          if (!prefersReduced) {
            const spinState = { a: Math.random() * Math.PI * 2 };
            gsap.to(spinState, {
              a: `+=${Math.PI * 2}`,
              duration: def.spin,
              ease: "none",
              repeat: -1,
              onUpdate: () => {
                gsap.set(spinFloat, { scaleX: Math.cos(spinState.a) });
              },
            });

            gsap.to(spinFloat, {
              y: gsap.utils.random(-6, 6),
              rotation: gsap.utils.random(-2, 2),
              duration: gsap.utils.random(3, 5),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }

          // Hover: scale up, slow the orbit, show tooltip
          const hitTarget = hit ?? outer;
          const tooltip = getTooltipEls(root);
          const handleEnter = () => {
            gsap.to(hover, { scale: 1.15, duration: 0.25, overwrite: "auto" });
            gsap.to(driver, { timeScale: 0.35, duration: 0.3, overwrite: "auto" });
            if (tooltip) showTooltip(tooltip, def, outer, root);
          };
          const handleLeave = () => {
            gsap.to(hover, { scale: 1, duration: 0.25, overwrite: "auto" });
            gsap.to(driver, { timeScale: 1, duration: 0.3, overwrite: "auto" });
            if (tooltip) hideTooltip(tooltip);
          };
          hitTarget.addEventListener("mouseenter", handleEnter);
          hitTarget.addEventListener("mouseleave", handleLeave);
          hoverCleanups.push(() => {
            hitTarget.removeEventListener("mouseenter", handleEnter);
            hitTarget.removeEventListener("mouseleave", handleLeave);
          });
        });

        // Traveling energy-light dots along each orbit ring (MotionPathPlugin)
        const ring1 = q<SVGPathElement>("#orbit-01");
        const light1 = q<SVGCircleElement>("#orbit-01-light");
        const ring2 = q<SVGPathElement>("#orbit-02");
        const light2 = q<SVGCircleElement>("#orbit-02-light");
        if (!prefersReduced && ring1 && light1) {
          gsap.to(light1, {
            motionPath: { path: ring1, align: ring1, alignOrigin: [0.5, 0.5], autoRotate: false },
            duration: 6,
            repeat: -1,
            ease: "none",
          });
        }
        if (!prefersReduced && ring2 && light2) {
          gsap.to(light2, {
            motionPath: { path: ring2, align: ring2, alignOrigin: [0.5, 0.5], autoRotate: false },
            duration: 7.5,
            repeat: -1,
            ease: "none",
            delay: -2,
          });
        }

        // Floating foreground rocks/debris
        if (!prefersReduced) {
          qa<SVGGElement>(".rock").forEach((el) => {
            gsap.to(el, {
              y: `+=${gsap.utils.random(-10, 10)}`,
              x: `+=${gsap.utils.random(-4, 4)}`,
              rotation: `+=${gsap.utils.random(-15, 15)}`,
              duration: gsap.utils.random(5, 10),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: gsap.utils.random(0, 3),
            });
          });
        }

        // Ambient dust particles: slow upward drift + fade, wrapping loop
        qa<SVGCircleElement>(".hero-particle").forEach((el) => {
          const duration = parseFloat(el.dataset.duration ?? "8");
          const delay = parseFloat(el.dataset.delay ?? "0");
          const drift = parseFloat(el.dataset.drift ?? "150");
          const peakOpacity = 0.15 + Math.random() * 0.35;
          if (prefersReduced) {
            gsap.set(el, { opacity: peakOpacity * 0.6 });
            return;
          }
          const state = { p: 0 };
          gsap.to(state, {
            p: 1,
            duration,
            delay,
            repeat: -1,
            ease: "none",
            onUpdate: () => {
              gsap.set(el, {
                y: -state.p * drift,
                opacity: Math.sin(state.p * Math.PI) * peakOpacity,
              });
            },
          });
        });
      }
    }, root);

    // -----------------------------------------------------------------
    // Mouse parallax (skipped on mobile / reduced motion)
    // -----------------------------------------------------------------
    if (!prefersReduced && !isMobile) {
      onMouseMove = (e: MouseEvent) => {
        const rect = root.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to("#layer-background", { x: dx * 0.01, y: dy * 0.006, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        gsap.to("#layer-mid", { x: dx * 0.02, y: dy * 0.014, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        gsap.to("#layer-foreground", { x: dx * 0.035, y: dy * 0.02, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      };
      onMouseLeave = () => {
        gsap.to(["#layer-background", "#layer-mid", "#layer-foreground"], {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      };
      root.addEventListener("mousemove", onMouseMove);
      root.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      ctx.revert();
      if (onMouseMove) root.removeEventListener("mousemove", onMouseMove);
      if (onMouseLeave) root.removeEventListener("mouseleave", onMouseLeave);
      hoverCleanups.forEach((fn) => fn());
    };
  }, [containerRef, effectiveOrbits, isMobile]);
}

function getTooltipEls(root: HTMLElement): TooltipEls | null {
  const tooltipRoot = root.querySelector<HTMLDivElement>(".hero-tooltip");
  const title = tooltipRoot?.querySelector<HTMLElement>(".hero-tooltip-title");
  const sub = tooltipRoot?.querySelector<HTMLElement>(".hero-tooltip-sub");
  if (!tooltipRoot || !title || !sub) return null;
  return { root: tooltipRoot, title, sub };
}

function showTooltip(
  tooltip: TooltipEls,
  def: { name: string; fullName: string },
  coinEl: SVGGElement,
  container: HTMLElement
) {
  tooltip.title.textContent = def.name;
  tooltip.sub.textContent = def.fullName;
  const containerRect = container.getBoundingClientRect();
  const coinRect = coinEl.getBoundingClientRect();
  const left = coinRect.left - containerRect.left + coinRect.width / 2;
  const top = coinRect.top - containerRect.top;
  gsap.set(tooltip.root, { left, top, xPercent: -50, yPercent: -125 });
  gsap.to(tooltip.root, { opacity: 1, y: -4, duration: 0.2, overwrite: "auto" });
}

function hideTooltip(tooltip: TooltipEls) {
  gsap.to(tooltip.root, { opacity: 0, y: 0, duration: 0.15, overwrite: "auto" });
}
