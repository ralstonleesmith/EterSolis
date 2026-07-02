create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  trading_name text,
  website text,
  industry text,
  country text,
  region text,
  address text,
  organization_type text,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  role text,
  consent_status text not null default 'submitted',
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  primary_contact_id uuid references contacts(id) on delete set null,
  service_request_id uuid references service_requests(id) on delete set null,
  lead_submission_id uuid references lead_submissions(id) on delete set null,
  opportunity_type text not null,
  source text,
  stage text not null default 'new',
  priority text not null default 'standard',
  score integer not null default 0,
  estimated_value numeric,
  probability numeric,
  owner_user_id uuid,
  next_action_at timestamptz,
  idempotency_key text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists opportunity_status_history (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  previous_stage text,
  new_stage text not null,
  changed_by uuid,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists opportunity_assignments (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  assigned_to_user_id uuid,
  assigned_by_user_id uuid,
  assignment_type text not null default 'owner',
  created_at timestamptz not null default now()
);

create table if not exists opportunity_notes (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  author_user_id uuid,
  note text not null,
  classification text not null default 'internal',
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  service_request_id uuid references service_requests(id) on delete cascade,
  assigned_to_user_id uuid,
  task_type text not null,
  due_at timestamptz,
  priority text not null default 'standard',
  status text not null default 'open',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists waste_streams (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  service_request_id uuid references service_requests(id) on delete cascade,
  material_category text,
  material_description text not null,
  estimated_quantity numeric,
  quantity_unit text,
  frequency text,
  contamination_risk text,
  hazard_flag boolean not null default false,
  sds_available boolean not null default false,
  photos_available boolean not null default false,
  current_disposal_route text,
  current_disposal_cost numeric,
  location text,
  storage_method text,
  moisture_estimate text,
  biological_risk text,
  regulatory_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists waste_stream_documents (
  id uuid primary key default gen_random_uuid(),
  waste_stream_id uuid references waste_streams(id) on delete cascade,
  file_name text not null,
  file_type text,
  storage_url text,
  classification text not null default 'internal',
  uploaded_by uuid,
  created_at timestamptz not null default now(),
  retention_category text
);

create table if not exists material_risk_profiles (
  id uuid primary key default gen_random_uuid(),
  waste_stream_id uuid references waste_streams(id) on delete cascade,
  risk_level text not null default 'unreviewed',
  risk_score integer not null default 0,
  hazard_notes text,
  regulatory_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists technical_review_records (
  id uuid primary key default gen_random_uuid(),
  waste_stream_id uuid references waste_streams(id) on delete cascade,
  reviewer_user_id uuid,
  status text not null default 'pending',
  notes text,
  recommendation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists organizations_legal_name_idx on organizations (legal_name);
create index if not exists contacts_email_idx on contacts (email);
create index if not exists opportunities_stage_idx on opportunities (stage);
create index if not exists opportunities_score_idx on opportunities (score desc);
create index if not exists waste_streams_opportunity_idx on waste_streams (opportunity_id);

insert into schema_migrations (version, checksum, applied_by)
values ('0002_operational_entities', 'add-normalized-commercial-entities', current_user)
on conflict (version) do nothing;
