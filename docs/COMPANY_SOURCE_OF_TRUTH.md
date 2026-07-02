# EterSolis Company Source Of Truth

This document is the high-level source of truth for what EterSolis is, what the website and operating portal support, and where deeper implementation details live.

## Company Position

EterSolis is a privately owned resource recovery, waste and carbon management company. The public system must present the full scope of waste, resource recovery, carbon management, circular economy services, certification, repurpose, destruction, pickup, delivery, controlled assessment and operational intelligence. Wastewater is one supported capability, not the whole company position.

## Active Digital Systems

- Public website: `etersolis.com`.
- Operational intake: `/get-started` and service-request APIs.
- Customer portal preview: `/portal` and portal subroutes.
- Admin command center preview: `/admin` and operational admin subroutes.
- KYMNIS public foundation: `/kymnis` and KYMNIS public subroutes.
- Helios guided routing: `/helios` and embedded launcher.
- Insights and publication system: `/insights`, newsletter pages and technical brief reader.
- Public verification: service-request status and certificate verification routes.

## Operating Model

The default commercial model is customer-paid service. Purchase or rebate language appears only as controlled eligibility review. The portal operating model is:

```txt
intake
-> case reference and QR
-> technical and commercial review
-> quotation
-> quotation acceptance
-> invoice
-> proof upload
-> reconciliation
-> scheduling
-> receiving
-> stockpile or processing
-> certificate decision
-> closure
```

Manual invoice payment instructions are server-side configuration. Raw bank account numbers must not be committed to the repository or exposed in public previews.

## Backend Truth

- The backend remains inside the Next.js App Router application.
- PostgreSQL is the first persistence layer for operational entities, delivery events, rate limits, migrations, governance and portal tables.
- New v1 APIs must return `{ ok, requestId, data, error }`.
- Legacy endpoints remain compatibility endpoints until replacement workflows are stable.

Deeper sources:

- [Backend Architecture](./BACKEND_ARCHITECTURE.md)
- [API Standard](./API_STANDARD.md)
- [Database Migrations](./DATABASE_MIGRATIONS.md)
- [Delivery Queue](./DELIVERY_QUEUE.md)

## Portal Truth

The portal foundation is prepared by `database/migrations/0009_operational_portal.sql` and visible through deterministic preview pages. It covers cases, QR records, case files, quotations, invoices, payment proofs, reconciliation, receipts, refunds, appointments, stockpile lots, processing batches and workflow events.

Deeper sources:

- [User Portal SOP](./USER_PORTAL_SOP.md)
- [Admin Portal SOP](./ADMIN_PORTAL_SOP.md)
- [Case Lifecycle SOP](./CASE_LIFECYCLE_SOP.md)

## Protected Boundaries

Public pages and verification routes must never expose internal notes, private documents, proof images, sensitive logistics, operator notes, pricing logic or protected KYMNIS internals.

Deeper sources:

- [Privacy and Security SOP](./PRIVACY_SECURITY_SOP.md)
- [KYMNIS Protected Backend](./KYMNIS_PROTECTED_BACKEND.md)
- [Data Governance](./DATA_GOVERNANCE.md)

## Release Truth

The current package version is controlled by `package.json`, `package-lock.json`, [Changelog](./CHANGELOG.md), and the generated README index. Before release, run the documented gates in [Testing SOP](./TESTING_SOP.md) and [Launch Checklist](./LAUNCH_CHECKLIST.md).
