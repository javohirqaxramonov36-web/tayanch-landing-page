-- Tayanch profile completion backend
-- Apply this migration in Supabase production; service-role credentials never belong in the frontend.

create extension if not exists pgcrypto;

alter table public.profiles
  add column if not exists address jsonb,
  add column if not exists education_type text,
  add column if not exists xp_total integer not null default 250,
  add column if not exists combo integer not null default 3,
  add column if not exists streak integer not null default 3,
  add column if not exists last_active_date date,
  add column if not exists unlocked_badges jsonb not null default '["vocab_champion"]'::jsonb;

alter table public.profiles drop constraint if exists profiles_education_type_check;
alter table public.profiles add constraint profiles_education_type_check check (education_type is null or education_type in ('school','college','university','not-studying'));
alter table public.profiles drop constraint if exists profiles_xp_total_check;
alter table public.profiles add constraint profiles_xp_total_check check (xp_total >= 0);
alter table public.profiles drop constraint if exists profiles_combo_check;
alter table public.profiles add constraint profiles_combo_check check (combo >= 0);
alter table public.profiles drop constraint if exists profiles_streak_check;
alter table public.profiles add constraint profiles_streak_check check (streak >= 0);

create table if not exists public.profile_xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module text not null check (module in ('address','education')),
  xp integer not null default 20 check (xp = 20),
  created_at timestamptz not null default now(),
  unique (user_id, module)
);
alter table public.profile_xp_events enable row level security;
drop policy if exists profile_xp_events_select_own on public.profile_xp_events;
create policy profile_xp_events_select_own on public.profile_xp_events for select to authenticated using (user_id = auth.uid());

-- The production function body is deployed through migration 004_profile_reward_idempotency.
