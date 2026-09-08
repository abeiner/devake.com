import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | DEVAKE.",
  description:
    "Current cookie, local-storage, analytics, and third-party embed practices on the Devake website.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Cookies"
      title="Cookie Policy"
      summary="The current Devake website does not set cookies or use browser storage for tracking, preferences, analytics, advertising, or profiling."
    >
      <LegalSection title="Current website technology">
        <p>
          Devake does not currently deploy analytics tools, advertising pixels,
          behavioral tracking, embedded videos, social-media widgets, chat
          widgets, or other third-party embeds on this website. The website
          does not intentionally write to local storage or session storage.
          Therefore, the site does not currently display a cookie-consent
          banner.
        </p>
      </LegalSection>

      <LegalSection title="Hosting logs are different">
        <p>
          The hosting and network providers may generate ordinary server and
          security logs when a page is requested. These may include an IP
          address, timestamp, requested URL, browser or device information, and
          security events. They are not used by Devake for advertising or
          cross-site tracking. See the Privacy Policy for more information.
        </p>
      </LegalSection>

      <LegalSection title="External links">
        <p>
          The website contains ordinary links to external destinations such as
          Google Maps and the design credit. No third-party content is loaded
          from those destinations before you select a link. After leaving this
          website, the destination may use cookies or similar technologies
          under its own policy and controls.
        </p>
      </LegalSection>

      <LegalSection title="If the website changes">
        <p>
          Before adding non-essential analytics, advertising, or embedded
          services, Devake should update this policy and, where required, add a
          consent control that prevents those technologies from loading until
          the visitor makes a valid choice. You can ask about the current setup
          using the contact details below.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
