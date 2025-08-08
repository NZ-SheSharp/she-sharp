import { db } from '@/lib/db/drizzle';
import { users, userRoles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

async function setUserAsAdmin(email: string) {
  try {
    // Find the user by email
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || user.length === 0) {
      console.error(`User with email ${email} not found`);
      return;
    }

    const userId = user[0].id;
    console.log(`Found user: ${user[0].name} (ID: ${userId})`);

    // Check if admin role already exists
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, userId),
          eq(userRoles.roleType, 'admin')
        )
      )
      .limit(1);

    if (existingRole && existingRole.length > 0) {
      if (existingRole[0].isActive) {
        console.log('User already has active admin role');
      } else {
        // Reactivate the role
        await db
          .update(userRoles)
          .set({ 
            isActive: true,
            activatedAt: new Date()
          })
          .where(
            and(
              eq(userRoles.userId, userId),
              eq(userRoles.roleType, 'admin')
            )
          );
        console.log('Admin role reactivated');
      }
    } else {
      // Insert new admin role
      await db.insert(userRoles).values({
        userId,
        roleType: 'admin',
        isActive: true,
        activatedAt: new Date(),
        verifiedAt: new Date(), // Auto-verify admin
        activationStep: 100 // Fully activated
      });
      console.log('Admin role added successfully');
    }

    // Verify the role was set
    const allRoles = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userId));

    console.log('\nUser roles after update:');
    allRoles.forEach(role => {
      console.log(`- ${role.roleType}: ${role.isActive ? 'Active' : 'Inactive'}`);
    });

    console.log('\n✅ Successfully set user as admin');
    console.log('The user can now access the admin dashboard at /dashboard');

  } catch (error) {
    console.error('Error setting admin role:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
const targetEmail = 'chanmeng.career@gmail.com';
console.log(`Setting ${targetEmail} as admin...`);
setUserAsAdmin(targetEmail);