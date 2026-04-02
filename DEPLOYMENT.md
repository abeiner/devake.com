# devake.com — Deployment Record

## Live URL

https://green-ocean-01168ac1e.6.azurestaticapps.net

Access code: `demo2026`

## GitHub Repository

https://github.com/abeiner/devake.com

Branch: `main`

## Azure Details

| Field | Value |
|---|---|
| App name | devake-com |
| Resource group | elderhelpers-rg |
| Location | West US 2 |
| SKU | Free |
| Subscription | Azure subscription 1 (86992cac-c577-4c08-85b0-ee1482719e8d) |

## Build

- Framework: Next.js 16.2.2
- Build command: `npm run build`
- Output directory: `out/`
- Static export: yes (`output: "export"`)

## Deployment Method

Direct deploy via `swa` CLI v2.0.8 using deployment token (no GitHub Actions CI/CD).

## Deployment Log

- 2026-04-02: Initial deployment
  - Git initialized, 52 source files committed
  - GitHub repo created: github.com/abeiner/devake.com
  - Azure Static Web App created in elderhelpers-rg (West US 2, Free tier)
  - Deployed via `swa deploy ./out --env production`
  - Verified live: password gate and title "DEVAKE. | Geospatial Intelligence. Engineered." confirmed
