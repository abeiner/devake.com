import gsap from "gsap";

/* ================================================================
   Shared GSAP animation presets
   Used by section components via useScrollAnimation or directly.
   ================================================================ */

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
}

/**
 * Fade-in with upward movement.
 * Typical use: section headings, paragraphs, CTAs.
 */
export function fadeInUp(
  targets: gsap.TweenTarget,
  tl: gsap.core.Timeline,
  options: AnimationOptions = {}
) {
  const { duration = 0.8, delay = 0, ease = "power3.out" } = options;

  gsap.set(targets, { y: 30, opacity: 0 });
  tl.to(
    targets,
    { y: 0, opacity: 1, duration, ease },
    delay
  );
}

/**
 * Staggered fade-in for a collection of elements (grid cells, list items).
 */
export function staggerFadeIn(
  targets: gsap.TweenTarget,
  tl: gsap.core.Timeline,
  stagger: number = 0.1,
  options: AnimationOptions = {}
) {
  const { duration = 0.6, delay = 0, ease = "power3.out" } = options;

  gsap.set(targets, { y: 20, opacity: 0 });
  tl.to(
    targets,
    { y: 0, opacity: 1, duration, ease, stagger },
    delay
  );
}

/**
 * Animates a number from 0 to `endValue`, writing the formatted result
 * into the target element's textContent.
 *
 * Suffix (e.g. "+", "M+") is preserved from the element's data-suffix
 * attribute or passed explicitly.
 */
export function counterAnimation(
  target: HTMLElement,
  endValue: number,
  tl: gsap.core.Timeline,
  options: AnimationOptions & { suffix?: string } = {}
) {
  const {
    duration = 1.5,
    delay = 0,
    ease = "power2.out",
    suffix = target.dataset.suffix || "",
  } = options;

  const proxy = { value: 0 };

  tl.to(
    proxy,
    {
      value: endValue,
      duration,
      ease,
      onUpdate() {
        target.textContent = `${Math.round(proxy.value)}${suffix}`;
      },
    },
    delay
  );
}
