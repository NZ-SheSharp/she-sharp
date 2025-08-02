-- Rollback Email Verification Feature

-- Drop function
DROP FUNCTION IF EXISTS cleanup_expired_email_verifications();

-- Drop indexes
DROP INDEX IF EXISTS "idx_email_verifications_user_id";
DROP INDEX IF EXISTS "idx_email_verifications_token";
DROP INDEX IF EXISTS "idx_email_verifications_expires_at";
DROP INDEX IF EXISTS "idx_users_email_verified_at";
DROP INDEX IF EXISTS "idx_users_locked_until";

-- Drop email verifications table
DROP TABLE IF EXISTS "email_verifications";

-- Remove columns from users table
ALTER TABLE "users" 
DROP COLUMN IF EXISTS "email_verified_at",
DROP COLUMN IF EXISTS "last_login_at",
DROP COLUMN IF EXISTS "login_attempts",
DROP COLUMN IF EXISTS "locked_until";