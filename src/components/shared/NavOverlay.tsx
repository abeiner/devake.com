"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { NAV_SECTIONS, SITE_CONFIG } from "@/lib/constants";
import { getLenis } from "@/hooks/useLenis";
import { useNav } from "@/components/shared/NavContext";

/**
 * Full-screen navigation overlay.
 *
 * - Covers viewport at z-[90] with near-opaque dark background
 * - 6 section links from NAV_SECTIONS with staggered GSAP reveal
 * - Bottom area: email, social links, location
 * - Focus trap, Escape closes, aria-modal, body scroll locked via Lenis
 * - Open/close animations with GSAP Timeline
 */
export default function NavOverlay() {
  const { isNavOpen, closeNav } = useNav();

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);

  // Store the element that had focus before the overlay opened
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Collect all focusable elements inside the overlay
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!overlayRef.current) return [];
    return Array.from(
      overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }, []);

  // ---------- Open animation ----------
  const animateOpen = useCallback(() => {
    if (!overlayRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const overlay = overlayRef.current;
    const links = linksRef.current.filter(Boolean) as HTMLElement[];
    const bottom = bottomRef.current;
    const closeBtn = closeButtonRef.current;

    // Make visible before animating
    overlay.style.display = "flex";
    overlay.style.visibility = "visible";
    overlay.style.pointerEvents = "auto";

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        // Focus the first link after animation completes
        if (links[0]) links[0].focus();
      },
    });

    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    tl.fromTo(
      closeBtn,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
      0.15
    );

    tl.fromTo(
      links,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      },
      0.15
    );

    if (bottom) {
      tl.fromTo(
        bottom,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "-=0.15"
      );
    }

    timelineRef.current = tl;
  }, []);

  // ---------- Close animation ----------
  const animateClose = useCallback(
    (onDone?: () => void) => {
      if (!overlayRef.current || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const overlay = overlayRef.current;
      const links = linksRef.current.filter(Boolean) as HTMLElement[];
      const bottom = bottomRef.current;
      const closeBtn = closeButtonRef.current;

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          overlay.style.display = "none";
          overlay.style.visibility = "hidden";
          overlay.style.pointerEvents = "none";
          isAnimatingRef.current = false;
          // Restore focus to the element that opened the overlay
          if (previousFocusRef.current) {
            previousFocusRef.current.focus();
            previousFocusRef.current = null;
          }
          onDone?.();
        },
      });

      if (bottom) {
        tl.to(bottom, { opacity: 0, y: 10, duration: 0.2, ease: "power2.in" });
      }

      // Links exit in reverse order
      tl.to(
        [...links].reverse(),
        {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.in",
        },
        bottom ? "-=0.15" : 0
      );

      tl.to(
        closeBtn,
        { opacity: 0, y: -10, duration: 0.2, ease: "power2.in" },
        "-=0.2"
      );

      tl.to(
        overlay,
        { opacity: 0, duration: 0.25, ease: "power2.in" },
        "-=0.15"
      );

      timelineRef.current = tl;
    },
    []
  );

  // ---------- Lock/unlock body scroll via Lenis ----------
  useEffect(() => {
    const lenis = getLenis();
    if (isNavOpen) {
      lenis?.stop();
      // Also prevent native scroll as fallback (for when Lenis is not active)
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      // Cleanup on unmount
      const l = getLenis();
      l?.start();
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

  // ---------- Trigger open/close animations ----------
  useEffect(() => {
    if (isNavOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      animateOpen();
    } else {
      // Only run close animation if overlay is currently visible
      if (
        overlayRef.current &&
        overlayRef.current.style.display !== "none" &&
        overlayRef.current.style.display !== ""
      ) {
        animateClose();
      }
    }
  }, [isNavOpen, animateOpen, animateClose]);

  // ---------- Escape key handler ----------
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isNavOpen) {
        closeNav();
      }
    }

    if (isNavOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isNavOpen, closeNav]);

  // ---------- Focus trap ----------
  useEffect(() => {
    if (!isNavOpen) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isNavOpen, getFocusableElements]);

  // ---------- Handle nav link click ----------
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      // Close the overlay first, then scroll
      closeNav();

      // Use a short delay so the close animation starts, then scroll
      const targetId = href.replace("#", "");
      setTimeout(() => {
        const lenis = getLenis();
        const target = document.getElementById(targetId);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: 0, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 350);
    },
    [closeNav]
  );

  // ---------- Cleanup on unmount ----------
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-[90] flex-col justify-between"
      style={{
        visibility: isNavOpen ? "visible" : "hidden",
        pointerEvents: isNavOpen ? "auto" : "none",
        opacity: 0,
        backgroundColor: "#0A0A0C",
      }}
    >
      {/* Close button — top-right, offset to clear demo banner (36px) + center in navbar height (64px) */}
      <div
        className="flex justify-end px-4 xl:px-0 max-w-6xl mx-auto w-full"
        style={{ paddingTop: "calc(var(--banner-height, 0px) + 18px)" }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeNav}
          className="flex items-center gap-2 text-text-primary transition-colors duration-200 hover:text-accent cursor-pointer"
          aria-label="Close navigation menu"
          style={{ opacity: 0 }}
        >
          <span className="font-mono-text text-[13px] font-medium uppercase tracking-[2px]">
            CLOSE
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line
              x1="1"
              y1="1"
              x2="15"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="15"
              y1="1"
              x2="1"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {/* Section links — main content area */}
      <nav
        className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-4 xl:px-0"
        aria-label="Page sections"
      >
        <ul className="flex flex-col gap-2 md:gap-3">
          {NAV_SECTIONS.map((section, index) => (
            <li key={section.number}>
              <a
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                href={section.href}
                onClick={(e) => handleLinkClick(e, section.href)}
                className="group flex items-center gap-4 md:gap-6 py-3 md:py-4 min-h-[48px] relative transition-colors duration-300 hover:text-accent text-text-primary"
                style={{ opacity: 0 }}
              >
                {/* Hover line extending from left */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ width: "24px", marginLeft: "-32px" }}
                  aria-hidden="true"
                />

                {/* Section number */}
                <span className="font-mono-text text-[14px] font-medium text-accent tracking-[1.5px]">
                  {section.number}
                </span>

                {/* Section name */}
                <span className="text-[36px] md:text-[48px] lg:text-[64px] font-medium tracking-[-2px] leading-none">
                  {section.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom area — contact info */}
      <div
        ref={bottomRef}
        className="max-w-6xl mx-auto w-full px-4 xl:px-0 pb-8 md:pb-12"
        style={{ opacity: 0 }}
      >
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Email */}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="font-mono-text text-[14px] text-text-primary/70 tracking-[1px] transition-colors duration-200 hover:text-accent"
          >
            {SITE_CONFIG.email}
          </a>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.social.linkedin}
              className="font-mono-text text-[12px] text-text-primary/50 uppercase tracking-[1.5px] transition-colors duration-200 hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span
              className="font-mono-text text-[12px] text-text-primary/20"
              aria-hidden="true"
            >
              /
            </span>
            <a
              href={SITE_CONFIG.social.github}
              className="font-mono-text text-[12px] text-text-primary/50 uppercase tracking-[1.5px] transition-colors duration-200 hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>

          {/* Location */}
          <span className="font-mono-text text-[12px] text-text-primary/30 uppercase tracking-[1.5px]">
            {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
          </span>
        </div>
      </div>
    </div>
  );
}
