# Sri Vigneshwara Packaging: SEO and growth plan

## What this release changes

- Public sitemap: `/sitemap.xml`, listing the six existing public pages.
- Robots: `/robots.txt`, with the production sitemap URL. Admin/API crawling remains restricted; login and admin pages explicitly use noindex.
- Canonicals: all public pages point to `https://srivigneshwarapackaging.com`, independently of OAuth environment variables.
- Unique page titles/descriptions and social cards. Homepage SEO title, description and optional OG image use the existing CMS SEO fields. Other pages have route-specific metadata.
- Generated 1200 × 630 sharing image: `/opengraph-image`. A CMS OG image overrides this for the homepage.
- One H1 per public page, corrected catalogue heading order, repaired About/legal skip links, crawlable navigation, and legacy Process links mapped to the material section.
- Business JSON-LD uses the published company/contact content and escapes embedded markup safely. No invented reviews, ratings, price offers or certification schema.
- WebP alternatives for all bundled PNG/JPEG public images; originals remain available for old links. Responsive Next.js image delivery, correct mobile image sizes and lazy loading below the fold. Arbitrary remote CMS images render directly, without an unrestricted server image proxy.
- New JPG/PNG/WebP CMS uploads are resized to at most 1920px and compressed. GIF/video uploads retain their format.
- The desktop intro is shortened from 4.8 seconds to 1.2 seconds, and skipped for touch devices, reduced-motion users and direct section links. Hero heading text renders immediately; contact content is server-rendered. Touch scrolling uses native behavior.
- Calculator controls fit narrow screens; the mobile menu can scroll on short screens.
- Production www redirects to non-www, HTTP forwarded requests redirect to HTTPS, and HSTS is emitted. Existing public route slugs are already short and readable; changing them solely to add keywords would require unnecessary redirects. New product identifiers must use lowercase hyphenated slugs.

## Required hosting checks before deployment

1. The observed live response identifies Vercel and already redirects HTTP to HTTPS. Check the actual application host, even if the domain is managed through Hostinger.
2. Set `NEXTAUTH_URL=https://srivigneshwarapackaging.com` on the application host. Keep the matching Google OAuth redirect `https://srivigneshwarapackaging.com/api/auth/callback/google` registered. The new www redirect makes this especially important; an OAuth flow must start and finish on the same host.
3. CMS uploads currently write to `public/uploads` on local disk. That pre-existing storage design is not persistent on Vercel serverless deployments. Use durable object storage before relying on production CMS uploads; compression does not solve persistence. Existing external image URLs can still be used. No storage provider has been provisioned by this change.
4. Publish/redeploy the code, then run `SEO_CHECK_URL=https://srivigneshwarapackaging.com npm run check:seo` from `frontend`.
5. Verify the domain in Google Search Console and submit `/sitemap.xml`. Inspect the homepage, About, Products and Lab URLs. No indexing or ranking guarantee is possible.
6. Run PageSpeed Insights on the deployed mobile and desktop pages. Use Search Console's field data to confirm Core Web Vitals after traffic accumulates. Target 75th-percentile LCP ≤2.5s, INP ≤200ms and CLS ≤0.1. Local layout/build checks are not field performance scores.

## Content to add next

- Exact factory street address, postcode, map pin and confirmed opening days/hours. Current saved content still says 9 AM–7 PM; the owner previously specified 9–5. Confirm operating days before changing it.
- Clarify whether the stated 200 tonnes is monthly capacity, annual capacity or actual production. Use the unit and period together everywhere.
- Real factory, printing, die-cutting, stitching/gluing and inspection photographs, each with a plain-language caption. Do not label generated packaging artwork as a factory photograph.
- Certificate numbers, issuing bodies, scope and validity dates for applicable ISO/FSC claims. GST registration belongs in company/legal information; it is not a quality certification.
- Two or three client-approved case studies with the initial packaging problem, construction chosen and documented result. Get permission before displaying customers' logos or attributing quotations.
- Product pages only when there is enough distinct material: applications, dimensions, flute/board choices, print options, MOQ, tolerances, lead times and an inquiry CTA. Avoid duplicating the catalogue into thin pages.
- A practical guide comparing 3-, 5- and 7-ply construction, and a downloadable specification checklist. Explain that load capacity depends on board strength, dimensions, handling and stacking; ply alone does not guarantee a weight rating.

## Claims to verify or remove in the CMS

