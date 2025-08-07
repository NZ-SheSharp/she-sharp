import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function updateTables() {
  console.log('Updating database tables...\n');
  
  try {
    // Add missing columns to user_memberships
    await db.execute(sql`
      ALTER TABLE user_memberships 
      ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
      ADD COLUMN IF NOT EXISTS last_payment_at TIMESTAMP,
      ADD COLUMN IF NOT EXISTS next_billing_date TIMESTAMP,
      ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP
    `);
    
    console.log('✅ Table structure updated successfully!');
    
  } catch (error) {
    console.error('Error updating tables:', error);
  } finally {
    process.exit(0);
  }
}

updateTables();