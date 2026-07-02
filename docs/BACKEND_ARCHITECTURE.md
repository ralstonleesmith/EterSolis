# EterSolis Backend Architecture

The backend remains inside the Next.js application for this pass. Public routes, admin routes, service-request processing, delivery recovery and analytics all use shared server-side modules under `src/lib/`.

## Current Architecture

- Public compatibility APIs remain available at `/api/leads`, `/api/waste` and `/api/service-requests/*`.
- Versioned API routes under `/api/v1/*` use the standard `{ ok, requestId, data, error }` envelope.
- PostgreSQL is the first operational store for migrations, normalized entities, delivery events, rate-limit counters, audit history and governance records.
- Admin pages remain in the app, with Auth.js + Google SSO documented as the replacement path for the current MVP shared-secret guard.

## Backend Modules

- `src/lib/api/`: request IDs, response envelopes, structured logging, idempotency and rate-limit helpers.
- `src/lib/serviceRequests.ts`: service-request intake, persistence, audit and notification workflow.
- `src/lib/deliveryQueue.ts`: outbound event persistence, listing and manual recovery helpers.
- `src/lib/operations/`: taxonomy, validation, risk, commercial rules, scoring and analytics naming.
- `src/lib/payments/`: manual-invoice payment abstraction.

## Operating Rule

Do not add major operational features directly onto raw lead tables. Add migrations, tests, observability, queue/retry behavior and documentation first.

## 0.6.0 Finalization

- Public v1 intake persists outbound CRM/email events before immediate compatibility delivery attempts.
- `npm run migrations:check` verifies the numbered migration set and, when connected to PostgreSQL, required operational tables.
- Readiness reports the Postgres-first migration, delivery queue and rate-limit table expectations alongside runtime configuration status.
