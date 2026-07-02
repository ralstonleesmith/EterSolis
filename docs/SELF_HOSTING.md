# EterSolis Self-Hosting Operations Guide

This project is designed for EterSolis-managed hosting on EterSolis-controlled infrastructure. The production server should be treated as a controlled operational system, not as a static marketing deployment.

## Recommended Production Topology

- Reverse proxy: Nginx or Caddy terminating HTTPS.
- Application runtime: Node.js 20 LTS or later.
- Process manager: systemd, PM2, Docker, Docker Compose or an approved hosting-provider application manager.
- Database: PostgreSQL 15 or later.
- Mail: EterSolis-approved SMTP server or transactional mail relay.
- Bot protection: Cloudflare Turnstile or equivalent public challenge provider.
- Backups: daily PostgreSQL dump with off-server retention.
- Access: SSH key authentication only; no password login.
- Admin security: MFA on DNS, GitHub, mail, database and server administration.

For Google Cloud deployments, use Cloud Run with the repository Dockerfile and the dedicated guide in [`docs/GCLOUD_HOSTING.md`](./GCLOUD_HOSTING.md).

## Build and Run

Standard self-hosted production path:

```bash
npm ci
npm run check
npm run build
PORT=3000 npm run start
```

Managed hosting path, only where the host requires a single Node startup file:

```bash
npm ci
npm run build
NODE_ENV=production PORT=3000 npm run start:node
```

The default application command remains `npm run start`. `server.js` exists for Passenger-style or hosting-panel environments that cannot start the application through `next start` directly.

## Local Quality Gates

GitHub Actions may remain as a passive repository check, but production release should not depend on it. Run the controlled local gates before server deployment:

```bash
npm ci
npm run launch:check
npm run docker:build
```

If GitHub Actions cannot start because of GitHub billing, payment or spending-limit state, do not treat the failed hosted run as a code failure. Record the blocker and keep the release decision tied to local `npm run launch:check`, production runtime checks and production form acceptance evidence.

The smoke suite starts a local Next server through Playwright and captures desktop/mobile screenshots under `test-results/screenshots`.

## Environment

Copy `.env.example` to an environment file managed outside the repository. Do not commit production runtime values.

Required for production operational intake:

- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `IP_HASH_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `WASTE_ROUTE_EMAIL`
- `INFO_ROUTE_EMAIL`
- `PARTNERSHIPS_ROUTE_EMAIL`
- `KYMNIS_ROUTE_EMAIL`
- `PRIVACY_ROUTE_EMAIL`
- `CEO_ROUTE_EMAIL`
- `CSO_ROUTE_EMAIL`

Optional:

- `CRM_WEBHOOK_URL`
- `CRM_WEBHOOK_SECRET`
- `ANALYTICS_WEBHOOK_URL`
- `ANALYTICS_WEBHOOK_SECRET`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- `READINESS_EXPOSE_DETAILS`

`IP_HASH_SECRET` should be a long random value. The application stores an HMAC hash of client IPs for lead-submission audit correlation instead of storing raw IP addresses.

Run the configuration check before deployment:

```bash
npm run runtime:check -- --env-file=/etc/etersolis-web.env
```

## Database Setup

Create a PostgreSQL database and apply:

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/migrations/2026-07-etersolis-operations.sql
for file in database/migrations/000*.sql; do psql "$DATABASE_URL" -f "$file"; done
```

Use a dedicated least-privilege database user for the website application.

After the schema is applied, run:

```bash
npm run lead-capture:check -- --env-file=/etc/etersolis-web.env
```

This confirms runtime configuration, database connectivity, required tables and SMTP connectivity. Use `--skip-smtp` only for non-production staging environments where SMTP cannot be reached from the test network.

Backend hardening checks:

```bash
npm run test:backend
npm run brief:pages # requires Poppler pdftoppm when regenerating technical brief page images
```

## Readiness Endpoints

`/api/health` is the liveness endpoint. It confirms the application process is running.

`/api/readiness` is the operational readiness endpoint. It confirms that full lead-capture configuration is present and valid enough for the application to accept production submissions.

```bash
curl --fail http://127.0.0.1:3000/api/health
curl --fail http://127.0.0.1:3000/api/readiness
```

In production, detailed readiness output is suppressed unless `READINESS_EXPOSE_DETAILS=true` is set. Do not enable detailed readiness output on public production unless explicitly required for a controlled launch window.

## Nginx Reverse Proxy Example

```nginx
server {
    listen 80;
    server_name etersolis.com www.etersolis.com;
    return 301 https://etersolis.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name etersolis.com;

    ssl_certificate /etc/letsencrypt/live/etersolis.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/etersolis.com/privkey.pem;

    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## systemd Example

```ini
[Unit]
Description=EterSolis Website
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/etersolis-web
EnvironmentFile=/etc/etersolis-web.env
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5
User=etersolis
Group=etersolis
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true

[Install]
WantedBy=multi-user.target
```

## Production Security Requirements

- Do not store runtime values in GitHub.
- Keep `.env` files outside the repository.
- Run the app as a non-root user.
- Enable HTTPS before public launch.
- Apply `database/schema.sql`, the 2026 operations migration and the numbered backend migrations before enabling forms.
- Configure Turnstile before enabling public forms in production.
- Configure SMTP before enabling public forms in production.
- Run `npm run runtime:check` and `npm run lead-capture:check` before public launch.
- Restrict database access to localhost or private network.
- Back up the database daily.
- Review logs for errors without storing sensitive form payloads in logs.

## Release Procedure

1. Pull the reviewed commit to the server.
2. Install dependencies with `npm ci`.
3. Run `npm run launch:check`.
4. Run `npm run runtime:check -- --env-file=/etc/etersolis-web.env`.
5. Apply database migrations if required and confirm `schema_migrations`.
6. Run `npm run lead-capture:check -- --env-file=/etc/etersolis-web.env`.
7. Build or pull the reviewed Docker image if using container deployment.
8. Restart the systemd, PM2, Docker Compose or hosting-provider service.
9. Verify `/api/health`.
10. Verify `/api/readiness`.
11. Submit test lead forms using non-sensitive test data.
12. Confirm internal notification email and submitter confirmation email.
13. Confirm database records were created.
14. Record the released commit hash in the deployment log.

See [`docs/LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md) for the complete launch record template.
