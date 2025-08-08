import { db } from '@/lib/db/drizzle';
import { users, userRoles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

async function verifyAdminAccess(email: string) {
  try {
    // Find the user and their roles
    const userWithRoles = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        roleType: userRoles.roleType,
        isActive: userRoles.isActive,
        activatedAt: userRoles.activatedAt,
        verifiedAt: userRoles.verifiedAt
      })
      .from(users)
      .leftJoin(userRoles, eq(users.id, userRoles.userId))
      .where(eq(users.email, email));

    if (!userWithRoles || userWithRoles.length === 0) {
      console.error(`User with email ${email} not found`);
      return;
    }

    console.log(`\n📧 User: ${userWithRoles[0].name} (${userWithRoles[0].email})`);
    console.log(`🆔 User ID: ${userWithRoles[0].id}`);
    console.log('\n📋 Active Roles:');
    
    let hasAdminRole = false;
    userWithRoles.forEach(record => {
      if (record.roleType && record.isActive) {
        console.log(`  ✅ ${record.roleType.toUpperCase()}`);
        if (record.roleType === 'admin') {
          hasAdminRole = true;
          console.log(`     - Activated: ${record.activatedAt}`);
          console.log(`     - Verified: ${record.verifiedAt || 'Not verified'}`);
        }
      }
    });

    console.log('\n🔐 Access Levels:');
    console.log(`  - Admin Dashboard: ${hasAdminRole ? '✅ Accessible' : '❌ Not accessible'}`);
    console.log(`  - Admin Analytics: ${hasAdminRole ? '✅ Accessible' : '❌ Not accessible'}`);
    console.log(`  - User Management: ${hasAdminRole ? '✅ Accessible' : '❌ Not accessible'}`);
    
    if (hasAdminRole) {
      console.log('\n✨ SUCCESS: User has full admin privileges!');
      console.log('   The user can now:');
      console.log('   1. Access /dashboard with admin view');
      console.log('   2. View analytics and platform statistics');
      console.log('   3. Manage users, events, and resources');
      console.log('   4. Access all admin-only API endpoints');
    } else {
      console.log('\n⚠️  WARNING: User does not have admin role');
    }

  } catch (error) {
    console.error('Error verifying admin access:', error);
  } finally {
    process.exit(0);
  }
}

// Run the verification
const targetEmail = 'chanmeng.career@gmail.com';
console.log('🔍 Verifying admin access for user...');
verifyAdminAccess(targetEmail);