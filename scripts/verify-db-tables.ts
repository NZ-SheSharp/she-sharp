import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function verifyTables() {
  console.log('Verifying database tables...\n');
  
  try {
    // Check for all Phase 1 tables
    const tables = [
      'users',
      'teams', 
      'team_members',
      'invitations',
      'activity_logs',
      'user_roles',
      'user_memberships',
      'mentor_profiles',
      'mentee_profiles',
      'mentorship_relationships',
      'meetings',
      'events',
      'resources',
      'admin_permissions'
    ];
    
    for (const tableName of tables) {
      try {
        const result = await db.execute(sql`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_name = ${tableName}
        `);
        
        const exists = result.rows[0].count > 0;
        console.log(`✅ Table '${tableName}': ${exists ? 'EXISTS' : 'NOT FOUND'}`);
        
        if (exists) {
          // Get row count
          const countResult = await db.execute(sql`SELECT COUNT(*) as count FROM ${sql.identifier(tableName)}`);
          console.log(`   Rows: ${countResult.rows[0].count}`);
        }
      } catch (error) {
        console.log(`❌ Table '${tableName}': ERROR - ${error.message}`);
      }
    }
    
    // Test user_roles specifically
    console.log('\n--- Testing user_roles table specifically ---');
    try {
      const rolesResult = await db.execute(sql`
        SELECT * FROM user_roles LIMIT 1
      `);
      console.log('✅ user_roles table is accessible');
      console.log('   Sample data:', rolesResult.rows);
    } catch (error) {
      console.log('❌ user_roles table error:', error.message);
    }
    
  } catch (error) {
    console.error('Error verifying tables:', error);
  } finally {
    process.exit(0);
  }
}

verifyTables();