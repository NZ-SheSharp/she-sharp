-- Fix array columns to match schema.ts (jsonb instead of text[])

-- Fix mentor_profiles.expertise_areas
ALTER TABLE mentor_profiles 
ALTER COLUMN expertise_areas 
TYPE jsonb 
USING CASE 
  WHEN expertise_areas IS NULL THEN NULL
  ELSE to_jsonb(expertise_areas)
END;

-- Fix mentee_profiles columns
ALTER TABLE mentee_profiles 
ALTER COLUMN learning_goals 
TYPE jsonb 
USING CASE 
  WHEN learning_goals IS NULL THEN NULL
  ELSE to_jsonb(learning_goals)
END;

ALTER TABLE mentee_profiles 
ALTER COLUMN preferred_expertise_areas 
TYPE jsonb 
USING CASE 
  WHEN preferred_expertise_areas IS NULL THEN NULL
  ELSE to_jsonb(preferred_expertise_areas)
END;