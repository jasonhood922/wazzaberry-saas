"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { DbCampaign } from "./page";

type Campaign = {
  id: number;
  dbId?: string;
  name: string;
  agent: string;
  channels: string[];
  contacted: number;
  replies: number;
  meetings: number;
  benchmark: string;
  running: boolean;
};

const INITIAL: Campaign[] = [
  {
    id: 1,
    name: "Competitor switchers — Q3",
    agent: "Agent 1",
    channels: ["Email", "Social"],
    contacted: 412,
    replies: 78,
    meetings: 9,
    benchmark: "Top 10% in your industry",
    running: true,
  },
  {
    id: 2,
    name: "Lookalikes of best customers",
    agent: "Agent 1",
    channels: ["Email"],
    contacted: 286,
    replies: 41,
    meetings: 5,
    benchmark: "Above average (+18%)",
    running: true,
  },
  {
    id: 3,
    name: "Hiring-signal outreach",
    agent: "Agent 2",
    channels: ["Social"],
    contacted: 158,
    replies: 22,
    meetings: 2,
    benchmark: "Learning — week 1 of 3",
    running: false,
  },
];

export default function Campaigns({
  realCampaigns = [],
}: {
  realCampaigns?: DbCampaign[];
}) {
  const router = useRouter();
  const usingReal = realCampaigns.length > 0;
  const mapped: Campaign[] = realCampaigns.map((c, i) => ({
    id: i + 1,
    dbId: c.id,
    name: c.name,
    agent: "Agent 1",
    channels: c.channels,
    contacted: 0,
    replies: 0,
    meetings: 0,
    benchmark: "Gathering data",
    running: c.status === "running",
  }));
  const [campaigns, setCampaigns] = useState(usingReal ? mapped : INITIAL);

  const toggle = async (id: number) => {
    const target = campaigns.find((c) => c.id === id);
    setCampaigns((cs) =>
      cs.map((c) => (c.id === id ? { ...c, running: !c.running } : c))
    );
    if (usingReal && target?.dbId) {
      const supabase = createClient();
      await supabase
        .from("campaigns")
        .update({ status: target.running ? "paused" : "running" })
        .eq("id", target.dbId);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-ink-900">
            Campaigns
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                usingReal
                  ? "bg-green-50 text-green-700"
                  : "bg-berry-50 text-berry-700"
              }`}
            >
              {usingReal ? "Live data" : "Sample data"}
            </span>
          </h1>
          <p className="text-sm text-ink-600">
            Your agents adjust these automatically as they learn what converts.
          </p>
        </div>
        <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
          {campaigns.filter((c) => c.running).length} running
        </span>
      </div>

      <div className="space-y-4">
        {campaigns.map((c) => {
          const replyRate =
            c.contacted > 0
              ? ((c.replies / c.contacted) * 100).toFixed(1)
              : "0.0";
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-berry-100 bg-white p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-bold text-ink-900">{c.name}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        c.running
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.running ? "Running" : "Paused"}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-ink-600">
                    {c.agent}
                    {c.channels.map((ch) => (
                      <span
                        key={ch}
                        className="rounded-full bg-berry-50 px-2 py-0.5 text-[10px] font-medium text-berry-700"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => toggle(c.id)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                    c.running
                      ? "bg-berry-50 text-berry-700 hover:bg-berry-100"
                      : "bg-berry-600 text-white hover:bg-berry-700"
                  }`}
                >
                  {c.running ? "Pause" : "Resume"}
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-600">
                    Contacted
                  </div>
                  <div className="mt-1 font-mono text-xl font-extrabold text-ink-900">
                    {c.contacted}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-600">
                    Replies
                  </div>
                  <div className="mt-1 font-mono text-xl font-extrabold text-ink-900">
                    {c.replies}{" "}
                    <span className="text-xs font-semibold text-berry-600">
                      ({replyRate}%)
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-600">
                    Meetings
                  </div>
                  <div className="mt-1 font-mono text-xl font-extrabold text-berry-600">
                    {c.meetings}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-600">
                    Benchmark
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink-900">
                    {c.benchmark}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-ink-600/60">
        Demo data — pause/resume is local only.
      </p>
    </div>
  );
}
