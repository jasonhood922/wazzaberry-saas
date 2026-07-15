"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LEARN_STEPS = [
  "Reading your website…",
  "Working out what you sell…",
  "Identifying your ideal buyer…",
  "Scanning live buying signals in your market…",
  "Drafting your outreach voice…",
];

const INFERRED = {
  offer: "B2B SaaS platform for revenue teams",
  icp: "Founders, sales & growth leaders at 10–200 person B2B companies",
  tone: "Direct, friendly, benefit-led",
  signals: ["Competitor engagement", "Hiring activity", "Content engagement", "Lookalikes"],
};

export default function Wizard({
  initial = null,
}: {
  initial?: { website: string; channels: string[]; mode: string } | null;
}) {
  const router = useRouter();
  const isUpdate = !!initial;
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState(initial?.website ?? "");
  const [learnIdx, setLearnIdx] = useState(0);
  const [channels, setChannels] = useState<string[]>(
    initial?.channels ?? ["Email"]
  );
  const [mode, setMode] = useState<"Autopilot" | "Copilot">(
    initial?.mode === "Autopilot" ? "Autopilot" : "Copilot"
  );
  const [launched, setLaunched] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function launch() {
    setSaveError("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Anonymous visitors need an account before their agent can launch.
      router.push("/signup");
      return;
    }

    const { error } = await supabase.from("agents").upsert(
      {
        user_id: user.id,
        website: url.trim(),
        offer: INFERRED.offer,
        icp: INFERRED.icp,
        signals: INFERRED.signals,
        channels,
        mode,
        status: "running",
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setSaveError(error.message);
      return;
    }
    setLaunched(true);
  }

  // simulated learning progress
  useEffect(() => {
    if (step !== 1) return;
    if (learnIdx >= LEARN_STEPS.length) {
      const t = setTimeout(() => setStep(2), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLearnIdx((i) => i + 1), 900);
    return () => clearTimeout(t);
  }, [step, learnIdx]);

  useEffect(() => {
    if (!launched) return;
    const t = setTimeout(() => router.push("/app"), 1800);
    return () => clearTimeout(t);
  }, [launched, router]);

  const toggleChannel = (c: string) =>
    setChannels((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  return (
    <div className="mx-auto max-w-2xl">
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {["Website", "Learning", "Your ICP", "Channels", "Launch"].map((label, i) => (
          <div key={label} className="flex flex-1 flex-col gap-1.5">
            <div
              className={`h-1.5 rounded-full ${
                i <= step ? "bg-berry-600" : "bg-berry-100"
              }`}
            />
            <span
              className={`text-[11px] font-medium ${
                i <= step ? "text-berry-700" : "text-ink-600/50"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-berry-100 bg-white p-8 shadow-sm">
        {step === 0 && (
          <div>
            <h1 className="text-2xl font-extrabold text-ink-900">
              Enter your website
            </h1>
            <p className="mt-2 text-ink-600">
              Your agent reads it once and figures out what you sell, who buys
              it, and how to pitch it. No forms, no setup docs.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (url.trim()) {
                  setLearnIdx(0);
                  setStep(1);
                }
              }}
              className="mt-6 flex gap-3"
            >
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourcompany.com"
                className="flex-1 rounded-full border border-berry-200 px-5 py-3.5 text-sm outline-none transition focus:border-berry-500 focus:ring-2 focus:ring-berry-100"
              />
              <button
                type="submit"
                disabled={!url.trim()}
                className="rounded-full bg-berry-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition enabled:hover:bg-berry-700 disabled:opacity-40"
              >
                Continue →
              </button>
            </form>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-extrabold text-ink-900">
              Your agent is learning{" "}
              <span className="text-berry-600">{url.replace(/^https?:\/\//, "")}</span>
            </h1>
            <ul className="mt-6 space-y-3">
              {LEARN_STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm">
                  {i < learnIdx ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-700">
                      ✓
                    </span>
                  ) : i === learnIdx ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-berry-200 border-t-berry-600" />
                  ) : (
                    <span className="h-5 w-5 rounded-full border border-berry-100" />
                  )}
                  <span className={i <= learnIdx ? "text-ink-900" : "text-ink-600/50"}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-extrabold text-ink-900">
              Here&apos;s what your agent learned
            </h1>
            <p className="mt-2 text-ink-600">
              Tweak anything that&apos;s off — the agent keeps refining this as
              it works.
            </p>
            <dl className="mt-6 space-y-4">
              <div className="rounded-2xl bg-berry-50/60 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-berry-700">
                  What you sell
                </dt>
                <dd className="mt-1 text-sm text-ink-900">{INFERRED.offer}</dd>
              </div>
              <div className="rounded-2xl bg-berry-50/60 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-berry-700">
                  Ideal customer profile
                </dt>
                <dd className="mt-1 text-sm text-ink-900">{INFERRED.icp}</dd>
              </div>
              <div className="rounded-2xl bg-berry-50/60 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-berry-700">
                  Signals to watch
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {INFERRED.signals.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-berry-700 ring-1 ring-berry-200"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <button
              onClick={() => setStep(3)}
              className="mt-6 w-full rounded-full bg-berry-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition hover:bg-berry-700"
            >
              Looks right →
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-2xl font-extrabold text-ink-900">
              Channels &amp; control
            </h1>
            <p className="mt-2 text-ink-600">
              Where should your agent reach out, and how much autonomy does it
              get?
            </p>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                Channels
              </p>
              <div className="mt-3 flex gap-3">
                {["Email", "Social"].map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleChannel(c)}
                    className={`flex-1 rounded-2xl border-2 px-5 py-4 text-sm font-semibold transition ${
                      channels.includes(c)
                        ? "border-berry-600 bg-berry-50 text-berry-700"
                        : "border-berry-100 text-ink-600 hover:border-berry-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                Mode
              </p>
              <div className="mt-3 space-y-3">
                {(
                  [
                    ["Copilot", "You approve every message before it sends. Great for week one."],
                    ["Autopilot", "The agent sends on its own within your limits. Full hands-off."],
                  ] as const
                ).map(([m, desc]) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`w-full rounded-2xl border-2 p-4 text-left transition ${
                      mode === m
                        ? "border-berry-600 bg-berry-50"
                        : "border-berry-100 hover:border-berry-300"
                    }`}
                  >
                    <span className="text-sm font-bold text-ink-900">{m}</span>
                    <p className="mt-1 text-xs text-ink-600">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(4)}
              disabled={channels.length === 0}
              className="mt-6 w-full rounded-full bg-berry-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition enabled:hover:bg-berry-700 disabled:opacity-40"
            >
              Continue →
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            {!launched ? (
              <>
                <h1 className="text-2xl font-extrabold text-ink-900">
                  {isUpdate ? "Ready to update ✨" : "Ready to launch 🚀"}
                </h1>
                <p className="mx-auto mt-2 max-w-sm text-ink-600">
                  Your agent will {isUpdate ? "continue" : "start"} with{" "}
                  {channels.join(" + ")} outreach in {mode} mode, prospecting
                  around the clock.
                </p>
                <button
                  onClick={launch}
                  className="mt-8 rounded-full bg-berry-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-berry-600/30 transition hover:bg-berry-700"
                >
                  {isUpdate ? "Update my agent" : "Launch my agent"}
                </button>
                {saveError && (
                  <p className="mt-4 text-sm text-berry-700">{saveError}</p>
                )}
              </>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  ✓
                </div>
                <h1 className="mt-4 text-2xl font-extrabold text-ink-900">
                  Your agent is live
                </h1>
                <p className="mt-2 text-ink-600">
                  First warm leads land within hours. Taking you to your
                  dashboard…
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-ink-600/60">
        Launching saves your agent&apos;s setup to your account. No outreach is
        sent yet — browsing the steps stores nothing.
      </p>
    </div>
  );
}
