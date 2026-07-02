# Automation SOP

## Purpose

Define queue-backed automation for email, CRM, analytics, reminders, workflow events and recovery tasks.

## Rules

- Side effects are persisted before delivery attempts.
- Retries use controlled schedules and move exhausted events to dead-letter state.
- Admin recovery screens must expose status, attempts, next retry time, last error, retry and resolve actions.

## Records

- `outbound_events`
- `workflow_events`
- `webhook_deliveries`
- `crm_sync_records`
- `email_delivery_records`
