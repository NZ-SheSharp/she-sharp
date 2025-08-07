-- Fix mentor_profiles table structure to match schema.ts

-- First, check if the table exists
DO $$ 
BEGIN
    -- Drop the old columns if they exist (from our previous incorrect structure)
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='mentor_profiles' AND column_name='current_role') THEN
        ALTER TABLE mentor_profiles DROP COLUMN "current_role";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='mentor_profiles' AND column_name='preferred_meeting_types') THEN
        ALTER TABLE mentor_profiles DROP COLUMN preferred_meeting_types;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='mentor_profiles' AND column_name='timezone') THEN
        ALTER TABLE mentor_profiles DROP COLUMN timezone;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='mentor_profiles' AND column_name='languages_spoken') THEN
        ALTER TABLE mentor_profiles DROP COLUMN languages_spoken;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='mentor_profiles' AND column_name='total_sessions_given') THEN
        ALTER TABLE mentor_profiles DROP COLUMN total_sessions_given;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='mentor_profiles' AND column_name='average_rating') THEN
        ALTER TABLE mentor_profiles DROP COLUMN average_rating;
    END IF;
    
    -- Add columns that match schema.ts
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='mentor_profiles' AND column_name='job_title') THEN
        ALTER TABLE mentor_profiles ADD COLUMN job_title VARCHAR(200);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='mentor_profiles' AND column_name='expertise_areas') THEN
        ALTER TABLE mentor_profiles ADD COLUMN expertise_areas JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='mentor_profiles' AND column_name='verified_by') THEN
        ALTER TABLE mentor_profiles ADD COLUMN verified_by INTEGER REFERENCES users(id);
    END IF;
    
END $$;