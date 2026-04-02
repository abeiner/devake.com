"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/shared/SectionHeader";
import CTAButton from "@/components/shared/CTAButton";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useSplitText from "@/hooks/useSplitText";
import { fadeInUp, staggerFadeIn, counterAnimation } from "@/lib/animations";
import { CASE_STUDY } from "@/lib/constants";

/**
 * WorkSection -- Featured case study / proof of work.
 *
 * - Section ID: "work", background: #0A0A0C, noise-overlay
 * - SectionHeader "03" / "WORK"
 * - Full-width LIDAR/satellite visualization (CSS-only)
 * - Project title, description, tech/metrics row, CTA
 * - Parallax visual, SplitText title reveal, counter animation
 */
export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualInnerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricNumberRef = useRef<HTMLSpanElement>(null);

  /* Split title into lines for reveal animation */
  const titleLines = useSplitText(titleRef, "lines");

  /* SectionHeader: fadeInUp */
  useScrollAnimation(headerRef, (_el, tl) => {
    fadeInUp(headerRef.current!, tl);
  });

  /* Visual: parallax scroll (inner moves at reduced speed via scrub) */
  useScrollAnimation(
    visualRef,
    (el, tl) => {
      const inner = visualInnerRef.current;
      if (!inner) return;
      tl.fromTo(
        inner,
        { yPercent: -7.5 },
        { yPercent: 7.5, ease: "none" }
      );
    },
    { start: "top bottom", end: "bottom top", scrub: true }
  );

  /* "Featured Project" label: fadeInUp */
  useScrollAnimation(labelRef, (_el, tl) => {
    fadeInUp(labelRef.current!, tl, { delay: 0.1 });
  });

  /* Title: line-by-line reveal */
  useScrollAnimation(
    titleRef,
    (_el, tl) => {
      const lines = titleLines.current;
      if (lines.length > 0) {
        gsap.set(lines, { y: "100%" });
        tl.to(lines, {
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        });
      }
    },
    { start: "top 85%" },
    [titleLines]
  );

  /* Description: fadeInUp delayed */
  useScrollAnimation(descRef, (_el, tl) => {
    fadeInUp(descRef.current!, tl, { delay: 0.2 });
  });

  /* Tech/metrics row: staggered cells + counter */
  useScrollAnimation(metricsRef, (el, tl) => {
    const cells = el.querySelectorAll(".work-metric-cell");
    if (cells.length > 0) {
      staggerFadeIn(cells, tl, 0.12, { duration: 0.6 });
    }
    /* Counter animation on the metric number */
    const numEl = metricNumberRef.current;
    if (numEl) {
      counterAnimation(numEl, 2, tl, {
        suffix: "M+",
        delay: 0.2,
        duration: 1.5,
      });
    }
  });

  /* CTA: fade-in with scale-up */
  useScrollAnimation(ctaRef, (_el, tl) => {
    gsap.set(_el, { opacity: 0, scale: 0.95 });
    tl.to(_el, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-bg-primary noise-overlay py-2xl md:py-3xl overflow-hidden"
      aria-labelledby="work-heading"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0">
        {/* Section header */}
        <div ref={headerRef}>
          <SectionHeader number="03" label="WORK" />
        </div>

        {/* Full-width visualization: LIDAR / satellite analysis evocation */}
        <div
          ref={visualRef}
          className="relative mt-lg md:mt-xl overflow-hidden aspect-[4/3] md:aspect-video"
          style={{ contain: "layout style paint" }}
        >
          {/* Parallax inner container (115% to reduce paint area) */}
          <div
            ref={visualInnerRef}
            className="absolute inset-[-7.5%] w-[115%] h-[115%]"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
            aria-hidden="true"
          >
            {/* Layer 1: Base gradient + radial highlights (merged) */}
            <div
              className="absolute inset-0"
              style={{
                background: [
                  "radial-gradient(circle at 65% 55%, rgba(20, 60, 100, 0.3) 0%, transparent 40%)",
                  "radial-gradient(ellipse 60% 50% at 40% 45%, rgba(15, 90, 60, 0.4) 0%, rgba(10, 30, 50, 0.2) 50%, transparent 80%)",
                  "linear-gradient(to bottom right, #0a1628, #0d2818, #0a0a1a)",
                ].join(", "),
              }}
            />

            {/* Layer 2: Coordinate grid (H + V merged) */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: [
                  "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,253,216,0.04) 59px, rgba(255,253,216,0.04) 60px)",
                  "repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,253,216,0.04) 59px, rgba(255,253,216,0.04) 60px)",
                ].join(", "),
              }}
            />

            {/* Layer 3: Scan lines + data points (merged) */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: [
                  "repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(255,253,216,0.015) 3px, rgba(255,253,216,0.015) 4px)",
                  "radial-gradient(circle 1px at 20% 30%, rgba(255,56,49,0.6) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 45% 20%, rgba(255,253,216,0.3) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 70% 60%, rgba(255,56,49,0.4) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 30% 70%, rgba(255,253,216,0.25) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 80% 35%, rgba(255,253,216,0.2) 0%, transparent 100%)",
                  "radial-gradient(circle 1.5px at 55% 45%, rgba(255,56,49,0.5) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 15% 55%, rgba(255,253,216,0.2) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 85% 75%, rgba(255,56,49,0.35) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 60% 80%, rgba(255,253,216,0.15) 0%, transparent 100%)",
                  "radial-gradient(circle 2px at 35% 40%, rgba(15,120,80,0.4) 0%, transparent 100%)",
                  "radial-gradient(circle 1.5px at 50% 65%, rgba(15,120,80,0.3) 0%, transparent 100%)",
                  "radial-gradient(circle 1px at 75% 25%, rgba(15,120,80,0.25) 0%, transparent 100%)",
                ].join(", "),
                backgroundSize: "8px 8px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%",
              }}
            />

            {/* Coordinate annotations overlaid */}
            <span className="absolute top-[12%] left-[8%] font-mono-text text-[9px] tracking-[1px] text-text-primary/10 select-none">
              47.6062N -122.3321W
            </span>
            <span className="absolute top-[25%] right-[12%] font-mono-text text-[9px] tracking-[1px] text-text-primary/10 select-none">
              EPSG:4326 | Band 4
            </span>
            <span className="absolute bottom-[30%] left-[15%] font-mono-text text-[9px] tracking-[1px] text-text-primary/10 select-none">
              Classification: 2 (Ground)
            </span>
            <span className="absolute bottom-[18%] right-[10%] font-mono-text text-[9px] tracking-[1px] text-text-primary/10 select-none">
              Density: 14.2 pts/m2
            </span>
            <span className="absolute top-[50%] left-[45%] font-mono-text text-[9px] tracking-[1px] text-accent/15 select-none">
              + ROI CENTROID
            </span>
          </div>

          {/* Gradient overlay: transparent top -> section bg at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary z-[2]" />

          {/* Top edge vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-transparent to-transparent z-[2]" />
        </div>

        {/* "Featured Project" label */}
        <span
          ref={labelRef}
          className="block mt-lg font-mono-text font-normal text-[12px] uppercase tracking-[1.5px] text-text-primary/50"
        >
          {CASE_STUDY.label}
        </span>

        {/* Project title */}
        <h2
          ref={titleRef}
          id="work-heading"
          className="mt-sm text-[32px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-medium leading-[1.1] tracking-[-2px] text-text-primary"
        >
          {CASE_STUDY.title}
        </h2>

        {/* Project description */}
        <p
          ref={descRef}
          className="mt-md text-[18px] leading-[1.6] text-text-primary/80 max-w-[720px]"
        >
          {CASE_STUDY.description}
        </p>

        {/* Tech / metrics row: 3 bordered cells */}
        <div
          ref={metricsRef}
          className="grid grid-cols-1 md:grid-cols-3 border border-border mt-xl"
        >
          {/* Cell 1: Tech Stack */}
          <div className="work-metric-cell px-lg py-md border-b md:border-b-0 md:border-r border-border">
            <span className="block font-mono-text font-normal text-[12px] tracking-[1.5px] uppercase text-text-primary/50 mb-xs">
              Tech Stack
            </span>
            <span className="block text-[16px] sm:text-[18px] font-medium tracking-[-0.5px] text-text-primary">
              {CASE_STUDY.techStack.join(" / ")}
            </span>
          </div>

          {/* Cell 2: Data Formats */}
          <div className="work-metric-cell px-lg py-md border-b md:border-b-0 md:border-r border-border">
            <span className="block font-mono-text font-normal text-[12px] tracking-[1.5px] uppercase text-text-primary/50 mb-xs">
              Data Formats
            </span>
            <span className="block text-[16px] sm:text-[18px] font-medium tracking-[-0.5px] text-text-primary">
              {CASE_STUDY.dataFormats.join(" / ")}
            </span>
          </div>

          {/* Cell 3: Metric with counter */}
          <div className="work-metric-cell px-lg py-md">
            <span
              ref={metricNumberRef}
              data-suffix="M+"
              className="block text-[36px] font-semibold tracking-[-1px] text-text-primary"
            >
              0M+
            </span>
            <span className="block font-mono-text font-normal text-[12px] tracking-[1.5px] uppercase text-text-primary/50 mt-xs">
              {CASE_STUDY.metric.label}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-xl">
          <CTAButton href="#contact" className="w-full sm:w-auto text-center">DISCUSS YOUR PROJECT</CTAButton>
        </div>
      </div>
    </section>
  );
}
