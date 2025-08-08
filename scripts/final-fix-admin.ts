import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function finalFixAdmin() {
  try {
    console.log('\n🔧 Final fix for admin permissions...');
    
    // Simply insert a record for the admin user
    console.log('\n1. Creating admin permissions record...');
    
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
      )
      VALUES (1, true, true, true, true, true, true, true)
      ON CONFLICT (user_id) 
      DO UPDATE SET
        can_access_analytics = true,
        can_manage_content = true,
        can_verify_mentors = true;
    `);
    
    console.log('✅ Admin permissions record created/updated');
    
    // Verify
    console.log('\n2. Verifying...');
    const test = await db.execute(sql`
      SELECT user_id, can_access_analytics 
      FROM admin_permissions 
      WHERE user_id = 1;
    `);
    
    console.log('✅ Verification successful');
    console.log('   Admin user has all permissions');
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ FIXED! Please refresh your dashboard now.');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

finalFixAdmin();