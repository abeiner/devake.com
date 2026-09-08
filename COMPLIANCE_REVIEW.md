# Website Compliance Review

Reviewed: 8 September 2026

Scope: the selected Header Variant 1 source code in this repository

This is a technical compliance and legal-risk review, not a legal opinion or a
guarantee against claims. Devake should have UAE counsel confirm the final
policies, business identifiers, contracts, and target-market requirements
before treating this as a final legal sign-off.

## Implemented

- Added Privacy Policy, Terms & Conditions, Cookie Policy, Refund Policy, and
  Accessibility Statement pages with unique page titles.
- Added policy links and the known Devake FZE business name, office address,
  P.O. box, and email address to the public site.
- Changed the inquiry form so the name is optional, only the email address and
  project brief are required, and visitors are asked not to send sensitive
  information.
- Added a required privacy-policy acknowledgment beside the form. It is an
  acknowledgment, not a forced marketing-consent checkbox; the applicable
  processing basis may instead be steps requested before a contract.
- Added visible labels, field names, maximum lengths, native field types,
  resizable text area, a clear submit label, a live status message, and stronger
  keyboard-focus indicators.
- Removed the hidden honeypot because the website does not submit to a server
  and therefore does not need a spam trap.
- Removed the preloader's `sessionStorage` flag. The one-time animation state is
  now kept only in memory and is not written to the visitor's device.
- Removed the unused public photograph `public/alex-devake.jpg`; its provenance
  and usage rights were not documented and it did not need to be publicly
  downloadable.
- Removed the unverified description of the forestry client as “one of the
  biggest” and removed “secure” from the storage capability claim. The case
  study now attributes the limited claim to Devake and states what has not been
  made public.
- Found no reviews or testimonials in the source, so there were no fake reviews
  to remove.
- Added lightweight regression tests that fail if tracking/storage APIs,
  iframes, missing legal pages, an unlabeled plain image, or the removed photo
  are reintroduced.

## Cookies and consent decision

No cookie-consent banner is needed for the source reviewed because the site:

- sets no cookies;
- writes neither local storage nor session storage;
- includes no analytics, advertising pixels, behavioral tracking, tag manager,
  chat widget, embedded video, social widget, or iframe;
- loads its fonts and visual assets from the same site; and
- uses ordinary outbound links rather than third-party embeds.

The site is hosted on Microsoft Azure Static Web Apps. Hosting and network
providers can still create ordinary request/security logs, as described in the
Privacy Policy. The Cookie Policy must be reviewed and a consent mechanism may
be needed *before* any non-essential storage, analytics, pixels, or embeds are
added. The UK's current storage/access guidance, for example, says consent is
required unless an exemption applies; being merely helpful or convenient is
not sufficient for the strictly-necessary exemption ([ICO guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/)). EU rules similarly address storing or accessing information on a user's device ([ePrivacy Directive, Article 5(3)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32002L0058)).

Header checks on 8 September 2026 found no `Set-Cookie` response on either the
current Azure production URL or the Header Variant 1 preview URL. Recheck after
every hosting, proxy, authentication, or platform change.

## Data flow

The project-inquiry form uses a `mailto:` URL. The website does not send the
form to Devake, an API, or a database. It creates a draft in the visitor's email
application. If the visitor sends it, the information then passes through the
visitor's and Devake's email providers. Current intended fields are:

| Data | Required | Purpose |
|---|---:|---|
| Name | No | Personalize the reply |
| Email address | Yes | Reply to the inquiry |
| Project brief | Yes | Understand the requested work |
| Privacy acknowledgment | Yes | Confirm the notice was presented |

There is no newsletter opt-in, marketing list, account, payment flow, upload,
or automated decision-making in the reviewed code.

## Analytics and third parties

Source inspection found no Google Analytics, Google Tag Manager, Meta Pixel,
Clarity, Hotjar, Mixpanel, PostHog, analytics endpoint, third-party script,
iframe, or embedded media. The only external destinations are user-initiated
links (Google Maps and the design credit). Google fonts are compiled and served
locally by the Next.js build rather than fetched by the browser from Google.

Repeat this audit whenever a marketing, analytics, video, map, scheduling,
support-chat, CAPTCHA, payment, or form-provider tool is added. Also record the
provider, data fields, processing purpose, retention, location, contract, and
whether it must be blocked until consent.

## Accessibility review

The code now includes semantic landmarks and headings, skip navigation, visible
field labels, keyboard-operable links/buttons, focus trapping and restoration
for the modal menu, native validation, reduced-motion handling, status
announcements, and decorative treatment for the canvas and SVG graphics.
There are no content photographs or plain `<img>` elements in the current
interface; the animated point cloud and logo artwork are decorative and hidden
from assistive technology while nearby text provides the relevant meaning.

Measured palette contrast:

