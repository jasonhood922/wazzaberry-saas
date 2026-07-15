"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Stats() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            1,500 teams retired manual prospecting. Their agents run outbound
            now.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 text-center sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`transition-all duration-700 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="bg-gradient-to-r from-berry-600 to-berry-400 bg-clip-text font-mono text-5xl font-extrabold text-transparent">
                {s.value}
              </div>
              <p className="mt-3 text-ink-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
