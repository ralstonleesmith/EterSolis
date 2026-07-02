# EterSolis Data Governance

The backend stores commercial, operational, safety and privacy-sensitive records. Governance tables support consent, access logging, retention and deletion workflows.

## Data Classes

- `public`
- `internal`
- `confidential`
- `nda_required`
- `privacy_sensitive`
- `regulated_material`

## Required Controls

- Do not store raw IP addresses; store HMAC hashes only.
- Store consent text version and timestamp.
- Log sensitive reads, downloads, exports, status changes and deletion/anonymization.
- Assign retention categories to documents and records.
- Treat KYMNIS evidence as protected unless explicit public visibility is approved.
