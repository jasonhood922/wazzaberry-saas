"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function UserMenu({ email }: { email: string | null }) {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!email) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium text-ink-600 hover:text-berry-600"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-berry-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-berry-700"
        >
          Sign up free
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-ink-600 sm:block">{email}</span>
      <button
        onClick={logout}
        className="rounded-full border border-berry-200 px-4 py-2 text-xs font-semibold text-ink-900 transition hover:border-berry-400"
      >
        Log out
      </button>
    </div>
  );
}
