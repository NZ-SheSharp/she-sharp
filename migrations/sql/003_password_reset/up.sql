-- Password Reset Feature
-- Created: 2025-08-02
-- This migration adds password reset functionality to the authentication system

-- Create password resets table
CREATE TABLE IF NOT EXISTS "password_resets" (
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

-- Add foreign key constraint
ALTER TABLE "password_resets" 
ADD CONSTRAINT "password_resets_user_id_users_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_password_resets_user_id" ON "password_resets"("user_id");
CREATE INDEX IF NOT EXISTS "idx_password_resets_token" ON "password_resets"("token");
CREATE INDEX IF NOT EXISTS "idx_password_resets_expires_at" ON "password_resets"("expires_at");
CREATE INDEX IF NOT EXISTS "idx_password_resets_used_at" ON "password_resets"("used_at");

-- Add password history table to prevent reuse of recent passwords
CREATE TABLE IF NOT EXISTS "password_history" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "password_hash" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key for password history
ALTER TABLE "password_history" 
ADD CONSTRAINT "password_history_user_id_users_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

-- Create index for password history
CREATE INDEX IF NOT EXISTS "idx_password_history_user_id" ON "password_history"("user_id");

-- Function to clean up expired password reset tokens
CREATE OR REPLACE FUNCTION cleanup_expired_password_resets()
RETURNS void AS $$
BEGIN
    DELETE FROM "password_resets" 
    WHERE "expires_at" < NOW() AND "used_at" IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to invalidate all existing password reset tokens for a user
CREATE OR REPLACE FUNCTION invalidate_user_password_resets(p_user_id integer)
RETURNS void AS $$
BEGIN
    UPDATE "password_resets" 
    SET "used_at" = NOW()
    WHERE "user_id" = p_user_id AND "used_at" IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to check if password was recently used
CREATE OR REPLACE FUNCTION check_password_history(p_user_id integer, p_limit integer DEFAULT 5)
RETURNS TABLE(password_hash text) AS $$
BEGIN
    RETURN QUERY
    SELECT ph.password_hash 
    FROM "password_history" ph
    WHERE ph.user_id = p_user_id
    ORDER BY ph.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Comment on tables and columns
COMMENT ON TABLE "password_resets" IS 'Password reset tokens for forgot password functionality';
COMMENT ON COLUMN "password_resets"."token" IS 'Unique token sent to user email';
COMMENT ON COLUMN "password_resets"."expires_at" IS 'Token expiration time (typically 1 hour)';
COMMENT ON COLUMN "password_resets"."used_at" IS 'When the token was used to reset password';
COMMENT ON COLUMN "password_resets"."ip_address" IS 'IP address of reset request for security auditing';
COMMENT ON COLUMN "password_resets"."user_agent" IS 'Browser user agent for security auditing';
COMMENT ON TABLE "password_history" IS 'Track password history to prevent reuse';