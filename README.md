# Katian Foods &mdash; Cloudflare Worker Deployment

Deployment guide for `katianfoods.com` using Cloudflare Workers with Static Assets and Cloudflare D1.

---

## Architecture Overview
* **Type:** Cloudflare Worker with Static Assets
* **Entrypoint:** `src/index.js`
* **Static Assets:** `public/` (contains `index.html`, `contact.html`, `admin/`, CSS, images, JS)
* **Database:** Cloudflare D1 (`katianfoods` / ID: `10ee9297-488b-40b0-a733-b9b85f5ff4b9`)
* **Config:** `wrangler.jsonc`

---

## Project Structure

```
katianfoods/
├── wrangler.jsonc       # Worker config: assets directory + D1 binding
├── src/
│   └── index.js         # API router (/api/contact, /api/leads, static fallback)
├── public/              # Static site assets
│   ├── index.html       # Homepage with contact form
│   ├── contact.html     # Dedicated contact form
│   ├── admin/           # Admin leads dashboard
│   ├── css/
│   ├── js/
│   └── images/
├── schema.sql           # inquiries table schema (reference)
└── DEPLOYMENT.md
```

---

## Deployment via Wrangler CLI

Deploy directly to Cloudflare:

```bash
# 1. Authenticate with Cloudflare (first time only)
npx wrangler login

# 2. Deploy Worker and Static Assets to Production
npx wrangler deploy
```

This single command:
1. Uploads all static files from `public/`.
2. Compiles and deploys `src/index.js` handling `POST /api/contact` and `GET /api/leads`.
3. Attaches the `DB` binding to the `katianfoods` D1 database.

---

## Environment Variables (Admin Password)

To set the password for the `/admin/` dashboard:

```bash
# Set encrypted secret in production
npx wrangler secret put ADMIN_PASSWORD
```
Or configure in Cloudflare Dashboard: **Workers & Pages** > `katianfoods` > **Settings** > **Variables and Secrets**.

---

## Custom Domain

Attach `katianfoods.com` and `www.katianfoods.com`:
1. In Cloudflare Dashboard, navigate to **Workers & Pages** > `katianfoods`.
2. Go to **Settings** > **Domains & Routes** > **Custom Domains**.
3. Add `katianfoods.com` and `www.katianfoods.com`.
