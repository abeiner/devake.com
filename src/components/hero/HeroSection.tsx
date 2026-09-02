"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import PointCloud from "./PointCloud";
import CTAButton from "@/components/shared/CTAButton";
import { usePreloader } from "@/components/preloader/PreloaderContext";
import { revealButton } from "@/lib/animations";

/**
 * Inline SVG paths for "DEVAKE." logo — 7 paths (D-E-V-A-K-E-dot).
 * Extracted from devake-logo-text.svg, viewBox="0 0 841.89 595.28".
 */
const LOGO_PATHS = [
  // D
  "M306.72,300.83c0,13.49-11.05,23.47-22.25,23.47h-30.09v-46.09h30.7c10.82,0,21.64,9.52,21.64,22.63ZM291.02,300.76c0-5.49-4.5-10.21-10.21-10.21h-10.82v21.41h11.12c5.1,0,9.9-5.03,9.9-11.2Z",
  // E
  "M328.43,290.55v4.5h28.19v12.34h-28.19v4.57h28.19v12.34h-43.81v-46.09h43.81v12.34h-28.19Z",
  // V
  "M359.66,278.21h17.68l9.45,33.75h.76l9.45-33.75h17.67l-15.39,46.09h-24.23l-15.39-46.09Z",
  // A
  "M443.61,318.97h-16.61l-1.52,5.33h-17.52l15.39-46.09h23.92l15.39,46.09h-17.52l-1.52-5.33ZM440.18,306.62l-4.5-16.08h-.76l-4.49,16.08h9.75Z",
  // K
  "M484.06,308.38l-2.59,2.89v13.03h-15.62v-46.09h15.62v14.32h.53l12.72-14.32h16.76l-17.37,19.12,18.51,26.97h-17.14l-10.82-15.92h-.61Z",
  // E
  "M532.36,290.55v4.5h28.19v12.34h-28.19v4.57h28.19v12.34h-43.81v-46.09h43.81v12.34h-28.19Z",
  // .
  "M568.16,310.21h17.83v14.09h-17.83v-14.09Z",
];

/**
 * HeroSection — full-viewport hero with animated text reveal,
 * point cloud background, CTA, and scroll indicator.
 *
 * Content is positioned in the lower-left quadrant per the uiux spec.
 * Text animations fire after preloader completes (or immediately if skipped).
 */
export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const logoVisualRef = useRef<SVGSVGElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const animationRanRef = useRef(false);

  const { isComplete: preloaderComplete } = usePreloader();

  useEffect(() => {
    // Wait for preloader to complete before running hero animations
    if (!preloaderComplete) return;
    // Prevent double-firing
    if (animationRanRef.current) return;
    animationRanRef.current = true;

    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Show everything immediately, no animations
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1 });
      if (logoVisualRef.current)
        gsap.set(logoVisualRef.current, { y: 0, opacity: 1 });
      if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 1 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });
      if (scrollIndicatorRef.current)
        gsap.set(scrollIndicatorRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1) Logo: one-line masked reveal, matching the About statement.
      if (logoVisualRef.current) {
        gsap.set(logoVisualRef.current, { y: 40, opacity: 0 });
        gsap.set(logoRef.current, { opacity: 1 });
        tl.to(logoVisualRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.68,
          ease: "power3.out",
        });
      }

      // 2) Tagline: fade-in with y shift
      if (taglineRef.current) {
        gsap.set(taglineRef.current, { y: 20, opacity: 0 });
        tl.to(
          taglineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.28"
        );
      }

      // 3) CTA: use the same restrained scale reveal as section buttons
      if (ctaRef.current) {
        revealButton(ctaRef.current, tl, { position: "-=0.3" });
      }

      // 4) Scroll indicator: fade in, then infinite bounce
      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );

        // Infinite bounce on the chevron
        const chevron =
          scrollIndicatorRef.current.querySelector(".scroll-chevron");
        if (chevron) {
          tl.to(
            chevron,
            {
              y: 8,
              duration: 1.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            },
            "-=0.4"
          );
        }
      }
    });

    return () => ctx.revert();
  }, [preloaderComplete]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] md:min-h-screen overflow-hidden noise-overlay"
      style={{ backgroundColor: "#0A0A0C" }}
      aria-label="Home"
    >
      <PointCloud />

      {/* Content overlay — lower-left quadrant positioning */}
      <div className="relative z-10 min-h-[100svh] md:min-h-screen flex flex-col justify-end pb-20 sm:pb-32 md:pb-40">
        <div data-scroll-lag className="max-w-6xl mx-auto px-4 xl:px-0 w-full">
          {/* Logo SVG — inline paths for DEVAKE. */}
          <div
            ref={logoRef}
            className="pointer-events-auto overflow-hidden"
            style={{ opacity: 0 }}
          >
            <h1 className="sr-only">
              Devake, a geospatial software development company.
            </h1>
            <svg
              ref={logoVisualRef}
              viewBox="254 268 332 68"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[520px] md:max-w-[660px] lg:max-w-[830px] h-auto"
              aria-hidden="true"
            >
              {LOGO_PATHS.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="#FFFDD8"
                />
              ))}
            </svg>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="mt-4 sm:mt-6 text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-[1.15] text-text-primary pointer-events-auto"
            style={{
              letterSpacing: "-1px",
              opacity: 0,
            }}
          >
            Geospatial Software Development Services.
            <br />
            For Companies Around the World.
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-8 sm:mt-10 md:mt-12 pointer-events-auto"
            style={{ opacity: 0 }}
          >
            <CTAButton href="#work-overview" className="w-full sm:w-auto text-center">SEE OUR WORK</CTAButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {/* Animated chevron */}
        <svg
          className="scroll-chevron w-5 h-5 text-text-primary/40"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 7l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Coordinates */}
        <span className="font-mono-text text-[10px] tracking-[1.5px] text-text-primary/30">
          25.2048°N &nbsp;55.2708°E
        </span>
      </div>
    </section>
  );
}
