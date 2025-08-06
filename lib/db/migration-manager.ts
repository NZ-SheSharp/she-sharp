import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { execSync } from 'child_process';
import { sql } from 'drizzle-orm';
import { db } from './drizzle';

interface MigrationEntry {
  idx: number;
  version: string;
  when: number;
  tag: string;
  breakpoints: boolean;
}

interface MigrationJournal {
  version: string;
  dialect: string;
  entries: MigrationEntry[];
}

interface MigrationStatus {
  name: string;
  applied_at: Date | null;
  checksum: string;
}

/**
 * Database migration manager for Drizzle
 * Provides version control and rollback capabilities
 * Updated: 2025-08-06 - Fixed TypeScript build issues
 */
export class MigrationManager {
  private migrationsPath: string;
  private journalPath: string;
  private snapshotsPath: string;

  constructor() {
    this.migrationsPath = resolve(process.cwd(), 'lib/db/migrations');
    this.journalPath = join(this.migrationsPath, 'meta/_journal.json');
    this.snapshotsPath = resolve(process.cwd(), 'lib/db/snapshots');
  }

  /**
   * Get migration history from journal
   */
  getMigrationHistory(): MigrationJournal {
    if (!existsSync(this.journalPath)) {
      throw new Error('Migration journal not found');
    }
    const journalContent = readFileSync(this.journalPath, 'utf-8');
    return JSON.parse(journalContent) as MigrationJournal;
  }

  /**
   * Get applied migrations from database
   */
  async getAppliedMigrations(): Promise<MigrationStatus[]> {
    try {
      const result = await db.execute(sql`
        SELECT name, applied_at, checksum 
        FROM __drizzle_migrations 
        ORDER BY applied_at ASC
      `);
      // Handle both possible return types from execute
      if (Array.isArray(result)) {
        return result as MigrationStatus[];
      }
      // @ts-ignore - handle different drizzle versions
      const rows = (result as any).rows || [];
      return rows as MigrationStatus[];
    } catch (error) {
      // Table might not exist yet
      return [];
    }
  }

  /**
   * Create database schema snapshot
   */
  async createSnapshot(description?: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotName = `snapshot_${timestamp}${description ? `_${description}` : ''}`;
    
    // Ensure snapshots directory exists
    if (!existsSync(this.snapshotsPath)) {
      execSync(`mkdir -p ${this.snapshotsPath}`);
    }

    // Export current schema
    const schemaPath = join(this.snapshotsPath, `${snapshotName}_schema.sql`);
    const dataPath = join(this.snapshotsPath, `${snapshotName}_data.sql`);
    
    console.log(`Creating snapshot: ${snapshotName}`);
    
    // Use pg_dump to export schema and data
    const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('Database URL not found in environment variables');
    }

    // Export schema only
    execSync(
      `pg_dump "${databaseUrl}" --schema-only --no-owner --no-privileges > "${schemaPath}"`,
      { stdio: 'pipe' }
    );

    // Export data only (optional, for smaller databases)
    const includeData = process.env.SNAPSHOT_INCLUDE_DATA === 'true';
    if (includeData) {
      execSync(
        `pg_dump "${databaseUrl}" --data-only --no-owner --no-privileges > "${dataPath}"`,
        { stdio: 'pipe' }
      );
    }

    // Save migration state
    const journal = this.getMigrationHistory();
    const statePath = join(this.snapshotsPath, `${snapshotName}_state.json`);
    writeFileSync(statePath, JSON.stringify({
      timestamp,
      description,
      journal,
      appliedMigrations: await this.getAppliedMigrations(),
      includeData
    }, null, 2));

    console.log(`Snapshot created successfully: ${snapshotName}`);
    return snapshotName;
  }

  /**
   * List available snapshots
   */
  listSnapshots(): string[] {
    if (!existsSync(this.snapshotsPath)) {
      return [];
    }
    
    const files = readdirSync(this.snapshotsPath);
    const snapshots = new Set<string>();
    
    files.forEach(file => {
      const match = file.match(/^(snapshot_[^_]+(?:_[^_]+)?)/);
      if (match) {
        snapshots.add(match[1]);
      }
    });
    
    return Array.from(snapshots).sort().reverse();
  }

  /**
   * Generate rollback SQL for a specific migration
   */
  async generateRollbackSQL(migrationTag: string): Promise<string> {
    // This is a simplified version - in production, you'd want to:
    // 1. Parse the migration SQL
    // 2. Generate inverse operations
    // 3. Handle complex scenarios
    
    const migrationFile = readdirSync(this.migrationsPath)
      .find(f => f.includes(migrationTag));
      
    if (!migrationFile) {
      throw new Error(`Migration ${migrationTag} not found`);
    }

    const migrationSQL = readFileSync(
      join(this.migrationsPath, migrationFile), 
      'utf-8'
    );

    console.log(`Generating rollback for: ${migrationTag}`);
    console.log('Original SQL:', migrationSQL);
    
    // This would need to be implemented based on your specific needs
    // For now, return a comment indicating manual rollback is needed
    return `-- Manual rollback required for migration: ${migrationTag}\n-- Original SQL:\n${migrationSQL.split('\n').map(line => `-- ${line}`).join('\n')}`;
  }

  /**
   * Check migration status
   */
  async checkStatus(): Promise<void> {
    const journal = this.getMigrationHistory();
    const applied = await this.getAppliedMigrations();
    
    console.log('\n📋 Migration Status:');
    console.log('==================');
    
    journal.entries.forEach(entry => {
      const isApplied = applied.some(a => a.name === entry.tag);
      const status = isApplied ? '✅' : '❌';
      const date = new Date(entry.when).toLocaleString();
      
      console.log(`${status} ${entry.tag} (${date})`);
    });
    
    console.log(`\nTotal migrations: ${journal.entries.length}`);
    console.log(`Applied migrations: ${applied.length}`);
    
    if (journal.entries.length > applied.length) {
      console.log('\n⚠️  There are pending migrations!');
      console.log('Run "pnpm db:migrate" to apply them.');
    }
  }

  /**
   * Create a migration checkpoint
   */
  async createCheckpoint(name: string): Promise<void> {
    const checkpointsPath = join(this.migrationsPath, 'checkpoints');
    
    if (!existsSync(checkpointsPath)) {
      execSync(`mkdir -p ${checkpointsPath}`);
    }
    
    const journal = this.getMigrationHistory();
    const timestamp = new Date().toISOString();
    
    const checkpoint = {
      name,
      timestamp,
      journal: journal.entries[journal.entries.length - 1],
      appliedMigrations: await this.getAppliedMigrations()
    };
    
    const checkpointPath = join(checkpointsPath, `${name}.json`);
    writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));
    
    console.log(`✅ Checkpoint created: ${name}`);
  }
}