"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section IDs to snap to. Must match the `id` attributes on the
 * <section> elements in page.tsx, in top-to-bottom order.
 */
const SECTION_IDS = [
  "hero",
  "about",
  "capabilities",
  "work",
  "technology",
  "about-team",
  "contact",
];

/**
 * Compute fractional snap points (0–1) for each section.
 * Each value = section.offsetTop / maxScroll.
 */
function getSnapPoints(): number[] {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return [];

  const points: number[] = [];

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const ratio = Math.min(el.offsetTop / maxScroll, 1);
    points.push(ratio);
  }

  // Always allow snapping to the very bottom (footer area)
  if (points.length > 0 && points[points.length - 1] < 0.98) {
    points.push(1);
  }

  return points;
}

/**
 * useScrollSnap — section-based scroll snapping via GSAP ScrollTrigger.
 *
 * CSS scroll-snap conflicts with Lenis smooth scroll, so we use
 * ScrollTrigger's `snap` feature instead. It gently pulls the viewport
 * to the nearest section boundary when the user pauses scrolling.
 *
 * Behavior notes:
 * - `inertia: false` prevents aggressive snapping — it only snaps when
 *   the user releases the scroll near a section edge, never mid-fling.
 * - Short durations (0.2–0.6s) keep the motion crisp without feeling sluggish.
 * - Desktop only (>= 1024px) — snap on touch devices feels disorienting.
 * - Disabled when `prefers-reduced-motion` is active.
 */
export default function useScrollSnap() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Only enable on desktop — touch scrolling + snap is awkward
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    let activeTrigger: ScrollTrigger | null = null;

    function createSnap() {
      // Kill existing trigger before recreating
      if (activeTrigger) {
        activeTrigger.kill();
        activeTrigger = null;
      }

      const points = getSnapPoints();
      if (points.length < 2) return;

      activeTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: {
          snapTo: points,
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: "power2.inOut",
          inertia: false,
        },
      });
    }

    // Give layout time to settle (fonts, images, GSAP animations)
    const initTimer = setTimeout(() => {
      createSnap();
    }, 500);

    // Recalculate snap points on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createSnap, 300);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (activeTrigger) {
        activeTrigger.kill();
      }
    };
  }, []);
}
