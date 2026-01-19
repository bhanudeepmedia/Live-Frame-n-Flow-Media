-- EMERGENCY FIX: Ensure created_at exists
-- Run this in Supabase SQL Editor

-- 1. Ensure outreach_logs has created_at
ALTER TABLE public.outreach_logs 
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone default timezone('utc'::text, now());

-- 2. Update existing NULL created_at values to use the 'date' column as fallback (for historical accuracy)
-- Note: 'date' column is likely just a date, so it will default to midnight of that day.
UPDATE public.outreach_logs 
SET created_at = date::timestamp 
WHERE created_at IS NULL;

-- 3. Ensure partner_leads has created_at (just in case)
ALTER TABLE public.partner_leads 
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone default timezone('utc'::text, now());

-- 4. Refresh schema cache
NOTIFY pgrst, 'reload schema';
