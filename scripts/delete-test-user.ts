import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function deleteTestUser() {
  const testEmail = 'test@test.com';
  
  try {
    console.log(`\n🔍 Looking for user: ${testEmail}`);
    
    // First check if user exists
    const existingUser = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt
      })
      .from(users)
      .where(eq(users.email, testEmail));

    if (existingUser.length === 0) {
      console.log(`✅ User ${testEmail} does not exist in the database.`);
      return;
    }

    console.log(`\n📋 Found user to delete:`);
    console.log(`  ID: ${existingUser[0].id}`);
    console.log(`  Email: ${existingUser[0].email}`);
    console.log(`  Name: ${existingUser[0].name || 'Not set'}`);
    console.log(`  Created: ${existingUser[0].createdAt}`);
    
    console.log('\n🗑️  Deleting user...');
    
    // Delete the user (CASCADE will handle all related data)
    const result = await db
      .delete(users)
      .where(eq(users.email, testEmail));
    
    console.log('✅ User deleted successfully!');
    
    // Verify deletion
    const checkUser = await db
      .select({
        id: users.id
      })
      .from(users)
      .where(eq(users.email, testEmail));
    
    if (checkUser.length === 0) {
      console.log('✅ Confirmed: User has been removed from the database.');
      console.log('\n📝 Note: All related data (roles, team memberships, activity logs)');
      console.log('   were automatically deleted due to CASCADE constraints.');
    } else {
      console.log('❌ Warning: User still exists in database!');
    }
    
  } catch (error) {
    console.error('❌ Error deleting user:', error);
  } finally {
    process.exit(0);
  }
}

// Run the deletion
console.log('🚨 Deleting Test User');
console.log('This will remove the improperly created test@test.com account');
console.log('Reason: User was directly given admin rights without proper registration');
deleteTestUser();