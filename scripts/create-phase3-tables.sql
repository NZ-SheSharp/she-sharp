-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('workshop', 'networking', 'mentorship', 'conference', 'social', 'other')),
  
  -- Time and location
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  timezone VARCHAR(50) DEFAULT 'America/Los_Angeles',
  location_type VARCHAR(20) NOT NULL CHECK (location_type IN ('virtual', 'physical', 'hybrid')),
  location_details JSONB,
  
  -- Registration management
  capacity INTEGER,
  current_registrations INTEGER DEFAULT 0,
  registration_deadline TIMESTAMP,
  waitlist_enabled BOOLEAN DEFAULT false,
  
  -- Access control
  is_members_only BOOLEAN DEFAULT false,
  required_membership_tier VARCHAR(20) CHECK (required_membership_tier IN ('basic', 'premium', 'lifetime')),
  
  -- Content
  agenda JSONB,
  speakers JSONB,
  materials JSONB,
  
  -- Statistics
  actual_attendance INTEGER,
  feedback_score DECIMAL(3,2),
  
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  registered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  role_in_event VARCHAR(50),
  
  -- Attendance tracking
  checked_in_at TIMESTAMP,
  checked_out_at TIMESTAMP,
  attendance_duration INTEGER,
  
  -- Feedback
  feedback_submitted BOOLEAN DEFAULT false,
  feedback_score INTEGER,
  feedback_comments TEXT,
  
  certificate_issued BOOLEAN DEFAULT false,
  certificate_url VARCHAR(500),
  
  UNIQUE(event_id, user_id)
);

-- Create resources table  
CREATE TABLE IF NOT EXISTS resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'general',
  resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('document', 'video', 'image', 'presentation', 'code', 'other')),
  
  -- File information
  file_url VARCHAR(500) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  thumbnail_url VARCHAR(500),
  
  -- Access control
  is_public BOOLEAN DEFAULT true,
  is_members_only BOOLEAN DEFAULT false,
  required_membership_tier VARCHAR(20) CHECK (required_membership_tier IN ('basic', 'premium', 'lifetime')),
  
  -- Metadata
  tags JSONB DEFAULT '[]'::jsonb,
  metadata JSONB,
  
  -- Statistics
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  
  uploaded_by INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create resource_access_logs table
CREATE TABLE IF NOT EXISTS resource_access_logs (
  id SERIAL PRIMARY KEY,
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  access_type VARCHAR(20) NOT NULL CHECK (access_type IN ('view', 'download')),
  accessed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS events_type_idx ON events(event_type);
CREATE INDEX IF NOT EXISTS events_start_time_idx ON events(start_time);
CREATE INDEX IF NOT EXISTS events_created_by_idx ON events(created_by);

CREATE INDEX IF NOT EXISTS event_registrations_event_idx ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS event_registrations_user_idx ON event_registrations(user_id);

CREATE INDEX IF NOT EXISTS resources_category_idx ON resources(category);
CREATE INDEX IF NOT EXISTS resources_type_idx ON resources(resource_type);
CREATE INDEX IF NOT EXISTS resources_uploaded_by_idx ON resources(uploaded_by);

CREATE INDEX IF NOT EXISTS resource_access_logs_resource_idx ON resource_access_logs(resource_id);
CREATE INDEX IF NOT EXISTS resource_access_logs_user_idx ON resource_access_logs(user_id);
CREATE INDEX IF NOT EXISTS resource_access_logs_type_idx ON resource_access_logs(access_type);