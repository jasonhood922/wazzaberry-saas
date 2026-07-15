"use client";

import { useState } from "react";
import Link from "next/link";
import type { AgentConfig } from "./page";

type Lead = {
  name: string;
  company: string;
  role: string;
  score: number;
  signal: string;
  channel: "Email" | "Social";
  status: "Queued" | "Contacted" | "Replied" | "Meeting booked";
};

const LEADS: Lead[] = [
  { name: "Ava Torres", company: "Northwind Labs", role: "VP Sales", score: 94, signal: "Visited pricing page twice", channel: "Email", status: "Meeting booked" },
  { name: "Liam Patel", company: "Quartz CRM", role: "Founder", score: 91, signal: "Engaged with competitor content", channel: "Social", status: "Replied" },
  { name: "Emma Fischer", company: "Draftly", role: "Head of Growth", score: 88, signal: "Started following your company", channel: "Social", status: "Contacted" },
  { name: "Noah Kim", company: "Signalhouse", role: "CRO", score: 85, signal: "Hiring 3 SDRs this month", channel: "Email", status: "Contacted" },
  { name: "Olivia Brandt", company: "Fathomly", role: "CEO", score: 83, signal: "Lookalike of your best customer", channel: "Email", status: "Queued" },
  { name: "Ethan Ross", company: "Beacon Analytics", role: "COO", score: 79, signal: "Active in your category this week", channel: "Social", status: "Queued" },
  { name: "Mia Silva", company: "Loopline", role: "VP Marketing", score: 76, signal: "Job change 3 weeks ago", channel: "Email", status: "Queued" },
];

const KPIS = [
  { label: "Warm leads this week", value: "128", delta: "+22%" },
  { label: "Messages sent", value: "342", delta: "+8%" },
  { label: "Reply rate", value: "18.4%", delta: "+3.1pt" },
  { label: "Meetings booked", value: "11", delta: "+4" },
];

const STATUS_STYLES: Record<Lead["status"], string> = {
  "Queued": "bg-gray-100 text-gray-600",
  "Contacted": "bg-blue-50 text-blue-700",
  "Replied": "bg-amber-50 text-amber-700",
  "Meeting booked": "bg-green-50 text-green-700",
};

export default function Dashboard({
  agent = null,
  signedIn = false,
}: {
  agent?: AgentConfig | null;
  signedIn?: boolean;
}) {
  const [filter, setFilter] = useState<"All" | Lead["channel"]>("All");
  const leads = LEADS.filter((l) => filter === "All" || l.channel === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">
            Good morning 👋
          </h1>
          <p className="text-sm text-ink-600">
            {agent
              ? `Your agent is set up for ${agent.website} — ${agent.mode} mode on ${agent.channels.join(" + ")}.`
              : "Your agent contacted 46 prospects overnight. 3 replies are waiting."}
          </p>
        </div>
        {agent ? (
          <span className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Agent {agent.status}
          </span>
        ) : signedIn ? (
          <Link
            href="/app/onboarding"
            className="rounded-full bg-berry-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition hover:bg-berry-700"
          >
            Set up your agent →
          </Link>
        ) : (
          <span className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Agent running
          </span>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-2xl border border-berry-100 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-600">
              {k.label}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-ink-900">{k.value}</span>
              <span className="text-xs font-bold text-green-600">{k.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-berry-100 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-berry-100 px-5 py-4">
          <h2 className="font-bold text-ink-900">Warm leads</h2>
          <div className="flex gap-1 rounded-full bg-berry-50 p-1">
            {(["All", "Email", "Social"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  filter === f ? "bg-white text-berry-700 shadow-sm" : "text-ink-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-berry-100 text-xs uppercase tracking-wider text-ink-600">
                <th className="px-5 py-3 font-semibold">Prospect</th>
                <th className="px-5 py-3 font-semibold">Signal</th>
                <th className="px-5 py-3 font-semibold">Channel</th>
                <th className="px-5 py-3 font-semibold">Score</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.name} className="border-b border-berry-50 last:border-0 hover:bg-berry-50/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-berry-100 text-xs font-bold text-berry-700">
                        {l.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div>
                        <div className="font-semibold text-ink-900">{l.name}</div>
                        <div className="text-xs text-ink-600">
                          {l.role} · {l.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-600">{l.signal}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-berry-50 px-2.5 py-1 text-xs font-medium text-berry-700">
                      {l.channel}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono font-bold text-berry-600">{l.score}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[l.status]}`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink-600/60">
        This is a static demo with sample data. Wire it to a real backend before
        launch — see PROJECT_LOG.md for the production checklist.
      </p>
    </div>
  );
}
