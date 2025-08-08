-- Database Schema Backup
-- Date: January 9, 2025
-- Version: 2.0
-- Description: Complete schema after admin dashboard fixes and test user cleanup
-- Commit: Post-admin-permissions-fix

-- This backup includes:
-- 1. All base tables from initial setup
-- 2. She Sharp specific tables (events, newsletters, etc.)
-- 3. Mentorship system tables
-- 4. Admin permissions with all columns
-- 5. User statistics and analytics tables
-- 6. All indexes and constraints

-- To restore this schema:
-- psql $DATABASE_URL < docs/database/backups/schema_2025_01_09_v2.sql

-- Include all migrations up to 0012CREATE TABLE IF NOT EXISTS "activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"user_id" integer,
	"action" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"invited_by" integer NOT NULL,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"role" varchar(50) NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_product_id" text,
	"plan_name" varchar(50),
	"subscription_status" varchar(20),
	CONSTRAINT "teams_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "teams_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" varchar(20) DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
CREATE TABLE "email_verifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"verified_at" timestamp,
	CONSTRAINT "email_verifications_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "password_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_resets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"used_at" timestamp,
	"ip_address" varchar(45),
	"user_agent" text,
	CONSTRAINT "password_resets_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_login_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "login_attempts" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "locked_until" timestamp;--> statement-breakpoint
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_history" ADD CONSTRAINT "password_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;CREATE TABLE "account" (
	"user_id" integer NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");ALTER TABLE "activity_logs" ALTER COLUMN "team_id" DROP NOT NULL;ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image" text;-- Custom SQL migration file, put your code below! --

-- Add entity_type column to activity_logs table (for generic entity tracking)
ALTER TABLE "activity_logs" ADD COLUMN "entity_type" varchar(50);--> statement-breakpoint

-- Add entity_id column to activity_logs table  
ALTER TABLE "activity_logs" ADD COLUMN "entity_id" integer;--> statement-breakpoint

-- Add metadata column to activity_logs table for additional context
ALTER TABLE "activity_logs" ADD COLUMN "metadata" jsonb;--> statement-breakpoint

-- Create new index for entity type and id lookups
CREATE INDEX IF NOT EXISTS "activity_logs_entity_idx" ON "activity_logs" ("entity_type","entity_id");--> statement-breakpoint-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'event', 'mentorship', 'resource', 'system', 'meeting'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  action_label VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP,
  
  -- Add column constraints
  CHECK (type IN ('event', 'mentorship', 'resource', 'system', 'meeting'))
);

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Email preferences
  email_enabled BOOLEAN DEFAULT TRUE,
  email_events BOOLEAN DEFAULT TRUE,
  email_mentorship BOOLEAN DEFAULT TRUE,
  email_resources BOOLEAN DEFAULT TRUE,
  email_meetings BOOLEAN DEFAULT TRUE,
  email_system BOOLEAN DEFAULT TRUE,
  
  -- In-app preferences
  inapp_enabled BOOLEAN DEFAULT TRUE,
  inapp_events BOOLEAN DEFAULT TRUE,
  inapp_mentorship BOOLEAN DEFAULT TRUE,
  inapp_resources BOOLEAN DEFAULT TRUE,
  inapp_meetings BOOLEAN DEFAULT TRUE,
  inapp_system BOOLEAN DEFAULT TRUE,
  
  -- Frequency settings
  email_frequency VARCHAR(20) DEFAULT 'immediate', -- 'immediate', 'daily', 'weekly'
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  timezone VARCHAR(50) DEFAULT 'America/Los_Angeles',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create email queue table for async email sending
CREATE TABLE IF NOT EXISTS email_queue (
  id SERIAL PRIMARY KEY,
  to_email VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) DEFAULT 'noreply@shesharp.org',
  subject VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  priority INTEGER DEFAULT 5, -- 1 (highest) to 10 (lowest)
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sending', 'sent', 'failed'
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  sent_at TIMESTAMP,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for notifications table
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Create indexes for notification_preferences table
CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);

