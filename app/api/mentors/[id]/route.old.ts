import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mentorProfiles, users, userRoles, mentorshipRelationships } from '@/lib/db/schema';
import { eq, and, or, sql } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mentorId = parseInt(id);
    
    if (isNaN(mentorId)) {
      return NextResponse.json(
        { error: 'Invalid mentor ID' },
        { status: 400 }
      );
    }

    // Get mentor profile with user info
    const [mentor] = await db
      .select({
        id: mentorProfiles.id,
        userId: mentorProfiles.userId,
        name: users.name,
        email: users.email,
        image: users.image,
        expertiseAreas: mentorProfiles.expertiseAreas,
        yearsExperience: mentorProfiles.yearsExperience,
        jobTitle: mentorProfiles.jobTitle,
        company: mentorProfiles.company,
        bio: mentorProfiles.bio,
        linkedinUrl: mentorProfiles.linkedinUrl,
        availabilityHoursPerMonth: mentorProfiles.availabilityHoursPerMonth,
        maxMentees: mentorProfiles.maxMentees,
        currentMenteesCount: mentorProfiles.currentMenteesCount,
        isAcceptingMentees: mentorProfiles.isAcceptingMentees,
        profileCompletedAt: mentorProfiles.profileCompletedAt,
        verifiedAt: mentorProfiles.verifiedAt,
        createdAt: mentorProfiles.createdAt,
      })
      .from(mentorProfiles)
      .innerJoin(users, eq(mentorProfiles.userId, users.id))
      .innerJoin(userRoles, and(
        eq(users.id, userRoles.userId),
        eq(userRoles.roleType, 'mentor'),
        eq(userRoles.isActive, true)
      ))
      .where(eq(mentorProfiles.id, mentorId))
      .limit(1);

    if (!mentor) {
      return NextResponse.json(
        { error: 'Mentor not found' },
        { status: 404 }
      );
    }

    // Check if current user has a relationship with this mentor
    let relationshipStatus = null;
    const currentUser = await getUser();
    
    if (currentUser) {
      const [relationship] = await db
        .select({
          id: mentorshipRelationships.id,
          status: mentorshipRelationships.status,
          startedAt: mentorshipRelationships.startedAt,
        })
        .from(mentorshipRelationships)
        .where(
          and(
            eq(mentorshipRelationships.mentorUserId, mentor.userId),
            eq(mentorshipRelationships.menteeUserId, currentUser.id)
          )
        )
        .limit(1);
      
      if (relationship) {
        relationshipStatus = relationship.status;
      }
    }

    // Get recent mentees count (active relationships)
    const [activeRelationships] = await db
      .select({ count: sql`COUNT(*)` })
      .from(mentorshipRelationships)
      .where(
        and(
          eq(mentorshipRelationships.mentorUserId, mentor.userId),
          eq(mentorshipRelationships.status, 'active')
        )
      );

    const activeMenteesCount = Number(activeRelationships?.count || 0);

    return NextResponse.json({
      mentor: {
        ...mentor,
        activeMenteesCount,
        relationshipStatus,
        spotsAvailable: mentor.maxMentees - activeMenteesCount,
      },
    });
  } catch (error) {
    console.error('Error fetching mentor details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentor details' },
      { status: 500 }
    );
  }
}