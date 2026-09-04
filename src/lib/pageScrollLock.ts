type ScrollController = { stop(): void; start(): void };

let savedState: {
  overflow: string;
  paddingRight: string;
  compensation: string;
  controller?: ScrollController;
} | null = null;

export function lockPageScroll(controller?: ScrollController | null) {
  if (savedState) return;

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector<HTMLElement>("header");
  const bodyWidth = body.getBoundingClientRect().width;
  const headerWidth = header?.getBoundingClientRect().width;
  const paddingRight = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;

  savedState = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
    compensation: root.style.getPropertyValue("--scrollbar-compensation"),
    controller: controller ?? undefined,
  };

  controller?.stop();
  body.style.overflow = "hidden";

  // Measure the actual expansion after locking, before the browser paints.
  // A stable gutter may already preserve the body width. Fixed elements can
  // behave differently, so they must not share an assumed scrollbar width.
  const bodyExpansion = Math.max(0, body.getBoundingClientRect().width - bodyWidth);
  const fixedExpansion = header && headerWidth !== undefined
    ? Math.max(0, header.getBoundingClientRect().width - headerWidth)
    : bodyExpansion;

  if (bodyExpansion > 0) {
    body.style.paddingRight = `${paddingRight + bodyExpansion}px`;
  }
  root.style.setProperty("--scrollbar-compensation", `${fixedExpansion}px`);
}

export function unlockPageScroll() {
  if (!savedState) return;

  const root = document.documentElement;
  const body = document.body;
  body.style.overflow = savedState.overflow;
  body.style.paddingRight = savedState.paddingRight;
  if (savedState.compensation) {
    root.style.setProperty("--scrollbar-compensation", savedState.compensation);
  } else {
    root.style.removeProperty("--scrollbar-compensation");
  }
  savedState.controller?.start();
  savedState = null;
}
