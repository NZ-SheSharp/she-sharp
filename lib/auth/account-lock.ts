import { db } from '@/lib/db/drizzle';
import { users, activityLogs, ActivityType } from '@/lib/db/schema';
import { eq, and, gt, sql } from 'drizzle-orm';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes

/**
 * Check if an account is locked
 */
export async function isAccountLocked(email: string): Promise<boolean> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return false;
  }

  // Check if account is locked
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return true;
  }

  // If lock has expired, clear it
  if (user.lockedUntil && user.lockedUntil <= new Date()) {
    await db
      .update(users)
      .set({
        lockedUntil: null,
        loginAttempts: 0,
      })
      .where(eq(users.id, user.id));
  }

  return false;
}

/**
 * Record a failed login attempt
 */
export async function recordFailedLoginAttempt(
  email: string,
  ipAddress?: string
): Promise<{ locked: boolean; remainingAttempts: number }> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return { locked: false, remainingAttempts: MAX_LOGIN_ATTEMPTS };
  }

  // Check if we need to reset the attempt counter (outside the window)
  const lastAttemptWithinWindow = user.lastLoginAt && 
    (new Date().getTime() - user.lastLoginAt.getTime()) < ATTEMPT_WINDOW;

  const currentAttempts = lastAttemptWithinWindow 
    ? (user.loginAttempts || 0) + 1 
    : 1;

  const shouldLock = currentAttempts >= MAX_LOGIN_ATTEMPTS;
  const lockedUntil = shouldLock 
    ? new Date(Date.now() + LOCKOUT_DURATION) 
    : null;

  // Update user record
  await db
    .update(users)
    .set({
      loginAttempts: currentAttempts,
      lastLoginAt: new Date(),
      lockedUntil,
    })
    .where(eq(users.id, user.id));

  // Log the failed attempt
  await db.insert(activityLogs).values({
    userId: user.id,
    action: shouldLock ? ActivityType.ACCOUNT_LOCKED : ActivityType.SIGN_IN,
    entityType: 'user',
    entityId: user.id,
    ipAddress: ipAddress || '',
    metadata: { reason: 'Failed login attempt', attempts: currentAttempts }
  });

  return {
    locked: shouldLock,
    remainingAttempts: Math.max(0, MAX_LOGIN_ATTEMPTS - currentAttempts),
  };
}

/**
 * Clear login attempts after successful login
 */
export async function clearLoginAttempts(userId: number): Promise<void> {
  await db
    .update(users)
    .set({
      loginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    })
    .where(eq(users.id, userId));
}

/**
 * Manually lock an account
 */
export async function lockAccount(
  userId: number,
  duration: number = LOCKOUT_DURATION,
  reason?: string
): Promise<void> {
  const lockedUntil = new Date(Date.now() + duration);

  await db
    .update(users)
    .set({
      lockedUntil,
    })
    .where(eq(users.id, userId));

  // Log the lock action
  await db.insert(activityLogs).values({
    userId,
    action: ActivityType.ACCOUNT_LOCKED,
    entityType: 'user',
    entityId: userId,
    ipAddress: 'Manual lock',
    metadata: { reason: reason || 'Manual lock' }
  });
}

/**
 * Manually unlock an account
 */
export async function unlockAccount(userId: number): Promise<void> {
  await db
    .update(users)
    .set({
      lockedUntil: null,
      loginAttempts: 0,
    })
    .where(eq(users.id, userId));

  // Log the unlock action
  await db.insert(activityLogs).values({
    userId,
    action: ActivityType.ACCOUNT_UNLOCKED,
    entityType: 'user',
    entityId: userId,
    ipAddress: 'Manual unlock',
    metadata: { reason: 'Manual unlock' }
  });
}

/**
 * Get lock status and details
 */
export async function getLockStatus(email: string): Promise<{
  isLocked: boolean;
  lockedUntil: Date | null;
  loginAttempts: number;
  remainingAttempts: number;
}> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return {
      isLocked: false,
      lockedUntil: null,
      loginAttempts: 0,
      remainingAttempts: MAX_LOGIN_ATTEMPTS,
    };
  }

  const isLocked = user.lockedUntil ? user.lockedUntil > new Date() : false;

  return {
    isLocked,
    lockedUntil: isLocked ? user.lockedUntil : null,
    loginAttempts: user.loginAttempts || 0,
    remainingAttempts: Math.max(0, MAX_LOGIN_ATTEMPTS - (user.loginAttempts || 0)),
  };
}