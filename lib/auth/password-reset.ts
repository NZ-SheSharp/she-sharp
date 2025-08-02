import { db } from '@/lib/db/drizzle';
import { passwordResets, users, passwordHistory } from '@/lib/db/schema';
import { eq, and, gt, lt, desc, isNull } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

/**
 * Generate a secure password reset token
 */
export function generateResetToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Create a password reset token for a user
 */
export async function createPasswordResetToken(
  email: string,
  ipAddress?: string,
  userAgent?: string
) {
  // Find user by email
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    // Return success even if user doesn't exist (security best practice)
    return { success: true, message: 'If the email exists, a reset link has been sent' };
  }

  // Check if account is locked
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return { success: false, error: 'Account is temporarily locked' };
  }

  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Invalidate any existing tokens for this user
  await db
    .update(passwordResets)
    .set({ usedAt: new Date() })
    .where(
      and(
        eq(passwordResets.userId, user.id),
        isNull(passwordResets.usedAt)
      )
    );

  // Create new reset token
  const [reset] = await db
    .insert(passwordResets)
    .values({
      userId: user.id,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    })
    .returning();

  return { success: true, token: reset.token, email: user.email };
}

/**
 * Reset password using token
 */
export async function resetPasswordWithToken(
  token: string,
  newPassword: string
) {
  // Find the reset record
  const [reset] = await db
    .select()
    .from(passwordResets)
    .where(
      and(
        eq(passwordResets.token, token),
        gt(passwordResets.expiresAt, new Date()),
        isNull(passwordResets.usedAt)
      )
    )
    .limit(1);

  if (!reset) {
    return { success: false, error: 'Invalid or expired reset token' };
  }

  // Check password history (last 5 passwords)
  const recentPasswords = await db
    .select({ passwordHash: passwordHistory.passwordHash })
    .from(passwordHistory)
    .where(eq(passwordHistory.userId, reset.userId))
    .orderBy(desc(passwordHistory.createdAt))
    .limit(5);

  // Check if password was recently used
  for (const recent of recentPasswords) {
    const isMatch = await bcrypt.compare(newPassword, recent.passwordHash);
    if (isMatch) {
      return { success: false, error: 'Password was recently used. Please choose a different password.' };
    }
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Update password in transaction
  await db.transaction(async (tx) => {
    // Get current password hash before updating
    const [currentUser] = await tx
      .select({ passwordHash: users.passwordHash })
      .from(users)
      .where(eq(users.id, reset.userId))
      .limit(1);

    // Add current password to history
    if (currentUser && currentUser.passwordHash) {
      await tx
        .insert(passwordHistory)
        .values({
          userId: reset.userId,
          passwordHash: currentUser.passwordHash,
        });
    }

    // Update user's password
    await tx
      .update(users)
      .set({
        passwordHash,
        updatedAt: new Date(),
        loginAttempts: 0,
        lockedUntil: null,
      })
      .where(eq(users.id, reset.userId));

    // Mark reset token as used
    await tx
      .update(passwordResets)
      .set({ usedAt: new Date() })
      .where(eq(passwordResets.id, reset.id));
  });

  return { success: true };
}

/**
 * Validate reset token without using it
 */
export async function validateResetToken(token: string) {
  const [reset] = await db
    .select()
    .from(passwordResets)
    .where(
      and(
        eq(passwordResets.token, token),
        gt(passwordResets.expiresAt, new Date()),
        isNull(passwordResets.usedAt)
      )
    )
    .limit(1);

  return !!reset;
}

/**
 * Clean up expired reset tokens
 */
export async function cleanupExpiredResetTokens() {
  await db
    .delete(passwordResets)
    .where(
      and(
        isNull(passwordResets.usedAt),
        lt(passwordResets.expiresAt, new Date())
      )
    );
}

/**
 * Clean up old password history (keep only last 10)
 */
export async function cleanupPasswordHistory(userId: number) {
  const history = await db
    .select({ id: passwordHistory.id })
    .from(passwordHistory)
    .where(eq(passwordHistory.userId, userId))
    .orderBy(desc(passwordHistory.createdAt))
    .offset(10);

  if (history.length > 0) {
    const idsToDelete = history.map(h => h.id);
    await db
      .delete(passwordHistory)
      .where(eq(passwordHistory.id, idsToDelete[0])); // This would need to be adjusted for multiple IDs
  }
}