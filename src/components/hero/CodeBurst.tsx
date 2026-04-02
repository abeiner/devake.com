"use client";

import { useCallback, useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * CodeBurst — click-to-burst interaction for the hero section.
 *
 * When the user clicks on the hero's empty space, 15-25 programming
 * symbols burst outward from the click point and fade away.
 *
 * - Uses GSAP for physics-like outward animation + fade
 * - IBM Plex Mono font via .font-mono-text utility class
 * - Respects prefers-reduced-motion
 * - Cleans up DOM elements after animation completes
 * - Multiple rapid clicks stack correctly
 */

const CODE_SYMBOLS = [
  "{", "}", "<", ">", "/", "=", ";", "::", "=>",
  "const", "import", "async", "function", "return",
  "void", "let", "var", "map", "() =>", "[]", "null", "true",
];

interface CodeBurstProps {
  /** Click coordinates relative to the hero container */
  clickEvent: { x: number; y: number; id: number } | null;
}

export default function CodeBurst({ clickEvent }: CodeBurstProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);

  // Check reduced motion preference on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;

    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const spawnBurst = useCallback((x: number, y: number) => {
    if (reducedMotionRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const count = 15 + Math.floor(Math.random() * 11); // 15-25

    // Create a document fragment to batch DOM insertions
    const fragment = document.createDocumentFragment();
    const elements: HTMLSpanElement[] = [];

    for (let i = 0; i < count; i++) {
      const symbol = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
      const span = document.createElement("span");

      // Random size 10-16px
      const fontSize = 10 + Math.floor(Math.random() * 7);

      // ~15% chance of red accent color
      const isRed = Math.random() < 0.15;
      const color = isRed ? "#FF3831" : "#FFFDD8";

      // Random starting opacity 60-90%
      const startOpacity = 0.6 + Math.random() * 0.3;

      span.textContent = symbol;
      span.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${fontSize}px;
        color: ${color};
        opacity: ${startOpacity};
        pointer-events: none;
        white-space: nowrap;
        will-change: transform, opacity;
        transform: translate(-50%, -50%);
      `;
      span.className = "font-mono-text";

      fragment.appendChild(span);
      elements.push(span);
    }

    container.appendChild(fragment);

    // Animate each element outward
    elements.forEach((el) => {
      // Random angle in radians (full 360 degrees)
      const angle = Math.random() * Math.PI * 2;

      // Random velocity 100-300px
      const velocity = 100 + Math.random() * 200;

      // Target position
      const targetX = Math.cos(angle) * velocity;
      const targetY = Math.sin(angle) * velocity;

      // Random slight rotation (-45 to +45 degrees)
      const rotation = (Math.random() - 0.5) * 90;

      // Duration 0.8-1.2s
      const duration = 0.8 + Math.random() * 0.4;

      gsap.to(el, {
        x: targetX,
        y: targetY,
        rotation,
        opacity: 0,
        duration,
        ease: "power2.out",
        onComplete: () => {
          // Clean up DOM element after animation
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        },
      });
    });
  }, []);

  // React to new click events
  useEffect(() => {
    if (clickEvent) {
      spawnBurst(clickEvent.x, clickEvent.y);
    }
  }, [clickEvent, spawnBurst]);

  // Cleanup all children on unmount
  useEffect(() => {
    const container = containerRef.current;
    return () => {
      if (container) {
        // Kill any running GSAP animations on children
        const children = container.querySelectorAll("span");
        children.forEach((child) => {
          gsap.killTweensOf(child);
        });
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[5] overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
