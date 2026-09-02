"use client";

import {
  useCallback,
  useRef,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import gsap from "gsap";
import { SITE_CONFIG } from "@/lib/constants";
import useScrollAnimation from "@/hooks/useScrollAnimation";

function FooterWordmarkShape() {
  return (
    <>
      <path
        fill="#FF3831"
        d="M306.72,300.83c0,13.49-11.05,23.47-22.25,23.47h-30.09v-46.09h30.7c10.82,0,21.64,9.52,21.64,22.63ZM291.02,300.76c0-5.49-4.5-10.21-10.21-10.21h-10.82v21.41h11.12c5.1,0,9.9-5.03,9.9-11.2Z"
      />
      <path
        fill="#FF3831"
        d="M328.43,290.55v4.5h28.19v12.34h-28.19v4.57h28.19v12.34h-43.81v-46.09h43.81v12.34h-28.19Z"
      />
      <path
        fill="#FF3831"
        d="M359.66,278.21h17.68l9.45,33.75h.76l9.45-33.75h17.67l-15.39,46.09h-24.23l-15.39-46.09Z"
      />
      <path
        fill="#FF3831"
        d="M443.61,318.97h-16.61l-1.52,5.33h-17.52l15.39-46.09h23.92l15.39,46.09h-17.52l-1.52-5.33ZM440.18,306.62l-4.5-16.08h-.76l-4.49,16.08h9.75Z"
      />
      <path
        fill="#FF3831"
        d="M484.06,308.38l-2.59,2.89v13.03h-15.62v-46.09h15.62v14.32h.53l12.72-14.32h16.76l-17.37,19.12,18.51,26.97h-17.14l-10.82-15.92h-.61Z"
      />
      <path
        fill="#FF3831"
        d="M532.36,290.55v4.5h28.19v12.34h-28.19v4.57h28.19v12.34h-43.81v-46.09h43.81v12.34h-28.19Z"
      />
      <path
        fill="#FF3831"
        d="M568.16,310.21h17.83v14.09h-17.83v-14.09Z"
      />
    </>
  );
}

export default function Footer() {
  const { address, email, social, copyright } = SITE_CONFIG;
  const officeAddress = [
    address.company,
    ...address.streetLines,
    `${address.city}, ${address.country}`,
    `P.O. Box ${address.poBox}`,
  ].join(", ");
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const infoGridRef = useRef<HTMLDivElement>(null);
  const creditRef = useRef<HTMLDivElement>(null);

  const handleWordmarkPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      event.currentTarget.style.setProperty("--wordmark-blur-x", `${x}%`);
      event.currentTarget.style.setProperty("--wordmark-blur-y", `${y}%`);
      event.currentTarget.style.setProperty("--wordmark-blur-opacity", "1");
    },
    []
  );

  const handleWordmarkPointerLeave = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.currentTarget.style.setProperty("--wordmark-blur-opacity", "0");
    },
    []
  );

  const handleInfoFocus = useCallback((event: FocusEvent<HTMLDivElement>) => {
    const grid = infoGridRef.current;
    if (!grid) return;

    // The centre-out reveal uses clip-path on the whole grid. A keyboard
    // outline extends outside its link by a few pixels, so leaving that mask
    // active makes the edge pop in only after the reveal completes.
    gsap.killTweensOf(grid, "clipPath");
    gsap.set(grid, { clearProps: "clipPath" });

    const activeCell = (event.target as HTMLElement).closest(
      ".footer-info-cell"
    );
    if (activeCell) {
      gsap.killTweensOf(activeCell);
      gsap.set(activeCell, { clearProps: "transform,opacity" });
    }
  }, []);

  useScrollAnimation(
    wordmarkRef,
    (el, tl) => {
      const letters = Array.from(
        el.querySelectorAll<SVGPathElement>(".footer-wordmark-base path")
      );
      const offsets = [
        { x: -70, y: 54, rotation: -3 },
        { x: -42, y: -42, rotation: 2 },
        { x: -18, y: 62, rotation: -2 },
        { x: 18, y: -54, rotation: 2.5 },
        { x: 44, y: 58, rotation: -2 },
        { x: 66, y: -38, rotation: 2 },
        { x: 92, y: 46, rotation: 4 },
      ];

      letters.forEach((letter, index) => {
        gsap.set(letter, {
          ...offsets[index],
          opacity: 0,
          transformOrigin: "center center",
        });
      });

      tl.to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.07,
        ease: "power4.out",
      });
    },
    { start: "top 86%" }
  );

  useScrollAnimation(
    infoGridRef,
    (el, tl) => {
      const cells = el.querySelectorAll(".footer-info-cell");
      gsap.set(el, { clipPath: "inset(0 50% 0 50%)" });
      gsap.set(cells, { y: 34, opacity: 0 });

      tl.to(el, {
        clipPath: "inset(0 0% 0 0%)",
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(el, { clearProps: "clipPath" });
        },
      }).to(
        cells,
        {
          y: 0,
          opacity: 1,
          duration: 0.62,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.42"
      );
    },
    { start: "top 88%" }
  );

  useScrollAnimation(
    creditRef,
    (el, tl) => {
      gsap.set(el, { y: 20, opacity: 0 });
      tl.to(el, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    },
    { start: "top 96%" }
  );

  return (
    <footer className="bg-[#0A0A0C] noise-overlay">
      <div data-scroll-lag className="max-w-6xl mx-auto px-4 xl:px-0">
        {/* Massive SVG Wordmark */}
        <div
          ref={wordmarkRef}
          className="footer-wordmark-stage relative pt-[100px] pb-[64px] md:pt-[160px] md:pb-[100px]"
          onPointerMove={handleWordmarkPointerMove}
          onPointerLeave={handleWordmarkPointerLeave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="250 274 340 56"
            className="footer-wordmark-base w-full h-auto"
            aria-hidden="true"
          >
            <FooterWordmarkShape />
          </svg>

          <div className="footer-wordmark-lens absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="250 274 340 56"
              className="footer-wordmark-blur-layer absolute left-0 right-0 top-[100px] md:top-[160px] w-full h-auto"
            >
              <FooterWordmarkShape />
            </svg>
          </div>
        </div>

        <h2 className="sr-only">Site Information</h2>

        {/* Three-Column Info Grid */}
        <div
          ref={infoGridRef}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10"
          onFocusCapture={handleInfoFocus}
        >
          {/* Column 1: Company Info */}
          <div className="footer-info-cell border-b md:border-b-0 md:border-r border-white/10 py-8 md:py-10 md:pr-8">
            <h3 className="font-mono-text font-medium text-[12px] uppercase tracking-[1.5px] text-text-primary/50 mb-4">
              Company
            </h3>
            <a
              href={address.mapsUrl}
              aria-label={`Office address: ${officeAddress}. Open in Google Maps`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-text font-normal text-[13px] leading-relaxed text-text-primary/70 hover:text-accent transition-colors duration-300 block"
            >
              {address.company}
              <br />
              {address.streetLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {address.city}, {address.country}
              <br />
              P.O. Box {address.poBox}
            </a>
          </div>

          {/* Column 2: Connect */}
          <div className="footer-info-cell border-b md:border-b-0 md:border-r border-white/10 py-8 md:py-10 md:px-8">
            <h3 className="font-mono-text font-medium text-[12px] uppercase tracking-[1.5px] text-text-primary/50 mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email Alex at ${email}`}
                  className="font-mono-text font-normal text-[13px] text-text-primary/70 hover:text-accent transition-colors duration-300"
                >
                  {email}
                </a>
              </li>
              {social.linkedin && (
                <li>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-text font-normal text-[13px] text-text-primary/70 hover:text-accent transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {social.github && (
                <li>
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-text font-normal text-[13px] text-text-primary/70 hover:text-accent transition-colors duration-300"
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="footer-info-cell py-8 md:py-10 md:pl-8">
            <h3 className="font-mono-text font-medium text-[12px] uppercase tracking-[1.5px] text-text-primary/50 mb-4">
              Legal
            </h3>
            <p className="font-mono-text font-normal text-[13px] text-text-primary/50">
              &copy; {copyright} {address.company}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-text-primary/10 mt-0" />

        {/* Design Credit */}
        <div ref={creditRef} className="flex justify-center py-7 md:py-8">
          <a
            href="https://aleksandrabeiner.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Design by aleksandrabeiner.com — opens in a new tab"
            className="group inline-flex items-center font-mono-text font-normal text-[12px] tracking-[0.5px] text-text-primary/50 hover:text-text-primary/70 transition-colors duration-300"
          >
            <span className="footer-credit-label transition-transform duration-400 ease-out">
              Design by&nbsp;
            </span>
            <span className="footer-credit-domain">
              aleksandrabeiner.com
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
