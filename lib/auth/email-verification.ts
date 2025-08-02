import { db } from '@/lib/db/drizzle';
import { emailVerifications, users } from '@/lib/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { randomBytes } from 'crypto';

/**
 * Generate a secure email verification token
 */
export function generateVerificationToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Create an email verification token for a user
 */
export async function createEmailVerificationToken(userId: number) {
  const token = generateVerificationToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Invalidate any existing tokens for this user
  await db
    .update(emailVerifications)
    .set({ verifiedAt: new Date() })
    .where(
      and(
        eq(emailVerifications.userId, userId),
        gt(emailVerifications.expiresAt, new Date())
      )
    );

  // Create new verification token
  const [verification] = await db
    .insert(emailVerifications)
    .values({
      userId,
      token,
      expiresAt,
    })
    .returning();

  return verification;
}

/**
 * Verify an email verification token
 */
export async function verifyEmailToken(token: string) {
  // Find the verification record
  const [verification] = await db
    .select()
    .from(emailVerifications)
    .where(
      and(
        eq(emailVerifications.token, token),
        gt(emailVerifications.expiresAt, new Date())
      )
    )
    .limit(1);

  if (!verification || verification.verifiedAt) {
    return { success: false, error: 'Invalid or expired verification token' };
  }

  // Mark email as verified
  await db.transaction(async (tx) => {
    // Update user's email verified status
    await tx
      .update(users)
      .set({
        emailVerifiedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, verification.userId));

    // Mark verification token as used
    await tx
      .update(emailVerifications)
      .set({ verifiedAt: new Date() })
      .where(eq(emailVerifications.id, verification.id));
  });

  return { success: true, userId: verification.userId };
}

/**
 * Check if a user's email is verified
 */
export async function isEmailVerified(userId: number): Promise<boolean> {
  const [user] = await db
    .select({ emailVerifiedAt: users.emailVerifiedAt })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return !!user?.emailVerifiedAt;
}

/**
 * Clean up expired verification tokens
 */
export async function cleanupExpiredVerificationTokens() {
  await db
    .delete(emailVerifications)
    .where(
      and(
        eq(emailVerifications.verifiedAt, null),
        gt(new Date(), emailVerifications.expiresAt)
      )
    );
}