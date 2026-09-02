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
export default function TechTicker({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const tickerContent = TECH_TICKER.join(" / ") + " / ";

  return (
    <div className="mt-xl">
      {/* The moving text repeats forever, so expose one concise semantic copy. */}
      <p className="sr-only">
        Additional capabilities include {TECH_TICKER.join(", ")}.
      </p>

      <div
        className="overflow-hidden"
        aria-hidden="true"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="ticker-track flex whitespace-nowrap">
          <span className={`font-mono-text font-normal text-[12px] tracking-[1px] shrink-0 ${
            tone === "light" ? "text-text-dark/60" : "text-text-primary/60"
          }`}>
            {tickerContent}
          </span>
          <span className={`font-mono-text font-normal text-[12px] tracking-[1px] shrink-0 ${
            tone === "light" ? "text-text-dark/60" : "text-text-primary/60"
          }`}>
            {tickerContent}
          </span>
        </div>
      </div>
    </div>
  );
}