-- Create indexes for email_queue table
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_priority ON email_queue(priority);
CREATE INDEX IF NOT EXISTS idx_email_queue_created_at ON email_queue(created_at);-- Create event role assignments table for activity-specific roles
CREATE TABLE IF NOT EXISTS event_role_assignments (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_type VARCHAR(50) NOT NULL, -- 'mentor', 'mentee', 'facilitator', 'speaker'
    assigned_at TIMESTAMP DEFAULT NOW(),
    assigned_by INTEGER REFERENCES users(id),
    notes TEXT,
    UNIQUE(event_id, user_id, role_type)
);

-- Create membership features table for tier-based features
CREATE TABLE IF NOT EXISTS membership_features (
    id SERIAL PRIMARY KEY,
    tier membership_tier NOT NULL,
    feature_name VARCHAR(100) NOT NULL,
    feature_value JSONB,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tier, feature_name)
);

-- Create mentorship stats table for caching statistics
CREATE TABLE IF NOT EXISTS user_mentorship_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    mentees_count INTEGER DEFAULT 0,
    mentors_count INTEGER DEFAULT 0,
    total_meetings INTEGER DEFAULT 0,
    completed_meetings INTEGER DEFAULT 0,
    total_meeting_hours DECIMAL(10, 2) DEFAULT 0,
    events_attended INTEGER DEFAULT 0,
    events_registered INTEGER DEFAULT 0,
    resources_uploaded INTEGER DEFAULT 0,
    resources_accessed INTEGER DEFAULT 0,
    last_activity_at TIMESTAMP,
    stats_updated_at TIMESTAMP DEFAULT NOW()
);

-- Create function to update stats
CREATE OR REPLACE FUNCTION update_user_mentorship_stats(p_user_id INTEGER)
RETURNS void AS $$
BEGIN
    INSERT INTO user_mentorship_stats (
        user_id,
        mentees_count,
        mentors_count,
        total_meetings,
        completed_meetings,
        total_meeting_hours,
        events_attended,
        events_registered,
        resources_uploaded,
        resources_accessed,
        last_activity_at,
        stats_updated_at
    )
    SELECT 
        p_user_id,
        COUNT(DISTINCT mr_mentor.id) FILTER (WHERE mr_mentor.status = 'active'),
        COUNT(DISTINCT mr_mentee.id) FILTER (WHERE mr_mentee.status = 'active'),
        COUNT(DISTINCT m.id),
        COUNT(DISTINCT m.id) FILTER (WHERE m.status = 'completed'),
        COALESCE(SUM(m.duration_minutes) FILTER (WHERE m.status = 'completed') / 60.0, 0),
        COUNT(DISTINCT er.event_id) FILTER (WHERE er.checked_in_at IS NOT NULL),
        COUNT(DISTINCT er.event_id),
        COUNT(DISTINCT r.id),
        COUNT(DISTINCT ral.resource_id),
        GREATEST(
            MAX(mr_mentor.updated_at),
            MAX(mr_mentee.updated_at),
            MAX(m.updated_at),
            MAX(er.registered_at),
            MAX(r.uploaded_at),
            MAX(ral.accessed_at)
        ),
        NOW()
    FROM users u
    LEFT JOIN mentorship_relationships mr_mentor ON u.id = mr_mentor.mentor_user_id
    LEFT JOIN mentorship_relationships mr_mentee ON u.id = mr_mentee.mentee_user_id
    LEFT JOIN meetings m ON (mr_mentor.id = m.relationship_id OR mr_mentee.id = m.relationship_id)
    LEFT JOIN event_registrations er ON u.id = er.user_id
    LEFT JOIN resources r ON u.id = r.uploaded_by
    LEFT JOIN resource_access_logs ral ON u.id = ral.user_id
    WHERE u.id = p_user_id
    GROUP BY u.id
    ON CONFLICT (user_id) DO UPDATE SET
        mentees_count = EXCLUDED.mentees_count,
        mentors_count = EXCLUDED.mentors_count,
        total_meetings = EXCLUDED.total_meetings,
        completed_meetings = EXCLUDED.completed_meetings,
        total_meeting_hours = EXCLUDED.total_meeting_hours,
        events_attended = EXCLUDED.events_attended,
        events_registered = EXCLUDED.events_registered,
        resources_uploaded = EXCLUDED.resources_uploaded,
        resources_accessed = EXCLUDED.resources_accessed,
        last_activity_at = EXCLUDED.last_activity_at,
        stats_updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_role_assignments_event_id ON event_role_assignments(event_id);
