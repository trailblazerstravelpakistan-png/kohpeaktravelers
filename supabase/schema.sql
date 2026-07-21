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
