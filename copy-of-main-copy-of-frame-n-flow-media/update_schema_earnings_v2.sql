-- 1. Clean up old simple table
drop table if exists public.earnings_history;

-- 2. Create Status Enum
do $$ begin
    create type public.earning_status as enum ('pending', 'approved', 'paid', 'rejected');
exception
    when duplicate_object then null;
end $$;

-- 3. Create Earnings Table (Comprehensive)
create table if not exists public.earnings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  partner_id uuid references public.partners(id) on delete cascade not null,
  
  -- Deal Details
  client_name text not null,
  business_name text, -- Optional, or same as client
  service_type text default 'Standard Service',
  deal_value numeric not null,
  deal_closed_date timestamp with time zone not null,
  
  -- Commission Logic
  commission_percentage numeric not null, -- e.g. 20
  amount numeric not null, -- The commission amount (Value * %)
  currency text default 'INR',
  
  -- Meta
  status public.earning_status default 'pending',
  notes text,
  admin_notes text,
  editable_until timestamp with time zone default (now() + interval '24 hours')
);

-- 4. Enable RLS
alter table public.earnings enable row level security;

-- 5. Policies
create policy "Admins can manage earnings" on public.earnings
  for all using (
    exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
  );

create policy "Partners can view own earnings" on public.earnings
  for select using (
    exists (
      select 1 from public.partners
      where id = public.earnings.partner_id
      and user_id = auth.uid()
    )
  );

-- 6. Helper: Function to auto-calculate totals on partner table? 
-- For now we will handle aggregation in standard queries or frontend, 
-- but ideally we should update 'partners' table totals whenever earnings change.
-- We can stick to the client-side update for now as implemented in services.
