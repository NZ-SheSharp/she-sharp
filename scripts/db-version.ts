#!/usr/bin/env tsx

import { MigrationManager } from '../lib/db/migration-manager';
import { resolve } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });
config({ path: resolve(process.cwd(), '.env.local'), override: true });

const manager = new MigrationManager();

async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);

  try {
    switch (command) {
      case 'status':
        await manager.checkStatus();
        break;

      case 'history':
        const history = manager.getMigrationHistory();
        console.log('\n📜 Migration History:');
        console.log('===================');
        history.entries.forEach(entry => {
          const date = new Date(entry.when).toLocaleString();
          console.log(`${entry.idx}: ${entry.tag} - ${date}`);
        });
        break;

      case 'snapshot':
        const description = args[0];
        const snapshotName = await manager.createSnapshot(description);
        console.log(`\n✅ Snapshot created: ${snapshotName}`);
        break;

      case 'list-snapshots':
        const snapshots = manager.listSnapshots();
        if (snapshots.length === 0) {
          console.log('\nNo snapshots found.');
        } else {
          console.log('\n📸 Available Snapshots:');
          console.log('=====================');
          snapshots.forEach(snapshot => console.log(`  - ${snapshot}`));
        }
        break;

      case 'checkpoint':
        const checkpointName = args[0];
        if (!checkpointName) {
          console.error('❌ Please provide a checkpoint name');
          process.exit(1);
        }
        await manager.createCheckpoint(checkpointName);
        break;

      case 'rollback-sql':
        const migrationTag = args[0];
        if (!migrationTag) {
          console.error('❌ Please provide a migration tag');
          process.exit(1);
        }
        const rollbackSQL = await manager.generateRollbackSQL(migrationTag);
        console.log('\n📝 Rollback SQL:');
        console.log('===============');
        console.log(rollbackSQL);
        break;

      default:
        console.log(`
🗄️  Database Version Control Tool

Usage: pnpm db:version <command> [options]

Commands:
  status              Check migration status
  history             Show migration history
  snapshot [desc]     Create database snapshot
  list-snapshots      List available snapshots
  checkpoint <name>   Create a named checkpoint
  rollback-sql <tag>  Generate rollback SQL for a migration

Examples:
  pnpm db:version status
  pnpm db:version snapshot "before-auth-update"
  pnpm db:version checkpoint "stable-v1"
  pnpm db:version rollback-sql 0004_keen_mandarin
        `);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);