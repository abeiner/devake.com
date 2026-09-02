import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import WorkSection from "@/components/work/WorkSection";
import TechnologySection from "@/components/technology/TechnologySection";
import ContactSection from "@/components/contact/ContactSection";
import ScrollLagEffect from "@/components/shared/ScrollLagEffect";

export default function Home() {
  return (
    <>
      <ScrollLagEffect />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* 01 — Hero */}
        <HeroSection />

        {/* 02 — About */}
        <AboutSection />

        {/* 03 — Capabilities */}
        <CapabilitiesSection />

        {/* 04 — Work */}
        <WorkSection />

        {/* 05 — Technology */}
        <TechnologySection />

        {/* 05 — Contact */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
