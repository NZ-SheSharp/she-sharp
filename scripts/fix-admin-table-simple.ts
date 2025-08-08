import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function fixAdminTable() {
  try {
    console.log('\n🔧 Fixing database schema issues...');
    
    // Create table if not exists
    console.log('\n1. Ensuring admin_permissions table exists...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS admin_permissions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        can_view_all_data BOOLEAN DEFAULT true,
        can_edit_users BOOLEAN DEFAULT true,
        can_manage_relationships BOOLEAN DEFAULT true,
        can_access_analytics BOOLEAN DEFAULT true,
        can_manage_content BOOLEAN DEFAULT true,
        can_verify_mentors BOOLEAN DEFAULT true,
        can_manage_events BOOLEAN DEFAULT true,
        granted_by INTEGER REFERENCES users(id),
        granted_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Table structure ensured');
    
    // Add index
    console.log('\n2. Creating index...');
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS admin_permissions_user_id_idx 
      ON admin_permissions(user_id);
    `);
    console.log('✅ Index created/verified');
    
    // Add columns if missing (safe to run multiple times)
    console.log('\n3. Ensuring all columns exist...');
    await db.execute(sql`
      ALTER TABLE admin_permissions 
      ADD COLUMN IF NOT EXISTS can_access_analytics BOOLEAN DEFAULT true;
    `);
    console.log('✅ Column can_access_analytics ensured');
    
    // Insert admin permissions for user 1 if not exists
    console.log('\n4. Setting up admin permissions for chanmeng.career@gmail.com...');
    await db.execute(sql`
      INSERT INTO admin_permissions (
        user_id,
        can_view_all_data,
        can_edit_users,
        can_manage_relationships,
        can_access_analytics,
        can_manage_content,
        can_verify_mentors,
        can_manage_events
      ) VALUES (
        1,
        true,
        true,
        true,
        true,
        true,
        true,
        true
      )
      ON CONFLICT (user_id) 
      DO UPDATE SET
        can_access_analytics = true,
        can_view_all_data = true,
        can_edit_users = true,
        can_manage_relationships = true,
        can_manage_content = true,
        can_verify_mentors = true,
        can_manage_events = true;
    `);
    console.log('✅ Admin permissions set');
    
    // Verify the fix
    console.log('\n5. Verifying the fix...');
    const result = await db.execute(sql`
      SELECT 
        user_id,
        can_access_analytics,
        can_view_all_data,
        can_manage_events
      FROM admin_permissions 
      WHERE user_id = 1;
    `);
    
    if (result.rows && result.rows.length > 0) {
      console.log('✅ Verification successful:');
      console.log('   User ID 1 has admin permissions');
      console.log('   can_access_analytics:', result.rows[0].can_access_analytics);
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ Database fixed successfully!');
    console.log('   The dashboard should now load without errors.');
    console.log('   Please refresh your browser.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

// Run
fixAdminTable();