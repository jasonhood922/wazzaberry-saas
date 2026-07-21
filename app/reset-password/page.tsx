import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import ResetForm from "./ResetForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Choose a new password — WazzaBerry",
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The reset link must have established a recovery session first.
  if (!user) redirect("/forgot-password");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Logo className="h-9 w-9" />
        <span className="text-xl font-bold text-ink-900">WazzaBerry</span>
      </Link>
      <ResetForm />
    </main>
  );
}
