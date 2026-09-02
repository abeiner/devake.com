"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

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

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);

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
