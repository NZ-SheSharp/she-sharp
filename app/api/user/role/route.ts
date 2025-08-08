import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { userRoles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ roles: [] }, { status: 200 });
    }

    // Fetch all active roles for the user
    const roles = await db
      .select({
        roleType: userRoles.roleType,
      })
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, user.id),
          eq(userRoles.isActive, true)
        )
      );

    const roleTypes = roles.map(r => r.roleType);

    return NextResponse.json({ 
      roles: roleTypes,
      isAdmin: roleTypes.includes('admin'),
      isMentor: roleTypes.includes('mentor'),
      isMentee: roleTypes.includes('mentee'),
    });
  } catch (error) {
    console.error('Failed to fetch user roles:', error);
    return NextResponse.json({ roles: [] }, { status: 200 });
  }
}