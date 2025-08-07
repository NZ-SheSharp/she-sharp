import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function verifyTables() {
  console.log('Verifying mentorship tables...\n');
  
  try {
    // Test user_roles table specifically
    console.log('Testing user_roles table...');
    try {
      const result = await db.execute(sql`SELECT * FROM user_roles LIMIT 1`);
      console.log('✅ user_roles table exists and is accessible');
      console.log('   Columns:', Object.keys((result[0] as any) || {}));
    } catch (error: any) {
      console.log('❌ user_roles table error:', error.message);
    }
    
    // Test user_memberships table
    console.log('\nTesting user_memberships table...');
    try {
      const result = await db.execute(sql`SELECT * FROM user_memberships LIMIT 1`);
      console.log('✅ user_memberships table exists and is accessible');
      console.log('   Columns:', Object.keys((result[0] as any) || {}));
    } catch (error: any) {
      console.log('❌ user_memberships table error:', error.message);
    }
    
    // Test mentor_profiles table
    console.log('\nTesting mentor_profiles table...');
    try {
      const result = await db.execute(sql`SELECT * FROM mentor_profiles LIMIT 1`);
      console.log('✅ mentor_profiles table exists and is accessible');
      console.log('   Columns:', Object.keys((result[0] as any) || {}));
    } catch (error: any) {
      console.log('❌ mentor_profiles table error:', error.message);
    }
    
    // Test mentee_profiles table
    console.log('\nTesting mentee_profiles table...');
    try {
      const result = await db.execute(sql`SELECT * FROM mentee_profiles LIMIT 1`);
      console.log('✅ mentee_profiles table exists and is accessible');
      console.log('   Columns:', Object.keys((result[0] as any) || {}));
    } catch (error: any) {
      console.log('❌ mentee_profiles table error:', error.message);
    }
    
    // Test all tables with a count
    console.log('\n--- Table row counts ---');
    const tables = [
      'users',
      'user_roles',
      'user_memberships',
      'mentor_profiles',
      'mentee_profiles',
      'mentorship_relationships',
      'meetings',
      'admin_permissions',
      'activity_logs'
    ];
    
    for (const tableName of tables) {
      try {
        const result = await db.execute(sql.raw(`SELECT COUNT(*) as count FROM "${tableName}"`));
        console.log(`✅ ${tableName}: ${(result[0] as any).count} rows`);
      } catch (error: any) {
        console.log(`❌ ${tableName}: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    process.exit(0);
  }
}

verifyTables();