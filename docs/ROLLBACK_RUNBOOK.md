# Rollback Runbook

## Rules

- Do not drop operational portal tables during an emergency rollback.
- Revert the application deployment to the previous known-good version.
- Leave additive migration records intact unless a database administrator approves a targeted corrective migration.
- Preserve case, quotation, invoice, payment and audit history.

## Recovery

Use delivery-event recovery screens for failed CRM/email/analytics side effects and document the incident in release notes.
