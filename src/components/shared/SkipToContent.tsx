"use client";

import type { MouseEvent } from "react";
import { getLenis } from "@/hooks/useLenis";

export default function SkipToContent() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const main = document.getElementById("main-content");
    if (!main) return;

    main.focus({ preventScroll: true });

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(main, { immediate: true });
    } else {
      main.scrollIntoView();
    }

    if (window.location.hash !== "#main-content") {
      window.history.pushState(null, "", "#main-content");
    }
  }

  return (
    <a
      href="#main-content"
      className="skip-to-content"
      onClick={handleClick}
    >
      Skip to content
    </a>
  );
}
