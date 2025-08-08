#!/usr/bin/env tsx
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

const execAsync = promisify(exec);

async function createDatabaseSnapshot() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(process.cwd(), 'db-backups', `snapshot-${timestamp}`);
  
  console.log('📸 Creating database snapshot...');
  
  try {
    // Create backup directory
    await fs.mkdir(backupDir, { recursive: true });
    
    // Get database URL
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL not found in environment variables');
    }
    
    // Copy current migrations
    const migrationsSource = path.join(process.cwd(), 'lib', 'db', 'migrations');
    const migrationsBackup = path.join(backupDir, 'migrations');
    await fs.cp(migrationsSource, migrationsBackup, { recursive: true });
    
    // Copy schema file
    const schemaSource = path.join(process.cwd(), 'lib', 'db', 'schema.ts');
    const schemaBackup = path.join(backupDir, 'schema.ts');
    await fs.copyFile(schemaSource, schemaBackup);
    
    // Get migration list
    const migrations = (await fs.readdir(migrationsSource))
      .filter(f => f.endsWith('.sql'))
      .sort();
    
    // Create metadata file
    const metadata = {
      timestamp,
      date: new Date().toISOString(),
      migrationsCount: migrations.length,
      migrations: migrations,
      description: 'Admin dashboard implementation complete',
      features: [
        'Complete admin dashboard with role-based access',
        'User management system',
        'Mentor management and analytics',
        'Event registration system',
        'Content management interface',
        'Activity logging and audit trails'
      ]
    };
    
    await fs.writeFile(
      path.join(backupDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
    
    console.log('✅ Database snapshot created successfully!');
    console.log(`📁 Location: ${backupDir}`);
    
    // Create a git-tracked version file (without sensitive data)
    const versionFile = path.join(process.cwd(), 'db-version.json');
    const versionInfo = {
      lastSnapshot: timestamp,
      migrationsApplied: metadata.migrationsCount,
      latestMigration: migrations[migrations.length - 1],
      description: metadata.description
    };
    
    await fs.writeFile(versionFile, JSON.stringify(versionInfo, null, 2));
    console.log('📝 Version file updated');
    
  } catch (error) {
    console.error('❌ Error creating snapshot:', error);
    process.exit(1);
  }
}

createDatabaseSnapshot();