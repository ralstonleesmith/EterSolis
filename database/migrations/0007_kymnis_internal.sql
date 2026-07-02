create table if not exists kymnis_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  account_name text not null,
  status text not null default 'internal_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists kymnis_sites (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references kymnis_accounts(id) on delete cascade,
  site_name text not null,
  location text,
  visibility_preference text not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists kymnis_incidents (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references kymnis_sites(id) on delete cascade,
  issue_type text not null,
  description text not null,
  risk_level text not null default 'unreviewed',
  status text not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists kymnis_evidence (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references kymnis_incidents(id) on delete cascade,
  document_id uuid references documents(id) on delete set null,
  evidence_type text not null,
  chain_of_custody_notes text,
  created_at timestamptz not null default now()
);

create table if not exists kymnis_reviews (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references kymnis_incidents(id) on delete cascade,
  reviewer_user_id uuid references admin_users(id) on delete set null,
  checklist jsonb not null default '{}'::jsonb,
  public_notes text,
  private_notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists kymnis_actions (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references kymnis_incidents(id) on delete cascade,
  action_required text not null,
  responsible_party text,
  due_at timestamptz,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists kymnis_resolution_records (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references kymnis_incidents(id) on delete cascade,
  resolution_summary text not null,
  proof_document_id uuid references documents(id) on delete set null,
  reviewed_by uuid references admin_users(id) on delete set null,
  closed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists kymnis_public_visibility_rules (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references kymnis_incidents(id) on delete cascade,
  visibility text not null default 'private',
  public_summary text,
  approved_by uuid references admin_users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

insert into schema_migrations (version, checksum, applied_by)
values ('0007_kymnis_internal', 'add-protected-kymnis-backend', current_user)
on conflict (version) do nothing;
