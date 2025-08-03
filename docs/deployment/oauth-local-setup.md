# OAuth Local Development Setup

## Update OAuth Providers for Local Development

To test OAuth locally, you need to add localhost callback URLs to your OAuth apps:

### Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click on your OAuth 2.0 Client ID (She Sharp)
3. Under **Authorized redirect URIs**, add:
   - `http://localhost:3000/api/auth/callback/google`
4. Click **Save**

### GitHub OAuth Configuration  

For GitHub, you have two options:

**Option 1: Update existing app (Recommended for development)**
1. Go to [GitHub OAuth Apps](https://github.com/settings/developers)
2. Click on "She Sharp"
3. Change **Authorization callback URL** to:
   - `http://localhost:3000/api/auth/callback/github`
4. Click **Update application**

**Option 2: Create separate development app**
1. Create a new OAuth App called "She Sharp Dev"
2. Set Homepage URL: `http://localhost:3000`
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Use the new Client ID and Secret in your local .env.local file

## Testing OAuth Locally

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000/sign-in

3. Test both OAuth providers:
   - Click "Continue with Google"
   - Click "Continue with GitHub"

## Important Notes

- **Google OAuth**: Supports multiple redirect URIs, so you can have both localhost and production URLs
- **GitHub OAuth**: Only supports one callback URL at a time, so you'll need to switch between development and production URLs or use separate apps
- Remember to update `NEXTAUTH_URL` in `.env.local`:
  - Local: `NEXTAUTH_URL="http://localhost:3000"`
  - Production: `NEXTAUTH_URL="https://she-sharp.vercel.app"`

## Deployment Checklist

Before deploying to production:
1. ✅ OAuth credentials added to Vercel environment variables
2. ✅ GitHub OAuth callback URL set to production URL
3. ✅ Google OAuth has both localhost and production redirect URIs
4. ✅ NEXTAUTH_URL in Vercel set to `https://she-sharp.vercel.app`