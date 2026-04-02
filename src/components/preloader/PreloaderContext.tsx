"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

const SESSION_KEY = "devake-preloader-played";

interface PreloaderContextType {
  /** Whether the preloader animation has finished (or was skipped) */
  isComplete: boolean;
  /** Called by the Preloader when its GSAP timeline completes */
  markComplete: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isComplete: false,
  markComplete: () => {},
});

/**
 * Determines synchronously whether the preloader should be skipped.
 * Called on the client only (SSR returns false; hydration corrects immediately).
 */
function shouldSkipPreloader(): boolean {
  if (typeof window === "undefined") return false;
  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  // Already played this session
  try {
    if (sessionStorage.getItem(SESSION_KEY) === "true") return true;
  } catch {
    // sessionStorage unavailable
  }
  return false;
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  // Start as false for SSR; immediately correct on client mount
  const [isComplete, setIsComplete] = useState(false);

  // On mount, synchronously check if preloader should be skipped.
  // This fires before the hero animation effect, giving it the correct value.
  useEffect(() => {
    if (shouldSkipPreloader()) {
      setIsComplete(true);
    }
  }, []);

  const markComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isComplete, markComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
