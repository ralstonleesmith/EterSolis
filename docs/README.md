# EterSolis Documentation Index

This folder is the codebase source of truth for EterSolis public systems, operating workflows, backend architecture, launch controls, portal operations, KYMNIS boundaries, deployment, recovery and release evidence.

Start here when you need an answer quickly.

## Fast Lookup

| Question | Source |
| --- | --- |
| What is EterSolis and what does the system do? | [Company Source of Truth](./COMPANY_SOURCE_OF_TRUTH.md) |
| What changed in the latest release? | [Changelog](./CHANGELOG.md) |
| How is the backend structured? | [Backend Architecture](./BACKEND_ARCHITECTURE.md) |
| What API response format is required? | [API Standard](./API_STANDARD.md) |
| What database migrations exist and in what order? | [Database Migrations](./DATABASE_MIGRATIONS.md) |
| How does the customer portal work? | [User Portal SOP](./USER_PORTAL_SOP.md) |
| How does the admin portal work? | [Admin Portal SOP](./ADMIN_PORTAL_SOP.md) |
| What is the case lifecycle? | [Case Lifecycle SOP](./CASE_LIFECYCLE_SOP.md) |
| How do quotation, invoice and payment controls work? | [Quotation SOP](./QUOTATION_SOP.md), [Invoice SOP](./INVOICE_SOP.md), [Payment Reconciliation SOP](./PAYMENT_RECONCILIATION_SOP.md) |
| How are files and evidence handled? | [File Upload Security SOP](./FILE_UPLOAD_SECURITY_SOP.md) |
| How are receiving, stockpile and processing handled? | [Receiving SOP](./RECEIVING_SOP.md), [Stockpile SOP](./STOCKPILE_SOP.md), [Processing SOP](./PROCESSING_SOP.md) |
| How are certificates controlled? | [Certificate SOP](./CERTIFICATE_SOP.md) |
| How does delivery retry and recovery work? | [Delivery Queue](./DELIVERY_QUEUE.md), [Automation SOP](./AUTOMATION_SOP.md) |
| What is public versus protected KYMNIS? | [KYMNIS Protected Backend](./KYMNIS_PROTECTED_BACKEND.md), [KYMNIS Internal Functionality](./internal/KYMNIS_INTERNAL_FUNCTIONALITY.md) |
| How are previews generated and reviewed? | [Preview System](./PREVIEW_SYSTEM.md) |
| How is the technical brief reader managed? | [Technical Brief Reader](./TECHNICAL_BRIEF_READER.md) |
| What must pass before launch? | [Launch Checklist](./LAUNCH_CHECKLIST.md), [Testing SOP](./TESTING_SOP.md) |
| How is production deployed or rolled back? | [Self Hosting](./SELF_HOSTING.md), [Google Cloud Hosting](./GCLOUD_HOSTING.md), [Deployment Runbook](./DEPLOYMENT_RUNBOOK.md), [Rollback Runbook](./ROLLBACK_RUNBOOK.md) |
| How is documentation kept current? | [Documentation Governance](./DOCUMENTATION_GOVERNANCE.md) |

## Executive Path

Read these in order:

1. [Company Source of Truth](./COMPANY_SOURCE_OF_TRUTH.md)
2. [Changelog](./CHANGELOG.md)
3. [Executive Review](./EXECUTIVE_REVIEW.md)
4. [Launch Checklist](./LAUNCH_CHECKLIST.md)
5. [Preview System](./PREVIEW_SYSTEM.md)

## Developer Path

Read these in order:

1. [Website Codebase SOP](./WEBSITE_CODEBASE_SOP.md)
2. [Developer Guide](./DEVELOPER_GUIDE.md)
3. [Backend Architecture](./BACKEND_ARCHITECTURE.md)
4. [API Standard](./API_STANDARD.md)
5. [Database Migrations](./DATABASE_MIGRATIONS.md)
6. [Delivery Queue](./DELIVERY_QUEUE.md)
7. [Testing SOP](./TESTING_SOP.md)

## Operations Path

Read these in order:

1. [User Portal SOP](./USER_PORTAL_SOP.md)
2. [Admin Portal SOP](./ADMIN_PORTAL_SOP.md)
3. [Case Lifecycle SOP](./CASE_LIFECYCLE_SOP.md)
4. [Quotation SOP](./QUOTATION_SOP.md)
5. [Invoice SOP](./INVOICE_SOP.md)
6. [Payment Reconciliation SOP](./PAYMENT_RECONCILIATION_SOP.md)
7. [Scheduling SOP](./SCHEDULING_SOP.md)
8. [Receiving SOP](./RECEIVING_SOP.md)
9. [Stockpile SOP](./STOCKPILE_SOP.md)
10. [Processing SOP](./PROCESSING_SOP.md)
11. [Certificate SOP](./CERTIFICATE_SOP.md)

## Governance, Security And Recovery

- [Data Governance](./DATA_GOVERNANCE.md)
- [Data Retention SOP](./DATA_RETENTION_SOP.md)
- [Privacy and Security SOP](./PRIVACY_SECURITY_SOP.md)
- [Observability](./OBSERVABILITY.md)
- [Error Handling SOP](./ERROR_HANDLING_SOP.md)
- [Restore and Recovery](./RESTORE_AND_RECOVERY.md)
- [Admin RBAC](./ADMIN_RBAC.md)

## Publication And Media Systems

- [Newsletter System](./NEWSLETTER_SYSTEM.md)
- [Technical Brief Reader](./TECHNICAL_BRIEF_READER.md)
- [Technical Intelligence Brief Source Folder](./technical-intelligence-brief/README.md)

## Historical Or Supporting Records

These are retained for audit context and should not be treated as current operating instructions unless a current SOP references them.

- [Upgrade 2026-06-14](./UPGRADE-2026-06-14.md)
- [CI Cost Optimizations](./ci-cost-optimizations.md)
- [Smoke Summary](./test-artifacts/SMOKE_SUMMARY.md)

## Documentation Rule

If a system behavior changes, update the relevant document in the same change. If a new system area is added, add it to this index and to [Company Source of Truth](./COMPANY_SOURCE_OF_TRUTH.md) when it affects company operations.
