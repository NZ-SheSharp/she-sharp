import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function deleteTestAccounts() {
  const testEmails = [
    'mentee1@example.com',
    'mentor1@example.com', 
    'maria.garcia@example.com',
    'sarah.chen@example.com'
  ];
  
  console.log('\n🗑️  Deleting Test Accounts');
  console.log('=' .repeat(60));
  console.log('These accounts were created during development/testing');
  console.log('and should be removed from production database.\n');
  
  let deletedCount = 0;
  
  for (const email of testEmails) {
    try {
      console.log(`\n📧 Processing: ${email}`);
      
      // Check if user exists first
      const user = await db
        .select({ id: users.id, name: users.name })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      
      if (user && user.length > 0) {
        console.log(`   Found: ${user[0].name || 'No name'} (ID: ${user[0].id})`);
        
        // Delete the user
        await db
          .delete(users)
          .where(eq(users.email, email));
        
        console.log(`   ✅ Deleted successfully`);
        deletedCount++;
      } else {
        console.log(`   ⚠️  User not found (may already be deleted)`);
      }
    } catch (error) {
      console.log(`   ❌ Error deleting ${email}:`, error);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n📊 Deletion Summary:');
  console.log(`   Attempted: ${testEmails.length} accounts`);
  console.log(`   Deleted: ${deletedCount} accounts`);
  console.log(`   Failed/Not Found: ${testEmails.length - deletedCount} accounts`);
  
  if (deletedCount === testEmails.length) {
    console.log('\n✅ All test accounts successfully removed!');
  } else if (deletedCount > 0) {
    console.log('\n⚠️  Some accounts were deleted, others may have already been removed.');
  }
  
  console.log('\n📝 Note: Related data (roles, profiles, relationships, etc.)');
  console.log('   was automatically deleted due to CASCADE constraints.');
  
  process.exit(0);
}

// Run the deletion
console.log('🚨 Test Account Cleanup');
console.log('Removing development/test accounts from database...');
deleteTestAccounts();