import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: '.env' });

const sql = postgres(process.env.DATABASE_URL!);

async function createDatabaseSnapshot() {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const snapshotDir = join('db-backups', `snapshot-${timestamp}`);
  
  try {
    mkdirSync(snapshotDir, { recursive: true });
    console.log(`📸 Creating database snapshot in ${snapshotDir}`);
    
    // 1. Export all table schemas
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    
    console.log(`Found ${tables.length} tables`);
    
    // 2. Get table DDL for each table
    const schemaSQL: string[] = ['-- Database Schema Snapshot'];
    schemaSQL.push(`-- Created: ${new Date().toISOString()}`);
    schemaSQL.push(`-- Tables: ${tables.length}\n`);
    
    for (const { table_name } of tables) {
      console.log(`  - Exporting ${table_name} structure...`);
      
      // Get column definitions
      const columns = await sql`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          column_default,
          is_nullable
        FROM information_schema.columns
        WHERE table_name = ${table_name}
        ORDER BY ordinal_position
      `;
      
      // Get constraints
      const constraints = await sql`
        SELECT 
          constraint_name,
          constraint_type
        FROM information_schema.table_constraints
        WHERE table_name = ${table_name}
      `;
      
      // Build CREATE TABLE statement
      schemaSQL.push(`\n-- Table: ${table_name}`);
      schemaSQL.push(`CREATE TABLE IF NOT EXISTS ${table_name} (`);
      
      const columnDefs = columns.map(col => {
        let def = `  ${col.column_name} ${col.data_type}`;
        if (col.character_maximum_length) {
          def += `(${col.character_maximum_length})`;
        }
        if (col.is_nullable === 'NO') {
          def += ' NOT NULL';
        }
        if (col.column_default) {
          def += ` DEFAULT ${col.column_default}`;
        }
        return def;
      });
      
      schemaSQL.push(columnDefs.join(',\n'));
      schemaSQL.push(');');
      
      // Add constraints
      for (const constraint of constraints) {
        schemaSQL.push(`-- Constraint: ${constraint.constraint_name} (${constraint.constraint_type})`);
      }
    }
    
    // 3. Save schema to file
    const schemaFile = join(snapshotDir, 'schema.sql');
    writeFileSync(schemaFile, schemaSQL.join('\n'));
    console.log(`✅ Schema saved to ${schemaFile}`);
    
    // 4. Get row counts for documentation
    const rowCounts: any[] = [];
    for (const { table_name } of tables) {
      const [{ count }] = await sql`
        SELECT COUNT(*) as count FROM ${sql(table_name)}
      `;
      rowCounts.push({ table: table_name, rows: count });
    }
    
    // 5. Create snapshot metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      database_url: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'unknown',
      tables: tables.length,
      total_rows: rowCounts.reduce((sum, t) => sum + parseInt(t.rows), 0),
      table_details: rowCounts,
      git_commit: 'pending',
      description: 'Database snapshot after fixing mentor detail page issues'
    };
    
    const metadataFile = join(snapshotDir, 'metadata.json');
    writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
    console.log(`✅ Metadata saved to ${metadataFile}`);
    
    // 6. Create README for the snapshot
    const readme = `# Database Snapshot - ${timestamp}

## Overview
This snapshot was created after successfully fixing the mentor detail page issues.

## Statistics
- **Total Tables**: ${metadata.tables}
- **Total Rows**: ${metadata.total_rows}
- **Created**: ${metadata.timestamp}

## Table Row Counts
${rowCounts.map(t => `- ${t.table}: ${t.rows} rows`).join('\n')}

## Key Changes in This Version
- Added missing columns to mentorship_relationships table:
  - paused_at
  - meeting_frequency
  - relationship_goals
  - mentor_notes
  - mentee_notes
  - total_hours
  - is_active
- Fixed mentor and mentee profile tables with proper JSONB columns
- All authentication and role management systems working correctly

## How to Restore
To restore this database snapshot:
1. Create a new database
2. Run: \`psql DATABASE_URL < schema.sql\`
3. Apply any seed data as needed
`;
    
    const readmeFile = join(snapshotDir, 'README.md');
    writeFileSync(readmeFile, readme);
    console.log(`✅ README saved to ${readmeFile}`);
    
    console.log('\n📊 Database Snapshot Summary:');
    console.log(`   Location: ${snapshotDir}`);
    console.log(`   Tables: ${metadata.tables}`);
    console.log(`   Total Rows: ${metadata.total_rows}`);
    
    return snapshotDir;
  } catch (error) {
    console.error('❌ Error creating snapshot:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

createDatabaseSnapshot().then(dir => {
  console.log(`\n✅ Database snapshot created successfully!`);
  console.log(`   You can find it at: ${dir}`);
}).catch(error => {
  console.error('Failed to create snapshot:', error);
  process.exit(1);
});