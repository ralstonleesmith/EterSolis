# Payment Reconciliation SOP

## Purpose

Define the internal EFT/bank-transfer ledger workflow.

## Rules

- Proof upload is evidence, not payment confirmation.
- Finance must match proof against the bank ledger before marking an invoice paid.
- Partial matches, overpayments and unmatched proofs remain visible until resolved.
- Every reconciliation decision stores actor, amount, status, ledger reference and notes.

## Records

- `payment_proofs`
- `payment_reconciliations`
- `payment_allocations`
- `receipts`
