# EterSolis Self-Hosting Operations Guide

This project is designed for EterSolis-managed hosting on EterSolis-controlled infrastructure. The production server should be treated as a controlled operational system, not as a static marketing deployment.

## Recommended Production Topology

- Reverse proxy: Nginx or Caddy terminating HTTPS.
- Application runtime: Node.js 20 LTS or later.
- Process manager: systemd or PM2.
- Database: PostgreSQL 15 or later.
- Mail: EterSolis-approved SMTP server or transactional mail relay.
- Bot protection: Cloudflare Turnstile or equivalent public challenge provider.
- Backups: daily PostgreSQL dump with off-server retention.
- Access: SSH key authentication only; no password login.
- Admin security: MFA on DNS, GitHub, mail, database, and server administration.

## Build and Run

```bash
npm ci
npm run build
PORT=3000 npm run start
```

## Environment

Copy `.env.example` to an environment file managed outside the repository. Do not commit production secrets.

Required for production lead capture:

- `DATABASE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

Optional:

- `CRM_WEBHOOK_URL`
- `CRM_WEBHOOK_SECRET`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

## Database Setup

Create a PostgreSQL database and apply:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

Use a dedicated least-privilege database user for the website application.

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

- Do not store secrets in GitHub.
- Keep `.env` files outside the repository.
- Run the app as a non-root user.
- Enable HTTPS before public launch.
- Apply `database/schema.sql` before enabling forms.
- Configure Turnstile before enabling public forms in production.
- Configure SMTP before enabling public forms in production.
- Restrict database access to localhost or private network.
- Back up the database daily.
- Review logs for errors without storing sensitive form payloads in logs.

## Release Procedure

1. Pull the reviewed commit to the server.
2. Install dependencies with `npm ci`.
3. Run `npm run check`.
4. Apply database migrations if required.
5. Restart the systemd or PM2 process.
6. Verify `/api/health`.
7. Submit test lead forms using non-sensitive test data.
8. Confirm internal notification email and submitter confirmation email.
9. Confirm database records were created.
10. Record the released commit hash in the deployment log.
