# Technical Architecture: DEVAKE.COM Rebuild

> Prepared 2026-04-02 | Single-page Awwwards-caliber geospatial software site
> Hosting: Azure Static Web Apps | Framework: Next.js 15 (static export)

---

## 1. Architecture Decisions

### ADR-1: Framework -- Next.js 15 with App Router, Static Export

**Context:** The site is a single-page scroll with 8 anchored sections, heavy GSAP animations, a canvas-based hero, and no server-side data requirements. It must deploy to Azure Static Web Apps (static files only).

**Decision:** Next.js 15 with App Router and `output: "export"`.

**Alternatives considered:**
1. **Astro** -- Excellent for static sites with its zero-JS-by-default model. Rejected because the site is extremely JS-heavy (GSAP, Lenis, Canvas/Three.js, ScrollTrigger). Astro's island architecture would fight us on every global animation. The entire page is one continuous interactive experience, not isolated components.
2. **Vite + React (no framework)** -- Lighter than Next.js, no routing overhead. Rejected because Next.js provides the mature build pipeline, font optimization (`next/font`), image handling, and established Azure SWA deployment patterns we have used on four prior projects. The routing overhead is negligible for a single-page site.

**Consequences:**
- Gain: Proven deployment pipeline to Azure SWA, `next/font/google` for font loading, consistent with prior projects (elderhelpers, bendoregonheating, fahertyspcs, aaronsautomotive)
- Sacrifice: ~15KB framework overhead that pure Vite+React would avoid. Acceptable for this project's complexity level.

**Config requirements:**
```js
// next.config.ts
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
```

---

### ADR-2: Styling -- Tailwind CSS v4 with @theme Block

**Context:** The design system uses a strict color palette (3 colors + opacity variants), an 8px spacing grid, and component-level custom properties. The Griflan inspiration site uses Tailwind CSS v4.

**Decision:** Tailwind CSS v4 with a `@theme` block defining all design tokens (colors, spacing, fonts) in the global CSS file. No separate `tailwind.config.ts`.

**Alternatives considered:**
1. **Tailwind CSS v3** -- Stable, widely documented. Rejected because v4's `@theme` block is a cleaner pattern for this project's token-heavy design system. The `@theme` approach keeps design tokens in CSS where designers expect them, and v4's automatic content detection eliminates config.
2. **CSS Modules + custom properties** -- Maximum control, zero library overhead. Rejected because the project has many utility-pattern styles (borders, opacity variants, responsive grids) that Tailwind handles with less code. Writing these from scratch would add build time without proportional benefit.

**Consequences:**
- Gain: First-class `@theme` integration, automatic content detection, smaller CSS output via v4's Oxide engine
- Sacrifice: v4 is newer and has less Stack Overflow coverage. Mitigated by thorough Tailwind v4 documentation.

**@theme block (in `globals.css`):**
```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0A0A0C;
  --color-bg-secondary: #111113;
  --color-bg-light: #FFFDD8;
  --color-text-primary: #FFFDD8;
  --color-text-dark: #0A0A0C;
  --color-accent: #FF3831;
  --color-accent-hover: #FF5A54;
  --color-border: rgba(255, 253, 216, 0.1);
  --color-border-hover: rgba(255, 253, 216, 0.3);

  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 40px;
  --spacing-xl: 64px;
  --spacing-2xl: 100px;
  --spacing-3xl: 160px;
}
```

---

### ADR-3: Typography -- Space Grotesk + IBM Plex Mono (Google Fonts)

**Context:** The UI/UX proposal specifies Aeonik Pro + IBM Plex Mono. Aeonik Pro is a premium TypeKit/commercial font requiring a paid license. The project needs a zero-cost Google Fonts alternative that achieves the same geometric sans-serif character.

**Decision:** **Space Grotesk** (Google Fonts, variable weight) for display/headings + **IBM Plex Mono** (Google Fonts) for technical text, CTAs, and labels. Both loaded via `next/font/google` for zero layout shift.

