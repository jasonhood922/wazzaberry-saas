import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-berry-500 via-berry-600 to-berry-800 px-8 py-20 text-center shadow-2xl shadow-berry-600/30">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Your next <span className="text-berry-200">10 customers</span> are
          already out there.
        </h2>
        <p className="mt-4 text-lg text-berry-100">
          Let your agent go find them.
        </p>
        <Link
          href="/app"
          className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-berry-700 shadow-xl transition hover:-translate-y-0.5"
        >
          Launch my agent for free
        </Link>
        <p className="mt-6 text-sm text-berry-200">
          Free trial · Live in 5 minutes · Cancel anytime
        </p>
      </div>
    </section>
  );
}
