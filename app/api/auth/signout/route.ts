import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Delete all session-related cookies
    // 1. Delete custom session cookie
    cookieStore.delete('session');
    
    // 2. Delete NextAuth session cookies (both secure and non-secure variants)
    cookieStore.delete('authjs.session-token');
    cookieStore.delete('__Secure-authjs.session-token');
    
    // 3. Delete NextAuth callback and CSRF cookies
    cookieStore.delete('authjs.callback-url');
    cookieStore.delete('__Secure-authjs.callback-url');
    cookieStore.delete('authjs.csrf-token');
    cookieStore.delete('__Secure-authjs.csrf-token');
    
    // 4. Also try to delete with explicit path and domain settings
    const cookieOptions = {
      path: '/',
      // Remove domain to let browser handle it
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      httpOnly: true,
    };
    
    // Set cookies to expire immediately
    cookieStore.set('authjs.session-token', '', { ...cookieOptions, maxAge: 0 });
    cookieStore.set('__Secure-authjs.session-token', '', { ...cookieOptions, maxAge: 0 });
    cookieStore.set('session', '', { ...cookieOptions, maxAge: 0 });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    );
  }
}