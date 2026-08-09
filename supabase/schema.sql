-- ============================================================
-- Koh Peaks Tours & Trails — Supabase Schema
-- Run this ENTIRE file in: Supabase Dashboard → SQL Editor → New query
--
-- Creates ONE dedicated table for the website enquiry form.
-- Safe to run in a shared project — it does not touch other tables.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- ENQUIRIES  (Contact form submissions)
-- ------------------------------------------------------------
create table if not exists public.koh_peaks_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  destination text,
  travel_month text,
  travelers text,
  reference text,
  message text,
  payment_proof text,
  payment_proof_name text,
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'resolved', 'archived')),
  source text not null default 'website'
    check (source in ('website', 'admin_manual')),
  created_at timestamptz not null default now()
);

create index if not exists koh_peaks_enquiries_created_at_idx
  on public.koh_peaks_enquiries (created_at desc);
create index if not exists koh_peaks_enquiries_status_idx
  on public.koh_peaks_enquiries (status);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- Public website: INSERT only (anon)
-- Admin dashboard: any logged-in Supabase Auth user gets full access
-- ------------------------------------------------------------
alter table public.koh_peaks_enquiries enable row level security;

drop policy if exists "anon_insert_koh_peaks_enquiries" on public.koh_peaks_enquiries;
create policy "anon_insert_koh_peaks_enquiries"
  on public.koh_peaks_enquiries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admin_all_koh_peaks_enquiries" on public.koh_peaks_enquiries;
create policy "admin_all_koh_peaks_enquiries"
  on public.koh_peaks_enquiries for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- OPTIONAL: to restrict admin reads to specific emails only,
-- replace the `using (true)` above with, e.g.:
--   using ( auth.jwt()->>'email' in ('you@kohpeaks.com') )
-- ------------------------------------------------------------

-- ------------------------------------------------------------
-- ADMIN LOGIN USER  (for the /admin panel sign-in form)
-- Creates admin@kohpeaks.com if it doesn't already exist.
-- Change the email/password below before running if you want a
-- different login.
-- ------------------------------------------------------------
do $$
declare
  v_user_id uuid;
  v_email text := 'admin@kohpeaks.com';
  v_password text := 'adminkohpeaks';
begin
  if not exists (select 1 from auth.users where email = v_email) then
    v_user_id := gen_random_uuid();

    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, recovery_sent_at, last_sign_in_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      v_email,
      crypt(v_password, gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(), now(),
      '', '', '', ''
    );

    insert into auth.identities (
      id, user_id, provider_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(),
      v_user_id,
      v_user_id::text,
      jsonb_build_object('sub', v_user_id::text, 'email', v_email),
      'email',
      now(), now(), now()
    );
  end if;
end $$;
