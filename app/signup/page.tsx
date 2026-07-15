import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign up — WazzaBerry",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Logo className="h-9 w-9" />
        <span className="text-xl font-bold text-ink-900">WazzaBerry</span>
      </Link>
      <AuthForm mode="signup" />
      <p className="mt-6 text-sm text-ink-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-berry-600 hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
