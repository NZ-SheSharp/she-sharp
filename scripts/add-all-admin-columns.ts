import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function addAllAdminColumns() {
  try {
    console.log('\n🔧 Adding all missing columns to admin_permissions table...');
    console.log('=' .repeat(60));
    
    // Add each column individually to avoid errors
    const columns = [
      'can_view_all_data BOOLEAN DEFAULT true',
      'can_edit_users BOOLEAN DEFAULT true',
      'can_manage_relationships BOOLEAN DEFAULT true',
      'can_access_analytics BOOLEAN DEFAULT true',
      'can_manage_content BOOLEAN DEFAULT true',
      'can_verify_mentors BOOLEAN DEFAULT true',
      'can_manage_events BOOLEAN DEFAULT true',
      'granted_by INTEGER REFERENCES users(id)',
      'granted_at TIMESTAMP DEFAULT NOW()'
    ];
    
    for (const column of columns) {
      const colName = column.split(' ')[0];
      console.log(`\n📝 Adding column ${colName}...`);
      
      try {
        await db.execute(sql`
          ALTER TABLE admin_permissions 
          ADD COLUMN IF NOT EXISTS ${sql.raw(column)};
        `);
        console.log(`✅ Column ${colName} added/verified`);
      } catch (error: any) {
        if (error.code === '42701') {
          console.log(`⚠️  Column ${colName} already exists`);
        } else {
          console.log(`❌ Error adding ${colName}:`, error.message);
        }
      }
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('\n📊 Checking table structure...');
    
    const result = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'admin_permissions'
      ORDER BY ordinal_position;
    `);
    
    console.log('\nCurrent columns in admin_permissions:');
    result.rows.forEach((row: any) => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
    // Now try to insert/update admin permissions
    console.log('\n📝 Setting admin permissions for user ID 1...');
    
    try {
      await db.execute(sql`
        INSERT INTO admin_permissions (user_id)
        VALUES (1)
        ON CONFLICT (user_id) DO NOTHING;
      `);
      
      // Update all permissions to true
      await db.execute(sql`
        UPDATE admin_permissions 
        SET 
          can_view_all_data = true,
          can_edit_users = true,
          can_manage_relationships = true,
          can_access_analytics = true,
          can_manage_content = true,
          can_verify_mentors = true,
          can_manage_events = true
        WHERE user_id = 1;
      `);
      
      console.log('✅ Admin permissions set successfully');
    } catch (error) {
      console.log('❌ Error setting permissions:', error);
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ Database schema fixed!');
    console.log('   Please refresh your dashboard.');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    process.exit(0);
  }
}

// Run
addAllAdminColumns();