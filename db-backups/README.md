# Database Backups and Version Control

This directory contains database schema snapshots and version control information for the She Sharp project.

## Directory Structure

```
db-backups/
├── README.md                    # This file
├── snapshot-20250807/          # Phase 2 completion snapshot
│   ├── VERSION_INFO.md
│   ├── schema_backup.ts
│   └── migrations_backup/
└── snapshot-20250808/          # Phase 3 completion snapshot
    ├── VERSION_INFO.md
    ├── schema_backup.ts
    └── migrations_backup/
```

## Snapshot History

### August 8, 2025 - Phase 3 Completion
- **Directory**: `snapshot-20250808/`
- **Features**: Event Management, Resource System, Notifications
- **UI Updates**: Card layout fixes, button overflow resolution
- **Commit**: e741ef9

### August 7, 2025 - Phase 2 Completion  
- **Directory**: `snapshot-20250807/`
- **Features**: Mentorship System complete
- **Database**: All mentorship tables and relationships
- **Commit**: 9dd7ac5

## How to Use Snapshots

### Viewing a Snapshot
```bash
# Check what's in a snapshot
ls -la db-backups/snapshot-20250808/

# View version info
cat db-backups/snapshot-20250808/VERSION_INFO.md

# Compare schemas
diff db-backups/snapshot-20250807/schema_backup.ts db-backups/snapshot-20250808/schema_backup.ts
```

### Rolling Back to a Snapshot
```bash
# Example: Roll back to August 7 snapshot
cp db-backups/snapshot-20250807/schema_backup.ts lib/db/schema.ts
cp -r db-backups/snapshot-20250807/migrations_backup/* lib/db/migrations/

# Regenerate and apply
pnpm db:generate
pnpm db:migrate
```

### Creating a New Snapshot
```bash
# Create directory
mkdir -p db-backups/snapshot-$(date +%Y%m%d)

# Copy current schema
cp lib/db/schema.ts db-backups/snapshot-$(date +%Y%m%d)/schema_backup.ts

# Copy migrations
cp -r lib/db/migrations db-backups/snapshot-$(date +%Y%m%d)/migrations_backup

# Create version info
echo "# Database Snapshot - $(date '+%B %d, %Y')" > db-backups/snapshot-$(date +%Y%m%d)/VERSION_INFO.md
```

## Important Notes

1. **Schema Only**: These snapshots contain schema structure, not data
2. **Git Ignored**: The `db-backups/` directory should be in `.gitignore` if it contains sensitive data
3. **Production Backups**: Production data should be backed up via your database provider
4. **Migration Safety**: Always test migrations in development before production

## Version Control Strategy

1. **Before Major Changes**: Create a snapshot before implementing new features
2. **After Completion**: Create a snapshot after successfully completing a phase
3. **Regular Intervals**: Consider weekly snapshots during active development
4. **Document Changes**: Always update VERSION_INFO.md with clear descriptions

## Rollback Checklist

Before rolling back:
- [ ] Backup current state
- [ ] Check for data dependencies
- [ ] Test in development environment
- [ ] Coordinate with team members
- [ ] Update documentation

## Related Documentation

- `/docs/development/DATABASE_VERSION_CONTROL.md` - Detailed version control guide
- `/docs/development/PHASE*_REPORT.md` - Phase completion reports
- `/lib/db/README.md` - Database architecture documentation