-- Enhanced Session Management
-- Created: 2025-08-02
-- This migration adds advanced session tracking and management

-- Create user sessions table
CREATE TABLE IF NOT EXISTS "user_sessions" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "session_token" varchar(255) NOT NULL,
    "device_info" varchar(255),
    "device_type" varchar(50),
    "browser" varchar(100),
    "os" varchar(100),
    "ip_address" varchar(45),
    "user_agent" text,
    "last_activity" timestamp DEFAULT now() NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "expires_at" timestamp NOT NULL,
    "revoked_at" timestamp,
    "revoke_reason" varchar(100),
    CONSTRAINT "user_sessions_token_unique" UNIQUE("session_token")
);

-- Add foreign key constraint
ALTER TABLE "user_sessions" 
ADD CONSTRAINT "user_sessions_user_id_users_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_user_sessions_user_id" ON "user_sessions"("user_id");
CREATE INDEX IF NOT EXISTS "idx_user_sessions_token" ON "user_sessions"("session_token");
CREATE INDEX IF NOT EXISTS "idx_user_sessions_expires_at" ON "user_sessions"("expires_at");
CREATE INDEX IF NOT EXISTS "idx_user_sessions_last_activity" ON "user_sessions"("last_activity");

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM "user_sessions" 
    WHERE "expires_at" < NOW() OR "revoked_at" IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to get active sessions for a user
CREATE OR REPLACE FUNCTION get_active_sessions(p_user_id integer)
RETURNS TABLE(
    id integer,
    device_info varchar,
    browser varchar,
    last_activity timestamp,
    ip_address varchar
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.device_info,
        s.browser,
        s.last_activity,
        s.ip_address
    FROM "user_sessions" s
    WHERE s.user_id = p_user_id 
        AND s.expires_at > NOW() 
        AND s.revoked_at IS NULL
    ORDER BY s.last_activity DESC;
END;
$$ LANGUAGE plpgsql;

-- Comment on table and columns
COMMENT ON TABLE "user_sessions" IS 'Track all user sessions for security and management';
COMMENT ON COLUMN "user_sessions"."session_token" IS 'Unique session identifier';
COMMENT ON COLUMN "user_sessions"."device_info" IS 'Device name or identifier';
COMMENT ON COLUMN "user_sessions"."revoked_at" IS 'When session was manually revoked';
COMMENT ON COLUMN "user_sessions"."revoke_reason" IS 'Reason for revocation (logout, security, admin, etc.)';