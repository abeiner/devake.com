"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";

type SplitMode = "lines" | "words" | "chars";

/**
 * Splits the text content of an HTML element into individually
 * addressable `<span>` wrappers so GSAP can animate them.
 *
 * Modes:
 *  - "lines"  — each visual line gets a wrapper `<div style="overflow:hidden">`
 *               containing a `<span class="split-line">` (slide-up reveal)
 *  - "words"  — each word wrapped in `<span class="split-word">`
 *  - "chars"  — each character wrapped in `<span class="split-char">`
 *
 * Returns an array of the inner `<span>` elements.
 * Automatically re-splits on resize (debounced 200ms).
 */
export default function useSplitText(
  ref: RefObject<HTMLElement | null>,
  mode: SplitMode = "lines"
) {
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const originalHTMLRef = useRef<string>("");
  const originalAriaLabelRef = useRef<string | null>(null);

  const split = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Restore original HTML before re-splitting
    if (originalHTMLRef.current) {
      el.innerHTML = originalHTMLRef.current;
    } else {
      originalHTMLRef.current = el.innerHTML;
      originalAriaLabelRef.current = el.getAttribute("aria-label");
    }

    // Animated wrappers can remove whitespace between visual lines in the
    // accessibility tree (for example, "USForestry"). The visual fragments
    // stay hidden from assistive technology; a semantic text node is added
    // after splitting instead of putting an invalid aria-label on a heading
    // or paragraph.
    const accessibleText = (el.textContent || "")
      .replace(/\s+/g, " ")
      .trim();
    if (originalAriaLabelRef.current === null) {
      el.removeAttribute("aria-label");
    }

    const spans: HTMLSpanElement[] = [];

    if (mode === "chars") {
      const text = el.textContent || "";
      el.innerHTML = "";
      for (const char of text) {
        const span = document.createElement("span");
        span.className = "split-char";
        span.style.display = "inline-block";
        span.setAttribute("aria-hidden", "true");
        // Preserve spaces — a zero-width space collapses, but nbsp does not
        span.textContent = char === " " ? "\u00A0" : char;
        el.appendChild(span);
        spans.push(span);
      }
    } else if (mode === "words") {
      const text = el.textContent || "";
      el.innerHTML = "";
      const words = text.split(/\s+/).filter(Boolean);
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "split-word";
        span.style.display = "inline-block";
        span.setAttribute("aria-hidden", "true");
        span.textContent = word;
        el.appendChild(span);
        spans.push(span);
        // Re-insert a whitespace text node between words
        if (i < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });
    } else {
      // "lines" mode — requires measuring rendered line breaks
      splitIntoLines(el, spans);
    }

    if (accessibleText && originalAriaLabelRef.current === null) {
      const accessible = document.createElement("span");
      accessible.className = "sr-only split-accessible-text";
      accessible.textContent = accessibleText;
      el.insertBefore(accessible, el.firstChild);
    }

    spansRef.current = spans;
  }, [ref, mode]);

  useEffect(() => {
    split();
    const element = ref.current;

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(split, 200);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);

      if (element && originalHTMLRef.current) {
        element.innerHTML = originalHTMLRef.current;
        if (originalAriaLabelRef.current === null) {
          element.removeAttribute("aria-label");
        } else {
          element.setAttribute("aria-label", originalAriaLabelRef.current);
        }
      }
    };
  }, [split, ref]);

  return spansRef;
}

/* ------------------------------------------------------------------ */
/*  Internal: measure rendered line breaks then wrap each line         */
/* ------------------------------------------------------------------ */
function splitIntoLines(el: HTMLElement, spans: HTMLSpanElement[]) {
  const text = el.textContent || "";
  const words = text.split(/\s+/).filter(Boolean);

  // Temporarily wrap every word in a span to detect line breaks
  el.innerHTML = "";
  const tempSpans: HTMLSpanElement[] = [];
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.style.display = "inline";
    span.textContent = word;
    el.appendChild(span);
    tempSpans.push(span);
    if (i < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });

  // Group words by their offsetTop (same top = same visual line)
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentTop = -1;

  tempSpans.forEach((span) => {
    const top = span.getBoundingClientRect().top;
    if (currentTop === -1) {
      currentTop = top;
    }
    // Tolerance of 2px for sub-pixel rendering differences
    if (Math.abs(top - currentTop) > 2) {
      lines.push(currentLine);
      currentLine = [];
      currentTop = top;
    }
    currentLine.push(span.textContent || "");
  });
  if (currentLine.length) {
    lines.push(currentLine);
  }

  // Rebuild DOM with the line structure
  el.innerHTML = "";
  lines.forEach((lineWords, index) => {
    const wrapper = document.createElement("span");
    wrapper.style.overflow = "hidden";
    wrapper.style.display = "block";
    wrapper.className = "split-line-wrapper";
    wrapper.setAttribute("aria-hidden", "true");

    const inner = document.createElement("span");
    inner.className = "split-line";
    inner.style.display = "block";
    inner.textContent = lineWords.join(" ");

    wrapper.appendChild(inner);
    el.appendChild(wrapper);
    if (index < lines.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
    spans.push(inner);
  });
}
