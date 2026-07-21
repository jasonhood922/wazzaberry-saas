import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { list } from "@vercel/blob";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Waitlist — WazzaBerry",
};

function isAdmin(email: string | undefined): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return !!email && admins.includes(email.toLowerCase());
}

export default async function WaitlistAdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdmin(user.email)) redirect("/app");

  let entries: { email: string; joinedAt: string }[] = [];
  let error = "";
  try {
    const { blobs } = await list({ prefix: "waitlist/" });
    entries = blobs
      .map((b) => {
        const file = b.pathname.replace("waitlist/", "");
        const m = file.match(/^(.+)-(\d{13})\.json$/);
        return {
          email: m ? decodeURIComponent(m[1]) : file,
          joinedAt: new Date(
            m ? Number(m[2]) : b.uploadedAt
          ).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
        };
      })
      .reverse();
  } catch {
    error = "Could not load the waitlist store.";
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-ink-900">Waitlist</h1>
      <p className="mt-1 text-sm text-ink-600">
        {entries.length} signup{entries.length === 1 ? "" : "s"} · admin-only
        view
      </p>

      {error && <p className="mt-6 text-sm text-berry-700">{error}</p>}

      {!error && entries.length === 0 && (
        <p className="mt-6 rounded-2xl border border-berry-100 bg-white p-6 text-sm text-ink-600">
          No signups yet — share the site and they&apos;ll appear here.
        </p>
      )}

      {entries.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-berry-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-berry-100 text-xs uppercase tracking-wider text-ink-600">
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i} className="border-b border-berry-50 last:border-0">
                  <td className="px-5 py-3 font-medium text-ink-900">{e.email}</td>
                  <td className="px-5 py-3 text-ink-600">{e.joinedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
