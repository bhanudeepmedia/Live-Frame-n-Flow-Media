-- Add primary_currency column to partners table with default 'INR'
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS primary_currency text DEFAULT 'INR';