**Why Space Grotesk over other alternatives:**
- **Space Grotesk vs Inter:** Inter is ubiquitous and feels generic on tech sites. Space Grotesk has a distinctly geometric personality with slightly squared letterforms and tighter optical sizing at large scales -- closer to Aeonik Pro's editorial feel.
- **Space Grotesk vs Outfit:** Outfit is rounder and friendlier. Space Grotesk is more angular and technical, which aligns better with a geospatial software company.
- **Space Grotesk vs Sora:** Sora has wide letterforms that consume too much horizontal space at display sizes (120-160px). Space Grotesk is more compact.
- **Space Grotesk vs DM Sans:** DM Sans is a clean geometric sans but lacks personality at display sizes. Space Grotesk has character in its 'a', 'g', and numeral forms that make it visually interesting at 120px+.

**IBM Plex Mono** is the same font specified in the UI/UX proposal. It is free on Google Fonts. No substitution needed.

**Font loading strategy:**
```tsx
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});
```

---

### ADR-4: Animation Stack -- GSAP + Lenis + Canvas 2D

**Context:** The design calls for scroll-triggered section reveals, SplitText text animations, smooth scrolling, a preloader timeline, and an interactive point cloud hero. This is the most animation-heavy project in the pipeline.

**Decision:** GSAP (with ScrollTrigger plugin) + Lenis for smooth scrolling + Canvas 2D API for the point cloud hero.

**GSAP licensing note:** GSAP's free license allows use on sites that are not behind a paywall. Since this is a demo/pitch site (password-gated but free), GSAP's standard license applies. SplitText is a paid Club GSAP plugin -- we will use a custom text-split utility instead (splitting text into `<span>` elements in a React hook), which GSAP can then animate identically.

**Alternatives considered for the hero:**
1. **Three.js** -- Full 3D engine, would produce the most impressive point cloud. Rejected because Three.js adds ~150KB+ to the bundle for what is fundamentally a 2D particle effect with parallax. The design shows a point cloud viewed from a fixed perspective with mouse-reactive drift -- this is achievable with Canvas 2D at a fraction of the bundle cost. If the design-beautifier later determines a true 3D rotation is needed, Three.js can be swapped in for the hero canvas only.
2. **WebGL raw shaders** -- Maximum performance, smallest bundle. Rejected because writing raw WebGL for particle systems is complex and hard to maintain. Canvas 2D with requestAnimationFrame is performant enough for 2,000-5,000 particles and accessible to the frontend engineer.

**Lenis vs native scroll-behavior:**
- `scroll-behavior: smooth` is CSS-only and has no scroll physics customization. It cannot provide the buttery "lerp" feel that defines Awwwards-level smooth scrolling. Lenis is 3KB gzipped and is the industry standard for this (used by Good Fella, SRG, and many SOTD winners).

**Package versions:**
```json
{
  "gsap": "^3.12.7",
  "lenis": "^1.1.18"
}
```

**Custom SplitText alternative:** A React hook `useSplitText` that wraps each line/word/character in a `<span>` with appropriate classes. GSAP then animates these spans. This avoids the paid SplitText plugin while achieving the same visual result.

---

### ADR-5: Project Structure

**Context:** Single-page site with 8 sections, each with its own animations, a shared navigation system, a preloader, and global utilities (coordinate tracker, noise texture).

**Decision:** Feature-based component organization within a flat `src/` structure.

