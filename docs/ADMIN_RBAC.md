# EterSolis Admin RBAC

The current MVP admin guard uses `ADMIN_SHARED_SECRET`. The planned replacement is Auth.js with Google SSO.

## Roles

- `super_admin`
- `executive`
- `commercial_manager`
- `technical_reviewer`
- `operations_reviewer`
- `kymnis_reviewer`
- `privacy_officer`
- `read_only_auditor`

## Access Rules

- Admin APIs must reject unauthenticated users.
- Sensitive reads, downloads, exports and status changes must write `access_logs` or `admin_actions`.
- KYMNIS protected workflows require explicit KYMNIS reviewer or higher access.

## Auth.js Plan

Use Google as the initial provider. Store users in `admin_users`, roles in `roles`, and grants in `user_roles`.
