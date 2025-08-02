import { db } from '@/lib/db/drizzle';
import { passwordHistory, users } from '@/lib/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { comparePasswords, hashPassword } from '@/lib/auth/session';

const PASSWORD_HISTORY_LIMIT = 5; // Remember last 5 passwords
const PASSWORD_REUSE_DAYS = 90; // Can't reuse password for 90 days

/**
 * Check if a password has been used before
 */
export async function isPasswordReused(
  userId: number,
  newPassword: string
): Promise<{ isReused: boolean; message?: string }> {
  // Get password history for the user
  const history = await db
    .select()
    .from(passwordHistory)
    .where(eq(passwordHistory.userId, userId))
    .orderBy(desc(passwordHistory.createdAt))
    .limit(PASSWORD_HISTORY_LIMIT);

  // Check against each historical password
  for (const record of history) {
    const isMatch = await comparePasswords(newPassword, record.passwordHash);
    if (isMatch) {
      const daysSinceUsed = Math.floor(
        (Date.now() - record.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceUsed < PASSWORD_REUSE_DAYS) {
        return {
          isReused: true,
          message: `This password was used ${daysSinceUsed} days ago. You cannot reuse passwords for ${PASSWORD_REUSE_DAYS} days.`,
        };
      }
    }
  }

  // Also check current password
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (user && user.passwordHash) {
    const isCurrentPassword = await comparePasswords(newPassword, user.passwordHash);
    if (isCurrentPassword) {
      return {
        isReused: true,
        message: 'New password must be different from your current password.',
      };
    }
  }

  return { isReused: false };
}

/**
 * Add password to history
 */
export async function addPasswordToHistory(
  userId: number,
  passwordHash: string
): Promise<void> {
  // Add new password to history
  await db.insert(passwordHistory).values({
    userId,
    passwordHash,
  });

  // Clean up old password history (keep only last N passwords)
  const allHistory = await db
    .select()
    .from(passwordHistory)
    .where(eq(passwordHistory.userId, userId))
    .orderBy(desc(passwordHistory.createdAt));

  if (allHistory.length > PASSWORD_HISTORY_LIMIT) {
    const idsToDelete = allHistory
      .slice(PASSWORD_HISTORY_LIMIT)
      .map(record => record.id);

    if (idsToDelete.length > 0) {
      await db
        .delete(passwordHistory)
        .where(
          sql`${passwordHistory.id} IN (${sql.join(idsToDelete, sql`, `)})`
        );
    }
  }
}

/**
 * Update password with history tracking
 */
export async function updatePasswordWithHistory(
  userId: number,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  // Check if password is reused
  const reuseCheck = await isPasswordReused(userId, newPassword);
  if (reuseCheck.isReused) {
    return {
      success: false,
      error: reuseCheck.message,
    };
  }

  // Get current password hash before updating
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  // Add current password to history
  if (user.passwordHash) {
    await addPasswordToHistory(userId, user.passwordHash);
  }

  // Hash and update new password
  const newPasswordHash = await hashPassword(newPassword);
  await db
    .update(users)
    .set({ passwordHash: newPasswordHash })
    .where(eq(users.id, userId));

  return { success: true };
}

/**
 * Get password history for a user
 */
export async function getPasswordHistory(userId: number) {
  return await db
    .select({
      id: passwordHistory.id,
      createdAt: passwordHistory.createdAt,
    })
    .from(passwordHistory)
    .where(eq(passwordHistory.userId, userId))
    .orderBy(desc(passwordHistory.createdAt))
    .limit(PASSWORD_HISTORY_LIMIT);
}

/**
 * Clear password history for a user
 */
export async function clearPasswordHistory(userId: number): Promise<void> {
  await db
    .delete(passwordHistory)
    .where(eq(passwordHistory.userId, userId));
}