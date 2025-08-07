-- Fix array columns to match schema.ts (jsonb instead of text[])
-- This script handles the actual column names in the database

-- Fix mentor_profiles.expertise_areas
DO $$ 
BEGIN
    -- Convert expertise_areas from text[] to jsonb
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'mentor_profiles' 
        AND column_name = 'expertise_areas'
        AND data_type = 'ARRAY'
    ) THEN
        ALTER TABLE mentor_profiles 
        ALTER COLUMN expertise_areas 
        TYPE jsonb 
        USING CASE 
            WHEN expertise_areas IS NULL THEN NULL
            ELSE to_jsonb(expertise_areas)
        END;
        RAISE NOTICE 'Converted mentor_profiles.expertise_areas to JSONB';
    END IF;
END $$;

-- Fix mentee_profiles columns
DO $$ 
BEGIN
    -- Convert learning_goals from text[] to jsonb
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'mentee_profiles' 
        AND column_name = 'learning_goals'
        AND data_type = 'ARRAY'
    ) THEN
        ALTER TABLE mentee_profiles 
        ALTER COLUMN learning_goals 
        TYPE jsonb 
        USING CASE 
            WHEN learning_goals IS NULL THEN NULL
            ELSE to_jsonb(learning_goals)
        END;
        RAISE NOTICE 'Converted mentee_profiles.learning_goals to JSONB';
    END IF;

    -- Convert areas_of_interest from text[] to jsonb
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'mentee_profiles' 
        AND column_name = 'areas_of_interest'
        AND data_type = 'ARRAY'
    ) THEN
        ALTER TABLE mentee_profiles 
        ALTER COLUMN areas_of_interest 
        TYPE jsonb 
        USING CASE 
            WHEN areas_of_interest IS NULL THEN NULL
            ELSE to_jsonb(areas_of_interest)
        END;
        RAISE NOTICE 'Converted mentee_profiles.areas_of_interest to JSONB';
    END IF;

    -- Convert preferred_mentor_expertise from text[] to jsonb
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'mentee_profiles' 
        AND column_name = 'preferred_mentor_expertise'
        AND data_type = 'ARRAY'
    ) THEN
        ALTER TABLE mentee_profiles 
        ALTER COLUMN preferred_mentor_expertise 
        TYPE jsonb 
        USING CASE 
            WHEN preferred_mentor_expertise IS NULL THEN NULL
            ELSE to_jsonb(preferred_mentor_expertise)
        END;
        RAISE NOTICE 'Converted mentee_profiles.preferred_mentor_expertise to JSONB';
    END IF;

    -- Rename columns to match schema.ts if needed
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'mentee_profiles' 
        AND column_name = 'preferred_mentor_expertise'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'mentee_profiles' 
        AND column_name = 'preferred_expertise_areas'
    ) THEN
        ALTER TABLE mentee_profiles 
        RENAME COLUMN preferred_mentor_expertise TO preferred_expertise_areas;
        RAISE NOTICE 'Renamed preferred_mentor_expertise to preferred_expertise_areas';
    END IF;
END $$;