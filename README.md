# Devake Website

Responsive single-page demo website for Devake, a geospatial software
development company.

Live demo: <https://green-ocean-01168ac1e.6.azurestaticapps.net>

The deployed site is explicitly marked as a demo and is not presented as the
official website of the original business.

## Technology

- Next.js 16.3.3 with the App Router
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- GSAP for motion
- Lenis for smooth scrolling
- Static export hosted by Azure Static Web Apps

## Requirements

- Node.js 20.9 or newer
- npm

## Local Development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Commands

```bash
npm run dev      # Start the development server
npm run lint     # Run the full ESLint configuration
npm run build    # Type-check, build, and export the static site to out/
```

The project uses `next build --webpack`. This keeps the build reliable on the
external development volume used for this project.

## Content and Branding

The main editable content is centralized in `src/lib/constants.ts`:

- company name, email, address, and map URL;
- navigation labels and anchors;
- capabilities;
- technology items and ticker text;
- the public case-study description and facts.

Other common edit locations:

| Content | File |
|---|---|
| Page title and description | `src/app/layout.tsx` |
| Hero copy and CTA | `src/components/hero/HeroSection.tsx` |
| About copy | `src/components/about/AboutSection.tsx` |
| Contact form behavior | `src/components/contact/ContactForm.tsx` |
| Demo disclaimer | `src/components/shared/DemoBanner.tsx` |
| Footer and design credit | `src/components/shared/Footer.tsx` |
| Colors and shared presentation | `src/app/globals.css` |
| Favicon | `src/app/icon.svg` |

## Project Structure

```text
src/app/                 Next.js layout, page, favicon, and global CSS
src/components/          Page sections and shared interface components
src/hooks/               Scroll and animation hooks
src/lib/                 Site content and animation utilities
src/types/               Shared TypeScript types
public/                  Static assets and Azure Static Web Apps config
```

## Accessibility

The site includes:

- semantic landmarks and a single logical heading outline;
- a skip link;
- keyboard-operable navigation with focus restoration;
- a modal navigation overlay with background inertness and scroll locking;
- accessible form names, required states, and native validation;
- reduced-motion handling;
- screen-reader descriptions for grouped facts and contact information.

## Build and Deployment

`npm run build` creates a fully static export in `out/`. The directory is
ignored by Git and is regenerated for every release.

Azure configuration is stored at `public/staticwebapp.config.json`. It is
copied into the exported output and defines the navigation fallback and
security headers.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the release procedure and Azure resource
details.

## Quality Assurance

The final responsive, keyboard, accessibility, form, anchor, build, and live
deployment checks are recorded in [QA_REPORT.md](QA_REPORT.md).

There is currently no automated unit or end-to-end test suite. Before a
release, run:

```bash
npm run lint
npm run build
```

Then perform a short browser smoke test at desktop, tablet, and mobile widths.

## Secrets

- `.env*` files are ignored by Git.
- Azure deployment tokens are never stored in the repository.
- Obtain a current token from Azure only when a direct deployment is needed.
- Reset a token immediately if it is pasted into a message, log, or tracked
  file.

## Handoff

See [HANDOFF.md](HANDOFF.md) for the client-transfer checklist, required access,
known behavior, and post-handoff actions.
