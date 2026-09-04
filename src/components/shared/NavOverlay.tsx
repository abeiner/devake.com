"use client";

import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { NAV_SECTIONS, SITE_CONFIG } from "@/lib/constants";
import { getLenis } from "@/hooks/useLenis";
import { useNav } from "@/components/shared/NavContext";
import { lockPageScroll, unlockPageScroll } from "@/lib/pageScrollLock";

function setBackgroundInert(isInert: boolean) {
  document
    .querySelectorAll<HTMLElement>(
      "main, footer, header, .skip-to-content, [role='status']"
    )
    .forEach((element) => {
      element.inert = isInert;
    });
}

function getCenteredSectionOffset(target: HTMLElement) {
  const content =
    target.querySelector<HTMLElement>("[data-scroll-lag]") ?? target;
  const headerBottom =
    document.querySelector<HTMLElement>("header")?.getBoundingClientRect()
      .bottom ?? 0;

  // Centre the section's actual content in the visible area below the fixed
  // header, rather than aligning the section's background with the viewport.
  const contentTop =
    content.offsetParent === target
      ? content.offsetTop
      : content.getBoundingClientRect().top -
        target.getBoundingClientRect().top;
  const visibleAreaCenter =
    headerBottom + (window.innerHeight - headerBottom) / 2;
  const centeredOffset =
    contentTop + content.offsetHeight / 2 - visibleAreaCenter;

  // Long sections cannot fit in one viewport. Keep their numbered label below
  // the header instead of centring it out of view.
  const maxOffsetWithLabelVisible = Math.max(
    0,
    contentTop - headerBottom - 28
  );

  return Math.round(
    Math.max(0, Math.min(centeredOffset, maxOffsetWithLabelVisible))
  );
}

/**
 * Full-screen navigation overlay.
 *
 * - Covers viewport at z-[90] with a translucent refractive dark background
 * - Section links from NAV_SECTIONS with staggered GSAP reveal
 * - Bottom area: email, social links, location
 * - Focus trap, Escape closes, aria-modal, body scroll locked via Lenis
 * - Open/close animations with GSAP Timeline
 */
