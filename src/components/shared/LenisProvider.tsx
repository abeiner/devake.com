"use client";

import useLenis from "@/hooks/useLenis";
import useScrollSnap from "@/hooks/useScrollSnap";

/**
 * Wrapper component that initializes Lenis smooth scroll and
 * GSAP-based scroll snapping site-wide.
 *
 * Placed inside the layout so every page benefits from smooth scrolling.
 * The hooks handle all setup and teardown.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  useScrollSnap();
  return <>{children}</>;
}
