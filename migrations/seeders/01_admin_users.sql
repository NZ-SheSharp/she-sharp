-- Admin Users Seed Data
-- Created: 2025-08-02
-- This file creates initial admin users for the She Sharp platform

-- Note: These are example admin users with hashed passwords
-- Default password for all test users: "SheSh@rp2025!"
-- Password hash generated using bcrypt with 10 rounds

-- Insert admin team
INSERT INTO "teams" (name, created_at, updated_at)
VALUES ('She Sharp Admin Team', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Get the admin team ID
DO $$
DECLARE
    admin_team_id integer;
    admin_user_id integer;
BEGIN
    -- Get admin team ID
    SELECT id INTO admin_team_id FROM "teams" WHERE name = 'She Sharp Admin Team' LIMIT 1;
    
    -- Insert admin user
    INSERT INTO "users" (
        name,
        email,
        password_hash,
        role,
        email_verified_at,
        created_at,
        updated_at
    ) VALUES (
        'Admin User',
        'admin@shesharp.org',
        '$2a$10$YourHashedPasswordHere', -- Replace with actual bcrypt hash
        'admin',
        NOW(),
        NOW(),
        NOW()
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO admin_user_id;
    
    -- Add admin to team if user was created
    IF admin_user_id IS NOT NULL THEN
        INSERT INTO "team_members" (user_id, team_id, role, joined_at)
        VALUES (admin_user_id, admin_team_id, 'owner', NOW())
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Log the seeding activity
INSERT INTO "activity_logs" (team_id, action, timestamp)
SELECT id, 'SEED_DATA_APPLIED', NOW()
FROM "teams"
WHERE name = 'She Sharp Admin Team'
LIMIT 1;