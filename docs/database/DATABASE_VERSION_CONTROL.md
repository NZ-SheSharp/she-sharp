# Database Version Control Guide

## Current Version
- **Version**: 2.0
- **Date**: January 9, 2025
- **Migration Level**: 0012
- **Status**: Production-ready

## Version History

### v2.0 (2025-01-09)
- Fixed admin dashboard functionality
- Cleaned up test accounts
- Full admin permissions implemented
- Backup: `schema_2025_01_09_v2.sql`

### v1.0 (2025-01-08)
- Initial comprehensive implementation
- Mentorship system complete
- Role-based dashboards
- Backup: `schema_2025_01_08.sql`

## How to Rollback

### To Previous Version (v1.0)
```bash
# 1. Restore database from backup
psql $DATABASE_URL < docs/database/backups/schema_2025_01_08.sql

# 2. Reset git to previous commit
git reset --hard 27533ff

# 3. Re-deploy application
pnpm build && pnpm start
```

### To Current Version (v2.0)
```bash
# 1. Restore database from backup
psql $DATABASE_URL < docs/database/backups/schema_2025_01_09_v2.sql

# 2. Or apply migrations incrementally
psql $DATABASE_URL < lib/db/migrations/0012_fix_admin_permissions.sql
```

## Migration Files

All migrations are stored in `/lib/db/migrations/`:
- `0001_initial_setup.sql` - Base tables
- `0002_add_she_sharp_tables.sql` - Organization tables
- `0003_add_contact_form.sql` - Contact system
- `0004_add_subscription_plans.sql` - Payment integration
- `0005_add_mentorship_tables.sql` - Mentorship system
- `0006_add_admin_analytics.sql` - Analytics
- `0007_add_membership_tiers.sql` - Membership system
- `0008_add_notifications_table.sql` - Notifications
- `0009_add_statistics_and_features.sql` - Stats caching
- `0010_update_meetings_table.sql` - Meeting enhancements
- `0011_fix_resources_table.sql` - Resources completion
- `0012_fix_admin_permissions.sql` - Admin dashboard fix

## Database State

### Active Users
- 8 legitimate user accounts
- 1 admin user (chanmeng.career@gmail.com)
- 0 test accounts (all cleaned)

### Tables Created
- Core: users, teams, team_members, activity_logs
- Auth: sessions, password_resets, email_verifications
- Mentorship: mentor_profiles, mentee_profiles, relationships, meetings
- Events: events, registrations, role_assignments
- Resources: resources, access_logs
- Admin: admin_permissions, analytics_settings
- Features: membership_tiers, membership_features
- Stats: user_mentorship_stats

## Backup Strategy

### Manual Backup
```bash
# Create new backup
pg_dump $DATABASE_URL > docs/database/backups/schema_$(date +%Y_%m_%d).sql
```

### Restore from Backup
```bash
# Restore specific version
psql $DATABASE_URL < docs/database/backups/[backup_file].sql
```

## Important Notes

1. **Always backup before migrations**
2. **Test migrations in development first**
3. **Document all schema changes**
4. **Keep migration files idempotent**
5. **Version control all database changes**

## Emergency Contacts

For database emergencies:
- Check `/docs/admin/ADMIN_SETUP_GUIDE.md` for admin access
- Review `/docs/admin/USER_CLEANUP_LOG.md` for user management
- See `/scripts/` directory for database utilities