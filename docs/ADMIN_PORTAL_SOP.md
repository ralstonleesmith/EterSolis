# Admin Portal SOP

## Purpose

Define the administrative command center for case control, quotation approval, invoice issuance, payment reconciliation, scheduling, receiving, stockpile, processing, certificates, refunds, delivery recovery and audit review.

## Roles

- `super_admin`
- `executive`
- `commercial_manager`
- `technical_reviewer`
- `operations_reviewer`
- `privacy_officer`
- `read_only_auditor`

## Controls

- Shared-secret admin is an MVP compatibility control only.
- Auth.js with Google SSO and RBAC remains the planned production admin-auth pass.
- Sensitive record views, exports, status changes and payment decisions must create access logs or case events.

## Required Admin Screens

Admin coverage now includes cases, quotations, invoices, reconciliation, refunds, receiving, stockpile, processing, service requests, pickups, deliveries, payments, certificates, delivery events, audit and analytics.
