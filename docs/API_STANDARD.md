# EterSolis API Standard

New API routes, and all `/api/v1/*` routes, use a standard response envelope:

```json
{
  "ok": true,
  "requestId": "req_...",
  "data": {},
  "error": null
}
```

Errors use:

```json
{
  "ok": false,
  "requestId": "req_...",
  "data": null,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid submission."
  }
}
```

## Request IDs

- Accept `x-request-id` when it is safe and well-formed.
- Generate `req_<uuid>` otherwise.
- Include the request ID in responses, logs, audit events, outbound events and CRM/email payloads.

## Public And Admin Boundary

- Public APIs are unauthenticated but protected by Turnstile, validation and rate limits.
- Admin APIs require authentication and role checks before returning operational data.
- Existing legacy routes remain compatibility aliases until consumers move to `/api/v1/*`; their wire shape may remain legacy for compatibility.
- v1 public intake routes must use request IDs, route-specific rate limits and durable outbound event persistence.
