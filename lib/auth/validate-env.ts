export function validateOAuthEnv() {
  const errors: string[] = [];
  
  // Check NextAuth required variables
  if (!process.env.NEXTAUTH_URL) {
    errors.push('NEXTAUTH_URL is not set');
  }
  
  if (!process.env.NEXTAUTH_SECRET && !process.env.AUTH_SECRET) {
    errors.push('NEXTAUTH_SECRET or AUTH_SECRET is not set');
  }
  
  // Check OAuth providers
  const hasGoogle = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;
  const hasGitHub = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;
  
  if (!hasGoogle && !hasGitHub) {
    console.warn('No OAuth providers configured. Users will only be able to sign in with email/password.');
  }
  
  if (process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_SECRET) {
    errors.push('GOOGLE_CLIENT_ID is set but GOOGLE_CLIENT_SECRET is missing');
  }
  
  if (!process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    errors.push('GOOGLE_CLIENT_SECRET is set but GOOGLE_CLIENT_ID is missing');
  }
  
  if (process.env.GITHUB_CLIENT_ID && !process.env.GITHUB_CLIENT_SECRET) {
    errors.push('GITHUB_CLIENT_ID is set but GITHUB_CLIENT_SECRET is missing');
  }
  
  if (!process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    errors.push('GITHUB_CLIENT_SECRET is set but GITHUB_CLIENT_ID is missing');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    providers: {
      google: Boolean(hasGoogle),
      github: Boolean(hasGitHub),
    }
  };
}