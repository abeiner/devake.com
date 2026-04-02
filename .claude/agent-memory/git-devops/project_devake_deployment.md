---
name: devake.com Deployment
description: Azure and GitHub deployment details for the devake.com project
type: project
---

Live URL: https://green-ocean-01168ac1e.6.azurestaticapps.net
GitHub: https://github.com/abeiner/devake.com (branch: main)
Azure app name: devake-com
Resource group: elderhelpers-rg (West US 2, Free tier)
Subscription: 86992cac-c577-4c08-85b0-ee1482719e8d

**Why:** Direct swa CLI deploy (no GitHub Actions) because `az staticwebapp create --login-with-github` requires interactive browser OAuth which is incompatible with agent automation.

**How to apply:** For future deployments of this project, use `swa deploy ./out --deployment-token <token> --env production`. Get token with `az staticwebapp secrets list --name devake-com --resource-group elderhelpers-rg --query "properties.apiKey" --output tsv`.
