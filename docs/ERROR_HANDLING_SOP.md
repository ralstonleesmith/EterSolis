# Error Handling SOP

## Purpose

Define customer-safe and admin-safe error behavior.

## Rules

- Versioned APIs return `{ ok, requestId, data, error }`.
- Public errors must not reveal stack traces, secrets, SQL or private record details.
- Admin errors must preserve request ID and enough context for recovery.
- Failed delivery events are handled through the queue and dead-letter workflow.
