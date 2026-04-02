# Site Analysis: devake.com

## Overview
- **URL**: https://devake.com/
- **Analyzed on**: 2026-04-02
- **Total pages analyzed**: 1 (single-page site)
- **Page title**: DEVAKE - DEVAKE

## Site Purpose
Devake is a Dubai-registered software company (Devake FZE) offering geospatial software development services to clients worldwide. Their core offering combines web/mobile/desktop GIS development with machine learning and computer vision applied to satellite imagery and LIDAR point cloud data. The site functions as a minimal company brochure.

## Global Layout
The site is a **single-page layout** with three stacked zones:

1. **Header/Hero zone** — logo + company name + tagline + intro paragraph
2. **Services/Products zone** — ML pitch statement + 3 product/service cards
3. **Footer zone** — copyright + company info table + contacts table

There is **no navigation menu** — no nav bar, no hamburger, no in-page anchor links. The entire site is one scrollable page.

## Navigation Structure
None. The only link on the entire page is the logo linking back to `http://devake.com/` (the homepage). There are no sub-pages, no nav menu, no footer nav, no breadcrumbs.

Tested sub-page URLs — all return 404:
- `/about.html`
- `/contact.html`
- `/services.html`

## Sitemap
Only one page exists:
- `/` — Homepage (the entire site)

Individual page doc: [pages/homepage.md](pages/homepage.md)

## Page-by-Page Content

### Homepage `/`

#### Header / Hero Section
- **Logo**: Image (`devakelogo.png`) — text "DEVAKE", links to homepage. Single image asset.
- **Company name heading** (H2): "Devake"
- **Tagline**: "Providing geospatial software development services for companies around the world" (displayed as two lines, separated by a visual rule/separator)
- **Intro paragraph**: "During last few years we've gathered team of talented developers, capable of completing web/mobile/desktop solutions for geospatial analysis. We've already accomplished several projects for one of the biggest forestry companies in the US."

No hero image, no background image, no CTA button in this section.

#### Mission / Value Statement Section
- **Bold lead statement**: "We utilize machine learning and computer vision to make geospatial software great again."
- **Supporting sentence**: "One of our aims is the research and development of new ways to enrich geospatial data with information, gathered from satellite and LIDAR images, using deep learning and image analysis."

This section has no image or visual graphic.

#### Product / Service Cards Section
Three product cards stacked vertically (likely a grid/column layout on desktop):

**Card 1: Platform for storage and analysis of geospatial data**
- Description: "Learn to see the world in a new light by uncovering valuable insights from complex geodata. Our platform ensures secure storage and quick access to your geodata, easing the path to making informed decisions."
- Feature list (4 bullet points):
  - Seamless import and export of data in various geospatial formats
  - Advanced analysis tools for studying geodata and identifying important trends
  - Ability to integrate with other systems and platforms through APIs
  - Ensuring data security and confidentiality with modern protection mechanisms

**Card 2: Web application for visualization and annotation of geospatial data**
- Description: "Explore the world in real-time with our innovative web application for visualization and analysis of geospatial data. Turn geodata into layers on the map and make any changes using drawing tools. Our application allows you to easily add any content to the map and visualize multiple objects at once, as it uses file formats optimized for displaying maps in the browser."
- Feature list (4 bullet points):
  - Interactive visualization tools for creating dynamic and clear maps
  - Easy-to-use tools for adding and editing annotations on the map
  - The ability for collaborative work and sharing maps and annotations with colleagues or partners
  - Mobile device support for working with maps anywhere and at any time

**Card 3: Image analysis algorithms and point clouds**
- Description: "Meet our advanced image analysis and point cloud algorithms. From forests to cities, our algorithms will help you accurately classify and analyze geographical space. Discover new knowledge and skills by revealing hidden connections and trends in data about forest cover and other geographic features."
- Feature list (4 bullet points):
  - High-precision classification and analysis of geospatial objects, such as forest cover
  - Processing large volumes of data quickly and efficiently
  - The ability to be used in cloud and distributed computing environments
  - Support for various image formats and point clouds