The current rendered content includes “10M+ boxes annually”, “500+ happy clients”, “Fortune 500”, “100% recycled content”, “zero waste to landfill”, “carbon neutral operations”, delivery/response promises and a decade-by-decade history. These are existing claims, not independently verified in this work. Keep only statements supported by current records. The known seeded email typo `svcatons2015@gmail.com` is corrected to the owner's supplied `svcartons2015@gmail.com` when content is read.

Do not add keyword-stuffed headings or alt text, hidden SEO text, fake ratings/reviews, fabricated opening dates, unsupported green claims, duplicate city pages or bought ranking links. Decorative images can legitimately have empty alt text; informative images need accurate descriptions.

## 90-day backlink strategy

### Days 1–30: accurate business presence

- Verify and complete the business's Google Business Profile with the same name, address, phone and canonical website URL used on the site.
- Audit existing business listings and correct duplicate or outdated contact details.
- Make a short list of genuine packaging/manufacturing associations, local business chambers and relevant supplier directories. Seek a listing only where the business is eligible or already a member; review quality and any fees first.
- Track each opportunity: organisation, relevant page, relationship, contact, proposed resource, outreach date, reply, published URL and resulting inquiries.

### Days 31–60: earn relevant references

- Publish the specification checklist and one technical guide reviewed by the manufacturing team.
- Ask existing suppliers and approved customers whether a useful case study or supplier profile would help their readers. A link should be an editorial choice, not a purchase or mandatory reciprocal arrangement.
- Pitch original, documented packaging improvements to relevant trade editors. Offer useful technical evidence, not generic promotional copy.

### Days 61–90: build on results

- Publish one more substantiated case study and update the guide from buyer questions.
- Contact sites that already mention the company and politely suggest a link to the relevant page when it helps readers.
- Review referral inquiries, relevant referring domains, Search Console impressions/clicks and quote conversions monthly. Prioritise qualified business inquiries over raw link counts or third-party “authority” scores.

No outreach, directory submissions, account changes or paid placements have been performed. Suggested outreach: “We recently published a practical corrugated-box specification checklist based on questions our buyers ask. If it would help readers of your packaging resources page, you are welcome to reference it. I can also provide technical clarification.” Personalise it to a genuine relationship and relevant page.

## References

- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: robots and noindex](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google: link-spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

## Repeatable checks

From `frontend`: `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm run check:seo` against a running server. `npm run optimize:images` regenerates local image derivatives. Review compressed visuals and repeat mobile checks after changing CMS images, navigation or headings.

## Verification for this change — 15 September 2026

- Production build and TypeScript passed.
- All six public pages passed automated metadata, canonical, indexing, H1, heading-order, alt-attribute and internal-link checks against the local production build.
- Sitemap, robots, login noindex, business JSON-LD and the generated OG image passed response checks.
- All six public pages had one H1 and no page-level horizontal overflow at 320px, 768px and 1440px. Mobile Contact navigation was exercised in the production build.
- Both www-to-non-www and forwarded HTTP-to-HTTPS returned permanent 308 redirects preserving `/products`.
- Five main packaging photographs: 10,329,296 source bytes to 633,410 WebP bytes (about 94% smaller). Originals retained for compatibility. This is asset compression, not a measured LCP improvement.
- Lint has five pre-existing warnings in dashboard memo dependencies, unused catch variables and a database eslint comment; no source errors. Next.js also reports the existing middleware-to-proxy deprecation.
- These changes have not been pushed or deployed. Live field Core Web Vitals, Google indexing, external listing accuracy and authenticated production uploads remain outside the completed local checks.

## Follow-up verification — 16 September 2026

- The new product catalogue uses 26 compressed WebP photographs across four product families, with responsive Next.js image delivery and descriptive alt text.
- Product-page title and description now match the photographed box and tray range instead of the older generic catalogue.
- Robots now explicitly excludes `/auth/` in addition to admin and API routes; private pages retain `noindex` while every public page remains indexable.
- LocalBusiness markup now uses a PostalAddress and factual service area. WebSite and inner-page BreadcrumbList markup were added without ratings, reviews, prices or other unsupported claims.
- All six public pages passed the rendered metadata, canonical, indexing, H1, heading-order, alt text, internal-link, sitemap, robots, OG image and structured-data audit.
- The product page had no horizontal overflow at 320px, 375px or 1440px, loaded with one H1, and produced no browser console errors.
- Production build, TypeScript and lint passed. HTTPS/www redirects returned permanent 308 responses and the canonical page returned HSTS, nosniff and strict-origin referrer headers.
