"use client";

import { TECH_TICKER } from "@/lib/constants";

/**
 * TechTicker — horizontally scrolling ticker of additional technology names.
 *
 * - IBM Plex Mono 400, 12px, 20% opacity
 * - CSS animation: translateX(0) -> translateX(-50%), infinite, 30s, linear
 * - Content rendered twice for seamless loop
 * - Separator: " / " between items
 */
export default function TechTicker() {
  const tickerContent = TECH_TICKER.join(" / ") + " / ";

  return (
    <div
      className="mt-xl overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className="ticker-track flex whitespace-nowrap">
        <span className="font-mono-text font-normal text-[12px] text-text-primary/20 tracking-[1px] shrink-0">
          {tickerContent}
        </span>
        <span className="font-mono-text font-normal text-[12px] text-text-primary/20 tracking-[1px] shrink-0">
          {tickerContent}
        </span>
      </div>
    </div>
  );
}
