#!/usr/bin/env tsx

import { SnapshotManager } from '../lib/db/snapshot-manager';
import { resolve } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });
config({ path: resolve(process.cwd(), '.env.local'), override: true });

async function main() {
  const manager = new SnapshotManager();
  const description = process.argv[2];

  try {
    const snapshotName = await manager.createMigrationSnapshot(description);
    console.log(`\n✨ Snapshot created successfully!`);
    console.log(`📸 Name: ${snapshotName}`);
    console.log(`\n💡 Tip: You can create a checkpoint with: pnpm db:version checkpoint <name>`);
  } catch (error) {
    console.error('❌ Failed to create snapshot:', error);
    process.exit(1);
  }
}

main().catch(console.error);