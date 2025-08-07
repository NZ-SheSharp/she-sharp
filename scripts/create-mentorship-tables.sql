-- Create user_role_type enum if not exists
DO $$ BEGIN
    CREATE TYPE "public"."user_role_type" AS ENUM ('mentor', 'mentee', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create membership_tier enum if not exists  
DO $$ BEGIN
    CREATE TYPE "public"."membership_tier" AS ENUM ('free', 'basic', 'premium', 'enterprise');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS "user_roles" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "role_type" "public"."user_role_type" NOT NULL,
    "activated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "is_active" BOOLEAN DEFAULT true NOT NULL,
    "activation_step" INTEGER DEFAULT 0,
    "verified_at" TIMESTAMP,
    UNIQUE("user_id", "role_type")
);

-- Create indexes for user_roles
CREATE INDEX IF NOT EXISTS "user_roles_user_id_idx" ON "user_roles"("user_id");
CREATE INDEX IF NOT EXISTS "user_roles_role_type_idx" ON "user_roles"("role_type");

-- Create user_memberships table
CREATE TABLE IF NOT EXISTS "user_memberships" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "tier" "public"."membership_tier" DEFAULT 'free' NOT NULL,
    "started_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "expires_at" TIMESTAMP,
    "auto_renew" BOOLEAN DEFAULT false NOT NULL,
    "stripe_subscription_id" VARCHAR(255),
    "features_access" JSONB,
    "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create mentor_profiles table
CREATE TABLE IF NOT EXISTS "mentor_profiles" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "expertise_areas" TEXT[] NOT NULL,
    "years_experience" INTEGER NOT NULL,
    "current_role" VARCHAR(100),
    "company" VARCHAR(100),
    "linkedin_url" VARCHAR(255),
    "bio" TEXT,
    "availability_hours_per_month" INTEGER DEFAULT 4,
    "preferred_meeting_types" TEXT[],
    "timezone" VARCHAR(50) DEFAULT 'America/Los_Angeles',
    "languages_spoken" TEXT[] DEFAULT ARRAY['English'],
    "max_mentees" INTEGER DEFAULT 3,
    "current_mentees_count" INTEGER DEFAULT 0,
    "total_sessions_given" INTEGER DEFAULT 0,
    "average_rating" DECIMAL(3, 2),
    "is_accepting_mentees" BOOLEAN DEFAULT true NOT NULL,
    "profile_completed_at" TIMESTAMP,
    "verified_at" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create mentee_profiles table
CREATE TABLE IF NOT EXISTS "mentee_profiles" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "learning_goals" TEXT[],
    "areas_of_interest" TEXT[],
    "current_level" VARCHAR(50),
    "preferred_mentor_expertise" TEXT[],
    "preferred_meeting_frequency" VARCHAR(50),
    "timezone" VARCHAR(50) DEFAULT 'America/Los_Angeles',
    "linkedin_url" VARCHAR(255),
    "bio" TEXT,
    "total_sessions_attended" INTEGER DEFAULT 0,
    "current_mentor_id" INTEGER REFERENCES "users"("id"),
    "profile_completed_at" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create mentorship_relationships table
CREATE TABLE IF NOT EXISTS "mentorship_relationships" (
    "id" SERIAL PRIMARY KEY,
    "mentor_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "mentee_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "status" VARCHAR(20) DEFAULT 'pending' NOT NULL,
    "started_at" TIMESTAMP,
    "ended_at" TIMESTAMP,
    "total_meetings" INTEGER DEFAULT 0,
    "next_meeting_date" TIMESTAMP,
    "notes" TEXT,
    "mentee_feedback" JSONB,
    "mentor_feedback" JSONB,
    "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE("mentor_id", "mentee_id")
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS "meetings" (
    "id" SERIAL PRIMARY KEY,
    "relationship_id" INTEGER NOT NULL REFERENCES "mentorship_relationships"("id") ON DELETE CASCADE,
    "scheduled_at" TIMESTAMP NOT NULL,
    "duration_minutes" INTEGER DEFAULT 60,
    "meeting_type" VARCHAR(50),
    "meeting_link" VARCHAR(255),
    "status" VARCHAR(20) DEFAULT 'scheduled',
    "notes" TEXT,
    "mentee_attended" BOOLEAN,
    "mentor_attended" BOOLEAN,
    "cancelled_at" TIMESTAMP,
    "cancelled_by" INTEGER REFERENCES "users"("id"),
    "cancellation_reason" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create admin_permissions table
CREATE TABLE IF NOT EXISTS "admin_permissions" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "can_view_all_data" BOOLEAN DEFAULT true,
    "can_edit_users" BOOLEAN DEFAULT true,
    "can_manage_relationships" BOOLEAN DEFAULT true,
    "can_manage_events" BOOLEAN DEFAULT true,
    "can_manage_resources" BOOLEAN DEFAULT true,
    "can_view_analytics" BOOLEAN DEFAULT true,
    "can_export_data" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add entity_type column to activity_logs if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='activity_logs' 
                   AND column_name='entity_type') THEN
        ALTER TABLE "activity_logs" ADD COLUMN "entity_type" VARCHAR(50);
    END IF;
END $$;

-- Add entity_id column to activity_logs if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='activity_logs' 
                   AND column_name='entity_id') THEN
        ALTER TABLE "activity_logs" ADD COLUMN "entity_id" INTEGER;
    END IF;
END $$;

-- Drop role column from users table if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='users' 
               AND column_name='role') THEN
        ALTER TABLE "users" DROP COLUMN "role";
    END IF;
END $$;

-- Drop team_id column from activity_logs if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='activity_logs' 
               AND column_name='team_id') THEN
        ALTER TABLE "activity_logs" DROP COLUMN "team_id";
    END IF;
END $$;