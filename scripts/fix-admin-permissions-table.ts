import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function fixAdminPermissionsTable() {
  try {
    console.log('\n🔧 Fixing admin_permissions table...');
    console.log('=' .repeat(60));
    
    // First check if the table exists
    const tableExists = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'admin_permissions'
      );
    `);
    
    console.log('Table exists:', tableExists.rows[0].exists);
    
    if (!tableExists.rows[0].exists) {
      console.log('\n📝 Creating admin_permissions table...');
      
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
      
      console.log('✅ Table created successfully');
      
      // Create index
      await db.execute(sql`
        CREATE INDEX IF NOT EXISTS admin_permissions_user_id_idx 
        ON admin_permissions(user_id);
      `);
      
      console.log('✅ Index created');
    } else {
      // Table exists, check if column exists
      const columnExists = await db.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'admin_permissions' 
          AND column_name = 'can_access_analytics'
        );
      `);
      
      if (!columnExists.rows[0].exists) {
        console.log('\n📝 Adding missing column can_access_analytics...');
        
        await db.execute(sql`
          ALTER TABLE admin_permissions 
          ADD COLUMN IF NOT EXISTS can_access_analytics BOOLEAN DEFAULT true;
        `);
        
        console.log('✅ Column added successfully');
      } else {
        console.log('✅ Column can_access_analytics already exists');
      }
      
      // Also check for other potentially missing columns
      const columnsToCheck = [
        'can_view_all_data',
        'can_edit_users',
        'can_manage_relationships',
        'can_manage_content',
        'can_verify_mentors',
        'can_manage_events'
      ];
      
      for (const column of columnsToCheck) {
        const colExists = await db.execute(sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = 'admin_permissions' 
            AND column_name = ${column}
          );
        `);
        
        if (!colExists.rows[0].exists) {
          console.log(`\n📝 Adding missing column ${column}...`);
          await db.execute(sql`
            ALTER TABLE admin_permissions 
            ADD COLUMN IF NOT EXISTS ${sql.raw(column)} BOOLEAN DEFAULT true;
          `);
          console.log(`✅ Column ${column} added`);
        }
      }
    }
    
    // Now check if admin user has permissions record
    const adminUserId = 1; // chanmeng.career@gmail.com
    
    const adminPerms = await db.execute(sql`
      SELECT * FROM admin_permissions WHERE user_id = ${adminUserId};
    `);
    
    if (adminPerms.rows.length === 0) {
      console.log('\n📝 Creating admin permissions for user ID 1...');
      
      await db.execute(sql`
        INSERT INTO admin_permissions (
          user_id,
          can_view_all_data,
          can_edit_users,
          can_manage_relationships,
          can_access_analytics,
          can_manage_content,
          can_verify_mentors,
          can_manage_events,
          granted_at
        ) VALUES (
          ${adminUserId},
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          NOW()
        );
      `);
      
      console.log('✅ Admin permissions created');
    } else {
      console.log('✅ Admin already has permissions record');
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ Admin permissions table fixed successfully!');
    console.log('   The dashboard should now load without errors.');
    
  } catch (error) {
    console.error('❌ Error fixing table:', error);
  } finally {
    process.exit(0);
  }
}

// Run the fix
console.log('🚨 Fixing Admin Permissions Table');
fixAdminPermissionsTable();