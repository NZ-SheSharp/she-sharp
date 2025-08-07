#!/usr/bin/env ts-node

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

async function checkCurrentTables() {
  console.log('🔍 Checking current database tables...\n');

  try {
    // Get all tables
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('📋 Current tables:');
    tables.forEach((table: any) => {
      console.log(`   - ${table.table_name}`);
    });

    // Check if Phase 2 tables exist in any form
    const phase2Tables = ['mentor_profiles', 'mentee_profiles', 'mentorship_relationships', 'meetings'];
    console.log('\n🔍 Phase 2 tables status:');
    
    for (const tableName of phase2Tables) {
      const exists = tables.some((table: any) => table.table_name === tableName);
      if (exists) {
        console.log(`   ✅ ${tableName} - exists`);
        
        // Show columns
        const columns = await db.execute(sql`
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns 
          WHERE table_schema = 'public' AND table_name = ${tableName}
          ORDER BY ordinal_position
        `);
        
        console.log(`      Columns: ${columns.map((col: any) => col.column_name).join(', ')}`);
      } else {
        console.log(`   ❌ ${tableName} - missing`);
      }
    }

    // Check for enum types
    console.log('\n🔍 Enum types:');
    const enums = await db.execute(sql`
      SELECT typname 
      FROM pg_type 
      WHERE typcategory = 'E'
      ORDER BY typname
    `);
    
    enums.forEach((enumType: any) => {
      console.log(`   - ${enumType.typname}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkCurrentTables();