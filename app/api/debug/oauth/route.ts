import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  
  const googleCallbackUrl = `${origin}/api/auth/callback/google`;
  const githubCallbackUrl = `${origin}/api/auth/callback/github`;
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    origin,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    authUrl: process.env.AUTH_URL,
    callbackUrls: {
      google: googleCallbackUrl,
      github: githubCallbackUrl,
    },
    headers: {
      host: request.headers.get('host'),
      xForwardedHost: request.headers.get('x-forwarded-host'),
      xForwardedProto: request.headers.get('x-forwarded-proto'),
    }
  });
}