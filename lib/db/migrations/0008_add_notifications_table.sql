-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'event', 'mentorship', 'resource', 'system', 'meeting'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  action_label VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP,
  
  -- Indexes
  INDEX idx_notifications_user_id (user_id),
  INDEX idx_notifications_read (read),
  INDEX idx_notifications_created_at (created_at DESC)
);

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Email preferences
  email_enabled BOOLEAN DEFAULT TRUE,
  email_events BOOLEAN DEFAULT TRUE,
  email_mentorship BOOLEAN DEFAULT TRUE,
  email_resources BOOLEAN DEFAULT TRUE,
  email_meetings BOOLEAN DEFAULT TRUE,
  email_system BOOLEAN DEFAULT TRUE,
  
  -- In-app preferences
  inapp_enabled BOOLEAN DEFAULT TRUE,
  inapp_events BOOLEAN DEFAULT TRUE,
  inapp_mentorship BOOLEAN DEFAULT TRUE,
  inapp_resources BOOLEAN DEFAULT TRUE,
  inapp_meetings BOOLEAN DEFAULT TRUE,
  inapp_system BOOLEAN DEFAULT TRUE,
  
  -- Frequency settings
  email_frequency VARCHAR(20) DEFAULT 'immediate', -- 'immediate', 'daily', 'weekly'
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  timezone VARCHAR(50) DEFAULT 'America/Los_Angeles',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  INDEX idx_notification_preferences_user_id (user_id)
);

-- Create email queue table for async email sending
CREATE TABLE IF NOT EXISTS email_queue (
  id SERIAL PRIMARY KEY,
  to_email VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) DEFAULT 'noreply@shesharp.org',
  subject VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  priority INTEGER DEFAULT 5, -- 1 (highest) to 10 (lowest)
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sending', 'sent', 'failed'
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  sent_at TIMESTAMP,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  
  INDEX idx_email_queue_status (status),
  INDEX idx_email_queue_priority (priority),
  INDEX idx_email_queue_created_at (created_at)
);