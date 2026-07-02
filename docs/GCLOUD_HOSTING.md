# EterSolis Google Cloud Run Hosting Guide

This guide defines the approved Google Cloud deployment path for the EterSolis website when using `gcloud`. Cloud Run is the canonical Google Cloud target because this repository already includes a production Dockerfile, health endpoint and container-compatible Next.js server.

## 0.7.0 Operational Portal Notes

Cloud Run remains the recommended application runtime. The 0.7.0 portal pass does not introduce a detached backend service. Apply Cloud SQL migrations through `0009_operational_portal.sql`, keep delivery queue checks enabled, and confirm `/api/readiness` after deployment. Portal previews and admin demo routes use deterministic data and must not be connected to production customer records for visual review.

Do not commit live runtime values. Store secrets in Google Secret Manager and keep operational access limited to approved EterSolis administrators.

## 1. Required Google Cloud Services

Enable the required APIs in the production Google Cloud project:

```bash
gcloud services enable \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  secretmanager.googleapis.com \
  sqladmin.googleapis.com
```

Create an Artifact Registry repository for container images:

```bash
gcloud artifacts repositories create etersolis \
  --repository-format=docker \
  --location=us-central1 \
  --description="EterSolis website container images"
```

Use the final production region selected by EterSolis operations. The examples use `us-central1`; if a different region is chosen, use that same region consistently for Artifact Registry, Cloud Run and Cloud SQL where possible.

## 2. Build and Publish the v0.6.0 Image

From the reviewed repository commit, submit the image build through Cloud Build:

```bash
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/PROJECT_ID/etersolis/etersolis-web:0.6.0
```

Replace `PROJECT_ID` with the actual Google Cloud project ID. Record the reviewed git commit SHA and resulting image digest in the launch record.

## 3. Runtime Configuration

Cloud Run must receive non-secret public/runtime values as environment variables and sensitive values from Secret Manager.

Set these non-secret values directly on the Cloud Run service:

```txt
NEXT_PUBLIC_SITE_URL=https://etersolis.com
WASTE_ROUTE_EMAIL=waste@etersolis.com
INFO_ROUTE_EMAIL=info@etersolis.com
PARTNERSHIPS_ROUTE_EMAIL=partnerships@etersolis.com
KYMNIS_ROUTE_EMAIL=kymnis@etersolis.com
PRIVACY_ROUTE_EMAIL=privacy@etersolis.com
CEO_ROUTE_EMAIL=smith@etersolis.com
CSO_ROUTE_EMAIL=cso@etersolis.com
MAIL_FROM=EterSolis <no-reply@etersolis.com>
SMTP_PORT=587
```

Create Secret Manager entries for sensitive values:

```bash
printf '%s' 'ACTUAL_DATABASE_URL' | gcloud secrets create etersolis-database-url --data-file=-
printf '%s' 'ACTUAL_IP_HASH_SECRET' | gcloud secrets create etersolis-ip-hash-secret --data-file=-
printf '%s' 'ACTUAL_SMTP_HOST' | gcloud secrets create etersolis-smtp-host --data-file=-
printf '%s' 'ACTUAL_SMTP_USER' | gcloud secrets create etersolis-smtp-user --data-file=-
printf '%s' 'ACTUAL_SMTP_PASS' | gcloud secrets create etersolis-smtp-pass --data-file=-
printf '%s' 'ACTUAL_TURNSTILE_SECRET_KEY' | gcloud secrets create etersolis-turnstile-secret-key --data-file=-
printf '%s' 'ACTUAL_TURNSTILE_SITE_KEY' | gcloud secrets create etersolis-turnstile-site-key --data-file=-
```

The `ACTUAL_*` values above must be replaced with real production credentials before the commands are run. Do not store those values in shell history, tickets or repository files.

Optional integrations may also be stored as secrets when enabled:

```txt
CRM_WEBHOOK_URL
CRM_WEBHOOK_SECRET
ANALYTICS_WEBHOOK_URL
ANALYTICS_WEBHOOK_SECRET
NEXT_PUBLIC_GA4_MEASUREMENT_ID
```

