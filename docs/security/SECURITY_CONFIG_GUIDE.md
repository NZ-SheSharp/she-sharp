# Security Configuration Guide

## ⚠️ CRITICAL: Never Commit Credentials to Version Control

This guide helps you securely configure OAuth and other sensitive credentials for the She Sharp platform.

## Immediate Actions Required

### 1. Rotate Compromised Credentials

If any credentials have been exposed in version control, immediately:

1. **Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Find your OAuth 2.0 Client ID
   - Click "Reset Secret" to generate a new client secret
   - Update your environment variables with the new secret

2. **GitHub OAuth**:
   - Go to [GitHub OAuth Apps](https://github.com/settings/developers)
   - Select your OAuth app
   - Click "Generate a new client secret"
   - Update your environment variables with the new secret

3. **NextAuth Secret**:
   ```bash
   # Generate a new secret
   openssl rand -base64 32
   ```
   - Update all NextAuth/Auth secret environment variables

### 2. Remove Secrets from Git History

If secrets were committed to Git:

```bash
# Use BFG Repo-Cleaner to remove sensitive data
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Remove all files containing secrets
java -jar bfg.jar --delete-files '*.env' --no-blob-protection
java -jar bfg.jar --replace-text passwords.txt --no-blob-protection

# Clean up the repository
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# Force push to remote (WARNING: This rewrites history)
git push --force-with-lease
```

## Secure Configuration Best Practices

### Environment Variables Setup

1. **Local Development** (.env.local):
   ```bash
   # Copy from template
   cp .env.example .env.local
   
   # Edit with your actual values
   nano .env.local
   ```

2. **Production (Vercel)**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add each variable individually
   - Never expose these in client-side code

### OAuth Configuration

#### Google OAuth Setup
1. Create OAuth 2.0 credentials in Google Cloud Console
2. Add authorized redirect URIs:
   - Production: `https://she-sharp.vercel.app/api/auth/callback/google`
   - Development: `http://localhost:3000/api/auth/callback/google`
3. Store credentials in environment variables only

#### GitHub OAuth Setup
1. Create OAuth App in GitHub Settings
2. Set authorization callback URL
3. Store credentials in environment variables only

### Security Checklist

- [ ] All `.env*` files are in `.gitignore`
- [ ] No actual credentials in documentation files
- [ ] No credentials in code comments
- [ ] Environment variables used for all secrets
- [ ] Different credentials for development and production
- [ ] Regular credential rotation schedule
- [ ] Access logs monitored for suspicious activity

## Documentation Guidelines

When documenting configuration:

1. **Use Placeholders**:
   ```
   GOOGLE_CLIENT_ID=[YOUR_CLIENT_ID]
   GOOGLE_CLIENT_SECRET=[YOUR_CLIENT_SECRET]
   ```

2. **Provide Instructions, Not Values**:
   ```
   # Get your client ID from:
   # https://console.cloud.google.com/apis/credentials
   ```

3. **Reference .env.example**:
   ```
   # See .env.example for required variables
   ```

## Monitoring for Exposed Secrets

### GitHub Secret Scanning
- Enable secret scanning in repository settings
- Review and act on any alerts immediately

### Regular Audits
```bash
# Search for potential secrets in codebase
grep -r "SECRET\|KEY\|TOKEN\|PASSWORD" --include="*.md" docs/
grep -r "sk_\|pk_\|GOCSPX\|ghp_" .
```

### Tools for Secret Detection
- **truffleHog**: Searches for secrets in git history
- **git-secrets**: Prevents secrets from being committed
- **detect-secrets**: Pre-commit hook for secret detection

## Emergency Response Plan

If credentials are exposed:

1. **Immediately rotate all affected credentials**
2. **Audit access logs** for unauthorized use
3. **Notify team members** of the security incident
4. **Review and update** security practices
5. **Document lessons learned**

## Additional Resources

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [OWASP: Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [12 Factor App: Config](https://12factor.net/config)

---

**Remember**: Security is everyone's responsibility. When in doubt, ask for help before committing potentially sensitive information.