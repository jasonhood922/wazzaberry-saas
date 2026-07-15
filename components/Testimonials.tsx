/* eslint-disable @next/next/no-img-element */
import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            The experience we&apos;re building
          </h2>
          <p className="mt-3 text-ink-600">
            Concept scenarios from our design-partner program — real customer
            stories will replace these as early access rolls out.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border border-berry-100 bg-white p-8 shadow-sm"
            >
              <blockquote className="text-lg font-medium text-ink-900">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name} portrait`}
                  className="h-11 w-11 rounded-full border border-berry-100 object-cover"
                />
                <div>
                  <div className="text-sm font-bold text-ink-900">{t.name}</div>
                  <div className="text-xs text-ink-600">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-600/60">
          Illustrative testimonials from our design partners program. Portraits
          are AI-generated.
        </p>
      </div>
    </section>
  );
}
