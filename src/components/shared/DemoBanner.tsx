"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "devake-demo-banner-dismissed";

export default function DemoBanner() {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to prevent flash
  const [isMounted, setIsMounted] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Update CSS variable for layout offset
  const updateBannerHeight = useCallback(() => {
    if (bannerRef.current && !isDismissed) {
      const height = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--banner-height",
        `${height}px`
      );
    } else {
      document.documentElement.style.setProperty("--banner-height", "0px");
    }
  }, [isDismissed]);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // sessionStorage unavailable: show the banner for this visit.
    }

    const frame = window.requestAnimationFrame(() => {
      setIsDismissed(dismissed);
      setIsMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    updateBannerHeight();
    window.addEventListener("resize", updateBannerHeight);
    return () => window.removeEventListener("resize", updateBannerHeight);
  }, [updateBannerHeight]);

  function handleDismiss() {
    setIsDismissed(true);
    document.documentElement.style.setProperty("--banner-height", "0px");
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // sessionStorage unavailable
    }
  }

  if (!isMounted || isDismissed) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      role="status"
      className="fixed top-0 left-0 right-0 z-[100] flex min-h-[36px] items-center justify-center bg-accent py-1"
    >
      <div className="max-w-6xl mx-auto px-4 xl:px-0 flex w-full items-center justify-center">
        <p className="font-mono-text text-center text-[12px] tracking-[0.5px] text-text-dark leading-snug">
          <span className="hidden sm:inline">
            This is a demo version &mdash; not affiliated with the original
            business
          </span>
          <span className="sm:hidden">
            Demo version &mdash; not affiliated
          </span>
        </p>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss demo banner"
          className="ml-4 flex min-h-6 min-w-6 flex-shrink-0 items-center justify-center p-1 text-text-dark transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-text-dark focus-visible:outline-offset-2"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
