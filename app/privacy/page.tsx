import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy — WazzaBerry" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 15, 2026">
      <p>
        This is placeholder privacy content for the WazzaBerry template. Before
        launch, replace it with a policy reviewed by a privacy professional and
        matched to your actual data flows.
      </p>
      <h2>1. Data we process</h2>
      <ul>
        <li>Account data: name, email, company, billing details.</li>
        <li>Usage data: product analytics, device and log information.</li>
        <li>Prospect data: business contact information processed on your instructions to deliver the service.</li>
      </ul>
      <h2>2. Why we process it</h2>
      <p>
        To provide and improve the service, to secure it, to communicate with
        you, and to meet legal obligations. Where consent is required, we ask
        for it.
      </p>
      <h2>3. Sharing</h2>
      <p>
        We share data with subprocessors (hosting, email delivery, analytics,
        payments) under data-processing agreements. We never sell personal
        data.
      </p>
      <h2>4. Your rights</h2>
      <p>
        Depending on your location you may have rights of access, correction,
        deletion, portability, and objection. Exercise them via our{" "}
        <a href="/opt-out" className="text-berry-600 underline">
          opt-out and privacy request page
        </a>{" "}
        or by emailing hello@wazzaberry.com.
      </p>
      <h2>5. Retention &amp; security</h2>
      <p>
        We keep personal data only as long as needed for the purposes above and
        protect it with industry-standard technical and organisational
        measures.
      </p>
    </LegalPage>
  );
}
