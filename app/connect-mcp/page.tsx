import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Connect Claude via MCP — WazzaBerry",
  description:
    "Drive your WazzaBerry sales agent straight from Claude using the Model Context Protocol.",
};

const STEPS = [
  {
    num: "01",
    title: "Grab your MCP endpoint",
    body: "In WazzaBerry go to Settings → Integrations → MCP and copy your personal server URL and API key.",
  },
  {
    num: "02",
    title: "Add it to Claude",
    body: "In Claude's connector settings, add a custom connector and paste your WazzaBerry MCP URL. Approve the connection once.",
  },
  {
    num: "03",
    title: "Run outbound in plain English",
    body: "Ask Claude things like \"show me today's warmest leads\" or \"draft follow-ups for everyone who replied this week\" — the agent does the rest.",
  },
];

const CAPABILITIES = [
  "List and filter warm leads by score, signal, or segment",
  "Trigger or pause outreach campaigns",
  "Draft and queue personalised follow-ups",
  "Pull campaign performance and benchmarks",
  "Sync lead activity into your CRM",
];

export default function ConnectMcpPage() {
  return (
    <main>
      <Navbar />
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            Drive your agent from{" "}
            <span className="text-berry-600">Claude</span> with MCP
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            WazzaBerry ships a native Model Context Protocol server, so your AI
            assistant can query leads, launch campaigns, and draft replies —
            straight from the chat you already work in.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-6">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="flex gap-6 rounded-3xl border border-berry-100 bg-white p-8"
            >
              <span className="font-mono text-3xl font-extrabold text-berry-300">
                {s.num}
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-ink-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-berry-50 p-8">
          <h2 className="text-xl font-bold text-ink-900">
            What Claude can do once connected
          </h2>
          <ul className="mt-4 space-y-2">
            {CAPABILITIES.map((c) => (
              <li key={c} className="flex gap-2 text-ink-600">
                <span className="text-berry-600">✓</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
