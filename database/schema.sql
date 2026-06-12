create extension if not exists pgcrypto;

create table if not exists lead_submissions (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null check (lead_type in ('waste', 'contact', 'lead')),
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_submissions_lead_type_idx on lead_submissions (lead_type);
create index if not exists lead_submissions_created_at_idx on lead_submissions (created_at desc);
create index if not exists lead_submissions_payload_gin_idx on lead_submissions using gin (payload);

create table if not exists waste_opportunities (
  id uuid primary key default gen_random_uuid(),
  lead_submission_id uuid not null references lead_submissions(id) on delete cascade,
  company_name text,
  contact_name text,
  email text,
  country text,
  region text,
  material_category text,
  material_description text,
  quantity numeric,
  quantity_unit text,
  frequency text,
  hazard_flag boolean not null default false,
  safety_documents_available boolean not null default false,
  confidentiality_level text,
  review_status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists waste_opportunities_created_at_idx on waste_opportunities (created_at desc);
create index if not exists waste_opportunities_review_status_idx on waste_opportunities (review_status);
create index if not exists waste_opportunities_material_category_idx on waste_opportunities (material_category);
create index if not exists waste_opportunities_hazard_flag_idx on waste_opportunities (hazard_flag);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  lead_submission_id uuid references lead_submissions(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_events_event_type_idx on audit_events (event_type);
create index if not exists audit_events_created_at_idx on audit_events (created_at desc);
