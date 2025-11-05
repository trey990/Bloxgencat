commit changes
# Bloxgen-style Starter (Safe Demo Generator)

This is a minimal Next.js + Tailwind CSS starter scaffold that reproduces the look-and-feel of a marketing/landing site with a client-side **demo profile generator**. It does NOT interact with third-party platforms or create accounts — it's for legal demos and UI testing only.

## What's included
- Next.js pages (landing, demo)
- Simple components (Hero, Pricing)
- Tailwind CSS config and setup
- A client-side demo generator that produces randomized profile JSON and a preview

## How to use locally
1. Extract the .zip and `cd` into the folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the dev server (http://localhost:3000).

> Note: This project uses Tailwind. If you want to deploy to Vercel, you can; follow Vercel's docs.

If you want, I can extend this with:
- Auth (NextAuth)
- Stripe subscription example + webhook handler
- A Postgres schema and API routes
- Hosted deployment config (Vercel + managed DB)

Tell me which next piece you'd like and I'll add it.


## Added features in this build
- NextAuth authentication (Email provider) with Prisma adapter
- Prisma schema (SQLite) with User, Subscription, DemoProfile models
- Stripe webhook skeleton (pages/api/stripe/webhook.js)
- Admin page placeholder (pages/admin.js)
- Example .env.example for local setup

## Local setup steps (additional)
1. Copy `.env.example` to `.env.local` and fill values.
2. Run `npm install`.
3. Initialize Prisma: `npx prisma generate` and `npx prisma db push` to create SQLite DB.
4. Run dev: `npm run dev`. Visit http://localhost:3000.


## Stripe Checkout & Subscription Flow Added
- `pages/api/create-checkout-session.js`: creates a Stripe Checkout session and links it to the logged-in user via `client_reference_id`.
- `pages/api/stripe/webhook.js`: fuller handler that upserts subscription records into Prisma DB.
- `pages/pricing.js`: pricing page with a Subscribe button that triggers Checkout.
- `pages/account.js` & `pages/api/subscription.js`: view current subscription status.

Make sure to set `NEXT_PUBLIC_STRIPE_PRICE_ID` in your environment for the pricing button, or change the priceId in `pages/pricing.js`.
