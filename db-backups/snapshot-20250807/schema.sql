-- Database Schema Snapshot
-- Created: 2025-08-07T10:43:10.738Z
-- Tables: 18


-- Table: account
CREATE TABLE IF NOT EXISTS account (
  user_id integer NOT NULL,
  type character varying(255) NOT NULL,
  provider character varying(255) NOT NULL,
  provider_account_id character varying(255) NOT NULL,
  refresh_token text,
  access_token text,
  expires_at integer,
  token_type character varying(255),
  scope character varying(255),
  id_token text,
  session_state character varying(255)
);
-- Constraint: account_provider_provider_account_id_pk (PRIMARY KEY)
-- Constraint: account_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_32768_1_not_null (CHECK)
-- Constraint: 2200_32768_2_not_null (CHECK)
-- Constraint: 2200_32768_3_not_null (CHECK)
-- Constraint: 2200_32768_4_not_null (CHECK)

-- Table: activity_logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id integer NOT NULL DEFAULT nextval('activity_logs_id_seq'::regclass),
  user_id integer,
  action text NOT NULL,
  timestamp timestamp without time zone NOT NULL DEFAULT now(),
  ip_address character varying(45),
  entity_type character varying(50),
  entity_id integer,
  metadata jsonb
);
-- Constraint: activity_logs_pkey (PRIMARY KEY)
-- Constraint: activity_logs_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_24587_1_not_null (CHECK)
-- Constraint: 2200_24587_4_not_null (CHECK)
-- Constraint: 2200_24587_5_not_null (CHECK)

-- Table: admin_permissions
CREATE TABLE IF NOT EXISTS admin_permissions (
  id integer NOT NULL DEFAULT nextval('admin_permissions_id_seq'::regclass),
  user_id integer NOT NULL,
  can_view_all_data boolean DEFAULT true,
  can_edit_users boolean DEFAULT true,
  can_manage_relationships boolean DEFAULT true,
  can_manage_events boolean DEFAULT true,
  can_manage_resources boolean DEFAULT true,
  can_view_analytics boolean DEFAULT true,
  can_export_data boolean DEFAULT true,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now()
);
-- Constraint: admin_permissions_pkey (PRIMARY KEY)
-- Constraint: admin_permissions_user_id_key (UNIQUE)
-- Constraint: admin_permissions_user_id_fkey (FOREIGN KEY)
-- Constraint: 2200_49307_1_not_null (CHECK)
-- Constraint: 2200_49307_2_not_null (CHECK)
-- Constraint: 2200_49307_10_not_null (CHECK)
-- Constraint: 2200_49307_11_not_null (CHECK)

-- Table: email_verifications
CREATE TABLE IF NOT EXISTS email_verifications (
  id integer NOT NULL DEFAULT nextval('email_verifications_id_seq'::regclass),
  user_id integer NOT NULL,
  token character varying(255) NOT NULL,
  expires_at timestamp without time zone NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  verified_at timestamp without time zone
);
-- Constraint: email_verifications_pkey (PRIMARY KEY)
-- Constraint: email_verifications_token_unique (UNIQUE)
-- Constraint: email_verifications_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_24673_1_not_null (CHECK)
-- Constraint: 2200_24673_2_not_null (CHECK)
-- Constraint: 2200_24673_3_not_null (CHECK)
-- Constraint: 2200_24673_4_not_null (CHECK)
-- Constraint: 2200_24673_5_not_null (CHECK)

-- Table: invitations
CREATE TABLE IF NOT EXISTS invitations (
  id integer NOT NULL DEFAULT nextval('invitations_id_seq'::regclass),
  team_id integer NOT NULL,
  email character varying(255) NOT NULL,
  role character varying(50) NOT NULL,
  invited_by integer NOT NULL,
  invited_at timestamp without time zone NOT NULL DEFAULT now(),
  status character varying(20) NOT NULL DEFAULT 'pending'::character varying
);
-- Constraint: invitations_pkey (PRIMARY KEY)
-- Constraint: invitations_team_id_teams_id_fk (FOREIGN KEY)
-- Constraint: invitations_invited_by_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_24597_1_not_null (CHECK)
-- Constraint: 2200_24597_2_not_null (CHECK)
-- Constraint: 2200_24597_3_not_null (CHECK)
-- Constraint: 2200_24597_4_not_null (CHECK)
-- Constraint: 2200_24597_5_not_null (CHECK)
-- Constraint: 2200_24597_6_not_null (CHECK)
-- Constraint: 2200_24597_7_not_null (CHECK)

