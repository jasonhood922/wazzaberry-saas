# 🍓 WazzaBerry

**Your AI sales agent for warm, ready-to-buy leads.**

WazzaBerry learns your business from your website, hunts down high-intent prospects, and runs personalised multichannel outreach automatically — so meetings land in your calendar while your team focuses on closing.

Built with **Next.js (App Router), TypeScript, and Tailwind CSS v4**.

> New here? Start with [HANDOFF.md](./HANDOFF.md) — the full pick-up document.
> Also: [PROJECT_LOG.md](./PROJECT_LOG.md) (build log + production checklist) and [BRAND.md](./BRAND.md) (brand guidelines).

**Live:** https://wazzaberry-saas.vercel.app

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — marketing site (hero, agent carousel, how-it-works, features, stats, testimonials, integrations, pricing, CTA)
- `/faq` — FAQ accordion
- `/affiliate` — affiliate program
- `/connect-mcp` — Claude / MCP integration guide
- `/app` — product demo: dashboard, campaigns, inbox, onboarding wizard (sample data)
- `/terms` · `/privacy` · `/legal-notice` · `/opt-out` — legal pages (placeholders; replace before charging customers)

## Deploy

`npx vercel --prod` — or import the repo at [vercel.com/new](https://vercel.com/new). Set `NEXT_PUBLIC_SITE_URL` to the production URL.

## Structure

```
app/            routes (App Router)
components/     shared sections (Hero, Pricing, Footer, …)
lib/site.ts     nav, stats, testimonials, pricing data
public/brand/   brand mark (logo.png)
public/avatars/ AI-generated testimonial portraits (labelled illustrative)
```

## License

Proprietary — see [LICENSE](./LICENSE).
