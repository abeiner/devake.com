"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Global Lenis instance — accessible outside React for NavOverlay, etc. */
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Initializes Lenis smooth scroll connected to the GSAP ticker.
 *
 * - lerp 0.08, duration 1.2, syncTouch disabled
 * - Pipes every Lenis scroll event into ScrollTrigger.update()
 * - Disables GSAP lagSmoothing so scroll-driven animations stay in sync
 * - Skips Lenis entirely when the user prefers reduced motion
 * - Cleans up on unmount
 */
export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — use native scroll instead
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      syncTouch: false,
      smoothWheel: true,
      // Let Lenis handle anchor links for consistent smooth scroll behavior
      anchors: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Disable GSAP's default lag smoothing so scroll-triggered animations
    // stay perfectly in sync with Lenis interpolation
    gsap.ticker.lagSmoothing(0);

    // Connect Lenis to the GSAP ticker — GSAP drives the RAF loop,
    // Lenis receives the time parameter (converted from seconds to ms)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Pipe every Lenis scroll event into ScrollTrigger so
    // scroll-triggered animations stay current
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
}
