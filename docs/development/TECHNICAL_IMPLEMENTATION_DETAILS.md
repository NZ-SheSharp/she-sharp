# Technical Implementation Details - She Sharp Platform

## Database Schema Changes

### Phase 1: Core Tables

#### user_roles
```sql
CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  role_type VARCHAR(20) NOT NULL, -- 'mentor', 'mentee', 'admin'
  is_active BOOLEAN DEFAULT true,
  activated_at TIMESTAMP,
  deactivated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### user_memberships
```sql
CREATE TABLE user_memberships (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
  tier VARCHAR(20) NOT NULL DEFAULT 'free',
  started_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  auto_renew BOOLEAN DEFAULT false,
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active'
);
```

### Phase 2: Mentorship Tables

#### mentor_profiles
```sql
CREATE TABLE mentor_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
  expertise_areas JSONB, -- Array of expertise areas
  years_experience INTEGER,
  company VARCHAR(200),
  job_title VARCHAR(200),
  bio TEXT,
  linkedin_url VARCHAR(500),
  availability_hours_per_month INTEGER,
  max_mentees INTEGER DEFAULT 3,
  current_mentees_count INTEGER DEFAULT 0,
  is_accepting_mentees BOOLEAN DEFAULT true,
  profile_completed_at TIMESTAMP,
  verified_at TIMESTAMP,
  verified_by INTEGER REFERENCES users(id)
);
```

#### mentorship_relationships
```sql
CREATE TABLE mentorship_relationships (
  id SERIAL PRIMARY KEY,
  mentor_user_id INTEGER NOT NULL REFERENCES users(id),
  mentee_user_id INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  paused_at TIMESTAMP,
  meeting_frequency VARCHAR(50),
  next_meeting_date TIMESTAMP,
  relationship_goals TEXT,
  mentor_notes TEXT,
  mentee_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Phase 3: Events and Resources

#### events
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  timezone VARCHAR(50) DEFAULT 'America/Los_Angeles',
  location_type VARCHAR(20) NOT NULL,
  location_details JSONB,
  capacity INTEGER,
  current_registrations INTEGER DEFAULT 0,
  registration_deadline TIMESTAMP,
  waitlist_enabled BOOLEAN DEFAULT false,
  is_members_only BOOLEAN DEFAULT false,
  required_membership_tier VARCHAR(20),
  agenda JSONB,
  speakers JSONB,
  materials JSONB,
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### resources
```sql
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  resource_type VARCHAR(50) NOT NULL,
  file_url VARCHAR(500),
  file_size INTEGER,
  mime_type VARCHAR(100),
  access_level VARCHAR(20) NOT NULL DEFAULT 'member',
  required_roles JSONB,
  categories JSONB,
  tags JSONB,
  uploaded_by INTEGER NOT NULL REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW(),
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2)
);
```

### Phase 4: Meetings and Logs

#### meetings
```sql
CREATE TABLE meetings (
  id SERIAL PRIMARY KEY,
  relationship_id INTEGER NOT NULL REFERENCES mentorship_relationships(id),
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  meeting_type VARCHAR(20) NOT NULL DEFAULT 'regular',
  meeting_link VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
  topics_discussed JSONB,
  goals_set JSONB,
  action_items JSONB,
  mentor_notes TEXT,
  mentee_feedback TEXT,
  rating INTEGER,
  actual_start_time TIMESTAMP,
  actual_end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Phase 5: Notifications

#### notifications
```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  action_label VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);
```

---

## API Endpoints Documentation

### Authentication & User Management

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/signin` | POST | User sign in | No |
| `/api/auth/signup` | POST | User registration | No |
| `/api/auth/signout` | POST | User sign out | Yes |
| `/api/auth/verify-email` | POST | Email verification | No |
| `/api/auth/reset-password` | POST | Password reset | No |
| `/api/user` | GET | Get current user | Yes |
| `/api/user` | PUT | Update user profile | Yes |
| `/api/user/roles` | GET/POST | Manage user roles | Yes |

### Mentorship System

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/mentors` | GET | List all mentors | No |
| `/api/mentors/[id]` | GET | Get mentor details | No |
| `/api/user/mentor-profile` | GET/PUT | Manage own mentor profile | Yes |
| `/api/user/mentee-profile` | GET/PUT | Manage own mentee profile | Yes |
| `/api/mentorship/apply` | POST | Apply for mentorship | Yes |
| `/api/mentorship/approve` | POST | Approve/reject application | Yes |
| `/api/mentorship/relationships` | GET | List relationships | Yes |

### Events Management

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/events` | GET | List events | No |
| `/api/events` | POST | Create event | Admin |
| `/api/events/[id]` | GET | Get event details | No |
| `/api/events/[id]` | PUT | Update event | Admin |
| `/api/events/[id]` | DELETE | Delete event | Admin |
| `/api/events/[id]/register` | POST | Register for event | Yes |
| `/api/events/my-registrations` | GET | User's registrations | Yes |

