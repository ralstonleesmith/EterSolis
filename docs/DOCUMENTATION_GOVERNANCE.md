# Documentation Governance

## Purpose

Documentation in this repository is part of the product. It must make the EterSolis codebase the source of truth for the company, its operations and its systems.

## Rules

- Every current operating document must be discoverable from [docs/README.md](./README.md).
- The root [README](../README.md) must point readers to the documentation index and show the current package version.
- Historical notes may remain, but they must be labeled as historical or supporting records in the documentation index.
- Do not duplicate core operating instructions across many files. Link to the source document instead.
- When behavior changes, update the relevant SOP, architecture document, checklist or runbook in the same change.
- When a new area is added, add it to [Company Source of Truth](./COMPANY_SOURCE_OF_TRUTH.md) if it affects EterSolis operations.

## Current Source Documents

- Company identity and systems: [Company Source of Truth](./COMPANY_SOURCE_OF_TRUTH.md)
- Master website standard: [Website Codebase SOP](./WEBSITE_CODEBASE_SOP.md)
- Release record: [Changelog](./CHANGELOG.md)
- Backend design: [Backend Architecture](./BACKEND_ARCHITECTURE.md)
- API contracts: [API Standard](./API_STANDARD.md)
- Database change control: [Database Migrations](./DATABASE_MIGRATIONS.md)
- Portal operations: [User Portal SOP](./USER_PORTAL_SOP.md), [Admin Portal SOP](./ADMIN_PORTAL_SOP.md), [Case Lifecycle SOP](./CASE_LIFECYCLE_SOP.md)
- Launch and validation: [Launch Checklist](./LAUNCH_CHECKLIST.md), [Testing SOP](./TESTING_SOP.md)

## Obsolete And Historical Records

Historical records should be retained only when they explain why the system changed. They must not override current SOPs. The current historical set is listed in [docs/README.md](./README.md).

## Verification

Run:

```bash
npm run docs:check
```

This checks generated README content and documentation navigation requirements.
