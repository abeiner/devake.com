"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/shared/SectionHeader";
import CapabilityCell from "./CapabilityCell";
import useSplitText from "@/hooks/useSplitText";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { staggerFadeIn } from "@/lib/animations";
import { CAPABILITIES } from "@/lib/constants";

/**
 * CapabilitiesSection — 3x2 grid of service offerings.
 *
 * - Section ID: "capabilities", background: #111113
 * - SectionHeader "02" / "CAPABILITIES"
 * - Heading "What We Build" with SplitText line reveal
 * - Grid cells stagger-appear on scroll
 */
export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

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
      const cells = el.querySelectorAll(".capability-cell");
      if (cells.length > 0) {
        staggerFadeIn(cells, tl, 0.1, { duration: 0.6 });
      }
    },
    { start: "top 80%" }
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative noise-overlay py-2xl md:py-3xl"
      style={{ backgroundColor: "#111113" }}
      aria-label="Capabilities"
    >
      <div data-scroll-lag className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0 w-full">
        {/* Section label */}
        <div ref={headerRef}>
          <SectionHeader number="02" label="CAPABILITIES" />
        </div>

        {/* Section heading */}
        <h2
          ref={headingRef}
          id="capabilities-heading"
          className="mt-lg md:mt-xl text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-[1.05] tracking-[-2px] text-text-primary"
        >
          What We Build
        </h2>

        {/* 3x2 grid (1 column on mobile) */}
        <ul
          ref={gridRef}
          className="mt-lg md:mt-xl grid grid-cols-1 md:grid-cols-3 list-none"
          aria-label="Service areas"
        >
          {CAPABILITIES.map((cap) => (
            <CapabilityCell
              key={cap.title}
              title={cap.title}
              description={cap.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
