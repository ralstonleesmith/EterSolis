create table if not exists scoring_events (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  service_request_id uuid references service_requests(id) on delete cascade,
  score integer not null,
  score_band text not null,
  factors jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists sla_events (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  service_request_id uuid references service_requests(id) on delete cascade,
  sla_type text not null,
  due_at timestamptz not null,
  fulfilled_at timestamptz,
  breached_at timestamptz,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create index if not exists sla_events_status_idx on sla_events (status, due_at);

insert into schema_migrations (version, checksum, applied_by)
values ('0006_scoring_and_sla', 'add-scoring-sla', current_user)
on conflict (version) do nothing;
