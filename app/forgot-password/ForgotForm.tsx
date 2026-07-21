"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("busy");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
    });
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="w-full max-w-sm rounded-3xl border border-berry-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">
          ✉️
        </div>
        <h1 className="mt-4 text-xl font-extrabold text-ink-900">Check your inbox</h1>
        <p className="mt-2 text-sm text-ink-600">
          If an account exists for <strong>{email}</strong>, a reset link is on
          its way. It expires after one hour.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm rounded-3xl border border-berry-100 bg-white p-8 shadow-sm"
    >
      <h1 className="text-xl font-extrabold text-ink-900">Reset your password</h1>
      <p className="mt-1 text-sm text-ink-600">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-ink-600">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-1.5 w-full rounded-xl border border-berry-200 px-4 py-3 text-sm font-normal normal-case tracking-normal text-ink-900 outline-none transition focus:border-berry-500 focus:ring-2 focus:ring-berry-100"
        />
      </label>

      {status === "error" && <p className="mt-4 text-sm text-berry-700">{message}</p>}

      <button
        type="submit"
        disabled={status === "busy"}
        className="mt-6 w-full rounded-full bg-berry-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition enabled:hover:bg-berry-700 disabled:opacity-50"
      >
        {status === "busy" ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
