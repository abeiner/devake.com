"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/shared/SectionHeader";
import FactsRow from "@/components/about/FactsRow";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useSplitText from "@/hooks/useSplitText";
import { fadeInUp } from "@/lib/animations";

const PRIMARY_STATEMENT =
  "Devake provides geospatial software development services for companies around the world, delivering web, mobile, and desktop solutions for geospatial analysis.";

const SECONDARY_CONTEXT =
  "The team uses machine learning, computer vision, deep learning, and image analysis to enrich geospatial data with information gathered from satellite and LIDAR imagery.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLParagraphElement>(null);

  /* Split primary statement into lines for reveal animation */
  const splitSpans = useSplitText(primaryRef, "lines");

  /* Header: fadeInUp */
  useScrollAnimation(headerRef, (_el, tl) => {
    fadeInUp(headerRef.current!, tl);
  });

  /* Primary statement: line-by-line reveal */
  useScrollAnimation(
    primaryRef,
    (_el, tl) => {
      const spans = splitSpans.current;
      if (!spans.length) return;

      gsap.set(spans, { y: 40, opacity: 0 });
      tl.to(spans, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    },
    { start: "top 85%" },
    [splitSpans]
  );

  /* Secondary context: fadeInUp delayed */
  useScrollAnimation(secondaryRef, (_el, tl) => {
    fadeInUp(secondaryRef.current!, tl, { delay: 0.3 });
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-bg-primary noise-overlay py-2xl md:py-3xl overflow-hidden"
      aria-label="About"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 56, 49, 0.02) 0%, #0A0A0C 70%)",
      }}
    >
      <div data-scroll-lag className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0">
        {/* Section header */}
        <div ref={headerRef}>
          <SectionHeader number="01" label="ABOUT" />
        </div>

        <h2 className="sr-only">About Devake</h2>

        {/* Primary statement */}
        <p
          ref={primaryRef}
          className="mt-xl text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-normal tracking-[-2px] leading-[1.1] text-text-primary"
        >
          {PRIMARY_STATEMENT}
        </p>

        {/* Secondary context */}
        <p
          ref={secondaryRef}
          className="mt-lg text-[18px] leading-[1.6] text-text-primary/70 max-w-[640px]"
        >
          {SECONDARY_CONTEXT}
        </p>

        {/* Publicly confirmed delivery and research areas */}
        <FactsRow />
      </div>

    </section>
  );
}