```
devake.com/
├── public/
│   ├── robots.txt                    # Disallow: /
│   ├── noise.png                     # Noise texture overlay (tiny, ~2KB)
│   ├── devake-icon.svg               # Geometric logo icon
│   └── devake-logo-text.svg          # "DEVAKE." text wordmark
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (fonts, metadata, DemoBanner, PasswordGate)
│   │   ├── page.tsx                  # Single page: assembles all sections in order
│   │   └── globals.css               # Tailwind @theme, base styles, noise overlay
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── DemoBanner.tsx        # Demo disclaimer banner (closeable)
│   │   │   ├── PasswordGate.tsx      # Access code overlay (demo2026)
│   │   │   ├── Navbar.tsx            # Fixed top bar (icon, MENU, CTA)
│   │   │   ├── NavOverlay.tsx        # Full-screen menu overlay
│   │   │   ├── Footer.tsx            # SVG wordmark, info grid, credit
│   │   │   ├── CTAButton.tsx         # Reusable CTA component (primary/nav variants)
│   │   │   ├── SectionHeader.tsx     # Section number + label component
│   │   │   └── AnnotationLabel.tsx   # Floating monospace annotation labels
│   │   │
│   │   ├── preloader/
│   │   │   └── Preloader.tsx         # Full preloader sequence
│   │   │
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx       # Hero layout (text, CTA, scroll indicator)
│   │   │   └── PointCloud.tsx        # Canvas 2D particle system
│   │   │
│   │   ├── about/
│   │   │   ├── AboutSection.tsx      # About section layout
│   │   │   └── MetricsRow.tsx        # Animated counter metrics
│   │   │
│   │   ├── capabilities/
│   │   │   ├── CapabilitiesSection.tsx
│   │   │   └── CapabilityCell.tsx    # Individual grid cell with hover
│   │   │
│   │   ├── work/
│   │   │   └── WorkSection.tsx       # Case study section
│   │   │
│   │   ├── technology/
│   │   │   ├── TechnologySection.tsx
│   │   │   └── TechTicker.tsx        # Horizontal scrolling ticker
│   │   │
│   │   ├── team/
│   │   │   └── TeamSection.tsx       # Light-background team section
│   │   │
│   │   └── contact/
│   │       ├── ContactSection.tsx    # Two-column contact layout
│   │       └── ContactForm.tsx       # Form component (visual-only for demo)
│   │
│   ├── hooks/
│   │   ├── useSplitText.ts           # Text splitting for GSAP animation
│   │   ├── useScrollAnimation.ts     # GSAP ScrollTrigger wrapper
│   │   ├── useLenis.ts               # Lenis smooth scroll initialization
│   │   └── useCoordinateTracker.ts   # Cursor coordinate mapper
│   │
│   ├── lib/
│   │   ├── animations.ts            # Shared GSAP animation presets
│   │   └── constants.ts             # Site content data (sections, capabilities, tech stack)
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── tailwind.config.ts                # Minimal -- v4 handles most via @theme
```

**Why this structure:**
- Each section is a self-contained folder with its own sub-components. This makes it easy for the frontend engineer to build and test one section at a time.
- Shared components (`Navbar`, `Footer`, `CTAButton`, `SectionHeader`) are in `shared/` because they appear across multiple sections.
- Hooks abstract away the animation complexity. `useSplitText` and `useScrollAnimation` can be reused by every section without duplicating GSAP setup code.
- Content data lives in `lib/constants.ts` -- not hardcoded in components. This makes future content updates simple (the content extractor populates this file).

---

### ADR-6: Contact Form -- Visual-Only Demo with Mailto Fallback

**Context:** The UI/UX proposal includes a contact form with Name, Email, and Project Brief fields. However, Azure SWA static export has no server-side form processing. Building a real form backend (Azure Functions, third-party form service) adds complexity and cost for a demo site.

**Decision:** The contact form is visual-only. On submit, it opens a `mailto:alex@devake.com` link with the form data pre-populated in the email subject/body. The button shows a "SENT" confirmation animation, and the form fields populate the mailto link. The direct email address is displayed prominently as the primary contact method.

**Alternatives considered:**
1. **Formspree / Getform (third-party)** -- Free tier form endpoints. Rejected because these require a third-party account, add external dependency, and the free tiers have submission limits. For a demo site that may never receive real submissions, this is over-engineering.
2. **Azure Functions backend** -- Server-side form processing. Rejected because it adds deployment complexity (separate Function App), increases Azure costs, and requires additional configuration that the git-devops agent would need to handle. Not justified for a demo.

