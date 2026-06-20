# Lumen — Deployment Guide

This is a **Vite + React + Three.js** static website. All images are bundled locally in `client/public/assets/` — the site is fully self-contained and has **no external image dependencies**. Nothing 404s.

## 1. Install & build

```bash
pnpm install      # or: npm install
pnpm build        # outputs the static site to dist/public/
```

The deployable folder is **`dist/public/`**.

## 2. Run locally

```bash
pnpm dev          # http://localhost:3000
pnpm preview      # preview the production build
```

## 3. Deploy to GitHub Pages

GitHub Pages serves the **built output**, not the source. Two options:

### Option A — GitHub Actions (recommended)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist/public }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: "${{ steps.deployment.outputs.page_url }}" }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in your repo: **Settings → Pages → Source = GitHub Actions**.

### Option B — Deploy the dist folder manually
Push the contents of `dist/public/` to a `gh-pages` branch (e.g. with the `gh-pages` npm package).

## 4. Custom domain (GoDaddy)

1. In GitHub repo: **Settings → Pages → Custom domain** → enter your domain (e.g. `lumenai.co.bw`). This creates a `CNAME` file.
2. In **GoDaddy → DNS** for your domain, add:
   - For a subdomain like `www`: a **CNAME** record → `YOUR_GITHUB_USERNAME.github.io`
   - For the root/apex domain: **A records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. Wait 15–60 min for DNS to propagate. Enable **Enforce HTTPS** in GitHub Pages once the cert is issued.

## Notes

- No "Made with Manus" badge and no Manus analytics script in this self-hosted build — those only exist on the Manus-published version.
- If you prefer Netlify/Vercel: set **build command** `pnpm build` and **output directory** `dist/public`.
