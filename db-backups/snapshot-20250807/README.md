# Database Snapshot - 20250807

## Overview
This snapshot was created after successfully fixing the mentor detail page issues.

## Statistics
- **Total Tables**: 18
- **Total Rows**: 60
- **Created**: 2025-08-07T10:43:14.721Z

## Table Row Counts
- account: 7 rows
- activity_logs: 24 rows
- admin_permissions: 0 rows
- email_verifications: 6 rows
- invitations: 0 rows
- meetings: 0 rows
- mentee_profiles: 1 rows
- mentor_profiles: 1 rows
- mentorship_relationships: 0 rows
- password_history: 0 rows
- password_resets: 0 rows
- session: 0 rows
- team_members: 1 rows
- teams: 1 rows
- user_memberships: 1 rows
- user_roles: 6 rows
- users: 12 rows
- verification_token: 0 rows

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
2. Run: `psql DATABASE_URL < schema.sql`
3. Apply any seed data as needed
