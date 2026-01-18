-- Run this script in the Supabase SQL Editor

-- 1. Create a table for Growth Partner Applications
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  city text,
  background text,
  experience boolean,
  reason text,
  platforms text[],
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create a public profiles table to store user roles (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text default 'partner', -- 'admin' or 'partner'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Create a table for Partners (linked to profiles)
create table public.partners (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  application_id uuid references public.applications(id),
  stage text default 'Starter',
  earnings_total numeric default 0,
  earnings_paid numeric default 0,
  earnings_pending numeric default 0,
  bank_details jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Create a table for Outreach Logs
create table public.outreach_logs (
  id uuid default gen_random_uuid() primary key,
  partner_id uuid references public.partners(id),
  date timestamp with time zone default timezone('utc'::text, now()),
  medium text,
  count int default 0,
  replies int default 0,
  interested int default 0,
  notes text
);

-- 5. Enable Row Level Security (RLS) - Optional for now but recommended
alter table public.applications enable row level security;
alter table public.profiles enable row level security;
alter table public.partners enable row level security;
alter table public.outreach_logs enable row level security;

-- Policies (Open for now for simplicity, you should lock this down later)
create policy "Public access" on public.applications for all using (true);
create policy "Public access" on public.profiles for all using (true);
create policy "Public access" on public.partners for all using (true);
create policy "Public access" on public.outreach_logs for all using (true);

-- 6. Trigger to create a profile after signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