### Resources

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/resources` | GET | List resources | Yes |
| `/api/resources` | POST | Upload resource | Admin |
| `/api/resources/[id]` | GET | Get resource details | Yes |
| `/api/resources/[id]/download` | GET | Download resource | Yes |

### Meetings

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/meetings` | GET | List meetings | Yes |
| `/api/meetings` | POST | Schedule meeting | Yes |
| `/api/meetings/[id]` | GET | Get meeting details | Yes |
| `/api/meetings/[id]` | PUT | Update meeting | Yes |
| `/api/meetings/[id]` | DELETE | Cancel meeting | Yes |

### Notifications

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/notifications` | GET | List notifications | Yes |
| `/api/notifications` | POST | Mark read/delete | Yes |
| `/api/notifications/preferences` | GET/PUT | Manage preferences | Yes |

### Analytics (Admin Only)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/analytics/dashboard` | GET | Get analytics data | Admin |
| `/api/analytics/dashboard` | POST | Export reports | Admin |
| `/api/activity-logs` | GET | View activity logs | Yes |
| `/api/admin/permissions` | GET/POST/PUT/DELETE | Manage admin permissions | Admin |

---

## Frontend Routes and Pages

### Public Pages
- `/` - Landing page
- `/about` - About organization
- `/events` - Public events listing
- `/mentorship` - Mentorship program info
- `/media` - Media and press
- `/sponsors/corporate-sponsorship` - Sponsorship information
- `/contact` - Contact form

### Authentication Pages
- `/sign-in` - User login
- `/sign-up` - User registration
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/verify-email` - Email verification

### Dashboard Pages (Protected)
- `/dashboard` - Main dashboard
- `/dashboard/onboarding` - New user onboarding
- `/dashboard/account` - Account settings
- `/dashboard/activity` - Activity logs
- `/dashboard/notifications` - Notifications center

### Mentorship Pages
- `/dashboard/mentors` - Browse mentors
- `/dashboard/mentors/[id]` - Mentor profile
- `/dashboard/mentor-profile` - Edit mentor profile
- `/dashboard/mentee-profile` - Edit mentee profile
- `/dashboard/mentorship` - Mentorship dashboard

### Events Pages
- `/dashboard/events` - Browse events
- `/dashboard/events/my-registrations` - My events

### Resources Pages
- `/dashboard/resources` - Resource library
- `/dashboard/resources/downloads` - Download history

### Meetings Pages
- `/dashboard/meetings` - Meeting management

### Admin Pages
- `/dashboard/team/members` - Team management
- `/dashboard/team/settings` - Team settings

---

## Key Components and Services

### Frontend Components

#### Layout Components
- `DashboardLayout` - Main dashboard wrapper
- `DashboardNav` - Navigation sidebar
- `DashboardHeader` - Top header with user menu

#### UI Components (shadcn/ui)
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Button`, `Input`, `Textarea`, `Select`
- `Dialog`, `Alert`, `Toast`
- `Tabs`, `Badge`, `Avatar`
- `Table`, `Form`, `Label`

#### Custom Components
- `MentorCard` - Mentor profile display
- `EventCard` - Event information card
- `ResourceCard` - Resource item display
- `NotificationItem` - Notification display
- `MeetingCard` - Meeting information

### Backend Services

#### NotificationService (`/lib/notifications/service.ts`)
```typescript
class NotificationService {
  static async createNotification(params: CreateNotificationParams)
  static async createBulkNotifications(params: CreateBulkNotificationParams)
  static async queueEmail(params: EmailParams)
  static generateEmailHtml(params: EmailTemplateParams): string
  static async notifyMentorshipRequest(mentorId, menteeId, menteeName)
  static async notifyMentorshipApproval(menteeId, mentorName)
  static async notifyMeetingScheduled(userId, meetingDetails)
  static async notifyEventRegistration(userId, eventName, eventId)
  static async getUnreadCount(userId): Promise<number>
}
```

#### Database Utilities
- `getUser()` - Get authenticated user
- `getActivityLogs()` - Fetch user activity
- `db.execute()` - Raw SQL execution
- `db.select/insert/update/delete` - Drizzle ORM methods

