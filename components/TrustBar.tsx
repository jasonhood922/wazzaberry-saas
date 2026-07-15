const COMPANIES = [
  "Loopline", "Fieldnote", "BrightOps", "Kelpline", "Signalhouse",
  "Draftly", "Quartz", "Northwind", "Beacon", "Fathomly",
];

export default function TrustBar() {
  return (
    <section className="border-y border-berry-100 bg-white py-8">
      <p className="text-center text-sm font-medium uppercase tracking-widest text-ink-600">
        Trusted by 1,500+ sales &amp; GTM teams worldwide
      </p>
      <div className="relative mt-6 overflow-hidden">
        <div className="animate-marquee flex w-max gap-14">
          {[...COMPANIES, ...COMPANIES].map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="text-xl font-bold tracking-tight text-ink-900/25"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
