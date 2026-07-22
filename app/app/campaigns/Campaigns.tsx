"use client";

import { useEffect, useState } from "react";
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

  // Re-sync when router.refresh() delivers fresh server props — useState
  // alone would keep showing the initial snapshot.
  const realKey = JSON.stringify(realCampaigns);
  useEffect(() => {
    setCampaigns(realCampaigns.length > 0 ? mapped : INITIAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realKey]);

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newChannels, setNewChannels] = useState<string[]>(["Email"]);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  const toggleNewChannel = (c: string) =>
    setNewChannels((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newChannels.length === 0) return;
    setCreating(true);
    setFormError("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setFormError("Sign in to create campaigns.");
      setCreating(false);
      return;
    }
    const { error } = await supabase.from("campaigns").insert({
      user_id: user.id,
      name: newName.trim(),
      channels: newChannels,
      status: "running",
    });
    if (error) {
      setFormError(error.message);
      setCreating(false);
      return;
    }
    setNewName("");
    setNewChannels(["Email"]);
    setShowForm(false);
    setCreating(false);
    router.refresh();
  };

  const removeCampaign = async (id: number) => {
    const target = campaigns.find((c) => c.id === id);
    if (!usingReal || !target?.dbId) return;
    setCampaigns((cs) => cs.filter((c) => c.id !== id));
    const supabase = createClient();
    await supabase.from("campaigns").delete().eq("id", target.dbId);
    router.refresh();
  };

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
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            {campaigns.filter((c) => c.running).length} running
          </span>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-full bg-berry-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition hover:bg-berry-700"
          >
            {showForm ? "Cancel" : "+ New campaign"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={createCampaign}
          className="mb-6 rounded-2xl border border-berry-100 bg-white p-6"
        >
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-600">
            Campaign name
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Competitor switchers — Q3"
              className="mt-1.5 w-full rounded-xl border border-berry-200 px-4 py-3 text-sm font-normal normal-case tracking-normal text-ink-900 outline-none transition focus:border-berry-500 focus:ring-2 focus:ring-berry-100"
            />
          </label>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-600">
            Channels
          </p>
          <div className="mt-2 flex gap-2">
            {["Email", "Social"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleNewChannel(c)}
                className={`rounded-full border-2 px-4 py-1.5 text-xs font-semibold transition ${
                  newChannels.includes(c)
                    ? "border-berry-600 bg-berry-50 text-berry-700"
                    : "border-berry-100 text-ink-600 hover:border-berry-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          {formError && (
            <p className="mt-3 text-sm text-berry-700">{formError}</p>
          )}
          <button
            type="submit"
            disabled={creating || !newName.trim() || newChannels.length === 0}
            className="mt-5 rounded-full bg-berry-600 px-6 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-berry-700 disabled:opacity-50"
          >
            {creating ? "Creating…" : "Create campaign"}
          </button>
        </form>
      )}

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
                <div className="flex items-center gap-2">
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
                  {usingReal && (
                    <button
                      onClick={() => removeCampaign(c.id)}
                      aria-label={`Delete ${c.name}`}
                      className="rounded-full border border-berry-200 px-3 py-2 text-xs font-semibold text-ink-600 transition hover:border-berry-400 hover:text-berry-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
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
