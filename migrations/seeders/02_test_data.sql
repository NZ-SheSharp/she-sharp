-- Test Data Seed
-- Created: 2025-08-02
-- This file creates test data for development and testing
-- WARNING: Do not run this in production!

-- Check if we're in development mode (you can customize this check)
DO $$
BEGIN
    -- Only proceed if database name contains 'dev' or 'test'
    IF current_database() NOT LIKE '%dev%' AND current_database() NOT LIKE '%test%' THEN
        RAISE NOTICE 'Skipping test data seeding - not a development database';
        RETURN;
    END IF;
    
    -- Insert test teams
    INSERT INTO "teams" (name, created_at, updated_at, plan_name)
    VALUES 
        ('Tech Innovators', NOW(), NOW(), 'free'),
        ('Women in AI', NOW(), NOW(), 'pro'),
        ('STEM Leaders', NOW(), NOW(), 'enterprise')
    ON CONFLICT DO NOTHING;
    
    -- Insert test users
    -- Password for all test users: "Test123!"
    -- Hash: $2a$10$rBnVhN8pJ8Qn5K.8hxVQCukbQRmDYJlXXcQ4FzdmPxHKJOyW7cKZy
    INSERT INTO "users" (name, email, password_hash, role, email_verified_at, created_at, updated_at)
    VALUES
        ('Sarah Johnson', 'sarah@example.com', '$2a$10$rBnVhN8pJ8Qn5K.8hxVQCukbQRmDYJlXXcQ4FzdmPxHKJOyW7cKZy', 'member', NOW(), NOW(), NOW()),
        ('Emily Chen', 'emily@example.com', '$2a$10$rBnVhN8pJ8Qn5K.8hxVQCukbQRmDYJlXXcQ4FzdmPxHKJOyW7cKZy', 'member', NOW(), NOW(), NOW()),
        ('Maria Garcia', 'maria@example.com', '$2a$10$rBnVhN8pJ8Qn5K.8hxVQCukbQRmDYJlXXcQ4FzdmPxHKJOyW7cKZy', 'member', NOW(), NOW(), NOW()),
        ('Jessica Kim', 'jessica@example.com', '$2a$10$rBnVhN8pJ8Qn5K.8hxVQCukbQRmDYJlXXcQ4FzdmPxHKJOyW7cKZy', 'member', NULL, NOW(), NOW()),
        ('Amanda Brown', 'amanda@example.com', '$2a$10$rBnVhN8pJ8Qn5K.8hxVQCukbQRmDYJlXXcQ4FzdmPxHKJOyW7cKZy', 'member', NOW(), NOW(), NOW())
    ON CONFLICT (email) DO NOTHING;
    
    -- Assign users to teams
    INSERT INTO "team_members" (user_id, team_id, role, joined_at)
    SELECT 
        u.id,
        t.id,
        CASE 
            WHEN u.email = 'sarah@example.com' THEN 'owner'
            WHEN u.email = 'emily@example.com' THEN 'owner'
            WHEN u.email = 'maria@example.com' THEN 'owner'
            ELSE 'member'
        END,
        NOW()
    FROM "users" u
    CROSS JOIN "teams" t
    WHERE 
        (u.email = 'sarah@example.com' AND t.name = 'Tech Innovators') OR
        (u.email = 'emily@example.com' AND t.name = 'Women in AI') OR
        (u.email = 'maria@example.com' AND t.name = 'STEM Leaders') OR
        (u.email = 'jessica@example.com' AND t.name = 'Tech Innovators') OR
        (u.email = 'amanda@example.com' AND t.name = 'Women in AI')
    ON CONFLICT DO NOTHING;
    
    -- Create some pending invitations
    INSERT INTO "invitations" (team_id, email, role, invited_by, invited_at, status)
    SELECT 
        t.id,
        'newmember@example.com',
        'member',
        u.id,
        NOW() - INTERVAL '2 days',
        'pending'
    FROM "teams" t
    JOIN "team_members" tm ON t.id = tm.team_id
    JOIN "users" u ON tm.user_id = u.id
    WHERE t.name = 'Tech Innovators' AND tm.role = 'owner'
    LIMIT 1
    ON CONFLICT DO NOTHING;
    
    -- Add some activity logs
    INSERT INTO "activity_logs" (team_id, user_id, action, timestamp, ip_address)
    SELECT 
        tm.team_id,
        tm.user_id,
        unnest(ARRAY['SIGN_IN', 'UPDATE_ACCOUNT', 'INVITE_TEAM_MEMBER']),
        NOW() - (random() * INTERVAL '30 days'),
        '192.168.1.' || floor(random() * 255)::text
    FROM "team_members" tm
    WHERE tm.role = 'owner'
    LIMIT 10;
    
    RAISE NOTICE 'Test data seeded successfully';
END $$;