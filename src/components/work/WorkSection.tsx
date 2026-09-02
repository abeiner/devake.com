"use client";

import { useCallback, useRef, type FocusEvent } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/shared/SectionHeader";
import CTAButton from "@/components/shared/CTAButton";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useSplitText from "@/hooks/useSplitText";
import { fadeInUp, revealButton, staggerFadeIn } from "@/lib/animations";
import { CASE_STUDY } from "@/lib/constants";
import { getLenis } from "@/hooks/useLenis";

/**
 * WorkSection -- Featured case study / proof of work.
 *
 * - Section ID: "work", background: #0A0A0C, noise-overlay
 * - SectionHeader "03" / "WORK"
 * - Compact editorial case-study layout
 * - Project title, description, sourced facts row, CTA
 * - SplitText title reveal
 */
export default function WorkSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const factsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleCtaFocus = useCallback((event: FocusEvent<HTMLDivElement>) => {
    const focusedElement = event.target as HTMLElement;

    // Mouse clicks should keep their native behaviour. When keyboard focus
    // reaches the CTA, retain the section heading above it instead of letting
    // the browser centre only the button and hide the context.
    window.requestAnimationFrame(() => {
      if (!focusedElement.matches(":focus-visible")) return;

      const overview = document.getElementById("work-overview");
      if (!overview) return;

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(overview, { offset: 0, immediate: true });
        return;
      }

      const top = overview.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "auto" });
    });
  }, []);

  /* Split title into lines for reveal animation */
  const titleLines = useSplitText(titleRef, "lines");

  /* SectionHeader: fadeInUp */
  useScrollAnimation(headerRef, (_el, tl) => {
    fadeInUp(headerRef.current!, tl);
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

  /* Sourced project facts: staggered cells */
  useScrollAnimation(factsRef, (el, tl) => {
    const cells = el.querySelectorAll(".work-fact-cell");
    if (cells.length > 0) {
      staggerFadeIn(cells, tl, 0.12, { duration: 0.6 });
    }
  });

  /* CTA: fade-in with scale-up */
  useScrollAnimation(ctaRef, (_el, tl) => {
    revealButton(_el, tl);
  }, { start: "top 95%" });

  return (
    <section
      id="work"
      className="relative bg-bg-primary noise-overlay py-2xl md:py-3xl overflow-hidden"
      aria-label="Work"
    >
      <div data-scroll-lag className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0">
        {/* Section header */}
        <div id="work-overview" ref={headerRef} className="scroll-mt-[120px]">
          <SectionHeader number="03" label="WORK" />
        </div>

        <div
          id="work-details"
          className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-lg mt-lg scroll-mt-[120px]"
        >
          <div className="col-span-12">
            {/* Project title */}
            <h2
              ref={titleRef}
              id="work-heading"
              className="text-[32px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-medium leading-[1.1] tracking-[-2px] text-text-primary"
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

            {/* Three facts confirmed by the original public website */}
            <ul
              ref={factsRef}
              className="grid grid-cols-1 md:grid-cols-3 border-y border-border mt-lg list-none"
            >
              {CASE_STUDY.facts.map((fact, index) => (
                <li
                  key={fact.label}
                  className={`work-fact-cell py-md ${
                    index === 0
                      ? "md:pr-lg"
                      : index === 1
                        ? "md:px-lg"
                        : "md:pl-lg"
                  } ${
                    index < CASE_STUDY.facts.length - 1
                      ? "border-b md:border-b-0 md:border-r border-border"
                      : ""
                  }`}
                >
                  <span className="sr-only">{fact.accessibleText}</span>
                  <span
                    className="block font-mono-text font-normal text-[12px] tracking-[1.5px] uppercase text-text-primary/50 mb-xs"
                    aria-hidden="true"
                  >
                    {fact.label}
                  </span>
                  <span
                    className="block text-[18px] sm:text-[22px] font-medium tracking-[-0.5px] text-text-primary"
                    aria-hidden="true"
                  >
                    {fact.value}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              ref={ctaRef}
              className="mt-lg"
              onFocusCapture={handleCtaFocus}
            >
              <CTAButton href="#contact-overview" className="w-full sm:w-auto text-center">
                DISCUSS YOUR PROJECT
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
