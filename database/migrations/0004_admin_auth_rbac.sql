create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  provider text not null default 'google',
  provider_subject text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists user_roles (
  user_id uuid not null references admin_users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  granted_by uuid references admin_users(id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

insert into roles (key, label, description)
values
  ('super_admin', 'Super Admin', 'Full administrative access.'),
  ('executive', 'Executive', 'Executive dashboards and high-level reporting.'),
  ('commercial_manager', 'Commercial Manager', 'Commercial pipeline and opportunities.'),
  ('technical_reviewer', 'Technical Reviewer', 'Technical review and waste-stream qualification.'),
  ('operations_reviewer', 'Operations Reviewer', 'Pickup, delivery, receiving and operations.'),
  ('kymnis_reviewer', 'KYMNIS Reviewer', 'Protected KYMNIS review workflows.'),
  ('privacy_officer', 'Privacy Officer', 'Privacy, retention and deletion workflows.'),
  ('read_only_auditor', 'Read-only Auditor', 'Read-only audit and compliance review.')
on conflict (key) do nothing;

insert into schema_migrations (version, checksum, applied_by)
values ('0004_admin_auth_rbac', 'add-admin-users-roles', current_user)
on conflict (version) do nothing;