-- Table: meetings
CREATE TABLE IF NOT EXISTS meetings (
  id integer NOT NULL DEFAULT nextval('meetings_id_seq'::regclass),
  relationship_id integer NOT NULL,
  scheduled_at timestamp without time zone NOT NULL,
  duration_minutes integer DEFAULT 60,
  meeting_type character varying(50),
  meeting_link character varying(255),
  status character varying(20) DEFAULT 'scheduled'::character varying,
  notes text,
  mentee_attended boolean,
  mentor_attended boolean,
  cancelled_at timestamp without time zone,
  cancelled_by integer,
  cancellation_reason text,
  created_at timestamp without time zone NOT NULL DEFAULT now()
);
-- Constraint: meetings_pkey (PRIMARY KEY)
-- Constraint: meetings_relationship_id_fkey (FOREIGN KEY)
-- Constraint: meetings_cancelled_by_fkey (FOREIGN KEY)
-- Constraint: 2200_49285_1_not_null (CHECK)
-- Constraint: 2200_49285_2_not_null (CHECK)
-- Constraint: 2200_49285_3_not_null (CHECK)
-- Constraint: 2200_49285_14_not_null (CHECK)

-- Table: mentee_profiles
CREATE TABLE IF NOT EXISTS mentee_profiles (
  id integer NOT NULL DEFAULT nextval('mentee_profiles_id_seq'::regclass),
  user_id integer NOT NULL,
  learning_goals jsonb,
  areas_of_interest jsonb,
  current_level character varying(50),
  preferred_expertise_areas jsonb,
  preferred_meeting_frequency character varying(50),
  timezone character varying(50) DEFAULT 'America/Los_Angeles'::character varying,
  linkedin_url character varying(255),
  bio text,
  total_sessions_attended integer DEFAULT 0,
  current_mentor_id integer,
  profile_completed_at timestamp without time zone,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  career_stage character varying(100),
  current_challenge text
);
-- Constraint: mentee_profiles_pkey (PRIMARY KEY)
-- Constraint: mentee_profiles_user_id_key (UNIQUE)
-- Constraint: mentee_profiles_user_id_fkey (FOREIGN KEY)
-- Constraint: mentee_profiles_current_mentor_id_fkey (FOREIGN KEY)
-- Constraint: 2200_49235_1_not_null (CHECK)
-- Constraint: 2200_49235_2_not_null (CHECK)
-- Constraint: 2200_49235_14_not_null (CHECK)
-- Constraint: 2200_49235_15_not_null (CHECK)

-- Table: mentor_profiles
CREATE TABLE IF NOT EXISTS mentor_profiles (
  id integer NOT NULL DEFAULT nextval('mentor_profiles_id_seq'::regclass),
  user_id integer NOT NULL,
  expertise_areas jsonb NOT NULL,
  years_experience integer NOT NULL,
  company character varying(100),
  linkedin_url character varying(255),
  bio text,
  availability_hours_per_month integer DEFAULT 4,
  max_mentees integer DEFAULT 3,
  current_mentees_count integer DEFAULT 0,
  is_accepting_mentees boolean NOT NULL DEFAULT true,
  profile_completed_at timestamp without time zone,
  verified_at timestamp without time zone,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  job_title character varying(200),
  verified_by integer
);
-- Constraint: mentor_profiles_pkey (PRIMARY KEY)
-- Constraint: mentor_profiles_user_id_key (UNIQUE)
-- Constraint: mentor_profiles_user_id_fkey (FOREIGN KEY)
-- Constraint: mentor_profiles_verified_by_fkey (FOREIGN KEY)
-- Constraint: 2200_49210_1_not_null (CHECK)
-- Constraint: 2200_49210_2_not_null (CHECK)
-- Constraint: 2200_49210_3_not_null (CHECK)
-- Constraint: 2200_49210_4_not_null (CHECK)
-- Constraint: 2200_49210_17_not_null (CHECK)
-- Constraint: 2200_49210_20_not_null (CHECK)
-- Constraint: 2200_49210_21_not_null (CHECK)

