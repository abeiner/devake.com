# Implementation Plan: DEVAKE.COM Rebuild

> 22 tasks | Single-page Awwwards-caliber geospatial software site
> Each task is self-contained and buildable/testable independently
> Ordered by dependency: foundation -> core sections -> interactions -> polish

---

## Phase 1: Foundation

[ ] 1. **Scaffold Next.js project with static export configuration**
   - Initialize Next.js 15 with App Router, TypeScript, Tailwind CSS v4
   - Configure `next.config.ts`: `output: "export"`, `images: { unoptimized: true }`, `trailingSlash: true`
   - Set up `globals.css` with Tailwind `@theme` block defining all design tokens:
     - Colors: `--color-bg-primary: #0A0A0C`, `--color-bg-secondary: #111113`, `--color-bg-light: #FFFDD8`, `--color-text-primary: #FFFDD8`, `--color-text-dark: #0A0A0C`, `--color-accent: #FF3831`, `--color-accent-hover: #FF5A54`, `--color-border: rgba(255,253,216,0.1)`, `--color-border-hover: rgba(255,253,216,0.3)`
     - Fonts: `--font-display` (Space Grotesk), `--font-mono` (IBM Plex Mono)
     - Spacing: 8px grid system (`--spacing-xs` through `--spacing-3xl`)
   - Load Space Grotesk (weights 400, 500, 600, 700) and IBM Plex Mono (weights 400, 500) via `next/font/google`
   - Apply font variables to `<html>` element
   - Add noise texture overlay as a CSS pseudo-element on dark sections (`mix-blend-mode: overlay`, 3-5% opacity)
   - Add `staticwebapp.config.json` with navigation fallback and security headers
   - Create `public/robots.txt` with `Disallow: /`
   - Copy SVG logos (`devake-icon.svg`, `devake-logo-text.svg`) to `public/`
   - Set root layout metadata: `<meta name="robots" content="noindex, nofollow">`, page title "DEVAKE. | Geospatial Intelligence. Engineered."
   - Verify: `npm run build` produces `out/` directory with no errors

