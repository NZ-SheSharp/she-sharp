import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mentorProfiles, users, userRoles, mentorshipRelationships } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
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

    // First, get just the mentor profile
    const [mentorProfile] = await db
      .select()
      .from(mentorProfiles)
      .where(eq(mentorProfiles.id, mentorId))
      .limit(1);

    if (!mentorProfile) {
      return NextResponse.json(
        { error: 'Mentor profile not found' },
        { status: 404 }
      );
    }

    // Get user info separately
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, mentorProfile.userId))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has mentor role active
    const [mentorRole] = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, mentorProfile.userId),
          eq(userRoles.roleType, 'mentor'),
          eq(userRoles.isActive, true)
        )
      )
      .limit(1);

    if (!mentorRole) {
      return NextResponse.json(
        { error: 'Mentor role not active' },
        { status: 404 }
      );
    }

    // Build the mentor object manually to avoid any serialization issues
    const mentor = {
      id: mentorProfile.id,
      userId: mentorProfile.userId,
      name: user.name,
      email: user.email,
      image: user.image || null,
      expertiseAreas: mentorProfile.expertiseAreas || [],
      yearsExperience: mentorProfile.yearsExperience || 0,
      jobTitle: mentorProfile.jobTitle || null,
      company: mentorProfile.company || null,
      bio: mentorProfile.bio || null,
      linkedinUrl: mentorProfile.linkedinUrl || null,
      availabilityHoursPerMonth: mentorProfile.availabilityHoursPerMonth || 0,
      maxMentees: mentorProfile.maxMentees || 3,
      currentMenteesCount: mentorProfile.currentMenteesCount || 0,
      isAcceptingMentees: mentorProfile.isAcceptingMentees || false,
      profileCompletedAt: mentorProfile.profileCompletedAt || null,
      verifiedAt: mentorProfile.verifiedAt || null,
      createdAt: mentorProfile.createdAt || new Date(),
    };

    // Check if current user has a relationship with this mentor
    let relationshipStatus = null;
    const currentUser = await getUser();
    
    if (currentUser) {
      const relationships = await db
        .select()
        .from(mentorshipRelationships)
        .where(
          and(
            eq(mentorshipRelationships.mentorUserId, mentor.userId),
            eq(mentorshipRelationships.menteeUserId, currentUser.id)
          )
        )
        .limit(1);
      
      if (relationships.length > 0) {
        relationshipStatus = relationships[0].status;
      }
    }

    // Get active mentees count
    const activeRelationships = await db
      .select()
      .from(mentorshipRelationships)
      .where(
        and(
          eq(mentorshipRelationships.mentorUserId, mentor.userId),
          eq(mentorshipRelationships.status, 'active')
        )
      );

    const activeMenteesCount = activeRelationships.length;
    const spotsAvailable = Math.max(0, mentor.maxMentees - activeMenteesCount);

    // Return clean JSON object
    return NextResponse.json({
      mentor: {
        ...mentor,
        activeMenteesCount,
        relationshipStatus,
        spotsAvailable,
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