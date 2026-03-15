# Timi Template

Local business directory template with AI features. For your town, side project, or learning. Updated periodically.

---

## What's included

| Feature | What it does |
|--------|---------------|
| Natural-language search | "Korean fried chicken near 69th St" instead of filters |
| Voice search | Mic input (Chrome) |
| AI chat | Conversational recommendations |
| Image / vibe search | Describe a place, get matches |
| AI descriptions & review summaries | Per-business copy |
| Trust badges | Verified vs user-claimed |
| For You feed | Recommendations from viewed items |
| Smart collections | e.g. "Best Sunday Brunch", "Same-Day Plumbers" |
| Owner tools | AI receptionist, chatbot, FAQ automation, inbox triage |
| Data freshness | Last verified, change alerts, duplicate detection |
| SMS & WhatsApp | Contact links on listings |
| Monetization AI | Pricing, lead scoring, benchmarks |
| Accessibility | Language toggle (EN/ES/中文), dietary filters, a11y tags |

---

## Run

```bash
npm install
npm run dev
```

Optional: add `.env` with `VITE_OPENAI_API_KEY=sk-...` for real AI. Without it, fallbacks work.

---

## Ideas to add (not in template)

- Dark mode toggle
- Favorites / bookmarks
- Share buttons (copy link, Twitter, Facebook)
- Map view (Google Maps / Mapbox)
- Business hours on cards
- Photo gallery per business
- User accounts + login
- Leave a review form
- Newsletter signup
- Near me / geolocation sort
- Price or rating filters
- Compare 2–3 businesses side by side
- PWA (installable, offline)
- Push notifications for new listings
- QR code per business
- SEO meta generator
- Sitemap generator
- Analytics dashboard for owners
- A/B test headlines
- Calendar / booking

---

## Current stack

React, TypeScript, Vite, Tailwind, Zustand, OpenAI (optional), Lucide.

---

## Full stack (for production)

Right now it's all client-side + mock data. To ship something real, add:

| Layer | What | Why |
|-------|------|-----|
| **Database** | [Supabase](https://supabase.com) (Postgres) | Businesses, reviews, users, categories. Row-level security. |
| **Auth** | Supabase Auth | User accounts, business owner login. Built-in, no extra service. |
| **Storage** | Supabase Storage | Business photos, logos. S3-compatible. |
| **Backend** | Supabase Edge Functions or [Hono](https://hono.dev) on Vercel | CRUD, AI calls, cron jobs (scraping, alerts). |
| **Hosting** | Vercel | Already set up. |
| **Payments** | [Stripe](https://stripe.com) | Featured / Promoted tiers ($10, $15/mo). |
| **Email** | [Resend](https://resend.com) | Signup, alerts, password reset. |
| **AI** | OpenAI | Already integrated. |
| **Analytics** | Vercel Analytics or Plausible | Page views, conversions. |
| **Errors** | [Sentry](https://sentry.io) | Crash reporting. |

**Minimum to get real data:** Supabase (db + auth + storage). One signup, one `.env`.

**When he wants money:** Add Stripe.

**When he wants email:** Add Resend.

---

## Deploy

```bash
vercel
```
