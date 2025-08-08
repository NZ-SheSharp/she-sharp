# Admin Setup Guide

## Admin User Configuration

### Current Admin User
- **Email**: chanmeng.career@gmail.com
- **Name**: Chan Meng
- **Role**: Admin (Active)
- **Setup Date**: January 8, 2025

### Admin Capabilities
Once logged in as admin, the user has access to:

1. **Admin Dashboard** (`/dashboard`)
   - Platform-wide statistics and analytics
   - User growth metrics
   - Event management overview
   - Resource usage statistics

2. **User Management**
   - View all registered users
   - Manage user roles (mentor/mentee/admin)
   - Approve mentor applications
   - Handle user reports and issues

3. **Event Management**
   - Create and edit events
   - Manage event registrations
   - Assign event roles (speakers, volunteers)
   - View attendance analytics

4. **Content Management**
   - Upload and manage resources
   - Moderate user-generated content
   - Manage newsletter subscriptions
   - Update platform announcements

5. **Analytics & Reporting**
   - Access comprehensive platform analytics
   - Generate usage reports
   - Monitor engagement metrics
   - Track donation and sponsorship data

### How to Add New Admin Users

To grant admin privileges to another user:

1. **Using the Script** (Recommended):
   ```bash
   # Edit the email in scripts/set-admin-user.ts
   # Then run:
   npx tsx scripts/set-admin-user.ts
   ```

2. **Direct Database Update**:
   ```sql
   -- First, find the user ID
   SELECT id FROM users WHERE email = 'user@example.com';
   
   -- Then add admin role
   INSERT INTO user_roles (user_id, role_type, is_active, activated_at, verified_at)
   VALUES (<user_id>, 'admin', true, NOW(), NOW())
   ON CONFLICT (user_id, role_type) 
   DO UPDATE SET is_active = true, activated_at = NOW();
   ```

### Verify Admin Access

To verify a user has admin access:

```bash
# Run the verification script
npx tsx scripts/verify-admin-access.ts
```

### Security Notes

1. **Admin Role Protection**:
   - Admin role is protected by middleware
   - All admin API endpoints require valid admin session
   - Admin actions are logged in activity_logs table

2. **Best Practices**:
   - Limit admin users to essential personnel only
   - Regularly review admin access logs
   - Use strong passwords and enable 2FA when available
   - Monitor admin activity through the activity logs

### Troubleshooting

If admin dashboard is not accessible:

1. **Check Role Assignment**:
   ```bash
   npx tsx scripts/verify-admin-access.ts
   ```

2. **Clear Browser Cache**:
   - Sign out and sign back in
   - Clear cookies for the domain

3. **Verify Database Connection**:
   - Ensure DATABASE_URL is correctly configured
   - Check that Neon database is accessible

### Admin Dashboard Features

The admin dashboard provides:

- **Overview Tab**: Key metrics and recent activity
- **Users Tab**: User management and role assignments  
- **Events Tab**: Event creation and management
- **Analytics Tab**: Detailed platform analytics
- **Settings Tab**: Platform configuration options

### Support

For admin-related issues or questions:
- Check the activity logs for error details
- Review the middleware configuration in `/middleware.ts`
- Ensure proper role configuration in `/lib/db/schema.ts`