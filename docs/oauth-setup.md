# OAuth Setup Guide

## Overview
The She Sharp platform now supports OAuth authentication with Google and GitHub. This guide explains how to configure OAuth providers for your deployment.

## Configuration Steps

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure the OAuth consent screen if prompted
6. Select **Web application** as the application type
7. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://she-sharp.vercel.app/api/auth/callback/google`
8. Copy the **Client ID** and **Client Secret**

### 2. GitHub OAuth Setup

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Navigate to **OAuth Apps** > **New OAuth App**
3. Fill in the application details:
   - Application name: She Sharp
   - Homepage URL: `https://she-sharp.vercel.app`
   - Authorization callback URL: `https://she-sharp.vercel.app/api/auth/callback/github`
4. For development, create a separate app with:
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy the **Client ID** and **Client Secret**

### 3. Environment Variables

Add the following to your `.env.local` file:

```env
# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=https://she-sharp.vercel.app  # Use http://localhost:3000 for development
NEXTAUTH_SECRET=your_nextauth_secret_here  # Generate with: openssl rand -base64 32
```

### 4. Vercel Deployment

When deploying to Vercel, add these environment variables in your project settings:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add each OAuth variable for the production environment

## Features Implemented

### OAuth Authentication
- Google Sign-In integration
- GitHub Sign-In integration
- Account linking for existing users with same email
- Seamless registration for new OAuth users

### Security Features
- **Account Locking**: Automatically locks accounts after 5 failed login attempts for 15 minutes
- **Password History**: Prevents reusing the last 5 passwords
- **Password Strength Indicator**: Real-time feedback on password strength
- **Remember Me**: Optional 30-day persistent sessions

### Database Schema
New tables added for OAuth support:
- `accounts`: Stores OAuth provider account links
- `sessions`: Manages NextAuth sessions
- `verificationTokens`: Handles OAuth verification tokens
- `passwordHistory`: Tracks password history for security

## Testing OAuth

1. **Local Development**:
   ```bash
   pnpm dev
   ```
   Navigate to http://localhost:3000/sign-in

2. **Production**:
   Visit https://she-sharp.vercel.app/sign-in

3. **Test Scenarios**:
   - Sign up with OAuth provider
   - Sign in with existing OAuth account
   - Link OAuth to existing email/password account
   - Test account locking with failed attempts
   - Verify password strength requirements

## Troubleshooting

### Common Issues

1. **OAuth redirect mismatch**:
   - Ensure redirect URIs in provider settings match exactly
   - Include both http and https variants if needed

2. **Session not persisting**:
   - Check NEXTAUTH_SECRET is set correctly
   - Verify NEXTAUTH_URL matches your deployment URL

3. **Database errors**:
   - Run `pnpm db:migrate` to ensure all tables exist
   - Check database connection string in DATABASE_URL

## Next Steps

To complete the OAuth setup:
1. Configure OAuth providers in their respective consoles
2. Add the credentials to your environment variables
3. Deploy to Vercel with the updated configuration
4. Test the authentication flow

## Security Notes

- Never commit OAuth credentials to version control
- Use different OAuth apps for development and production
- Regularly rotate your NEXTAUTH_SECRET
- Monitor failed login attempts in the activity logs