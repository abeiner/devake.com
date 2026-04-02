/**
 * TypeScript interfaces for the DEVAKE. site.
 * All site content is typed and stored in src/lib/constants.ts.
 */

/** A single capability/service offering displayed in the 3x2 grid. */
export interface Capability {
  title: string;
  description: string;
}

/** Address details for the company. */
export interface Address {
  company: string;
  street: string;
  city: string;
  country: string;
  poBox: string;
  mapsUrl: string;
}

/** Social media / professional links. */
export interface SocialLinks {
  linkedin: string;
  github: string;
}

/** Global site configuration: name, contact, branding. */
export interface SiteConfig {
  name: string;
  tagline: string;
  email: string;
  address: Address;
  social: SocialLinks;
  copyright: string;
}

/** A technology name displayed in the 5x2 grid. */
export interface TechItem {
  name: string;
}

/** A metric with a numeric/string value and a label. */
export interface Metric {
  value: string;
  label: string;
}

/** The featured case study / project. */
export interface CaseStudy {
  label: string;
  title: string;
  description: string;
  techStack: string[];
  dataFormats: string[];
  metric: Metric;
}

/** A navigation section link (for the nav overlay and scroll nav). */
export interface NavSection {
  number: string;
  label: string;
  href: string;
}

/** Founder / team member profile. */
export interface Founder {
  name: string;
  title: string;
  bio: string;
  social: SocialLinks;
}
