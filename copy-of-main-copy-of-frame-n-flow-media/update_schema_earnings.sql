create table if not exists public.earnings_history (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  partner_id uuid references public.partners(id) on delete cascade not null,
  amount numeric not null,
  date timestamp with time zone not null,
  lead_name text not null
);

-- Enable RLS
alter table public.earnings_history enable row level security;

-- Policies for Admin
create policy "Admins can manage earnings" on public.earnings_history
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Policies for Partners (View Own)
create policy "Partners can view own earnings" on public.earnings_history
  for select using (
    exists (
      select 1 from public.partners
      where id = public.earnings_history.partner_id
      and user_id = auth.uid()
    )
  );
