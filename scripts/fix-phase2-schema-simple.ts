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

async function fixPhase2SchemaSimple() {
  console.log('🔧 Starting Phase 2 schema synchronization (simple approach)...\n');

  try {
    // 1. Create missing enum types
    console.log('1. Creating missing enum types...');
    
    try {
      await db.execute(sql`CREATE TYPE "relationship_status" AS ENUM('pending', 'active', 'paused', 'completed', 'rejected')`);
      console.log('   ✅ relationship_status enum created');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('   ⚠️ relationship_status enum already exists');
      } else {
        throw error;
      }
    }

    try {
      await db.execute(sql`CREATE TYPE "meeting_status" AS ENUM('scheduled', 'completed', 'cancelled', 'no_show')`);
      console.log('   ✅ meeting_status enum created');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('   ⚠️ meeting_status enum already exists');
      } else {
        throw error;
      }
    }

    try {
      await db.execute(sql`CREATE TYPE "meeting_type" AS ENUM('intro', 'regular', 'milestone', 'final')`);
      console.log('   ✅ meeting_type enum created');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('   ⚠️ meeting_type enum already exists');
      } else {
        throw error;
      }
    }

    // 2. Add mentor_user_id and mentee_user_id columns to mentorship_relationships
    console.log('\n2. Adding missing foreign key columns...');
    
    try {
      await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN "mentor_user_id" integer`);
      console.log('   ✅ Added mentor_user_id column');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('   ⚠️ mentor_user_id column already exists');
      } else {
        throw error;
      }
    }

    try {
      await db.execute(sql`ALTER TABLE "mentorship_relationships" ADD COLUMN "mentee_user_id" integer`);
      console.log('   ✅ Added mentee_user_id column');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('   ⚠️ mentee_user_id column already exists');
      } else {
        throw error;
      }
    }

    // 3. Copy data from old columns to new ones
    console.log('\n3. Copying data to new columns...');
    
    await db.execute(sql`
      UPDATE "mentorship_relationships" 
      SET "mentor_user_id" = "mentor_id", "mentee_user_id" = "mentee_id"
      WHERE "mentor_user_id" IS NULL OR "mentee_user_id" IS NULL
    `);
    console.log('   ✅ Copied data from mentor_id/mentee_id to mentor_user_id/mentee_user_id');

    // 4. Add foreign key constraints
    console.log('\n4. Adding foreign key constraints...');
    
    try {
      await db.execute(sql`
        ALTER TABLE "mentorship_relationships"
        ADD CONSTRAINT "mentorship_relationships_mentor_user_id_users_id_fk" 
        FOREIGN KEY ("mentor_user_id") REFERENCES "users"("id")
      `);
      console.log('   ✅ Added mentor_user_id foreign key');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('   ⚠️ mentor_user_id foreign key already exists');
      } else {
        console.log(`   ❌ Failed to add mentor_user_id foreign key: ${error.message}`);
      }
    }
    
    try {
      await db.execute(sql`
        ALTER TABLE "mentorship_relationships"
        ADD CONSTRAINT "mentorship_relationships_mentee_user_id_users_id_fk" 
        FOREIGN KEY ("mentee_user_id") REFERENCES "users"("id")
      `);
      console.log('   ✅ Added mentee_user_id foreign key');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('   ⚠️ mentee_user_id foreign key already exists');
      } else {
        console.log(`   ❌ Failed to add mentee_user_id foreign key: ${error.message}`);
      }
    }

    // 5. Create missing indexes
    console.log('\n5. Creating missing indexes...');
    
    const indexes = [
      { name: 'relationships_mentor_idx', table: 'mentorship_relationships', column: 'mentor_user_id' },
      { name: 'relationships_mentee_idx', table: 'mentorship_relationships', column: 'mentee_user_id' },
      { name: 'relationships_status_idx', table: 'mentorship_relationships', column: 'status' },
      { name: 'meetings_relationship_idx', table: 'meetings', column: 'relationship_id' },
      { name: 'meetings_scheduled_at_idx', table: 'meetings', column: 'scheduled_at' },
      { name: 'meetings_status_idx', table: 'meetings', column: 'status' }
    ];

    for (const idx of indexes) {
      try {
        await db.execute(sql.raw(`CREATE INDEX IF NOT EXISTS "${idx.name}" ON "${idx.table}"("${idx.column}")`));
        console.log(`   ✅ Created index ${idx.name}`);
      } catch (error: any) {
        console.log(`   ❌ Failed to create index ${idx.name}: ${error.message}`);
      }
    }

    console.log('\n✅ Phase 2 schema synchronization completed!');
    console.log('\n📋 Summary of changes:');
    console.log('- Added mentor_user_id and mentee_user_id columns to mentorship_relationships');
    console.log('- Created enum types for relationship_status, meeting_status, meeting_type');
    console.log('- Added foreign key constraints for proper relationships');
    console.log('- Created performance indexes');
    console.log('\n🔍 Run the verification script again to check results');

  } catch (error) {
    console.error('❌ Error during schema synchronization:', error);
    console.log('\nPlease check database state and retry individual steps if needed.');
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixPhase2SchemaSimple();