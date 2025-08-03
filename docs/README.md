# 📚 She Sharp Documentation

This directory contains all project documentation organized by category.

## 📁 Directory Structure

### `/architecture` - System Architecture & Design
- **ROUTE_STRUCTURE.md** - Application routing structure and page hierarchy

### `/components` - Component Documentation
- **SHADCN_UI_COMPONENT_GUIDE.md** - Guide for using shadcn/ui components
- **OPTIMIZED_SHADCN_STRATEGY.md** - Component selection strategy
- **COMPONENT_USAGE_EXAMPLES.md** - Code examples for common patterns
- **COMPONENT_CHECKLIST.md** - Checklist for each page's components
- **shadcn_components.md** - shadcn/ui component reference

### `/content` - Content Management
- **she-sharp-pages-md/** - Markdown content for all website pages

### `/deployment` - Deployment & Configuration
- **ENV_COMPARISON_REPORT.md** - Environment configuration comparison
- **VERCEL_ENV_UPDATE.md** - Vercel environment update guide
- **google-calendar-setup.md** - Google Calendar integration
- **google-oauth-setup.md** - Google OAuth configuration
- **oauth-local-setup.md** - Local OAuth development setup
- **oauth-setup.md** - OAuth general setup guide
- **oauth-testing-guide.md** - OAuth testing procedures
- **vercel-env-complete.md** - Complete Vercel environment guide
- **vercel-env-setup.md** - Vercel environment setup
- **vercel-oauth-fix.md** - OAuth troubleshooting for Vercel

### `/development` - Development Planning
- **SHE_SHARP_DEVELOPMENT_PLAN.md** - Complete 12-week development roadmap
- **IMMEDIATE_ACTION_PLAN.md** - Quick start guide for development
- **BACKEND_INTEGRATION_PLAN.md** - Plan for integrating backend features
- **COLOR_GUIDE.md** - Color system usage guide

### `/security` - Security Documentation
- **SECURITY_CONFIG_GUIDE.md** - Security configuration best practices
- **URGENT_CREDENTIAL_ROTATION.md** - Emergency credential rotation guide

## 📋 Quick Links

### 🚀 Getting Started
- [Development Plan](./development/SHE_SHARP_DEVELOPMENT_PLAN.md)
- [Environment Setup](./deployment/oauth-setup.md)
- [Local Development](./deployment/oauth-local-setup.md)

### 🏗️ Architecture & Design
- [Route Structure](./architecture/ROUTE_STRUCTURE.md)
- [Component Guide](./components/SHADCN_UI_COMPONENT_GUIDE.md)
- [Color Guide](./development/COLOR_GUIDE.md)

### 🔐 Security
- [Security Configuration](./security/SECURITY_CONFIG_GUIDE.md)
- [Credential Rotation](./security/URGENT_CREDENTIAL_ROTATION.md)

### 🚢 Deployment
- [Vercel Setup](./deployment/vercel-env-setup.md)
- [OAuth Configuration](./deployment/oauth-setup.md)
- [Environment Comparison](./deployment/ENV_COMPARISON_REPORT.md)

## 🛠️ Useful Commands

```bash
# Environment Management
pnpm env:compare        # Compare local and Vercel environments
pnpm env:pull           # Pull latest Vercel configuration

# Database
pnpm db:setup           # Setup database
pnpm db:migrate         # Run migrations
pnpm db:studio          # Open Drizzle Studio

# Development
pnpm dev                # Start development server
pnpm build              # Build for production
```