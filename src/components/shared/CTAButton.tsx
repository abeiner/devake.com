"use client";

import type { ReactNode } from "react";

type CTAButtonProps = {
  children: ReactNode;
  variant?: "primary" | "nav";
  className?: string;
  ariaLabel?: string;
} & (
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never }
  | { type: "submit"; href?: never; onClick?: never }
);

function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <span className="cta-button__content">
      <span className="cta-button__state cta-button__state--default">
        <span className="cta-button__label">{children}</span>
        <span className="cta-button__plus" aria-hidden="true">
          +
        </span>
      </span>
      <span
        className="cta-button__state cta-button__state--swapped"
        aria-hidden="true"
      >
        <span className="cta-button__plus">+</span>
        <span className="cta-button__label">{children}</span>
      </span>
    </span>
  );
}

export default function CTAButton({
  children,
  variant = "primary",
  className = "",
  ariaLabel,
  ...props
}: CTAButtonProps) {
  const classes = `cta-button cta-button--${variant} ${className}`;
  const accessibleLabel =
    ariaLabel ?? (typeof children === "string" ? children : undefined);

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={accessibleLabel}
      >
        <ButtonContent>{children}</ButtonContent>
      </a>
    );
  }

  return (
    <button
      type={"type" in props ? props.type : "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={classes}
      aria-label={accessibleLabel}
    >
      <ButtonContent>{children}</ButtonContent>
    </button>
  );
}
