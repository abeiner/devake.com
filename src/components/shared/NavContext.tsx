"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface NavContextType {
  /** Whether the navigation overlay is currently open */
  isNavOpen: boolean;
  /** Open the navigation overlay */
  openNav: () => void;
  /** Close the navigation overlay */
  closeNav: () => void;
}

const NavContext = createContext<NavContextType>({
  isNavOpen: false,
  openNav: () => {},
  closeNav: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = useCallback(() => {
    setIsNavOpen(true);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <NavContext.Provider value={{ isNavOpen, openNav, closeNav }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}