---

## Environment Variables

### Required Variables
```env
# Database
DATABASE_URL=postgresql://...

# Authentication
AUTH_SECRET=...
NEXTAUTH_URL=...

# Stripe (Optional)
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_ID_PREMIUM=...
STRIPE_PRICE_ID_ENTERPRISE=...

# Email (Optional)
EMAIL_FROM=noreply@shesharp.org
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...

# Application
NEXT_PUBLIC_APP_URL=https://shesharp.org
BASE_URL=https://shesharp.org
```

---

## Performance Optimizations

### Database Optimizations
1. **Indexes Created**
   - User email (unique)
   - Relationship user IDs
   - Event dates
   - Resource categories
   - Notification user_id and read status

2. **Query Optimizations**
   - Use of prepared statements
   - Batch operations for bulk inserts
   - Pagination for large datasets
   - Selective field queries

### Frontend Optimizations
1. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting
   - Lazy loading of images

2. **State Management**
   - Local state for UI components
   - Server state with SWR/React Query patterns
   - Optimistic updates for better UX

3. **Rendering Optimizations**
   - Server Components by default
   - Client Components only when needed
   - Suspense boundaries for loading states

### Build Optimizations
1. **Next.js Configuration**
   - Turbopack for faster development
   - Image optimization
   - Font optimization
   - Static generation where possible

2. **TypeScript Configuration**
   - Strict mode enabled
   - Proper type inference
   - No implicit any

---

## Security Implementations

### Authentication & Authorization
- JWT-based session management
- Argon2 password hashing
- Email verification requirement
- Role-based access control (RBAC)
- Admin permission system

### Data Protection
- SQL injection prevention via parameterized queries
- XSS protection through React's default escaping
- CSRF protection in forms
- Input validation and sanitization
- Secure file upload handling

### API Security
- Authentication middleware
- Rate limiting (planned)
- Request validation
- Error message sanitization
- Audit logging

---

## Testing Approach

### Manual Testing Performed
- User registration and login flows
- Mentor application and approval process
- Event registration workflow
- Resource upload and download
- Meeting scheduling
- Notification delivery
- Admin functions

### Database Testing
- Migration scripts tested
- Data integrity verified
- Foreign key constraints validated
- Index performance checked

### Build Testing
- TypeScript compilation
- Next.js build process
- Vercel deployment
- Environment variable validation

---

## Deployment Configuration

### Vercel Settings
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "nodeVersion": "20.x"
}
```

### GitHub Integration
- Automatic deployments from main branch
- Preview deployments for pull requests
- Environment variable sync
- Build status checks

---

## Monitoring and Logging

### Activity Logging
- User actions tracked
- System events recorded
- Error logging implemented
- Audit trail for admin actions

### Analytics Tracking
- User growth metrics
- Feature usage statistics
- Performance metrics
- Error rate monitoring

---

## Known Issues and Limitations

### Current Limitations
1. Email sending requires SMTP configuration
2. Stripe integration needs API keys
3. File uploads stored locally (needs cloud storage)
4. No real-time updates (websockets not implemented)
5. Limited mobile responsiveness in some areas

### Technical Debt
1. Some components need refactoring for reusability
2. Test coverage needs improvement
3. Documentation needs expansion
4. Performance monitoring needs implementation
5. Caching strategy needs refinement

---

## Migration Path from Previous Version

### Database Migrations
1. Run all migration scripts in order
2. Verify table creation
3. Seed initial data
4. Update existing user roles

### Code Updates
1. Pull latest from main branch
2. Install dependencies: `pnpm install`
3. Run database migrations: `pnpm db:migrate`
4. Build project: `pnpm build`
5. Deploy to Vercel

---

## Maintenance Guidelines

### Regular Tasks
1. **Daily**
   - Monitor error logs
   - Check email queue status
   - Review failed notifications

2. **Weekly**
   - Database backup
   - Performance review
   - Security audit logs

3. **Monthly**
   - Dependency updates
   - Security patches
   - User feedback review

### Troubleshooting Guide
1. **Build Failures**
   - Check TypeScript errors
   - Verify environment variables
   - Clear cache and rebuild

2. **Database Issues**
   - Verify connection string
   - Check migration status
   - Review query logs

3. **Authentication Problems**
   - Verify JWT secret
   - Check session middleware
   - Review user permissions

---

*Technical Documentation Version: 1.0.0*
*Last Updated: December 2024*
*Platform Version: 1.0.0*