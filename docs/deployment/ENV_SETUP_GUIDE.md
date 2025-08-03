# 🔧 Environment Configuration Guide

## Quick Setup

### For New Developers

1. **Copy the template**:
   ```bash
   cp .env.local.template .env.local
   ```

2. **Fill in your credentials** in `.env.local`

3. **Start development**:
   ```bash
   pnpm install
   pnpm db:setup
   pnpm dev
   ```

## Environment Files Structure

### Files You Should Edit
- `.env.local` - Your local development configuration (git-ignored)

### Template Files (Reference Only)
- `.env.example` - Basic template with placeholders
- `.env.local.template` - Detailed template with instructions

### Files You Should NOT Edit
- `.env` - Production configuration (git-ignored)
- Any files in `.env-backups/` - Backup directory (git-ignored)

## Available Templates

| Template | Purpose | Location |
|----------|---------|----------|
| Basic | Quick reference | `.env.example` |
| Detailed | Full instructions | `.env.local.template` |

## Security Notes

⚠️ **NEVER commit real credentials to Git**

✅ Safe to commit:
- `.env.example`
- `.env.local.template`
- This guide

❌ Never commit:
- `.env`
- `.env.local`
- `.env.*.local`
- Any file with real API keys

## Need Help?

- **Full documentation**: See `/docs/deployment/` directory
- **Security guide**: See `/docs/security/SECURITY_CONFIG_GUIDE.md`
- **Compare environments**: Run `pnpm env:compare`

---

*For detailed setup instructions, see [docs/deployment/oauth-setup.md](docs/deployment/oauth-setup.md)*