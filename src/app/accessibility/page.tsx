import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility Statement | DEVAKE.",
  description:
    "Devake's accessibility approach and how to request assistance or report a barrier.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      summary="Devake aims to make this website usable by people with a wide range of abilities, devices, and assistive technologies."
    >
      <LegalSection title="Our approach">
        <p>
          The website is designed toward the Web Content Accessibility
          Guidelines (WCAG) 2.2 Level AA. This is an ongoing design and
          engineering goal, not a claim of formal certification. The site uses
          semantic headings and landmarks, visible keyboard focus, a skip link,
          labeled form controls, reduced-motion support, and text alternatives
          or hidden treatment for visual-only graphics.
        </p>
      </LegalSection>

      <LegalSection title="Testing and compatibility">
        <p>
          We use automated checks together with keyboard and screen-reader
          review. Browsers and assistive technologies can behave differently,
          and a future content or technology change may introduce a new issue.
          We therefore review accessibility when the site changes.
        </p>
      </LegalSection>

      <LegalSection title="Need help or found a barrier?">
        <p>
          If you cannot access information or complete an action, email Devake
          with the page, the problem, and the browser or assistive technology
          you used. We will try to provide the information in an accessible
          alternative and investigate the barrier.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
