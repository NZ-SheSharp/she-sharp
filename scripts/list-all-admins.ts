import { db } from '@/lib/db/drizzle';
import { users, userRoles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

async function listAllAdmins() {
  try {
    console.log('\n📊 Admin Users Report');
    console.log('=' .repeat(60));
    
    // Get all admin roles
    const adminRoles = await db
      .select({
        userId: userRoles.userId,
        roleType: userRoles.roleType,
        isActive: userRoles.isActive,
        activatedAt: userRoles.activatedAt,
        verifiedAt: userRoles.verifiedAt,
        userEmail: users.email,
        userName: users.name,
        userCreatedAt: users.createdAt
      })
      .from(userRoles)
      .leftJoin(users, eq(users.id, userRoles.userId))
      .where(
        and(
          eq(userRoles.roleType, 'admin'),
          eq(userRoles.isActive, true)
        )
      );

    if (adminRoles.length === 0) {
      console.log('❌ No active admin users found in the database.');
      return;
    }

    console.log(`\n✅ Found ${adminRoles.length} active admin user(s):\n`);
    
    adminRoles.forEach((admin, index) => {
      console.log(`${index + 1}. Admin User`);
      console.log(`   📧 Email: ${admin.userEmail}`);
      console.log(`   👤 Name: ${admin.userName || 'Not set'}`);
      console.log(`   🆔 User ID: ${admin.userId}`);
      console.log(`   ✅ Status: Active`);
      console.log(`   📅 Admin Since: ${admin.activatedAt}`);
      console.log(`   ✔️  Verified: ${admin.verifiedAt ? 'Yes' : 'No'}`);
      console.log(`   🕐 Account Created: ${admin.userCreatedAt}`);
      console.log('');
    });
    
    console.log('=' .repeat(60));
    console.log('📝 Summary:');
    console.log(`   Total Active Admins: ${adminRoles.length}`);
    
    // Check for test@test.com specifically
    const hasTestUser = adminRoles.some(admin => admin.userEmail === 'test@test.com');
    if (hasTestUser) {
      console.log('   ⚠️  WARNING: test@test.com still exists as admin!');
    } else {
      console.log('   ✅ test@test.com has been successfully removed');
    }
    
    // Check for proper admin (chanmeng.career@gmail.com)
    const hasProperAdmin = adminRoles.some(admin => admin.userEmail === 'chanmeng.career@gmail.com');
    if (hasProperAdmin) {
      console.log('   ✅ chanmeng.career@gmail.com is configured as admin');
    }
    
  } catch (error) {
    console.error('❌ Error listing admins:', error);
  } finally {
    process.exit(0);
  }
}

// Run the report
console.log('🔍 Generating Admin Users Report...');
listAllAdmins();