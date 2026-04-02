"use client";

import { useState, useEffect, useCallback } from "react";
import CTAButton from "@/components/shared/CTAButton";
import { useNav } from "@/components/shared/NavContext";

function DevakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 841.89 595.28"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M540.25,348.54h101.38v80.15h-101.38v-80.15Z"
        fill="currentColor"
      />
      <path
        d="M280.41,246.95v101.38h-80.15v-101.38h80.15Z"
        fill="currentColor"
      />
      <polygon
        points="404.53 428.69 502.01 428.69 396.73 296.59 495.51 166.58 400.2 166.58 301.75 298.68 404.53 428.69"
        fill="currentColor"
      />
    </svg>
  );
}

function HamburgerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="1"
        x2="20"
        y2="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="0"
        y1="7"
        x2="20"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="0"
        y1="13"
        x2="20"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Navbar() {
  const { isNavOpen, openNav } = useNav();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const threshold = window.innerHeight;
    setIsScrolled(window.scrollY >= threshold);
  }, []);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
      ticking = true;
    }

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-500 ease-out"
      style={{
        top: "var(--banner-height, 0px)",
        backgroundColor: isScrolled
          ? "rgba(10, 10, 12, 0.9)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(8px)" : "none",
      }}
    >
      <nav
        className="max-w-6xl mx-auto px-4 xl:px-0 flex items-center justify-between h-[64px]"
        aria-label="Main navigation"
      >
        {/* Left: Devake icon */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Scroll to top"
          className="flex items-center text-text-primary transition-colors duration-200 hover:text-accent"
        >
          <DevakeIcon className="w-[32px] h-[32px] md:w-[32px] md:h-[32px]" />
        </a>

        {/* Center: MENU + hamburger */}
        <button
          type="button"
          onClick={openNav}
          className="flex items-center gap-3 text-text-primary transition-colors duration-200 hover:text-accent cursor-pointer"
          aria-label="Open navigation menu"
          aria-expanded={isNavOpen}
          aria-haspopup="dialog"
        >
          <span className="hidden md:inline font-mono-text text-[13px] font-medium uppercase tracking-[2px]">
            MENU
          </span>
          <HamburgerIcon />
        </button>

        {/* Right: CTA */}
        <CTAButton href="#contact" variant="nav" ariaLabel="LET'S TALK +">
          <span className="hidden md:inline" aria-hidden="true">LET&apos;S TALK</span>
          <span className="md:hidden" aria-hidden="true">TALK</span>
        </CTAButton>
      </nav>
    </header>
  );
}
