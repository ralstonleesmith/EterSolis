# EterSolis Newsletter System

The newsletter system publishes approved EterSolis issues as accessible HTML with the original approved PDF retained for download.

## Source Format

Newsletter issues live in `content/insights/*.md`. Each file uses JSON frontmatter followed by structured Markdown content.

Required metadata:

- `slug`
- `issueNumber`
- `title`
- `subtitle`
- `author`
- `authorRole`
- `publicationDate`
- `summary`
- `tags`
- `status`
- `canonicalPath`
- `pdfPath`
- `coverImage`
- `sourceNotes`
- `sourcePdf`

## Editorial Standard

- Publish HTML text for accessibility and search.
- Preserve approved PDF downloads for visual fidelity and review.
- Do not publish image-only issues as the primary web experience.
- Include source notes for public statistics and alignment statements.
- Avoid unsupported environmental, commercial or technical claims.
- Do not disclose KYMNIS internal architecture, pricing, counterparties or internal operating logic.

## Workflow

1. Add or update `content/insights/*.md`.
2. Add approved PDF and cover/page media under `public/media/newsletters/`.
3. Run `npm run insights:validate`.
4. Run `npm run newsletter:export -- --slug <slug>` when print/PDF output is required.
5. Run `npm run check` and `npm run preview:capture`.
6. Update changelog and README through normal version-control requirements.
