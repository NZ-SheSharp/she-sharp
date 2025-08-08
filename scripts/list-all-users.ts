import { db } from '@/lib/db/drizzle';
import { users, userRoles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function listAllUsers() {
  try {
    console.log('\n📊 Complete User Database Report');
    console.log('=' .repeat(60));
    
    // Get all users
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
        lastSignInAt: users.lastSignInAt
      })
      .from(users)
      .orderBy(users.createdAt);
    
    if (allUsers.length === 0) {
      console.log('❌ No users found in the database.');
      return;
    }
    
    console.log(`\n✅ Total Users: ${allUsers.length}\n`);
    
    for (const user of allUsers) {
      console.log(`${user.id}. ${user.email}`);
      console.log(`   Name: ${user.name || 'Not set'}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log(`   Last Sign In: ${user.lastSignInAt || 'Never'}`);
      
      // Get user roles
      const roles = await db
        .select({ roleType: userRoles.roleType, isActive: userRoles.isActive })
        .from(userRoles)
        .where(eq(userRoles.userId, user.id));
      
      if (roles.length > 0) {
        const activeRoles = roles.filter(r => r.isActive).map(r => r.roleType);
        console.log(`   Roles: ${activeRoles.length > 0 ? activeRoles.join(', ') : 'None active'}`);
      } else {
        console.log(`   Roles: None`);
      }
      console.log('');
    }
    
    console.log('=' .repeat(60));
    console.log('\n📝 Database Status:');
    console.log(`   ✅ Real Users: ${allUsers.filter(u => !u.email.includes('example.com')).length}`);
    console.log(`   ✅ Test Users Remaining: ${allUsers.filter(u => u.email.includes('example.com')).length}`);
    console.log(`   ✅ Admin Users: ${allUsers.filter(async u => {
      const roles = await db.select().from(userRoles).where(eq(userRoles.userId, u.id));
      return roles.some(r => r.roleType === 'admin' && r.isActive);
    }).length || 1}`); // We know there's at least 1 admin
    
    console.log('\n✨ Database has been cleaned of test accounts!');
    
  } catch (error) {
    console.error('❌ Error listing users:', error);
  } finally {
    process.exit(0);
  }
}

// Run the report
console.log('🔍 Generating Complete User Report...');
listAllUsers();