CREATE INDEX IF NOT EXISTS idx_event_role_assignments_user_id ON event_role_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_event_role_assignments_role_type ON event_role_assignments(role_type);
CREATE INDEX IF NOT EXISTS idx_membership_features_tier ON membership_features(tier);
CREATE INDEX IF NOT EXISTS idx_user_mentorship_stats_user_id ON user_mentorship_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mentorship_stats_updated ON user_mentorship_stats(stats_updated_at);

-- Insert default membership features
INSERT INTO membership_features (tier, feature_name, feature_value, description) VALUES
('free', 'max_mentors', '{"value": 1}', 'Maximum number of mentors a mentee can have'),
('free', 'max_mentees', '{"value": 2}', 'Maximum number of mentees a mentor can have'),
('free', 'monthly_meetings', '{"value": 2}', 'Maximum meetings per month'),
('free', 'resource_access', '{"level": "basic"}', 'Access to basic resources only'),
('free', 'event_priority', '{"priority": 0}', 'No priority registration for events'),

('basic', 'max_mentors', '{"value": 2}', 'Maximum number of mentors a mentee can have'),
('basic', 'max_mentees', '{"value": 5}', 'Maximum number of mentees a mentor can have'),
('basic', 'monthly_meetings', '{"value": 8}', 'Maximum meetings per month'),
('basic', 'resource_access', '{"level": "standard"}', 'Access to standard resources'),
('basic', 'event_priority', '{"priority": 1}', 'Early registration for events'),
('basic', 'meeting_recordings', '{"enabled": true}', 'Access to meeting recordings'),

('premium', 'max_mentors', '{"value": -1}', 'Unlimited mentors'),
('premium', 'max_mentees', '{"value": -1}', 'Unlimited mentees'),
('premium', 'monthly_meetings', '{"value": -1}', 'Unlimited meetings'),
('premium', 'resource_access', '{"level": "premium"}', 'Access to all resources'),
('premium', 'event_priority', '{"priority": 2}', 'Priority registration and reserved seats'),
('premium', 'meeting_recordings', '{"enabled": true}', 'Access to meeting recordings'),
('premium', 'analytics_dashboard', '{"enabled": true}', 'Advanced analytics and insights'),
('premium', 'custom_matching', '{"enabled": true}', 'AI-powered mentor/mentee matching')
ON CONFLICT (tier, feature_name) DO NOTHING;-- Add new columns to meetings table
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
ALTER TABLE mentorship_relationships ADD COLUMN IF NOT EXISTS mentee_notes TEXT;-- Add missing columns to resources table
ALTER TABLE resources ADD COLUMN IF NOT EXISTS title VARCHAR(200);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS resource_type resource_type;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_url VARCHAR(500);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_size INTEGER;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS access_level resource_access_level;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS required_roles JSONB;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS categories JSONB;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS tags JSONB;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS uploaded_by INTEGER REFERENCES users(id);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS uploaded_at TIMESTAMP DEFAULT NOW();
ALTER TABLE resources ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP DEFAULT NOW();
ALTER TABLE resources ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2);-- Fix admin_permissions table structure
-- Add missing columns that were causing dashboard errors

-- Add missing columns if they don't exist
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS can_manage_content BOOLEAN DEFAULT true;
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS can_verify_mentors BOOLEAN DEFAULT true;
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS granted_by INTEGER REFERENCES users(id);
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS granted_at TIMESTAMP DEFAULT NOW();

-- Ensure admin user (ID: 1) has full permissions
INSERT INTO admin_permissions (
  user_id,
  can_view_all_data,
  can_edit_users,
  can_manage_relationships,
  can_access_analytics,
  can_manage_content,
  can_verify_mentors,
  can_manage_events,
  granted_at
)
VALUES (
  1,  -- chanmeng.career@gmail.com
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  NOW()
)
ON CONFLICT (user_id) 
DO UPDATE SET
  can_view_all_data = true,
  can_edit_users = true,
  can_manage_relationships = true,
  can_access_analytics = true,
  can_manage_content = true,
  can_verify_mentors = true,
  can_manage_events = true;

-- Create index if not exists
CREATE INDEX IF NOT EXISTS admin_permissions_user_id_idx ON admin_permissions(user_id);