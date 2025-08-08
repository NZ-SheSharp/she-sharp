import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function checkSpecificUsers() {
  const testEmails = [
    'mentee1@example.com',
    'mentor1@example.com', 
    'maria.garcia@example.com',
    'sarah.chen@example.com'
  ];
  
  console.log('\n🔍 Checking for test accounts in database...');
  console.log('=' .repeat(60));
  
  const foundAccounts = [];
  
  for (const email of testEmails) {
    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      
      if (user && user.length > 0) {
        foundAccounts.push(user[0]);
        console.log(`\n❌ FOUND: ${email}`);
        console.log(`   ID: ${user[0].id}`);
        console.log(`   Name: ${user[0].name || 'Not set'}`);
        console.log(`   Created: ${user[0].createdAt}`);
      } else {
        console.log(`\n✅ NOT FOUND: ${email}`);
      }
    } catch (error) {
      console.log(`\n⚠️  ERROR checking ${email}:`, error);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n📊 Summary:');
  console.log(`   Checked: ${testEmails.length} emails`);
  console.log(`   Found: ${foundAccounts.length} accounts`);
  
  if (foundAccounts.length > 0) {
    console.log('\n⚠️  These accounts appear to be test data:');
    foundAccounts.forEach(acc => {
      console.log(`   - ${acc.email} (ID: ${acc.id})`);
    });
    console.log('\n💡 These should be deleted as they are test accounts.');
  } else {
    console.log('\n✅ No test accounts found. Database is clean!');
  }
  
  process.exit(0);
}

// Run the check
checkSpecificUsers();