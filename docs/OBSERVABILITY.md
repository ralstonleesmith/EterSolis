# EterSolis Observability

Observability exists to make intake, delivery and operational failures visible.

## Structured Log Fields

- `timestamp`
- `requestId`
- `route`
- `method`
- `status`
- `durationMs`
- `ipHash`
- `userAgentHash`
- `submissionId`
- `serviceRequestId`
- `opportunityId`
- `userId`
- `errorCode`

## Portal Events

Persistent portal routes must propagate request IDs into case events, quotation events, invoice events, reconciliation records and workflow events. Logs should include case reference, route, method, actor type, commercial transition, payment transition, file access/export activity and request ID.

## Metrics To Track

- lead submissions
- service requests
- waste submissions
- validation failures
- Turnstile failures
- rate-limit blocks
- CRM failures
- email failures
- queue depth
- dead letters
- SLA breaches

## Alerts

Alert on readiness failure, 5xx spikes, queue dead letters, CRM/email failure spikes, database pressure, SLA breaches and repeated admin login failure.
