"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/shared/SectionHeader";
import AnnotationLabel from "@/components/shared/AnnotationLabel";
import MetricsRow from "@/components/about/MetricsRow";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useSplitText from "@/hooks/useSplitText";
import { fadeInUp, staggerFadeIn } from "@/lib/animations";

const PRIMARY_STATEMENT =
  "We are a geospatial software studio that turns satellite imagery, LIDAR point clouds, and spatial data into intelligent platforms for companies that see the world through data.";

const SECONDARY_CONTEXT =
  "Based in Dubai. Serving clients globally. Engineering at the intersection of geography, machine learning, and visual computing.";

const ANNOTATIONS = [
  { text: "EPSG:4326", className: "absolute top-lg right-md" },
  { text: "WGS 84", className: "absolute top-[40%] right-sm" },
  { text: "GeoJSON", className: "absolute bottom-[30%] right-md" },
  { text: "CRS:84", className: "absolute bottom-lg left-md" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLParagraphElement>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);

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

  /* Annotation labels: staggered fade-in */
  useScrollAnimation(annotationsRef, (el, tl) => {
    const labels = el.querySelectorAll("span");
    if (!labels.length) return;
    staggerFadeIn(labels, tl, 0.12, { delay: 0.5 });
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-bg-primary noise-overlay py-2xl md:py-3xl overflow-hidden"
      aria-labelledby="about-heading"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 56, 49, 0.02) 0%, #0A0A0C 70%)",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0">
        {/* Section header */}
        <div ref={headerRef}>
          <SectionHeader number="01" label="ABOUT" />
        </div>

        {/* Visually hidden heading for accessibility */}
        <h2 id="about-heading" className="sr-only">About</h2>

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

        {/* Metrics */}
        <MetricsRow />
      </div>

      {/* Floating annotation labels */}
      <div ref={annotationsRef} className="absolute inset-0 pointer-events-none z-10">
        {ANNOTATIONS.map((anno) => (
          <AnnotationLabel
            key={anno.text}
            text={anno.text}
            className={anno.className}
          />
        ))}
      </div>
    </section>
  );
}
