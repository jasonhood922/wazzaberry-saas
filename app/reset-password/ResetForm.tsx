"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("busy");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
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
        Choose a new password
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        You&apos;re verified — set a fresh password for your account.
      </p>

      <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-ink-600">
        New password
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

      {status === "error" && <p className="mt-4 text-sm text-berry-700">{message}</p>}

      <button
        type="submit"
        disabled={status === "busy"}
        className="mt-6 w-full rounded-full bg-berry-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition enabled:hover:bg-berry-700 disabled:opacity-50"
      >
        {status === "busy" ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}
