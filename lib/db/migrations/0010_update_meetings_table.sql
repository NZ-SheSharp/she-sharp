-- Add new columns to meetings table
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS topics_discussed JSONB;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS goals_set JSONB;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS action_items JSONB;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS mentor_notes TEXT;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS mentee_feedback TEXT;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS rating INTEGER;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS actual_start_time TIMESTAMP;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS actual_end_time TIMESTAMP;
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS recording_url VARCHAR(500);

-- Also ensure mentorship_relationships has the needed columns
ALTER TABLE mentorship_relationships ADD COLUMN IF NOT EXISTS relationship_goals TEXT;
ALTER TABLE mentorship_relationships ADD COLUMN IF NOT EXISTS mentor_notes TEXT;
ALTER TABLE mentorship_relationships ADD COLUMN IF NOT EXISTS mentee_notes TEXT;