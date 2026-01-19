-- ADD STREAK TRACKING TO PARTNERS TABLE
-- Run this in Supabase SQL Editor

ALTER TABLE public.partners 
ADD COLUMN IF NOT EXISTS current_streak int default 0,
ADD COLUMN IF NOT EXISTS longest_streak int default 0,
ADD COLUMN IF NOT EXISTS last_activity_date date;

-- Refresh schema
NOTIFY pgrst, 'reload schema';
