-- Add social media columns to applications table
-- Run this in Supabase SQL Editor

ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS social_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN applications.linkedin_url IS 'LinkedIn profile URL of the applicant';
COMMENT ON COLUMN applications.social_url IS 'Instagram or other social media URL of the applicant';
