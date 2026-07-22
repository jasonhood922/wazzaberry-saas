# WazzaBerry — Handoff Document

**Last updated:** 2026-07-22
**Owner:** Jason Hood (jason@jasonhood.me)
**Live site:** https://wazzaberry-saas.vercel.app
**Repo:** https://github.com/jasonhood922/wazzaberry-saas

WazzaBerry is an AI-sales-agent SaaS: it learns a business from its website, finds warm, ready-to-buy leads, and runs multichannel outreach. This document is the single place a new developer (or a fresh AI session) needs to read to pick the project up.

---

## 0. THE PROCESS: GitHub → Vercel (read this first)

The delivery pipeline is fully wired and machine-independent:

1. **Push to `main` on GitHub** → GitHub Actions CI runs (`.github/workflows/ci.yml`: `npm ci` → lint → build) **and** Vercel auto-deploys to production. No CLI deploy needed.
2. The Vercel project (`jason-hood-team/wazzaberry-saas`, account `jason-9448`) is connected to the GitHub repo — every push deploys; PRs get preview deploys.
3. All runtime secrets live in **Vercel Production env vars** (see §3). CLI deploys (`npx vercel --prod`) still work but are no longer the primary path.

### Bootstrapping a NEW development environment (e.g. Claude Code cloud)

```bash
git clone https://github.com/jasonhood922/wazzaberry-saas
cd wazzaberry-saas
npm install
npx vercel link            # link to jason-hood-team/wazzaberry-saas (needs Vercel login as jason-9448)
npx vercel env pull .env.local   # recovers ALL env vars incl. Supabase keys, Kie key, Blob token, DB password
npm run dev
```

Every secret needed to run and administer the app is recoverable via `vercel env pull` — including `SUPABASE_DB_PASSWORD` (stored there 2026-07-22 for exactly this transfer). GitHub auth: `gh auth login` as `jasonhood922`. Supabase admin (SQL/DDL): use a Supabase personal access token from supabase.com → Account → Access Tokens against project ref `muxpticwqsdqhoqiambp`, or the SQL editor in the dashboard.

### Session-mortal things that do NOT transfer
- The **Kie chat recovery watch-loop** (an in-session poller) dies when the old session closes. Kie's chat API (`deepseek-chat`) has been in maintenance since ~2026-07-21; re-check it in the new session (one POST to `https://api.kie.ai/api/v1/chat/completions`). The app needs no code change either way.
- The local dev-server launch config (`.claude/launch.json`) is committed and transfers fine.

---

## 1. What exists today

### Marketing site (static, live)
Hero with CSS dashboard mockup · capability marquee · 4-slide agent carousel with AI illustration · 3-step how-it-works with banner art · 5-category feature grid + stack-replacement card · product-promise stats · design-partner testimonial scenarios (labelled, AI portraits) · integrations · pricing (Pro $99 / Custom) · **working waitlist form** · FAQ · affiliate · connect-mcp · legal set (placeholders) · branded 404 · sitemap/robots · OG card.

### Product app (live, real backend)
- **Auth:** Supabase (`@supabase/ssr`) — `/signup`, `/login`, logout, session middleware, and full password recovery (`/forgot-password` → email link → `/auth/confirm` → `/reset-password`). Recovery emails use Supabase's built-in sender (rate-limited ~2/hour until SMTP is configured).
- **Onboarding wizard** (`/app/onboarding`): enter website → **real AI inference** via `/api/onboard` (falls back to a starter profile when unavailable) → review ICP → channels + Copilot/Autopilot → launch. Saves to Postgres; prefills and becomes an update flow for existing agents.
- **Dashboard** (`/app`): shows the saved agent (website, mode, channels) with working **pause/resume**; illustrated empty state for new users; sample lead table clearly labelled.
- **Campaigns** (`/app/campaigns`): full CRUD — create (name + channels form), pause/resume, and delete, all persisted to Postgres; shows **Live data** when real rows exist, labelled sample data otherwise.
- **Inbox** (`/app/inbox`): sample-data demo with AI "Redraft" action (see AI layer below).
- **Settings** (`/app/settings`): password change, retire agent. Auth-required.

