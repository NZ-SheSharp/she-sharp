-- Custom SQL migration file, put your code below! --

-- Add entity_type column to activity_logs table (for generic entity tracking)
ALTER TABLE "activity_logs" ADD COLUMN "entity_type" varchar(50);--> statement-breakpoint

-- Add entity_id column to activity_logs table  
ALTER TABLE "activity_logs" ADD COLUMN "entity_id" integer;--> statement-breakpoint

-- Add metadata column to activity_logs table for additional context
ALTER TABLE "activity_logs" ADD COLUMN "metadata" jsonb;--> statement-breakpoint

-- Create new index for entity type and id lookups
CREATE INDEX IF NOT EXISTS "activity_logs_entity_idx" ON "activity_logs" ("entity_type","entity_id");--> statement-breakpoint