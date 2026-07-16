# WazzaBerry — Handoff Document

**Last updated:** 2026-07-16
**Owner:** Jason Hood (jason@jasonhood.me)
**Live site:** https://wazzaberry-saas.vercel.app
**Repo:** https://github.com/jasonhood922/wazzaberry-saas

WazzaBerry is an AI-sales-agent SaaS: it learns a business from its website, finds warm, ready-to-buy leads, and runs multichannel outreach. This document is the single place a new developer (or a fresh AI session) needs to read to pick the project up.

---

## 1. What exists today

### Marketing site (static, live)
Hero with CSS dashboard mockup · capability marquee · 4-slide agent carousel with AI illustration · 3-step how-it-works with banner art · 5-category feature grid + stack-replacement card · product-promise stats · design-partner testimonial scenarios (labelled, AI portraits) · integrations · pricing (Pro $99 / Custom) · **working waitlist form** · FAQ · affiliate · connect-mcp · legal set (placeholders) · branded 404 · sitemap/robots · OG card.

### Product app (live, real backend)
- **Auth:** Supabase (`@supabase/ssr`) — `/signup`, `/login`, logout, session middleware.
- **Onboarding wizard** (`/app/onboarding`): enter website → **real AI inference** via `/api/onboard` (falls back to a starter profile when unavailable) → review ICP → channels + Copilot/Autopilot → launch. Saves to Postgres; prefills and becomes an update flow for existing agents.
- **Dashboard** (`/app`): shows the saved agent (website, mode, channels) with working **pause/resume**; illustrated empty state for new users; sample lead table clearly labelled.
- **Campaigns / Inbox** (`/app/campaigns`, `/app/inbox`): sample-data demos of the intended UX.
- **Settings** (`/app/settings`): password change, retire agent. Auth-required.

### Data & storage
- **Supabase project `wazzaberry`** (ref `kkuxhlubynwbahukpjzk`, us-east-1): auth users + `public.agents` table (one row per user; RLS: users only touch their own row).
- **Vercel Blob store `wazzaberry-waitlist`** (private): each waitlist signup is a JSON blob. Read with `npx vercel blob list` from the project folder.

### Brand
`BRAND.md` holds palette/voice/logo rules. Logo SVG in `components/Logo.tsx`; illustrations in `public/illustrations/` (AI-generated, Kie.ai nano-banana); avatars in `public/avatars/` (AI, labelled illustrative); OG card `public/og.png`.

---

## 2. Architecture

- **Next.js 16 App Router + TypeScript + Tailwind v4.** Marketing pages are static; `/app/*` and API routes are dynamic.
- `lib/site.ts` — nav/stats/testimonials/pricing data.
- `lib/supabase/{client,server}.ts` + `middleware.ts` — auth plumbing.
- `app/api/waitlist/route.ts` — email capture → Vercel Blob.
- `app/api/onboard/route.ts` — fetches the user's site, calls Kie.ai chat (`deepseek-chat`) for offer/ICP/tone/signals as strict JSON; falls back gracefully.

## 3. Environments & secrets (never commit these)

| Secret | Where it lives |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` + Vercel Production |
| `BLOB_READ_WRITE_TOKEN` | Vercel project env (auto-linked) + `.env.local` |
| `KIE_API_KEY` | `.env.local` + Vercel Production |
| `NEXT_PUBLIC_SITE_URL` | Vercel Production (`https://wazzaberry-saas.vercel.app`) |
| Supabase DB password | `.env.local` (`SUPABASE_DB_PASSWORD`) |

Accounts: GitHub `jasonhood922` · Vercel `jason-9448` (team `jason-hood-team`) · Supabase org `jasonhood922's Org` · Kie.ai · Higgsfield (MCP; CLI installed but needs `higgsfield auth login`).

⚠️ **Rotate these when convenient** — the Apify token, Supabase personal access token, and Kie API key were shared in a chat session on 2026-07-15.

## 4. Run & deploy

```bash
npm install && npm run dev     # local, http://localhost:3000
npm run build                  # verify before shipping
npx vercel --prod              # deploy (CLI-driven; GitHub↔Vercel auto-deploy NOT connected yet)
```

Test account: `jason+test@jasonhood.me` (ask Jason for the current password).

## 5. Known gaps / conscious decisions

1. **Kie.ai is out of credits (~0.8)** — the AI onboarding falls back to the starter profile until topped up at kie.ai. No code change needed after top-up.
2. **Supabase `mailer_autoconfirm` is ON** (no SMTP configured) — users sign up without email verification. Configure SMTP + re-enable confirmations before public launch.
3. **Legal pages are placeholders** — must be replaced by lawyer-reviewed text before charging customers.
4. **Marketing numbers are illustrative** (labelled on-page) — swap in real stats/testimonials as customers arrive.
5. **Repo is PUBLIC** — decide if it should be private (Settings → Danger Zone).
6. **Campaigns/Inbox/lead table are sample data** — the real prospecting engine doesn't exist yet.
7. **Vercel Web Analytics** — code is wired (`@vercel/analytics`); enable the toggle in the Vercel dashboard.

## 6. Roadmap (in recommended order)

1. Top up Kie credits → verify live AI onboarding inference.
2. AI reply drafting in the inbox (same Kie pipeline, fallback-safe).
3. Stripe subscriptions for Pro $99 (+ customer portal).
4. Real lead sourcing (provider decision: Apify actors / Apollo / PDL) + `leads`, `campaigns`, `messages` tables.
5. Email sending infrastructure (Resend/Smartlead) with suppression list wired to `/opt-out`.
6. Background jobs (Inngest / Vercel Cron) for the 24/7 agent loop.
7. Custom domain + GitHub↔Vercel auto-deploys + SMTP/email confirmations.

## 7. History summary

Built 2026-07-15 in a single day: scaffold → full marketing site → brand assets → GitHub + Vercel launch → ownership consolidated under Jason's accounts → honest-copy pass + analytics → waitlist (Blob) → Supabase auth → agent persistence + management → AI illustrations → AI onboarding pipeline. Full running log in [PROJECT_LOG.md](./PROJECT_LOG.md).
