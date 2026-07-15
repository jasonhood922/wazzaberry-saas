"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Settings({
  email,
  hasAgent,
}: {
  email: string;
  hasAgent: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [pwStatus, setPwStatus] = useState<"idle" | "busy" | "done" | "error">(
    "idle"
  );
  const [pwMessage, setPwMessage] = useState("");
  const [confirmRetire, setConfirmRetire] = useState(false);
  const [retiring, setRetiring] = useState(false);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwStatus("busy");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setPwStatus("error");
      setPwMessage(error.message);
      return;
    }
    setPwStatus("done");
    setPassword("");
  }

  async function retireAgent() {
    setRetiring(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("agents").delete().eq("user_id", user.id);
      router.push("/app");
      router.refresh();
      return;
    }
    setRetiring(false);
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-extrabold text-ink-900">Settings</h1>

      <section className="mt-6 rounded-2xl border border-berry-100 bg-white p-6">
        <h2 className="font-bold text-ink-900">Account</h2>
        <p className="mt-1 text-sm text-ink-600">
          Signed in as <strong>{email}</strong>
        </p>

        <form onSubmit={changePassword} className="mt-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-600">
            New password
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPwStatus("idle");
              }}
              placeholder="At least 8 characters"
              className="mt-1.5 w-full rounded-xl border border-berry-200 px-4 py-3 text-sm font-normal normal-case tracking-normal text-ink-900 outline-none transition focus:border-berry-500 focus:ring-2 focus:ring-berry-100"
            />
          </label>
          {pwStatus === "error" && (
            <p className="mt-3 text-sm text-berry-700">{pwMessage}</p>
          )}
          {pwStatus === "done" && (
            <p className="mt-3 text-sm text-green-700">✓ Password updated.</p>
          )}
          <button
            type="submit"
            disabled={pwStatus === "busy"}
            className="mt-4 rounded-full bg-berry-600 px-6 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-berry-700 disabled:opacity-50"
          >
            {pwStatus === "busy" ? "Updating…" : "Update password"}
          </button>
        </form>
      </section>

      <section className="mt-6 rounded-2xl border border-berry-100 bg-white p-6">
        <h2 className="font-bold text-ink-900">Your agent</h2>
        {hasAgent ? (
          <>
            <p className="mt-1 text-sm text-ink-600">
              Retiring your agent deletes its configuration. Your account and
              login stay intact — you can set up a new agent any time.
            </p>
            {!confirmRetire ? (
              <button
                onClick={() => setConfirmRetire(true)}
                className="mt-4 rounded-full border border-berry-300 px-6 py-2.5 text-sm font-semibold text-berry-700 transition hover:bg-berry-50"
              >
                Retire agent…
              </button>
            ) : (
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={retireAgent}
                  disabled={retiring}
                  className="rounded-full bg-berry-700 px-6 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-berry-800 disabled:opacity-50"
                >
                  {retiring ? "Retiring…" : "Yes, retire my agent"}
                </button>
                <button
                  onClick={() => setConfirmRetire(false)}
                  className="text-sm font-medium text-ink-600 hover:text-ink-900"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="mt-1 text-sm text-ink-600">
            No agent configured yet — run{" "}
            <a href="/app/onboarding" className="font-semibold text-berry-600 hover:underline">
              agent setup
            </a>{" "}
            to launch one.
          </p>
        )}
      </section>
    </div>
  );
}
