-- Server-side entitlement check used by future premium course/test access flows.
create or replace function public.has_xp_entitlement(p_entitlement text)
returns boolean
language sql stable security definer set search_path=public
as $$
  select exists(
    select 1 from public.xp_store_purchases p
    join public.xp_store_items i on i.id=p.item_id
    where p.user_id=auth.uid() and p.status='granted' and i.entitlement=p_entitlement
  );
$$;
revoke all on function public.has_xp_entitlement(text) from public;
grant execute on function public.has_xp_entitlement(text) to authenticated;
