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

## Contact Form & Leads System (Cloudflare D1)

* **Form Submission Endpoint:** `POST /api/submit` ([functions/api/submit.js](functions/api/submit.js))
* **Leads Admin API:** `GET /api/leads` ([functions/api/leads.js](functions/api/leads.js))
* **Admin Dashboard UI:** `/admin/` ([admin/index.html](admin/index.html))
* **Database Schema:** [schema.sql](schema.sql)

### Setup Steps in Cloudflare Dashboard

#### 1. Create D1 Database
1. Go to **Storage & Databases** > **D1 SQL Database** > **Create database**.
2. Name: `katianfoods`.
3. Click on the created database > **Console** tab.
4. Paste and execute the contents of `schema.sql` (creates `inquiries` table).

#### 2. Bind D1 to Pages Project
1. Go to **Workers & Pages** > select `katianfoods` Pages project.
2. Go to **Settings** > **Functions** > scroll to **D1 database bindings** > click **Add binding**.
3. Set:
   * **Variable name:** `DB`
   * **D1 database:** select `katianfoods`.
4. Click **Save**.

#### 3. Add Admin Password Environment Variable
1. In `katianfoods` Pages project > **Settings** > **Environment variables**.
2. Click **Add variables**.
3. Set:
   * **Variable name:** `ADMIN_PASSWORD`
   * **Value:** *(your chosen secret password)*
   * **Type:** Encrypted
4. Click **Save**.

#### 4. Access Admin Dashboard
Navigate to `https://katianfoods.com/admin/`, enter `ADMIN_PASSWORD` to view, search, and export CSV of all captured leads.
