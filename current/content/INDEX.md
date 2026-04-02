# Content Extraction Index - devake.com

**Extraction Date:** 2026-04-02  
**Site Type:** Single-page Weebly site  
**Total Pages:** 1  
**Extraction Status:** Complete

---

## Extracted Content Files

### 1. Homepage
- **File:** `/current/content/homepage.md`
- **Source URL:** https://devake.com/
- **Content Completeness:** Full
- **Sections Extracted:**
  - Hero section (logo, heading, tagline, intro)
  - Mission/value statement
  - Three service/capability cards (full descriptions + feature lists)
  - Footer (copyright, company info, contact email)
- **Image Count:** 1 PNG logo referenced (not downloaded), 2 SVG assets available
- **Text Content:** Complete — all headings, paragraphs, feature lists, contact details
- **Issues:** None — all visible text content successfully extracted

---

## Image Assets

### Downloaded Images
Location: `/current/images/`

1. **devake-icon.svg** — Geometric icon mark (abstract K-shape)
   - Status: Downloaded
   - Used in: Brand identity
   - Alt text: Devake geometric icon

2. **devake-logo-text.svg** — Text wordmark "DEVAKE."
   - Status: Downloaded
   - Used in: Brand identity
   - Alt text: Devake text logo

3. **homepage-top.png** — Screenshot reference of homepage
   - Status: Downloaded
   - Used in: Page reference/documentation
   - Alt text: Homepage top section

### Referenced But Not Downloaded
1. **devakelogo.png** — Company logo PNG (header)
   - Original URL: https://devake.com/uploads/5/7/8/2/57827029/devakelogo.png
   - Status: Not downloaded (direct access restricted)
   - Context: Main logo in header section
   - Note: This image exists on the server but could not be directly downloaded via Playwright

### Image Manifest
- **File:** `/current/images/manifest.json`
- **Contents:** JSON mapping of all image assets with URLs, local paths, status, dimensions, and alt text

---

## Global Content

### Global Assets (Shared Across Site)
- **Favicon:** Missing (404) — not extracted
- **Navigation:** None (single-page site with no menu)
- **Footer:** Extracted (included in homepage.md)
- **Social Links:** None present (broken widget on homepage)

### Contact Information
- **Email:** alex@devake.com
- **Address:** Devake FZE, Dedicated Desk 56-A, 57-A, MAKTABI, 18th Floor, Sheikh Rashid Tower, DWTC, Dubai, UAE, P.O. Box 333779
- **Phone:** Not listed
- **Social Media:** Not functional

---

## Extraction Summary

| Metric | Value |
|--------|-------|
| **Pages analyzed** | 1 |
| **Content files created** | 2 (homepage.md, INDEX.md) |
| **Images downloaded** | 3 |
| **Images referenced but not downloaded** | 1 |
| **Text sections extracted** | 8+ (hero, mission, 3 services, footer, contact) |
| **Feature lists extracted** | 12 (4 per service × 3 services) |
| **Contact points** | 1 (email only) |

---

## Content Quality & Completeness

### What Was Successfully Extracted
✓ All headings and subheadings  
✓ All body text and paragraphs  
✓ All feature/capability lists  
✓ Footer information (copyright, company details, contact email)  
✓ SEO metadata (OG tags, page title)  
✓ SVG logo assets  
✓ Contact information  

### What Was NOT Extracted (Not Present on Site)
✗ Product/service images or screenshots  
✗ Team member photos or bios  
✗ Background images or illustrations  
✗ Portfolio or case study images  
✗ Navigation menu  
✗ Social media links (broken widget)  
✗ Favicon  
✗ Blog posts or articles  
✗ Form content (no forms exist)  
✗ Video content  

### Extraction Issues
- **devakelogo.png** could not be downloaded directly but is referenced in analysis
- Favicon returns 404
- Font files (Weebly theme) all return 404 — not applicable for extraction

---

## Next Steps for Frontend Engineer

### Required Assets
1. **SVG logos** — Already have: `devake-icon.svg`, `devake-logo-text.svg`
2. **PNG logo** — Manual download required: `devakelogo.png` from site or use SVG equivalents
3. **Typography** — Original site uses Verdana + Courier New (broken Weebly fonts); redesign should specify new typeface per uiux.md (Aeonik Pro + IBM Plex Mono)
4. **Images for new sections** — Redesign calls for:
   - Point cloud visualizations (Canvas/Three.js generated)
   - Case study screenshots (satellite/LIDAR imagery examples)
   - Team photos (if available from client)
   - Technology stack logos

### Content Notes
- All text content is factually accurate per source site
- Formatting and hierarchy preserved as designed in original
- URLs and email addresses verified correct
- Company information (address, copyright year 2022) matches original site

---

## File Tree

```
devake.com/current/
├── content/
│   ├── INDEX.md (this file)
│   └── homepage.md (extracted content)
├── images/
│   ├── manifest.json (image inventory)
│   ├── devake-icon.svg (downloaded)
│   ├── devake-logo-text.svg (downloaded)
│   ├── homepage-top.png (downloaded)
│   └── ._homepage-top.png (macOS metadata)
├── pages/
│   └── homepage.md (site analysis)
└── structure.md (site structure analysis)
```

---

## Metadata

- **Extracted by:** content-extractor agent
- **Extraction method:** Playwright + manual analysis
- **Original platform:** Weebly
- **Original site status:** Active as of 2026-04-02
- **Copyright notice:** © 2022 Devake FZE (note: year outdated on original)
