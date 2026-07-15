import { INTEGRATIONS } from "@/lib/site";

export default function Integrations() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6" id="integrations">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Plays nicely with the tools you already use.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-600">
          Native connections to your CRM, Claude, and internal tooling — no
          manual wiring required.
        </p>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {INTEGRATIONS.map((name) => (
            <span
              key={name}
              className="rounded-2xl border border-berry-100 bg-cream px-5 py-3 text-sm font-semibold text-ink-900 shadow-sm transition hover:-translate-y-0.5 hover:border-berry-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
