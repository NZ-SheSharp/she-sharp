-- Create enums for the new mentorship system
CREATE TYPE IF NOT EXISTS "user_role_type" AS ENUM('mentor', 'mentee', 'admin');
CREATE TYPE IF NOT EXISTS "membership_tier" AS ENUM('free', 'basic', 'premium');
CREATE TYPE IF NOT EXISTS "relationship_status" AS ENUM('pending', 'active', 'paused', 'completed', 'rejected');
CREATE TYPE IF NOT EXISTS "meeting_status" AS ENUM('scheduled', 'completed', 'cancelled', 'no_show');
CREATE TYPE IF NOT EXISTS "meeting_type" AS ENUM('intro', 'regular', 'milestone', 'final');
CREATE TYPE IF NOT EXISTS "event_type" AS ENUM('workshop', 'networking', 'training', 'social', 'thrive');
CREATE TYPE IF NOT EXISTS "location_type" AS ENUM('online', 'in_person', 'hybrid');
CREATE TYPE IF NOT EXISTS "resource_type" AS ENUM('document', 'video', 'link', 'template', 'guide');
CREATE TYPE IF NOT EXISTS "resource_access_level" AS ENUM('public', 'member', 'premium');

-- Remove role column from users table (if exists)
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";

-- Create user_roles table for flexible role activation
CREATE TABLE IF NOT EXISTS "user_roles" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "role_type" "user_role_type" NOT NULL,
  "activated_at" timestamp DEFAULT now() NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL,
  "activation_step" integer DEFAULT 0,
  "verified_at" timestamp,
  UNIQUE("user_id", "role_type")
);
CREATE INDEX IF NOT EXISTS "user_roles_user_id_idx" ON "user_roles"("user_id");
CREATE INDEX IF NOT EXISTS "user_roles_role_type_idx" ON "user_roles"("role_type");

-- Create mentor_profiles table
CREATE TABLE IF NOT EXISTS "mentor_profiles" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
  "expertise_areas" jsonb,
  "years_experience" integer,
  "company" varchar(200),
  "job_title" varchar(200),
  "bio" text,
  "linkedin_url" varchar(500),
  "availability_hours_per_month" integer,
  "max_mentees" integer DEFAULT 3,
  "current_mentees_count" integer DEFAULT 0,
  "is_accepting_mentees" boolean DEFAULT true,
  "profile_completed_at" timestamp,
  "verified_at" timestamp,
  "verified_by" integer REFERENCES "users"("id")
);
CREATE INDEX IF NOT EXISTS "mentor_profiles_user_id_idx" ON "mentor_profiles"("user_id");

-- Create mentee_profiles table
CREATE TABLE IF NOT EXISTS "mentee_profiles" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
  "learning_goals" jsonb,
  "career_stage" varchar(100),
  "preferred_expertise_areas" jsonb,
  "preferred_meeting_frequency" varchar(50),
  "bio" text,
  "current_challenge" text,
  "profile_completed_at" timestamp
);
CREATE INDEX IF NOT EXISTS "mentee_profiles_user_id_idx" ON "mentee_profiles"("user_id");