-- Table: mentorship_relationships
CREATE TABLE IF NOT EXISTS mentorship_relationships (
  id integer NOT NULL DEFAULT nextval('mentorship_relationships_id_seq'::regclass),
  mentor_id integer NOT NULL,
  mentee_id integer NOT NULL,
  status character varying(20) NOT NULL DEFAULT 'pending'::character varying,
  started_at timestamp without time zone,
  ended_at timestamp without time zone,
  total_meetings integer DEFAULT 0,
  next_meeting_date timestamp without time zone,
  notes text,
  mentee_feedback jsonb,
  mentor_feedback jsonb,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  mentor_user_id integer,
  mentee_user_id integer,
  paused_at timestamp without time zone,
  meeting_frequency character varying(50),
  relationship_goals text,
  mentor_notes text,
  mentee_notes text,
  total_hours numeric DEFAULT 0,
  is_active boolean DEFAULT true
);
-- Constraint: mentorship_relationships_pkey (PRIMARY KEY)
-- Constraint: mentorship_relationships_mentor_id_mentee_id_key (UNIQUE)
-- Constraint: mentorship_relationships_mentor_id_fkey (FOREIGN KEY)
-- Constraint: mentorship_relationships_mentee_id_fkey (FOREIGN KEY)
-- Constraint: mentorship_relationships_mentor_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: mentorship_relationships_mentee_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_49260_1_not_null (CHECK)
-- Constraint: 2200_49260_2_not_null (CHECK)
-- Constraint: 2200_49260_3_not_null (CHECK)
-- Constraint: 2200_49260_4_not_null (CHECK)
-- Constraint: 2200_49260_12_not_null (CHECK)
-- Constraint: 2200_49260_13_not_null (CHECK)

-- Table: password_history
CREATE TABLE IF NOT EXISTS password_history (
  id integer NOT NULL DEFAULT nextval('password_history_id_seq'::regclass),
  user_id integer NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now()
);
-- Constraint: password_history_pkey (PRIMARY KEY)
-- Constraint: password_history_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_24683_1_not_null (CHECK)
-- Constraint: 2200_24683_2_not_null (CHECK)
-- Constraint: 2200_24683_3_not_null (CHECK)
-- Constraint: 2200_24683_4_not_null (CHECK)

-- Table: password_resets
CREATE TABLE IF NOT EXISTS password_resets (
  id integer NOT NULL DEFAULT nextval('password_resets_id_seq'::regclass),
  user_id integer NOT NULL,
  token character varying(255) NOT NULL,
  expires_at timestamp without time zone NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  used_at timestamp without time zone,
  ip_address character varying(45),
  user_agent text
);
-- Constraint: password_resets_pkey (PRIMARY KEY)
-- Constraint: password_resets_token_unique (UNIQUE)
-- Constraint: password_resets_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_24693_1_not_null (CHECK)
-- Constraint: 2200_24693_2_not_null (CHECK)
-- Constraint: 2200_24693_3_not_null (CHECK)
-- Constraint: 2200_24693_4_not_null (CHECK)
-- Constraint: 2200_24693_5_not_null (CHECK)

-- Table: session
CREATE TABLE IF NOT EXISTS session (
  session_token character varying(255) NOT NULL,
  user_id integer NOT NULL,
  expires timestamp without time zone NOT NULL
);
-- Constraint: session_pkey (PRIMARY KEY)
-- Constraint: session_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: 2200_32775_1_not_null (CHECK)
-- Constraint: 2200_32775_2_not_null (CHECK)
-- Constraint: 2200_32775_3_not_null (CHECK)

-- Table: team_members
CREATE TABLE IF NOT EXISTS team_members (
  id integer NOT NULL DEFAULT nextval('team_members_id_seq'::regclass),
  user_id integer NOT NULL,
  team_id integer NOT NULL,
  role character varying(50) NOT NULL,
  joined_at timestamp without time zone NOT NULL DEFAULT now()
);
-- Constraint: team_members_pkey (PRIMARY KEY)
-- Constraint: team_members_user_id_users_id_fk (FOREIGN KEY)
-- Constraint: team_members_team_id_teams_id_fk (FOREIGN KEY)
-- Constraint: 2200_24606_1_not_null (CHECK)
-- Constraint: 2200_24606_2_not_null (CHECK)
-- Constraint: 2200_24606_3_not_null (CHECK)
-- Constraint: 2200_24606_4_not_null (CHECK)
-- Constraint: 2200_24606_5_not_null (CHECK)

