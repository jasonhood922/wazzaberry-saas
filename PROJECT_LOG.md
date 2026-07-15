# WazzaBerry — Project Log

**Product:** WazzaBerry — an AI sales agent that finds warm, ready-to-buy leads and runs multichannel outreach automatically.
**Started:** 2026-07-15
**Location:** `F:\Jason Hood\Claude code\WazzaBerry\wazzaberry-saas`
**Live:** https://wazzaberry-saas.vercel.app

---

## Stack
- Next.js 15+ (App Router) + TypeScript + Tailwind CSS v4.
- Fully static/SSG — no backend yet; deployed on Vercel.
- Shared marketing data (nav, stats, testimonials, pricing) in `lib/site.ts`.

## Pages
| Route | Purpose |
|---|---|
| `/` | Marketing page: hero + dashboard mockup, trust marquee, 4-slide agent carousel, 3-step how-it-works, feature grid (Lead discovery / Outreach / Learning / Control / Replies), stack-replacement card, animated stats, testimonials, integrations, pricing (Pro $99 + Custom), gradient CTA |
| `/faq` | 11-question accordion |
| `/affiliate` | 30% recurring affiliate program |
| `/connect-mcp` | "Drive your agent from Claude via MCP" guide |
| `/terms`, `/privacy`, `/legal-notice`, `/opt-out` | Legal set (placeholders — replace with lawyer-reviewed text before charging customers) |
| `/app` | Product demo (sample data): dashboard KPIs + warm-lead table, campaigns, unified inbox with agent-drafted replies, 5-step onboarding wizard |

## Brand
- Identity: dotted-berry + radar-arc mark. Canonical SVG in `components/Logo.tsx`; raster mark in `public/brand/logo.png`; favicon `app/icon.svg`; social card `public/og.png`.
- Palette and voice: see `BRAND.md`.
- Testimonial portraits are AI-generated and the site labels them as illustrative — replace with real customer quotes as they arrive.

## Deployment
- Vercel project: `jason-hood-team/wazzaberry-saas` (CLI deploys via `npx vercel --prod`).
- GitHub: `jasonhood922/wazzaberry-saas` (origin).
- Env var (Production): `NEXT_PUBLIC_SITE_URL=https://wazzaberry-saas.vercel.app` — drives sitemap/OG/robots URLs.
- Optional: connect the GitHub repo in Vercel project Settings → Git for auto-deploys on push.

## To run locally
```bash
npm install
npm run dev   # http://localhost:3000
```

## Production checklist (to run this as a real SaaS)
1. **Auth** — DONE (2026-07-15): Supabase Auth via `@supabase/ssr`. Project `wazzaberry` (ref `kkuxhlubynwbahukpjzk`, us-east-1) under jasonhood922's Supabase org. `/signup`, `/login`, logout in the app header; session-refresh middleware; `/app` shows the signed-in user (demo badge for anonymous visitors). Env vars `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` set locally (`.env.local`) and in Vercel Production. Note: `mailer_autoconfirm` is ON (no email verification) because no SMTP is configured — set up SMTP in Supabase and turn confirmations back on before public launch. DB password is in `.env.local`.
2. **Database** — Supabase Postgres is provisioned (same project); next: `agents`/`leads`/`campaigns` tables with RLS, persist onboarding data.
3. **Payments** — Stripe subscriptions for the Pro plan + customer portal.
4. **AI layer** — Anthropic API (Claude) for ICP inference, lead scoring, message and reply drafting. Needs `ANTHROPIC_API_KEY`.
5. **Lead data / signals** — enrichment providers + signal sources; a waterfall across multiple providers.
6. **Email sending** — Resend / SendGrid / Smartlead with warmed domains, plus unsubscribe/suppression handling (maps to `/opt-out`).
7. **Social outreach** — official APIs where available; automating some social platforms violates their terms of service — a deliberate compliance decision.
8. **Background jobs** — Inngest / Trigger.dev / Vercel Cron for 24/7 agent runs.
9. **Compliance** — real Terms/Privacy/Legal drafted by counsel; GDPR/CAN-SPAM handling.
10. **Analytics & monitoring** — PostHog/Plausible + Sentry.
11. **Honest marketing** — DONE (2026-07-15): fabricated social proof replaced with truthful early-access positioning (capability marquee, product-promise stats, testimonials reframed as labelled design-partner concept scenarios). Swap in real customer quotes and numbers as they arrive.
12. **Analytics** — `@vercel/analytics` is wired into the root layout; enable Web Analytics once in the Vercel dashboard (project → Analytics tab) to start collecting.
13. **Waitlist** — DONE (2026-07-15): `POST /api/waitlist` validates emails and stores each signup as a JSON blob in the private `wazzaberry-waitlist` Vercel Blob store (linked to the project; token auto-provisioned). The final-CTA section captures emails with success/error states. Read signups anytime with `npx vercel blob list` (token in `.env.local` / project env). Tested end-to-end locally and in production; test entries removed.

## Open items
- [ ] Connect GitHub↔Vercel for auto-deploys (owner OAuth).
- [ ] Custom domain (e.g. wazzaberry.com) + update `NEXT_PUBLIC_SITE_URL`.
- [ ] Decide repo visibility (currently public).
- [ ] Backend slice #1: auth + database (Supabase recommended).
