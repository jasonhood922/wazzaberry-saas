import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "General Terms — WazzaBerry" };

export default function TermsPage() {
  return (
    <LegalPage title="General Terms of Service" updated="July 15, 2026">
      <p>
        These terms are placeholder content for the WazzaBerry template. Before
        going to production, replace this page with terms drafted or reviewed
        by a qualified lawyer for your jurisdiction and business model.
      </p>
      <h2>1. The service</h2>
      <p>
        WazzaBerry provides AI-assisted prospecting and outreach software on a
        subscription basis. Features, quotas, and channel availability depend
        on the plan you purchase and may evolve over time.
      </p>
      <h2>2. Accounts</h2>
      <p>
        You are responsible for the accuracy of your account information, for
        keeping credentials confidential, and for all activity that happens
        under your account.
      </p>
      <h2>3. Acceptable use</h2>
      <ul>
        <li>No unlawful, deceptive, or abusive outreach.</li>
        <li>Comply with anti-spam and data-protection laws that apply to you (e.g. CAN-SPAM, GDPR, ePrivacy).</li>
        <li>Respect the terms of the third-party platforms you connect.</li>
        <li>No attempts to probe, disrupt, or reverse-engineer the service.</li>
      </ul>
      <h2>4. Billing</h2>
      <p>
        Subscriptions renew automatically each period until cancelled.
        Cancellation stops the next renewal; fees already paid are
        non-refundable except where the law requires otherwise.
      </p>
      <h2>5. Liability</h2>
      <p>
        The service is provided &ldquo;as is.&rdquo; To the maximum extent
        permitted by law, our aggregate liability is capped at the fees you
        paid in the twelve months before the claim arose.
      </p>
      <h2>6. Contact</h2>
      <p>Questions about these terms: hello@wazzaberry.com</p>
    </LegalPage>
  );
}
