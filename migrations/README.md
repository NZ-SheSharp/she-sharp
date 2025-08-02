# Database Migrations

This directory contains all database migration files for the She Sharp project.

## Structure

```
migrations/
├── sql/                      # SQL migration files
│   ├── 001_initial_schema/   # Initial database setup
│   ├── 002_email_verification/  # Email verification feature
│   ├── 003_password_reset/   # Password reset functionality
│   └── 004_oauth_providers/  # OAuth social login
└── seeders/                  # Seed data files
```

## Usage

### Running Migrations

```bash
# Generate Drizzle migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Seed database
pnpm db:seed
```

### Creating New Migrations

1. Create a new directory under `sql/` with incremental numbering
2. Add `up.sql` for forward migration
3. Add `down.sql` for rollback
4. Update Drizzle schema in `/lib/db/schema.ts`
5. Run `pnpm db:generate` to create Drizzle migration

## Migration History

| Version | Description | Date | Author |
|---------|-------------|------|--------|
| 001 | Initial schema with users, teams, and auth | 2025-08-02 | System |
| 002 | Email verification system | 2025-08-02 | System |
| 003 | Password reset functionality | 2025-08-02 | System |
| 004 | OAuth providers support | Planned | - |

## Notes

- Always test migrations in development before applying to production
- Keep migrations atomic and reversible
- Document any manual steps required