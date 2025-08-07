-- Add missing columns to user_memberships table
ALTER TABLE user_memberships 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS last_payment_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS next_billing_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP;