create table if not exists consent_records (
  id uuid primary key default gen_random_uuid(),
  consent_type text not null,
  consent_text_version text not null,
  submitted_at timestamptz not null default now(),
  ip_hash text,
  submission_id uuid references lead_submissions(id) on delete set null,
  service_request_id uuid references service_requests(id) on delete set null,
  contact_id uuid references contacts(id) on delete set null
);

create table if not exists access_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references admin_users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  request_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists data_retention_jobs (
  id uuid primary key default gen_random_uuid(),
  resource_type text not null,
  resource_id text,
  retention_category text not null,
  deletion_eligibility_date date,
  status text not null default 'scheduled',
  anonymized_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists data_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  requester_email text not null,
  status text not null default 'received',
  identity_verification_required boolean not null default true,
  notes text,
  fulfilled_at timestamptz,
  rejected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists access_logs_resource_idx on access_logs (resource_type, resource_id);
create index if not exists consent_records_contact_idx on consent_records (contact_id);

insert into schema_migrations (version, checksum, applied_by)
values ('0008_governance_retention', 'add-consent-access-retention', current_user)
on conflict (version) do nothing;
