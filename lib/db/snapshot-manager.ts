import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { db } from './drizzle';
import { sql } from 'drizzle-orm';
import { MigrationManager } from './migration-manager';

/**
 * Alternative snapshot manager that works without pg_dump
 * Uses Drizzle introspection and custom export logic
 */
export class SnapshotManager {
  private snapshotsPath: string;
  private migrationManager: MigrationManager;

  constructor() {
    this.snapshotsPath = resolve(process.cwd(), 'lib/db/snapshots');
    this.migrationManager = new MigrationManager();
  }

  /**
   * Create a lightweight snapshot of migration state
   */
  async createMigrationSnapshot(description?: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotName = `snapshot_${timestamp}${description ? `_${description}` : ''}`;
    
    // Ensure snapshots directory exists
    if (!existsSync(this.snapshotsPath)) {
      mkdirSync(this.snapshotsPath, { recursive: true });
    }

    console.log(`Creating migration snapshot: ${snapshotName}`);
    
    try {
      // Get current migration state
      const journal = this.migrationManager.getMigrationHistory();
      const appliedMigrations = await this.migrationManager.getAppliedMigrations();
      
      // Get database schema info
      const schemaInfo = await this.getDatabaseSchemaInfo();
      
      // Create snapshot metadata
      const snapshotData = {
        name: snapshotName,
        timestamp,
        description,
        migrationState: {
          journal,
          appliedMigrations,
          lastMigration: journal.entries[journal.entries.length - 1]
        },
        schemaInfo,
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          drizzleVersion: journal.version
        }
      };
      
      // Save snapshot
      const snapshotPath = join(this.snapshotsPath, `${snapshotName}.json`);
      writeFileSync(snapshotPath, JSON.stringify(snapshotData, null, 2));
      
      console.log(`✅ Migration snapshot created: ${snapshotName}`);
      console.log(`📍 Location: ${snapshotPath}`);
      
      return snapshotName;
    } catch (error) {
      console.error('Failed to create snapshot:', error);
      throw error;
    }
  }

  /**
   * Get basic database schema information
   */
  private async getDatabaseSchemaInfo(): Promise<any> {
    try {
      // Query information schema for tables
      const tables = await db.execute(sql`
        SELECT 
          table_name,
          table_type
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
      `);

      // Query for table columns
      const columns = await db.execute(sql`
        SELECT 
          table_name,
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position
      `);

      // Query for indexes
      const indexes = await db.execute(sql`
        SELECT 
          tablename,
          indexname,
          indexdef
        FROM pg_indexes
        WHERE schemaname = 'public'
        ORDER BY tablename, indexname
      `);

      return {
        tables: tables.rows,
        columns: columns.rows,
        indexes: indexes.rows,
        capturedAt: new Date().toISOString()
      };
    } catch (error) {
      console.warn('Could not capture full schema info:', error);
      return {
        error: 'Schema capture failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create a checkpoint (named snapshot)
   */
  async createCheckpoint(name: string): Promise<void> {
    const checkpointsPath = join(this.snapshotsPath, 'checkpoints');
    
    if (!existsSync(checkpointsPath)) {
      mkdirSync(checkpointsPath, { recursive: true });
    }
    
    // Create snapshot first
    const snapshotName = await this.createMigrationSnapshot(`checkpoint-${name}`);
    
    // Create checkpoint reference
    const checkpoint = {
      name,
      snapshotName,
      createdAt: new Date().toISOString(),
      migrationState: this.migrationManager.getMigrationHistory()
    };
    
    const checkpointPath = join(checkpointsPath, `${name}.json`);
    writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));
    
    console.log(`✅ Checkpoint created: ${name}`);
  }
}