export default function NavOverlay() {
  const { isNavOpen, closeNav } = useNav();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pendingTargetRef = useRef<string | null>(null);

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
    if (!overlayRef.current) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const links = linksRef.current.filter(Boolean) as HTMLElement[];
    const bottom = bottomRef.current;
    const closeBtn = closeButtonRef.current;
    const closeLabel = closeBtn?.querySelector(".nav-close-label");
    const closeLines = closeBtn?.querySelectorAll<HTMLElement>(
      ".nav-close-line"
    );
    const backgroundTargets = document.querySelectorAll<HTMLElement>(
      "main, footer, header"
    );

    // Make visible before animating
    overlay.style.display = "flex";
    overlay.style.visibility = "visible";
    overlay.style.pointerEvents = "auto";
    setBackgroundInert(true);
    closeBtn?.focus({ preventScroll: true });

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(panel, { clipPath: "inset(0 0 0% 0)" });
      gsap.set(backgroundTargets, {
        filter: "blur(12px) saturate(1.25)",
      });
      gsap.set([closeBtn, links, bottom], { opacity: 1, y: 0 });
      if (closeLabel) {
        gsap.set(closeLabel, { opacity: 1, y: 0, clipPath: "none" });
      }
      if (closeLines?.length === 3) {
        gsap.set(closeLines[0], { y: 0, rotate: 45, scaleX: 1 });
        gsap.set(closeLines[1], { y: 0, opacity: 0, scaleX: 0 });
        gsap.set(closeLines[2], { y: 0, rotate: -45, scaleX: 1 });
      }
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      panel,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.82,
        ease: "power4.inOut",
      }
    );

    tl.fromTo(
      backgroundTargets,
      { filter: "blur(0px) saturate(1)" },
      {
        filter: "blur(12px) saturate(1.25)",
        duration: 0.72,
        ease: "power3.inOut",
      },
      0
    );

    tl.set(closeBtn, { opacity: 1, scale: 1, rotate: 0 }, 0.08);

    if (closeLines?.length === 3) {
      tl.set(closeLines[0], { y: -6, rotate: 0, opacity: 1, scaleX: 1 }, 0);
      tl.set(closeLines[1], { y: 0, rotate: 0, opacity: 1, scaleX: 1 }, 0);
      tl.set(closeLines[2], { y: 6, rotate: 0, opacity: 1, scaleX: 1 }, 0);
      tl.to(
        closeLines[0],
        { y: 0, rotate: 45, duration: 0.52, ease: "power3.inOut" },
        0.12
      );
      tl.to(
        closeLines[1],
        { opacity: 0, scaleX: 0, duration: 0.28, ease: "power2.in" },
        0.18
      );
      tl.to(
        closeLines[2],
        { y: 0, rotate: -45, duration: 0.52, ease: "power3.inOut" },
        0.12
      );
    }

    if (closeLabel) {
      tl.fromTo(
        closeLabel,
        { opacity: 0, y: -4 },
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          ease: "power3.out",
        },
        0.64
      );
    }

    tl.fromTo(
      links,
      {
        opacity: 0,
        y: 28,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power4.out",
      },
      0.64
    );

    if (bottom) {
      tl.fromTo(
        bottom,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        0.8
      );
    }

    timelineRef.current = tl;
  }, []);

  // ---------- Close animation ----------
  const animateClose = useCallback(
    (onDone?: () => void) => {
      if (!overlayRef.current) return;

      const overlay = overlayRef.current;

      const finishClose = () => {
        gsap.set(document.querySelectorAll("main, footer, header"), {
          clearProps: "filter",
        });
        overlay.style.display = "none";
        overlay.style.visibility = "hidden";
        overlay.style.pointerEvents = "none";
        setBackgroundInert(false);
        unlockPageScroll();
        if (previousFocusRef.current) {
          previousFocusRef.current.focus({ preventScroll: true });
          previousFocusRef.current = null;
        }

        const targetId = pendingTargetRef.current;
        pendingTargetRef.current = null;

        if (targetId) {
          // Wait until scroll locking has actually been removed. This avoids
          // racing Lenis against the closing menu animation.
          requestAnimationFrame(() => {
            const target = document.getElementById(targetId);
            if (!target) return;

            const offset = getCenteredSectionOffset(target);
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(target, { offset, duration: 1.2 });
            } else {
              window.scrollTo({
                top: target.offsetTop + offset,
                behavior: "smooth",
              });
            }

            const hash = `#${targetId}`;
            if (window.location.hash !== hash) {
              window.history.pushState(null, "", hash);
            }
          });
        }

        onDone?.();
      };

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        finishClose();
        return;
      }

      const openTimeline = timelineRef.current;
      if (!openTimeline) {
        finishClose();
        return;
      }

      /* The opening timeline is the single source of truth: reversing it
         keeps the top reveal, link stagger, and icon morph exact. */
      openTimeline.eventCallback("onReverseComplete", finishClose);
      openTimeline.timeScale(1.15).reverse();
    },
    []
  );

  // ---------- Lock/unlock body scroll via Lenis ----------
  useLayoutEffect(() => {
    if (isNavOpen) {
      lockPageScroll(getLenis());
    }
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

      // The target is consumed only after the reverse transition has really
      // finished and page scrolling has been unlocked.
      pendingTargetRef.current = href.replace("#", "");
      closeNav();
    },
    [closeNav]
  );

  // Close when the user clicks the translucent space around the navigation.
  // Interactive controls keep their own behaviour, including the menu links.
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target;
      if (target instanceof Element && target.closest("a, button")) return;
      closeNav();
    },
    [closeNav]
  );

  // ---------- Cleanup on unmount ----------
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      pendingTargetRef.current = null;
      setBackgroundInert(false);
      unlockPageScroll();
      gsap.set(document.querySelectorAll("main, footer, header"), {
        clearProps: "filter",
      });
      document.documentElement.style.removeProperty(
        "--scrollbar-compensation"
      );
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="nav-overlay fixed inset-0 z-[90] flex-col overflow-hidden md:overflow-y-auto md:overscroll-contain invisible pointer-events-none"
      style={{
        paddingRight: "var(--scrollbar-compensation, 0px)",
      }}
      onClick={handleOverlayClick}
      aria-hidden={!isNavOpen}
      inert={!isNavOpen}
    >
      <div
        ref={panelRef}
        className="nav-overlay-panel pointer-events-none fixed inset-0"
        aria-hidden="true"
      >
        <div className="nav-overlay-glass absolute inset-0" />
      </div>

      {/* Close button follows the measured MENU icon position at each breakpoint. */}
      <div
        className="relative shrink-0 px-4 xl:px-0 max-w-6xl mx-auto w-full h-[64px]"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeNav}
          className="nav-close-button z-20 flex min-h-11 min-w-11 items-center justify-center gap-3 md:grid md:grid-cols-[56px_20px] text-text-primary transition-colors duration-200 hover:text-accent cursor-pointer"
          aria-label="Close navigation menu"
          style={{
            opacity: 0,
          }}
        >
          <span className="nav-close-label nav-toggle-label hidden md:inline text-left">
            CLOSE
          </span>
          <span
            className="relative block h-5 w-5"
            aria-hidden="true"
          >
            <span className="nav-close-line absolute left-0 top-1/2 block h-px w-5 bg-current" />
            <span className="nav-close-line absolute left-0 top-1/2 block h-px w-5 bg-current" />
            <span className="nav-close-line absolute left-0 top-1/2 block h-px w-5 bg-current" />
          </span>
        </button>
      </div>

      {/* Section links — main content area */}
      <nav
        className="relative z-10 flex flex-1 items-center max-w-6xl mx-auto w-full px-4 xl:px-0 py-4 md:block md:flex-none md:pt-[clamp(32px,5vh,56px)] md:pb-0"
        aria-label="Page sections"
      >
        <ul className="flex flex-col gap-[clamp(16px,3vh,32px)]">
          {NAV_SECTIONS.map((section, index) => (
            <li key={section.number}>
              <a
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                href={section.href}
                onClick={(e) => handleLinkClick(e, section.href)}
                className="group flex items-center gap-4 md:gap-6 py-2 md:py-[10px] min-h-[48px] relative bg-transparent hover:bg-transparent focus-visible:bg-transparent active:bg-transparent transition-[color] duration-300 hover:text-accent text-text-primary"
                style={{
                  opacity: 0,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {/* Hover line extending from left */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ width: "24px", marginLeft: "-32px" }}
                  aria-hidden="true"
                />

                {/* Section number */}
                <span
                  className="font-mono-text text-[14px] font-medium text-accent tracking-[1.5px]"
                  aria-hidden="true"
                >
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
        className="relative z-10 max-w-6xl mx-auto w-full shrink-0 px-4 xl:px-0 mt-0 pb-[max(24px,env(safe-area-inset-bottom))] md:mt-10 md:pb-16"
        style={{ opacity: 0 }}
      >
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Email */}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            aria-label={`Email Alex at ${SITE_CONFIG.email}`}
            className="font-mono-text text-[14px] text-text-primary/70 tracking-[1px] transition-colors duration-200 hover:text-accent"
          >
            {SITE_CONFIG.email}
          </a>

          {/* Social links are only shown after real profile URLs are configured. */}
          {(SITE_CONFIG.social.linkedin || SITE_CONFIG.social.github) && (
            <div className="flex items-center gap-4">
              {SITE_CONFIG.social.linkedin && (
                <a
                  href={SITE_CONFIG.social.linkedin}
                  className="font-mono-text text-[12px] text-text-primary/50 uppercase tracking-[1.5px] transition-colors duration-200 hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {SITE_CONFIG.social.linkedin && SITE_CONFIG.social.github && (
                <span
                  className="font-mono-text text-[12px] text-text-primary/20"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {SITE_CONFIG.social.github && (
                <a
                  href={SITE_CONFIG.social.github}
                  className="font-mono-text text-[12px] text-text-primary/50 uppercase tracking-[1.5px] transition-colors duration-200 hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          )}

          {/* Location */}
          <span className="font-mono-text text-[12px] text-text-primary/50 uppercase tracking-[1.5px]">
            {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
          </span>
        </div>
      </div>
    </div>
  );
}
