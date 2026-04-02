"use client";

type CTAButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "nav";
  className?: string;
  ariaLabel?: string;
} & (
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never }
);

export default function CTAButton({
  children,
  variant = "primary",
  className = "",
  ariaLabel,
  ...props
}: CTAButtonProps) {
  const baseClasses =
    "font-mono-text font-medium text-[14px] uppercase tracking-[2px] inline-block cursor-pointer";

  const variantClasses =
    variant === "primary"
      ? "text-accent bg-transparent border border-[rgba(255,56,49,0.4)] px-8 py-4 transition-all duration-300 ease-out hover:bg-accent hover:text-text-dark"
      : "text-text-dark bg-accent border-none px-6 py-3 transition-all duration-200 ease-out hover:bg-accent-hover";

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={classes} aria-label={ariaLabel}>
        {children} <span aria-hidden="true">+</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={"onClick" in props ? props.onClick : undefined}
      className={classes}
      aria-label={ariaLabel}
    >
      {children} <span aria-hidden="true">+</span>
    </button>
  );
}
