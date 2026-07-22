import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/berry-404.webp"
          alt="A berry searching with a magnifying glass"
          className="h-44 w-44 rounded-3xl object-cover"
        />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink-900">
          This page went cold.
        </h1>
        <p className="mt-3 max-w-md text-ink-600">
          Unlike your leads. The page you&apos;re after doesn&apos;t exist —
          but your agent is still out there working.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-berry-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/25 transition hover:bg-berry-700"
        >
          Back to the homepage
        </Link>
      </section>
      <Footer />
    </main>
  );
}
