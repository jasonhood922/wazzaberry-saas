"use client";

import { useState } from "react";

type Thread = {
  id: number;
  name: string;
  company: string;
  channel: "Email" | "Social";
  time: string;
  message: string;
  draft: string;
};

const THREADS: Thread[] = [
  {
    id: 1,
    name: "Ava Torres",
    company: "Northwind Labs",
    channel: "Email",
    time: "08:12",
    message:
      "Interesting timing — we were literally discussing outbound tooling in Monday's pipeline review. What does onboarding look like for a team of six?",
    draft:
      "Great to hear, Ava! For a team of six, onboarding is one 30-minute session: connect your inboxes, confirm the ICP the agent inferred, and it starts prospecting the same day. Happy to walk your team through it live — does Thursday 10:00 or 14:00 work better?",
  },
  {
    id: 2,
    name: "Liam Patel",
    company: "Quartz CRM",
    channel: "Social",
    time: "07:45",
    message:
      "Saw your note about intent signals. We're on a competitor right now but renewal is coming up — what makes you different?",
    draft:
      "Thanks for the candour, Liam. Short version: most tools help you send more; we decide who's worth messaging in the first place, using live buying signals. Teams switching from your current tool usually see reply rates double in week two. Want a 15-minute teardown of how it'd work on your pipeline before your renewal date?",
  },
  {
    id: 3,
    name: "Emma Fischer",
    company: "Draftly",
    channel: "Social",
    time: "Yesterday",
    message:
      "Not the right quarter for us budget-wise, but circle back in October?",
    draft:
      "Completely understood, Emma — I'll check back in early October. In the meantime I'll send over the two-page benchmark report for your segment so you have numbers ready when budget opens up. Good luck with the quarter!",
  },
];

export default function Inbox() {
  const [selected, setSelected] = useState(1);
  const [drafts, setDrafts] = useState<Record<number, string>>(
    Object.fromEntries(THREADS.map((t) => [t.id, t.draft]))
  );
  const [sent, setSent] = useState<number[]>([]);

  const thread = THREADS.find((t) => t.id === selected)!;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Inbox</h1>
          <p className="text-sm text-ink-600">
            Every reply arrives with a tailored response already drafted.
          </p>
        </div>
        <span className="rounded-full bg-berry-50 px-4 py-2 text-sm font-semibold text-berry-700">
          {THREADS.length - sent.length} awaiting reply
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* thread list */}
        <div className="space-y-2">
          {THREADS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                selected === t.id
                  ? "border-berry-600 bg-white shadow-sm"
                  : "border-berry-100 bg-white/60 hover:border-berry-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ink-900">{t.name}</span>
                <span className="text-[11px] text-ink-600">{t.time}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-600">
                {t.company}
                <span className="rounded-full bg-berry-50 px-2 py-0.5 text-[10px] font-medium text-berry-700">
                  {t.channel}
                </span>
                {sent.includes(t.id) && (
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                    Replied
                  </span>
                )}
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-ink-600">{t.message}</p>
            </button>
          ))}
        </div>

        {/* conversation */}
        <div className="rounded-2xl border border-berry-100 bg-white p-6">
          <div className="flex items-center gap-3 border-b border-berry-50 pb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-berry-100 text-sm font-bold text-berry-700">
              {thread.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <div>
              <div className="text-sm font-bold text-ink-900">{thread.name}</div>
              <div className="text-xs text-ink-600">{thread.company}</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl rounded-tl-sm bg-berry-50/70 p-4 text-sm text-ink-900">
            {thread.message}
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-berry-700">
              <span>✨ Agent-drafted reply</span>
              <span className="rounded-full bg-berry-50 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal">
                edit freely
              </span>
            </div>
            <textarea
              value={drafts[thread.id]}
              onChange={(e) =>
                setDrafts((d) => ({ ...d, [thread.id]: e.target.value }))
              }
              rows={5}
              className="w-full rounded-2xl border border-berry-200 p-4 text-sm text-ink-900 outline-none transition focus:border-berry-500 focus:ring-2 focus:ring-berry-100"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-ink-600/60">
                Demo only — nothing is actually sent.
              </span>
              <button
                onClick={() => setSent((s) => [...new Set([...s, thread.id])])}
                disabled={sent.includes(thread.id)}
                className="rounded-full bg-berry-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition enabled:hover:bg-berry-700 disabled:opacity-40"
              >
                {sent.includes(thread.id) ? "Sent ✓" : "Send reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
