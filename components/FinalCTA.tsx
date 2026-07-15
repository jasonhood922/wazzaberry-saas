import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6" id="early-access">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-berry-500 via-berry-600 to-berry-800 px-8 py-20 text-center shadow-2xl shadow-berry-600/30">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Your next <span className="text-berry-200">10 customers</span> are
          already out there.
        </h2>
        <p className="mt-4 text-lg text-berry-100">
          Join the early-access list and let your agent go find them.
        </p>
        <WaitlistForm />
        <p className="mt-6 text-sm text-berry-200">
          Free early access · Live in 5 minutes · Or{" "}
          <Link href="/app" className="underline decoration-berry-300 underline-offset-2 hover:text-white">
            explore the demo
          </Link>{" "}
          first
        </p>
      </div>
    </section>
  );
}
