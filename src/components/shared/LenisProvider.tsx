"use client";

import useLenis from "@/hooks/useLenis";

/**
 * Wrapper component that initializes Lenis smooth scrolling site-wide.
 *
 * Section snapping is intentionally not used: it can move the page after
 * the user has stopped scrolling and makes navigation feel unpredictable.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  return <>{children}</>;
}
