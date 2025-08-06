#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { MigrationManager } from '../lib/db/migration-manager';
import { resolve } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });
config({ path: resolve(process.cwd(), '.env.local'), override: true });

async function main() {
  const manager = new MigrationManager();
  
  try {
    // Check current status
    console.log('🔍 Checking current migration status...');
    await manager.checkStatus();
    
    // Create pre-migration snapshot
    console.log('\n📸 Creating pre-migration snapshot...');
    const snapshotName = await manager.createSnapshot('pre-migration');
    
    // Run migrations
    console.log('\n🚀 Running migrations...');
    execSync('pnpm db:migrate', { stdio: 'inherit' });
    
    // Check status after migration
    console.log('\n✅ Migration completed! New status:');
    await manager.checkStatus();
    
    console.log(`\n💡 Tip: If you need to rollback, you can restore from snapshot: ${snapshotName}`);
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    console.log('💡 You can check the snapshots with: pnpm db:version list-snapshots');
    process.exit(1);
  }
}

main().catch(console.error);