# Database Migration History

## Overview
This document tracks all database migrations applied to the She Sharp platform.

## Migration Version Control

### Version: 2025-01-08
**Commit Hash**: (to be generated)
**Applied Migrations**: 0001 through 0011

### Migration Details

#### 0001_initial_setup.sql
- Created base tables: users, teams, team_members, activity_logs, invitations
- Established core authentication and team structure

#### 0002_add_she_sharp_tables.sql
- Added She Sharp specific tables
- events, newsletters, sponsors, volunteers, etc.

#### 0003_add_contact_form.sql
- Added contact_submissions table for form handling

#### 0004_add_subscription_plans.sql
- Added subscription_plans and user_subscriptions tables
- Integrated with Stripe payment system

#### 0005_add_mentorship_tables.sql
- Created mentorship system tables
- mentor_profiles, mentee_profiles, mentorship_relationships
- meetings, resources, skill_assessments

#### 0006_add_admin_analytics.sql
- Added admin_analytics_settings table
- Created analytics tracking infrastructure

#### 0007_add_membership_tiers.sql
- Implemented membership tier system
- membership_tiers and tier-related fields

#### 0008_add_notifications_table.sql
- Added notifications table
- Email preferences and notification tracking
- Event waitlists functionality

#### 0009_add_statistics_and_features.sql
- Created user_mentorship_stats for performance caching
- Added membership_features for tier-based access control
- Implemented event_role_assignments for flexible role management
- Added stored procedure for updating statistics

#### 0010_update_meetings_table.sql
- Enhanced meetings table with detailed tracking fields:
  - topics_discussed (JSONB)
  - goals_set (JSONB)
  - action_items (JSONB)
  - mentor_notes, mentee_feedback
  - rating, actual times, recording_url
- Updated mentorship_relationships with additional fields

#### 0011_fix_resources_table.sql
- Completed resources table structure:
  - Added missing columns: title, description, resource_type
  - Added file management fields: file_url, file_size, mime_type
  - Added access control: access_level, required_roles
  - Added metadata: categories, tags, upload tracking
  - Added engagement metrics: download_count, view_count, average_rating

## Database Schema Backup

The complete database schema as of this version is backed up in:
- `/docs/database/backups/schema_2025_01_08.sql`

## Rollback Instructions

To rollback to this version:
1. Restore the schema backup: `psql $DATABASE_URL < docs/database/backups/schema_2025_01_08.sql`
2. Reset to this commit: `git reset --hard <commit_hash>`
3. Re-run migrations if needed: `pnpm db:migrate`

## Important Notes

- All migrations are designed to be idempotent (using IF NOT EXISTS)
- The database uses Drizzle ORM for schema management
- Neon PostgreSQL is the production database
- Always test migrations in development before applying to production