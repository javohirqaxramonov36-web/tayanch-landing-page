-- Stable Telegram identity mapping for Tayanch Supabase users.
-- Run after the profile completion backend migration.

create table if not exists public.telegram_identities (
  telegram_user_id text primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  username text,
  first_name text,
  last_name text,
  photo_url text,
  linked_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.telegram_identities enable row level security;
revoke all on table public.telegram_identities from anon, authenticated;

create index if not exists telegram_identities_user_id_idx on public.telegram_identities(user_id);
