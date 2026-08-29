-- Idempotent +20 XP reward for profile modules.
-- Runs after 202608290001_profile_completion_backend.sql.

drop function if exists public.save_profile_module(text,jsonb,text);
create or replace function public.save_profile_module(
  p_module text,
  p_address jsonb default null,
  p_education_type text default null,
  p_award_reward boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_event_inserted integer := 0;
  v_profile public.profiles;
  v_badges jsonb;
begin
  if v_user_id is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if p_module not in ('address','education') then raise exception 'invalid_profile_module' using errcode = '22023'; end if;
  if p_module = 'address' then
    if p_address is null
      or nullif(trim(coalesce(p_address->>'country','')), '') is null
      or nullif(trim(coalesce(p_address->>'region','')), '') is null
      or nullif(trim(coalesce(p_address->>'district','')), '') is null
      or nullif(trim(coalesce(p_address->>'mahalla','')), '') is null then
      raise exception 'incomplete_address' using errcode = '22023';
    end if;
  elsif p_education_type not in ('school','college','university','not-studying') then
    raise exception 'invalid_education_type' using errcode = '22023';
  end if;

  insert into public.profiles (id) values (v_user_id) on conflict (id) do nothing;
  insert into public.profile_xp_events (user_id, module, xp)
    values (v_user_id, p_module, 20)
    on conflict (user_id, module) do nothing;
  get diagnostics v_event_inserted = row_count;

  update public.profiles
  set address = case when p_module = 'address' then p_address else address end,
      education_type = case when p_module = 'education' then p_education_type else education_type end,
      xp_total = xp_total + case when v_event_inserted = 1 and p_award_reward then 20 else 0 end,
      combo = combo + case when v_event_inserted = 1 and p_award_reward then 1 else 0 end,
      streak = case
        when v_event_inserted = 0 or not p_award_reward then streak
        when last_active_date = current_date then streak
        else streak + 1
      end,
      last_active_date = case when v_event_inserted = 1 and p_award_reward then current_date else last_active_date end,
      updated_at = now()
  where id = v_user_id
  returning * into v_profile;

  v_badges := coalesce(v_profile.unlocked_badges, '[]'::jsonb);
  if v_profile.address is not null and v_profile.education_type is not null
     and not (v_badges @> '["profile_complete"]'::jsonb) then
    v_badges := v_badges || '["profile_complete"]'::jsonb;
    update public.profiles set unlocked_badges = v_badges, updated_at = now() where id = v_user_id returning * into v_profile;
  end if;
  return to_jsonb(v_profile);
end;
$$;

revoke all on function public.save_profile_module(text,jsonb,text,boolean) from public;
grant execute on function public.save_profile_module(text,jsonb,text,boolean) to authenticated;
select pg_notify('pgrst','reload schema');
