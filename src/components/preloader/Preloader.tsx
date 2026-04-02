"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloader } from "./PreloaderContext";

/**
 * Coordinate pairs for the cycling counter animation.
 * Starts with global cities, settles on Dubai (Devake HQ).
 */
const COORDINATE_PAIRS = [
  "47.6062°N, 122.3321°W", // Seattle
  "51.5074°N, 000.1278°W", // London
  "35.6762°N, 139.6503°E", // Tokyo
  "40.7128°N, 074.0060°W", // New York
  "-33.8688°S, 151.2093°E", // Sydney
  "55.7558°N, 037.6173°E", // Moscow
  "01.3521°N, 103.8198°E", // Singapore
  "48.8566°N, 002.3522°E", // Paris
  "25.2048°N, 055.2708°E", // Dubai (final)
];

const SESSION_KEY = "devake-preloader-played";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const coordRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { markComplete } = usePreloader();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setShouldRender(false);
      markComplete();
      return;
    }

    // Skip if already played this session
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "true") {
        setShouldRender(false);
        markComplete();
        return;
      }
    } catch {
      // sessionStorage may throw in some environments
    }

    // Lock body scroll during preloader
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const icon = iconRef.current;
    const coord = coordRef.current;
    const progress = progressRef.current;
    const container = containerRef.current;

    if (!overlay || !icon || !coord || !progress || !container) return;

    // Get all SVG paths for stroke animation
    const paths = icon.querySelectorAll("path, polygon");

    // Prepare each path for stroke-dasharray/dashoffset animation
    paths.forEach((path) => {
      const el = path as SVGGeometryElement;
      const length = el.getTotalLength();
      el.style.fill = "none";
      el.style.stroke = "#FFFDD8";
      el.style.strokeWidth = "2";
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Unlock body scroll
          document.body.style.overflow = "";
          // Mark in sessionStorage
          try {
            sessionStorage.setItem(SESSION_KEY, "true");
          } catch {
            // Ignore
          }
          // Hide overlay
          if (overlay) {
            overlay.style.display = "none";
          }
          // Signal hero to start animations
          markComplete();
        },
      });

      // === Phase 1 (0s - 1.5s): SVG stroke draw ===
      paths.forEach((path, i) => {
        const el = path as SVGGeometryElement;
        tl.to(
          el,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          i * 0.15 // stagger each path slightly
        );
      });

      // === Phase 2 (1s - 2.5s): Coordinate counter cycling ===
      // Start cycling at t=1s, each coord shows for ~100ms
      COORDINATE_PAIRS.forEach((coordText, i) => {
        const startTime = 1.0 + i * 0.12;
        const isLast = i === COORDINATE_PAIRS.length - 1;

        tl.call(
          () => {
            if (coord) {
              coord.textContent = coordText;
            }
          },
          [],
          startTime
        );

        // On last coordinate, add a brief settle effect
        if (isLast) {
          tl.to(
            coord,
            {
              opacity: 0.8,
              duration: 0.3,
              ease: "power1.out",
            },
            startTime
          );
          tl.to(
            coord,
            {
              opacity: 0.6,
              duration: 0.2,
            },
            startTime + 0.3
          );
        }
      });

      // === Phase 3 (1.5s - 3s): Progress line grows ===
      tl.fromTo(
        progress,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power1.inOut",
        },
        1.5
      );

      // === Phase 4 (3s - 3.5s): Icon scales up + fades, overlay dissolves ===
      tl.to(
        container,
        {
          scale: 1.15,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        3.0
      );

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        3.1
      );
    });

    return () => ctx.revert();
  }, [markComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#0A0A0C" }}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-6"
      >
        {/* Devake geometric icon — inline SVG for stroke animation control */}
        <svg
          ref={iconRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 841.89 595.28"
          className="w-20 h-20 sm:w-24 sm:h-24"
          aria-hidden="true"
        >
          <path d="M540.25,348.54h101.38v80.15h-101.38v-80.15Z" />
          <path d="M280.41,246.95v101.38h-80.15v-101.38h80.15Z" />
          <polygon points="404.53 428.69 502.01 428.69 396.73 296.59 495.51 166.58 400.2 166.58 301.75 298.68 404.53 428.69" />
        </svg>

        {/* Coordinate counter */}
        <span
          ref={coordRef}
          className="font-mono-text text-[12px] tracking-[1.5px]"
          style={{ color: "rgba(255, 253, 216, 0.6)" }}
        >
          &nbsp;
        </span>

        {/* Progress line */}
        <div
          ref={progressRef}
          className="w-48 sm:w-64"
          style={{
            height: "1px",
            backgroundColor: "rgba(255, 253, 216, 0.3)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