No card images, no CTA buttons, no "learn more" links on any card.

#### Unknown/Empty Section (between cards and footer)
The snapshot contains a generic block with nested `<table>` that renders empty — likely a social media links widget or an embedded third-party component that has failed to load (possibly LinkedIn company widget or similar). No content visible to users.

#### Footer Section
Two-column layout rendered as an HTML table (Weebly default):

**Copyright bar**: "© 2022 Devake FZE"

**Column 1 — Information:**
- Company: Devake FZE
- Address: Dedicated Desk 56-A, 57-A, MAKTABI, 18th Floor, Sheikh Rashid Tower, DWTC, Dubai, UAE
- P.O Box: 333779

**Column 2 — Contacts:**
- "MEDIA INQUIRIES:"
- Email: alex@devake.com

**Second footer table**: Two cells, both empty — likely intended for social icons or additional links that failed to load. No visible content.

## Contact Information
- **Email**: alex@devake.com (listed under "MEDIA INQUIRIES")
- **Address**: Devake FZE, Dedicated Desk 56-A, 57-A, MAKTABI, 18th Floor, Sheikh Rashid Tower, DWTC, Dubai, UAE, P.O Box 333779
- **Phone**: None listed
- **Social media**: None visible (widget appears broken/empty)

## Open Graph / SEO Metadata
- `og:site_name`: DEVAKE
- `og:title`: Devake
- `og:description`: "We utilize machine learning and computer vision to make geospatial software great again"
- `og:image`: Logo image (PNG, hosted at devake.com/uploads/)
- `og:url`: http://devake.com/ (note: HTTP not HTTPS in OG tag)