-- Table: teams
CREATE TABLE IF NOT EXISTS teams (
  id integer NOT NULL DEFAULT nextval('teams_id_seq'::regclass),
  name character varying(100) NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_product_id text,
  plan_name character varying(50),
  subscription_status character varying(20)
);
-- Constraint: teams_pkey (PRIMARY KEY)
-- Constraint: teams_stripe_customer_id_unique (UNIQUE)
-- Constraint: teams_stripe_subscription_id_unique (UNIQUE)
-- Constraint: 2200_24614_1_not_null (CHECK)
-- Constraint: 2200_24614_2_not_null (CHECK)
-- Constraint: 2200_24614_3_not_null (CHECK)
-- Constraint: 2200_24614_4_not_null (CHECK)

-- Table: user_memberships
CREATE TABLE IF NOT EXISTS user_memberships (
  id integer NOT NULL DEFAULT nextval('user_memberships_id_seq'::regclass),
  user_id integer NOT NULL,
  tier USER-DEFINED NOT NULL DEFAULT 'free'::membership_tier,
  started_at timestamp without time zone NOT NULL DEFAULT now(),
  expires_at timestamp without time zone,
  auto_renew boolean NOT NULL DEFAULT false,
  stripe_subscription_id character varying(255),
  features_access jsonb,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  stripe_customer_id text,
  last_payment_at timestamp without time zone,
  next_billing_date timestamp without time zone,
  cancelled_at timestamp without time zone
);
-- Constraint: user_memberships_pkey (PRIMARY KEY)
-- Constraint: user_memberships_user_id_key (UNIQUE)
-- Constraint: user_memberships_user_id_fkey (FOREIGN KEY)
-- Constraint: 2200_49189_1_not_null (CHECK)
-- Constraint: 2200_49189_2_not_null (CHECK)
-- Constraint: 2200_49189_3_not_null (CHECK)
-- Constraint: 2200_49189_4_not_null (CHECK)
-- Constraint: 2200_49189_6_not_null (CHECK)
-- Constraint: 2200_49189_9_not_null (CHECK)
-- Constraint: 2200_49189_10_not_null (CHECK)

-- Table: user_roles
CREATE TABLE IF NOT EXISTS user_roles (
  id integer NOT NULL DEFAULT nextval('user_roles_id_seq'::regclass),
  user_id integer NOT NULL,
  role_type USER-DEFINED NOT NULL,
  activated_at timestamp without time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  activation_step integer DEFAULT 0,
  verified_at timestamp without time zone
);
-- Constraint: user_roles_pkey (PRIMARY KEY)
-- Constraint: user_roles_user_id_role_type_key (UNIQUE)
-- Constraint: user_roles_user_id_fkey (FOREIGN KEY)
-- Constraint: 2200_49170_1_not_null (CHECK)
-- Constraint: 2200_49170_2_not_null (CHECK)
-- Constraint: 2200_49170_3_not_null (CHECK)
-- Constraint: 2200_49170_4_not_null (CHECK)
-- Constraint: 2200_49170_5_not_null (CHECK)

-- Table: users
CREATE TABLE IF NOT EXISTS users (
  id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  name character varying(100),
  email character varying(255) NOT NULL,
  password_hash text,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  deleted_at timestamp without time zone,
  email_verified_at timestamp without time zone,
  last_login_at timestamp without time zone,
  login_attempts integer DEFAULT 0,
  locked_until timestamp without time zone,
  email_verified timestamp without time zone,
  image text
);
-- Constraint: users_pkey (PRIMARY KEY)
-- Constraint: users_email_unique (UNIQUE)
-- Constraint: 2200_24629_1_not_null (CHECK)
-- Constraint: 2200_24629_3_not_null (CHECK)
-- Constraint: 2200_24629_6_not_null (CHECK)
-- Constraint: 2200_24629_7_not_null (CHECK)

-- Table: verification_token
CREATE TABLE IF NOT EXISTS verification_token (
  identifier character varying(255) NOT NULL,
  token character varying(255) NOT NULL,
  expires timestamp without time zone NOT NULL
);
-- Constraint: verification_token_identifier_token_pk (PRIMARY KEY)
-- Constraint: 2200_32780_1_not_null (CHECK)
-- Constraint: 2200_32780_2_not_null (CHECK)
-- Constraint: 2200_32780_3_not_null (CHECK)