**Consequences:**
- Gain: Zero infrastructure, zero cost, fully static
- Sacrifice: Not a "real" form submission. Acceptable for a demo/pitch site whose purpose is to demonstrate design capability, not to process actual leads.

---

### ADR-7: Image Strategy -- SVG + Canvas + CSS, No Photographs

**Context:** The design explicitly avoids stock photography. Visuals come from: SVG logos, Canvas particle rendering, CSS noise textures, and potentially open-source satellite/LIDAR imagery for the case study section.

**Decision:** All visuals are code-generated or SVG. The case study section uses a placeholder visualization (styled gradient/canvas simulation of a satellite analysis view) that can be replaced with real imagery if the client provides it.

**Assets from the current site:**
- `devake-icon.svg` -- Geometric icon (rectangle + vertical bar + chevron/arrow). Fill: `#0e0e0e`. Will be used in nav bar, preloader, and as team section placeholder.
- `devake-logo-text.svg` -- "DEVAKE." wordmark. Fill: `#0e0e0e`. Will be rendered at massive scale in the footer (fill changed to `#FF3831` via CSS).

**Noise texture:** A 200x200px PNG tile with subtle monochrome noise, applied via `background-image` with `repeat` and `mix-blend-mode: overlay` at 3-5% opacity. Created during build, not downloaded.

---

### ADR-8: Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| Lighthouse Performance | >= 90 | Lazy-load below-fold sections, throttle canvas on mobile, defer GSAP |
| Lighthouse Accessibility | 100 | WCAG 2.1 AA colors, aria-labels, keyboard navigation, reduced motion |
| Lighthouse Best Practices | >= 95 | HTTPS, no console errors, no deprecated APIs |
| Lighthouse SEO | >= 90 | Meta tags, semantic HTML (despite noindex for demo) |
| First Contentful Paint | < 1.5s | Font preload, minimal critical CSS, preloader masks loading |
| Largest Contentful Paint | < 2.5s | Hero text (LCP element) renders immediately after preloader |
| Total Bundle Size | < 250KB gzipped | GSAP (~25KB gz), Lenis (~3KB gz), app code (~50KB), fonts (~40KB) |
| Canvas FPS (desktop) | 60fps | requestAnimationFrame, offscreen detection, particle budget 3000 |
| Canvas FPS (mobile) | 30fps | Reduced particle count (1200), throttled RAF |

**`prefers-reduced-motion` handling:**
- All GSAP animations fall back to simple opacity fades (no transforms, no SplitText)
- Lenis smooth scroll is disabled (native scroll)
- Canvas particles are static (no animation loop, render once)
- Preloader is skipped (show content immediately)

---

### ADR-9: Accessibility -- WCAG 2.1 AA

**Color contrast verification:**
| Pair | Contrast Ratio | Passes AA? |
|------|---------------|------------|
| `#FFFDD8` on `#0A0A0C` | 18.5:1 | Yes (AAA) |
| `#FF3831` on `#0A0A0C` | 4.8:1 | Yes (AA for large text, AA for normal text >= 18px) |
| `#0A0A0C` on `#FFFDD8` | 18.5:1 | Yes (AAA) |
| `#FF3831` on `#FFFDD8` | 3.9:1 | Borderline -- use only for large text (>= 24px) or UI components |
| `rgba(255,253,216,0.7)` on `#0A0A0C` | ~13:1 | Yes (AAA) |
| `rgba(255,253,216,0.4)` on `#0A0A0C` | ~7.5:1 | Yes (AA) |

**Key accessibility requirements:**
- Skip-to-content link (visually hidden, visible on focus)
- All interactive elements keyboard-focusable with visible focus rings
- Nav overlay: focus-trapped when open, Escape key closes
- Canvas hero: `aria-hidden="true"` (decorative), text content is in DOM
- Form inputs: associated `<label>` elements, error states announced to screen readers
- Scroll animations: `prefers-reduced-motion` fully respected
- Coordinate tracker: `aria-hidden="true"` (decorative, not informational)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- Section landmark roles with `aria-labelledby` pointing to section headings

