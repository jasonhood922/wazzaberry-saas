import Link from "next/link";
import { PRO_FEATURES, CUSTOM_FEATURES } from "@/lib/site";

function Check() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-berry-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section className="px-4 py-20 sm:px-6" id="pricing">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Simple <span className="text-berry-600">pricing</span> for every
            stage
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Warm leads found. Multichannel campaigns live. All inside ten
            minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* PRO */}
          <div className="relative rounded-3xl border-2 border-berry-600 bg-white p-8 shadow-xl shadow-berry-200/50">
            <span className="absolute -top-3.5 left-8 rounded-full bg-berry-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Most popular
            </span>
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-ink-600">
              Pro
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-ink-900">$99</span>
              <span className="text-ink-600">/month</span>
            </div>
            <p className="mt-3 text-ink-600">
              Your first AI sales rep. Built for founders and operators running
              their own outbound.
            </p>
            <div className="mt-4 flex gap-2">
              {["Email", "Socials"].map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-berry-50 px-3 py-1 text-xs font-medium text-berry-700"
                >
                  {c}
                </span>
              ))}
            </div>
            <Link
              href="/app"
              className="mt-6 block rounded-full bg-berry-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition hover:bg-berry-700"
            >
              Try WazzaBerry for free →
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-ink-600">
              What&apos;s included
            </p>
            <ul className="mt-4 space-y-3">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-900">
                  <Check /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOM */}
          <div className="rounded-3xl border border-berry-100 bg-white p-8 shadow-sm">
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-ink-600">
              Custom
            </h3>
            <div className="mt-4 text-4xl font-extrabold text-ink-900">
              Talk with us
            </div>
            <p className="mt-3 text-ink-600">
              For sales teams (5+) and outbound agencies scaling multichannel
              outreach with AI.
            </p>
            <Link
              href="mailto:hello@wazzaberry.com"
              className="mt-6 block rounded-full border-2 border-ink-900 px-6 py-3.5 text-center text-sm font-semibold text-ink-900 transition hover:bg-ink-900 hover:text-white"
            >
              Get a demo →
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-ink-600">
              What&apos;s included
            </p>
            <ul className="mt-4 space-y-3">
              {CUSTOM_FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-900">
                  <Check /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
