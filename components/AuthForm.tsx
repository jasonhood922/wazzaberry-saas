"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const supabase = createClient();

    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    router.push("/app");
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm rounded-3xl border border-berry-100 bg-white p-8 shadow-sm"
    >
      <h1 className="text-xl font-extrabold text-ink-900">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        {mode === "signup"
          ? "Your agent is 3 minutes away."
          : "Your agent kept working while you were gone."}
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

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-ink-600">
        Password
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          className="mt-1.5 w-full rounded-xl border border-berry-200 px-4 py-3 text-sm font-normal normal-case tracking-normal text-ink-900 outline-none transition focus:border-berry-500 focus:ring-2 focus:ring-berry-100"
        />
      </label>

      {error && <p className="mt-4 text-sm text-berry-700">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full rounded-full bg-berry-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition enabled:hover:bg-berry-700 disabled:opacity-50"
      >
        {busy ? "One moment…" : mode === "signup" ? "Create account" : "Log in"}
      </button>
    </form>
  );
}
