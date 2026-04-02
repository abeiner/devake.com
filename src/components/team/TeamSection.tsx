"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/shared/SectionHeader";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { fadeInUp } from "@/lib/animations";
import { FOUNDER } from "@/lib/constants";
import AsciiPortrait from "@/components/team/AsciiPortrait";

gsap.registerPlugin(ScrollTrigger);

/**
 * TeamSection -- the ONE light-background section on the page.
 *
 * - Section ID: "about-team"
 * - Background: #FFFDD8 (warm off-white)
 * - All text inverted to #0A0A0C
 * - GSAP ScrollTrigger scrub transitions wrapper bg from dark to light
 * - Founder card: two-column on desktop, stacked on mobile
 * - NO noise-overlay (light section)
 */
export default function TeamSection() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------------
     Background transition: dark (#0A0A0C) -> light (#FFFDD8)
     via GSAP ScrollTrigger scrub on a wrapper div
     --------------------------------------------------------------- */
  useEffect(() => {
    const wrapper = transitionRef.current;
    if (!wrapper) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      wrapper.style.backgroundColor = "#FFFDD8";
      return;
    }

    gsap.set(wrapper, { backgroundColor: "#0A0A0C" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80%",
        end: "top 20%",
        scrub: 0.6,
      },
    });

    tl.to(wrapper, {
      backgroundColor: "#FFFDD8",
      duration: 1,
      ease: "power1.inOut",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  /* ---------------------------------------------------------------
     Section header: fadeInUp
     --------------------------------------------------------------- */
  useScrollAnimation(headerRef, (_el, tl) => {
    fadeInUp(headerRef.current!, tl);
  });

  /* ---------------------------------------------------------------
     Heading: fadeInUp
     --------------------------------------------------------------- */
  useScrollAnimation(headingRef, (_el, tl) => {
    fadeInUp(headingRef.current!, tl);
  });

  /* ---------------------------------------------------------------
     Photo placeholder: scale 0.9 -> 1.0 with fade-in
     --------------------------------------------------------------- */
  useScrollAnimation(photoRef, (_el, tl) => {
    gsap.set(_el, { scale: 0.9, opacity: 0 });
    tl.to(_el, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  /* ---------------------------------------------------------------
     Text block: staggered fadeInUp
     --------------------------------------------------------------- */
  useScrollAnimation(textRef, (el, tl) => {
    const children = el.querySelectorAll("[data-animate]");
    if (!children.length) return;

    gsap.set(children, { y: 20, opacity: 0 });
    tl.to(children, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
    });
  });

  return (
    <div ref={transitionRef}>
      <section
        ref={sectionRef}
        id="about-team"
        className="relative py-2xl md:py-3xl"
        style={{ backgroundColor: "#FFFDD8" }}
        aria-labelledby="team-heading"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 xl:px-0 w-full">
          {/* Section label -- override label color for light bg */}
          <div
            ref={headerRef}
            className="[&>div>span:last-child]:text-text-dark/50"
          >
            <SectionHeader number="05" label="TEAM" />
          </div>

          {/* Section heading */}
          <h2
            ref={headingRef}
            id="team-heading"
            className="mt-lg md:mt-xl text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-[1.05] tracking-[-2px] text-text-dark"
          >
            Built by Engineers
          </h2>

          {/* Founder card -- two columns desktop, stacked mobile */}
          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-lg md:gap-xl items-start">
            {/* ASCII art portrait of Alex Devake */}
            <div
              ref={photoRef}
              className="flex items-center justify-center"
            >
              <AsciiPortrait
                src="/alex-devake.jpg"
                width={340}
                className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px]"
              />
            </div>

            {/* Text content */}
            <div ref={textRef} className="flex flex-col gap-sm">
              {/* Name */}
              <h3
                data-animate
                className="text-[24px] font-semibold leading-tight text-text-dark"
              >
                {FOUNDER.name}
              </h3>

              {/* Title */}
              <p
                data-animate
                className="font-mono-text font-normal text-[14px] text-text-dark/60"
              >
                {FOUNDER.title}
              </p>

              {/* Bio */}
              <p
                data-animate
                className="mt-xs text-[18px] leading-[1.6] text-text-dark"
              >
                {FOUNDER.bio}
              </p>

              {/* Social links */}
              <div data-animate className="mt-sm flex gap-md">
                <a
                  href={FOUNDER.social.linkedin}
                  className="font-mono-text text-[14px] text-accent transition-colors duration-300 hover:text-accent-hover relative group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                  href={FOUNDER.social.github}
                  className="font-mono-text text-[14px] text-accent transition-colors duration-300 hover:text-accent-hover relative group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
