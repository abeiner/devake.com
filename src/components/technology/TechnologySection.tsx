"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/shared/SectionHeader";
import TechTicker from "./TechTicker";
import useSplitText from "@/hooks/useSplitText";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { staggerFadeIn } from "@/lib/animations";
import { TECH_STACK } from "@/lib/constants";

/**
 * TechnologySection — 5x2 grid of core technologies + scrolling ticker.
 *
 * - Section ID: "technology", background: #111113
 * - SectionHeader "04" / "TECHNOLOGY"
 * - Heading "Our Stack" with SplitText line reveal
 * - 5x2 grid (2 columns on mobile) with hover effects
 * - TechTicker below the grid
 * - Scroll animation: cells stagger-reveal
 */
export default function TechnologySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Split heading text into lines for reveal animation
  const headingLines = useSplitText(headingRef, "lines");

  // SectionHeader fade-in on scroll
  useScrollAnimation(headerRef, (_el, tl) => {
    gsap.set(_el, { y: 20, opacity: 0 });
    tl.to(_el, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
  });

  // Heading: line-by-line reveal
  useScrollAnimation(
    headingRef,
    (_el, tl) => {
      const lines = headingLines.current;
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
    [headingLines]
  );

  // Grid cells: staggered appear
  useScrollAnimation(
    gridRef,
    (el, tl) => {
      const cells = el.querySelectorAll(".tech-cell");
      if (cells.length > 0) {
        staggerFadeIn(cells, tl, 0.08, { duration: 0.5 });
      }
    },
    { start: "top 80%" }
  );

  return (
    <section
      id="technology"
      className="relative noise-overlay py-2xl md:py-3xl"
      style={{ backgroundColor: "#111113" }}
      aria-labelledby="technology-heading"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0 w-full">
        {/* Section label */}
        <div ref={headerRef}>
          <SectionHeader number="04" label="TECHNOLOGY" />
        </div>

        {/* Section heading */}
        <h2
          ref={headingRef}
          id="technology-heading"
          className="mt-lg md:mt-xl text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-[1.05] tracking-[-2px] text-text-primary"
        >
          Our Stack
        </h2>

        {/* 5x2 grid (2 columns on mobile) */}
        <div
          ref={gridRef}
          className="mt-lg md:mt-xl grid grid-cols-2 md:grid-cols-5"
        >
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="tech-cell group border border-border py-[24px] px-[16px] flex items-center justify-center transition-[border-color] duration-300 ease-out hover:border-border-hover cursor-default"
            >
              <span className="font-mono-text font-normal text-[14px] md:text-[16px] text-text-primary/60 transition-all duration-300 ease-out group-hover:text-accent group-hover:opacity-100">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Scrolling ticker */}
        <TechTicker />
      </div>
    </section>
  );
}
