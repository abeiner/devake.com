# devake.com — Deployment Record

## Live URL

https://green-ocean-01168ac1e.6.azurestaticapps.net

The deployment is public. There is no password gate; the site displays a demo
disclaimer banner instead.

## GitHub Repository

https://github.com/abeiner/devake.com

Branch: `main`

## Azure Details

| Field | Value |
|---|---|
| App name | devake-com |
| Resource group | elderhelpers-rg |
| Location | Global |
| SKU | Free |
| Subscription | Azure subscription 1 (86992cac-c577-4c08-85b0-ee1482719e8d) |

## Build

- Framework: Next.js 16.3.3
- Build command: `npm run build` (Webpack mode for NTFS compatibility)
- Output directory: `out/`
- Static export: yes (`output: "export"`)
- Azure security headers: `out/staticwebapp.config.json`

## Deployment Method

Direct deploy via the Azure Static Web Apps CLI using a deployment token (no
GitHub Actions CI/CD). The token is not stored in Git and should be reset after
any accidental exposure.

### Release Procedure

```bash
npm ci
npm run lint
npm run build
SWA_CLI_DEPLOYMENT_TOKEN="<current-token>" \
  npx --yes @azure/static-web-apps-cli@2.0.10 \
  deploy ./out --env production
```

Obtain the current token from **Azure Portal → devake-com → Manage deployment
token**. Prefer passing it through the environment for one command. Do not save
it in `.env`, shell history, documentation, screenshots, or Git.

After deployment, verify the live home page, favicon, navigation menu,
`robots.txt`, and security headers.

## Deployment Log

- 2026-09-01: Accessibility and production-readiness release
  - Updated to Next.js 16.3.3
  - Removed the password gate and enabled public indexing
  - Added the demo disclaimer banner
  - Added CSP, HSTS, frame, MIME-sniffing, and referrer-policy headers
  - Completed keyboard, VoiceOver, reduced-motion, 390 px, 640 px reflow, and
    768 px responsive checks
  - Deployed `out/` to the existing `devake-com` production environment with
    SWA CLI 2.0.10
  - Reset the Azure deployment token after release; no deployment secret is
    stored in the repository
  - Added the branded SVG favicon
  - Corrected mobile viewport sizing, full-screen navigation, footer height,
    and mobile Contact ordering
  - Stabilized and balanced the responsive hero point cloud
  - Completed the final pre-handoff regression check recorded in
    `QA_REPORT.md`

- 2026-04-02: Initial deployment
  - Git initialized, 52 source files committed
  - GitHub repo created: github.com/abeiner/devake.com
  - Azure Static Web App created in elderhelpers-rg (West US 2, Free tier)
  - Deployed via `swa deploy ./out --env production`
  - Verified live: password gate and title "DEVAKE. | Geospatial Intelligence. Engineered." confirmed
