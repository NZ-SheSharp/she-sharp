import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const REMEMBER_ME_COOKIE = 'remember_me';
const REMEMBER_ME_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 1 day

interface RememberMeToken {
  userId: number;
  email: string;
  rememberMe: boolean;
}

/**
 * Create a remember me token
 */
export async function createRememberMeToken(
  userId: number,
  email: string,
  rememberMe: boolean = false
): Promise<string> {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
  
  const token = await new SignJWT({
    userId,
    email,
    rememberMe,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(rememberMe ? '30d' : '1d')
    .sign(secret);

  return token;
}

/**
 * Set remember me cookie
 */
export async function setRememberMeCookie(
  userId: number,
  email: string,
  rememberMe: boolean = false
) {
  const token = await createRememberMeToken(userId, email, rememberMe);
  const cookieStore = await cookies();
  
  cookieStore.set(REMEMBER_ME_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: rememberMe ? REMEMBER_ME_DURATION : SESSION_DURATION,
    path: '/',
  });
}

/**
 * Get remember me token from cookie
 */
export async function getRememberMeToken(): Promise<RememberMeToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(REMEMBER_ME_COOKIE);
  
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
    const { payload } = await jwtVerify(token.value, secret);
    
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      rememberMe: payload.rememberMe as boolean,
    };
  } catch {
    return null;
  }
}

/**
 * Clear remember me cookie
 */
export async function clearRememberMeCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(REMEMBER_ME_COOKIE);
}

/**
 * Extend session if remember me is enabled
 */
export async function extendSessionIfNeeded() {
  const token = await getRememberMeToken();
  
  if (token && token.rememberMe) {
    // Refresh the token with new expiration
    await setRememberMeCookie(token.userId, token.email, true);
    return true;
  }
  
  return false;
}