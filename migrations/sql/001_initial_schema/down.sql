-- Rollback Initial Schema
-- WARNING: This will delete all data in these tables!

-- Drop indexes
DROP INDEX IF EXISTS "idx_users_email";
DROP INDEX IF EXISTS "idx_users_deleted_at";
DROP INDEX IF EXISTS "idx_team_members_user_id";
DROP INDEX IF EXISTS "idx_team_members_team_id";
DROP INDEX IF EXISTS "idx_activity_logs_team_id";
DROP INDEX IF EXISTS "idx_activity_logs_user_id";
DROP INDEX IF EXISTS "idx_invitations_email";
DROP INDEX IF EXISTS "idx_invitations_status";

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS "invitations";
DROP TABLE IF EXISTS "activity_logs";
DROP TABLE IF EXISTS "team_members";
DROP TABLE IF EXISTS "teams";
DROP TABLE IF EXISTS "users";