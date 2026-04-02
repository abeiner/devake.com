# UI/UX Redesign Proposal: DEVAKE.COM

> Geospatial Software Studio | Dubai, UAE
> Prepared 2026-04-02 | Target: Awwwards SOTD-caliber execution

---

## 1. Executive Summary

The current devake.com is not a website. It is a placeholder -- a Weebly page from 2022 with broken fonts, zero navigation, zero calls to action, zero imagery, and zero proof of work. It actively damages the credibility of a company that claims to do cutting-edge geospatial AI work. A visitor lands on the page, sees Verdana text on a white background with no images, no portfolio, no team, no way to engage, and leaves in under 10 seconds. The site communicates the opposite of what Devake is: technically sophisticated, visually literate, and capable of handling complex spatial data problems.

The redesign is not an improvement. It is a ground-up reimagining. The new devake.com will be a dark-first, animation-heavy, typography-led single-page experience that uses the company's own technology domain -- LIDAR point clouds, satellite imagery, coordinate systems, geospatial data visualization -- as the visual language of the site itself. The site will not just describe what Devake does; it will demonstrate it through every scroll interaction, every hover state, every section transition.

**Core thesis:** A geospatial software company's website should make the visitor feel like they are inside the data. The site IS the portfolio.

### What Changes

| Dimension | Before | After |
|-----------|--------|-------|
| Structure | 1 page, no nav, no sections | Single-page scroll with 8 distinct sections + full-screen nav overlay |
| Visual identity | Verdana + Courier New, navy blue on white, zero imagery | Aeonik Pro + IBM Plex Mono, off-white on near-black, generative point cloud visuals |
| Interactions | Zero (only the logo links to itself) | GSAP scroll-triggered reveals, Lenis smooth scroll, coordinate tracker, particle hero, hover state system |
| CTAs | Zero | 4 strategic CTAs: hero, capabilities, case study, contact |
| Proof of work | A vague mention of "one of the biggest forestry companies" | Dedicated case study section with visual evidence and metrics |
| Contact | A plain-text email buried in a footer table | Full contact section with structured form, direct email link, and location map |
| Mobile | Broken (fonts 404, Weebly responsive CSS failing) | Mobile-first responsive with touch-optimized interactions |
| Brand impression | "This company might not exist anymore" | "This company is technically brilliant and visually obsessive" |

---

## 2. Critical Assessment of Current State

### 2.1 What Exists (And Why It Fails)

**The site is one page.** That page has no navigation, no images, no interactive elements, no calls to action, and no visual identity beyond broken Weebly theme defaults. Here is what is fundamentally wrong:

**No visual proof of technical capability.** Devake claims to work with satellite imagery, LIDAR point clouds, and machine learning for geospatial analysis. Yet the site contains zero screenshots, zero visualizations, zero examples of this work. For a company whose product IS visual data, this is a critical failure. Imagine a photography studio with no photos on their website -- that is what devake.com is.

**No trust signals whatsoever.** No team photos, no client logos, no case study details, no testimonials, no certifications, no industry affiliations. The mention of working with "one of the biggest forestry companies in the US" is unsupported by any evidence. Without specifics, it reads as fabricated.

**The typography actively hurts credibility.** Verdana for body text and Courier New for headings -- both system fonts from the 1990s -- signal "this was built by someone with no design awareness." For a software company competing for enterprise contracts, this is disqualifying. Worse: the Weebly theme font files all return 404 errors, so even the intended fonts do not load.

**Zero conversion pathway.** There is literally no way for a visitor to take action. No "Contact Us" button, no "Request a Demo" link, no form, no calendar booking. The email address (alex@devake.com) appears as plain text in the footer under "MEDIA INQUIRIES" -- which signals "don't contact us unless you're press." Every visitor who might have been a client bounces with no path forward.

**The information architecture is flat and undifferentiated.** Three product/service cards are stacked vertically with identical formatting (title + paragraph + bullet list). There is no hierarchy, no visual differentiation between offerings, no way to understand which service is primary or how they relate to each other. They read like a requirements document, not a value proposition.

**The footer is broken.** Copyright says 2022. A social media widget renders as empty table cells. The address is buried in an HTML table. The site feels abandoned.

### 2.2 What Is Worth Saving

Almost nothing from the current site transfers to the redesign. However, the following raw materials have value:

1. **The geometric logo icon.** The SVG icon (an abstract "K" shape composed of a rectangle, a vertical bar, and a chevron/arrow form) is actually quite good -- geometric, modern, distinctive. It will be the cornerstone of the new visual identity.

2. **The "DEVAKE." text logo.** Clean, uppercase, with a trailing period. The period is a strong brand detail -- it suggests precision, completeness, a full stop. This must be preserved.

3. **The service descriptions.** The three product/service descriptions, while poorly formatted and too verbose, contain accurate technical information about Devake's capabilities. They will be rewritten and restructured but the substance is sound.

