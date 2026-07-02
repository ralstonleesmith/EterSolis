create extension if not exists pgcrypto;

create table if not exists schema_migrations (
  version text primary key,
  checksum text,
  applied_at timestamptz not null default now(),
  applied_by text
);

insert into schema_migrations (version, checksum, applied_by)
values ('0001_current_baseline', 'manual-baseline', current_user)
on conflict (version) do nothing;

-- Baseline tables are defined in database/schema.sql and the 2026-07 operations migration.
