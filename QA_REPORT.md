# QA Report — devake.com

**Date:** 2026-09-01

**Scope:** Final pre-handoff regression check
**Production URL:** <https://green-ocean-01168ac1e.6.azurestaticapps.net>

## Result

PASS — no blocking defects were found.

## Code and Build

| Check | Result |
|---|---|
| `git diff --check` | PASS |
| Full ESLint run | PASS |
| Next.js production build | PASS |
| TypeScript validation during build | PASS |
| Static export | PASS |

Build output contains the home page, not-found page, and SVG favicon route.

## Responsive Layout

Tested sequentially at:

- desktop: 1440 × 900;
- tablet: 768 × 1024;
- mobile: 390 × 844.

Verified at every size:

- all page sections are present;
- no horizontal overflow;
- the hero matches the visible viewport height;
- the hero CTA remains visible;
- the form remains visible and usable;
- the footer reaches the real end of the document.

On tablet and mobile, duplicate contact details are hidden from the Contact
section because the same details are available immediately in the footer.

## Navigation and Keyboard

- The navigation overlay opens and fills exactly one mobile viewport.
- Background scrolling is locked while the dialog is open.
- Focus moves inside the dialog.
- Escape closes the dialog.
- Focus returns to the menu opener after the reverse animation completes.
- Menu section links close the overlay and scroll to valid targets.
- All ten internal hash links have existing targets.

## Form

- The form has the accessible name `Project inquiry`.
- Name, email, and project brief are required.
- Empty submission invokes native validation and focuses the first invalid
  field.
- A syntactically valid email and completed fields clear all invalid states.
- The submit action opens a pre-filled email draft; it does not send data to a
  server.

The external mail application was not opened during the automated smoke test.

## Accessibility Structure

- One `h1` and a logical `h2`/`h3` hierarchy.
- One `main` landmark and one footer.
- No unnamed links or buttons.
- No images without `alt` text.
- No duplicate element IDs.
- Skip link, native controls, reduced-motion handling, and modal inertness are
  present.

VoiceOver was also reviewed manually during the accessibility pass before this
final regression run.

## Production Smoke Test

| Check | Result |
|---|---|
| Home page | HTTP 200 |
| Page title | Correct |
| SVG favicon | HTTP 200, `image/svg+xml` |
| `robots.txt` | Public indexing allowed |
| Mobile horizontal overflow | None |
| Mobile hero and CTA | Fully visible |
| Mobile navigation overlay | Visible, locked, viewport-sized |

Verified production security headers:

- Content-Security-Policy;
- Strict-Transport-Security;
- X-Content-Type-Options;
- Referrer-Policy.

## Header Update — 2026-09-03

- Desktop/tablet header: menu on the left, centered logo, contact CTA on the right.
- Mobile header below 768 px retains its original arrangement.
- Verified at widths 390, 768, 1440, and 3440 px: one accessible logo link,
  visual/DOM navigation order, no horizontal overflow, matching MENU/CLOSE
  positions, no scrollbar-induced shift, and Escape/focus restoration.
- Full ESLint and production build passed after the change.

## Test-Suite Limitation

There is no automated end-to-end test suite. The release gate is full lint,
scroll-lock unit tests, production build, and the browser smoke test above.

## Scroll-Lock Follow-up — 2026-09-03

- Replaced assumed scrollbar-width padding with actual before/after layout
  measurements, independently for the body and fixed header. This avoids
  double compensation when a browser preserves its stable gutter.
- Focus restoration now uses `preventScroll`.
- Four lightweight unit cases pass: disappearing gutter, retained gutter,
  body/fixed-element differences, and fractional widths. Each checks repeated
  cycles, style restoration, and operation without the smooth-scroll controller.
- Local production browser checks at 390, 1440, 2560, and 3440 CSS pixels:
  zero horizontal position/width change for header, main, visible hero SVG,
  hero content wrapper, capabilities heading, and footer during menu toggles.
- The reported iMac-specific behavior was not reproduced on the available
  browsers. The exact iMac/browser combination still needs user verification.
