import Link from "next/link";

function MockDashboard() {
  const leads = [
    { name: "Ava Torres", company: "Northwind Labs", score: 94, signal: "Visited pricing page" },
    { name: "Liam Patel", company: "Quartz CRM", score: 91, signal: "Engaged with competitor" },
    { name: "Emma Fischer", company: "Draftly", score: 88, signal: "Started following you" },
    { name: "Noah Kim", company: "Signalhouse", score: 85, signal: "Hiring SDRs" },
  ];
  return (
    <div className="mx-auto mt-14 w-full max-w-4xl rounded-2xl border border-berry-100 bg-white shadow-2xl shadow-berry-200/40">
      {/* browser chrome */}
      <div className="flex items-center gap-2 rounded-t-2xl border-b border-berry-100 bg-berry-50/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-berry-200" />
        <span className="h-3 w-3 rounded-full bg-berry-300" />
        <span className="h-3 w-3 rounded-full bg-berry-400" />
        <div className="mx-auto flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs text-ink-600">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          app.wazzaberry.com
        </div>
      </div>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[180px_1fr]">
        {/* sidebar */}
        <div className="hidden border-r border-berry-100 p-4 sm:block">
          {["Warm leads", "Campaigns", "Inbox", "Analytics", "Settings"].map((item, i) => (
            <div
              key={item}
              className={`mb-1 rounded-lg px-3 py-2 text-xs font-medium ${
                i === 0 ? "bg-berry-50 text-berry-700" : "text-ink-600"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        {/* lead list */}
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-900">
              Today&apos;s warm leads
            </span>
            <span className="relative flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Agent running
            </span>
          </div>
          {leads.map((l) => (
            <div
              key={l.name}
              className="mb-2 flex items-center justify-between rounded-xl border border-berry-100/80 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-berry-100 text-xs font-bold text-berry-700">
                  {l.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink-900">{l.name}</div>
                  <div className="text-[11px] text-ink-600">{l.company}</div>
                </div>
              </div>
              <span className="hidden rounded-full bg-berry-50 px-2.5 py-1 text-[11px] text-berry-700 md:block">
                {l.signal}
              </span>
              <span className="text-xs font-bold text-berry-600">{l.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      {/* soft gradient backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_50%_at_50%_0%,#ffe0e7_0%,transparent_70%)]" />

      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-berry-200 bg-white px-4 py-1.5 text-xs font-medium text-berry-700 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-berry-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-berry-500" />
          </span>
          Now in public beta
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-ink-900 sm:text-6xl">
          Your AI agent finds{" "}
          <span className="bg-gradient-to-r from-berry-600 to-berry-400 bg-clip-text text-transparent">
            ready-to-buy leads
          </span>{" "}
          and reaches out for you.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-600">
          Drop in your website URL. WazzaBerry learns what you sell, hunts down
          your highest-intent prospects, and starts personalised conversations
          across email and social — completely on autopilot.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/app"
            className="rounded-full bg-berry-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-berry-600/25 transition hover:-translate-y-0.5 hover:bg-berry-700"
          >
            Launch my agent for free
          </Link>
          <Link
            href="/#how-it-works"
            className="rounded-full border border-berry-200 bg-white px-8 py-4 text-base font-semibold text-ink-900 transition hover:border-berry-400"
          >
            See how it works
          </Link>
        </div>

        <p className="mt-6 text-sm text-ink-600">
          Free early access · Live in 5 minutes · No credit card required
        </p>
      </div>

      <MockDashboard />
    </section>
  );
}