| Pair | Ratio | WCAG 2.2 AA result |
|---|---:|---|
| Cream `#FFFDD8` / dark `#0A0A0C` | 19.12:1 | Pass |
| Red `#FF3831` / dark `#0A0A0C` | 5.52:1 | Pass for normal text |
| Dark red `#D72B27` / cream `#FFFDD8` | 4.76:1 | Pass for normal text |
| 50% cream composite / dark | 5.20:1 | Pass for normal text |
| 60% dark composite / cream | 5.20:1 | Pass for normal text |

All meaningful small text uses at least the passing 50% treatment. Lower
opacity content is decorative and hidden from assistive technology. WCAG 2.2
requires 4.5:1 for normal text and 3:1 for large text and includes keyboard,
focus, labeling, and status requirements ([W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)). Automated checks cannot prove full accessibility; manual
keyboard, zoom, mobile, and screen-reader tests remain part of every release.

## Image, logo, and copyright review

- No stock photography or external image embed is shipped.
- The removed photograph can be recovered from Git history if documented
  permission is later supplied.
- Logo designed by Aleksandra Beiner. Original source files and dated project
  history are retained.
- Space Grotesk and IBM Plex Mono are licensed under the SIL Open Font License
  1.1. The build self-hosts them and `public/font-licenses/NOTICES.txt` now
  accompanies the redistributed font files with both copyright notices and the
  full license text ([Space Grotesk source](https://github.com/floriankarsten/space-grotesk),
  [IBM Plex source](https://github.com/IBM/plex)).
- `public/noise.png` is a project-local texture, but its creation/source record
  should be retained with the handoff if available.
- The site's layout, animation, code, and copy should not be reused from a
  third party without a license. UAE copyright and trademark protections cover
  relevant creative and brand assets ([UAE intellectual-property overview](https://u.ae/en/information-and-services/business/intellectual-property),
  [UAE Copyright Law](https://uaelegislation.gov.ae/en/legislations/1534/download)).

## Applicable-law issue spotting

### United Arab Emirates

Devake FZE is listed in Dubai, UAE. The federal Personal Data Protection Law
regulates electronic personal-data processing and includes data-subject rights
and cross-border-transfer requirements ([official UAE data-protection overview](https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws.)).
The published policy reflects the current minimal inquiry flow, but the owner
must confirm the actual email/hosting providers, contracts, transfer locations,
security practices, and retention process.

UAE consumer rules for e-commerce suppliers can require the supplier's name,
legal status, address, licensing authority, and sufficient Arabic information
about goods/services, terms, payment, and warranty ([Federal Law No. 15 of 2020,
Articles 25–26](https://www.uaelegislation.gov.ae/en/legislations/1455/download)).
The reviewed site is a B2B informational site with no checkout or online
contract formation, which materially reduces this risk. Reassess before adding
consumer sales, prices, checkout, subscriptions, or standardized digital
products.

### Visitors outside the UAE

Making a website reachable in Europe does not by itself establish that the EU
GDPR applies; targeting people in the EEA or monitoring their behavior are key
questions ([EDPB territorial-scope guidance](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-32018-territorial-scope-gdpr-article-3-version_en)).
If Devake actively markets to, contracts with, or monitors people in a new
jurisdiction, obtain a local applicability review. The same applies to
sector-specific duties and US state privacy laws if business scale, targeting,
or data practices change.

## Owner decisions and unresolved risks

These items cannot be safely invented or verified from the repository:

1. Confirm the complete legal entity name, trade-license/registration number,
   licensing authority, and VAT/tax details if publicly required. The site is
   an informational B2B company website and intentionally does not publish a
   business phone number.
2. Confirm that Devake controls `alex@devake.com`, the office address is current,
   and the final production domain is owned by Devake.
3. Confirm the name and location of the actual email provider, Azure account
   owner, log-retention settings, data-processing agreements, access controls,
   breach-response process, and deletion workflow.
4. Establish and follow a proportionate deletion process for inquiry records
   once they are no longer needed for the purposes stated in the privacy policy.
5. Confirm documentary support for every capability and case-study statement,
   including “companies around the world,” “several projects,” client market,
   industry, and the displayed technology list.
6. Retain source records for the noise texture, copy, and any future media. The
   Devake logo authorship and open-source font licenses are already documented
   in the repository.
7. Have UAE counsel approve the governing-law/liability language and determine
   whether Arabic policies or additional free-zone rules apply to this entity.
8. Add a formal processor/vendor register and reassess privacy, cookies,
   security, accessibility, refunds, and consumer disclosures before adding any
   form backend, analytics, advertising, embeds, payments, accounts, uploads, or
   automated decisions.
9. Do not publish the policies with claims about practices that the business
   does not actually follow. Written procedures and staff behavior must match
   the website.
