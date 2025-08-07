#!/usr/bin/env ts-node

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

async function fixPhase2Schema() {
  console.log('🔧 Starting Phase 2 schema synchronization...\n');

  try {
    // 1. Create missing enum types
    console.log('1. Creating missing enum types...');
    
    await db.execute(sql`
      CREATE TYPE IF NOT EXISTS "relationship_status" AS ENUM('pending', 'active', 'paused', 'completed', 'rejected');
    `);
    console.log('   ✅ relationship_status enum created');

    await db.execute(sql`
      CREATE TYPE IF NOT EXISTS "meeting_status" AS ENUM('scheduled', 'completed', 'cancelled', 'no_show');
    `);
    console.log('   ✅ meeting_status enum created');

    await db.execute(sql`
      CREATE TYPE IF NOT EXISTS "meeting_type" AS ENUM('intro', 'regular', 'milestone', 'final');
    `);
    console.log('   ✅ meeting_type enum created');

    // 2. Fix mentorship_relationships table
    console.log('\n2. Fixing mentorship_relationships table...');
    
    // Add new columns first (one by one to avoid syntax issues)
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "mentor_user_id" integer;`);
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "mentee_user_id" integer;`);
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "paused_at" timestamp;`);
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "meeting_frequency" varchar(50);`);
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "relationship_goals" text;`);
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "mentor_notes" text;`);
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "mentee_notes" text;`);
    await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;`);
    console.log('   ✅ Added missing columns to mentorship_relationships');

    // Copy data from old columns to new ones
    await db.execute(sql`
      UPDATE "mentorship_relationships" 
      SET "mentor_user_id" = "mentor_id", "mentee_user_id" = "mentee_id"
      WHERE "mentor_user_id" IS NULL AND "mentee_user_id" IS NULL;
    `);
    console.log('   ✅ Copied data from old columns');

    // Add foreign key constraints to new columns
    await db.execute(sql`
      ALTER TABLE "mentorship_relationships"
      ADD CONSTRAINT "mentorship_relationships_mentor_user_id_users_id_fk" 
      FOREIGN KEY ("mentor_user_id") REFERENCES "users"("id");
    `);
    
    await db.execute(sql`
      ALTER TABLE "mentorship_relationships"
      ADD CONSTRAINT "mentorship_relationships_mentee_user_id_users_id_fk" 
      FOREIGN KEY ("mentee_user_id") REFERENCES "users"("id");
    `);
    console.log('   ✅ Added foreign key constraints');

    // Update status column to use enum (if data exists, convert it)
    await db.execute(sql`
      ALTER TABLE "mentorship_relationships" 
      ALTER COLUMN "status" TYPE "relationship_status" USING "status"::"relationship_status";
    `);
    console.log('   ✅ Updated status column to use enum');

    // 3. Fix meetings table
    console.log('\n3. Fixing meetings table...');
    
    // Add missing columns (one by one)
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "topics_discussed" jsonb;`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "goals_set" jsonb;`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "action_items" jsonb;`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "mentee_feedback" text;`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "rating" integer;`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "actual_start_time" timestamp;`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "actual_end_time" timestamp;`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "recording_url" varchar(500);`);
    await db.execute(sql`ALTER TABLE "meetings" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;`);
    console.log('   ✅ Added missing columns to meetings');

    // Update enum columns
    await db.execute(sql`
      ALTER TABLE "meetings" 
      ALTER COLUMN "status" TYPE "meeting_status" USING 
        CASE 
          WHEN "status" = 'scheduled' THEN 'scheduled'::"meeting_status"
          WHEN "status" = 'completed' THEN 'completed'::"meeting_status"
          WHEN "status" = 'cancelled' THEN 'cancelled'::"meeting_status"
          ELSE 'scheduled'::"meeting_status"
        END;
    `);
    
    await db.execute(sql`
      ALTER TABLE "meetings" 
      ALTER COLUMN "meeting_type" TYPE "meeting_type" USING 
        CASE 
          WHEN "meeting_type" = 'intro' THEN 'intro'::"meeting_type"
          WHEN "meeting_type" = 'regular' THEN 'regular'::"meeting_type"
          WHEN "meeting_type" = 'milestone' THEN 'milestone'::"meeting_type"
          WHEN "meeting_type" = 'final' THEN 'final'::"meeting_type"
          ELSE 'regular'::"meeting_type"
        END;
    `);
    console.log('   ✅ Updated enum columns in meetings');

    // 4. Fix mentee_profiles table
    console.log('\n4. Fixing mentee_profiles table...');
    
    await db.execute(sql`ALTER TABLE "mentee_profiles" ADD COLUMN IF NOT EXISTS "career_stage" varchar(100);`);
    await db.execute(sql`ALTER TABLE "mentee_profiles" ADD COLUMN IF NOT EXISTS "preferred_expertise_areas" jsonb;`);
    await db.execute(sql`ALTER TABLE "mentee_profiles" ADD COLUMN IF NOT EXISTS "current_challenge" text;`);
    console.log('   ✅ Added missing columns to mentee_profiles');

    // 5. Create missing indexes
    console.log('\n5. Creating missing indexes...');
    
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "relationships_mentor_idx" ON "mentorship_relationships"("mentor_user_id");
    `);
    
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "relationships_mentee_idx" ON "mentorship_relationships"("mentee_user_id");
    `);
    
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "relationships_status_idx" ON "mentorship_relationships"("status");
    `);
    
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "meetings_relationship_idx" ON "meetings"("relationship_id");
    `);
    
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "meetings_scheduled_at_idx" ON "meetings"("scheduled_at");
    `);
    
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "meetings_status_idx" ON "meetings"("status");
    `);
    console.log('   ✅ Created missing indexes');

    console.log('\n✅ Phase 2 schema synchronization completed!');
    console.log('\nRecommendations:');
    console.log('1. Run the verification script again to confirm all fixes');
    console.log('2. Consider dropping old columns from mentorship_relationships (mentor_id, mentee_id) after verifying data integrity');
    console.log('3. Review mentee_profiles extra columns (areas_of_interest, current_level, etc.) and decide if they should be kept or removed');

  } catch (error) {
    console.error('❌ Error during schema synchronization:', error);
    console.log('\nRollback may be needed. Please check database state.');
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixPhase2Schema();