"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Maps cursor position (clientX, clientY) to a lat/long range:
 * - Latitude:  25.0 (bottom of viewport) → 47.7 (top)  — Dubai to northern US
 * - Longitude: -122.5 (left edge)        → 55.3 (right) — Seattle to Dubai
 *
 * Scroll position shifts latitude slightly to add depth.
 * Returns null on mobile/touch devices and when prefers-reduced-motion is active.
 *
 * Performance: uses RAF-throttled updates only when mouse moves or scroll occurs,
 * rather than a continuous RAF loop.
 */
export default function useCoordinateTracker(): string | null {
  const [coords, setCoords] = useState<string | null>(null);
  const rafId = useRef<number>(0);
  const latestMouse = useRef({ x: 0, y: 0 });
  const needsUpdate = useRef(false);

  useEffect(() => {
    // Bail on touch-primary devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const LAT_MIN = 25.0;
    const LAT_MAX = 47.7;
    const LNG_MIN = -122.5;
    const LNG_MAX = 55.3;

    // Scroll offset adds ±2° latitude shift for depth
    const SCROLL_SHIFT_MAX = 2.0;

    function formatCoord(value: number, pos: string, neg: string): string {
      const abs = Math.abs(value);
      const dir = value >= 0 ? pos : neg;
      return `${abs.toFixed(4)}°${dir}`;
    }

    function compute() {
      const { x, y } = latestMouse.current;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw === 0 || vh === 0) return;

      // Normalize to 0–1
      const nx = Math.max(0, Math.min(1, x / vw));
      const ny = Math.max(0, Math.min(1, y / vh));

      // Latitude: top of viewport = LAT_MAX, bottom = LAT_MIN
      const scrollNorm = Math.min(
        window.scrollY / (document.documentElement.scrollHeight - vh || 1),
        1
      );
      const scrollShift = (scrollNorm - 0.5) * SCROLL_SHIFT_MAX;
      const lat = LAT_MIN + (1 - ny) * (LAT_MAX - LAT_MIN) + scrollShift;

      // Longitude: left = LNG_MIN, right = LNG_MAX
      const lng = LNG_MIN + nx * (LNG_MAX - LNG_MIN);

      const latStr = formatCoord(lat, "N", "S");
      const lngStr = formatCoord(lng, "E", "W");

      setCoords(`${latStr}  ${lngStr}`);
    }

    // Schedule a single RAF update when input occurs (coalesces rapid events)
    function scheduleUpdate() {
      if (!needsUpdate.current) {
        needsUpdate.current = true;
        rafId.current = requestAnimationFrame(() => {
          needsUpdate.current = false;
          compute();
        });
      }
    }

    function onMouseMove(e: MouseEvent) {
      latestMouse.current = { x: e.clientX, y: e.clientY };
      scheduleUpdate();
    }

    function onScroll() {
      scheduleUpdate();
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return coords;
}