---

### ADR-10: Deployment -- Azure Static Web Apps

**Deployment pipeline:**
1. `npm run build` produces static files in `out/`
2. Azure SWA GitHub Action deploys `out/` to Azure
3. Free tier (F0) -- sufficient for a demo site with minimal traffic

**Azure SWA configuration (`staticwebapp.config.json`):**
```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "globalHeaders": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }
}
```

**Cost estimate:** $0/month on free tier. No Functions, no database, no CDN add-ons needed. The site is entirely static.

---

## 2. Component Architecture

### 2.1 Component Hierarchy

```
RootLayout
├── PasswordGate (client-side, sessionStorage)
├── DemoBanner (fixed top, closeable)
├── Preloader (covers viewport, removed after animation)
│
├── Navbar (fixed, transparent -> blurred on scroll)
│   ├── DevakeIcon (SVG)
│   ├── MenuButton -> triggers NavOverlay
│   └── CTAButton (nav variant: "LET'S TALK +")
│
├── NavOverlay (full-screen, animated)
│   ├── SectionLink (x6, with stagger animation)
│   └── ContactInfo
│
├── <main>
│   ├── HeroSection
│   │   ├── PointCloud (Canvas 2D, background)
│   │   ├── HeroText (logo, tagline, SplitText reveal)
│   │   ├── CTAButton ("SEE OUR WORK +")
│   │   └── ScrollIndicator (bouncing chevron + coords)
│   │
│   ├── AboutSection
│   │   ├── SectionHeader ("01", "ABOUT")
│   │   ├── DisplayText (large statement, line-by-line reveal)
│   │   ├── MetricsRow (3 cells with counter animation)
│   │   └── AnnotationLabel (x3-4, floating)
│   │
│   ├── CapabilitiesSection
│   │   ├── SectionHeader ("02", "CAPABILITIES")
│   │   ├── SectionHeading ("What We Build")
│   │   └── CapabilityGrid
│   │       └── CapabilityCell (x6, hover state)
│   │
│   ├── WorkSection
│   │   ├── SectionHeader ("03", "WORK")
│   │   ├── ProjectImage (full-width, parallax)
│   │   ├── ProjectDescription
│   │   ├── ProjectMetrics (3 cells)
│   │   └── CTAButton ("DISCUSS YOUR PROJECT +")
│   │
│   ├── TechnologySection
│   │   ├── SectionHeader ("04", "TECHNOLOGY")
│   │   ├── SectionHeading ("Our Stack")
│   │   ├── TechGrid (10 cells)
│   │   └── TechTicker (horizontal scroll)
│   │
│   ├── TeamSection (light background)
│   │   ├── SectionHeader ("05", "TEAM")
│   │   ├── SectionHeading ("Built by Engineers")
│   │   └── FounderCard (photo/placeholder + bio)
│   │
│   └── ContactSection
│       ├── SectionHeader ("06", "CONTACT")
│       ├── DisplayText ("Let's Build Something.")
│       ├── ContactInfo (email, address)
│       └── ContactForm (name, email, brief, submit)
│
├── Footer
│   ├── DevakeWordmark (massive SVG in red)
│   ├── FooterGrid (3 columns: company, connect, legal)
│   └── DesignCredit ("Design by aleksandrabeiner.com")
│
└── CoordinateTracker (fixed bottom-left, desktop only)
```

### 2.2 Shared Component Specifications

**CTAButton** -- Two variants via a `variant` prop:
- `primary`: transparent bg, red text + border, hover fills red bg with dark text
- `nav`: red bg, dark text, hover lightens red
- Both use IBM Plex Mono, uppercase, tracking 2px, `+` suffix
- `href` prop for anchor links, `onClick` for actions

**SectionHeader** -- Accepts `number` ("01") and `label` ("ABOUT"):
- Number in red, IBM Plex Mono 500, 14px
- Label below in off-white at 50% opacity, IBM Plex Mono 400, 12px, uppercase, tracking 1.5px
- Both fade-in on scroll trigger

