# Technical Brief Reader

The technical brief reader is image-backed and manually controlled. It must never auto-cycle through the publication.

## Current Implementation

- `TechnicalBriefReader` renders publication page images.
- Users navigate with buttons, keyboard arrows, swipe gestures, a page input and thumbnail buttons.
- Adjacent pages are preloaded only when available.
- The approved PDF and print view remain available.

## Page Asset Generation

Run:

```bash
npm run brief:pages
```

The script expects `pdftoppm` from Poppler. Output path:

```txt
public/media/technical-intelligence-brief/pages/
```

This environment currently has only the approved page-1 PNG committed, so the reader is ready for all pages once page assets are generated.
