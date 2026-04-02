import type {
  Capability,
  CaseStudy,
  Founder,
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
  tagline: "Geospatial Intelligence. Engineered.",
  email: "alex@devake.com",
  address: {
    company: "Devake FZE",
    street: "Sheikh Rashid Tower, DWTC",
    city: "Dubai",
    country: "UAE",
    poBox: "333779",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sheikh+Rashid+Tower+DWTC+Dubai+UAE",
  },
  social: {
    linkedin: "#",
    github: "#",
  },
  copyright: "2026",
};

/**
 * Six capability cells for the 3x2 grid.
 * Derived from the original site's three service descriptions,
 * expanded into six distinct offerings per the UI/UX proposal.
 */
export const CAPABILITIES: Capability[] = [
  {
    title: "Geospatial Platforms",
    description:
      "Secure storage, analysis, and access platforms for complex geodata. Import/export across all major spatial formats.",
  },
  {
    title: "Data Visualization",
    description:
      "Interactive web applications for map-based visualization, annotation, and collaborative editing of geospatial layers.",
  },
  {
    title: "ML & Computer Vision",
    description:
      "Deep learning models for classification, object detection, and feature extraction from aerial and satellite imagery.",
  },
  {
    title: "LIDAR Processing",
    description:
      "Point cloud analysis, classification, and 3D reconstruction from airborne and terrestrial LIDAR scans.",
  },
  {
    title: "Satellite Imagery",
    description:
      "Multi-spectral and optical satellite image processing for land cover analysis, change detection, and environmental monitoring.",
  },
  {
    title: "Custom GIS Development",
    description:
      "RESTful APIs and tailored solutions connecting geospatial platforms with enterprise systems and cloud infrastructure.",
  },
];

/**
 * 10 core technologies for the 5x2 grid.
 */
export const TECH_STACK: TechItem[] = [
  { name: "Python" },
  { name: "TensorFlow" },
  { name: "PostGIS" },
  { name: "QGIS" },
  { name: "PostgreSQL" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "WebGL" },
  { name: "MapLibre" },
  { name: "Docker" },
];

/**
 * Additional technology names for the horizontal scrolling ticker.
 * Displayed at low opacity in a continuous loop.
 */
export const TECH_TICKER: string[] = [
  "GDAL",
  "Cesium",
  "OpenLayers",
  "Kubernetes",
  "FastAPI",
  "Rasterio",
  "GeoPandas",
  "Leaflet",
  "Node.js",
  "Three.js",
  "Mapbox GL JS",
  "AWS",
  "GCP",
  "PyTorch",
  "Shapely",
  "Fiona",
];

/**
 * Featured case study: forestry analysis project.
 * Based on the original site's mention of "one of the biggest forestry companies in the US."
 */
export const CASE_STUDY: CaseStudy = {
  label: "Featured Project",
  title: "Forest Canopy Analysis for a Leading US Forestry Company",
  description:
    "We developed a machine learning pipeline that processes satellite and LIDAR data to classify forest cover types, detect changes in canopy density, and generate actionable reports for land management decisions across millions of acres.",
  techStack: ["Python", "TensorFlow", "PostGIS"],
  dataFormats: ["LIDAR", "Sentinel-2", "GeoTIFF"],
  metric: { value: "2M+", label: "Acres Analyzed" },
};

/**
 * Navigation sections for the overlay menu and scroll anchors.
 */
export const NAV_SECTIONS: NavSection[] = [
  { number: "01", label: "ABOUT", href: "#about" },
  { number: "02", label: "CAPABILITIES", href: "#capabilities" },
  { number: "03", label: "WORK", href: "#work" },
  { number: "04", label: "TECHNOLOGY", href: "#technology" },
  { number: "05", label: "TEAM", href: "#about-team" },
  { number: "06", label: "CONTACT", href: "#contact" },
];

/**
 * Founder profile.
 * The original site lists only alex@devake.com under "Media Inquiries."
 * Name and bio are constructed from what is known about the company.
 */
export const FOUNDER: Founder = {
  name: "Alex Devake",
  title: "Founder & Lead Engineer",
  bio: "With a background in geospatial engineering and machine learning, Alex founded Devake to bridge the gap between raw spatial data and actionable intelligence. Based in Dubai, he leads a distributed team of developers building platforms that turn satellite imagery and LIDAR point clouds into decision-making tools for enterprises worldwide.",
  social: {
    linkedin: "#",
    github: "#",
  },
};
