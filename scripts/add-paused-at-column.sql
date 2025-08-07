-- Add missing paused_at column to mentorship_relationships table
ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS paused_at timestamp;

-- Also add meeting_frequency column if missing
ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS meeting_frequency varchar(50);

-- Update schema to match
UPDATE mentorship_relationships 
SET paused_at = NULL 
WHERE paused_at IS NULL;