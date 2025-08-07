import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

async function applyMentorshipTables() {
  console.log('Applying mentorship tables...\n');
  
  try {
    // Read SQL file
    const sqlFile = path.join(process.cwd(), 'scripts', 'create-mentorship-tables.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf-8');
    
    // Execute the SQL
    await db.execute(sql.raw(sqlContent));
    
    console.log('✅ Mentorship tables created successfully!');
    
    // Verify tables exist
    console.log('\nVerifying tables...');
    const tables = [
      'user_roles',
      'user_memberships', 
      'mentor_profiles',
      'mentee_profiles',
      'mentorship_relationships',
      'meetings',
      'admin_permissions'
    ];
    
    for (const tableName of tables) {
      try {
        const result = await db.execute(sql`SELECT COUNT(*) as count FROM ${sql.identifier(tableName)}`);
        console.log(`✅ Table '${tableName}' exists with ${(result[0] as any).count} rows`);
      } catch (error: any) {
        console.log(`❌ Table '${tableName}' check failed:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('Error applying mentorship tables:', error);
  } finally {
    process.exit(0);
  }
}

applyMentorshipTables();