-- OAuth Providers Feature
-- Created: 2025-08-02
-- This migration adds OAuth social login functionality

-- Create OAuth accounts table
CREATE TABLE IF NOT EXISTS "oauth_accounts" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "provider" varchar(50) NOT NULL,
    "provider_account_id" varchar(255) NOT NULL,
    "access_token" text,
    "refresh_token" text,
    "expires_at" timestamp,
    "token_type" varchar(50),
    "scope" text,
    "id_token" text,
    "session_state" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "oauth_accounts_provider_account_unique" UNIQUE("provider", "provider_account_id")
);

-- Add foreign key constraint
ALTER TABLE "oauth_accounts" 
ADD CONSTRAINT "oauth_accounts_user_id_users_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_oauth_accounts_user_id" ON "oauth_accounts"("user_id");
CREATE INDEX IF NOT EXISTS "idx_oauth_accounts_provider" ON "oauth_accounts"("provider");
CREATE INDEX IF NOT EXISTS "idx_oauth_accounts_provider_account_id" ON "oauth_accounts"("provider_account_id");

-- Comment on table and columns
COMMENT ON TABLE "oauth_accounts" IS 'OAuth provider accounts linked to users';
COMMENT ON COLUMN "oauth_accounts"."provider" IS 'OAuth provider name (google, github, linkedin, etc.)';
COMMENT ON COLUMN "oauth_accounts"."provider_account_id" IS 'User ID from the OAuth provider';
COMMENT ON COLUMN "oauth_accounts"."access_token" IS 'OAuth access token (encrypted in production)';
COMMENT ON COLUMN "oauth_accounts"."refresh_token" IS 'OAuth refresh token (encrypted in production)';
COMMENT ON COLUMN "oauth_accounts"."expires_at" IS 'Access token expiration time';