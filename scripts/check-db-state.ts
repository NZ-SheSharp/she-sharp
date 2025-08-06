#!/usr/bin/env tsx

import { db } from '../lib/db/drizzle';
import { sql } from 'drizzle-orm';
import { resolve } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });
config({ path: resolve(process.cwd(), '.env.local'), override: true });

async function checkDatabaseState() {
  console.log('🔍 Checking database state...\n');

  try {
    // Helper to extract rows from execute result
    const getRows = (result: any): any[] => {
      if (Array.isArray(result)) return result;
      return result.rows || [];
    };

    // Check if __drizzle_migrations table exists
    const migrationTableExists = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '__drizzle_migrations'
      );
    `);

    const rows = getRows(migrationTableExists);
    const tableExists = rows[0]?.exists || false;
    console.log('Migration table exists:', tableExists);

    if (tableExists) {
      // Check migration entries
      const migrations = await db.execute(sql`
        SELECT * FROM __drizzle_migrations 
        ORDER BY created_at ASC;
      `);
      
      const migrationRows = getRows(migrations);
      console.log('\n📋 Applied migrations:');
      if (migrationRows.length > 0) {
        migrationRows.forEach((m: any) => {
          console.log(`✅ ${m.name} - Applied at: ${m.created_at}`);
        });
      } else {
        console.log('No migrations found in the table.');
      }
    }

    // List all tables
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const tableRows = getRows(tables);
    console.log('\n📊 Database tables:');
    if (tableRows.length > 0) {
      tableRows.forEach((t: any) => {
        console.log(`  - ${t.table_name}`);
      });
    } else {
      console.log('  No tables found or unable to query tables.');
    }

    console.log('\n✅ Database check complete!');
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    process.exit(0);
  }
}

checkDatabaseState();