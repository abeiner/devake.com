"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type MouseEvent,
} from "react";
import CTAButton from "@/components/shared/CTAButton";
import { useNav } from "@/components/shared/NavContext";

function DevakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="180 145 490 310"
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

function DevakeHomeLink({
  className,
  isOnLightSection,
}: {
  className: string;
  isOnLightSection: boolean;
}) {
  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Scroll to top"
      className={`${className} items-center transition-colors duration-300 hover:text-accent ${
        isOnLightSection ? "text-text-dark" : "text-text-primary"
      }`}
    >
      <DevakeIcon className="w-[36px] h-[36px] md:w-[40px] md:h-[40px]" />
    </a>
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
  const [isOnLightSection, setIsOnLightSection] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 8);

    const lightSection = document.querySelector<HTMLElement>(
      '[data-header-theme="light"]'
    );
    const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 64;

    if (!lightSection) {
      setIsOnLightSection(false);
      return;
    }

    const sectionBounds = lightSection.getBoundingClientRect();
    setIsOnLightSection(
      sectionBounds.top <= headerBottom && sectionBounds.bottom > headerBottom
    );
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

    const initialFrame = window.requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [handleScroll]);

  function handleOpenNav(event: MouseEvent<HTMLButtonElement>) {
    const icon = event.currentTarget.querySelector("svg");
    const bounds = icon?.getBoundingClientRect();

    if (bounds) {
      document.documentElement.style.setProperty(
        "--nav-origin-x",
        `${bounds.left + bounds.width / 2}px`
      );
      document.documentElement.style.setProperty(
        "--nav-origin-y",
        `${bounds.top + bounds.height / 2}px`
      );
    }

    openNav();
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out"
        style={{
          right: "var(--scrollbar-compensation, 0px)",
          backgroundColor: isOnLightSection
            ? "rgba(255, 253, 216, 0.72)"
            : isScrolled
              ? "rgba(10, 10, 12, 0.66)"
              : "transparent",
          WebkitBackdropFilter: isScrolled
            ? "blur(14px) saturate(165%) contrast(118%)"
            : "blur(0px)",
          backdropFilter: isScrolled
            ? "blur(14px) saturate(165%) contrast(118%)"
            : "blur(0px)",
          boxShadow: isOnLightSection
            ? "0 14px 34px rgba(42, 39, 18, 0.12)"
            : isScrolled
              ? "0 14px 34px rgba(0, 0, 0, 0.24)"
              : "none",
        }}
      >
        <nav
          className={`relative max-w-6xl mx-auto px-4 xl:px-0 flex items-center justify-between transition-[height] duration-500 ease-out ${
            isScrolled ? "h-[58px]" : "h-[64px]"
          }`}
          aria-label="Primary"
        >
          {/* Mobile: logo first. Hidden variants are excluded from Tab/VoiceOver. */}
          <DevakeHomeLink
            className="flex md:hidden"
            isOnLightSection={isOnLightSection}
          />

          {/* Desktop: MENU left. Mobile: keep the centered hamburger. */}
          <button
            type="button"
            onClick={handleOpenNav}
            className={`absolute left-1/2 top-1/2 min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-3 md:static md:translate-x-0 md:translate-y-0 md:grid md:grid-cols-[56px_20px] transition-colors duration-300 hover:text-accent cursor-pointer ${
              isOnLightSection ? "text-text-dark" : "text-text-primary"
            }`}
            aria-label="Open navigation menu"
            aria-expanded={isNavOpen}
            aria-haspopup="dialog"
            aria-controls="nav-overlay"
          >
            <span className="nav-toggle-label hidden md:inline text-right">
              MENU
            </span>
            <HamburgerIcon />
          </button>

          {/* Desktop: logo centered independently of the unequal side controls. */}
          <DevakeHomeLink
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            isOnLightSection={isOnLightSection}
          />

          {/* Right: CTA */}
          <CTAButton href="#contact-overview" variant="nav" ariaLabel="LET'S TALK">
            <span className="hidden md:inline" aria-hidden="true">LET&apos;S TALK</span>
            <span className="md:hidden" aria-hidden="true">TALK</span>
          </CTAButton>
        </nav>

      </header>
    </>
  );
}