-- Create mentorship_relationships table
CREATE TABLE IF NOT EXISTS "mentorship_relationships" (
  "id" serial PRIMARY KEY,
  "mentor_user_id" integer NOT NULL REFERENCES "users"("id"),
  "mentee_user_id" integer NOT NULL REFERENCES "users"("id"),
  "status" "relationship_status" DEFAULT 'pending' NOT NULL,
  "started_at" timestamp,
  "ended_at" timestamp,
  "paused_at" timestamp,
  "meeting_frequency" varchar(50),
  "next_meeting_date" timestamp,
  "relationship_goals" text,
  "mentor_notes" text,
  "mentee_notes" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "relationships_mentor_idx" ON "mentorship_relationships"("mentor_user_id");
CREATE INDEX IF NOT EXISTS "relationships_mentee_idx" ON "mentorship_relationships"("mentee_user_id");
CREATE INDEX IF NOT EXISTS "relationships_status_idx" ON "mentorship_relationships"("status");

-- Create meetings table
CREATE TABLE IF NOT EXISTS "meetings" (
  "id" serial PRIMARY KEY,
  "relationship_id" integer NOT NULL REFERENCES "mentorship_relationships"("id"),
  "scheduled_at" timestamp NOT NULL,
  "duration_minutes" integer DEFAULT 60,
  "meeting_type" "meeting_type" DEFAULT 'regular' NOT NULL,
  "meeting_link" varchar(500),
  "status" "meeting_status" DEFAULT 'scheduled' NOT NULL,
  "topics_discussed" jsonb,
  "goals_set" jsonb,
  "action_items" jsonb,
  "mentor_notes" text,
  "mentee_feedback" text,
  "rating" integer,
  "actual_start_time" timestamp,
  "actual_end_time" timestamp,
  "recording_url" varchar(500),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "meetings_relationship_idx" ON "meetings"("relationship_id");
CREATE INDEX IF NOT EXISTS "meetings_scheduled_at_idx" ON "meetings"("scheduled_at");
CREATE INDEX IF NOT EXISTS "meetings_status_idx" ON "meetings"("status");

-- Create events table
CREATE TABLE IF NOT EXISTS "events" (
  "id" serial PRIMARY KEY,
  "title" varchar(200) NOT NULL,
  "description" text,
  "event_type" "event_type" NOT NULL,
  "start_time" timestamp NOT NULL,
  "end_time" timestamp NOT NULL,
  "timezone" varchar(50) DEFAULT 'America/Los_Angeles',
  "location_type" "location_type" NOT NULL,
  "location_details" jsonb,
  "capacity" integer,
  "current_registrations" integer DEFAULT 0,
  "registration_deadline" timestamp,
  "waitlist_enabled" boolean DEFAULT false,
  "is_members_only" boolean DEFAULT false,
  "required_membership_tier" "membership_tier",
  "agenda" jsonb,
  "speakers" jsonb,
  "materials" jsonb,
  "actual_attendance" integer,
  "feedback_score" decimal(3, 2),
  "created_by" integer NOT NULL REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "events_type_idx" ON "events"("event_type");
CREATE INDEX IF NOT EXISTS "events_start_time_idx" ON "events"("start_time");
CREATE INDEX IF NOT EXISTS "events_created_by_idx" ON "events"("created_by");

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS "event_registrations" (
  "id" serial PRIMARY KEY,
  "event_id" integer NOT NULL REFERENCES "events"("id") ON DELETE CASCADE,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "registered_at" timestamp DEFAULT now() NOT NULL,
  "role_in_event" varchar(50),
  "checked_in_at" timestamp,
  "checked_out_at" timestamp,
  "attendance_duration" integer,
  "feedback_submitted" boolean DEFAULT false,
  "feedback_score" integer,
  "feedback_comments" text,
  "certificate_issued" boolean DEFAULT false,
  "certificate_url" varchar(500),
  UNIQUE("event_id", "user_id")
);
CREATE INDEX IF NOT EXISTS "registrations_event_idx" ON "event_registrations"("event_id");
CREATE INDEX IF NOT EXISTS "registrations_user_idx" ON "event_registrations"("user_id");

-- Create resources table
CREATE TABLE IF NOT EXISTS "resources" (
  "id" serial PRIMARY KEY,
  "title" varchar(200) NOT NULL,
  "description" text,
  "resource_type" "resource_type" NOT NULL,
  "file_url" varchar(500),
  "file_size" integer,
  "mime_type" varchar(100),
  "access_level" "resource_access_level" DEFAULT 'member' NOT NULL,
  "required_roles" jsonb,
  "categories" jsonb,
  "tags" jsonb,
  "uploaded_by" integer NOT NULL REFERENCES "users"("id"),
  "uploaded_at" timestamp DEFAULT now() NOT NULL,
  "last_updated" timestamp DEFAULT now() NOT NULL,
  "download_count" integer DEFAULT 0,
  "view_count" integer DEFAULT 0,
  "average_rating" decimal(3, 2)
);
CREATE INDEX IF NOT EXISTS "resources_type_idx" ON "resources"("resource_type");
CREATE INDEX IF NOT EXISTS "resources_access_level_idx" ON "resources"("access_level");
CREATE INDEX IF NOT EXISTS "resources_uploaded_by_idx" ON "resources"("uploaded_by");

-- Create resource_access_logs table
CREATE TABLE IF NOT EXISTS "resource_access_logs" (
  "id" serial PRIMARY KEY,
  "resource_id" integer NOT NULL REFERENCES "resources"("id") ON DELETE CASCADE,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "accessed_at" timestamp DEFAULT now() NOT NULL,
  "action" varchar(20) NOT NULL,
  "ip_address" varchar(45)
);
CREATE INDEX IF NOT EXISTS "access_logs_resource_idx" ON "resource_access_logs"("resource_id");
CREATE INDEX IF NOT EXISTS "access_logs_user_idx" ON "resource_access_logs"("user_id");

-- Create user_memberships table
CREATE TABLE IF NOT EXISTS "user_memberships" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
  "tier" "membership_tier" DEFAULT 'free' NOT NULL,
  "expires_at" timestamp,
  "stripe_subscription_id" text UNIQUE,
  "stripe_customer_id" text,
  "features_access" jsonb,
  "last_payment_at" timestamp,
  "next_billing_date" timestamp,
  "cancelled_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "memberships_user_id_idx" ON "user_memberships"("user_id");
CREATE INDEX IF NOT EXISTS "memberships_tier_idx" ON "user_memberships"("tier");

-- Create admin_permissions table
CREATE TABLE IF NOT EXISTS "admin_permissions" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
  "can_view_all_data" boolean DEFAULT true,
  "can_edit_users" boolean DEFAULT true,
  "can_manage_relationships" boolean DEFAULT true,
  "can_access_analytics" boolean DEFAULT true,
  "can_manage_content" boolean DEFAULT true,
  "can_verify_mentors" boolean DEFAULT true,
  "can_manage_events" boolean DEFAULT true,
  "granted_by" integer REFERENCES "users"("id"),
  "granted_at" timestamp DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "admin_permissions_user_id_idx" ON "admin_permissions"("user_id");

-- Add metadata column to activity_logs if not exists
ALTER TABLE "activity_logs" ADD COLUMN IF NOT EXISTS "metadata" jsonb;