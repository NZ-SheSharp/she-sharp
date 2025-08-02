-- Rollback OAuth Providers Feature

-- Drop indexes
DROP INDEX IF EXISTS "idx_oauth_accounts_user_id";
DROP INDEX IF EXISTS "idx_oauth_accounts_provider";
DROP INDEX IF EXISTS "idx_oauth_accounts_provider_account_id";

-- Drop OAuth accounts table
DROP TABLE IF EXISTS "oauth_accounts";