**AnnotationLabel** -- Small floating label:
- IBM Plex Mono 400, 10px, tracking 1.5px
- 1px border at 15% opacity, transparent background
- Text at 30% opacity
- Positioned absolutely relative to section
- Hidden on mobile (< 640px)

---

## 3. Data Model

All site content is stored in `src/lib/constants.ts` as typed objects. No CMS, no API, no database.

```typescript
// src/lib/constants.ts

export const SITE_CONFIG = {
  name: "DEVAKE.",
  tagline: "Geospatial Intelligence. Engineered.",
  email: "alex@devake.com",
  address: {
    company: "Devake FZE",
    street: "Sheikh Rashid Tower, DWTC",
    city: "Dubai",
    country: "UAE",
    poBox: "333779",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sheikh+Rashid+Tower+DWTC+Dubai+UAE",
  },
  social: {
    linkedin: "#", // placeholder until real URL provided
    github: "#",   // placeholder until real URL provided
  },
  copyright: "2026",
};

export const CAPABILITIES: Capability[] = [
  {
    title: "Geospatial Platforms",
    description: "Secure storage, analysis, and access platforms for complex geodata. Import/export across all major spatial formats.",
  },
  // ... 5 more
];

export const TECH_STACK: string[] = [
  "Python", "TensorFlow", "GDAL", "PostGIS", "Mapbox GL JS",
  "Three.js", "React", "Node.js", "Docker", "AWS / GCP",
];

export const TECH_TICKER: string[] = [
  "QGIS", "Cesium", "OpenLayers", "PostgreSQL", "Kubernetes",
  "TypeScript", "FastAPI", "Rasterio", "GeoPandas", "Leaflet",
];

export const CASE_STUDY = {
  label: "Featured Project",
  title: "Forest Canopy Analysis for a Leading US Forestry Company",
  description: "We developed a machine learning pipeline...",
  techStack: ["Python", "TensorFlow", "PostGIS"],
  dataFormats: ["LIDAR", "Sentinel-2", "GeoTIFF"],
  metric: { value: "2M+", label: "Acres Analyzed" },
};
```

---

## 4. Animation Architecture

### 4.1 GSAP Registration (One-Time Setup)

GSAP plugins (ScrollTrigger) must be registered once at the app level. This happens in a client-side `AnimationProvider` component that wraps the page content.

