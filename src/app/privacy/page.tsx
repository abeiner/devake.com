import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | DEVAKE.",
  description:
    "How Devake FZE handles personal information submitted through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Privacy"
      title="Privacy Policy"
      summary="This policy explains what personal information Devake FZE receives through this website, why it is used, and the choices available to you."
    >
      <LegalSection title="Who is responsible">
        <p>
          Devake FZE is responsible for the personal information described in
          this policy. Our business address and policy contact are listed at
          the end of this page.
        </p>
      </LegalSection>

      <LegalSection title="Information we receive">
        <ul>
          <li>
            <strong>Inquiry details:</strong> your email address, an optional
            name, and the project brief you choose to include.
          </li>
          <li>
            <strong>Email records:</strong> if you send the generated draft,
            Devake receives the message through its email service, together
            with ordinary email metadata.
          </li>
          <li>
            <strong>Hosting and security data:</strong> the hosting provider
            may process limited request information such as IP address,
            request time, requested URL, browser or device information, and
            security events to deliver and protect the website.
          </li>
        </ul>
        <p>
          The website form does not transmit information to a Devake server or
          database. It creates a draft in your own email application. Nothing
          is sent until you choose to send that email.
        </p>
      </LegalSection>

      <LegalSection title="Why we use it">
        <p>
          We use inquiry information to answer your request, discuss a possible
          project, provide requested services, maintain business records,
          protect the website, resolve disputes, and comply with law. Depending
          on the law that applies, this processing is based on steps taken at
          your request before a contract, performance of a contract, legitimate
          business interests, consent, or a legal obligation.
        </p>
        <p>
          We do not use inquiry details for unrelated marketing unless you make
          a separate, informed choice to receive it.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="Cookies and similar technologies">
        <p>
          The current website does not set cookies or intentionally write to
          local storage or session storage. It does not use analytics,
          advertising pixels, behavioral tracking, embedded videos,
          social-media widgets, chat widgets, or other third-party embeds.
          Therefore, the site does not currently display a cookie-consent
          banner.
        </p>
        <p>
          Hosting and network providers may still generate ordinary request and
          security logs as described above. External destinations such as
          Google Maps are loaded only after you select their links and may then
          apply their own technologies and policies. This section and the
          consent approach must be reviewed before non-essential storage,
          analytics, advertising, or embedded services are added.
        </p>
      </LegalSection>

      <LegalSection title="Sharing and international processing">
        <p>
          We do not sell personal information. Information may be handled by
          service providers that support website hosting, email, security, IT,
          professional advice, or business operations; by a prospective buyer
          if the business is reorganized; or by authorities when disclosure is
          legally required. Providers are expected to process information only
          for the relevant service and under appropriate safeguards.
        </p>
        <p>
          Because Devake and its providers may operate in different countries,
          information may be processed outside your country. Where applicable
          law requires it, Devake will use a recognized transfer mechanism or
          another lawful safeguard.
        </p>
      </LegalSection>

      <LegalSection title="Retention and security">
        <p>
          We keep inquiry records only for as long as reasonably necessary to
          respond, pursue or perform the business relationship, meet legal and
          accounting requirements, and resolve disputes. Records that are no
          longer needed for those purposes should be deleted or anonymized.
        </p>
        <p>
          We use reasonable organizational and technical measures appropriate
          to the information involved. No internet or email system can be
          guaranteed completely secure, so please do not send passwords,
          payment-card data, health data, government identifiers, or other
          sensitive information through the project brief.
        </p>
      </LegalSection>

      <LegalSection title="Your choices and rights">
        <p>
          Depending on applicable law, you may ask to access, correct, delete,
          restrict, or receive a copy of your personal information, or object
          to certain processing. If processing relies on consent, you may
          withdraw it for the future. You may also complain to the competent
          data-protection authority. Contact us using the details below; we may
          need to verify your identity before acting on a request.
        </p>
      </LegalSection>

      <LegalSection title="Children and policy changes">
        <p>
          This business website is not directed to children, and we do not
          knowingly request information from children. We may update this
          policy when the website or legal requirements change. The effective
          date above identifies the current version.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
