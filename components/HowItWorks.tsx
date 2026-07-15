import Link from "next/link";

const STEPS = [
  {
    num: "01",
    title: "Paste your website",
    body: "WazzaBerry reads your site and instantly works out what you sell, who buys it, and how to pitch it. Zero manual setup.",
  },
  {
    num: "02",
    title: "Your agent hunts your buyers",
    body: "It picks up buying signals, scores your best-fit prospects, and starts reaching out across email and social — all on its own.",
  },
  {
    num: "03",
    title: "Meetings land in your calendar",
    body: "You wake up to interested, qualified leads with replies already drafted, while your pipeline keeps compounding in the background.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6" id="how-it-works">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            <span className="text-berry-600">3 minutes</span> to set up. First
            results the same day.
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Enter your website. Your agent handles the rest.
          </p>
          <p className="mt-2 font-mono text-sm uppercase tracking-widest text-berry-600">
            Connect → Prospect → Convert
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-berry-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/radar-sweep.png"
            alt="WazzaBerry's radar sweep highlighting warm prospects"
            className="h-40 w-full object-cover sm:h-56"
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="group rounded-3xl border border-berry-100 bg-cream p-8 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-berry-200/40"
            >
              <span className="font-mono text-4xl font-extrabold text-berry-200 transition group-hover:text-berry-500">
                {s.num}
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink-900">{s.title}</h3>
              <p className="mt-3 text-ink-600">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/app"
            className="inline-block rounded-full bg-berry-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-berry-600/25 transition hover:bg-berry-700"
          >
            Launch my agent for free
          </Link>
        </div>
      </div>
    </section>
  );
}
