# Page: Homepage

- **URL**: https://devake.com/
- **Title**: DEVAKE - DEVAKE
- **Platform**: Weebly (editmysite.com)

## Page Purpose
The homepage is the entire website. It serves as a company brochure for Devake FZE — a Dubai-registered geospatial software development company. It introduces the company, describes three product/service offerings, and provides contact information. There are no sub-pages.

## Layout Structure

```
┌─────────────────────────────────────────┐
│  HEADER / HERO                          │
│  [Logo]  Devake                         │
│          ── separator ──                │
│          Tagline (2 lines)              │
│          ── separator ──                │
│          Intro paragraph                │
├─────────────────────────────────────────┤
│  MISSION STATEMENT BLOCK                │
│  Bold statement + supporting paragraph  │
├─────────────────────────────────────────┤
│  PRODUCT CARDS (3 cards)                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │Card 1   │ │Card 2   │ │Card 3   │  │
│  │Platform │ │Web App  │ │Algo/    │  │
│  │ + list  │ │ + list  │ │PointCld │  │
│  └─────────┘ └─────────┘ └─────────┘  │
├─────────────────────────────────────────┤
│  EMPTY/BROKEN WIDGET (social or embed) │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  © 2022 Devake FZE                      │
│  ┌─────────────────┬───────────────┐   │
│  │ Information     │ Contacts      │   │
│  │ [address]       │ [email]       │   │
│  └─────────────────┴───────────────┘   │
│  ┌─────────────────┬───────────────┐   │
│  │ [empty]         │ [empty]       │   │
│  └─────────────────┴───────────────┘   │
└─────────────────────────────────────────┘
```

## Key Content Sections

### 1. Header / Hero
- **Logo image**: Single PNG (`devakelogo.png`) — white text "DEVAKE" on likely dark background, links to homepage
- **H2 heading**: "Devake"
- **Visual separators**: Two horizontal rules/dividers above and below the tagline
- **Tagline**: "Providing geospatial software development services for companies around the world"
- **Intro paragraph**: "During last few years we've gathered team of talented developers, capable of completing web/mobile/desktop solutions for geospatial analysis. We've already accomplished several projects for one of the biggest forestry companies in the US."
- No hero background image. No hero CTA.

### 2. Mission / ML Statement
- **Bold statement**: "We utilize machine learning and computer vision to make geospatial software great again."
- **Supporting text**: "One of our aims is the research and development of new ways to enrich geospatial data with information, gathered from satellite and LIDAR images, using deep learning and image analysis."
- No image, no icon, no CTA.

### 3. Service/Product Card 1 — Platform
- **Card title**: "Platform for storage and analysis of geospatial data"
- **Card description**: "Learn to see the world in a new light by uncovering valuable insights from complex geodata. Our platform ensures secure storage and quick access to your geodata, easing the path to making informed decisions."
- **Feature list**:
  - Seamless import and export of data in various geospatial formats
  - Advanced analysis tools for studying geodata and identifying important trends
  - Ability to integrate with other systems and platforms through APIs
  - Ensuring data security and confidentiality with modern protection mechanisms
- No image. No CTA button. No link to product.

### 4. Service/Product Card 2 — Web Application
- **Card title**: "Web application for visualization and annotation of geospatial data"
- **Card description**: "Explore the world in real-time with our innovative web application for visualization and analysis of geospatial data. Turn geodata into layers on the map and make any changes using drawing tools. Our application allows you to easily add any content to the map and visualize multiple objects at once, as it uses file formats optimized for displaying maps in the browser."
- **Feature list**:
  - Interactive visualization tools for creating dynamic and clear maps
  - Easy-to-use tools for adding and editing annotations on the map
  - The ability for collaborative work and sharing maps and annotations with colleagues or partners
  - Mobile device support for working with maps anywhere and at any time
- No image. No CTA button. No demo link.

### 5. Service/Product Card 3 — Image Analysis & Point Clouds
- **Card title**: "Image analysis algorithms and point clouds"
- **Card description**: "Meet our advanced image analysis and point cloud algorithms. From forests to cities, our algorithms will help you accurately classify and analyze geographical space. Discover new knowledge and skills by revealing hidden connections and trends in data about forest cover and other geographic features."
- **Feature list**:
  - High-precision classification and analysis of geospatial objects, such as forest cover
  - Processing large volumes of data quickly and efficiently
  - The ability to be used in cloud and distributed computing environments
  - Support for various image formats and point clouds
- No image. No CTA button. No link.

### 6. Unknown Widget / Empty Section
- Located between the product cards and the footer
- Contains a deeply nested `<table>` structure that renders visually empty
- Likely a social media feed widget (e.g., LinkedIn company feed) or some Weebly embed that has stopped working
- No content rendered to users

### 7. Footer
- **Copyright**: "© 2022 Devake FZE" — outdated
- **Two-column footer table**:
  - Column "Information": Full company address — Devake FZE, Dedicated Desk 56-A, 57-A, MAKTABI, 18th Floor, Sheikh Rashid Tower, DWTC, Dubai, UAE, P.O Box 333779
  - Column "Contacts": Label "MEDIA INQUIRIES:" followed by email `alex@devake.com` (plain text, no mailto link in visible rendering)
- **Second footer table**: Two empty cells — likely broken social icons or links

## Interactive Elements
- **None** — no forms, no modals, no accordions, no carousels, no tabs, no dropdowns

## Call-to-Action Elements
- **None** — zero CTA buttons, zero "contact us" links, zero "request a demo" links
- The only clickable element is the logo (links to homepage — i.e., itself)
- Email address in footer is visible text but accessibility snapshot shows no mailto link

## Media Content
- **Logo image** (`devakelogo.png`): Company wordmark, used in header. The only image on the entire page.
- **No other images**: No product screenshots, no team photos, no background images, no icons, no illustrations

## Navigation Pattern
- **None** — no navigation bar, no hamburger menu, no breadcrumbs, no in-page anchor navigation, no sidebar
- The logo links to the root URL (same page)

## Notable UI Components
- **Product cards** (3): Title + description paragraph + unordered feature list. No icons, no images.
- **Footer info table**: HTML `<table>` element used for two-column footer layout — not semantic, Weebly default
- **Horizontal separators**: Two `<hr>`-style separators in the hero section between the heading and tagline
- **Empty widget**: Nested table structure — broken third-party embed

## Color / Style Hints (from CSS rules)
- **Body text color**: `#0e4361` (dark navy blue) — applied to paragraphs, labels
- **Heading color**: `#1b597c` (medium blue) — applied to H2 headings
- **Body font**: Verdana (Weebly theme setting, !important)
- **Heading font**: Courier New (Weebly theme setting, !important) — unusual for a tech company
- **Hero headline font**: Verdana, letter-spacing -3px, font-size 90px (desktop)
- **Hero paragraph font**: Verdana, letter-spacing 0, font-size 22px, line-height 34px (desktop)
- **H2 font-size** (desktop): 37px

## Issues Found on This Page
1. Favicon missing (404)
2. All Weebly theme fonts 404 (woff2, woff, ttf)
3. GDPR script 404
4. API call returns 403 (broken Weebly ecommerce integration)
5. OG tags use HTTP not HTTPS
6. Footer social widget is empty / broken
7. Copyright year is 2022 — 4 years outdated
8. No navigation, no CTAs, no contact form
9. Page title "DEVAKE - DEVAKE" is redundant
10. Email address in footer may not be clickable (no mailto link confirmed)
11. No viewport-appropriate images or visual content
12. The "biggest forestry companies in the US" claim has no supporting evidence
