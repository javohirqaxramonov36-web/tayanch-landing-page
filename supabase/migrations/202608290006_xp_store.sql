-- Tayanch XP Store: purchasable internal entitlements.
create table if not exists public.xp_store_items (
  id text primary key,
  title text not null,
  description text not null,
  xp_price integer not null check (xp_price > 0),
  icon text not null default '🎁',
  entitlement text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.xp_store_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_id text not null references public.xp_store_items(id),
  xp_price integer not null check (xp_price > 0),
  status text not null default 'granted' check (status in ('granted','cancelled')),
  created_at timestamptz not null default now(),
  unique (user_id, item_id)
);

alter table public.xp_store_items enable row level security;
alter table public.xp_store_purchases enable row level security;
drop policy if exists xp_store_items_read_active on public.xp_store_items;
create policy xp_store_items_read_active on public.xp_store_items for select to authenticated using (is_active = true);
drop policy if exists xp_store_purchases_select_own on public.xp_store_purchases;
create policy xp_store_purchases_select_own on public.xp_store_purchases for select to authenticated using (user_id = auth.uid());
revoke all on table public.xp_store_purchases from anon, authenticated;
revoke all on table public.xp_store_items from anon, authenticated;
grant select on public.xp_store_items to authenticated;
grant select on public.xp_store_purchases to authenticated;

insert into public.xp_store_items (id,title,description,xp_price,icon,entitlement) values
 ('certificate_export','Sertifikatni eksport qilish','Tayanch sertifikatini yuklab olish huquqi.','250','📜','certificate_export'),
 ('ai_test_retry','AI Daraja Testi — qo‘shimcha urinish','AI diagnostika testini yana bir marta topshirish huquqi.','100','🧠','ai_test_retry'),
 ('course_unlock','Bitta premium darsni ochish','Tanlangan kursdagi bitta bonus dars uchun entitlement.','300','🔓','course_unlock'),
 ('mentor_consultation','Qisqa mentor konsultatsiyasi','Mavjud bo‘lsa, qisqa onlayn maslahat uchun navbatga yozilish.','750','🎓','mentor_consultation')
on conflict (id) do update set title=excluded.title,description=excluded.description,xp_price=excluded.xp_price,icon=excluded.icon,is_active=true;

create or replace function public.purchase_xp_item(p_item_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_item public.xp_store_items;
  v_profile public.profiles;
  v_purchase public.xp_store_purchases;
begin
  if v_user_id is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  select * into v_item from public.xp_store_items where id=p_item_id and is_active=true for update;
  if not found then raise exception 'store_item_not_found' using errcode = '22023'; end if;
  insert into public.profiles (id) values (v_user_id) on conflict (id) do nothing;
  select * into v_profile from public.profiles where id=v_user_id for update;
  if exists(select 1 from public.xp_store_purchases where user_id=v_user_id and item_id=p_item_id and status='granted') then
    raise exception 'item_already_purchased' using errcode = '23505';
  end if;
  if v_profile.xp_total < v_item.xp_price then raise exception 'insufficient_xp' using errcode = '22003'; end if;
  update public.profiles set xp_total=xp_total-v_item.xp_price, updated_at=now() where id=v_user_id returning * into v_profile;
  insert into public.xp_store_purchases(user_id,item_id,xp_price) values(v_user_id,p_item_id,v_item.xp_price) returning * into v_purchase;
  return jsonb_build_object('profile',to_jsonb(v_profile),'purchase',to_jsonb(v_purchase),'item',to_jsonb(v_item));
end;
$$;
revoke all on function public.purchase_xp_item(text) from public;
grant execute on function public.purchase_xp_item(text) to authenticated;
select pg_notify('pgrst','reload schema');
