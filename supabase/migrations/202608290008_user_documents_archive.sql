-- Tayanch personal documents and certificate archive.
create table if not exists public.user_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  document_type text not null check (document_type in ('resume','motivation_letter','certificate','grant_result')),
  title text not null check (char_length(title) between 1 and 160),
  content text,
  file_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.user_documents enable row level security;
drop policy if exists user_documents_select_own on public.user_documents;
create policy user_documents_select_own on public.user_documents for select to authenticated using (user_id=auth.uid());
drop policy if exists user_documents_insert_own on public.user_documents;
create policy user_documents_insert_own on public.user_documents for insert to authenticated with check (user_id=auth.uid());
drop policy if exists user_documents_update_own on public.user_documents;
create policy user_documents_update_own on public.user_documents for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists user_documents_delete_own on public.user_documents;
create policy user_documents_delete_own on public.user_documents for delete to authenticated using (user_id=auth.uid());

insert into storage.buckets (id,name,public) values ('tayanch-documents','tayanch-documents',false) on conflict (id) do update set public=false;
drop policy if exists tayanch_documents_select_own on storage.objects;
create policy tayanch_documents_select_own on storage.objects for select to authenticated using (bucket_id='tayanch-documents' and owner_id=auth.uid()::text);
drop policy if exists tayanch_documents_insert_own on storage.objects;
create policy tayanch_documents_insert_own on storage.objects for insert to authenticated with check (bucket_id='tayanch-documents' and owner_id=auth.uid()::text);
drop policy if exists tayanch_documents_update_own on storage.objects;
create policy tayanch_documents_update_own on storage.objects for update to authenticated using (bucket_id='tayanch-documents' and owner_id=auth.uid()::text) with check (bucket_id='tayanch-documents' and owner_id=auth.uid()::text);
drop policy if exists tayanch_documents_delete_own on storage.objects;
create policy tayanch_documents_delete_own on storage.objects for delete to authenticated using (bucket_id='tayanch-documents' and owner_id=auth.uid()::text);

revoke all on table public.user_documents from anon;
grant select,insert,update,delete on public.user_documents to authenticated;
create index if not exists user_documents_user_updated_idx on public.user_documents(user_id,updated_at desc);
