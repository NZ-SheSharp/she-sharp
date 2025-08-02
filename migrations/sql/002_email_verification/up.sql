-- Email Verification Feature
-- Created: 2025-08-02
-- This migration adds email verification functionality to the authentication system

-- Add email verification fields to users table
ALTER TABLE "users" 
ADD COLUMN IF NOT EXISTS "email_verified_at" timestamp,
ADD COLUMN IF NOT EXISTS "last_login_at" timestamp,
ADD COLUMN IF NOT EXISTS "login_attempts" integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS "locked_until" timestamp;

-- Create email verifications table
CREATE TABLE IF NOT EXISTS "email_verifications" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "token" varchar(255) NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "verified_at" timestamp,
    CONSTRAINT "email_verifications_token_unique" UNIQUE("token")
);

-- Add foreign key constraint
ALTER TABLE "email_verifications" 
ADD CONSTRAINT "email_verifications_user_id_users_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_email_verifications_user_id" ON "email_verifications"("user_id");
CREATE INDEX IF NOT EXISTS "idx_email_verifications_token" ON "email_verifications"("token");
CREATE INDEX IF NOT EXISTS "idx_email_verifications_expires_at" ON "email_verifications"("expires_at");
CREATE INDEX IF NOT EXISTS "idx_users_email_verified_at" ON "users"("email_verified_at");
CREATE INDEX IF NOT EXISTS "idx_users_locked_until" ON "users"("locked_until");

-- Function to clean up expired verification tokens
CREATE OR REPLACE FUNCTION cleanup_expired_email_verifications()
RETURNS void AS $$
BEGIN
    DELETE FROM "email_verifications" 
    WHERE "expires_at" < NOW() AND "verified_at" IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Comment on new columns
COMMENT ON COLUMN "users"."email_verified_at" IS 'Timestamp when email was verified';
COMMENT ON COLUMN "users"."last_login_at" IS 'Last successful login timestamp';
COMMENT ON COLUMN "users"."login_attempts" IS 'Failed login attempts counter';
COMMENT ON COLUMN "users"."locked_until" IS 'Account locked until this timestamp due to too many failed attempts';
COMMENT ON TABLE "email_verifications" IS 'Email verification tokens for user registration';