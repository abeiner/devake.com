"use client";

import { useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { counterAnimation } from "@/lib/animations";

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const METRICS: Metric[] = [
  { value: 3, suffix: "+", label: "Years Active" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Countries Served" },
];

export default function MetricsRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useScrollAnimation(rowRef, (_el, tl) => {
    numberRefs.current.forEach((numEl, i) => {
      if (!numEl) return;
      const metric = METRICS[i];
      counterAnimation(numEl, metric.value, tl, {
        suffix: metric.suffix,
        delay: i * 0.15,
        duration: 1.5,
      });
    });
  });

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-3 border border-border mt-xl"
    >
      {METRICS.map((metric, i) => (
        <div
          key={metric.label}
          className={`px-lg py-md ${
            i < METRICS.length - 1
              ? "border-b md:border-b-0 md:border-r border-border"
              : ""
          }`}
        >
          <span
            ref={(el) => {
              numberRefs.current[i] = el;
            }}
            data-suffix={metric.suffix}
            className="block text-[36px] font-semibold tracking-[-1px] text-text-primary"
          >
            0{metric.suffix}
          </span>
          <span className="block font-mono-text font-normal text-[12px] tracking-[1.5px] uppercase text-text-primary/50 mt-xs">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
}
