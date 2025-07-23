# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

She Sharp is a non-profit organization website dedicated to bridging the gender gap in STEM fields. Built with Next.js 15.4.0 and TypeScript, the platform serves as a hub for women in technology, offering mentorship programs, networking events, and career development resources.

## Essential Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development
pnpm dev              # Start development server with Turbopack

# Database operations
pnpm db:setup         # Initial database setup
pnpm db:generate      # Generate Drizzle migrations from schema changes
pnpm db:migrate       # Apply database migrations
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Drizzle Studio for database management

# Build
pnpm build            # Production build
pnpm start            # Start production server
```

## Key Features

### Public-Facing Features
- **About Pages**: Organization mission, team, and volunteer information
- **Mentorship Program**: Mentor profiles and mentee application system
- **Events Platform**: Upcoming events and special programs (e.g., THRIVE)
- **Media Hub**: Podcasts, newsletters, photo galleries, and press coverage
- **Support Options**: Donation and corporate sponsorship pages
- **Contact System**: Contact forms and social media integration

### Technology Stack
- **Framework**: Next.js 15.4.0 with App Router
- **Language**: TypeScript with strict mode
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Custom JWT-based implementation using `@node-rs/argon2`
- **Payments**: Stripe integration for donations and sponsorships
- **UI**: shadcn/ui components with custom Tailwind CSS v4 theme
- **Styling**: Tailwind CSS with PostCSS and custom brand colors

### Core Architecture Patterns

1. **Authentication Flow** (`/lib/auth/`):
   - Session management via encrypted JWTs stored in httpOnly cookies
   - Middleware in `middleware.ts` protects routes and manages sessions
   - Sign up/sign in handled in `/app/api/auth/` routes

2. **Multi-tenancy Model**:
   - Users belong to teams through `teamMembers` relation
   - Teams have owners and members with role-based access
   - Activity logging tracks all team-related actions

3. **Database Schema** (`/lib/db/schema.ts`):
   - Core tables: `users`, `teams`, `teamMembers`, `activityLogs`, `invitations`
   - Uses Drizzle ORM with type-safe queries in `/lib/db/queries.ts`

4. **Payment Integration** (`/lib/payments/`):
   - Stripe customer creation on user signup
   - Subscription management with webhooks
   - Customer portal for self-service

5. **Route Protection**:
   - Public routes: Most content pages (about, events, mentorship, media, support, contact)
   - Protected routes: Dashboard and admin areas under `/(dashboard)`
   - API routes use session validation from `getUser()` for protected operations

### Key Development Patterns

1. **Server Components by Default**: Use `'use client'` only when needed
2. **Data Fetching**: Direct database queries in Server Components
3. **Form Handling**: Server Actions for mutations (see `/lib/actions/`)
4. **Error Handling**: Consistent error boundaries and try-catch in Server Actions
5. **Type Safety**: Leverage TypeScript and Drizzle's type inference

### Environment Configuration

Required environment variables (see `.env.example`):
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe API key
- `STRIPE_WEBHOOK_SECRET`: For webhook validation
- `BASE_URL`: Application URL for redirects
- `AUTH_SECRET`: For JWT encryption

### Common Modifications

1. **Adding new database tables**: 
   - Define schema in `/lib/db/schema.ts`
   - Run `pnpm db:generate` then `pnpm db:migrate`

2. **Adding new public pages**:
   - Create under `/app/` following existing page structure
   - Use consistent layout and component patterns

3. **Adding new protected/admin features**:
   - Create under `/app/(dashboard)/`
   - Routes automatically protected by middleware

4. **Modifying authentication**:
   - Core logic in `/lib/auth/session.ts`
   - Update middleware for route protection rules

5. **Adding new UI components**:
   - Use shadcn/ui CLI or manually add to `/components/ui/`
   - Follow existing component patterns and brand colors

### Brand Guidelines

**Colors** (defined in Tailwind config):
- Purple Dark: #9b2e83 (primary brand color)
- Purple Mid/Light: Various shades for gradients
- Periwinkle: Accent color
- Navy, Mint: Supporting colors

**Key Statistics**:
- 2200+ Members
- 50+ Sponsors
- 84+ Events Since 2014

**Core Commitments**:
1. **Connection**: Building professional networks
2. **Inspiration**: Showcasing STEM careers
3. **Empowerment**: Career development support