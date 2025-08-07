# Version Control Guide

## Current Version: Phase 2 Complete (2025-08-07)

### Git Information
- **Latest Commit**: 9dd7ac5
- **Branch**: main
- **Remote**: https://github.com/ChanMeng666/she-sharp.git

### Database Snapshot
- **Location**: `db-backups/snapshot-20250807/`
- **Total Tables**: 18
- **Total Records**: 60
- **Backup Files**:
  - `schema.sql` - Complete database schema
  - `metadata.json` - Snapshot metadata
  - `README.md` - Restoration instructions

## Key Milestones

### Phase 1: Authentication & Core Setup ✅
- OAuth integration (Google, GitHub)
- User authentication system
- Role-based access control (RBAC)
- Session management
- Security features (rate limiting, account locking)

### Phase 2: Mentorship System ✅
- Mentor profile management
- Mentee profile management
- Mentor browsing and search
- Mentorship relationships
- Dashboard integration
- Next.js 15 compatibility fixes

## Database Schema Version Control

### Current Schema Tables
1. **users** - User accounts
2. **user_roles** - Role assignments (admin, mentor, mentee)
3. **mentor_profiles** - Mentor information
4. **mentee_profiles** - Mentee information
5. **mentorship_relationships** - Mentor-mentee connections
6. **teams** - Team organizations
7. **team_members** - Team membership
8. **activity_logs** - User activity tracking
9. **invitations** - Team invitations
10. **user_memberships** - Membership information
11. **admin_permissions** - Admin access control
12. **meetings** - Meeting records
13. **session** - Session management
14. **account** - OAuth accounts
15. **verification_token** - Email verification
16. **email_verifications** - Email verification records
17. **password_resets** - Password reset tokens
18. **password_history** - Password history

### Recent Schema Changes
```sql
-- Added to mentorship_relationships
ALTER TABLE mentorship_relationships ADD COLUMN paused_at timestamp;
ALTER TABLE mentorship_relationships ADD COLUMN meeting_frequency varchar(50);
ALTER TABLE mentorship_relationships ADD COLUMN relationship_goals text;
ALTER TABLE mentorship_relationships ADD COLUMN mentor_notes text;
ALTER TABLE mentorship_relationships ADD COLUMN mentee_notes text;
ALTER TABLE mentorship_relationships ADD COLUMN total_hours numeric(10,2) DEFAULT 0;
ALTER TABLE mentorship_relationships ADD COLUMN is_active boolean DEFAULT true;

-- Fixed array columns to JSONB
ALTER TABLE mentor_profiles ALTER COLUMN expertise_areas TYPE jsonb;
ALTER TABLE mentee_profiles ALTER COLUMN interests TYPE jsonb;
ALTER TABLE mentee_profiles ALTER COLUMN learning_goals TYPE jsonb;
```

## How to Rollback

### Database Rollback
To restore a previous database state:

```bash
# 1. Find the snapshot you want to restore
ls -la db-backups/

# 2. Review the snapshot
cat db-backups/snapshot-20250807/metadata.json

# 3. Restore the schema (CAUTION: This will drop existing data)
psql $DATABASE_URL < db-backups/snapshot-20250807/schema.sql

# 4. Re-run migrations if needed
pnpm db:migrate
```

### Code Rollback
To revert to a previous code version:

```bash
# 1. View commit history
git log --oneline

# 2. Revert to specific commit
git revert <commit-hash>

# 3. Or reset to previous state (CAUTION: Destructive)
git reset --hard <commit-hash>
```

## Environment Variables Required
```env
DATABASE_URL=          # PostgreSQL connection string
AUTH_SECRET=          # NextAuth secret
GOOGLE_CLIENT_ID=     # Google OAuth
GOOGLE_CLIENT_SECRET= # Google OAuth
GITHUB_CLIENT_ID=     # GitHub OAuth
GITHUB_CLIENT_SECRET= # GitHub OAuth
BASE_URL=            # Application URL
```

## Testing Checklist
Before any major changes:
- [ ] Run `pnpm build` - Ensure builds successfully
- [ ] Test authentication flow
- [ ] Test mentor profile creation/edit
- [ ] Test mentee profile creation/edit
- [ ] Test mentor browsing
- [ ] Test mentorship application
- [ ] Check database migrations
- [ ] Verify role-based access

## Emergency Recovery

### If Database is Corrupted
1. Stop the application
2. Backup current state: `pg_dump $DATABASE_URL > emergency-backup.sql`
3. Restore from snapshot: `psql $DATABASE_URL < db-backups/snapshot-20250807/schema.sql`
4. Apply seed data if needed: `pnpm db:seed`
5. Restart application

### If Code Won't Build
1. Clear caches: `rm -rf .next node_modules`
2. Reinstall: `pnpm install`
3. Reset to last working commit: `git reset --hard 9dd7ac5`
4. Rebuild: `pnpm build`

## Contact for Issues
- Repository: https://github.com/ChanMeng666/she-sharp
- Latest stable commit: 9dd7ac5
- Database snapshot: snapshot-20250807