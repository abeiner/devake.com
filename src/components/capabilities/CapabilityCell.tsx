"use client";

type CapabilityCellProps = {
  title: string;
  description: string;
};

/**
 * CapabilityCell — a single cell in the 3x2 capabilities grid.
 *
 * Desktop: keeps both title and description visible. Hover adds only a
 * restrained lift, red title, clearer description, and brighter border.
 *
 * Mobile: title + description visible at all times (no hover).
 */
export default function CapabilityCell({
  title,
  description,
}: CapabilityCellProps) {
  return (
    <li className="capability-cell group relative border border-border min-h-[180px] px-8 py-8 flex flex-col overflow-hidden transition-[border-color,background-color] duration-300 ease-out hover:border-border-hover hover:bg-white/[0.03] md:items-center md:justify-center">
      {/* Descriptions remain visible; hover only adds a restrained emphasis. */}
      <div className="flex flex-col md:items-center md:transition-transform md:duration-300 md:ease-out md:translate-y-1 md:group-hover:translate-y-0">
        {/* Title — centered by default, turns red on hover (desktop) */}
        <h3 className="font-mono-text font-medium text-[14px] md:text-[16px] uppercase tracking-[1.5px] text-text-primary transition-colors duration-300 ease-out md:group-hover:text-accent">
          {title}
        </h3>

        {/* Description — visible by default and slightly clearer on hover. */}
        <p className="mt-3 font-mono-text font-normal text-[13px] leading-[1.6] text-text-primary/60 md:mt-2 md:text-center md:transition-colors md:duration-300 md:ease-out md:group-hover:text-text-primary/85">
          {description}
        </p>
      </div>
    </li>
  );
}
