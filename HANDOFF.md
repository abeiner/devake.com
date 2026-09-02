# Project Handoff — devake.com

## Deliverables

- Source repository: <https://github.com/abeiner/devake.com>
- Live Azure site: <https://green-ocean-01168ac1e.6.azurestaticapps.net>
- Setup and editing guide: [README.md](README.md)
- Deployment procedure: [DEPLOYMENT.md](DEPLOYMENT.md)
- Final verification record: [QA_REPORT.md](QA_REPORT.md)

## Access to Transfer

The receiving owner should have:

- access to the GitHub repository;
- an appropriate role on the `devake-com` Azure Static Web App;
- access to the production domain and DNS provider when a custom domain is
  connected;
- ownership of the public email address and any future analytics account.

Never send an Azure deployment token in chat or email. Grant account access or
generate a token only for the release operation.

## Content Approval Before Official Launch

Confirm with the business owner:

- company name and legal entity;
- email and physical address;
- capability descriptions;
- forestry case-study wording and disclosure level;
- map destination;
- copyright range;
- final domain and analytics/privacy requirements.

## Functional Notes

- The site is a static Next.js export; there is no application server or
  database.
- The contact form validates locally and opens the visitor's email client with
  a pre-filled draft.
- The site does not store or transmit submitted form data.
- Smooth scrolling and visual motion respect the user's reduced-motion
  preference.
- The navigation is a modal overlay and intentionally locks page scrolling
  while open.

## Release Checklist

1. Pull the approved source revision.
2. Run `npm ci`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Smoke-test desktop, tablet, mobile, keyboard navigation, and the form.
6. Deploy `out/` using the procedure in [DEPLOYMENT.md](DEPLOYMENT.md).
7. Verify the production URL and security headers.
8. Record the release commit and date.

## Recommended Next Steps

- Connect and verify the final custom domain.
- Decide whether to retain direct token deployment or add GitHub Actions.
- Add automated end-to-end tests if the site will receive frequent updates.
- Add privacy-compliant analytics only after owner approval.
- Replace the email-draft workflow with a hosted form endpoint only if server
  submissions are required.
