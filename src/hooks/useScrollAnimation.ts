"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Options forwarded to ScrollTrigger (all optional). */
export interface ScrollAnimationOptions {
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

/**
 * Attaches a GSAP ScrollTrigger to the given element.
 *
 * @param ref           — ref to the trigger/target element
 * @param factory       — receives (el, tl) and should build the animation.
 *                        `tl` is a GSAP timeline bound to the ScrollTrigger.
 * @param options       — ScrollTrigger overrides (start, end, toggleActions, etc.)
 * @param deps          — additional dependency array values (re-runs effect when changed)
 *
 * When `prefers-reduced-motion` is active the factory is skipped and
 * a simple opacity 0 -> 1 fade is used instead.
 */
export default function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  factory: (el: HTMLElement, tl: gsap.core.Timeline) => void,
  options: ScrollAnimationOptions = {},
  deps: unknown[] = []
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const {
      start = "top 80%",
      end,
      toggleActions = "play none none none",
      scrub,
      markers,
    } = options;

    const scrollTriggerVars: ScrollTrigger.Vars = {
      trigger: el,
      start,
      toggleActions: scrub ? undefined : toggleActions,
      markers,
    };

    if (end) scrollTriggerVars.end = end;
    if (scrub !== undefined) scrollTriggerVars.scrub = scrub;

    if (prefersReduced) {
      // Reduced-motion fallback: simple opacity fade, no transforms
      gsap.set(el, { opacity: 0 });
      const tl = gsap.timeline({ scrollTrigger: scrollTriggerVars });
      tl.to(el, { opacity: 1, duration: 0.4, ease: "power1.out" });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }

    const tl = gsap.timeline({ scrollTrigger: scrollTriggerVars });
    factory(el, tl);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
