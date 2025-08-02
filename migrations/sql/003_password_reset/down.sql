-- Rollback Password Reset Feature

-- Drop functions
DROP FUNCTION IF EXISTS cleanup_expired_password_resets();
DROP FUNCTION IF EXISTS invalidate_user_password_resets(integer);
DROP FUNCTION IF EXISTS check_password_history(integer, integer);

-- Drop indexes
DROP INDEX IF EXISTS "idx_password_resets_user_id";
DROP INDEX IF EXISTS "idx_password_resets_token";
DROP INDEX IF EXISTS "idx_password_resets_expires_at";
DROP INDEX IF EXISTS "idx_password_resets_used_at";
DROP INDEX IF EXISTS "idx_password_history_user_id";

-- Drop tables
DROP TABLE IF EXISTS "password_history";
DROP TABLE IF EXISTS "password_resets";