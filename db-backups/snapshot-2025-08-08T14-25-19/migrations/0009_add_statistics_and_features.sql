-- Create event role assignments table for activity-specific roles
CREATE TABLE IF NOT EXISTS event_role_assignments (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_type VARCHAR(50) NOT NULL, -- 'mentor', 'mentee', 'facilitator', 'speaker'
    assigned_at TIMESTAMP DEFAULT NOW(),
    assigned_by INTEGER REFERENCES users(id),
    notes TEXT,
    UNIQUE(event_id, user_id, role_type)
);

-- Create membership features table for tier-based features
CREATE TABLE IF NOT EXISTS membership_features (
    id SERIAL PRIMARY KEY,
    tier membership_tier NOT NULL,
    feature_name VARCHAR(100) NOT NULL,
    feature_value JSONB,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tier, feature_name)
);

-- Create mentorship stats table for caching statistics
CREATE TABLE IF NOT EXISTS user_mentorship_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    mentees_count INTEGER DEFAULT 0,
    mentors_count INTEGER DEFAULT 0,
    total_meetings INTEGER DEFAULT 0,
    completed_meetings INTEGER DEFAULT 0,
    total_meeting_hours DECIMAL(10, 2) DEFAULT 0,
    events_attended INTEGER DEFAULT 0,
    events_registered INTEGER DEFAULT 0,
    resources_uploaded INTEGER DEFAULT 0,
    resources_accessed INTEGER DEFAULT 0,
    last_activity_at TIMESTAMP,
    stats_updated_at TIMESTAMP DEFAULT NOW()
);

-- Create function to update stats
CREATE OR REPLACE FUNCTION update_user_mentorship_stats(p_user_id INTEGER)
RETURNS void AS $$
BEGIN
    INSERT INTO user_mentorship_stats (
        user_id,
        mentees_count,
        mentors_count,
        total_meetings,
        completed_meetings,
        total_meeting_hours,
        events_attended,
        events_registered,
        resources_uploaded,
        resources_accessed,
        last_activity_at,
        stats_updated_at
    )
    SELECT 
        p_user_id,
        COUNT(DISTINCT mr_mentor.id) FILTER (WHERE mr_mentor.status = 'active'),
        COUNT(DISTINCT mr_mentee.id) FILTER (WHERE mr_mentee.status = 'active'),
        COUNT(DISTINCT m.id),
        COUNT(DISTINCT m.id) FILTER (WHERE m.status = 'completed'),
        COALESCE(SUM(m.duration_minutes) FILTER (WHERE m.status = 'completed') / 60.0, 0),
        COUNT(DISTINCT er.event_id) FILTER (WHERE er.checked_in_at IS NOT NULL),
        COUNT(DISTINCT er.event_id),
        COUNT(DISTINCT r.id),
        COUNT(DISTINCT ral.resource_id),
        GREATEST(
            MAX(mr_mentor.updated_at),
            MAX(mr_mentee.updated_at),
            MAX(m.updated_at),
            MAX(er.registered_at),
            MAX(r.uploaded_at),
            MAX(ral.accessed_at)
        ),
        NOW()
    FROM users u
    LEFT JOIN mentorship_relationships mr_mentor ON u.id = mr_mentor.mentor_user_id
    LEFT JOIN mentorship_relationships mr_mentee ON u.id = mr_mentee.mentee_user_id
    LEFT JOIN meetings m ON (mr_mentor.id = m.relationship_id OR mr_mentee.id = m.relationship_id)
    LEFT JOIN event_registrations er ON u.id = er.user_id
    LEFT JOIN resources r ON u.id = r.uploaded_by
    LEFT JOIN resource_access_logs ral ON u.id = ral.user_id
    WHERE u.id = p_user_id
    GROUP BY u.id
    ON CONFLICT (user_id) DO UPDATE SET
        mentees_count = EXCLUDED.mentees_count,
        mentors_count = EXCLUDED.mentors_count,
        total_meetings = EXCLUDED.total_meetings,
        completed_meetings = EXCLUDED.completed_meetings,
        total_meeting_hours = EXCLUDED.total_meeting_hours,
        events_attended = EXCLUDED.events_attended,
        events_registered = EXCLUDED.events_registered,
        resources_uploaded = EXCLUDED.resources_uploaded,
        resources_accessed = EXCLUDED.resources_accessed,
        last_activity_at = EXCLUDED.last_activity_at,
        stats_updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_role_assignments_event_id ON event_role_assignments(event_id);
CREATE INDEX IF NOT EXISTS idx_event_role_assignments_user_id ON event_role_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_event_role_assignments_role_type ON event_role_assignments(role_type);
CREATE INDEX IF NOT EXISTS idx_membership_features_tier ON membership_features(tier);
CREATE INDEX IF NOT EXISTS idx_user_mentorship_stats_user_id ON user_mentorship_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mentorship_stats_updated ON user_mentorship_stats(stats_updated_at);

-- Insert default membership features
INSERT INTO membership_features (tier, feature_name, feature_value, description) VALUES
('free', 'max_mentors', '{"value": 1}', 'Maximum number of mentors a mentee can have'),
('free', 'max_mentees', '{"value": 2}', 'Maximum number of mentees a mentor can have'),
('free', 'monthly_meetings', '{"value": 2}', 'Maximum meetings per month'),
('free', 'resource_access', '{"level": "basic"}', 'Access to basic resources only'),
('free', 'event_priority', '{"priority": 0}', 'No priority registration for events'),

('basic', 'max_mentors', '{"value": 2}', 'Maximum number of mentors a mentee can have'),
('basic', 'max_mentees', '{"value": 5}', 'Maximum number of mentees a mentor can have'),
('basic', 'monthly_meetings', '{"value": 8}', 'Maximum meetings per month'),
('basic', 'resource_access', '{"level": "standard"}', 'Access to standard resources'),
('basic', 'event_priority', '{"priority": 1}', 'Early registration for events'),
('basic', 'meeting_recordings', '{"enabled": true}', 'Access to meeting recordings'),

('premium', 'max_mentors', '{"value": -1}', 'Unlimited mentors'),
('premium', 'max_mentees', '{"value": -1}', 'Unlimited mentees'),
('premium', 'monthly_meetings', '{"value": -1}', 'Unlimited meetings'),
('premium', 'resource_access', '{"level": "premium"}', 'Access to all resources'),
('premium', 'event_priority', '{"priority": 2}', 'Priority registration and reserved seats'),
('premium', 'meeting_recordings', '{"enabled": true}', 'Access to meeting recordings'),
('premium', 'analytics_dashboard', '{"enabled": true}', 'Advanced analytics and insights'),
('premium', 'custom_matching', '{"enabled": true}', 'AI-powered mentor/mentee matching')
ON CONFLICT (tier, feature_name) DO NOTHING;