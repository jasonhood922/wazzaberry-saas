const CAPABILITIES = [
  "Intent signals", "Lookalike audiences", "Lead scoring", "ICP filtering",
  "AI copywriting", "Auto follow-ups", "Unified inbox", "Pre-drafted replies",
  "Weekly self-tuning", "CRM & MCP integrations",
];

export default function TrustBar() {
  return (
    <section className="border-y border-berry-100 bg-white py-8">
      <p className="text-center text-sm font-medium uppercase tracking-widest text-ink-600">
        Built for founders, sales &amp; GTM teams — now onboarding early access
      </p>
      <div className="relative mt-6 overflow-hidden">
        <div className="animate-marquee flex w-max gap-14">
          {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
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
