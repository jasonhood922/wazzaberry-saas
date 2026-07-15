import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Legal Notice — WazzaBerry" };

export default function LegalNoticePage() {
  return (
    <LegalPage title="Legal Notice" updated="July 15, 2026">
      <p>
        Placeholder company identification for the WazzaBerry template. Replace
        each field with your registered company details before launch.
      </p>
      <h2>Publisher</h2>
      <ul>
        <li>Company: [Your Company Ltd]</li>
        <li>Registered office: [Address]</li>
        <li>Registration number: [Number]</li>
        <li>VAT ID: [VAT]</li>
        <li>Director of publication: [Name]</li>
        <li>Contact: hello@wazzaberry.com</li>
      </ul>
      <h2>Hosting</h2>
      <ul>
        <li>Host: Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
      </ul>
      <h2>Intellectual property</h2>
      <p>
        All content on this site (text, graphics, logos, code) is the property
        of the publisher unless stated otherwise and may not be reproduced
        without prior written permission.
      </p>
    </LegalPage>
  );
}