4. **The color instinct.** The brand already uses near-black (#0E0E0E in the SVG) and the client has specified white + near-black + red. This aligns perfectly with the Griflan-inspired palette direction.

5. **The tagline kernel.** "Providing geospatial software development services for companies around the world" is boring, but the core idea -- global geospatial software -- is the right positioning. It needs to be rewritten with confidence and brevity.

### 2.3 What Was Removed and Why

| Removed Element | Reason |
|----------------|--------|
| Entire Weebly platform | No design control, broken fonts/scripts, cannot support animations or modern layout. Exit entirely. |
| "We utilize machine learning and computer vision to make geospatial software great again" | The "make X great again" phrasing is a political slogan reference that is distracting and unprofessional. The ML/CV capabilities will be repositioned without this language. |
| Verdana + Courier New typography | System fonts from the 1990s. Replaced with premium typefaces that signal technical sophistication. |
| Navy blue color palette (#0e4361, #1b597c) | Does not match brand direction (white/black/red). The blues were Weebly theme defaults, not brand decisions. |
| Three identical product cards format | Undifferentiated wall of text. Capabilities will be restructured into a visually distinct grid with hierarchy. |
| "MEDIA INQUIRIES" label on contact email | Discourages potential clients from reaching out. Contact will be repositioned as an invitation. |
| Broken social widget / empty footer tables | Non-functional HTML producing empty space. |
| Bullet-point feature lists on every card | Reads like a technical specification, not a website. Features will be communicated through visual design and concise prose. |
| The H2 "Devake" heading below the logo | Redundant -- the logo already says DEVAKE. Double-stating the name wastes prime viewport real estate. |

### 2.4 What Was Added and Why

| Added Element | Reason |
|--------------|--------|
| Preloader sequence with coordinate animation | Sets the tone immediately: "this is a company that lives in spatial data." Creates anticipation. Inspired by SRG's cinematic preloader. |
| Interactive point cloud / particle hero | The hero visual IS the portfolio -- a real-time 3D point cloud or particle field rendered on canvas. Demonstrates technical capability before a word is read. |
| Cursor coordinate tracker | Persistent UI element showing lat/long coordinates mapped to cursor position. Subtle, constant reminder of the geospatial domain. |
| Capabilities grid with hover states | Replaces the three identical cards with a Griflan-style bordered grid where each capability reveals depth on hover. Communicates breadth without overwhelming. |
| Case study section | The single most important addition. Devake mentions a US forestry client but shows nothing. Even a single, well-presented case study with before/after satellite imagery would transform credibility. |
| Technology stack section | A technical audience wants to know what tools and frameworks Devake uses. A clean grid of technology logos/names signals competence. |
| Full-screen navigation overlay | Replaces "no navigation" with an immersive, branded menu experience. |
| Contact section with form + map | Replaces a plain-text email with a proper conversion endpoint. The map reinforces the geospatial brand. |
| Scroll-triggered section reveals | Every section animates into view as the user scrolls. Creates the cinematic, storytelling flow seen in all four inspiration sites. |
| Monospace technical annotations | Small bordered labels (Sutera-style) with coordinate references, data formats, and algorithm names float around content sections. Adds texture and technical credibility. |
| Noise texture overlay | Subtle grain across dark sections adds analog warmth and depth, preventing the flat-black-screen look. Inspired by SRG. |
| Footer with massive SVG logo | The DEVAKE. wordmark rendered large in red dominates the footer -- a bold brand statement that closes the experience. Inspired by Griflan. |

---

## 3. Proposed Site Architecture

### 3.1 Structure: Single-Page Scroll with Anchored Sections

This is NOT a multi-page site. The Awwwards-level inspiration sites all use long, narrative single-page scrolls (6,900px to 12,800px). For a company with limited content (no blog, no extensive portfolio yet), a multi-page structure would create empty, thin pages. A single dense scroll with 8 sections, connected by a full-screen nav overlay, is the correct architecture.

```
devake.com/
│
├── [PRELOADER] .................. Coordinate counter + logo reveal (3-4 seconds)
│
├── #hero ........................ Full-viewport hero
│   ├── Interactive point cloud / particle canvas (background)
│   ├── "DEVAKE." text logo (oversized, animated reveal)
│   ├── Tagline: "Geospatial Intelligence. Engineered."
│   ├── CTA: "SEE OUR WORK +" (monospace, red border)
│   └── Scroll indicator (animated chevron or coordinate readout)
│
├── #about ....................... Company introduction
│   ├── Section number: "01" (monospace, red)
│   ├── Label: "ABOUT" (monospace, small)
│   ├── Statement: Large typography block (2-3 sentences max)
│   ├── Key metrics row: [Years Active] [Projects Delivered] [Countries Served]
│   └── Technical annotation labels floating at edges
│
├── #capabilities ................ Service offerings (replaces product cards)
│   ├── Section number: "02"
│   ├── Label: "CAPABILITIES"
│   ├── Section heading: "What We Build"
│   └── 3-column bordered grid (Griflan-style):
│       ├── Cell: "Geospatial Platforms" + icon + hover-reveal description
│       ├── Cell: "Data Visualization" + icon + hover-reveal description
│       ├── Cell: "ML & Computer Vision" + icon + hover-reveal description
│       ├── Cell: "LIDAR Processing" + icon + hover-reveal description
│       ├── Cell: "Satellite Imagery" + icon + hover-reveal description
│       └── Cell: "API Integration" + icon + hover-reveal description
│
├── #work ........................ Case study / proof of work
│   ├── Section number: "03"
│   ├── Label: "WORK"
│   ├── Featured project: US Forestry Company
│   │   ├── Full-width image/visualization (satellite or point cloud)
│   │   ├── Project description (2-3 sentences)
│   │   ├── Technical details (data formats, algorithms used)
│   │   ├── Metrics/results
│   │   └── CTA: "DISCUSS YOUR PROJECT +" (monospace, red)
│   └── Additional project thumbnails (if available; otherwise omit)
│
├── #technology .................. Tech stack display
│   ├── Section number: "04"
│   ├── Label: "TECHNOLOGY"
│   ├── Heading: "Our Stack"
│   └── Grid of technology names/logos:
│       Python, TensorFlow/PyTorch, GDAL, PostGIS, MapboxGL,
│       Three.js, React, Node.js, AWS/GCP, Docker
│       (each with subtle hover animation)
│
├── #about-team .................. Team / founder (light section)
│   ├── Section number: "05"
│   ├── Label: "TEAM"
│   ├── Heading: "Built by Engineers"
│   ├── Founder brief (name, background, 2-3 sentences)
│   └── Optional: team member cards if data is available
│
├── #contact ..................... Contact / conversion
│   ├── Section number: "06"
│   ├── Label: "CONTACT"
│   ├── Heading: "Start a Conversation" (large typography)
│   ├── Email: alex@devake.com (large, clickable mailto link)
│   ├── Contact form: Name, Email, Project Brief (textarea)
│   ├── CTA: "SEND MESSAGE +" (monospace, red background)
│   └── Office location with Google Maps link
│
├── #footer ...................... Brand close
│   ├── Massive "DEVAKE." SVG wordmark in red (Griflan-inspired)
│   ├── Generative canvas background (particles or grid)
│   ├── Three-column info grid:
│   │   ├── Column: Company info (Devake FZE, Dubai, UAE)
│   │   ├── Column: Connect (Email, LinkedIn, GitHub)
│   │   └── Column: Legal (Privacy, Copyright 2026)
│   ├── "Design by aleksandrabeiner.com" credit
│   └── Demo banner (required per project standards)
│
└── [NAV OVERLAY] ................ Full-screen menu (triggered from header)
    ├── Section links: About, Capabilities, Work, Technology, Team, Contact
    ├── Email: alex@devake.com
    ├── Social: LinkedIn, GitHub
    └── Close button
```

### 3.2 Why Single-Page, Not Multi-Page

1. **Content volume does not justify multiple pages.** Devake has one known client, no blog, no extensive team page, no pricing model. Creating separate pages for About, Services, and Contact would produce three thin pages that feel empty.

2. **The narrative scroll IS the experience.** All four inspiration sites use the long scroll as a storytelling device. Sections unfold like a pitch deck. This format rewards scroll-triggered animations, section color transitions, and cinematic pacing -- all mandatory for Awwwards consideration.

3. **Conversion is simpler.** A single scroll with one final contact section means every visitor is on a path toward the CTA. No navigation dead-ends, no "which page was the contact form on?"

4. **Future-proofable.** When Devake has more case studies, a blog, or team growth, individual pages can be broken out. The nav overlay is already designed to accommodate this. Start lean, expand when content justifies it.

---

## 4. Page Specifications (Section by Section)

### 4.1 Preloader

**Purpose:** Create anticipation, establish the geospatial identity from the first millisecond, and mask asset loading.

**Duration:** 3-4 seconds (non-skippable on first visit, session-cached to skip on return).

**Sequence:**
1. Black screen. The DEVAKE geometric icon (SVG) appears at center, drawn stroke-by-stroke (SVG path animation, 1.5 seconds).
2. Below the icon, a monospace coordinate counter rapidly cycles through latitude/longitude pairs: `47.6062N, 122.3321W` then `25.2048N, 55.2708E` (Dubai) then settling on a final coordinate.
3. A horizontal progress line grows from left to right below the coordinates (GSAP timeline, synced to actual asset loading).
4. At completion: the icon scales up and fades, the background splits or dissolves to reveal the hero section.

**Technical notes:**
- GSAP timeline with 4-5 sequenced tweens
- SVG stroke-dasharray/stroke-dashoffset animation for the icon draw
- Monospace font loaded inline (base64 or preloaded) to avoid FOUT during the preloader itself
- `sessionStorage` flag to skip on subsequent page loads within the same session

### 4.2 Hero Section (#hero)

**Purpose:** The hero must accomplish three things in under 3 seconds: (1) communicate what Devake does, (2) demonstrate technical sophistication through the visual, and (3) provide a clear next action.

**Layout (Desktop):**
```
┌─────────────────────────────────────────────────────────────┐
│ [Geo Icon]        MENU              LET'S TALK +            │  <- Fixed nav bar
│                                                             │
│                                                             │
│            ██████████████████████████████████                │
│            █ Interactive Point Cloud Canvas █                │  <- Full viewport
│            █ (Three.js / Canvas particles)  █                │     background
│            ██████████████████████████████████                │
│                                                             │
│                                                             │
│     DEVAKE.                                                 │  <- Oversized
│                                                             │     text logo
│     Geospatial Intelligence.                                │  <- Tagline
│     Engineered.                                             │     (2 lines)
│                                                             │
│     SEE OUR WORK +                                          │  <- CTA button
│                                                             │
│                                                             │
│         ↓ 25.2048°N  55.2708°E                              │  <- Scroll indicator
│                                                             │     with coordinates
└─────────────────────────────────────────────────────────────┘
```

**Above-the-fold content (priority order):**
1. **Point cloud / particle canvas** -- THE visual centerpiece. A canvas element covering the full viewport with an animated 3D point cloud rendered in off-white dots on near-black. Points should subtly react to mouse movement (parallax drift). This is not decorative -- it IS Devake's product domain made visible. If true 3D point cloud data is unavailable, a procedural particle field simulating terrain topography is the fallback.
2. **"DEVAKE." text logo** -- rendered at approximately 120-160px on desktop using the display typeface. Character-by-character GSAP SplitText reveal, staggered 50ms per character, easing out.
3. **Tagline** -- "Geospatial Intelligence. Engineered." in the display font at ~36-48px. Fades in 0.3s after the logo completes.
4. **CTA button** -- "SEE OUR WORK +" in monospace, bordered, red text on transparent background. Smooth-scrolls to #work section.
5. **Scroll indicator** -- Animated downward chevron paired with live coordinates (decorative, mapped to Dubai's lat/long). Signals that there is content below.

**Animations:**
- Point cloud particles: continuous subtle drift + mouse-reactive parallax (requestAnimationFrame loop)
- Logo text: GSAP SplitText with chars reveal, `y: 40, opacity: 0` to `y: 0, opacity: 1`, stagger 0.05s
- Tagline: fade-in with slight `y` shift, 0.5s delay after logo
- CTA: fade-in, 0.8s delay after tagline
- Scroll indicator: infinite subtle bounce animation (`y: 0` to `y: 8px`, ease: "sine.inOut", yoyo)

**Color:**
- Background: `#0A0A0C` (near-black with a hint of blue-black, slightly cooler than pure black to suggest depth)
- Text: `#FFFDD8` (warm off-white, Griflan palette -- NOT pure white, which is harsh on dark backgrounds)
- Accent: `#FF3831` (bold red, used on CTA text and hover states)
- Point cloud particles: `#FFFDD8` at 40-60% opacity, with occasional `#FF3831` particles for accent

### 4.3 About Section (#about)

**Purpose:** Establish Devake's identity in 15 seconds of reading. Who they are, what they believe, why they matter.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  01                                                         │  <- Section number
│  ABOUT                                                      │     (monospace, red)
│                                                             │
│  We are a geospatial software                               │
│  studio that turns satellite imagery,                       │  <- Large display
│  LIDAR point clouds, and spatial                            │     typography
│  data into intelligent platforms                            │     (~48-64px)
│  for companies that see the world                           │
│  through data.                                              │
│                                                             │
│  Based in Dubai. Serving clients globally.                  │  <- Smaller body text
│  Engineering at the intersection of                         │
│  geography, machine learning,                               │
│  and visual computing.                                      │
│                                                             │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │  3+          │  10+         │  5+          │            │  <- Metrics row
│  │  Years       │  Projects    │  Countries   │            │     (bordered cells)
│  │  Active      │  Delivered   │  Served      │            │
│  └──────────────┴──────────────┴──────────────┘            │
│                                                             │
│           [EPSG:4326]              [WGS 84]                 │  <- Floating
│                                    [GeoJSON]                │     annotation labels
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Content hierarchy:**
1. Section identifier (number + label) -- establishes the navigation system visually
2. Primary statement -- the single most important paragraph on the entire site. This replaces the current intro paragraph AND the mission statement, consolidating two weak blocks into one strong one.
3. Secondary context -- location and positioning in 2-3 short sentences
4. Metrics row -- quantified credibility (numbers must be accurate or omitted; do not fabricate)
5. Floating annotations -- small monospace labels with real geospatial terms (EPSG codes, coordinate reference systems, data formats) positioned at the edges of the section. These are decorative but domain-authentic.

**Animations:**
- Section number/label: fade-in on scroll trigger (when section enters viewport at 80%)
- Primary statement: GSAP SplitText line-by-line reveal, each line sliding up from `y: 30`, stagger 0.15s
- Metrics row: counter animation from 0 to final number, triggered when the row enters viewport
- Annotation labels: fade-in with slight drift from edges, staggered, delayed 0.5s after main content

**Color:**
- Background: `#0A0A0C` (same as hero -- dark continuity)
- Section number: `#FF3831` (red accent)
- Label text: `#FFFDD8` at 50% opacity
- Primary statement text: `#FFFDD8`
- Metrics borders: `rgba(255, 253, 216, 0.1)` (Griflan's `border-white/10` pattern)
- Annotation labels: `#FFFDD8` at 30% opacity, `font-size: 10px`, bordered

### 4.4 Capabilities Section (#capabilities)

**Purpose:** Replace the three identical text-heavy product cards with a scannable, interactive grid that communicates breadth and depth simultaneously.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  02                                                         │
│  CAPABILITIES                                               │
│                                                             │
│  What We Build                                              │  <- Section heading
│                                                             │     (~64-80px)
│  ┌───────────────────┬───────────────────┬─────────────────┐│
│  │                   │                   │                 ││
│  │  GEOSPATIAL       │  DATA             │  ML & COMPUTER ││  <- 3-col grid
│  │  PLATFORMS        │  VISUALIZATION    │  VISION        ││     with borders
│  │                   │                   │                 ││
│  │  [hover reveals   │  [hover reveals   │  [hover reveals││
│  │   2-line desc]    │   2-line desc]    │   2-line desc] ││
│  │                   │                   │                 ││
│  ├───────────────────┼───────────────────┼─────────────────┤│
│  │                   │                   │                 ││
│  │  LIDAR            │  SATELLITE        │  API           ││
│  │  PROCESSING       │  IMAGERY          │  INTEGRATION   ││
│  │                   │                   │                 ││
│  │  [hover reveals   │  [hover reveals   │  [hover reveals││
│  │   2-line desc]    │   2-line desc]    │   2-line desc] ││
│  │                   │                   │                 ││
│  └───────────────────┴───────────────────┴─────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why 6 cells instead of 3 cards:** The original site had 3 service cards, each with a paragraph and 4 bullet points. That is a wall of text that nobody reads. Breaking capabilities into 6 concise cells accomplishes three things:
1. It communicates MORE capabilities (the original cards buried LIDAR, satellite, and API work inside paragraph text)
2. Each cell is scannable in 1 second (title only; detail on hover)
3. The grid format itself communicates "breadth" visually -- 6 cells says "we do many things" faster than 3 paragraphs

**Capability cells content:**

| Cell | Title | Hover Description |
|------|-------|-------------------|
| 1 | Geospatial Platforms | Secure storage, analysis, and access platforms for complex geodata. Import/export across all major spatial formats. |
| 2 | Data Visualization | Interactive web applications for map-based visualization, annotation, and collaborative editing of geospatial layers. |
| 3 | ML & Computer Vision | Deep learning models for classification, object detection, and feature extraction from aerial and satellite imagery. |
| 4 | LIDAR Processing | Point cloud analysis, classification, and 3D reconstruction from airborne and terrestrial LIDAR scans. |
| 5 | Satellite Imagery | Multi-spectral and optical satellite image processing for land cover analysis, change detection, and environmental monitoring. |
| 6 | API Integration | RESTful APIs connecting geospatial platforms with enterprise systems, third-party data sources, and cloud infrastructure. |

**Interactions:**
- Default state: cell shows title only, in uppercase monospace, centered vertically and horizontally
- Hover state: title shifts up, 2-line description fades in below, cell border brightens from 10% to 30% opacity, text color transitions to red (`#FF3831`) over 300ms
- Mobile: no hover; cells show title + description by default in a 1-column stack (tap to expand on very small screens)

**Animations:**
- Grid cells appear one-by-one on scroll, staggered left-to-right, top-to-bottom (GSAP stagger with 0.1s interval)
- Each cell slides up from `y: 20, opacity: 0`
- Border lines draw in with a slight delay (CSS border-color transition)

**Color:**
- Background: `#111113` (slightly lighter than hero to create subtle section differentiation without breaking the dark theme)
- Cell borders: `rgba(255, 253, 216, 0.1)` default, `rgba(255, 253, 216, 0.3)` on hover
- Title text: `#FFFDD8`
- Hover title text: `#FF3831`
- Description text: `#FFFDD8` at 70% opacity

### 4.5 Work / Case Study Section (#work)

**Purpose:** This is the single most important section for credibility. A geospatial company without visual proof of work is asking visitors to take everything on faith. This section converts skeptics into believers.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  03                                                         │
│  WORK                                                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │         [Full-width visual: satellite imagery           ││  <- Parallax image
│  │          or LIDAR point cloud visualization             ││     or generated
│  │          of forest canopy analysis]                     ││     visual
│  │                                                         ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  Featured Project                                           │  <- Monospace label
│                                                             │
│  Forest Canopy Analysis                                     │  <- Project title
│  for a Leading US Forestry Company                          │     (~48-64px)
│                                                             │
│  We developed a machine learning pipeline                   │  <- Project
│  that processes satellite and LIDAR data                    │     description
│  to classify forest cover types, detect                     │     (body text)
│  changes in canopy density, and generate                    │
│  actionable reports for land management                     │
│  decisions across millions of acres.                        │
│                                                             │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │ Python       │ LIDAR        │ 2M+          │            │  <- Tech/metrics
│  │ TensorFlow   │ Sentinel-2   │ Acres        │            │     bordered cells
│  │ PostGIS      │ GeoTIFF      │ Analyzed     │            │
│  └──────────────┴──────────────┴──────────────┘            │
│                                                             │
│  DISCUSS YOUR PROJECT +                                     │  <- CTA
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Critical note on the visual:** If Devake can provide actual screenshots of their forest analysis work -- satellite imagery overlays, classified point clouds, heat maps -- this section becomes transformative. If real project visuals are unavailable, the content extractor / frontend engineer should create a representative visualization using:
- A stylized satellite imagery mosaic (there are open-source Sentinel-2 imagery datasets)
- A Three.js point cloud rendering of open-source LIDAR data (OpenTopography has free datasets)
- An abstract data visualization that suggests the kind of output Devake produces

The visual MUST feel real and domain-specific, not like a stock photo of "technology."

**Animations:**
- Full-width image: parallax scroll (moves at 70% of scroll speed, creating depth)
- Project title: SplitText line reveal on scroll trigger
- Tech/metrics cells: staggered fade-in, counter animation on acre number
- CTA: fade-in last, slight scale-up from 0.95 to 1.0

**Color:**
- Background: `#0A0A0C`
- Image overlay: subtle gradient from transparent to `#0A0A0C` at the bottom edge (ensures text readability)
- Project title: `#FFFDD8`
- Description: `#FFFDD8` at 80% opacity
- CTA: `#FF3831` text, `rgba(255, 56, 49, 0.2)` border, hover fills to solid `#FF3831` background with `#0A0A0C` text

### 4.6 Technology Section (#technology)

**Purpose:** Signal technical credibility to the engineering-minded visitors who will evaluate Devake's competence partly by the tools they use.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  04                                                         │
│  TECHNOLOGY                                                 │
│                                                             │
│  Our Stack                                                  │
│                                                             │
│  ┌────────┬────────┬────────┬────────┬────────┐            │
│  │Python  │Tensor- │GDAL    │PostGIS │Mapbox  │            │
│  │        │Flow    │        │        │GL JS   │            │
│  ├────────┼────────┼────────┼────────┼────────┤            │
│  │Three.js│React   │Node.js │Docker  │AWS /   │            │
│  │        │        │        │        │GCP     │            │
│  └────────┴────────┴────────┴────────┴────────┘            │
│                                                             │
│  [Additional technologies can be listed in a scrolling      │
│   horizontal ticker below the grid, monospace, low opacity] │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why this section exists:** The current site mentions no technologies. For a software company, this is a glaring omission. Enterprise clients and technical evaluators need to see that Devake uses industry-standard tools. This section is brief but essential.

**Design approach:**
- Technology names rendered in monospace font, no logos (logos add visual noise and licensing complexity; names-only is cleaner and more Awwwards-appropriate)
- Each cell has a thin border (`border-white/10`)
- Hover: text transitions to red, cell border brightens
- Below the grid: an optional horizontal scrolling ticker with additional technologies (QGIS, Cesium, OpenLayers, PostgreSQL, Kubernetes, etc.) in very low opacity monospace -- creates texture without demanding attention

**Animations:**
- Grid cells stagger-reveal on scroll (same pattern as capabilities)
- Ticker starts scrolling when section enters viewport (CSS animation, `translateX`, infinite loop)

**Color:**
- Background: `#111113` (light-dark alternation continues)
- Text: `#FFFDD8` at 60% opacity default, full opacity + red on hover
- Ticker text: `#FFFDD8` at 20% opacity

### 4.7 Team Section (#about-team)

**Purpose:** Humanize the brand. "We've gathered a team of talented developers" is a claim. A face and a name is proof.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │  <- LIGHT section
│  05                                                         │     (background
│  TEAM                                                       │      shifts to
│                                                             │      off-white)
│  Built by Engineers                                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │  [Founder photo        Alex [Surname]                │  │
│  │   or geometric         Founder & Lead Engineer       │  │
│  │   placeholder]                                       │  │
│  │                        A brief paragraph about       │  │
│  │                        background, expertise, and    │  │
│  │                        what drives the work at       │  │
│  │                        Devake.                       │  │
│  │                                                      │  │
│  │                        [LinkedIn] [GitHub]            │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why a light section here:** The dark-to-light-to-dark rhythm (inspired by Good Fella) creates visual breathing room. After four dark sections, the team section in warm off-white (`#FFFDD8` or `#F5F5F0`) with dark text provides contrast and signals a shift to the personal/human side of the company.

**Content notes:**
- If a founder photo is available, use it (cropped, high-contrast, possibly with a subtle halftone or dot-matrix treatment to maintain the technical aesthetic)
- If no photo is available, use the geometric DEVAKE icon as a placeholder with the founder's name and bio alongside it
- The bio should be 2-3 sentences maximum: background, expertise area, and a forward-looking statement
- LinkedIn and GitHub links are important for a software company founder -- they serve as secondary proof of credibility

**Animations:**
- Background color transition: ScrollTrigger-driven transition from `#0A0A0C` to `#FFFDD8` as section enters viewport (smooth, not abrupt)
- Photo/placeholder: scale from 0.9 to 1.0 with fade-in
- Text: standard line-by-line reveal

**Color (this section only):**
- Background: `#FFFDD8` (warm off-white from Griflan palette)
- Text: `#0A0A0C` (near-black, inverted from the rest of the site)
- Section number: `#FF3831` (red accent stays consistent)
- Links: `#FF3831` with underline animation on hover

### 4.8 Contact Section (#contact)

**Purpose:** Convert interested visitors into conversations. This is the end of the scroll narrative -- every section has been building toward this moment. The current site has zero conversion pathway. This section fixes that completely.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  06                                                         │
│  CONTACT                                                    │
│                                                             │
│  Let's Build                                                │  <- Large display
│  Something.                                                 │     type (~80-100px)
│                                                             │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │                          │                          │   │
│  │  alex@devake.com         │  Name                    │   │
│  │  (large, clickable)      │  ____________________    │   │
│  │                          │                          │   │
│  │  Devake FZE              │  Email                   │   │
│  │  Sheikh Rashid Tower     │  ____________________    │   │
│  │  DWTC, Dubai, UAE        │                          │   │
│  │  (Google Maps link)      │  Project Brief           │   │
│  │                          │  ____________________    │   │
│  │                          │  ____________________    │   │
│  │                          │  ____________________    │   │
│  │                          │                          │   │
│  │                          │  SEND MESSAGE +          │   │
│  │                          │                          │   │
│  └──────────────────────────┴──────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Two-column approach:**
- Left column: direct contact information (email as a large, prominent mailto link; office address with Google Maps link; optional phone if available)
- Right column: simple contact form (3 fields: name, email, project brief textarea)

**Form design:**
- Minimal, borderless input fields with only a bottom border line (underline style)
- Monospace placeholder text
- Focus state: underline color transitions from off-white/30% to red
- Submit button: monospace "SEND MESSAGE +", red background, off-white text
- On submit: button text changes to "SENT" with a checkmark, returns to default after 3 seconds
- Note: for the demo/pitch version, the form does not need a working backend -- a mailto: fallback or a simple animation is sufficient

**Animations:**
- Heading: SplitText reveal
- Left column: fade-in from left
- Right column: fade-in from right
- Form fields: staggered reveal, bottom-to-top
- Email address: subtle continuous pulse or glow effect to draw attention

**Color:**
- Background: `#0A0A0C` (back to dark after the light team section)
- Heading: `#FFFDD8`
- Email link: `#FF3831` (large, 28-36px, the most visually prominent element)
- Form inputs: `#FFFDD8` text, `rgba(255, 253, 216, 0.3)` underline, `#FF3831` focus underline
- Submit button: `#FF3831` background, `#0A0A0C` text

### 4.9 Footer

**Purpose:** Brand-close the experience with a bold visual statement and provide structured company information.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │              D E V A K E .                              ││  <- Massive SVG
│  │                                                         ││     wordmark in
│  │         (rendered at ~200-300px height in red,          ││     red, filling
│  │          filling the width of the container)            ││     container width
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  [Canvas: subtle particle grid / generative background]     │
│                                                             │
│  ┌──────────────────┬──────────────┬──────────────────┐    │
│  │ DEVAKE FZE       │ CONNECT      │ LEGAL            │    │
│  │ Dubai, UAE       │              │                  │    │
│  │ Sheikh Rashid    │ alex@        │ Privacy Policy   │    │
│  │ Tower, DWTC     │ devake.com   │ (C) 2026         │    │
│  │                  │ LinkedIn     │ Devake FZE       │    │
│  │                  │ GitHub       │                  │    │
│  └──────────────────┴──────────────┴──────────────────┘    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  Design by aleksandrabeiner.com                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**The massive wordmark:** Inspired directly by Griflan's footer treatment. The DEVAKE. text logo SVG is rendered at maximum width (constrained to the content container) in `#FF3831` red. This is a brand signature moment -- the last thing a visitor sees before the page ends.

**Generative canvas:** Behind the footer content, a subtle canvas element renders a particle grid or slow-moving dot matrix. This adds life to the footer without competing with the wordmark. The canvas should be low-opacity and use the same particle aesthetic as the hero, creating visual bookending.

**Animations:**
- Wordmark: scale from 0.8 to 1.0 as footer scrolls into view, with slight opacity animation
- Info columns: staggered fade-in
- Canvas: begins animation when footer enters viewport (performance optimization)

**Color:**
- Background: `#0A0A0C` transitioning to `#111113` or maintaining `#0A0A0C`
- Wordmark: `#FF3831`
- Footer text: `#FFFDD8` at 50% opacity
- Footer links: `#FFFDD8` at 70% opacity, `#FF3831` on hover
- Credit line: `#FFFDD8` at 30% opacity
- Divider line: `rgba(255, 253, 216, 0.1)`

---

## 5. Navigation Design

### 5.1 Fixed Top Bar

**Always visible, minimal chrome:**

```
┌─────────────────────────────────────────────────────────────┐
│  [Geo Icon]           MENU ☰           LET'S TALK +        │
└─────────────────────────────────────────────────────────────┘
```

- **Left:** Devake geometric icon SVG (not the full wordmark -- too wide for a nav bar). Approximately 32x32px. Links to top of page (smooth scroll).
- **Center:** "MENU" text in monospace with a minimal hamburger icon (three horizontal lines or a custom icon). Triggers the full-screen nav overlay.
- **Right:** "LET'S TALK +" CTA button in monospace, red background (`#FF3831`), near-black text. Links to #contact section.

**Behavior:**
- On scroll down past the hero: nav bar background transitions from transparent to `rgba(10, 10, 12, 0.9)` with backdrop-filter blur (8px). This ensures readability over any section.
- On scroll up: a slight slide-down animation reveals the nav if it was hidden (optional; keeping it always visible is also acceptable).
- On light sections (team): nav text inverts to dark, CTA stays red. This requires scroll-position-aware theming (GSAP ScrollTrigger can toggle a class).

**Mobile nav bar:**
- Same three elements, slightly smaller
- Icon: 28x28px
- "MENU" text hidden, only hamburger icon
- CTA text shortens to "TALK +" or icon only

### 5.2 Full-Screen Navigation Overlay

**Triggered by clicking MENU:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                    CLOSE X  │
│                                                             │
│                                                             │
│     01  About                                               │
│     02  Capabilities                                        │
│     03  Work                                                │
│     04  Technology                                          │
│     05  Team                                                │
│     06  Contact                                             │
│                                                             │
│                                                             │
│                                                             │
│     alex@devake.com                                         │
│     LinkedIn  /  GitHub                                     │
│                                                             │
│     Dubai, UAE                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Design:**
- Full viewport overlay, background `#0A0A0C` at 98% opacity (near-opaque but with the faintest transparency)
- Section links in display font at ~48-64px, left-aligned
- Section numbers in monospace, red, preceding each link
- Hover: link text transitions to red, a line extends from the left edge
- Contact info and social links at the bottom in monospace, smaller size
- Close button: "CLOSE" + X icon in top-right, monospace

**Animations:**
- Open: overlay slides in from the right (or fades in from 0 to full), 0.5s ease
- Links: staggered reveal from top to bottom, each delayed 0.05s
- Close: reverse animation, links exit in reverse order
- Each link click: overlay closes with the reverse animation, page smooth-scrolls to target section

**Mobile:**
- Same layout but links at ~36px
- Touch-friendly hit areas (minimum 48px height per link)
- Contact info stacks below links

### 5.3 Footer Navigation

No traditional footer nav. The footer contains company info, social links, and the credit line as described in section 4.9. This is intentional -- the full-screen overlay and the scroll-based section structure handle all navigation needs. A footer nav on a single-page site is redundant.

---

## 6. User Flow Diagrams

### 6.1 Primary Flow: New Visitor to Contact

```
LAND ON SITE
  |
  v
[Preloader: coordinate counter + icon animation, 3-4s]
  |
  v
[Hero: sees point cloud visual + "DEVAKE." + tagline]
  |
  ├── Option A: clicks "SEE OUR WORK +" CTA
  │   └── Smooth scroll to #work section
  │       └── Reads case study, clicks "DISCUSS YOUR PROJECT +"
  │           └── Smooth scroll to #contact
  │               └── Fills form or clicks email
  │                   └── CONVERSION
  │
  ├── Option B: scrolls naturally through sections
  │   └── #about -> #capabilities -> #work -> #technology -> #team -> #contact
  │       └── By #contact, has built understanding and trust
  │           └── Fills form or clicks email
  │               └── CONVERSION
  │
  └── Option C: clicks "LET'S TALK +" in nav bar (available at ANY point)
      └── Smooth scroll to #contact
          └── CONVERSION
```

### 6.2 Secondary Flow: Technical Evaluator

```
LAND ON SITE
  |
  v
[Preloader -> Hero]
  |
  v
[Opens MENU overlay -> clicks "Capabilities"]
  |
  v
[#capabilities: scans grid, hovers on relevant cells]
  |
  v
[Scrolls to #work: evaluates case study depth]
  |
  v
[Scrolls to #technology: verifies tech stack alignment]
  |
  v
[Scrolls to #team: checks founder credentials]
  |
  v
[Clicks LinkedIn link -> leaves to verify externally]
  |
  v
[Returns -> scrolls to #contact or emails directly]
```

### 6.3 Mobile Flow

```
LAND ON SITE (mobile)
  |
  v
[Preloader: same sequence, optimized timing]
  |
  v
[Hero: point cloud replaced with simpler particle field (performance)]
[Logo + tagline + CTA stacked vertically, full-width]
  |
  v
[Thumb-scrolls through sections]
[Capabilities grid: 1 column, titles + descriptions visible (no hover)]
[Case study: image above text, full-width]
  |
  v
[#contact: form is full-width, single-column]
  |
  v
[Taps email link -> opens mail app]
  OR
[Fills form -> taps "SEND MESSAGE +"]
```

---

## 7. Visual Design System

### 7.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0A0A0C` | Primary background (hero, about, work, contact) |
| `--color-bg-secondary` | `#111113` | Alternate dark sections (capabilities, technology) |
| `--color-bg-light` | `#FFFDD8` | Light section (team), footer wordmark |
| `--color-text-primary` | `#FFFDD8` | Headings, primary text on dark |
| `--color-text-secondary` | `rgba(255, 253, 216, 0.7)` | Body text, descriptions on dark |
| `--color-text-muted` | `rgba(255, 253, 216, 0.4)` | Labels, annotations, low-priority text |
| `--color-text-dark` | `#0A0A0C` | Text on light backgrounds |
| `--color-accent` | `#FF3831` | CTAs, hover states, section numbers, highlights |
| `--color-accent-hover` | `#FF5A54` | Lighter red for hover transitions |
| `--color-border` | `rgba(255, 253, 216, 0.1)` | Grid borders, dividers, separators |
| `--color-border-hover` | `rgba(255, 253, 216, 0.3)` | Border on hover/focus |

**Noise texture:** A subtle PNG noise overlay (similar to SRG's `noisemin.png`) applied via CSS `background-image` with `mix-blend-mode: overlay` and low opacity (3-5%). This adds analog grain to the dark sections, preventing the flat-screen-off look.

### 7.2 Typography

| Role | Font | Weight | Size (Desktop) | Size (Mobile) | Tracking | Line Height |
|------|------|--------|----------------|---------------|----------|-------------|
| Display (hero) | Aeonik Pro | 500 (Medium) | 120-160px | 56-72px | -3px | 0.9 |
| Section heading | Aeonik Pro | 500 | 64-80px | 36-48px | -2px | 1.0 |
| Body heading | Aeonik Pro | 400 (Regular) | 36-48px | 24-32px | -1px | 1.1 |
| Body text | Aeonik Pro | 400 | 18px | 16px | 0 | 1.6 |
| Mono display | IBM Plex Mono | 500 | 14-16px | 12-14px | 1px | 1.4 |
| Mono small | IBM Plex Mono | 400 | 10-12px | 10px | 1.5px | 1.3 |
| CTA text | IBM Plex Mono | 500 | 14px | 13px | 2px | 1.0 |

**Why Aeonik Pro + IBM Plex Mono:**
- Aeonik Pro is a modern geometric sans-serif with personality -- it sits between the clinical precision of Inter and the warmth of Neue Montreal. Its medium weight at large sizes creates the confident, slightly editorial feel seen in SRG and Good Fella. It is a premium TypeKit font commonly seen on award-winning sites.
- IBM Plex Mono provides the technical/developer credibility. It is open-source (no licensing cost), extremely legible at small sizes, and its IBM heritage signals "enterprise-grade." It was designed for code, making it authentic for a software company's UI labels and CTAs.
- If Aeonik Pro is not available or licensing is a concern, fallback to **Neue Montreal** (available on Pangram Pangram) or **Satoshi** (free on Fontshare). Both achieve a similar geometric sans-serif feel.

### 7.3 Spacing System

Based on an 8px grid with scaled increments:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px | Inline gaps, annotation padding |
| `--space-sm` | 16px | Component internal padding |
| `--space-md` | 24px | Between related elements |
| `--space-lg` | 40px | Between content blocks within a section |
| `--space-xl` | 64px | Section internal vertical padding (top/bottom) |
| `--space-2xl` | 100px | Between major sections (desktop) |
| `--space-3xl` | 160px | Hero section vertical padding |

**Container:** `max-w-6xl` (1152px) with `mx-auto`, `px-4` on mobile, `px-0` on desktop (per project convention -- mobile padding, no desktop padding).

### 7.4 Interactive Components

**CTA Button (Primary):**
```
┌─────────────────────────────┐
│  SEE OUR WORK +             │   IBM Plex Mono 500, 14px, tracking 2px
│                             │   Color: #FF3831 text, transparent bg
└─────────────────────────────┘   Border: 1px solid rgba(255,56,49,0.4)
                                  Padding: 16px 32px
                                  Hover: bg fills to #FF3831, text to #0A0A0C
                                  Transition: 300ms ease-out
```

**CTA Button (Nav):**
```
┌─────────────────────────────┐
│  LET'S TALK +               │   IBM Plex Mono 500, 13px, tracking 2px
│                             │   Color: #0A0A0C text, #FF3831 bg
└─────────────────────────────┘   Border: none
                                  Padding: 12px 24px
                                  Hover: bg lightens to #FF5A54
                                  Transition: 200ms ease-out
```

**Grid Cell (Capabilities / Technology):**
```
Default:    border-white/10, text centered, title only visible
Hover:      border-white/30, title shifts up, description fades in,
            title color -> #FF3831
Transition: 300ms ease-out on all properties
Padding:    40px 32px
```

**Annotation Label:**
```
┌──────────────┐
│  EPSG:4326   │   IBM Plex Mono 400, 10px, tracking 1.5px
└──────────────┘   Border: 1px solid rgba(255,253,216,0.15)
                   Padding: 4px 8px
                   Color: rgba(255,253,216,0.3)
                   Background: transparent
                   Position: absolute, floated at section edges
```

**Form Input:**
```
___________________________    No top/side borders. Bottom border only.
                               Color: rgba(255,253,216,0.3) default
                               Focus: border-color #FF3831
                               Text: #FFFDD8, Aeonik Pro 400, 18px
                               Placeholder: IBM Plex Mono 400, 14px,
                                            rgba(255,253,216,0.3)
                               Padding: 16px 0
                               Transition: border-color 200ms
```

### 7.5 Animation Specifications

| Animation | Library | Trigger | Duration | Easing |
|-----------|---------|---------|----------|--------|
| Smooth scroll | Lenis | Always active | N/A (lerp: 0.08, duration: 1.2) | N/A |
| Preloader sequence | GSAP Timeline | Page load | 3-4s total | power2.inOut |
| Hero text reveal | GSAP SplitText | After preloader | 1.2s (stagger 0.05/char) | power3.out |
| Section heading reveal | GSAP SplitText + ScrollTrigger | Section enters at 80% viewport | 0.8s (stagger 0.1/line) | power2.out |
| Grid cell stagger | GSAP + ScrollTrigger | Section enters at 70% viewport | 0.5s per cell (stagger 0.1s) | power2.out |
| Parallax image | GSAP ScrollTrigger | Continuous on scroll | Matched to scroll | none (linear) |
| Counter animation | GSAP | Element enters viewport | 2s | power1.out |
| Background color transition | GSAP ScrollTrigger | Team section scroll position | 0.5s | power1.inOut |
| Nav overlay open | GSAP Timeline | Menu click | 0.5s overlay + 0.3s links stagger | power2.inOut |
| Hover color transition | CSS transition | Hover | 300ms | ease-out |
| Point cloud particles | requestAnimationFrame | Always (hero) | Continuous | N/A |
| Scroll indicator bounce | GSAP | Always (hero) | 1.5s, yoyo, repeat -1 | sine.inOut |

**Performance rules:**
- `will-change: transform` on all animated elements
- Lenis: `smoothTouch: false` (disable on touch devices for native feel)
- Point cloud: throttle to 30fps on mobile, reduce particle count by 60%
- ScrollTrigger: use `scrub: true` for scroll-linked animations, avoid `scrub: 0` (too tight)
- All animations respect `prefers-reduced-motion: reduce` -- fall back to simple fade-ins with no transforms

---

## 8. Mobile-First Considerations

### 8.1 Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | 0-639px | Single column, stacked layout, simplified hero |
| Tablet | 640-1023px | 2-column grids, medium typography |
| Desktop | 1024px+ | Full layout as designed, 3-column grids, max typography |

### 8.2 Section-by-Section Mobile Adaptations

**Preloader:** Same sequence, but reduce coordinate counter to fewer cycles. Icon animation unchanged.

**Hero:** Point cloud particle count reduced by 60% (performance). Mouse parallax disabled (no mouse). Logo text size drops to 56-72px. Tagline to 24-28px. CTA full-width. Scroll indicator centered below CTA.

**About:** Display text drops to 32-40px. Metrics row becomes a single-column stack (3 rows of 1). Annotation labels hidden on mobile (they are decorative and would clutter small screens).

**Capabilities:** Grid collapses to 1 column (6 stacked cells). Each cell shows title AND 2-line description by default (no hover on touch). Cell padding reduced. Scroll-stagger preserved but simplified.

**Work:** Full-width image scales naturally. Text stacks below. Tech/metrics row becomes 1-column. CTA full-width.

**Technology:** Grid collapses to 2 columns (5 rows). Horizontal ticker preserved but at reduced size.

**Team:** Photo (if present) stacks above text. Full-width. Bio text shortened if needed.

**Contact:** Two-column layout becomes single column: contact info on top, form below. Email address remains prominently styled. Form inputs full-width. Submit button full-width.

**Footer:** Wordmark scales to fit container width. Info columns stack vertically. Canvas background simplified or removed for performance.

**Nav overlay:** Same design, links at 36px instead of 48-64px. Touch targets minimum 48px height.

### 8.3 Touch-Specific Behaviors

- Lenis smooth scroll disabled on touch (`smoothTouch: false`)
- Hover states replaced with visible-by-default states
- Tap targets minimum 48x48px
- No cursor coordinate tracker (no cursor on mobile)
- Form inputs: `font-size: 16px` minimum (prevents iOS zoom on focus)

---

## 9. Cursor Coordinate Tracker (Signature Interaction)

**This is the site's unique interactive signature** -- the equivalent of Good Fella's ASCII art or Griflan's generative canvas.

**What it is:** A small, persistent UI element in the bottom-left corner of the viewport that displays latitude/longitude coordinates mapped to the cursor's position on the page.

**How it works:**
1. The page is mapped to a rectangular geographic region (e.g., a bounding box from Dubai to the US -- the company's two known locations)
2. As the cursor moves, the coordinates update in real-time: `25.2048°N  55.2708°E`
3. The coordinates are displayed in IBM Plex Mono at 10px, `rgba(255, 253, 216, 0.3)`, positioned fixed at the bottom-left with 16px offset
4. On scroll, the latitude shifts slightly (simulating "moving" through the map)

**Why it works:**
- It is domain-authentic (a geospatial company showing coordinates)
- It is subtle enough not to distract but noticeable enough to delight
- It creates a continuous, low-level reminder that everything on this site is about spatial data
- It is technically simple (a mousemove event handler mapping `clientX/clientY` to a coordinate range) but feels sophisticated

**Mobile:** Hidden. No cursor, no tracker.

---

## 10. Priority Roadmap

### Phase 1: Foundation (Build First)
1. Next.js project setup with static export configuration
2. Global layout: CSS custom properties (colors, typography, spacing), font loading (Aeonik Pro + IBM Plex Mono), noise texture overlay
3. Lenis smooth scroll initialization
4. Fixed nav bar (logo, menu trigger, CTA)
5. Demo infrastructure: DemoBanner, PasswordGate, robots.txt, noindex meta
6. Footer with SVG wordmark, info grid, design credit

### Phase 2: Hero & Preloader (The Hook)
7. Preloader sequence (GSAP timeline, coordinate counter, icon SVG animation)
8. Hero section: particle canvas (Three.js or 2D Canvas), text layout, SplitText animation, CTA, scroll indicator
9. Cursor coordinate tracker

### Phase 3: Content Sections (The Story)
10. About section: display typography, metrics row, annotation labels, scroll-triggered reveals
11. Capabilities grid: 6 cells, hover states, stagger animation
12. Work/case study section: visual (real or generated), parallax, project description, tech/metrics, CTA
13. Technology section: grid, horizontal ticker

### Phase 4: Conversion & Polish (The Close)
14. Team section: light background transition, founder card
15. Contact section: form design, email link, two-column layout
16. Full-screen nav overlay with staggered link reveals
17. Mobile responsive pass across all sections
18. `prefers-reduced-motion` accessibility pass
19. Performance optimization (lazy loading, canvas throttling, image optimization)

### Phase 5: Content & QA
20. Real content integration (case study imagery, founder bio, tech stack verification)
21. Cross-browser testing (Chrome, Firefox, Safari, Edge)
22. Mobile device testing (iOS Safari, Android Chrome)
23. Lighthouse audit (target: 90+ performance, 100 accessibility)
24. Final animation timing polish

---

## 11. What Makes This Awwwards-Worthy

Award-winning sites share a common trait: **the design IS the message.** They do not separate "what the company does" from "how the site looks." The medium is the message.

For devake.com, this means:

1. **The hero point cloud is not decoration -- it is the product.** A geospatial company showing a live 3D point cloud on their homepage is not showing "a cool background." They are demonstrating core competency.

2. **The coordinate tracker is not a gimmick -- it is a worldview.** A company that sees everything through spatial coordinates should have a site where the cursor itself has geographic meaning.

3. **The monospace typography is not a trend -- it is authenticity.** This company writes code. Their CTAs should look like code. Their labels should look like data annotations. The typography system says "we are developers" without ever spelling it out.

4. **The dark palette is not an aesthetic choice -- it is a canvas.** Satellite imagery, LIDAR scans, data visualizations -- all of Devake's visual content looks best on dark backgrounds. The palette serves the content, not the other way around.

5. **The Griflan-inspired grid is not borrowed -- it is repurposed.** Where Griflan shows client names, Devake shows capabilities. Same grid, different content, same impact: communicating breadth at a glance.

6. **The single-page scroll is not laziness -- it is narrative control.** Devake has one story to tell right now: "we are technically brilliant, visually literate, and ready to work with you." That story has a beginning (hero), a middle (capabilities + proof), and an end (contact). A multi-page site would fragment this narrative.

The site should feel like opening a terminal that leads to a cockpit. Every detail -- the noise texture, the annotation labels, the coordinate tracker, the monospace CTAs -- reinforces a single identity: **spatial intelligence, engineered with obsessive care.**
