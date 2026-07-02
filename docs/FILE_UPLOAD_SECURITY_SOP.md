# File Upload Security SOP

## Purpose

Define controlled upload handling for material photos, SDS files, proof of payment, receiving evidence, disposition records and certificate evidence.

## Rules

- Uploads are metadata-first until object storage is configured.
- Store original name, MIME type, byte size, checksum, role, visibility and malware scan status.
- Never expose internal files, private documents, operator notes or proof images on public certificate verification pages.

## Records

- `case_files`
- `documents`
- `access_logs`
