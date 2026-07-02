create table if not exists schema_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
);

create table if not exists markets (
  id bigserial primary key,
  code text not null unique,
  country text not null,
  currency text not null,
  timezone text not null,
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists market_payment_methods (
  id bigserial primary key,
  market_code text not null references markets(code),
  method text not null,
  display_name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (market_code, method)
);

create table if not exists bank_accounts (
  id bigserial primary key,
  market_code text not null references markets(code),
  account_label text not null,
  bank_name text not null,
  account_number_masked text not null,
  branch_code text,
  currency text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists cases (
  id bigserial primary key,
  public_reference text not null unique,
  public_token_hash text not null unique,
  account_id bigint,
  organization_id bigint,
  contact_id bigint,
  market_code text not null default 'ZA',
  department text not null,
  service_type text not null,
  status text not null default 'submitted',
  risk_level text not null default 'unknown',
  commercial_status text not null default 'quote_required',
  payment_status text not null default 'not_invoiced',
  schedule_status text not null default 'not_scheduled',
  certificate_status text not null default 'not_eligible',
  qr_value text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists case_events (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  event_type text not null,
  actor_type text not null,
  actor_id text,
  request_id text,
  summary text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists case_qr_codes (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  qr_value text not null unique,
  qr_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists case_files (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  uploaded_by_type text not null,
  file_role text not null,
  original_name text not null,
  mime_type text not null,
  byte_size bigint not null,
  storage_key text,
  checksum_sha256 text,
  malware_scan_status text not null default 'pending',
  visibility text not null default 'internal',
  created_at timestamptz not null default now()
);

create table if not exists quotations (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  quotation_number text not null unique,
  market_code text not null default 'ZA',
  currency text not null default 'ZAR',
  status text not null default 'draft',
  subtotal numeric(14,2) not null default 0,
  tax_total numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  valid_until date,
  terms text,
  created_at timestamptz not null default now(),
  issued_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz
);

create table if not exists quotation_lines (
  id bigserial primary key,
  quotation_id bigint not null references quotations(id) on delete cascade,
  description text not null,
  quantity numeric(14,3) not null default 1,
  unit text not null default 'each',
  unit_price numeric(14,2) not null default 0,
  tax_rate numeric(6,4) not null default 0,
  line_total numeric(14,2) not null default 0
);

create table if not exists quotation_events (
  id bigserial primary key,
  quotation_id bigint not null references quotations(id) on delete cascade,
  event_type text not null,
  actor_type text not null,
  request_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists quotation_acceptances (
  id bigserial primary key,
  quotation_id bigint not null references quotations(id) on delete cascade,
  accepted_by_name text not null,
  accepted_by_email text not null,
  acceptance_ip_hash text,
  terms_version text not null,
  accepted_at timestamptz not null default now()
);

create table if not exists invoices (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  quotation_id bigint references quotations(id),
  invoice_number text not null unique,
  market_code text not null default 'ZA',
  currency text not null default 'ZAR',
  status text not null default 'draft',
  subtotal numeric(14,2) not null default 0,
  tax_total numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  balance_due numeric(14,2) not null default 0,
  due_date date,
  payment_reference text not null,
  issued_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists invoice_lines (
  id bigserial primary key,
  invoice_id bigint not null references invoices(id) on delete cascade,
  description text not null,
  quantity numeric(14,3) not null default 1,
  unit text not null default 'each',
  unit_price numeric(14,2) not null default 0,
  tax_rate numeric(6,4) not null default 0,
  line_total numeric(14,2) not null default 0
);

create table if not exists invoice_events (
  id bigserial primary key,
  invoice_id bigint not null references invoices(id) on delete cascade,
  event_type text not null,
  actor_type text not null,
  request_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists payment_proofs (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  invoice_id bigint references invoices(id),
  uploaded_file_id bigint references case_files(id),
  payer_name text,
  amount numeric(14,2) not null,
  currency text not null default 'ZAR',
  payment_reference text not null,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists payment_reconciliations (
  id bigserial primary key,
  payment_proof_id bigint not null references payment_proofs(id) on delete cascade,
  reconciled_by text not null,
  status text not null,
  amount_matched numeric(14,2) not null default 0,
  ledger_reference text,
  notes text,
  reconciled_at timestamptz not null default now()
);

create table if not exists payment_allocations (
  id bigserial primary key,
  invoice_id bigint not null references invoices(id) on delete cascade,
  payment_proof_id bigint not null references payment_proofs(id) on delete cascade,
  amount numeric(14,2) not null,
  created_at timestamptz not null default now(),
  unique (invoice_id, payment_proof_id)
);

create table if not exists receipts (
  id bigserial primary key,
  invoice_id bigint not null references invoices(id) on delete cascade,
  receipt_number text not null unique,
  amount numeric(14,2) not null,
  currency text not null default 'ZAR',
  issued_at timestamptz not null default now()
);

create table if not exists refunds (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  invoice_id bigint references invoices(id),
  amount numeric(14,2) not null,
  currency text not null default 'ZAR',
  reason text not null,
  status text not null default 'requested',
  approved_by text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists appointments (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  appointment_type text not null,
  status text not null default 'requested',
  requested_window tstzrange,
  confirmed_start timestamptz,
  confirmed_end timestamptz,
  site_notes text,
  created_at timestamptz not null default now()
);

create table if not exists stockpile_lots (
  id bigserial primary key,
  case_id bigint not null references cases(id) on delete cascade,
  lot_reference text not null unique,
  location_code text not null,
  material_summary text not null,
  quantity numeric(14,3),
  unit text,
  status text not null default 'received',
  created_at timestamptz not null default now()
);

create table if not exists processing_batches (
  id bigserial primary key,
  batch_reference text not null unique,
  stockpile_lot_id bigint references stockpile_lots(id),
  case_id bigint references cases(id),
  process_type text not null,
  status text not null default 'planned',
  input_summary jsonb not null default '{}'::jsonb,
  output_summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists workflow_events (
  id bigserial primary key,
  case_id bigint references cases(id) on delete cascade,
  event_name text not null,
  status text not null default 'pending',
  run_after timestamptz not null default now(),
  attempts integer not null default 0,
  last_error text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cases_public_reference on cases(public_reference);
create index if not exists idx_cases_status on cases(status);
create index if not exists idx_case_events_case_id on case_events(case_id);
create index if not exists idx_case_files_case_id on case_files(case_id);
create index if not exists idx_quotations_case_id on quotations(case_id);
create index if not exists idx_invoices_case_id on invoices(case_id);
create index if not exists idx_payment_proofs_case_id on payment_proofs(case_id);
create index if not exists idx_workflow_events_status_run_after on workflow_events(status, run_after);

insert into markets (code, country, currency, timezone, active)
values ('ZA', 'South Africa', 'ZAR', 'Africa/Johannesburg', true)
on conflict (code) do update set active = excluded.active;

insert into market_payment_methods (market_code, method, display_name, active)
values ('ZA', 'internal_eft', 'Internal EFT / bank transfer ledger', true)
on conflict (market_code, method) do update set active = excluded.active;

insert into schema_migrations (version)
values ('0009_operational_portal')
on conflict (version) do nothing;
