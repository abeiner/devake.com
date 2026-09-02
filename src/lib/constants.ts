import type {
  Capability,
  CaseStudy,
  NavSection,
  SiteConfig,
  TechItem,
} from "@/types";

/**
 * Global site configuration.
 * Address, contact, and branding details sourced from the original devake.com.
 */
export const SITE_CONFIG: SiteConfig = {
  name: "DEVAKE.",
  tagline: "Geospatial software development services for companies around the world.",
  email: "alex@devake.com",
  address: {
    company: "Devake FZE",
    streetLines: [
      "Dedicated Desk 56-A, 57-A",
      "MAKTABI, 18th Floor",
      "Sheikh Rashid Tower, DWTC",
    ],
    city: "Dubai",
    country: "UAE",
    poBox: "333779",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=MAKTABI+18th+Floor+Sheikh+Rashid+Tower+DWTC+Dubai+UAE",
  },
  social: {},
  copyright: "2022–2026",
};

/**
 * The three product and service areas described on the original website.
 */
export const CAPABILITIES: Capability[] = [
  {
    title: "Geospatial Data Platform",
    description:
      "A platform for secure storage, quick access, import, export, and analysis of geospatial data, with API integration for other systems.",
  },
  {
    title: "Visualization & Annotation",
    description:
      "A web application for visualizing geospatial layers, adding and editing map annotations, collaborating, and working from mobile devices.",
  },
  {
    title: "Image & Point Cloud Analysis",
    description:
      "Algorithms for classifying and analyzing geographic space, including forest cover, from imagery and point-cloud data at scale.",
  },
];

/**
 * Technologies and delivery formats explicitly described by Devake.
 */
export const TECH_STACK: TechItem[] = [
  { name: "Machine Learning" },
  { name: "Computer Vision" },
  { name: "Deep Learning" },
  { name: "Satellite Imagery" },
  { name: "LIDAR" },
  { name: "Point Clouds" },
  { name: "Web Applications" },
  { name: "Mobile Applications" },
  { name: "Desktop Solutions" },
  { name: "APIs" },
];

/**
 * Additional sourced capabilities for the horizontal scrolling ticker.
 * Displayed at low opacity in a continuous loop.
 */
export const TECH_TICKER: string[] = [
  "Secure Geodata Storage",
  "Data Import & Export",
  "Geospatial Analysis",
  "Map Visualization",
  "Map Annotation",
  "Collaborative Work",
  "Cloud Computing",
  "Distributed Computing",
  "Image Analysis",
  "Forest Cover Classification",
];

/**
 * Publicly disclosed forestry work. No unsupported client, scope, stack,
 * format, or performance claims are added beyond the original website.
 */
export const CASE_STUDY: CaseStudy = {
  title: "Geospatial Projects for a Major US Forestry Company",
  description:
    "Devake has completed several projects for one of the biggest forestry companies in the United States. Further client, scope, stack, and performance details have not been made public.",
  facts: [
    {
      label: "Engagement",
      value: "Several Projects",
      accessibleText: "This engagement includes several projects.",
    },
    {
      label: "Industry",
      value: "Forestry",
      accessibleText: "The client works in the forestry industry.",
    },
    {
      label: "Client Market",
      value: "United States",
      accessibleText: "The client's market is the United States.",
    },
  ],
};

/**
 * Navigation sections for the overlay menu and scroll anchors.
 */
export const NAV_SECTIONS: NavSection[] = [
  { number: "01", label: "ABOUT", href: "#about" },
  { number: "02", label: "CAPABILITIES", href: "#capabilities" },
  { number: "03", label: "WORK", href: "#work" },
  { number: "04", label: "TECHNOLOGY", href: "#technology" },
  { number: "05", label: "CONTACT", href: "#contact" },
];
