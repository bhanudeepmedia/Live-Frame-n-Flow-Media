-- ADMIN PORTAL ENHANCEMENTS

-- 1. Enhance Partners Table for Admin Management
ALTER TABLE public.partners 
ADD COLUMN IF NOT EXISTS internal_notes TEXT,
ADD COLUMN IF NOT EXISTS quality_rating INTEGER DEFAULT 5, -- 1 to 5 stars
ADD COLUMN IF NOT EXISTS is_high_potential BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_consistent_performer BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active'; -- 'active', 'suspended', 'banned'

-- 2. Enhance Leads Table for Deal Oversight
ALTER TABLE public.partner_leads
ADD COLUMN IF NOT EXISTS is_duplicate BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS deal_value NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS commission_amount NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS payout_status TEXT DEFAULT 'pending'; -- 'pending', 'approved', 'paid'

-- 3. Create Admin Settings Table
CREATE TABLE IF NOT EXISTS public.admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commission_percentage INTEGER DEFAULT 20,
    accepted_platforms TEXT[] DEFAULT '{Instagram, LinkedIn, Email, Calls}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert default settings row
INSERT INTO public.admin_settings (commission_percentage)
SELECT 20 WHERE NOT EXISTS (SELECT 1 FROM public.admin_settings);

-- 4. RLS Policies (Admin Access)
-- Ensure admin has full access to these new fields/tables
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can do everything on settings"
ON public.admin_settings
FOR ALL
USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Partners can view settings"
ON public.admin_settings
FOR SELECT
USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'partner'));
