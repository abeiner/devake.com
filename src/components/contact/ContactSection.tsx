"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/shared/SectionHeader";
import ContactForm from "@/components/contact/ContactForm";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useSplitText from "@/hooks/useSplitText";
import { fadeInUp } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const officeAddress = [
    ...SITE_CONFIG.address.streetLines,
    `${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.country}`,
  ].join(", ");

  /* Heading SplitText reveal */
  const splitSpans = useSplitText(headingRef, "lines");

  /* Header: fadeInUp */
  useScrollAnimation(headerRef, (_el, tl) => {
    fadeInUp(headerRef.current!, tl);
  });

  /* Heading: line-by-line reveal */
  useScrollAnimation(
    headingRef,
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

  /* Left column: fade-in from left */
  useScrollAnimation(leftColRef, (_el, tl) => {
    gsap.set(leftColRef.current!, { x: -20, opacity: 0 });
    tl.to(leftColRef.current!, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  /* Right column: fade-in from right */
  useScrollAnimation(rightColRef, (_el, tl) => {
    gsap.set(rightColRef.current!, { x: 20, opacity: 0 });
    tl.to(rightColRef.current!, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  return (
    <section
      id="contact"
      className="relative bg-bg-primary noise-overlay py-2xl md:py-3xl overflow-hidden"
      aria-label="Contact"
    >
      <div data-scroll-lag className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0">
        {/* Section header */}
        <div id="contact-overview" ref={headerRef} className="scroll-mt-[120px]">
          <SectionHeader number="05" label="CONTACT" />
        </div>

        {/* Display heading */}
        <h2
          ref={headingRef}
          id="contact-heading"
          className="mt-lg text-[48px] sm:text-[56px] md:text-[80px] lg:text-[100px] font-medium tracking-[-3px] leading-[1.05] text-text-primary"
        >
          Let&rsquo;s Build Something.
        </h2>

        {/* Two-column layout */}
        <div className="mt-lg grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {/* Left: contact info */}
          <div
            ref={leftColRef}
            className="hidden flex-col gap-lg lg:order-1 lg:flex"
          >
            {/* Email — large, prominent */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              aria-label={`Email Alex at ${SITE_CONFIG.email}`}
              className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium tracking-[-1px] text-accent hover:text-accent-hover transition-colors duration-300 break-all"
            >
              {SITE_CONFIG.email}
            </a>

            {/* Company + address */}
            <div className="flex flex-col gap-xs">
              <span
                className="text-[18px] text-text-primary/70"
                aria-hidden="true"
              >
                {SITE_CONFIG.address.company}
              </span>
              <a
                href={SITE_CONFIG.address.mapsUrl}
                aria-label={`Office address for ${SITE_CONFIG.address.company}: ${officeAddress}. Open in Google Maps`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] text-text-primary/50 hover:text-text-primary/80 transition-colors duration-300 underline underline-offset-4 decoration-text-primary/20 hover:decoration-text-primary/50"
              >
                {SITE_CONFIG.address.streetLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                </span>
              </a>
            </div>
          </div>

          {/* Right: contact form */}
          <div ref={rightColRef} className="lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
