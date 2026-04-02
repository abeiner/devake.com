"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import PointCloud from "./PointCloud";
import CTAButton from "@/components/shared/CTAButton";
import useSplitText from "@/hooks/useSplitText";
import { SITE_CONFIG } from "@/lib/constants";
import { usePreloader } from "@/components/preloader/PreloaderContext";

/**
 * HeroSection — full-viewport hero with animated text reveal,
 * point cloud background, CTA, and scroll indicator.
 *
 * Content is positioned in the lower-left quadrant per the uiux spec.
 * Text animations fire after preloader completes (or immediately if skipped).
 */
export default function HeroSection() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const animationRanRef = useRef(false);

  const { isComplete: preloaderComplete } = usePreloader();

  // Split the logo text into individual characters for staggered reveal
  const logoChars = useSplitText(logoRef, "chars");

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
      if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 1 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });
      if (scrollIndicatorRef.current)
        gsap.set(scrollIndicatorRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1) Logo: character-by-character reveal
      const chars = logoChars.current;
      if (chars.length > 0) {
        // Set each character to hidden, then reveal the parent container
        gsap.set(chars, { y: 40, opacity: 0 });
        gsap.set(logoRef.current, { opacity: 1 });
        tl.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.05,
        });
      }

      // 2) Tagline: fade-in with y shift, 0.5s after logo starts
      if (taglineRef.current) {
        gsap.set(taglineRef.current, { y: 20, opacity: 0 });
        tl.to(
          taglineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.1"
        );
      }

      // 3) CTA: fade-in, 0.8s after tagline
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 10, opacity: 0 });
        tl.to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
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
  }, [preloaderComplete, logoChars]);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden noise-overlay"
      style={{ backgroundColor: "#0A0A0C" }}
      aria-label="Hero"
    >
      {/* Point cloud background (z-0) */}
      <PointCloud />

      {/* Content overlay — lower-left quadrant positioning */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-24 sm:pb-32 md:pb-40">
        <div className="max-w-6xl mx-auto px-4 xl:px-0 w-full">
          {/* Logo text */}
          <h1
            ref={logoRef}
            className="text-[56px] sm:text-[72px] md:text-[120px] lg:text-[160px] font-medium leading-none text-text-primary pointer-events-auto"
            style={{
              letterSpacing: "-3px",
              opacity: 0,
            }}
          >
            {SITE_CONFIG.name}
          </h1>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="mt-4 sm:mt-6 text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-[1.15] text-text-primary pointer-events-auto"
            style={{
              letterSpacing: "-1px",
              opacity: 0,
            }}
          >
            Geospatial Intelligence.
            <br />
            Engineered.
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-8 sm:mt-10 md:mt-12 pointer-events-auto"
            style={{ opacity: 0 }}
          >
            <CTAButton href="#work" className="w-full sm:w-auto text-center">SEE OUR WORK</CTAButton>
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
