import { db } from '@/lib/db/drizzle';
import { userRoles } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

export async function isUserAdmin(userId: number): Promise<boolean> {
  const adminRole = await db
    .select()
    .from(userRoles)
    .where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.roleType, 'admin'),
        eq(userRoles.isActive, true)
      )
    )
    .limit(1);

  return adminRole.length > 0;
}

export async function getUserRoles(userId: number): Promise<string[]> {
  const roles = await db
    .select({
      roleType: userRoles.roleType,
    })
    .from(userRoles)
    .where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.isActive, true)
      )
    );

  return roles.map(r => r.roleType);
}

export async function getUserRole(userId: number, roleType: 'admin' | 'mentor' | 'mentee'): Promise<boolean> {
  const role = await db
    .select()
    .from(userRoles)
    .where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.roleType, roleType),
        eq(userRoles.isActive, true)
      )
    )
    .limit(1);

  return role.length > 0;
}