### Data & storage
- **Supabase project `wazzaberry-v2`** (ref `muxpticwqsdqhoqiambp`, us-east-1) — the ACTIVE database since 2026-07-21, created fresh at Jason's request. Tables: `agents` (one per user), `campaigns`, `leads`, `messages` — all with own-rows RLS policies and indexes. The dashboard and campaigns pages show **Live data** when real rows exist and labelled sample data otherwise; campaign pause/resume persists.
- The older project `wazzaberry` (ref `kkuxhlubynwbahukpjzk`) still exists but is **disconnected** — its users/agents did not migrate. Delete it in the Supabase dashboard if unwanted. Current v2 test account: `jason+v2test@jasonhood.me`.
- **Vercel Blob store `wazzaberry-waitlist`** (private): each waitlist signup is a JSON blob. Read with `npx vercel blob list` from the project folder.

### Brand
`BRAND.md` holds palette/voice/logo rules. Logo SVG in `components/Logo.tsx`; illustrations in `public/illustrations/` (AI-generated, Kie.ai nano-banana); avatars in `public/avatars/` (AI, labelled illustrative); OG card `public/og.png`.

---

## 2. Architecture

- **Next.js 16 App Router + TypeScript + Tailwind v4.** Marketing pages are static; `/app/*` and API routes are dynamic.
- `lib/site.ts` — nav/stats/testimonials/pricing data.
- `lib/supabase/{client,server}.ts` + `middleware.ts` — auth plumbing.
- `app/api/waitlist/route.ts` — email capture → Vercel Blob (IP-rate-limited 10/h; blobs keyed by email+timestamp).
- `lib/llm.ts` — provider-agnostic completion layer: **Anthropic (`claude-opus-4-8` via the official SDK) is primary whenever `ANTHROPIC_API_KEY` is set** (add it to `.env.local` + Vercel Production to activate); Kie.ai `deepseek-chat` is the backup (one retry on 5xx); callers fall back to static defaults when both fail.
- `app/api/onboard/route.ts` — fetches the user's site, infers offer/ICP/tone/signals via `lib/llm.ts` as strict JSON; falls back gracefully (IP-rate-limited 5/h).
- `app/api/draft-reply/route.ts` — AI reply drafting via `lib/llm.ts` (response reports which provider drafted); requires a signed-in user, 20/h per user.
- `lib/rate-limit.ts` — best-effort in-memory limiter (per serverless instance); swap for Upstash/Redis at real scale.
- Security headers (HSTS, nosniff, frame-deny, referrer/permissions policies) set site-wide in `next.config.ts`.
- `/app/waitlist` — admin-only signup viewer, gated by the `ADMIN_EMAILS` env var (comma-separated; set locally + Vercel Production).

## 3. Environments & secrets (never commit these)

| Secret | Where it lives |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` + Vercel Production |
| `BLOB_READ_WRITE_TOKEN` | Vercel project env (auto-linked) + `.env.local` |
| `KIE_API_KEY` | `.env.local` + Vercel Production |
| `NEXT_PUBLIC_SITE_URL` | Vercel Production (`https://wazzaberry-saas.vercel.app`) |
| Supabase DB password | Vercel Production (`SUPABASE_DB_PASSWORD`, added 2026-07-22) + `.env.local` |
| `KIE_API_KEY` (rotated 2026-07-22) | Vercel Production + `.env.local` |
| `ADMIN_EMAILS` | Vercel Production + `.env.local` |

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

1. Top up Kie credits → verify live AI onboarding inference **and** inbox reply drafting (both built and fallback-safe; DONE 2026-07-16: `/api/draft-reply` + inbox "Redraft with AI" action).
2. Stripe subscriptions for Pro $99 (+ customer portal).
4. Real lead sourcing (provider decision: Apify actors / Apollo / PDL) + `leads`, `campaigns`, `messages` tables.
5. Email sending infrastructure (Resend/Smartlead) with suppression list wired to `/opt-out`.
6. Background jobs (Inngest / Vercel Cron) for the 24/7 agent loop.
7. Custom domain + GitHub↔Vercel auto-deploys + SMTP/email confirmations.

## 7. History summary

Built 2026-07-15 in a single day: scaffold → full marketing site → brand assets → GitHub + Vercel launch → ownership consolidated under Jason's accounts → honest-copy pass + analytics → waitlist (Blob) → Supabase auth → agent persistence + management → AI illustrations → AI onboarding pipeline. Full running log in [PROJECT_LOG.md](./PROJECT_LOG.md).
