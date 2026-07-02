# Restore And Recovery

## Portal Recovery

Portal rollback must preserve commercial and audit history. Do not truncate or drop `cases`, `quotations`, `invoices`, `payment_proofs`, `payment_reconciliations`, `receipts`, `refunds`, `stockpile_lots`, `processing_batches` or certificate records during an application rollback. Roll back the app and fix forward with a later migration.

## Initial Targets

- RPO: 24 hours or better.
- RTO: 4 hours or better.

## Restore Drill

1. Restore a recent encrypted backup into staging.
2. Apply migrations through the latest schema version.
3. Verify row counts for lead, service request, opportunity, delivery and audit tables.
4. Verify `/api/health` and `/api/readiness`.
5. Verify admin dashboard and delivery events load.
6. Submit a staging test intake and confirm queue records are created.

## Rollback

Rollback app code first. Roll back schema only when the migration has an explicit safe rollback path.
