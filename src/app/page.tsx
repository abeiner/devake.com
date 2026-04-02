import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import WorkSection from "@/components/work/WorkSection";
import TechnologySection from "@/components/technology/TechnologySection";
import TeamSection from "@/components/team/TeamSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <main id="main-content">
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

        {/* 06 — Team */}
        <TeamSection />

        {/* 07 — Contact */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
