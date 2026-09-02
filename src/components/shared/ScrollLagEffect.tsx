"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Adds a restrained upward-scroll lag to visible section content.
 * Native scroll position is never changed; only a short-lived visual offset
 * is applied, so anchors and ScrollTrigger measurements remain reliable.
 */
export default function ScrollLagEffect() {
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );

    if (!media.matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-lag]")
    );
    const visibleTargets = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) visibleTargets.add(target);
          else visibleTargets.delete(target);
        });
      },
      { rootMargin: "12% 0px", threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));

    let lastY = window.scrollY;
    let lastTime = performance.now();
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const settle = () => {
      gsap.to(Array.from(visibleTargets), {
        y: 0,
        scaleY: 1,
        duration: 0.95,
        ease: "expo.out",
        overwrite: true,
      });
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = performance.now();
      const delta = currentY - lastY;
      const elapsed = Math.max(8, currentTime - lastTime);

      // Only react to a deliberate upward movement. Tiny deltas are ignored
      // so trackpad micro-movements do not make the layout feel unstable.
      if (delta < -3) {
        const velocity = (-delta / elapsed) * 16.67;
        const offset = gsap.utils.clamp(7, 36, velocity * 0.7);

        gsap.to(Array.from(visibleTargets), {
          y: offset,
          scaleY: 0.996,
          transformOrigin: "50% 100%",
          duration: 0.1,
          ease: "power3.out",
          overwrite: true,
        });

        if (settleTimer) clearTimeout(settleTimer);
        settleTimer = setTimeout(settle, 220);
      }

      lastY = currentY;
      lastTime = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      if (settleTimer) clearTimeout(settleTimer);
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "transform" });
    };
  }, []);

  return null;
}
