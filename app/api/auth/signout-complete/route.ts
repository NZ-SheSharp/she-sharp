import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    
    // Clear all auth-related cookies with various configurations
    const cookieNames = [
      'authjs.session-token',
      '__Secure-authjs.session-token',
      'authjs.callback-url', 
      '__Secure-authjs.callback-url',
      'authjs.csrf-token',
      '__Secure-authjs.csrf-token',
      'session',
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      'next-auth.callback-url',
      '__Secure-next-auth.callback-url',
      'next-auth.csrf-token',
      '__Secure-next-auth.csrf-token'
    ];
    
    // Delete all cookies
    for (const cookieName of cookieNames) {
      try {
        cookieStore.delete(cookieName);
        // Also try with path
        cookieStore.delete({
          name: cookieName,
          path: '/'
        });
      } catch (e) {
        // Ignore errors for non-existent cookies
      }
    }
    
    // Set cookies to expire with various domain configurations
    const isProduction = process.env.NODE_ENV === 'production';
    const baseOptions = {
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    };
    
    // Try multiple cookie configurations to ensure clearing
    const configurations = [
      { ...baseOptions },
      { ...baseOptions, secure: true, sameSite: 'lax' as const },
      { ...baseOptions, secure: isProduction, sameSite: 'lax' as const, httpOnly: true },
    ];
    
    for (const cookieName of cookieNames) {
      for (const config of configurations) {
        try {
          cookieStore.set(cookieName, '', config);
        } catch (e) {
          // Ignore errors
        }
      }
    }
    
    // Return HTML that clears localStorage/sessionStorage and redirects
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Signing out...</title>
        </head>
        <body>
          <script>
            // Clear all client-side storage
            try {
              localStorage.clear();
              sessionStorage.clear();
            } catch (e) {}
            
            // Clear NextAuth client-side session
            try {
              // Broadcast to other tabs
              const bc = new BroadcastChannel('nextauth.message');
              bc.postMessage({ event: 'session', data: { trigger: 'signout' }});
              bc.close();
            } catch (e) {}
            
            // Redirect to home page
            window.location.href = '/';
          </script>
          <p>Signing out...</p>
        </body>
      </html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Complete signout error:', error);
    // Still redirect on error
    return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  }
}