# QA Report — devake.com
**Date:** 2026-04-02
**Type:** Focused P1 Fix Verification + General Regression Check
**QA Reviewer:** qa-reviewer agent (claude-sonnet-4-6)
**Server:** http://localhost:3000 (Next.js 16.2.2, Turbopack)
**Build:** `npm run build` — PASS

---

## Summary

All 4 P1 issues from the previous QA cycle are **confirmed fixed**. No new P0 or P1 issues were introduced. Build passes cleanly. Zero console errors or warnings across all test scenarios.

| Check | Result |
|---|---|
| P1-001 NavOverlay pointer events | FIXED |
| P1-002 About section h2 heading | FIXED |
| P1-003 CTA aria-label double-read | FIXED |
| P1-004 PasswordGate inert attribute | FIXED |
| All 7 sections render | PASS |
| Build (npm run build) | PASS |
| Console errors | 0 |
| Mobile 375px layout | PASS |
| Mobile hamburger menu | PASS |

---

## P1 Fix Verification — Detailed Results

### P1-001: NavOverlay Pointer Events

**Status: FIXED**

**Test performed:** Opened nav overlay via MENU button, then clicked the Close button. Immediately queried computed styles on `#nav-overlay` and clicked the "SEE OUR WORK" hero CTA.

**Evidence:**
- After close animation completes, `#nav-overlay` has:
  - `display: none`
  - `visibility: hidden`
  - `pointer-events: none`
  - `opacity: 0` (computed)
- Click on "SEE OUR WORK" link successfully navigated to `#work` — confirming zero pointer-events interception by the closed overlay.

**Implementation reviewed:** `NavOverlay.tsx` — `animateClose()` sets `overlay.style.display = "none"`, `overlay.style.visibility = "hidden"`, `overlay.style.pointerEvents = "none"` in the GSAP `onComplete` callback. Initial render also sets `pointerEvents: isNavOpen ? "auto" : "none"` as inline style.

---

### P1-002: About Section Heading

**Status: FIXED**

**Test performed:** Accessibility tree snapshot at desktop (1280px) and mobile (375px).

**Evidence:**
- Snapshot contains: `heading "About" [level=2]` inside `region "About"`
- Element is rendered as `<h2 id="about-heading" className="sr-only">About</h2>`
- The `sr-only` class makes it visually hidden but present in the accessibility tree and heading outline
- The section has `aria-labelledby="about-heading"` — assistive technologies correctly announce "About" as the region label

**Implementation reviewed:** `AboutSection.tsx` line 89 — `<h2 id="about-heading" className="sr-only">About</h2>` is present immediately after the `SectionHeader` component.

---

### P1-003: CTA Button aria-label (Double-Reading)

**Status: FIXED**

**Test performed:** Queried the navbar CTA `<a>` element via `document.querySelector('header a[href="#contact"]')` and inspected `ariaLabel`, `textContent`, and `innerHTML`.

**Evidence:**
```
ariaLabel:   "LET'S TALK +"
textContent: "LET'S TALKTALK +"   (visual text from both responsive spans concatenated)
innerHTML:   <span class="hidden md:inline" aria-hidden="true">LET'S TALK</span>
             <span class="md:hidden" aria-hidden="true">TALK</span>
             <span aria-hidden="true">+</span>
```

- Both visual text spans have `aria-hidden="true"` — invisible to screen readers
- The explicit `aria-label="LET'S TALK +"` on the `<a>` element is what screen readers announce
- Screen reader output: "LET'S TALK +" (correct, no double-read)

**Implementation reviewed:** `Navbar.tsx` line 144 — `<CTAButton href="#contact" variant="nav" ariaLabel="LET'S TALK +">`. `CTAButton.tsx` line 32 — `<a href={props.href} className={classes} aria-label={ariaLabel}>`.

---

### P1-004: PasswordGate Inert Attribute

**Status: FIXED**

**Test performed:** Cleared `sessionStorage` key `devake-demo-access`, reloaded page. Queried all `[inert]` elements in the DOM.

**Evidence:**
```
inertDivsCount: 1
inertDivSelectors: [{
  tag: "DIV",
  hasInertAttr: true,
  inertValue: "",      // empty string = boolean true in HTML
  containsMain: true   // wraps the full page content
}]
```

- Exactly 1 `inert` wrapper exists
- It contains the `<main>` element (all page content)
- Background content is completely inaccessible via keyboard, screen reader, and mouse while the gate is visible
- React's `inert={true}` correctly renders as the HTML boolean attribute `inert=""`

**Implementation reviewed:** `PasswordGate.tsx` line 64 — `<div inert={showGate ? true : undefined}>` wraps `{children}`. The conditional ensures `inert` is only applied when `showGate` is `true` (gate visible, not authenticated, not checking).

---

## General Regression Check

### All 7 Sections Render

Verified at both 1280px and 375px via accessibility tree snapshot. All sections present:

| # | Section ID | Heading | Status |
|---|---|---|---|
| 1 | `#hero` | "D E V A K E ." (h1) | Present |
| 2 | `#about` | "About" (h2, sr-only) | Present |
| 3 | `#capabilities` | "What We Build" (h2) | Present |
| 4 | `#work` | "Forest Canopy Analysis..." (h2) | Present |
| 5 | `#technology` | "Our Stack" (h2) | Present |
| 6 | `#about-team` | "Built by Engineers" (h2) | Present |
| 7 | `#contact` | "Let's Build Something." (h2) | Present |

### Build

```
npm run build

Compiled successfully in 2.1s
Running TypeScript ... Finished in 1912ms
Generating static pages (4/4) in 267ms

Route (app)
○ /
○ /_not-found
```

Zero TypeScript errors. Zero compilation warnings. Static export produces 2 routes.

### Console Errors

Tested at page load, after nav open/close cycle, and at mobile 375px.

- Errors: **0**
- Warnings: **0**

### Mobile 375px

**Hamburger menu:** Opens full-screen overlay with all 6 nav links visible and the CLOSE button present. Close button works correctly. Hero content is fully visible and interactive after close. No overflow or clipping issues.

**Hero:** DEVAKE. heading, subtitle, and "SEE OUR WORK" CTA all render correctly at mobile. CTA button displays "TALK +" as designed for mobile breakpoint.

**All sections:** Full-page screenshot at 375px confirms all 7 sections render without horizontal overflow or layout breakage.

---

## No New Issues Introduced

No new P0, P1, or P2 issues were identified during this verification run. All 4 targeted fixes are clean with no regressions.

---

## Screenshots

| File | Description |
|---|---|
| `current/images/qa-verify-initial.png` | Desktop 1280px — site on load (authenticated) |
| `current/images/qa-nav-open.png` | Desktop — nav overlay open |
| `current/images/qa-password-gate.png` | PasswordGate showing (sessionStorage cleared) |
| `current/images/qa-mobile-375.png` | Mobile 375px — full page scroll |
| `current/images/qa-mobile-hero.png` | Mobile 375px — hero viewport |
| `current/images/qa-mobile-nav-open.png` | Mobile 375px — nav overlay open |
| `current/images/qa-mobile-nav-closed.png` | Mobile 375px — nav closed, hero visible |
