import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Affiliate Program — WazzaBerry",
  description:
    "Earn recurring commission for every team you bring to WazzaBerry.",
};

const PERKS = [
  {
    title: "30% recurring commission",
    body: "Earn 30% of every subscription payment from customers you refer — every month, for as long as they stay.",
  },
  {
    title: "90-day cookie window",
    body: "Your referral link keeps credit for a full 90 days, so you get paid even when buyers take their time.",
  },
  {
    title: "Monthly payouts",
    body: "Commissions are paid out monthly once you pass the $50 threshold — by bank transfer or PayPal.",
  },
  {
    title: "Marketing kit included",
    body: "Banners, copy blocks, demo videos, and comparison one-pagers, ready to drop into your content.",
  },
];

const STEPS = [
  { num: "01", title: "Apply in two minutes", body: "Tell us where your audience lives — newsletter, YouTube, community, or client base." },
  { num: "02", title: "Share your link", body: "You get a unique tracking link and a dashboard showing clicks, trials, and conversions in real time." },
  { num: "03", title: "Get paid monthly", body: "Every customer you send pays you 30% recurring commission, month after month." },
];

export default function AffiliatePage() {
  return (
    <main>
      <Navbar />
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            Recommend WazzaBerry.{" "}
            <span className="text-berry-600">Earn 30% forever.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            If your audience runs outbound, WazzaBerry sells itself. You take a
            recurring cut of every subscription you refer.
          </p>
          <Link
            href="mailto:hello@wazzaberry.com?subject=Affiliate%20application"
            className="mt-8 inline-block rounded-full bg-berry-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-berry-600/25 transition hover:bg-berry-700"
          >
            Apply to the program →
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {PERKS.map((p) => (
            <div key={p.title} className="rounded-3xl border border-berry-100 bg-white p-8">
              <h3 className="text-lg font-bold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-ink-600">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-center text-2xl font-extrabold text-ink-900">
            How it works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.num} className="rounded-3xl bg-berry-50 p-6">
                <span className="font-mono text-2xl font-extrabold text-berry-400">{s.num}</span>
                <h3 className="mt-2 font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
