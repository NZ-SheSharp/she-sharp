-- Rollback Enhanced Session Management

-- Drop functions
DROP FUNCTION IF EXISTS cleanup_expired_sessions();
DROP FUNCTION IF EXISTS get_active_sessions(integer);

-- Drop indexes
DROP INDEX IF EXISTS "idx_user_sessions_user_id";
DROP INDEX IF EXISTS "idx_user_sessions_token";
DROP INDEX IF EXISTS "idx_user_sessions_expires_at";
DROP INDEX IF EXISTS "idx_user_sessions_last_activity";

-- Drop user sessions table
DROP TABLE IF EXISTS "user_sessions";