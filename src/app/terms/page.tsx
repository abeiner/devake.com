import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | DEVAKE.",
  description: "Terms governing use of the Devake FZE website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal / Terms"
      title="Terms & Conditions"
      summary="These terms govern access to and use of the Devake FZE informational website."
    >
      <LegalSection title="Using this website">
        <p>
          By using this website, you agree to these terms. If you do not agree,
          do not use the website. You may use it only for lawful purposes and
          must not interfere with its operation, attempt unauthorized access,
          introduce malicious code, scrape it in a way that impairs service, or
          misuse its content or contact details.
        </p>
      </LegalSection>

      <LegalSection title="Information, inquiries, and contracts">
        <p>
          Website content is general information, not professional advice or a
          binding offer. Sending an inquiry or opening an email draft does not
          create a client relationship, guarantee availability, or form a
          contract. Any project will be governed by a separate proposal,
          statement of work, order, or signed agreement. If that agreement
          conflicts with these website terms, the project agreement controls.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The website design, text, software, graphics, names, and marks are
          protected by applicable intellectual-property laws. Rights remain
          with their respective owners. You may view the website for your own
          lawful evaluation of Devake services. You may not reproduce,
          distribute, modify, or commercially exploit its content without
          permission from the relevant rights holder.
        </p>
        <p>
          Space Grotesk and IBM Plex Mono are redistributed under the SIL Open
          Font License 1.1. Their copyright and license notices are available in
          the <a href="/font-licenses/NOTICES.txt">font license file</a>.
        </p>
      </LegalSection>

      <LegalSection title="Accuracy and third-party links">
        <p>
          We aim to keep the website accurate, but service descriptions and
          other content may change and may contain errors. We do not promise
          that every statement is complete, current, or suitable for a specific
          project. Links to external services, including maps and third-party
          websites, are provided for convenience. Their operators control their
          own content, availability, privacy practices, and terms.
        </p>
      </LegalSection>

      <LegalSection title="Availability and liability">
        <p>
          The website is provided on an “as available” basis. To the fullest
          extent permitted by law, Devake disclaims implied warranties relating
          to this informational website and is not liable for indirect,
          incidental, special, or consequential losses arising only from its
          use or unavailability. Nothing in these terms excludes or limits
          liability that cannot lawfully be excluded, including liability for
          fraud or wilful misconduct, or any mandatory consumer rights.
        </p>
      </LegalSection>

      <LegalSection title="Applicable law">
        <p>
          These website terms are governed by the laws applicable in the United
          Arab Emirates and Dubai, without overriding mandatory rights that the
          law of your location may grant. Project agreements may specify a
          different governing law or dispute process.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms as the website or law changes. The version
          in force is the one posted here with the effective date shown above.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
