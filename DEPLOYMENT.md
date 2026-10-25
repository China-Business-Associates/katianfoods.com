# Cloudflare Pages Deployment

Documentation for deploying `katianfoods.com` to Cloudflare Pages.

---

## Architecture Overview
* **Type:** Static HTML/CSS/JS (no framework or build pipeline).
* **Source:** Root directory (`index.html`).
* **Hosting:** Cloudflare Pages (Free Tier: unlimited bandwidth, free SSL).

---

## Method 1: Git Integration (Recommended)

Automatic deployment on every `git push` to `main`.

### Setup Steps
1. Navigate to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Compute (Workers & Pages)**.
2. Click **Create** > **Pages** > **Connect to Git**.
3. Authorize GitHub and select repository: `China-Business-Associates/katianfoods.com`.
4. Configure build settings:
   * **Project name:** `katianfoods`
   * **Production branch:** `main`
   * **Framework preset:** `None`
   * **Build command:** *(leave empty)*
   * **Build output directory:** `/` (or leave blank for root)
5. Click **Save and Deploy**.

Subsequent pushes to `main` trigger automated builds and deployments.

---

## Method 2: Manual CLI Deployment

Deploy directly from terminal using Wrangler.

### Prerequisites
* Node.js / npm installed
* Authenticated Wrangler CLI

### Commands
```bash
# Authenticate (first time only)
npx wrangler login

# Deploy root directory to production
npx wrangler pages deploy . --project-name=katianfoods --branch=main
```

---

## Custom Domain Configuration

To connect `katianfoods.com` and `www.katianfoods.com`:

1. In Cloudflare Dashboard, open the **katianfoods** Pages project.
2. Select **Custom domains** tab > **Set up a custom domain**.
3. Add apex domain: `katianfoods.com`.
4. Repeat and add subdomain: `www.katianfoods.com`.
5. **DNS Setup:**
   * **If nameservers managed by Cloudflare:** Cloudflare automatically configures CNAME/alias records and provisions SSL certificates.
   * **If DNS managed externally:** Add CNAME records pointing to `katianfoods.pages.dev`:
     * Host: `@` -> Target: `katianfoods.pages.dev`
     * Host: `www` -> Target: `katianfoods.pages.dev`

---

## Contact Form API (Pages Functions)

* **Endpoint:** `POST /api/submit`
* **Handler:** `functions/api/submit.js`
* Cloudflare Pages automatically discovers and executes functions placed in `functions/` without additional worker configuration.
* Honeypot field `fax` included to mitigate spam submissions.
