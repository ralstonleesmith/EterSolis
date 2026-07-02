# EterSolis Delivery Queue

The delivery queue is Postgres-backed for the next operating pass.

## Tables

- `outbound_events`: queued CRM, email, analytics and admin-task events.
- `webhook_deliveries`: webhook delivery attempts and response metadata.
- `crm_sync_records`: idempotent CRM object sync state.
- `email_delivery_records`: transactional email delivery state.

## Retry Policy

Retries follow:

```txt
immediate -> 1 minute -> 5 minutes -> 30 minutes -> 2 hours -> dead-letter
```

Failed events are visible in `/admin/delivery-events` and recoverable through `/api/v1/admin/delivery-events/*`.

## Portal Workflow Events

The 0.7.0 migration adds `workflow_events` for case-bound reminders, quote and invoice notifications, reconciliation follow-up, scheduling prompts, certificate decisions and recovery tasks. `workflow_events` complements `outbound_events`; CRM, email and analytics delivery failures still belong in the outbound queue and delivery-events recovery console.

## Requirements

- No CRM or email failure should be silent.
- Manual retry and manual resolution must write admin actions.
- Delivery records must include request IDs where available.
