const FEATURES = [
  {
    tag: "LEAD DISCOVERY",
    title: "Surfaces and ranks your best-fit prospects",
    body: "Picks up buying signals, builds lookalike audiences from your happiest customers, grades every prospect, and contacts the highest-intent ones first.",
    chips: ["Intent signals", "Lookalikes", "Lead scoring", "ICP filtering"],
    wide: true,
  },
  {
    tag: "OUTREACH",
    title: "Human-quality messaging at machine scale",
    body: "Email and social campaigns driven by live buying signals. Each message is written around the prospect's own context — their company, activity, and timing — so the right conversation starts at the right moment.",
    chips: ["Email", "Social", "AI copywriting", "Auto follow-ups"],
    wide: true,
  },
  {
    tag: "LEARNING",
    title: "Improves itself every week",
    body: "Learns which messages land and which fall flat, then re-tunes automatically. Every weekly adjustment compounds.",
    chips: ["Refines ICP", "Learns", "Adapts", "Compounds"],
  },
  {
    tag: "CONTROL",
    title: "Full autopilot — or approve before send",
    body: "Run fully autonomous, or review each message before it goes out. Your agent fits how your team already works, with no rigid workflows.",
    chips: ["Autopilot", "Copilot mode"],
  },
  {
    tag: "REPLIES",
    title: "Every reply pre-drafted and ready",
    body: "When a prospect answers, a tailored response is waiting in your inbox — ready to send in one click. You stay in charge of every conversation that counts.",
    chips: ["Unified inbox", "One-click send"],
  },
];

export default function FeatureGrid() {
  return (
    <section className="px-4 py-20 sm:px-6" id="features">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Built to run your entire outreach.
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            From lead research to booked meetings, your agent does the legwork —
            your team just shows up to close.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.tag}
              className={`rounded-3xl border border-berry-100 bg-white p-8 shadow-sm transition hover:shadow-lg hover:shadow-berry-100 ${
                f.wide ? "md:col-span-1" : ""
              }`}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-berry-600">
                {f.tag}
              </span>
              <h3 className="mt-3 text-xl font-bold text-ink-900">{f.title}</h3>
              <p className="mt-3 text-ink-600">{f.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {f.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-berry-50 px-3 py-1 text-xs font-medium text-berry-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* stack replacement card */}
          <div className="rounded-3xl bg-gradient-to-br from-berry-600 to-berry-800 p-8 text-white shadow-xl shadow-berry-600/30">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-berry-200">
              ONE AGENT
            </span>
            <h3 className="mt-3 text-xl font-bold">
              Replaces your whole outreach stack.
            </h3>
            <p className="mt-3 text-berry-100">
              Stop paying for five tools that don&apos;t talk to each other.
              WazzaBerry runs the pipeline end to end — for a fraction of the
              price.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Copywriting", "Sequencing", "Signal tracking", "Lead finding"].map(
                (c) => (
                  <span
                    key={c}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium line-through decoration-berry-300"
                  >
                    {c}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
