# Database Version Control Guide

## Overview

This guide explains how to use the database version control system built on top of Drizzle ORM for the She Sharp project. The system provides migration tracking, snapshots, rollback capabilities, and checkpoint management.

## Architecture

### Components

1. **Drizzle Migrations** (`/lib/db/migrations/`)
   - SQL migration files (e.g., `0001_flat_starjammers.sql`)
   - Metadata files in `/meta/` directory
   - Journal file (`_journal.json`) tracking migration history

2. **Migration Manager** (`/lib/db/migration-manager.ts`)
   - Core class handling version control operations
   - Snapshot creation and management
   - Migration status tracking

3. **CLI Tools** (`/scripts/`)
   - `db-version.ts` - Main version control CLI
   - `migrate-with-backup.ts` - Safe migration with automatic backups

## Available Commands

### Basic Migration Commands

```bash
# Generate new migration from schema changes
pnpm db:generate

# Apply pending migrations
pnpm db:migrate

# Apply migrations with automatic backup
pnpm db:migrate:safe
```

### Version Control Commands

```bash
# Check migration status
pnpm db:status

# View migration history
pnpm db:history

# Create a snapshot
pnpm db:snapshot "description"

# List all snapshots
pnpm db:version list-snapshots

# Create a named checkpoint
pnpm db:version checkpoint "stable-v1"

# Generate rollback SQL
pnpm db:version rollback-sql 0004_keen_mandarin
```

## Best Practices

### 1. Pre-Migration Checklist

Before running migrations in production:

- [ ] Review all pending migrations with `pnpm db:status`
- [ ] Create a snapshot: `pnpm db:snapshot "pre-deployment"`
- [ ] Test migrations in staging environment
- [ ] Have rollback plan ready

### 2. Migration Workflow

```bash
# 1. Make schema changes in /lib/db/schema.ts

# 2. Generate migration
pnpm db:generate

# 3. Review generated SQL in /lib/db/migrations/

# 4. Test locally
pnpm db:migrate

# 5. Create checkpoint if stable
pnpm db:version checkpoint "feature-complete"

# 6. Deploy to production with backup
pnpm db:migrate:safe
```

### 3. Snapshot Strategy

Create snapshots at key points:

- Before major migrations
- After successful deployments
- Before schema refactoring
- Weekly automated snapshots (if applicable)

### 4. Naming Conventions

- **Snapshots**: Use descriptive names like `pre-auth-refactor`, `post-v2-release`
- **Checkpoints**: Use version tags like `v1.0-stable`, `beta-release`
- **Migration descriptions**: Be specific in schema change descriptions

## Rollback Procedures

### Method 1: Using Snapshots (Recommended)

```bash
# 1. List available snapshots
pnpm db:version list-snapshots

# 2. Identify the snapshot to restore
# snapshot_2025-01-03T10-30-00_pre-migration

# 3. Restore from snapshot (manual process)
# - Drop current database
# - Restore schema from snapshot file
# - Apply data if included
```

### Method 2: Manual Rollback

```bash
# 1. Generate rollback SQL
pnpm db:version rollback-sql 0004_keen_mandarin

# 2. Review and modify the generated SQL

# 3. Apply rollback manually
# psql $DATABASE_URL < rollback.sql
```

## Directory Structure

```
lib/db/
├── migrations/           # Drizzle migrations
│   ├── 0001_*.sql
│   ├── 0002_*.sql
│   └── meta/
│       ├── 0001_snapshot.json
│       └── _journal.json
├── snapshots/           # Database snapshots
│   ├── snapshot_*_schema.sql
│   ├── snapshot_*_data.sql
│   └── snapshot_*_state.json
├── checkpoints/         # Named checkpoints
│   └── stable-v1.json
└── schema.ts           # Database schema definition
```

## Environment Variables

```env
# Required
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...

# Optional
SNAPSHOT_INCLUDE_DATA=true  # Include data in snapshots (default: false)
```

## Troubleshooting

### Common Issues

1. **Migration Conflicts**
   ```bash
   # Check current status
   pnpm db:status
   
   # Regenerate migrations if needed
   rm -rf lib/db/migrations
   pnpm db:generate
   ```

2. **Snapshot Failures**
   - Ensure `pg_dump` is installed
   - Check database connection string
   - Verify sufficient disk space

3. **Rollback Issues**
   - Always test rollback procedures in staging
   - Keep manual rollback scripts for complex changes
   - Document any data migrations separately

## Advanced Usage

### Automated Snapshots

Add to your CI/CD pipeline:

```yaml
# .github/workflows/backup.yml
- name: Create weekly snapshot
  run: |
    pnpm db:snapshot "weekly-$(date +%Y%m%d)"
```

### Migration Hooks

The system supports pre/post migration hooks:

```typescript
// In your migration files
export async function up(db: Database) {
  // Pre-migration logic
  await createBackupTable();
  
  // Migration
  await db.schema.alterTable(...);
  
  // Post-migration logic
  await validateMigration();
}
```

## Security Considerations

1. **Snapshot Storage**
   - Store snapshots in secure, encrypted storage
   - Implement retention policies
   - Never commit snapshots to git

2. **Access Control**
   - Limit production database access
   - Use read-only credentials for snapshots
   - Audit migration activities

3. **Sensitive Data**
   - Be cautious with data snapshots
   - Consider data masking for non-production environments
   - Follow GDPR/compliance requirements

## Maintenance

### Regular Tasks

- Weekly: Review and clean old snapshots
- Monthly: Test rollback procedures
- Quarterly: Audit migration history
- Yearly: Archive old migrations

### Monitoring

Monitor these metrics:
- Migration execution time
- Database size growth
- Snapshot storage usage
- Failed migration attempts

## References

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Backup Best Practices](https://www.postgresql.org/docs/current/backup.html)
- Internal: `/lib/db/migration-manager.ts`