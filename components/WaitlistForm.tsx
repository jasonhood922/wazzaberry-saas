"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <p className="mx-auto mt-8 max-w-md rounded-full bg-white/15 px-6 py-4 text-sm font-semibold text-white">
        ✓ You&apos;re on the list — we&apos;ll be in touch when your agent is
        ready.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Work email"
        className="flex-1 rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 text-sm text-white placeholder-berry-200 outline-none transition focus:border-white"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-white px-8 py-4 text-sm font-bold text-berry-700 shadow-xl transition enabled:hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : "Get early access"}
      </button>
      {status === "error" && (
        <p className="text-sm text-berry-100 sm:absolute sm:mt-16">{message}</p>
      )}
    </form>
  );
}
