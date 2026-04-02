"use client";

import useLenis from "@/hooks/useLenis";

/**
 * Wrapper component that initializes Lenis smooth scroll site-wide.
 * Placed inside the layout so every page benefits from smooth scrolling.
 * Does nothing on its own — the hook handles all setup and teardown.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  return <>{children}</>;
}
