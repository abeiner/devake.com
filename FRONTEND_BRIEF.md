# Frontend Engineer Brief - devake.com

**Prepared for:** Frontend Engineer  
**From:** content-extractor agent  
**Date:** 2026-04-02  

---

## What You Have

### Text Content
Complete extraction of all website text in `/current/content/homepage.md`:
- Hero section (logo reference, heading, tagline, intro)
- Mission/value statement
- 3 service descriptions with 4 feature bullets each
- Footer with company info, address, copyright, contact email

### Visual Assets
From `/current/images/`:
1. **devake-icon.svg** — Geometric mark (abstract K-shape)
2. **devake-logo-text.svg** — "DEVAKE." text wordmark
3. **homepage-top.png** — Reference screenshot

### Metadata
- `/current/images/manifest.json` — Complete inventory of images with alt text, URLs, status
- `/current/content/INDEX.md` — Comprehensive extraction report

---

## What's Missing from Original Site

The original Weebly site has **no imagery beyond logos**:
- ✗ No hero background image
- ✗ No service/product screenshots
- ✗ No team photos
- ✗ No case study images
- ✗ No data visualizations
- ✗ No CTAs or buttons
- ✗ No contact form (just a plain email)

Per `/new/uiux.md`, you'll need to create:
1. **Interactive point cloud/particle hero** — Canvas or Three.js generative visual
2. **Case study section with satellite/LIDAR imagery** — Use sample public geodata if client can't provide
3. **Team section** — Client has minimal info (only "alex@devake.com" exists)
4. **Technology stack section** — Grid of tool logos
5. **Contact form with map** — Interactive map reinforces geospatial brand

---

## Contact Information

**Email:** alex@devake.com  
**Company:** Devake FZE  
**Location:** Dubai, UAE  
- Dedicated Desk 56-A, 57-A, MAKTABI
- 18th Floor, Sheikh Rashid Tower
- DWTC, Dubai, UAE
- P.O. Box 333779

*Note:* Address and email from original site; consider verifying with client if plan requires updates.

---

## Design Direction (from `/new/uiux.md`)

- **Dark-first palette:** #0A0A0C (near-black) + #FFFDD8 (off-white) + #FF3831 (red accent)
- **Typography:** Aeonik Pro (display) + IBM Plex Mono (code)
- **Animation suite:** GSAP + Lenis smooth scroll
- **Interaction signature:** Cursor coordinate tracker showing lat/long
- **Architecture:** Single-page scroll with 8 anchored sections + full-screen nav overlay
- **Footer:** Massive red SVG DEVAKE. wordmark (brand statement)

---

## Files Reference

```
devake.com/
├── current/
│   ├── content/
│   │   ├── homepage.md ← ALL TEXT CONTENT HERE
│   │   └── INDEX.md ← Extraction inventory
│   ├── images/
│   │   ├── manifest.json ← Asset inventory
│   │   ├── devake-icon.svg ← Icon mark
│   │   ├── devake-logo-text.svg ← Text wordmark
│   │   └── homepage-top.png ← Reference screenshot
│   ├── pages/
│   │   └── homepage.md ← Site analysis (read for context)
│   └── structure.md ← Site structure analysis (for reference)
├── new/
│   ├── uiux.md ← YOUR DESIGN SPEC (READ THIS!)
│   ├── architecture.md ← Technical architecture
│   └── plan.md ← Build task list (follow this)
└── src/ ← Your code goes here
```

---

## What to Do Next

1. **Read `/new/uiux.md` thoroughly** — it's your design spec with Awwwards-level vision
2. **Read `/new/plan.md`** — numbered tasks for implementation
3. **Use `/current/content/homepage.md`** for all text content (copy/paste, don't retype)
4. **Check `/current/images/manifest.json`** for asset status before asking client for images
5. **Generate missing visuals:**
   - Point cloud hero (Canvas/Three.js)
   - Case study imagery (public geodata or client samples)
   - Team photos (request from alex@devake.com if needed)

---

## Quick Checklist

- [x] Text content fully extracted
- [x] Logos/assets identified and saved
- [x] Contact information verified
- [x] Missing assets documented
- [ ] You read `/new/uiux.md`
- [ ] You read `/new/plan.md`
- [ ] You're ready to build

Good luck! This is a straightforward content extraction. The design vision is clear in `/new/uiux.md`. 🚀