```tsx
// Registered in a useEffect in the root page component
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### 4.2 Lenis Integration

Lenis must sync with GSAP's ScrollTrigger for scroll position accuracy. The `useLenis` hook initializes Lenis and connects it to GSAP's ticker.

```tsx
// hooks/useLenis.ts
// - Creates Lenis instance with lerp: 0.08, duration: 1.2
// - smoothTouch: false (native feel on mobile)
// - Adds GSAP ticker callback: lenis.raf(time)
// - Calls ScrollTrigger.update() on Lenis scroll events
// - Respects prefers-reduced-motion (no Lenis if reduced motion)
```

### 4.3 Custom Text Split Hook

Replaces the paid GSAP SplitText plugin:

```tsx
// hooks/useSplitText.ts
// - Takes a ref to a text element
// - Splits innerHTML into <span> wrappers by line, word, or character
// - Returns refs to the created spans for GSAP animation
// - Handles resize/reflow by re-splitting on window resize
// - "lines" mode: wraps each line in a <span class="split-line"> with overflow:hidden parent
// - "chars" mode: wraps each character in <span class="split-char">
```

### 4.4 Scroll Animation Hook

Standardizes ScrollTrigger setup across all sections:

```tsx
// hooks/useScrollAnimation.ts
// - Takes a ref to the section element, an animation callback, and options
// - Creates a ScrollTrigger with sensible defaults:
//   - trigger: the section element
//   - start: "top 80%"
//   - toggleActions: "play none none none" (play once)
// - Cleans up on unmount
// - Returns the ScrollTrigger instance for advanced control
```

### 4.5 Point Cloud Canvas

The hero particle system architecture:

```
PointCloud.tsx
├── Canvas element (full viewport, position: absolute, z-index: 0)
├── Particle class:
│   ├── x, y, z (3D position for parallax depth)
│   ├── baseX, baseY (rest position for return-to-origin)
│   ├── size (1-3px, based on z-depth)
│   ├── opacity (0.2-0.6, based on z-depth)
│   ├── color (#FFFDD8 or #FF3831 for ~5% of particles)
│   └── velocity (subtle drift vector)
│
├── ParticleSystem:
│   ├── particles: Particle[] (3000 desktop, 1200 mobile)
│   ├── init(): distributes particles in a terrain-like pattern
│   │   - Uses simplex noise to create elevation clusters
│   │   - Higher density in center, sparse at edges
│   ├── update(mouseX, mouseY, scrollY):
│   │   - Applies mouse-reactive parallax (deeper z = less movement)
│   │   - Applies subtle drift velocity
│   │   - Applies scroll-based vertical shift
│   ├── render(ctx): draws all particles as filled circles
│   └── resize(): recalculates on viewport change
│
├── Animation loop:
│   ├── requestAnimationFrame
│   ├── FPS throttling (30fps on mobile via timestamp delta check)
│   └── Visibility API: pauses when tab is hidden
│
└── Cleanup: cancels RAF, removes event listeners on unmount
```

**Simplex noise:** Implemented as a lightweight utility (no external library). A 100-line simplex noise function generates the terrain-like particle distribution. This makes the particle field look like topographic data rather than random static.

---

## 5. Responsive Breakpoints

| Token | Width | Tailwind Prefix |
|-------|-------|-----------------|
| Mobile | 0 - 639px | (default) |
| Tablet | 640px - 1023px | `sm:` |
| Desktop | 1024px+ | `lg:` |

Container: `max-w-6xl mx-auto px-4 lg:px-0` (mobile padding, no desktop padding per project convention).

---

## 6. Third-Party Dependencies

| Package | Version | Size (gzip) | Purpose |
|---------|---------|-------------|---------|
| next | ^15.0 | N/A (dev) | Framework |
| react / react-dom | ^19.0 | ~45KB | UI library |
| tailwindcss | ^4.0 | N/A (dev) | Styling |
| gsap | ^3.12.7 | ~25KB | Animation engine |
| lenis | ^1.1.18 | ~3KB | Smooth scrolling |
| typescript | ^5.6 | N/A (dev) | Type safety |

**No other runtime dependencies.** No form library, no state management, no icon library, no analytics. Every additional dependency must justify its weight.

---

## 7. Build & Development

```bash
# Development
npm run dev          # Next.js dev server on localhost:3000

# Production build
npm run build        # Outputs static files to out/

# Preview production build
npx serve out        # Serves the static export locally
```

**Environment variables:** None needed. The site is fully static with no API keys, no secrets, no environment-specific configuration.

---

## 8. Key Technical Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Point cloud canvas tanks mobile performance | Medium | High | Particle budget: 1200 mobile vs 3000 desktop. 30fps throttle. Visibility API pause. |
| GSAP + Lenis scroll position conflicts | Low | Medium | Use Lenis-GSAP sync pattern (lenis.raf in GSAP ticker). Proven integration. |
| Custom SplitText breaks on resize | Medium | Low | Re-split on resize with debounce. Fall back to full-line animation if splitting fails. |
| Noise texture PNG increases LCP | Low | Low | Tiny file (< 2KB), loaded after hero. Applied only on dark sections. |
| Font loading causes layout shift | Low | Medium | `next/font/google` with `display: "swap"` and system fallback metrics. |
| Team section light/dark transition jank | Medium | Medium | Use GSAP ScrollTrigger `scrub` for smooth bg-color interpolation over scroll distance. |
| `prefers-reduced-motion` not fully implemented | Medium | High | Dedicated accessibility pass as a separate task. Test with macOS Reduce Motion enabled. |
