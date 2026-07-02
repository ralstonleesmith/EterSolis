# EterSolis Preview System

The preview system supports low-cost executive review without replacing the production Next.js app. It provides static HTML previews, generated screenshots and generated page HTML for review and approval.

## Preview Types

### Curated executive previews

Curated previews live in `previews/*.html` with shared styling in `previews/styles.css`. These are lightweight approval views. They should accurately reflect the current structure, tone, layout and visible content of the production pages they represent.

### Generated live previews

Generated previews are captured from the current Next.js application by the Playwright capture test. The default output folder is `previews/generated/`.

Generated output includes an index page, one HTML snapshot per route, one full-page screenshot per route and a manifest file with route-to-file mapping.

Generated previews are preferred for final visual review because they reflect the actual rendered app.

## Required Preview Coverage

The review set must cover Home, Get Started, certificate verification, Solutions, Industries, About, Contact, Insights, Newsletter Issue 001, Technical Brief reader, Helios, KYMNIS Overview, KYMNIS How It Works, KYMNIS Verification, KYMNIS Resource Recovery, KYMNIS Contact, Media Credits, Privacy and Terms.

## Preview Update Rules

Update previews in the same pull request when page content, visible copy, hero layout, CTA order, card layout, form layout, visual hierarchy, light/dark behavior, navigation, footer, logo usage, media, legal notices, form fields, warnings or submission notices change.

## Executive Review Instructions

1. Open `previews/index.html` for the curated review pack.
2. Generate live previews for final rendered review and open `previews/generated/index.html`.
3. Review desktop and mobile screenshots.
4. Confirm all pages use official EterSolis branding and transparent logo assets.
5. Confirm Helios and KYMNIS use cropped production assets with no visible variant labels, palette-board annotations or guide text.
6. Confirm light mode uses dark readable text and appropriate dark logo/icon variants.
7. Confirm dark mode uses light readable text and appropriate light, white/gold or full-color logo/icon variants.
8. Confirm obsolete internal platform-separation terminology is absent from public copy and generated previews.
9. Confirm no page is merely whitespace with listed text.
10. Confirm every page has clear hierarchy, professional composition, CTA path and mobile-friendly layout.
11. Confirm Get Started and Terms preserve non-binding, no-unsolicited-delivery and controlled-review language.
12. Confirm the Technical Brief reader is manual: arrows, keyboard, swipe and page input work, and the reader never auto-advances.
13. Record the approval decision in the pull request or release checklist.

## Approval States

Use these approval states in pull request comments or review notes:

- Approved for production release
- Approved subject to copy changes
- Approved subject to visual changes
- Hold: legal/privacy review required
- Hold: technical QA required

## Quality Gate

A preview update is complete only when static previews align with the current pages, generated previews can be produced without test failure, link audit passes and visual concerns are either resolved or documented for the next pull request.
