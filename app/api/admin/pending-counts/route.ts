import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { 
  mentorProfiles, 
  eventRegistrations, 
  users,
  userRoles,
  mentorshipRelationships
} from '@/lib/db/schema';
import { eq, and, isNull, count } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin permissions
    const adminRole = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, user.id),
          eq(userRoles.roleType, 'admin'),
          eq(userRoles.isActive, true)
        )
      )
      .limit(1);

    if (!adminRole.length) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch pending mentor applications
    const pendingMentors = await db
      .select({ count: count() })
      .from(mentorProfiles)
      .where(isNull(mentorProfiles.verifiedAt));

    // Fetch total users count
    const totalUsers = await db
      .select({ count: count() })
      .from(users);

    // Fetch pending mentorship relationships
    const pendingRelationships = await db
      .select({ count: count() })
      .from(mentorshipRelationships)
      .where(eq(mentorshipRelationships.status, 'pending'));

    return NextResponse.json({
      mentorApplications: pendingMentors[0]?.count || 0,
      '/dashboard/admin/users': totalUsers[0]?.count || 0,
      pendingRelationships: pendingRelationships[0]?.count || 0,
    });
  } catch (error) {
    console.error('Failed to fetch pending counts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}