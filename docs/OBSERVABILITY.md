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
