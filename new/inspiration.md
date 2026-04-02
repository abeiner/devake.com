# Inspiration Research: Awwwards-Level Redesign for DEVAKE

> Analyzed 2026-04-02. Four award-caliber websites studied for design patterns, interactions, and visual direction to inform the devake.com rebuild.

---

## 1. Good Fella (good-fella.com)

**What they do:** Frontend development studio ("Your Frontend team. One monthly fee.")

### Overall Aesthetic

- **Color palette:** Near-black background (`#141314`), warm off-white (`#EEEEEE`), vibrant orange-red accent (`#FB460D` / `#FD551D`). High-contrast, dramatic.
- **Typography:** `aktiv-grotesk` (sans-serif) for all text. Headings at ~75px with tight letter-spacing (`-2.6px`), weight 400. Monospace `GeistMono` used for CTAs and UI labels -- gives a technical, dev-studio feel. TypeKit integration.
- **Spacing:** Extremely generous whitespace. Hero section occupies full viewport. Sections breathe with 100-200px vertical padding.

### Layout Approach

- Dark/light alternating sections: hero is dark, "How it works" is light (#EEEEEE), work showcase returns to dark. Creates visual rhythm.
- Asymmetric split on hero: headline left, ASCII art character right (occupies ~50% of viewport).
- Content width is constrained but comfortable. Full-page height is ~12,800px -- a long, storytelling scroll.
- Grid-based work showcase with project cards.

### Animations & Interactions

- **Lenis** smooth scrolling (`html.lenis` class confirmed).
- ASCII art character on hero is interactive -- made of code characters that shift/animate.
- Theme system with `data-theme` attribute and localStorage persistence.
- CTA buttons use monospace font with a `+` icon suffix and border styling -- very distinctive.
- Hover effects on project cards reveal additional information.
- Loading screen with "LOADING" text before content appears.

### What Makes It Award-Worthy

- The **ASCII art character** is the showstopper -- a human figure rendered entirely in code characters with orange-red highlights. It bridges the "we write code" identity with visual art.
- **Monospace CTA buttons** (e.g., `SEE OUR PRICING +`) are unusual and memorable.
- Extreme restraint in color use -- only dark, light, and one accent. Everything feels intentional.
- The dark-to-light section transitions create a cinematic storytelling flow.

### Navigation Style

- Fixed top bar: logo (left), "MENU" with hamburger icon (center), "LET'S WORK TOGETHER +" CTA button (right, orange-red background).
- Full-screen menu overlay with navigation links: Home, Work, Pricing, About, Contact.
- Social links and emails visible in the nav overlay.
- Nav items: clean sans-serif, no uppercase forced.

### Imagery

- Hero uses generative/ASCII art rather than photography.
- Work showcase uses device mockups (laptop/phone screenshots of completed projects).
- Client logos in a trust bar near the bottom of the hero (Coca-Cola, BodyArmor, WKNDHRS).
- Minimal photography -- the restraint reinforces the "developer studio" identity.

### Mobile Considerations

- Responsive Next.js build (confirmed via source). Viewport meta tag present.
- Likely stacks asymmetric layouts vertically on mobile.
- Touch-optimized with `maximum-scale=1` viewport setting absent -- allows pinch zoom.

---

## 2. SRG by AVA Digital (srg.ava-digital.site/en)

**What they do:** Design education program ("Real-world experience and professional development with AVA Digital mentors.")

### Overall Aesthetic

- **Color palette:** Deep dark background (near-black), light text (`#EAEAEA` / `#ECECEC`), striking red accent (`#D4202C`). Noise texture overlay (`noisemin.png`) adds grain to backgrounds.
- **Typography:** `Aeonik Pro` (Regular 500, Medium 500, Bold 700) -- a modern geometric sans-serif with personality. `IBM Plex Mono` (Regular 400/500, Medium 500) for secondary/technical text. Clean, confident pairing.
- **Spacing:** Sections are generously spaced. The design breathes.

### Layout Approach

- Full-screen hero section with animated preloader.
- 12 distinct sections: hero, about, awards, team, benefits, program, pricing, reviews, philosophy, photos, FAQ, form.
- Dark-on-dark with subtle section differentiation through spacing and content density.
- Accordion-based content reveals (e.g., program details, FAQ).
- Footer transitions to red background (`#D4202C`) on scroll -- dramatic section color change.

### Animations & Interactions

- **GSAP + ScrollTrigger + SplitText** -- full animation suite. This is the gold standard for scroll-based web animations.
- **Lenis** smooth scrolling (lerp: 0.082, duration: 1.2) -- buttery smooth.
- Custom **preloader** with animated counter, progress line, and text reveal timeline.
- ScrollTrigger pinned sections for each major content block (hero, about, team, program).
- Text split animations on headings (SplitText for character/word-level reveals).
- Scroll-driven color transitions (footer background shifts to red).
- Accordion items with animated open/close states.
- **Awwwards badge** present in the DOM -- this site has actually won an Awwwards SOTD.

### What Makes It Award-Worthy

- The **preloader sequence** is cinematic -- counter animation, progress bar, text reveals, all choreographed on a GSAP timeline.
- **Scroll-triggered section reveals** feel like stepping through slides in a premium presentation.
- The **noise texture overlay** adds analog warmth to the digital canvas -- subtle but elevated.
- **Footer color transformation** from dark to red is unexpected and memorable.
- Perfect typography pairing: geometric sans for personality, monospace for data/details.

### Navigation Style

- Likely minimal/hidden navigation with smooth scroll to sections.
- Sections are anchored for scroll-based navigation.
- The preloader acts as a gateway experience before content is accessible.

### Imagery

- Photo gallery section with team/workspace imagery.
- Award badges and recognition marks.
- Project-based visual content within accordion items.
- Noise texture overlay on backgrounds adds photographic grain quality.

### Mobile Considerations

- Built with responsive framework (Taptop builder).
- Lenis smooth scrolling has `smoothTouch: false` -- correctly disables smooth scroll on touch devices for native feel.
- `normalizeWheel: false` -- respects platform scroll behavior.

---

## 3. Sutera (sutera.ch)

**What they do:** Design portfolio for Stella Muehlhaus -- "I design systems that shape how humans and machines connect. From robotic extensions to perceptual interfaces."

### Overall Aesthetic

- **Color palette:** Stark white backgrounds with black text. Extremely minimal -- almost architectural. The use of white space IS the design.
- **Typography:** Two font systems: `font-main` for body/interface text (uppercase, small sizing), and `reality-font` for display headings (large, bold, expressive). Custom variable fonts loaded via Prismic CDN. Text sizes range from `text-xxs` (10px) to `text-xxl` for the hero title.
- **Spacing:** Grid-defined margins (`--grid-margin`, `--grid-gutter`). Extremely precise, almost scientific layout. Custom breakpoints: `custom-tab`, `custom-desktop`.

### Layout Approach

- **Data-visualization aesthetic** -- small bordered boxes with metadata (`border bg-white font-main p-[5px] w-max text-[10px]`) float around content like labels or annotations.
- The hero presents "Reality, Design" as a massive typographic statement.
- Three project worlds/modes: "Lab Reality", "Blueprint", "Cyber" -- each with their own hero, about, and footer sections. This is a multi-dimensional portfolio.
- CSS classes suggest parallax depth (`z-2`, fixed positioning, `pointer-events-none` overlays).
- Percentage-based positioning with viewport units (`svh`, `svw`, `dvw`, `dvh`).
- Projects blurred behind overlays (`project-blured` class).

### Animations & Interactions

- **Loading sequence** with a grid-based pixel filter (`loader-filter`) -- white squares with aspect-ratio 1:1, min-width 7.5%, that likely animate/dissolve to reveal content. Very original.
- Nuxt.js framework (SSR + client-side hydration).
- Easter egg system in the data model -- `lab_hero_list_easter_eggs`, `lab_hero_bubble_easter_egg`, `lab_about_easter_eggs`. Hidden interactive discoveries throughout.
- Project blur/unblur transitions.
- Extensive use of `transform`, `translate`, and CSS custom properties for dynamic layout.
- `will-change-transform` hints at GPU-accelerated animations.

### What Makes It Award-Worthy

- The **grid-based loading animation** (white squares dissolving) is unlike anything conventional.
- **Three-world navigation** (Lab Reality, Blueprint, Cyber) creates a non-linear portfolio experience. Each "reality" has its own complete design system.
- **Annotation-style labels** (small bordered boxes with metadata) create a blueprint/technical drawing aesthetic.
- **Easter eggs** hidden throughout encourage exploration and reward curiosity.
- The conceptual framing -- "Reality by Design" -- is intellectually rigorous. Design, identity, and technology are woven together.

### Navigation Style

- Full-screen immersive navigation between "realities" (Lab, Blueprint, Cyber).
- Links to external profiles: LinkedIn, Medium, Instagram.
- Minimal chrome -- the content IS the navigation.
- "Change Reality" is the nav concept -- switching between design worlds.

### Imagery

- Heavy use of Prismic CMS for image delivery (`images.prismic.io`).
- GIF easter eggs (`hidden_gif_dog`, `hidden_gif`) for playful surprises.
- Projects presented with blur-to-clear reveals.
- The visual style is more conceptual/abstract than photographic.

### Mobile Considerations

- Nuxt.js with responsive design via custom breakpoints (`custom-tab`, `custom-desktop`).
- Viewport-relative units (`svh`, `svw`, `dvw`, `dvh`) for true responsive sizing.
- Separate mobile and tablet layouts defined through class prefixes.

---

## 4. Griflan (griflan.com)

**What they do:** Creative agency -- "Creative Agency for Bold Brands & Digital Design"

### Overall Aesthetic

- **Color palette:** Near-black (`#181616`), warm off-white (`#FFFDD8` -- very slightly yellow), and bold red (`#FF3831`). This is nearly identical to devake.com's brand colors (white, near-black, red).
- **Typography:** Two font stacks: `font-tan` for display/heading typography (likely Tan Nimbus or similar decorative serif), and `sans` for body text. Heading classes: `h1` through `h6`. Display text is bold and expressive.
- **Spacing:** Utility-class system (Tailwind CSS v4). Spacings: `mb-100`, `pt-75`, `px-20`, `gap-y-25`. Generous but structured.

### Layout Approach

- **Grid-based client roster** -- a 2-column (mobile) / 3-column (desktop) grid of client names, each in a bordered cell with hover-to-red transition. 30 clients listed. This is very impactful.
- `site-max` container constrains content width.
- Sections divided by subtle white/10 opacity borders (`border-white/10`).
- Asymmetric layouts: "Recent Clients" heading takes the left column, client grid takes the right.
- Footer features the agency name as a massive SVG logotype rendered in red.
- Canvas elements for dynamic/generative backgrounds (two `<canvas>` elements in the footer, one flipped vertically).

### Animations & Interactions

- **Canvas-based generative art** in footer -- two canvas elements create mirrored visual effects. `will-change-transform` for GPU acceleration. Pointer events enabled on hover-capable devices only (`has-hover:pointer-events-auto`).
- Hover state on client grid items: `transition-colors duration-300 ease-out` with `hover:text-red`.
- Nuxt.js framework for smooth page transitions.
- SVG logo is interactive (wrapped in a button element).
- Easter egg chili pepper icon in footer (`/chili.png`, 22x22px).
- Underline animation on links (`uline` class).

### What Makes It Award-Worthy

- The **client grid** is a masterclass in simple-yet-impactful design. 30 names in a clean grid with subtle borders and red hover states. It communicates scale and credibility without showing a single case study.
- **Generative canvas backgrounds** in the footer create living, breathing visual interest.
- The **massive SVG logotype** in red dominates the footer -- bold brand statement.
- The color palette is almost identical to devake.com's brand, making this the most directly relevant reference.
- **Border-as-design-element** approach: `border-white/10` creates a grid system that's visible but understated.

### Navigation Style

- Likely minimal top navigation.
- Sections flow vertically with smooth scroll.
- Footer contains contact info: two phone numbers, email (hello@griflan.com).
- Social links: Instagram, LinkedIn, X (Twitter).

### Imagery

- Minimal photography. The design relies on typography, color, and generative art.
- Canvas-rendered backgrounds replace traditional hero images.
- SVG-based logo ensures crisp rendering at any size.
- The chili pepper icon adds personality to an otherwise serious design.

### Mobile Considerations

- Tailwind CSS responsive prefixes: `s:` for small+ breakpoints, `max-s:` for mobile-only.
- `maximum-scale=1` on viewport -- prevents zoom for app-like feel.
- Client grid collapses from 3 columns to 2 on mobile.
- Footer layout wraps on mobile (`max-s:flex-wrap`).

---

## Common Patterns & Takeaways

### Consistent Themes Across All Four Sites

1. **Dark backgrounds are dominant.** Three of four sites use near-black as the primary background. This is the current direction for premium, award-level web design. White content on dark backgrounds feels cinematic and premium.

2. **Red as the accent color.** Remarkably, three of four sites use a bold red as their accent color -- Good Fella (`#FB460D`), SRG (`#D4202C`), and Griflan (`#FF3831`). This aligns perfectly with devake.com's brand red.

3. **Typography is the hero.** All four sites lead with typography rather than imagery. Display headings are oversized (60-100px+), tightly tracked, and set in premium typefaces. Body text is secondary.

4. **Smooth scrolling is standard.** Three sites use Lenis for buttery smooth scrolling. This is a baseline expectation for award-level sites.

5. **GSAP for animations.** SRG uses the full GSAP suite (ScrollTrigger + SplitText). Good Fella confirmed GSAP-free but uses Lenis + CSS transitions. The minimum bar is scroll-triggered reveals and text animations.

6. **Monospace accents.** Good Fella uses GeistMono, SRG uses IBM Plex Mono, Sutera uses a mono for metadata labels. Monospace fonts signal technical credibility -- perfect for a geospatial software company.

7. **Generative/procedural visuals over photography.** ASCII art (Good Fella), noise textures (SRG), grid loaders (Sutera), canvas animations (Griflan). These sites avoid stock photography and instead create unique visual experiences through code.

8. **Minimal navigation.** None of these sites have traditional multi-item navigation bars. They use hamburger menus, scroll-based navigation, or immersive full-screen menus.

9. **Long, storytelling scrolls.** Page heights range from 6,900px to 12,800px. Content unfolds like a narrative, not a brochure.

10. **Small, intentional touches.** Easter eggs (Sutera), chili peppers (Griflan), ASCII art (Good Fella), noise textures (SRG). These details reward attention and make the sites feel handcrafted.

---

### Design Direction for devake.com

Based on these four references and devake.com's brand (white, near-black, red; geometric logo; geospatial software company), the redesign should follow this direction:

#### Color Strategy
- **Primary:** Near-black background (`#141418` or similar deep dark)
- **Secondary:** Off-white for text and alternating sections (`#F0F0F0`)
- **Accent:** Bold red (`#E8302B` or matching brand red) -- used sparingly for CTAs, highlights, and interactive states
- Dark-to-light section alternation for rhythm (like Good Fella)

#### Typography
- **Display:** A premium geometric or modern grotesk sans-serif (e.g., Aeonik, Neue Montreal, or custom). Large (80-120px hero), tight tracking (-2 to -3px), weight 400-500.
- **Monospace secondary:** IBM Plex Mono or Geist Mono for technical labels, section numbers, metadata, and CTA buttons. This bridges "we build software" with "we look good doing it."
- **Body:** Clean sans-serif at 16-18px, generous line-height (1.5-1.6).

#### Animations & Interactions
- **Lenis** smooth scrolling (mandatory baseline)
- **GSAP + ScrollTrigger** for section reveals and parallax
- **SplitText** for hero heading character-by-character reveal
- Custom **preloader** -- could incorporate a geospatial/map visualization or coordinate-based animation
- Hover effects: red color transitions on interactive elements (like Griflan's client grid)
- Scroll-triggered section color changes

#### Layout
- Full-viewport hero with oversized typography and a generative/3D visual (geospatial data visualization, point cloud, or map-based animation rather than static imagery)
- Services presented in a grid with subtle borders (Griflan style)
- Case studies / projects with parallax image reveals
- Client grid similar to Griflan's -- communicates credibility at scale
- `max-w-7xl` content container with generous padding

#### Unique Identity Elements (The "Wow Factor")
- **3D point cloud or satellite data visualization** in the hero -- leveraging devake's actual technology (geospatial + LIDAR) as the visual centerpiece
- **Coordinate-based micro-interactions** -- display lat/long coordinates that update on cursor movement
- **Map-based section transitions** -- scrolling reveals "zooming in" on different capability areas
- **Technical metadata labels** (Sutera-style annotation boxes) showing real data types, coordinate systems, or algorithm names
- **Monospace code snippets** floating as decorative elements -- real Python/GIS code, not lorem ipsum

#### Navigation
- Fixed minimal top bar: geometric logo icon (left), hamburger "MENU" (center), CTA button in red (right)
- Full-screen overlay menu with smooth transitions
- Section-based smooth scroll anchoring

#### Footer
- Massive SVG logo treatment in red (Griflan-inspired)
- Company info in a structured grid
- "Design by aleksandrabeiner.com" credit
- Generative canvas or particle background

This direction positions devake.com as a technically sophisticated company with award-caliber design taste -- the visual language says "we build cutting-edge technology AND we care deeply about how it looks."
