import { db } from '@/lib/db/drizzle';
import { userRoles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Check if user has activated any roles
 */
export async function hasActiveRoles(userId: number): Promise<boolean> {
  const roles = await db
    .select()
    .from(userRoles)
    .where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.isActive, true)
      )
    )
    .limit(1);
  
  return roles.length > 0;
}

/**
 * Get user's active roles
 */
export async function getUserActiveRoles(userId: number): Promise<string[]> {
  const roles = await db
    .select()
    .from(userRoles)
    .where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.isActive, true)
      )
    );
  
  return roles.map(r => r.roleType);
}