## Tech Hints
- **Platform**: Weebly (editmysite.com) — confirmed by:
  - Analytics endpoint `ec.editmysite.com` (Snowplow analytics via Weebly)
  - File paths structured as `./DEVAKE - DEVAKE_files/` — classic Weebly asset folder naming
  - CDN references to `cdn1.editmysite.com` and `cdn2.editmysite.com`
  - AJAX call to `devake.com/ajax/api/JsonRPC/CustomerAccounts/` (Weebly's internal API)
  - CSS classes: `wsite-*` (Weebly's proprietary class prefix)
  - Script: `snowday262.js` (Weebly's analytics bundle name)
- **Analytics**: Google Analytics (`ga.js`) + Snowplow (Weebly default)
- **Fonts**: Weebly theme fonts — Verdana (body), Courier New (headings) — loaded from local Weebly CDN (404ing — broken)
- **Font file references (all 404)**: woff2, woff, ttf files from Weebly CDN
- **Custom theme**: `main_style.css` + `custom_style.css` via Weebly theme system
- **reCAPTCHA**: Loaded (likely for a form that may have been removed)
- **GDPR script**: `gdprscript.js` — 404, not loading
- **Favicon**: Missing (404)

## Observed Issues / Problems
1. **Favicon missing** — 404 error, no browser tab icon
2. **Font files all 404** — Weebly theme fonts not loading; browser falls back to system fonts
3. **GDPR script missing** — gdprscript.js returns 404; GDPR compliance tool broken
4. **API 403 error** — POST to CustomerAccounts API returns 403; possibly an abandoned ecommerce integration
5. **Footer social widget broken** — second footer table is empty; social media presence not established or widget failed
6. **OG image uses HTTP** — `og:image` and `og:url` reference `http://` not `https://`
7. **Copyright year outdated** — states "© 2022" (4 years old)
8. **No navigation at all** — single page with no menu makes the site very hard to navigate for any future content growth
9. **No CTAs** — No "contact us," "request a demo," "get a quote," or any call-to-action buttons anywhere
10. **No team/about section** — no information about who runs the company
11. **No portfolio/case studies** — mentions "biggest forestry companies in the US" but shows no proof of work
12. **No pricing or engagement model** — no indication of how to hire them
13. **Title tag redundant** — "DEVAKE - DEVAKE" repeats the brand name
14. **Page title casing inconsistency** — "DEVAKE" in title vs "Devake" in headings

## Rebuild Notes
Key decisions for the redesign:

1. **Structure**: Move from single-page to multi-page or well-sectioned long-scroll with in-page navigation anchor links. At minimum: Hero, Services, About/Team, Case Studies, Contact.
2. **CTA strategy**: Add prominent CTAs — "Request a Demo," "Contact Us," "View Our Work" — especially after each product card.
3. **Proof of work**: Add a case studies section or portfolio — even a brief mention of the forestry client work with screenshots or results.
4. **Team section**: Add founder/team bios to humanize the brand and build trust.
5. **Contact form**: Replace bare email address with a proper contact form.
6. **Social presence**: Add LinkedIn, GitHub, or other professional social links.
7. **Typography**: Replace Verdana + Courier New with modern font pairing appropriate for a tech/GIS company (e.g., Inter + JetBrains Mono or similar).
8. **Color scheme**: The existing palette uses `#0e4361` (dark navy blue) for body text and `#1b597c` (medium blue) for headings — deep blues appropriate for a geospatial/data company. Expand with lighter backgrounds and accent colors.
9. **Imagery**: No photography or imagery on the site. Add map visualizations, satellite imagery examples, LIDAR point cloud screenshots, or abstract data visualizations.
10. **Mobile**: Current Weebly layout likely breaks on mobile without the proper responsive CSS (fonts 404ing). Ensure full mobile responsiveness.
11. **Legal**: Update copyright to current year. Add proper privacy policy / GDPR statement.
12. **Platform**: Exit Weebly entirely — build on Next.js (static export) for full design control, performance, and maintainability.

## Critical Analysis Notes

*Added by UI/UX Design Critic, 2026-04-02*

### Verdict: Complete Ground-Up Rebuild Required

The current site is not salvageable. It is a single Weebly page from 2022 with broken fonts, zero navigation, zero CTAs, zero imagery, and zero proof of work. For a geospatial software company claiming to work with satellite imagery, LIDAR, and ML — the absence of ANY visual evidence is a credibility killer. The site communicates "abandoned side project," not "capable technology partner."

### What Survived the Cut
1. The geometric SVG icon logo — strong, modern, distinctive
2. The "DEVAKE." text logo with trailing period — good brand detail
3. Core service descriptions (rewritten but substantively preserved)
4. The white/black/red color instinct (refined to Griflan-aligned palette)

### Architecture Decision
Single-page scroll with 8 anchored sections + full-screen nav overlay. NOT multi-page — Devake lacks sufficient content (one known client, no blog, no team page content) to justify separate pages. The long narrative scroll matches all four Awwwards inspiration references and serves the storytelling goal.

### Key Design Moves
- Dark-first palette (#0A0A0C + #FFFDD8 + #FF3831) aligned to Griflan's proven Awwwards-caliber color system
- Interactive Three.js/Canvas point cloud hero — the product domain AS the visual identity
- Cursor coordinate tracker — signature geospatial micro-interaction
- Aeonik Pro + IBM Plex Mono typography — geometric display + authentic code monospace
- Griflan-style bordered capability grid replacing the three identical text-heavy product cards
- GSAP + Lenis animation suite for scroll-triggered reveals, SplitText, parallax
- One light section (team) breaking the dark rhythm — Good Fella's dark/light alternation pattern
- Massive red SVG wordmark in footer — Griflan's brand-close technique

### Risk Areas for Build Phase
1. Real case study visuals needed — if Devake cannot provide actual project screenshots, open-source satellite/LIDAR data must be used to create representative visuals
2. Founder information is minimal — only "alex@devake.com" exists; team section may need a placeholder approach
3. Point cloud hero performance on mobile — must degrade gracefully to simpler particle field
4. Font licensing for Aeonik Pro — fallback to Neue Montreal or Satoshi if cost is a blocker
