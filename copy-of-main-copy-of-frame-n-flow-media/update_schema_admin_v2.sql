-- ADMIN PORTAL V2 SCHEMA
-- Run this to enable Broadcasts, Settings, and Advanced Lead Mgmt

-- 1. Broadcast Notifications Table
CREATE TABLE IF NOT EXISTS public.admin_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Enhanced Partner Leads (if not already done)
ALTER TABLE public.partner_leads 
ADD COLUMN IF NOT EXISTS is_duplicate BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS deal_value NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS potential_commission NUMERIC GENERATED ALWAYS AS (deal_value * 0.20) STORED, -- Example 20% default
ADD COLUMN IF NOT EXISTS payout_status TEXT DEFAULT 'pending'; -- 'pending', 'approved', 'paid', 'rejected'

-- 3. Admin Settings (if not already done)
CREATE TABLE IF NOT EXISTS public.admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commission_percentage INTEGER DEFAULT 20,
    accepted_platforms TEXT[] DEFAULT '{Instagram, LinkedIn, Email, Calls}',
    terms_content TEXT DEFAULT 'Standard Terms apply.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Ensure 1 row exists
INSERT INTO public.admin_settings (commission_percentage)
SELECT 20 WHERE NOT EXISTS (SELECT 1 FROM public.admin_settings);

-- 4. RLS for Notifications
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage notifications"
ON public.admin_notifications
FOR ALL
USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Partners can view active notifications"
ON public.admin_notifications
FOR SELECT
USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'partner') AND is_active = true);