## 4. Cloud SQL PostgreSQL

Use PostgreSQL 15 or later. Create a least-privilege application database user and apply the committed schema before accepting public form traffic.

If using Cloud SQL private connectivity or the Cloud SQL connector, set `DATABASE_URL` to the production PostgreSQL URL approved by operations. For Cloud SQL Unix socket connections, use a value shaped like:

```txt
postgresql://DB_USER:URL_ENCODED_DB_PASSWORD@/DB_NAME?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_ID
```

Apply the schema from a trusted workstation or Cloud Shell with database access:

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/migrations/2026-07-etersolis-operations.sql
for file in database/migrations/000*.sql; do psql "$DATABASE_URL" -f "$file"; done
```

Confirm these tables exist before launch:

```txt
lead_submissions
waste_opportunities
audit_events
```

## 5. Deploy to Cloud Run

Deploy the reviewed image with port `3000` and the approved runtime configuration:

```bash
gcloud run deploy etersolis-web \
  --image us-central1-docker.pkg.dev/PROJECT_ID/etersolis/etersolis-web:0.6.0 \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars NEXT_PUBLIC_SITE_URL=https://etersolis.com,WASTE_ROUTE_EMAIL=waste@etersolis.com,INFO_ROUTE_EMAIL=info@etersolis.com,PARTNERSHIPS_ROUTE_EMAIL=partnerships@etersolis.com,KYMNIS_ROUTE_EMAIL=kymnis@etersolis.com,PRIVACY_ROUTE_EMAIL=privacy@etersolis.com,CEO_ROUTE_EMAIL=smith@etersolis.com,CSO_ROUTE_EMAIL=cso@etersolis.com,MAIL_FROM='EterSolis <no-reply@etersolis.com>',SMTP_PORT=587 \
  --set-secrets DATABASE_URL=etersolis-database-url:latest,IP_HASH_SECRET=etersolis-ip-hash-secret:latest,SMTP_HOST=etersolis-smtp-host:latest,SMTP_USER=etersolis-smtp-user:latest,SMTP_PASS=etersolis-smtp-pass:latest,TURNSTILE_SECRET_KEY=etersolis-turnstile-secret-key:latest,NEXT_PUBLIC_TURNSTILE_SITE_KEY=etersolis-turnstile-site-key:latest
```

If Cloud SQL connector attachment is required, include:

```bash
--add-cloudsql-instances PROJECT_ID:REGION:INSTANCE_ID
```

Use Cloud Run traffic splitting for rollback-safe release promotion. Keep the previous revision available until health, readiness and form acceptance checks pass.

## 6. Production Verification

Before routing public traffic, run the repository launch gate from a local or CI environment that can bind Playwright's local server:

```bash
npm ci
npm run launch:check
npm run test:backend
npm run migrations:check
npm run preview:capture
```

If regenerating technical brief page images in CI or Cloud Shell, install Poppler so `npm run brief:pages` can call `pdftoppm`.

After Cloud Run deployment and DNS/HTTPS routing, verify:

```bash
curl --fail https://etersolis.com/api/health
curl --fail https://etersolis.com/api/readiness
```

Submit non-sensitive test records through:

```txt
https://etersolis.com/contact
https://etersolis.com/sell-waste
```

Confirm:

- `lead_submissions` receives the contact test.
- `waste_opportunities` receives the waste test.
- internal routing emails are received.
- submitter confirmation emails are received.
- no raw client IP is stored in submitted lead payloads.

## 7. Rollback

Rollback immediately if `/api/health`, `/api/readiness`, database persistence or SMTP delivery fails after deployment.

Use Cloud Run revision rollback:

```bash
gcloud run services update-traffic etersolis-web \
  --region us-central1 \
  --to-revisions PREVIOUS_REVISION=100
```

Record the failed revision, previous revision, released commit SHA, image digest and reason in the launch record.
