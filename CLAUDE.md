# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.0 SaaS starter template with TypeScript, featuring authentication, Stripe payments, team management, and activity logging.

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

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.4.0 with App Router
- **Language**: TypeScript with strict mode
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Custom JWT-based implementation using `@node-rs/argon2`
- **Payments**: Stripe integration for subscriptions
- **UI**: shadcn/ui components with Tailwind CSS v4
- **Styling**: Tailwind CSS with PostCSS

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
   - Public routes: `/`, `/sign-in`, `/sign-up`, `/pricing`
   - Protected routes: Everything under `/(dashboard)`
   - API routes use session validation from `getUser()`

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

2. **Adding new protected routes**:
   - Create under `/app/(dashboard)/`
   - Routes automatically protected by middleware

3. **Modifying authentication**:
   - Core logic in `/lib/auth/session.ts`
   - Update middleware for route protection rules

4. **Adding new UI components**:
   - Use shadcn/ui CLI or manually add to `/components/ui/`
   - Follow existing component patterns