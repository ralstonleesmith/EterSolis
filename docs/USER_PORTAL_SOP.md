# User Portal SOP

## Purpose

Define the customer-facing portal workflow for guest users and registered users. The portal must support case continuation, quotation review, invoice review, proof upload, scheduling status, certificate visibility and permanent history without exposing internal notes, pricing logic, logistics detail or private operator evidence.

## Operating Rules

- Every portal record must be tied to a durable case reference and secure public token or authenticated account.
- Guest access may continue a case, but account claiming must not weaken token security.
- Payment collection is not requested until quotation and invoice gates are satisfied.
- Public pages use deterministic demo data in previews and never require production secrets.

## Required Records

- `cases`
- `case_events`
- `case_qr_codes`
- `case_files`
- `quotations`
- `invoices`
- `payment_proofs`
- `appointments`
- `certificates`

## Audit

Portal views that reveal case status, invoices, proof upload state or certificates must record request IDs when backend persistence is active.
