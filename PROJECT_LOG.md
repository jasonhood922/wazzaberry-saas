# WazzaBerry — Project Log

**Product:** WazzaBerry — an AI sales agent that finds warm, ready-to-buy leads and runs multichannel outreach automatically.
**Started:** 2026-07-15 · **Last updated:** 2026-07-22
**Live:** https://wazzaberry-saas.vercel.app
**Repo:** https://github.com/jasonhood922/wazzaberry-saas

> Companion docs: `HANDOFF.md` (process + new-environment bootstrap — read first),
> `PROJECT_MEMORY.md` (decision history + standing directives), `BRAND.md` (brand rules).

---

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4.
- Supabase (auth + Postgres with row-level security), Vercel Blob (waitlist), Vercel hosting.
- `lib/llm.ts` — provider-agnostic AI layer: Anthropic `claude-opus-4-8` primary when `ANTHROPIC_API_KEY` is set, Kie.ai `deepseek-chat` backup (one retry), static fallbacks last.
- GitHub Actions CI (`.github/workflows/ci.yml`): lint + build on every push/PR.

## Delivery process
**Push to `main` → CI runs → Vercel auto-deploys production.** The GitHub repo is connected to Vercel project `jason-hood-team/wazzaberry-saas`; CLI deploys (`npx vercel --prod`) remain possible but are not the primary path. All runtime secrets live in Vercel Production env — a new environment recovers them with `npx vercel link && npx vercel env pull .env.local` (see HANDOFF §0).

## Pages
| Route | Purpose | Status |
|---|---|---|
| `/` | Marketing page: hero + dashboard mockup, capability marquee, agent carousel (AI illustration), how-it-works (banner art), feature grid, stats, labelled design-partner testimonials, integrations, pricing (Pro $99 + Custom), working waitlist CTA | Live |
| `/faq`, `/affiliate`, `/connect-mcp` | FAQ accordion · affiliate program · MCP guide (banner art) | Live |
| `/terms`, `/privacy`, `/legal-notice`, `/opt-out` | Legal set | **Placeholders — lawyer review required before charging** |
| `/login`, `/signup`, `/forgot-password` → `/auth/confirm` → `/reset-password` | Full Supabase auth incl. password recovery | Live |
| `/app` | Dashboard: saved agent config, pause/resume, live/sample-labelled lead table, illustrated empty state | Live |
| `/app/onboarding` | 5-step wizard; AI website inference via `/api/onboard` (fallback-safe); saves/prefills agent config | Live |
| `/app/campaigns` | **Full CRUD**: create (name + channels), pause/resume, delete — persisted with RLS | Live |
| `/app/inbox` | Sample threads + AI "Redraft" action via `/api/draft-reply` (auth-required, fallback-safe) | Demo |
| `/app/settings` | Password change, retire agent | Live |
| `/app/waitlist` | Admin-only signup viewer (`ADMIN_EMAILS` gate) | Live |

## Data
- **Active DB: Supabase `wazzaberry-v2`** (ref `muxpticwqsdqhoqiambp`, us-east-1). Tables `agents`, `campaigns`, `leads`, `messages` — all own-rows RLS + indexes. Older project `wazzaberry` (ref `kkuxhlubynwbahukpjzk`) is orphaned; safe to delete.
- Waitlist: private Vercel Blob store `wazzaberry-waitlist`, one JSON blob per signup.

## Security & hardening
- IP rate limits: `/api/waitlist` 10/h, `/api/onboard` 5/h; `/api/draft-reply` requires auth (20/h/user).
- Site-wide headers: HSTS, nosniff, frame-deny, referrer/permissions policies.
- Limiter is per-instance best-effort — swap for Redis/Upstash at real scale.

## Brand & assets
- Identity: dotted-berry + radar-arc. SVG `components/Logo.tsx`, raster `public/brand/logo.png`, favicon `app/icon.svg`, OG card `public/og.png`.
- AI illustrations (`public/illustrations/`, Kie nano-banana, WebP): `berry-radar` (carousel/OG/empty state), `radar-sweep` (how-it-works), `mcp-connect` (MCP page), `berry-404` (404). Avatars in `public/avatars/` (labelled illustrative).
- Kie account: ~9,200 credits for future assets; key rotated 2026-07-22.

## Production checklist
| # | Item | Status |
|---|---|---|
| 1 | Auth (Supabase, incl. password recovery) | ✅ Done — note: `mailer_autoconfirm` ON until SMTP configured |
| 2 | Database (agents/campaigns/leads/messages + RLS; campaign CRUD in UI) | ✅ Done for current scope |
| 3 | Waitlist (Blob) + admin viewer | ✅ Done |
| 4 | AI layer (provider-agnostic; onboarding inference + reply drafting) | ✅ Built + verified fallback-safe. Activates via `ANTHROPIC_API_KEY` **or** Kie chat recovery (in maintenance since ~2026-07-21) |
| 5 | Honest marketing pass | ✅ Done — swap in real numbers/quotes as customers arrive |
| 6 | Analytics (`@vercel/analytics` wired) | ⚠️ Enable the toggle in Vercel dashboard |
| 7 | CI + auto-deploy (GitHub → Vercel) | ✅ Done, verified green |
| 8 | Payments — Stripe Pro $99 + portal | ❌ Not started (needs owner's keys) |
| 9 | Email sending (Resend/etc.) + confirmations | ❌ Not started (needs SMTP account) |
| 10 | Lead sourcing / signals providers | ❌ Not started (provider decision + compliance review) |
| 11 | Background jobs for 24/7 agent runs | ❌ Not started |
| 12 | Real legal pages | ❌ Lawyer required |
| 13 | Custom domain | ❌ Owner action (then update `NEXT_PUBLIC_SITE_URL`) |

## Open items
- [ ] Enable Vercel Web Analytics (dashboard toggle).
- [ ] Stripe billing (item 8) — next major build once keys exist.
- [ ] SMTP + re-enable email confirmations (item 9).
- [ ] Custom domain; repo visibility decision (currently public).
- [ ] Rotate remaining old tokens (Apify; old Supabase project's secret key).
- [ ] Re-check Kie chat API recovery in the next session (the in-session watch loop does not transfer).
