create table if not exists outbound_events (
  id uuid primary key default gen_random_uuid(),
  request_id text,
  event_type text not null,
  destination text not null,
  status text not null default 'queued',
  attempts integer not null default 0,
  max_attempts integer not null default 6,
  next_attempt_at timestamptz not null default now(),
  last_error text,
  payload jsonb not null default '{}'::jsonb,
  service_request_id uuid references service_requests(id) on delete set null,
  lead_submission_id uuid references lead_submissions(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists webhook_deliveries (
  id uuid primary key default gen_random_uuid(),
  outbound_event_id uuid references outbound_events(id) on delete set null,
  provider text not null,
  destination text not null,
  status text not null,
  http_status integer,
  response_excerpt text,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists crm_sync_records (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete set null,
  external_system text not null,
  external_object_type text not null,
  external_object_id text,
  idempotency_key text not null,
  status text not null default 'pending',
  last_synced_at timestamptz,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (external_system, external_object_type, idempotency_key)
);

create table if not exists email_delivery_records (
  id uuid primary key default gen_random_uuid(),
  outbound_event_id uuid references outbound_events(id) on delete set null,
  message_type text not null,
  recipient text not null,
  status text not null,
  provider_message_id text,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists rate_limit_counters (
  bucket_key text primary key,
  route_key text not null,
  subject_hash text not null,
  window_start timestamptz not null,
  window_ms integer not null,
  count integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists outbound_events_status_idx on outbound_events (status, next_attempt_at);
create index if not exists outbound_events_request_id_idx on outbound_events (request_id);
create index if not exists rate_limit_counters_window_idx on rate_limit_counters (window_start);

insert into schema_migrations (version, checksum, applied_by)
values ('0003_delivery_queue', 'add-postgres-outbound-events-rate-limits', current_user)
on conflict (version) do nothing;
