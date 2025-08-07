# OAuth Setup Guide

## Google OAuth Configuration

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your project or create a new one
3. Click on your OAuth 2.0 Client ID (or create one)
4. Add these Authorized redirect URIs:
   - For local development: `http://localhost:3000/api/auth/callback/google`
   - For local dev with port 3001: `http://localhost:3001/api/auth/callback/google`
   - For production: `https://she-sharp.vercel.app/api/auth/callback/google`

### 2. GitHub OAuth Configuration
1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click on your OAuth App (or create one)
3. Set the Authorization callback URLs:
   - For local development: `http://localhost:3000/api/auth/callback/github`
   - For local dev with port 3001: `http://localhost:3001/api/auth/callback/github`
   - For production: `https://she-sharp.vercel.app/api/auth/callback/github`

## Environment Variables

### Local Development (.env.local)
```env
# OAuth Providers Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# NextAuth Configuration for Local Development
NEXTAUTH_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Production (.env.production)
```env
# NextAuth Configuration for Production
NEXTAUTH_URL="https://she-sharp.vercel.app"
AUTH_URL="https://she-sharp.vercel.app"
```

## Troubleshooting

### Port Conflict Issues
If port 3000 is in use:
1. Kill the process using port 3000: `pkill -f "next dev"` or `lsof -ti:3000 | xargs kill`
2. Or run on a different port: `npm run dev -- -p 3001`
3. Make sure to update NEXTAUTH_URL in .env.local to match

### OAuth Callback Error
If you see "Authentication Error" after OAuth login:
1. Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in .env.local
2. Verify NEXTAUTH_URL matches your development URL
3. Ensure callback URLs in Google/GitHub match your local port
4. Clear browser cookies and try again

### Common Issues
- **Wrong redirect URL**: Make sure NEXTAUTH_URL in .env.local matches your local development URL
- **Missing credentials**: Ensure all OAuth environment variables are present in .env.local
- **Port mismatch**: If using port 3001, update NEXTAUTH_URL to `http://localhost:3001`
- **Cache issues**: Clear browser cookies and Next.js cache (`.next` folder)

## Testing OAuth Flow

1. Start development server: `npm run dev`
2. Navigate to `http://localhost:3000/sign-in`
3. Click on Google or GitHub sign-in button
4. After successful OAuth, you should be redirected to:
   - New users → `/dashboard/welcome` (role selection)
   - Existing users with roles → `/dashboard`
   - Existing users without roles → `/dashboard/welcome`