create extension if not exists pgcrypto;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  billing_entity text,
  country text,
  region text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customer_contacts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  contact_name text not null,
  email text not null,
  phone text,
  consent_to_contact boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customer_sites (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  site_address text not null,
  gps_link text,
  access_notes text,
  site_restrictions text,
  operating_hours text,
  loading_equipment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  public_token text not null unique,
  customer_id uuid references customers(id) on delete set null,
  contact_id uuid references customer_contacts(id) on delete set null,
  site_id uuid references customer_sites(id) on delete set null,
  request_type text not null,
  department text not null,
  department_confidence numeric,
  department_source text not null default 'user_selected',
  commercial_pathway text,
  status text not null default 'submitted',
  risk_level text not null default 'unreviewed',
  payment_status text not null default 'not_required',
  pickup_status text,
  delivery_status text,
  certificate_status text,
  assigned_team text,
  assigned_operator text,
  data_quality_score integer not null default 0,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  closed_at timestamptz
);

create table if not exists material_profiles (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  department text not null,
  material_name text,
  material_description text not null,
  material_code text,
  physical_state text,
  quantity numeric,
  quantity_unit text,
  estimated_weight_kg numeric,
  estimated_volume_l numeric,
  container_type text,
  container_count numeric,
  frequency text,
  contamination_status text,
  odor_status text,
  moisture_status text,
  photos_present boolean not null default false,
  documents_present boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists risk_assessments (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  hazard_flag boolean not null default false,
  unknown_material_flag boolean not null default false,
  sds_available boolean not null default false,
  lab_analysis_available boolean not null default false,
  flammable_flag boolean not null default false,
  corrosive_flag boolean not null default false,
  toxic_flag boolean not null default false,
  biohazard_flag boolean not null default false,
  pathogen_flag boolean not null default false,
  hydrocarbon_flag boolean not null default false,
  sharp_object_flag boolean not null default false,
  pressurized_flag boolean not null default false,
  radioactive_flag boolean not null default false,
  asbestos_flag boolean not null default false,
  spill_flag boolean not null default false,
  restricted_flag boolean not null default false,
  manual_review_required boolean not null default false,
  risk_score integer not null default 0,
  risk_level text not null default 'unreviewed',
  review_notes text,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists pickup_requests (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  requested_date date,
  requested_window text,
  alternative_date date,
  site_access_notes text,
  loading_method text,
  vehicle_requirement text,
  confirmed_start timestamptz,
  confirmed_end timestamptz,
  status text not null default 'pickup_requested',
  operator text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists delivery_requests (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  requested_delivery_date date,
  requested_delivery_window text,
  receiving_site_id uuid references customer_sites(id) on delete set null,
  vehicle_type text,
  driver_name text,
  driver_phone text,
  vehicle_registration text,
  delivery_reference text unique,
  appointment_qr text,
  status text not null default 'delivery_requested',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  quote_reference text not null unique,
  status text not null default 'draft',
  currency text not null default 'ZAR',
  amount numeric,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  payment_reference text not null unique,
  provider text not null default 'manual',
  payment_type text not null default 'manual_invoice',
  status text not null default 'manual_invoice_sent',
  currency text not null default 'ZAR',
  amount numeric,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists receiving_records (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  received_at timestamptz,
  received_by text,
  quantity_received numeric,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists sorting_records (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  status text not null default 'sorting_pending',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists disposition_records (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  disposition_type text not null,
  notes text,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid not null references service_requests(id) on delete cascade,
  certificate_number text not null unique,
  certificate_type text not null,
  verification_hash text not null unique,
  public_token text not null unique,
  pdf_url text,
  status text not null default 'draft',
  issued_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists certificate_verifications (
  id uuid primary key default gen_random_uuid(),
  certificate_id uuid references certificates(id) on delete set null,
  public_token text,
  verified_at timestamptz not null default now(),
  result text not null,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid references service_requests(id) on delete set null,
  session_id text,
  event_name text not null,
  event_area text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists funnel_events (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid references service_requests(id) on delete set null,
  session_id text,
  event_name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists admin_actions (
  id uuid primary key default gen_random_uuid(),
  service_request_id uuid references service_requests(id) on delete set null,
  action_type text not null,
  actor text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table audit_events add column if not exists service_request_id uuid references service_requests(id) on delete set null;

create index if not exists service_requests_created_at_idx on service_requests (created_at desc);
create index if not exists service_requests_public_token_idx on service_requests (public_token);
create index if not exists service_requests_status_idx on service_requests (status);
create index if not exists service_requests_department_idx on service_requests (department);
create index if not exists service_requests_risk_level_idx on service_requests (risk_level);
create index if not exists material_profiles_service_request_idx on material_profiles (service_request_id);
create index if not exists risk_assessments_service_request_idx on risk_assessments (service_request_id);
create index if not exists pickup_requests_service_request_idx on pickup_requests (service_request_id);
create index if not exists delivery_requests_service_request_idx on delivery_requests (service_request_id);
create index if not exists payments_service_request_idx on payments (service_request_id);
create index if not exists certificates_public_token_idx on certificates (public_token);
create index if not exists analytics_events_created_at_idx on analytics_events (created_at desc);
