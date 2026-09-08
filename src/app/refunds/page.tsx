import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy | DEVAKE.",
  description:
    "How refunds, cancellations, and project payments are handled by Devake FZE.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Refunds"
      title="Refund Policy"
      summary="This website does not sell products, accept payments, or complete online orders."
    >
      <LegalSection title="No website purchases">
        <p>
          The contact form only opens an email draft. It does not create an
          order, charge a card, collect a deposit, or conclude a services
          contract. As a result, there are no website transactions to cancel or
          refund.
        </p>
      </LegalSection>

      <LegalSection title="Custom services">
        <p>
          Devake provides custom business services. Pricing, deposits, billing
          milestones, cancellation rights, acceptance, and any refund terms are
          set out in the proposal, statement of work, order, or contract agreed
          for the specific project. Please review that agreement or contact
          Devake about a particular payment.
        </p>
      </LegalSection>

      <LegalSection title="Mandatory rights">
        <p>
          Nothing in this policy limits a refund, cancellation, or other remedy
          that cannot lawfully be limited. If online checkout, subscriptions,
          standardized digital products, or consumer sales are added later,
          this policy and the purchase flow must be reviewed before launch.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
