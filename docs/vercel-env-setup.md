# Vercel Environment Variables Setup

## OAuth Credentials to Add

Please add the following environment variables to your Vercel project:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `she-sharp` project
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables for **Production** environment:

### Google OAuth
```
GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
```

### GitHub OAuth  
```
GITHUB_CLIENT_ID=[YOUR_GITHUB_CLIENT_ID]
GITHUB_CLIENT_SECRET=[YOUR_GITHUB_CLIENT_SECRET]
```

### NextAuth Configuration
```
NEXTAUTH_URL=https://she-sharp.vercel.app
NEXTAUTH_SECRET=[GENERATE_WITH: openssl rand -base64 32]
```

## Important Notes

⚠️ **Security Warning**: These credentials are sensitive. Never share them publicly or commit them to version control.

## Verification Steps

After adding the environment variables:

1. Trigger a new deployment in Vercel (it should happen automatically)
2. Visit https://she-sharp.vercel.app/sign-in
3. Test the OAuth login buttons:
   - Click "Continue with Google"
   - Click "Continue with GitHub"
4. Verify that users can successfully authenticate

## Google OAuth Notes

- Your Google OAuth is currently in test mode
- Only test users listed in your OAuth consent screen can sign in
- To allow all users, you'll need to publish your OAuth app in Google Cloud Console

## Troubleshooting

If OAuth login fails:
1. Check that all environment variables are correctly set in Vercel
2. Verify the callback URLs match exactly:
   - Google: `https://she-sharp.vercel.app/api/auth/callback/google`
   - GitHub: `https://she-sharp.vercel.app/api/auth/callback/github`
3. Check the Vercel function logs for any errors