create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  service_request_id uuid references service_requests(id) on delete set null,
  file_name text not null,
  file_type text,
  storage_url text not null,
  classification text not null default 'internal',
  uploaded_by uuid,
  created_at timestamptz not null default now(),
  retention_category text
);

create index if not exists documents_opportunity_idx on documents (opportunity_id);
create index if not exists documents_service_request_idx on documents (service_request_id);

insert into schema_migrations (version, checksum, applied_by)
values ('0005_documents_and_storage', 'add-documents', current_user)
on conflict (version) do nothing;
