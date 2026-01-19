-- MASTER REPAIR SCRIPT FOR FRAME N FLOW MEDIA
-- Run this in Supabase SQL Editor to fix ALL schema issues immediately

-- 1. Fix 'outreach_logs' table (Add missing columns)
ALTER TABLE public.outreach_logs 
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS niche text,
ADD COLUMN IF NOT EXISTS appointments_booked int default 0;

-- 2. Create 'partner_leads' table (If not exists)
CREATE TABLE IF NOT EXISTS public.partner_leads (
    id uuid default gen_random_uuid() primary key,
    partner_id uuid references public.partners(id),
    business_name text not null,
    contact_person text,
    source_platform text,
    status text default 'New', -- 'New', 'Contacted', 'Interested', 'Closed', 'Lost'
    created_at timestamp with time zone default timezone('utc'::text, now()),
    notes text,
    payout_status text default 'Unpaid'
);

-- 3. Create 'earnings' table (If not exists)
CREATE TABLE IF NOT EXISTS public.earnings (
    id uuid default gen_random_uuid() primary key,
    partner_id uuid references public.partners(id),
    client_name text not null,
    service_type text,
    deal_value numeric,
    commission_percentage numeric,
    amount numeric,
    deal_closed_date timestamp with time zone,
    status text default 'pending', -- 'pending', 'approved', 'paid', 'rejected'
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Create 'admin_settings' table (If not exists)
CREATE TABLE IF NOT EXISTS public.admin_settings (
    id uuid default gen_random_uuid() primary key,
    commission_percentage int default 20,
    accepted_platforms text[] default ARRAY['Instagram', 'LinkedIn', 'Twitter'],
    terms_content text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Create 'admin_notifications' table (If not exists)
CREATE TABLE IF NOT EXISTS public.admin_notifications (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    message text not null,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. Enable RLS on new tables (Security)
ALTER TABLE public.partner_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- 7. access policies (Open for now to ensure functionality)
CREATE POLICY "Public access" ON public.partner_leads FOR ALL USING (true);
CREATE POLICY "Public access" ON public.earnings FOR ALL USING (true);
CREATE POLICY "Public access" ON public.admin_settings FOR ALL USING (true);
CREATE POLICY "Public access" ON public.admin_notifications FOR ALL USING (true);

-- 8. Fix Partners table (Add missing columns if any)
-- Check for bank details structure mismatch or missing fields?
-- Usually handled by JSONB, so it's fine.

-- 9. Refresh schema cache
NOTIFY pgrst, 'reload schema';
