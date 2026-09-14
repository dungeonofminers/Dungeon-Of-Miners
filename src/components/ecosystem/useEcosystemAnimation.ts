"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import type { EcosystemNode } from "@/content/site";

type Refs = {
  root: RefObject<HTMLDivElement>;
  core: RefObject<HTMLDivElement>;
  rings: RefObject<(HTMLDivElement | null)[]>;
  particle: RefObject<HTMLDivElement>;
  trails: RefObject<(HTMLDivElement | null)[]>;
  narrativePrimary: RefObject<HTMLParagraphElement>;
  narrativeSecondary: RefObject<HTMLParagraphElement>;
  badge: RefObject<HTMLSpanElement>;
};

/**
 * Drives the one-time cinematic story sequence for the DOM Ecosystem diagram,
 * then hands off to a lightweight ambient loop. The Oracle.svg artwork is a
 * single flattened illustration — nothing here modifies it. Every effect
 * (glow, particle travel, connection brightening, narrative text) is an
 * overlay layered on top, addressed via data-node/data-connection attributes
 * rendered by EcosystemDiagram.
 */
export function useEcosystemAnimation(
  refs: Refs,
  nodes: EcosystemNode[],
  intro: { lineOne: string; lineTwo: string },
  core: { lineOne: string; lineTwo: string },
  finalScene: { lineOne: string; lineTwo: string; lineThree: string },
  play: boolean,
  onIntroDone?: () => void
) {
  const ambientTweensRef = useRef<gsap.core.Tween[]>([]);
  const ambientIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    if (!play) return;
    const root = refs.root.current;
    const coreEl = refs.core.current;
    const particle = refs.particle.current;
    const trails = (refs.trails.current ?? []).filter((el): el is HTMLDivElement => !!el);
    const rings = (refs.rings.current ?? []).filter((el): el is HTMLDivElement => !!el);
    const primary = refs.narrativePrimary.current;
    const secondary = refs.narrativeSecondary.current;
    const badge = refs.badge.current;
    if (!root || !coreEl || !particle || !primary || !secondary || !badge) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodeEls = root.querySelectorAll<HTMLDivElement>("[data-node]");
    const glowEls = root.querySelectorAll<HTMLDivElement>("[data-node-glow]");
    const connectionEls = root.querySelectorAll<SVGLineElement>("[data-connection]");
    const nodeGlowFor = (id: string) =>
      root.querySelector<HTMLDivElement>(`[data-node-glow="${id}"]`);
    const connectionFor = (id: string) =>
      root.querySelector<SVGLineElement>(`[data-connection="${id}"]`);
    const nodeFor = (id: string) => root.querySelector<HTMLDivElement>(`[data-node="${id}"]`);

    const setText = (text: string, sub: string, status?: string) => {
      primary.textContent = text;
      secondary.textContent = sub;
      if (status !== undefined) badge.textContent = status;
    };

    if (prefersReduced) {
      // Show the final, fully-connected state immediately — no continuous motion.
      gsap.set(coreEl, { opacity: 1, scale: 1 });
      gsap.set(nodeEls, { opacity: 1, y: 0 });
      gsap.set(glowEls, { opacity: 0.35 });
      gsap.set(connectionEls, { opacity: 0.5, strokeDashoffset: 0 });
      gsap.set(particle, { opacity: 0 });
      gsap.set(trails, { opacity: 0 });
      gsap.set(rings, { opacity: 0 });
      setText(finalScene.lineThree, `${finalScene.lineOne} ${finalScene.lineTwo}`, "");
      onIntroDone?.();
      return;
    }

    let cleanupTimeline: gsap.core.Timeline | null = null;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: startAmbient,
    });
    cleanupTimeline = tl;

    // Scene 01 — the dungeon awakens
    tl.fromTo(root, { autoAlpha: 0.45, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power1.inOut" }, 0)
      .to(
        connectionEls,
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.06 },
        0.3
      )
      .call(() => setText(intro.lineOne, ""), undefined, 0.2)
      .call(() => setText(intro.lineTwo, ""), undefined, 1.4)

      // Scene 02 — DOM core activates
      .call(
        () => {
          gsap.to(nodeEls, { opacity: 0.55, duration: 0.4 });
          gsap.to(coreEl, { opacity: 1, duration: 0.4 });
          rings.forEach((ring, i) => {
            gsap.fromTo(
              ring,
              { opacity: 0.6, scale: 1 },
              { opacity: 0, scale: 2.4, duration: 1.3, ease: "power2.out", delay: i * 0.25 }
            );
          });
        },
        undefined,
        2.2
      )
      .to(coreEl, { scale: 1.035, duration: 0.5, ease: "back.out(1.6)", yoyo: true, repeat: 1 }, 2.3)
      .call(() => setText(core.lineOne, ""), undefined, 2.3)
      .call(() => setText(core.lineOne, core.lineTwo), undefined, 3.1);

    // Scenes 03–10 — sequential node activation
    let t = 4.0;
    nodes.forEach((node) => {
      const glow = nodeGlowFor(node.id);
      const connection = connectionFor(node.id);
      const nodeEl = nodeFor(node.id);

      tl.to(particle, { opacity: 1, duration: 0.15 }, t)
        .to(particle, { left: `${node.x}%`, top: `${node.y}%`, duration: 0.45, ease: "power2.inOut" }, t)
        .call(
          () => {
            setText(node.narrative.primary, node.narrative.secondary, node.status);
            if (connection) gsap.to(connection, { opacity: 0.85, duration: 0.3 });
            if (glow)
              gsap.to(glow, { opacity: 0.85, scale: 1.15, duration: 0.4, ease: "back.out(1.8)", yoyo: true, repeat: 1 });
            if (nodeEl)
              gsap.to(nodeEl, { y: -4, opacity: 1, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" });
          },
          undefined,
          t + 0.45
        )
        .to(particle, { opacity: 0, duration: 0.2 }, t + 0.65)
        .set(particle, { left: "50%", top: "46%" }, t + 0.85)
        .to(connection ?? [], { opacity: 0.4, duration: 0.4 }, t + 1.0);

      // Comet trail — two echo dots chasing the main particle with a slight lag.
      trails.forEach((trailEl, i) => {
        const lag = 0.07 * (i + 1);
        tl.to(trailEl, { opacity: 0.55 - i * 0.15, duration: 0.15 }, t + lag)
          .to(trailEl, { left: `${node.x}%`, top: `${node.y}%`, duration: 0.45, ease: "power2.inOut" }, t + lag)
          .to(trailEl, { opacity: 0, duration: 0.2 }, t + 0.65 + lag)
          .set(trailEl, { left: "50%", top: "46%" }, t + 0.85 + lag);
      });

      t += 0.9;
    });

    // Final scene — everything connects
    tl.call(
      () => {
        gsap.to(nodeEls, { opacity: 1, duration: 0.6 });
        gsap.to(glowEls, { opacity: 0.3, duration: 0.6 });
        gsap.to(connectionEls, { opacity: 0.55, duration: 0.6 });
        gsap.to(coreEl, { opacity: 1, duration: 0.4 });
        rings.forEach((ring, i) => {
          gsap.fromTo(
            ring,
            { opacity: 0.7, scale: 1 },
            { opacity: 0, scale: 3, duration: 1.6, ease: "power2.out", delay: i * 0.2 }
          );
        });
      },
      undefined,
      t + 0.2
    )
      .to(coreEl, { scale: 1.05, duration: 0.6, ease: "back.out(1.5)", yoyo: true, repeat: 1 }, t + 0.2)
      .call(() => setText(finalScene.lineOne, finalScene.lineTwo), undefined, t + 0.3)
      .call(() => setText(finalScene.lineThree, ""), undefined, t + 1.6)
      .call(() => onIntroDone?.(), undefined, t + 1.6);

    function startAmbient() {
      const breathe = gsap.to(coreEl!, {
        scale: 1.02,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      const shimmer = gsap.to(glowEls, {
        opacity: "+=0.05",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.6, repeat: -1, yoyo: true },
      });
      ambientTweensRef.current = [breathe, shimmer];
      if (!inViewRef.current) {
        breathe.pause();
        shimmer.pause();
      }

      ambientIntervalRef.current = setInterval(() => {
        if (document.hidden || !inViewRef.current) return;
        const random = nodes[Math.floor(Math.random() * nodes.length)];
        const glow = nodeGlowFor(random.id);
        const connection = connectionFor(random.id);
        if (glow) gsap.to(glow, { opacity: 0.6, duration: 0.6, yoyo: true, repeat: 1 });
        if (connection) gsap.to(connection, { opacity: 0.7, duration: 0.6, yoyo: true, repeat: 1 });
      }, 5000);
    }

    return () => {
      cleanupTimeline?.kill();
      ambientTweensRef.current.forEach((tween) => tween.kill());
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  // Pause the ambient loop while the section is far outside the viewport.
  useEffect(() => {
    const root = refs.root.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        ambientTweensRef.current.forEach((tween) => {
          if (entry.isIntersecting) tween.resume();
          else tween.pause();
        });
      },
      { threshold: 0 }
    );
    observer.observe(root);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
