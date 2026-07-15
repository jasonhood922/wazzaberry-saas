"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  {
    step: "1/4",
    title: "Spots and scores your hottest leads first",
    body: "Your agent watches for buying and social signals, grades every prospect against your ideal customer profile, and moves the likeliest buyers to the front of the queue before a single message goes out.",
    chips: ["Competitor engagement", "Follows your company", "Active in your market"],
  },
  {
    step: "2/4",
    title: "Only genuine buyers. Nothing else.",
    body: "Every lead is pre-screened against your ideal buyer profile, so your agent never burns a message on someone who was never going to purchase.",
    chips: ["ICP match", "Pre-qualified", "Zero cold lists"],
  },
  {
    step: "3/4",
    title: "Multichannel outreach that fills your calendar",
    body: "Your agent contacts prospects over email and social channels with AI-personalised messages, sequenced and coordinated automatically — no playbooks to build.",
    chips: ["Email", "Social", "Auto follow-ups"],
  },
  {
    step: "4/4",
    title: "Sharper every single week",
    body: "Your agent measures what converts, tunes itself automatically, and benchmarks your campaigns against the best performers in your industry.",
    chips: ["Learns", "Adapts", "Compounds"],
  },
];

export default function AgentCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="px-4 py-20 sm:px-6" id="agent">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Your sales agent runs 24/7. And gets sharper every week.
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            From surfacing the right leads to sending the right message — your
            agent covers the whole journey, automatically.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* text side */}
          <div>
            <span className="font-mono text-sm font-bold text-berry-600">
              {slide.step}
            </span>
            <h3 className="mt-2 text-2xl font-bold text-ink-900">{slide.title}</h3>
            <p className="mt-4 text-ink-600">{slide.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {slide.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-berry-200 bg-berry-50 px-3 py-1.5 text-xs font-medium text-berry-700"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.step}
                  onClick={() => setActive(i)}
                  aria-label={`Show slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-10 bg-berry-600" : "w-5 bg-berry-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* visual side */}
          <div className="relative flex h-72 items-center justify-center rounded-3xl border border-berry-100 bg-gradient-to-br from-berry-50 to-white sm:h-96">
            <div className="pulse-ring relative flex h-24 w-24 items-center justify-center rounded-full bg-berry-600 text-3xl shadow-xl shadow-berry-600/30">
              <span role="img" aria-label="berry radar">🍓</span>
            </div>
            {slide.chips.map((c, i) => (
              <span
                key={c}
                className="animate-float-slow absolute rounded-full border border-berry-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-900 shadow-md"
                style={{
                  top: `${18 + i * 26}%`,
                  left: i % 2 === 0 ? "8%" : undefined,
                  right: i % 2 === 1 ? "8%" : undefined,
                  animationDelay: `${i * 0.8}s`,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
