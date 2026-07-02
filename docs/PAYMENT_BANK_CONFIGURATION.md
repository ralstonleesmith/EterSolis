# Payment Bank Configuration

## Purpose

EterSolis receives manual invoice payments through configured bank-transfer instructions. Raw account numbers must not be committed to the repository, rendered in public previews, or exposed in client-side bundles.

## Environment Variables

Configure production with:

```txt
PAYMENT_ZAR_BANK_NAME=
PAYMENT_ZAR_BRANCH_CODE=
PAYMENT_ZAR_SWIFT_CODE=
PAYMENT_ZAR_ACCOUNT_NUMBER=
PAYMENT_USD_BANK_NAME=
PAYMENT_USD_ROUTING_NUMBER=
PAYMENT_USD_ACCOUNT_NUMBER=
```

The repository includes only masked fallback display values and routing metadata. Full account numbers belong in the production secret store or host environment.

## Runtime Use

`src/lib/paymentInstructions.ts` reads server-side environment variables and returns masked payment instructions for manual invoice workflows. `src/lib/payments/manual.ts` attaches these instructions to the manual checkout result.

## Security Rules

- Do not commit raw bank account numbers.
- Do not expose full bank details in public pages or generated previews.
- Do not place payment account details in `NEXT_PUBLIC_*` variables.
- Only invoice, finance and reconciliation workflows should display full payment instructions after controlled quotation/invoice gates.
