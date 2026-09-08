"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type MouseEvent,
} from "react";
import Link from "next/link";
import CTAButton from "@/components/shared/CTAButton";
import DevakeIcon from "@/components/shared/DevakeIcon";
import { useNav } from "@/components/shared/NavContext";
import { NAV_SECTIONS } from "@/lib/constants";

function DevakeHomeLink({
  className,
  isOnLightSection,
}: {
  className: string;
  isOnLightSection: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={(event) => {
        if (window.location.pathname !== "/") return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Devake home"
      className={`${className} min-h-11 min-w-11 items-center transition-colors duration-300 hover:text-accent ${
        isOnLightSection ? "text-text-dark" : "text-text-primary"
      }`}
    >
      <DevakeIcon className="w-[36px] h-[36px] md:w-[40px] md:h-[40px]" />
    </Link>
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
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 8);

    const lightSection = document.querySelector<HTMLElement>(
      '[data-header-theme="light"]'
    );
    const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 64;
    const currentSection = NAV_SECTIONS.find((section) => {
      const bounds = document.querySelector(section.href)?.getBoundingClientRect();
      return bounds && bounds.top <= headerBottom + 64 && bounds.bottom > headerBottom + 64;
    });
    setActiveSection(currentSection?.href ?? "");

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
          className={`relative max-w-6xl mx-auto px-4 xl:px-0 flex items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] transition-[height] duration-500 ease-out ${
            isScrolled ? "h-[58px]" : "h-[64px]"
          }`}
          aria-label="Primary"
        >
          <DevakeHomeLink
            className="flex shrink-0 justify-self-start"
            isOnLightSection={isOnLightSection}
          />

          {/* Compact header: logo left, menu right. Desktop links stay visible. */}
          <button
            type="button"
            onClick={handleOpenNav}
            className={`nav-menu-trigger ml-auto grid grid-cols-[20px_56px] lg:hidden shrink-0 min-h-11 items-center gap-3 transition-colors duration-300 hover:text-accent cursor-pointer ${
              isOnLightSection ? "text-text-dark" : "text-text-primary"
            }`}
            aria-label="Open navigation menu"
            aria-expanded={isNavOpen}
            aria-haspopup="dialog"
            aria-controls="nav-overlay"
          >
            <HamburgerIcon />
            <span className="nav-toggle-label text-left">
              MENU
            </span>
          </button>

          <ul className={`hidden lg:flex items-center gap-6 xl:gap-8 ${
            isOnLightSection ? "text-text-dark" : "text-text-primary"
          }`}>
            {NAV_SECTIONS.filter((section) => section.href !== "#contact").map((section) => (
              <li key={section.href}>
                <a
                  href={`/${section.href}`}
                  aria-current={activeSection === section.href ? "location" : undefined}
                  className="font-mono-text flex min-h-11 items-center text-[13px] tracking-[1px] whitespace-nowrap transition-colors hover:text-accent aria-[current=location]:underline aria-[current=location]:underline-offset-8"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block justify-self-end">
            <CTAButton href="/#contact-overview" variant="nav" ariaLabel="Go to the contact form">
              LET&apos;S TALK
            </CTAButton>
          </div>
        </nav>

      </header>
    </>
  );
}
