-- Add all missing columns to mentorship_relationships table
ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS paused_at timestamp;

ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS meeting_frequency varchar(50);

ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS relationship_goals text;

ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS mentor_notes text;

ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS mentee_notes text;

ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS total_hours numeric(10,2) DEFAULT 0;

ALTER TABLE mentorship_relationships 
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;