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
 * Content is wrapped in an inner div that shifts upward on hover so
 * both title and description stay within the cell bounds.
 *
 * Mobile: title + description visible at all times (no hover).
 */
export default function CapabilityCell({
  title,
  description,
}: CapabilityCellProps) {
  return (
    <div className="capability-cell group relative border border-border min-h-[160px] px-8 py-8 flex flex-col overflow-hidden transition-[border-color,background-color] duration-300 ease-out hover:border-border-hover hover:bg-white/[0.03] md:items-center md:justify-center">
      {/* Inner wrapper — shifts up on hover to make room for description */}
      <div className="flex flex-col md:items-center md:transition-transform md:duration-300 md:ease-out md:group-hover:-translate-y-2">
        {/* Title — centered by default, turns red on hover (desktop) */}
        <span className="font-mono-text font-medium text-[14px] md:text-[16px] uppercase tracking-[1.5px] text-text-primary transition-colors duration-300 ease-out md:group-hover:text-accent">
          {title}
        </span>

        {/* Description — always visible on mobile, hover-reveal on desktop */}
        <p className="mt-3 font-mono-text font-normal text-[13px] leading-[1.6] text-text-primary/70 md:mt-2 md:text-center md:opacity-0 md:translate-y-2 md:transition-all md:duration-300 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 md:line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
