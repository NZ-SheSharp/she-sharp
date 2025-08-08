import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';

async function listUsersSimple() {
  try {
    console.log('\n📊 Current Users in Database');
    console.log('=' .repeat(60));
    
    // Get all users
    const allUsers = await db
      .select()
      .from(users);
    
    if (allUsers.length === 0) {
      console.log('❌ No users found in the database.');
      return;
    }
    
    console.log(`\n✅ Total Users: ${allUsers.length}\n`);
    
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name || 'Not set'}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log('');
    });
    
    console.log('=' .repeat(60));
    
    // Check for test accounts
    const testAccounts = allUsers.filter(u => 
      u.email.includes('example.com') || 
      u.email.includes('test')
    );
    
    if (testAccounts.length > 0) {
      console.log('\n⚠️  Found potential test accounts:');
      testAccounts.forEach(acc => {
        console.log(`   - ${acc.email}`);
      });
    } else {
      console.log('\n✅ No test accounts detected!');
      console.log('   Database contains only legitimate user accounts.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

// Run
listUsersSimple();