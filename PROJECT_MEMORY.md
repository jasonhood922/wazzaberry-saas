# WazzaBerry — Project Memory (AI-session backup)

Durable context for any AI assistant or developer picking this project up. Read
`HANDOFF.md` first (process + bootstrap); this file carries the decision
history that isn't obvious from the code. Secrets are never stored here — see
HANDOFF §3 for where they live.

## Standing directives

- **WazzaBerry is a standalone brand.** The project briefly used a third-party
  site as a structural design reference early on; on 2026-07-15 the owner
  directed a full scrub — reference material, doc mentions, and the git
  history that contained them were removed (history rewritten to a clean
  initial commit). Do not reintroduce references to any competitor site in
  code, docs, or commits.
- **Honest marketing only.** Stats, ratings, and testimonials are illustrative
  placeholders, labelled as such on-page. Replace with real numbers as
  customers arrive; never add fabricated social proof.
- **Delivery process: GitHub → Vercel.** Push to `main` runs CI and
  auto-deploys production. Don't reintroduce CLI-only deploy habits.

## Account map

| Service | Account / resource |
|---|---|
| GitHub | `jasonhood922` / repo `wazzaberry-saas` (public) |
| Vercel | user `jason-9448`, team `jason-hood-team`, project `wazzaberry-saas` |
| Supabase | org "jasonhood922's Org", ACTIVE project `wazzaberry-v2` (ref `muxpticwqsdqhoqiambp`, us-east-1). Older project `wazzaberry` (ref `kkuxhlubynwbahukpjzk`) is orphaned — safe to delete. |
| Kie.ai | media + chat API account (~9,200 credits at last check) |
| Higgsfield | used via MCP for early assets; CLI installed on old machine but never authenticated |

## Decision log (condensed)

- 2026-07-15: Site built (Next.js App Router + TS + Tailwind v4), deployed,
  ownership consolidated under Jason's accounts, brand scrub executed,
  honest-copy pass, waitlist via Vercel Blob, Supabase auth added.
- 2026-07-16: AI reply drafting added; docs consolidated.
- 2026-07-21: Fresh database `wazzaberry-v2` created at owner's request (full
  schema: agents, campaigns, leads, messages — own-rows RLS on everything).
  Old DB's users did not migrate. Provider-agnostic AI layer added
  (`lib/llm.ts`: Anthropic `claude-opus-4-8` primary when `ANTHROPIC_API_KEY`
  is set, Kie `deepseek-chat` backup, static fallback last). Security
  hardening: rate limits, auth guard on drafting, security headers,
  ADMIN_EMAILS-gated `/app/waitlist` viewer.
- 2026-07-22: Kie key rotated; campaign create/delete UI shipped (including a
  fix for stale client state after `router.refresh()`); GitHub Actions CI
  added; GitHub↔Vercel auto-deploy confirmed; DB password added to Vercel env
  so `vercel env pull` recovers a complete `.env.local`.

## Known open items (in priority order)

1. **Kie chat API in maintenance** since ~2026-07-21 (`deepseek-chat` returns
   a maintenance 500; it is their only chat model — they host no Claude
   models). AI onboarding + reply drafting run on graceful fallbacks until it
   recovers **or** an `ANTHROPIC_API_KEY` is added (either works, no code
   changes). Re-check with one POST to their chat endpoint.
2. **Stripe billing** for the $99 Pro plan — not started; needs owner's keys.
3. **SMTP** (e.g. Resend) — Supabase auth uses built-in email (~2/hour limit);
   `mailer_autoconfirm` is ON (no signup email verification) until SMTP lands.
4. **Legal pages are placeholders** — lawyer review required before charging.
5. **Repo is public** — owner may want it private (Settings → Danger Zone).
6. Token rotation history: Kie ✅ (2026-07-22), Supabase PAT ✅ (owner),
   still recommended: Apify token, old Supabase project's secret key.
7. Test account for the v2 DB exists under the owner's email alias
   (`jason+v2test@...`) — credentials with the owner.

## Verification habits that served this project

- Every feature was verified end-to-end before shipping: API via curl, UI by
  driving the browser, data by querying Postgres directly.
- Fallback paths are tested as first-class outcomes (AI features were shipped
  and verified in fallback mode before any provider was live).
- Test rows seeded for verification get deleted afterwards.