[ ] 2. **Build demo infrastructure: PasswordGate and DemoBanner**
   - Build `src/components/shared/PasswordGate.tsx`:
     - Full-screen overlay with backdrop blur
     - Dark background (#0A0A0C), centered input for access code
     - Access code: "demo2026", checked against sessionStorage
     - Shows contact email (aleksandrabeiner@gmail.com) for access
     - Space Grotesk for heading, IBM Plex Mono for input and labels
     - Red accent on the submit button
   - Build `src/components/shared/DemoBanner.tsx`:
     - Thin fixed bar at the very top of the page (above navbar)
     - Text: "This is a demo version -- not affiliated with the original business"
     - Background: `#FF3831`, text: `#0A0A0C`
     - Close button (X), dismissal saved to sessionStorage
     - IBM Plex Mono, 12px
   - Integrate both into `src/app/layout.tsx`
   - Verify: page loads with password gate, entering "demo2026" reveals content with demo banner

[ ] 3. **Build data constants and TypeScript types**
   - Create `src/types/index.ts` with interfaces: `Capability`, `CaseStudy`, `SiteConfig`, `TechItem`
   - Create `src/lib/constants.ts` with all site content:
     - `SITE_CONFIG`: name, tagline, email, address (with Google Maps URL), social links, copyright year
     - `CAPABILITIES`: array of 6 capability objects (title + description)
     - `TECH_STACK`: array of 10 technology names for the grid
     - `TECH_TICKER`: array of 10+ additional technology names for the horizontal ticker
     - `CASE_STUDY`: featured project object (label, title, description, tech stack, data formats, metric)
     - `NAV_SECTIONS`: array of {number, label, href} for navigation links
     - `FOUNDER`: name, title, bio (2-3 sentences), social links
   - Verify: types compile with no errors, constants are importable

[ ] 4. **Build shared components: CTAButton, SectionHeader, AnnotationLabel**
   - Build `src/components/shared/CTAButton.tsx`:
     - Two variants via `variant` prop: `"primary"` (transparent bg, red text/border, hover fills red) and `"nav"` (red bg, dark text, hover lightens)
     - IBM Plex Mono 500, 14px, uppercase, tracking 2px
     - Accepts `href` (renders as `<a>`) or `onClick` (renders as `<button>`)
     - `+` suffix always appended to children text
     - Smooth transition on hover (300ms ease-out for primary, 200ms for nav)
   - Build `src/components/shared/SectionHeader.tsx`:
     - Props: `number` (string, e.g., "01") and `label` (string, e.g., "ABOUT")
     - Number: red (#FF3831), IBM Plex Mono 500, 14px
     - Label: off-white at 50% opacity, IBM Plex Mono 400, 12px, uppercase, tracking 1.5px
     - Stacked vertically with 4px gap
   - Build `src/components/shared/AnnotationLabel.tsx`:
     - Props: `text` (string), `className` (for positioning)
     - IBM Plex Mono 400, 10px, tracking 1.5px
     - 1px border at 15% opacity, text at 30% opacity
     - Hidden on mobile (< 640px) via `hidden sm:block`
   - Verify: all three components render correctly in isolation

[ ] 5. **Build Navbar with fixed positioning and scroll-aware background**
   - Build `src/components/shared/Navbar.tsx`:
     - Fixed position, full width, z-50
     - Three elements: Devake icon SVG (left, 32x32px, links to top), "MENU" text + hamburger (center), CTAButton nav variant "LET'S TALK" (right, links to #contact)
     - Background: transparent by default
     - On scroll past hero (>= 100vh): transition to `rgba(10,10,12,0.9)` with `backdrop-filter: blur(8px)`
     - Scroll detection via `useEffect` with scroll event listener (throttled)
     - On team section (light background): add class to invert text to dark -- detect via ScrollTrigger or IntersectionObserver on the team section
     - Mobile: hide "MENU" text (show only hamburger icon), shorten CTA to "TALK"
     - "MENU" click sets a state that the NavOverlay reads (via prop or context)
   - Account for DemoBanner height -- navbar sits below the banner when it is visible
   - Verify: navbar is visible, scrolls correctly, background transitions work

[ ] 6. **Build Footer with massive SVG wordmark and info grid**
   - Build `src/components/shared/Footer.tsx`:
     - Full-width section, dark background (#0A0A0C)
     - Massive "DEVAKE." SVG wordmark: load `devake-logo-text.svg`, render at container width, fill color overridden to `#FF3831` via CSS (`filter` or inline SVG with fill prop)
     - Three-column info grid below the wordmark:
       - Column 1: Company info (Devake FZE, Dubai, UAE, Sheikh Rashid Tower, DWTC)
       - Column 2: Connect (alex@devake.com mailto link, LinkedIn, GitHub)
       - Column 3: Legal (Privacy Policy placeholder, (C) 2026 Devake FZE)
     - Grid uses `border-white/10` borders between columns
     - Text: off-white at 50% opacity, links at 70% opacity, hover to red
     - IBM Plex Mono for all footer text, 12-14px
     - Divider line above design credit (`rgba(255,253,216,0.1)`)
     - Design credit: "Design by aleksandrabeiner.com" linking to https://aleksandrabeiner.com, text at 30% opacity
     - Mobile: columns stack vertically
     - Address links to Google Maps URL: `https://www.google.com/maps/search/?api=1&query=Sheikh+Rashid+Tower+DWTC+Dubai+UAE`
   - Verify: footer renders with wordmark in red, all links work, responsive stacking

[ ] 7. **Assemble page layout with all sections as placeholder blocks**
   - Build `src/app/page.tsx`:
     - Import and render all section components in order: Hero, About, Capabilities, Work, Technology, Team, Contact
     - For now, each section is a placeholder `<section>` with the section ID, a background color (alternating bg-primary / bg-secondary), min-height of 100vh, and the section name as text
     - The Team section uses the light background (#FFFDD8)
     - Wrap everything in `<main>`
   - Verify: page scrolls through 7 colored sections with correct IDs, navbar and footer are visible

---

## Phase 2: Animation Infrastructure

[ ] 8. **Install GSAP + Lenis and build animation hooks**
   - Install `gsap` and `lenis` as dependencies
   - Register GSAP ScrollTrigger plugin in a client-side setup (in page.tsx or a provider component)
   - Build `src/hooks/useLenis.ts`:
     - Initialize Lenis with `lerp: 0.08`, `duration: 1.2`, `smoothTouch: false`
     - Connect to GSAP ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
     - Disable GSAP's default `lagSmoothing`
     - Update ScrollTrigger on Lenis scroll events
     - Respect `prefers-reduced-motion`: if reduced, do not initialize Lenis (use native scroll)
     - Clean up on unmount
   - Build `src/hooks/useSplitText.ts`:
     - Takes a `RefObject<HTMLElement>` and a mode (`"lines"` | `"words"` | `"chars"`)
     - Splits text content into `<span>` wrappers with appropriate classes
     - For "lines" mode: wrap each line in a `<div style="overflow:hidden">` containing a `<span>` (the span slides up to reveal)
     - For "chars" mode: wrap each character in `<span class="split-char">`
     - Returns an array of refs to the created spans
     - Re-splits on window resize (debounced 200ms)
   - Build `src/hooks/useScrollAnimation.ts`:
     - Takes a `RefObject<HTMLElement>`, an animation factory function, and ScrollTrigger options
     - Creates ScrollTrigger with defaults: `start: "top 80%"`, `toggleActions: "play none none none"`
     - Calls the factory function to create the GSAP animation
     - Cleans up ScrollTrigger on unmount
     - If `prefers-reduced-motion`, create a simpler fade-in animation instead
   - Build `src/lib/animations.ts`:
     - Export shared animation presets as functions:
       - `fadeInUp(targets, options)` -- `y: 30, opacity: 0` to `y: 0, opacity: 1`
       - `staggerFadeIn(targets, stagger, options)` -- staggered fade-in
       - `counterAnimation(target, endValue, options)` -- animates number from 0 to endValue
   - Verify: Lenis smooth scroll works on the page, hooks compile without errors

---

## Phase 3: Hero & Preloader (The Hook)

[ ] 9. **Build the point cloud canvas (PointCloud component)**
   - Build `src/components/hero/PointCloud.tsx`:
     - Full-viewport `<canvas>` element, `position: absolute`, `z-index: 0`, `aria-hidden="true"`
     - Particle system with simplex noise distribution:
       - Desktop: 3000 particles, mobile (< 640px): 1200 particles
       - Particles have x, y, z (depth), baseX, baseY, size (1-3px), opacity (0.2-0.6)
       - ~5% of particles colored `#FF3831`, rest `#FFFDD8`
       - Simplex noise creates terrain-like clusters (higher density in center)
     - Mouse parallax: particles shift based on mouse position, deeper z = less movement
     - Subtle continuous drift velocity on all particles
     - requestAnimationFrame loop with FPS throttling:
       - Desktop: 60fps (no throttle)
       - Mobile: 30fps (timestamp delta check)
     - Visibility API: pause animation when tab is hidden
     - Resize handler: recalculate canvas dimensions and particle positions
     - `prefers-reduced-motion`: render particles once (static), no animation loop
     - Simplex noise: implement as a lightweight inline utility (~80 lines), no external library
   - Verify: canvas renders particle field, particles respond to mouse movement, no performance issues

[ ] 10. **Build the Hero section (text, CTA, scroll indicator)**
   - Build `src/components/hero/HeroSection.tsx`:
     - Full viewport height section (`min-h-screen`), ID: `hero`
     - Background: `#0A0A0C`
     - PointCloud component as background layer (z-0)
     - Content overlay (z-10, pointer-events on text only):
       - "DEVAKE." text logo: Space Grotesk 500, 120-160px desktop / 56-72px mobile, color `#FFFDD8`, tracking -3px
       - Tagline: "Geospatial Intelligence." + new line + "Engineered." -- Space Grotesk 500, 36-48px desktop / 24-28px mobile, color `#FFFDD8`
       - CTAButton primary variant: "SEE OUR WORK" (links to `#work`)
       - Content positioned in lower-left quadrant of viewport (not centered -- left-aligned with container padding)
     - Scroll indicator at bottom center:
       - Animated downward chevron (CSS or GSAP infinite yoyo)
       - Coordinates text: "25.2048N 55.2708E" in IBM Plex Mono, 10px, 30% opacity
     - Text animations (triggered after preloader completes, or on mount if preloader is skipped):
       - Logo text: character-by-character reveal using useSplitText, `y: 40, opacity: 0` -> `y: 0, opacity: 1`, stagger 0.05s
       - Tagline: fade-in with `y: 20`, 0.5s delay after logo
       - CTA: fade-in, 0.8s delay after tagline
       - Scroll indicator: infinite bounce `y: 0` -> `y: 8px`, ease sine.inOut, yoyo
   - Verify: hero section fills viewport, text is readable over particles, CTA scrolls to #work

[ ] 11. **Build the Preloader sequence**
   - Build `src/components/preloader/Preloader.tsx`:
     - Full-viewport overlay, `position: fixed`, z-[100], background `#0A0A0C`
     - Sequence (GSAP Timeline):
       1. (0s-1.5s) Devake geometric icon SVG draws in stroke-by-stroke (SVG stroke-dasharray/dashoffset animation)
       2. (1s-2.5s) Below icon: monospace coordinate counter rapidly cycles through lat/long pairs, then settles on `25.2048N, 55.2708E` (Dubai). IBM Plex Mono 400, 12px, off-white at 60% opacity
       3. (1.5s-3s) Horizontal progress line grows left-to-right below coordinates (height: 1px, color: off-white at 30%)
       4. (3s-3.5s) Icon scales up and fades, overlay dissolves to reveal hero
     - After completion: set `display: none` on the preloader element, trigger hero text animations
     - SessionStorage check: if preloader has already played this session, skip it entirely (show hero immediately)
     - `prefers-reduced-motion`: skip preloader, show content immediately
     - Coordinate counter: render 8-10 lat/long pairs cycling at ~100ms intervals using GSAP timeline
   - Wire up: preloader completion triggers hero text animations (via a callback or shared state)
   - Verify: preloader plays on first load, skips on refresh, hero animations trigger after preloader

---

## Phase 4: Content Sections (The Story)

[ ] 12. **Build the About section**
   - Build `src/components/about/AboutSection.tsx`:
     - Section ID: `about`, background: `#0A0A0C`
     - SectionHeader: number "01", label "ABOUT"
     - Primary statement: large display text (Space Grotesk 400, 48-64px desktop / 32-40px mobile, tracking -2px, color `#FFFDD8`):
       "We are a geospatial software studio that turns satellite imagery, LIDAR point clouds, and spatial data into intelligent platforms for companies that see the world through data."
     - Secondary context (body text, 18px, off-white at 70% opacity):
       "Based in Dubai. Serving clients globally. Engineering at the intersection of geography, machine learning, and visual computing."
     - MetricsRow component below
     - 3-4 AnnotationLabel components floating at section edges: "EPSG:4326", "WGS 84", "GeoJSON", "CRS:84"
   - Build `src/components/about/MetricsRow.tsx`:
     - 3 bordered cells in a row (1 column on mobile):
       - "3+" / "Years Active"
       - "10+" / "Projects Delivered"
       - "5+" / "Countries Served"
     - Border: `rgba(255,253,216,0.1)`
     - Numbers: Space Grotesk 600, 36px, `#FFFDD8`
     - Labels: IBM Plex Mono 400, 12px, off-white at 50% opacity
     - Counter animation: numbers animate from 0 to final value on scroll trigger (GSAP)
   - Scroll animations:
     - SectionHeader: fadeInUp on scroll
     - Primary statement: line-by-line reveal (useSplitText "lines" mode), stagger 0.15s
     - MetricsRow: counter animation triggered when row enters viewport
     - Annotations: staggered fade-in, delayed 0.5s after main content
   - Verify: section renders with correct typography hierarchy, animations trigger on scroll

[ ] 13. **Build the Capabilities section**
   - Build `src/components/capabilities/CapabilitiesSection.tsx`:
     - Section ID: `capabilities`, background: `#111113`
     - SectionHeader: number "02", label "CAPABILITIES"
     - Section heading: "What We Build" -- Space Grotesk 500, 64-80px desktop / 36-48px mobile
     - 3x2 grid of CapabilityCell components (1 column on mobile)
   - Build `src/components/capabilities/CapabilityCell.tsx`:
     - Props: `title` (string), `description` (string)
     - Default state: title only, centered vertically and horizontally
     - Title: IBM Plex Mono 500, 14-16px, uppercase, tracking 1.5px, `#FFFDD8`
     - Border: `rgba(255,253,216,0.1)`, padding 40px 32px
     - Hover state (desktop only):
       - Title shifts up, color transitions to `#FF3831`
       - 2-line description fades in below title
       - Border brightens to `rgba(255,253,216,0.3)`
       - All transitions: 300ms ease-out
     - Mobile: show title + description by default (no hover), 1-column layout
     - Min-height: ~160px per cell to maintain grid rhythm
   - Scroll animations:
     - Section heading: SplitText reveal
     - Grid cells: staggered appear (left-to-right, top-to-bottom), 0.1s interval, `y: 20, opacity: 0` -> `y: 0, opacity: 1`
   - Data source: `CAPABILITIES` array from `constants.ts`
   - Verify: 6 cells render in 3x2 grid, hover states work on desktop, mobile shows full content

[ ] 14. **Build the Work / Case Study section**
   - Build `src/components/work/WorkSection.tsx`:
     - Section ID: `work`, background: `#0A0A0C`
     - SectionHeader: number "03", label "WORK"
     - Full-width visual area:
       - Placeholder visualization: a CSS gradient + grid pattern simulating a satellite analysis view (deep blues, greens, dark overlay)
       - Or: a styled div with a radial gradient and overlaid coordinate grid lines, evoking LIDAR data
       - Gradient overlay from transparent at top to `#0A0A0C` at bottom for text readability
       - Parallax effect: visual moves at 70% of scroll speed (GSAP ScrollTrigger with `scrub: true`)
       - Aspect ratio: 16:9 on desktop, 4:3 on mobile
     - "Featured Project" label: IBM Plex Mono 400, 12px, off-white at 50%, uppercase
     - Project title: "Forest Canopy Analysis for a Leading US Forestry Company" -- Space Grotesk 500, 48-64px desktop / 32-36px mobile
     - Project description: 2-3 sentences from `CASE_STUDY.description`, body text 18px, off-white at 80%
     - Tech/metrics row: 3 bordered cells (same style as MetricsRow):
       - Cell 1: "Python / TensorFlow / PostGIS" (tech stack)
       - Cell 2: "LIDAR / Sentinel-2 / GeoTIFF" (data formats)
       - Cell 3: "2M+" / "Acres Analyzed" (metric with counter animation)
     - CTAButton primary: "DISCUSS YOUR PROJECT" (links to #contact)
   - Data source: `CASE_STUDY` from `constants.ts`
   - Scroll animations:
     - Visual: parallax scroll
     - Title: SplitText line reveal
     - Tech/metrics: staggered fade-in, counter on metric
     - CTA: fade-in, slight scale-up 0.95 -> 1.0
   - Verify: section renders with visual, text hierarchy, CTA links to contact

[ ] 15. **Build the Technology section**
   - Build `src/components/technology/TechnologySection.tsx`:
     - Section ID: `technology`, background: `#111113`
     - SectionHeader: number "04", label "TECHNOLOGY"
     - Section heading: "Our Stack" -- Space Grotesk 500, 64-80px desktop / 36-48px mobile
     - 5x2 grid of technology names (2 columns on mobile):
       - Each cell: IBM Plex Mono 400, 14-16px, off-white at 60%, centered
       - Border: `rgba(255,253,216,0.1)`
       - Hover: text transitions to `#FF3831`, full opacity, border brightens
       - Padding: 24px 16px per cell
     - TechTicker component below the grid
   - Build `src/components/technology/TechTicker.tsx`:
     - Horizontal scrolling ticker of additional technology names
     - IBM Plex Mono 400, 12px, off-white at 20% opacity
     - CSS animation: `translateX(0)` to `translateX(-50%)`, infinite loop, 30s duration, linear
     - Content duplicated (rendered twice) to create seamless loop
     - Separator between items: " / " or " -- "
   - Data sources: `TECH_STACK` and `TECH_TICKER` from `constants.ts`
   - Scroll animations: grid cells stagger-reveal (same pattern as capabilities)
   - Verify: 10 tech items in grid, ticker scrolls continuously, hover states work

[ ] 16. **Build the Team section (light background with scroll-triggered transition)**
   - Build `src/components/team/TeamSection.tsx`:
     - Section ID: `about-team`
     - Background: `#FFFDD8` (warm off-white -- the ONE light section)
     - All text colors inverted: `#0A0A0C` for headings, body text
     - SectionHeader: number "05" (still red), label "TEAM"
     - Section heading: "Built by Engineers" -- Space Grotesk 500, 64-80px desktop / 36-48px mobile, `#0A0A0C`
     - Founder card:
       - Two-column layout on desktop (photo/placeholder left, text right), stacked on mobile
       - Photo placeholder: Devake geometric icon SVG rendered at ~200px, with a subtle border, `#0A0A0C` fill
       - Name: from `FOUNDER.name` -- Space Grotesk 600, 24px
       - Title: from `FOUNDER.title` -- IBM Plex Mono 400, 14px, `#0A0A0C` at 60%
       - Bio: from `FOUNDER.bio` -- 18px body text, 2-3 sentences
       - Social links: LinkedIn, GitHub icons/text in `#FF3831`, underline animation on hover
     - Background color transition:
       - Use GSAP ScrollTrigger with `scrub` to animate background from `#0A0A0C` to `#FFFDD8` as section enters viewport
       - The transition happens on a wrapper div that starts with the dark bg and transitions to light
       - Alternatively: use a CSS `clip-path` reveal or a simple instant switch at section boundary
     - Scroll animations:
       - Photo/placeholder: scale 0.9 -> 1.0 with fade-in
       - Text: standard line-by-line reveal (in dark text on light bg)
   - Verify: section renders with light background, text is dark, transition from previous section looks smooth

[ ] 17. **Build the Contact section with form and email link**
   - Build `src/components/contact/ContactSection.tsx`:
     - Section ID: `contact`, background: `#0A0A0C` (back to dark after team)
     - SectionHeader: number "06", label "CONTACT"
     - Display heading: "Let's Build Something." -- Space Grotesk 500, 80-100px desktop / 48-56px mobile, `#FFFDD8`
     - Two-column layout on desktop (stacked on mobile):
       - Left column: contact info
         - Email: "alex@devake.com" as large mailto link, `#FF3831`, Space Grotesk 500, 28-36px
         - Company: "Devake FZE" -- body text
         - Address: "Sheikh Rashid Tower, DWTC, Dubai, UAE" with Google Maps link
         - Google Maps URL: `https://www.google.com/maps/search/?api=1&query=Sheikh+Rashid+Tower+DWTC+Dubai+UAE`
       - Right column: ContactForm component
   - Build `src/components/contact/ContactForm.tsx`:
     - 3 fields: Name, Email, Project Brief (textarea)
     - Underline-only input styling (no top/side borders):
       - Bottom border: `rgba(255,253,216,0.3)` default, `#FF3831` on focus
       - Text: `#FFFDD8`, Space Grotesk 400, 18px
       - Placeholder: IBM Plex Mono 400, 14px, `rgba(255,253,216,0.3)`
       - Padding: 16px 0
       - Font-size minimum 16px (prevents iOS zoom on focus)
     - Submit button: CTAButton style, "SEND MESSAGE", red bg, dark text
     - On submit: construct `mailto:alex@devake.com` with subject "Project Inquiry from [name]" and body containing the form data. Open in new tab. Show "SENT" confirmation text on button for 3 seconds, then reset.
     - Client-side only -- no backend, no API call
   - Scroll animations:
     - Heading: SplitText reveal
     - Left column: fade-in from left (`x: -20`)
     - Right column: fade-in from right (`x: 20`)
     - Form fields: staggered reveal
   - Verify: form renders, submit opens mailto, email link works, address links to Google Maps

---

## Phase 5: Navigation & Micro-Interactions

[ ] 18. **Build the full-screen NavOverlay**
   - Build `src/components/shared/NavOverlay.tsx`:
     - Full viewport overlay, `position: fixed`, z-[90] (below preloader, above content)
     - Background: `#0A0A0C` at 98% opacity (near-opaque)
     - Close button: "CLOSE" + X icon, top-right, IBM Plex Mono
     - Section links (6 items from `NAV_SECTIONS`):
       - Each link shows: section number (red, monospace) + section name (display font, 48-64px desktop / 36px mobile)
       - Left-aligned with container padding
       - Hover: text transitions to `#FF3831`, a subtle line extends from left edge
       - Click: close overlay, smooth-scroll to target section (Lenis `scrollTo`)
     - Bottom area: email (alex@devake.com), social links (LinkedIn / GitHub), "Dubai, UAE"
     - GSAP animations:
       - Open: overlay fades in 0.3s, links stagger from top 0.05s each (y: 20, opacity: 0 -> y: 0, opacity: 1)
       - Close: reverse (links exit in reverse order, overlay fades out)
     - Accessibility:
       - Focus trap: tab cycles through overlay links only when open
       - Escape key closes the overlay
       - `aria-modal="true"`, `role="dialog"`
       - Body scroll locked when overlay is open (Lenis `.stop()` / `.start()`)
   - Wire to Navbar: MENU button toggles overlay state
   - Verify: overlay opens/closes with animation, links scroll to sections, focus trap works, Escape closes

[ ] 19. **Build the cursor coordinate tracker**
   - Build `src/hooks/useCoordinateTracker.ts`:
     - Maps cursor position (clientX, clientY) to a lat/long range:
       - Latitude: 25.0 (bottom of viewport) to 47.7 (top of viewport) -- Dubai to northern US
       - Longitude: -122.5 (left edge) to 55.3 (right edge) -- Seattle to Dubai
     - Returns formatted coordinate string: `"XX.XXXX°N  XX.XXXX°E"`
     - Updates on mousemove (throttled to 60fps via RAF)
     - On scroll: latitude shifts slightly based on scrollY (adds depth to the effect)
     - Returns null on mobile / touch devices (no cursor)
     - Returns null if `prefers-reduced-motion` is enabled
   - Build a `CoordinateTracker` component:
     - Fixed position: bottom 16px, left 16px
     - IBM Plex Mono 400, 10px, `rgba(255,253,216,0.3)`
     - `aria-hidden="true"` (decorative)
     - Hidden on mobile (`hidden lg:block`)
   - Add to root layout or page.tsx
   - Verify: coordinates update smoothly on mouse movement, hidden on mobile

---

## Phase 6: Responsive & Accessibility Polish

[ ] 20. **Mobile responsive pass across all sections**
   - Verify and fix every section for mobile (< 640px) and tablet (640-1023px):
     - Hero: logo 56-72px, tagline 24-28px, CTA full-width, point cloud particle count reduced
     - About: display text 32-40px, metrics stack to 1 column, annotation labels hidden
     - Capabilities: grid to 1 column, cells show title + description (no hover)
     - Work: image full-width, text below, tech/metrics stack to 1 column
     - Technology: grid to 2 columns, ticker at reduced size
     - Team: photo above text, full-width
     - Contact: single column (info on top, form below), inputs full-width, submit full-width
     - Footer: columns stack vertically, wordmark scales to fit
     - NavOverlay: links at 36px, 48px touch targets
     - Navbar: hide "MENU" text, show only hamburger, shorten CTA text
   - Test container: `max-w-6xl mx-auto px-4 lg:px-0` applied correctly everywhere
   - Verify: all sections display correctly at 375px, 640px, 768px, 1024px, 1440px viewport widths

[ ] 21. **Accessibility pass: reduced motion, keyboard nav, ARIA**
   - `prefers-reduced-motion` check across all components:
     - Lenis: disabled (native scroll)
     - GSAP animations: replaced with simple opacity fades (no transforms)
     - Point cloud: render once (static), no animation loop
     - Preloader: skipped entirely
     - Scroll indicator: no bounce animation
     - Tech ticker: no animation (static display)
   - Add skip-to-content link: visually hidden, visible on keyboard focus, links to `<main>`
   - Verify all interactive elements are keyboard-focusable:
     - CTA buttons: visible focus ring (2px solid #FF3831, 2px offset)
     - Nav links: same focus ring style
     - Form inputs: red underline on focus (already specified)
     - Menu button: focus ring
     - NavOverlay links: focus ring
   - Add ARIA attributes:
     - Sections: `aria-labelledby` pointing to section heading IDs
     - Canvas: `aria-hidden="true"`
     - Coordinate tracker: `aria-hidden="true"`
     - Nav overlay: `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`
     - Form inputs: `<label>` elements with `htmlFor`
   - Semantic HTML verification: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` used correctly
   - Verify: navigate entire site with keyboard only, test with macOS VoiceOver, confirm reduced motion works

[ ] 22. **Performance optimization and final build verification**
   - Canvas performance:
     - Verify Visibility API pauses animation when tab is hidden
     - Confirm mobile particle count (1200) and FPS throttle (30fps) are working
     - Ensure canvas resizes correctly on orientation change
   - Image/asset optimization:
     - SVGs are inlined or loaded efficiently (no unnecessary re-renders)
     - Noise texture PNG is tiny (< 3KB)
     - No unused CSS in production build (Tailwind v4 tree-shaking)
   - GSAP cleanup:
     - All ScrollTrigger instances killed on component unmount
     - No memory leaks from animation references
   - Font loading:
     - Verify `next/font/google` eliminates layout shift
     - Confirm fonts load before preloader completes
   - Bundle analysis:
     - Run `npm run build` and verify total JS bundle < 250KB gzipped
     - No large unexpected dependencies
   - Lighthouse audit:
     - Performance: >= 90
     - Accessibility: 100
     - Best Practices: >= 95
     - SEO: >= 90 (accounting for noindex)
   - Cross-browser verification targets: Chrome, Firefox, Safari, Edge (latest versions)
   - Verify: `npm run build` succeeds, `out/` directory contains correct static files, site runs from static serve

---

## Task Dependency Graph

```
1 (scaffold) ─────┐
                   ├── 2 (demo infra)
                   ├── 3 (constants)
                   ├── 4 (shared components)
                   ├── 5 (navbar)
                   ├── 6 (footer)
                   └── 7 (page layout) ─── requires 2,3,4,5,6
                                │
                                8 (animation hooks) ─── requires 7
                                │
                    ┌───────────┼───────────┐
                    9 (canvas)  │           │
                    │           │           │
                    10 (hero) ──┘           │
                    │                       │
                    11 (preloader) ── requires 9,10
                    │
          ┌─────── 12 (about)
          │        13 (capabilities)
          │        14 (work)          ── all require 8
          │        15 (technology)
          │        16 (team)
          │        17 (contact)
          └────────┤
                   18 (nav overlay) ── requires 5,8
                   19 (coord tracker) ── requires 8
                   │
                   20 (responsive) ── requires 12-19
                   21 (accessibility) ── requires 12-19
                   22 (performance) ── requires all
```

---

## Notes for Frontend Engineer

1. **All content comes from `src/lib/constants.ts`.** Do not hardcode text in components. The content extractor will populate this file with verified content.

2. **The "use client" directive** is needed on every component that uses hooks, event handlers, or GSAP. In a static export, this is fine -- the components are still pre-rendered.

3. **GSAP SplitText is a paid plugin.** Use the custom `useSplitText` hook instead. It produces the same DOM structure (spans wrapping text) that GSAP can animate.

4. **The point cloud simplex noise** does not require an external library. A 2D simplex noise function is ~80 lines of code. Use it to create terrain-like particle clustering.

5. **The team section background transition** is the trickiest visual moment. Start with a simple instant color change at the section boundary. If the design-beautifier wants a smoother scroll-driven transition, upgrade to a ScrollTrigger-driven CSS variable animation.

6. **Test animations with `prefers-reduced-motion`** enabled (System Preferences > Accessibility > Display > Reduce Motion on macOS). Every animation must have a graceful fallback.

7. **The contact form mailto approach** means clicking "SEND MESSAGE" opens the user's email client. This is intentional for a demo site. The button state animation ("SENT" -> reset) is still valuable UX feedback even though the form does not post to a server.

8. **SVG logos** have `fill: #0e0e0e` by default. Override the fill via CSS (e.g., `fill: currentColor` with text color set, or `fill: #FF3831` for the footer wordmark). Inline the SVGs as React components for fill control, do not use `<img>` tags.

9. **Container pattern:** `max-w-6xl mx-auto px-4 lg:px-0` everywhere. Mobile gets 16px padding, desktop gets none. This is a project-wide convention.

10. **Noise texture:** Create a tiny (~200x200px) monochrome noise PNG. Apply it as a `::before` pseudo-element on dark sections with `position: absolute`, `inset: 0`, `background: repeat`, `mix-blend-mode: overlay`, `opacity: 0.03-0.05`, `pointer-events: none`.
