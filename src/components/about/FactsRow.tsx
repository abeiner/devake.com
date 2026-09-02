"use client";

import { useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { staggerFadeIn } from "@/lib/animations";

const FACTS = [
  {
    value: "Web / Mobile / Desktop",
    label: "Solutions",
    accessibleText:
      "Solutions are delivered through web, mobile, and desktop applications.",
  },
  {
    value: "Satellite / LIDAR",
    label: "Research Inputs",
    accessibleText: "Research uses satellite and LIDAR imagery.",
  },
  {
    value: "Worldwide",
    label: "Client Reach",
    accessibleText: "Devake works with clients worldwide.",
  },
];

export default function FactsRow() {
  const rowRef = useRef<HTMLUListElement>(null);

  useScrollAnimation(rowRef, (el, tl) => {
    const facts = el.querySelectorAll(".about-fact");
    if (facts.length > 0) {
      staggerFadeIn(facts, tl, 0.12, { duration: 0.6 });
    }
  });

  return (
    <ul
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-3 border border-border mt-xl list-none"
    >
      {FACTS.map((fact, index) => (
        <li
          key={fact.label}
          className={`about-fact flex flex-col px-lg py-md ${
            index < FACTS.length - 1
              ? "border-b md:border-b-0 md:border-r border-border"
            : ""
          }`}
        >
          <span className="sr-only">{fact.accessibleText}</span>
          <span
            className="order-2 block font-mono-text font-normal text-[12px] tracking-[1.5px] uppercase text-text-primary/50 mt-xs"
            aria-hidden="true"
          >
            {fact.label}
          </span>
          <span
            className="order-1 block text-[22px] md:text-[26px] font-medium tracking-[-1px] text-text-primary"
            aria-hidden="true"
          >
            {fact.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
