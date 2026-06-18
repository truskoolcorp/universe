-- Tru Skool Universe — lead capture table
-- Run in the Supabase SQL editor (or via the Supabase MCP) on your target project.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  interests   jsonb not null default '[]'::jsonb,  -- the lanes the visitor selected
  source      text not null default 'universe',
  created_at  timestamptz not null default now()
);

-- Inserts come from the API route using the service role, which bypasses RLS.
alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
