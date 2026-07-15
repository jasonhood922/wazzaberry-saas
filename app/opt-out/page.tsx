import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Opt-out & Privacy Request — WazzaBerry",
};

export default function OptOutPage() {
  return (
    <LegalPage title="Opt-out & Privacy Request" updated="July 15, 2026">
      <p>
        If you have received an outreach message sent through WazzaBerry and
        would like your business contact information removed from our
        customers&apos; prospecting workflows, we will action it promptly.
      </p>
      <h2>How to opt out</h2>
      <ul>
        <li>
          Email <strong>hello@wazzaberry.com</strong> with the subject
          &ldquo;Opt-out request&rdquo; from the address you want removed, or
        </li>
        <li>
          Reply &ldquo;unsubscribe&rdquo; to any message you received — the
          sending workflow suppresses your address automatically.
        </li>
      </ul>
      <h2>What happens next</h2>
      <p>
        Your contact details are added to a global suppression list within 72
        hours, preventing any WazzaBerry customer workflow from contacting you
        again. We will confirm once the removal is complete.
      </p>
      <h2>Other privacy rights</h2>
      <p>
        For access, correction, deletion, or portability requests, email the
        same address with the subject &ldquo;Privacy request&rdquo; and we will
        respond within the timelines required by applicable law.
      </p>
    </LegalPage>
  );
}
