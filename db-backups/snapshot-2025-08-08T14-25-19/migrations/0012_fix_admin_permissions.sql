-- Fix admin_permissions table structure
-- Add missing columns that were causing dashboard errors

-- Add missing columns if they don't exist
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS can_manage_content BOOLEAN DEFAULT true;
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS can_verify_mentors BOOLEAN DEFAULT true;
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS granted_by INTEGER REFERENCES users(id);
ALTER TABLE admin_permissions ADD COLUMN IF NOT EXISTS granted_at TIMESTAMP DEFAULT NOW();

-- Ensure admin user (ID: 1) has full permissions
INSERT INTO admin_permissions (
  user_id,
  can_view_all_data,
  can_edit_users,
  can_manage_relationships,
  can_access_analytics,
  can_manage_content,
  can_verify_mentors,
  can_manage_events,
  granted_at
)
VALUES (
  1,  -- chanmeng.career@gmail.com
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  NOW()
)
ON CONFLICT (user_id) 
DO UPDATE SET
  can_view_all_data = true,
  can_edit_users = true,
  can_manage_relationships = true,
  can_access_analytics = true,
  can_manage_content = true,
  can_verify_mentors = true,
  can_manage_events = true;

-- Create index if not exists
CREATE INDEX IF NOT EXISTS admin_permissions_user_id_idx ON admin_permissions(user_id);