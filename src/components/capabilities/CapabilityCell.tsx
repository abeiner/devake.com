"use client";

type CapabilityCellProps = {
  title: string;
  description: string;
};

/**
 * CapabilityCell — a single cell in the 3x2 capabilities grid.
 *
 * Desktop: shows title only by default. On hover the title shifts up,
 * turns red, and a 2-line description fades in. Border brightens.
 *
 * Mobile: title + description visible at all times (no hover).
 */
export default function CapabilityCell({
  title,
  description,
}: CapabilityCellProps) {
  return (
    <div className="capability-cell group relative border border-border min-h-[160px] px-8 py-10 flex flex-col transition-[border-color,background-color] duration-300 ease-out hover:border-border-hover hover:bg-white/[0.03] md:items-center md:justify-center">
      {/* Title — centered by default, shifts up on hover (desktop) */}
      <span className="font-mono-text font-medium text-[14px] md:text-[16px] uppercase tracking-[1.5px] text-text-primary transition-all duration-300 ease-out md:group-hover:text-accent md:group-hover:-translate-y-3">
        {title}
      </span>

      {/* Description — always visible on mobile, hover-reveal on desktop */}
      <p className="mt-3 font-mono-text font-normal text-[13px] leading-[1.6] text-text-primary/70 md:absolute md:left-8 md:right-8 md:top-1/2 md:mt-0 md:translate-y-1 md:opacity-0 md:transition-all md:duration-300 md:ease-out md:group-hover:translate-y-3 md:group-hover:opacity-100">
        {description}
      </p>
    </div>
  );
}
