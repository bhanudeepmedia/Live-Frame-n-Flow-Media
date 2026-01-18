ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS social_url TEXT;

-- Optional comments for admin
COMMENT ON COLUMN public.applications.linkedin_url IS 'LinkedIn Profile URL';
COMMENT ON COLUMN public.applications.social_url IS 'Other Social Profile URL (Instagram/Facebook)';
