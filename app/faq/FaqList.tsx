"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How is WazzaBerry different from classic automation tools?",
    a: "Automation tools help you send more messages. WazzaBerry decides who deserves a message in the first place, when to send it, and what it should say. Rather than uploading cold lists and blasting generic sequences, your agent watches live buying and social signals, matches every prospect against your ideal customer profile, scores them, and only then launches relevant, personalised outreach. Volume tools execute your outbound — WazzaBerry runs it, and gets smarter every week.",
  },
  {
    q: "Is WazzaBerry just another LinkedIn tool?",
    a: "No. Social channels are one lane your agent drives in, but WazzaBerry is a full AI go-to-market agent. It sources relevant prospects, detects intent, explains why each lead matters, prioritises who to contact first, writes personalised messages for email and social, and keeps qualified conversations flowing — without you juggling lists, tools, and follow-ups.",
  },
  {
    q: "Who is it for — founders, sales teams, or agencies?",
    a: "Lean B2B teams that want more pipeline without more manual grind. Founders use it to build pipeline before hiring SDRs; sales teams use it so reps spend time in conversations instead of prospecting; agencies run outbound for multiple clients from one place; growth teams turn market signals into qualified opportunities.",
  },
  {
    q: "How does WazzaBerry find high-intent leads?",
    a: "Your agent monitors signals that suggest someone is in the market: engagement with your content or your competitors', profile visits, new followers, job changes, hiring activity, topic-level activity in your space, and lookalikes modelled on your best customers. Each lead is then enriched, checked against your ICP, scored, and routed into the right outreach workflow.",
  },
  {
    q: "What does the agent actually do day to day?",
    a: "It moves you from \"who should we contact?\" to \"here are the right people to reach today, and here's the opening message.\" Concretely: it finds prospects matching your ICP, detects buying signals, enriches contact data, scores and prioritises, writes personalised messages, launches multichannel sequences, and surfaces the conversations worth your attention.",
  },
  {
    q: "Does it support multichannel outreach?",
    a: "Yes. Email and social touches run from the same workflow — connection requests, direct messages, email follow-ups, and conditional steps that adapt to how a prospect responds. The aim isn't to hit people on every channel; it's to use the right channel with the right context at the right time.",
  },
  {
    q: "Is it safe for my accounts?",
    a: "WazzaBerry is built with account safety as a first principle: human-like sending limits, smart pacing and delays, quality filters before any message leaves, and warm, intent-based targeting instead of mass volume. As with any outreach tooling, results and risk also depend on your own volume settings and message quality.",
  },
  {
    q: "What results can I realistically expect?",
    a: "It depends on your ICP, offer, and positioning. Teams targeting a clear ICP with real signals typically see higher acceptance rates, more replies from relevant prospects, more qualified demos from warm outbound, and hours per week returned to actual selling. WazzaBerry doesn't replace your strategy — it turns a good one into a repeatable engine.",
  },
  {
    q: "Do I still need SDRs?",
    a: "Not necessarily. Small teams use WazzaBerry to create pipeline without hiring. Existing teams use it to strip away list building, enrichment, and repetitive first-touch writing so reps can focus on conversations and closing.",
  },
  {
    q: "Do I need to bring my own lead lists?",
    a: "No. You can upload lists if you have them, but WazzaBerry is designed to source leads for you — continuously — using buying signals, social signals, lookalikes, enrichment, and ICP matching. You're never limited to a static database.",
  },
  {
    q: "Why is this better than just sending more volume?",
    a: "Volume only works when targeting and timing are right; pointed at the wrong people, more automation is just more noise. WazzaBerry optimises for relevance first — who fits, who's showing intent, who resembles your best customers, and what message makes sense for them right now. Fewer messages, better conversations.",
  },
];

export default function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-10 space-y-3">
      {FAQS.map((f, i) => (
        <div
          key={f.q}
          className="overflow-hidden rounded-2xl border border-berry-100 bg-white"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-ink-900">{f.q}</span>
            <span
              className={`text-berry-600 transition-transform ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-6 text-ink-600">{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
