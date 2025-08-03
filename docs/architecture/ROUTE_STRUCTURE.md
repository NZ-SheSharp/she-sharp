# She Sharp Route Structure

## Navigation Hierarchy

### 1. About
- **Our Mission**: `/about` ✓
- **Meet the Team**: `/about#team` ✓
- **Impact Report**: `/media/impact-report` ✓

### 2. Programs
- **All Events**: `/events` ✓
- **Google Educator Conference**: `/events/google-educator` ✓
  - 2023 Conference: `/events/google-educator/2023` ✓
  - 2024 Conference: `/events/google-educator/2024` ✓
- **Mentorship Program**: `/mentorship` ✓
  - Become a Mentor: `/mentorship/mentors` ✓
  - Join as Mentee: `/mentorship/mentee` ✓

### 3. Get Involved
- **Become a Mentor**: `/mentorship/mentors` ✓
- **Join as Mentee**: `/mentorship/mentee` ✓
- **Volunteer with Us**: `/join-our-team` ✓
- **Corporate Partnership**: `/sponsors/corporate-sponsorship` ✓

### 4. Resources
- **Podcasts**: `/media/podcasts` ✓
- **Newsletters**: `/media/newsletters` ✓
- **Photo Gallery**: `/media/photo-gallery` ✓
- **In the Press**: `/media/news-and-press` ✓

### 5. Contact
- **Contact Page**: `/contact` ✓

### Action Buttons
- **Upcoming Events**: `/events` ✓
- **Support Us**: `/donate` ✓

## Legal Pages (Footer Only)
- Privacy Policy: `/privacy-policy` ✓
- Cookie Policy: `/cookie-policy` ✓
- Terms of Service: `/terms-of-service` ✓
- Accessibility: `/accessibility` ✓

## Authentication Pages (Not in Navigation)
- Sign In: `/sign-in` ✓
- Sign Up: `/sign-up` ✓

## Dashboard Pages (Protected Routes)
- Dashboard Home: `/dashboard` ✓
- Activity: `/dashboard/activity` ✓
- General Settings: `/dashboard/general` ✓
- Security: `/dashboard/security` ✓
- Pricing: `/pricing` ✓

## Route Optimization Needed

### 1. Media Routes Issue
- **Current**: `/media/impact-report` is separated from other media pages
- **Solution**: Move impact report to be consistent with other media pages

### 2. Missing Media Hub Page
- Need to create `/media` page as a hub for all media resources

### 3. Breadcrumb Navigation Needed
- Events pages
- Mentorship pages
- Media pages

### 4. Internal Link Updates Needed
- Update any hardcoded links to match new navigation structure
- Ensure consistent naming across all pages