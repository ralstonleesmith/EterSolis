# EterSolis Database Migrations

Migrations live in `database/migrations/` and are applied in filename order after the baseline schema.

## Current Sequence

```txt
database/schema.sql
database/migrations/2026-07-etersolis-operations.sql
database/migrations/0001_current_baseline.sql
database/migrations/0002_operational_entities.sql
database/migrations/0003_delivery_queue.sql
database/migrations/0004_admin_auth_rbac.sql
database/migrations/0005_documents_and_storage.sql
database/migrations/0006_scoring_and_sla.sql
database/migrations/0007_kymnis_internal.sql
database/migrations/0008_governance_retention.sql
database/migrations/0009_operational_portal.sql
```

## Rules

- Every migration must insert into `schema_migrations`.
- Additive migrations are preferred.
- Destructive migrations require a rollback note and staging verification.
- Existing lead and service-request records must remain queryable during normalization.

## Staging

Run migrations against staging before production and verify:

- schema version records exist;
- public forms still submit;
- admin pages load;
- delivery event tables are writable;
- readiness still reports expected configuration.

## Non-Destructive Check

Run:

## 0009 Operational Portal

`database/migrations/0009_operational_portal.sql` is additive and self-registering. It introduces the full portal record set required for the operational portal foundation:

- `markets`, `market_payment_methods`, `bank_accounts`
- `cases`, `case_events`, `case_qr_codes`, `case_files`
- `quotations`, `quotation_lines`, `quotation_events`, `quotation_acceptances`
- `invoices`, `invoice_lines`, `invoice_events`
- `payment_proofs`, `payment_reconciliations`, `payment_allocations`, `receipts`, `refunds`
- `appointments`, `stockpile_lots`, `processing_batches`, `workflow_events`

The migration keeps existing lead, waste opportunity and service request records in place. Fix forward with later migrations after production application; do not edit applied migration SQL.

```bash
npm run migrations:check
```

Without `DATABASE_URL`, the command verifies the committed numbered migration files and registry conventions. With `DATABASE_URL`, it also verifies required operational tables are present without applying or modifying schema.
