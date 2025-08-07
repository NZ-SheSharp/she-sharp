import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mentorshipRelationships, mentorProfiles, activityLogs, ActivityType } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { relationshipId, action, feedback } = await request.json();

    if (!relationshipId || !action) {
      return NextResponse.json(
        { error: 'Relationship ID and action are required' },
        { status: 400 }
      );
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      );
    }

    // Get the relationship
    const [relationship] = await db
      .select()
      .from(mentorshipRelationships)
      .where(eq(mentorshipRelationships.id, relationshipId))
      .limit(1);

    if (!relationship) {
      return NextResponse.json(
        { error: 'Relationship not found' },
        { status: 404 }
      );
    }

    // Check if user is the mentor
    if (relationship.mentorUserId !== user.id) {
      return NextResponse.json(
        { error: 'You are not authorized to approve this application' },
        { status: 403 }
      );
    }

    // Check if relationship is pending
    if (relationship.status !== 'pending') {
      return NextResponse.json(
        { error: 'This application is not pending' },
        { status: 400 }
      );
    }

    let updatedRelationship;
    
    if (action === 'approve') {
      // Update relationship status to active
      [updatedRelationship] = await db
        .update(mentorshipRelationships)
        .set({
          status: 'active',
          startedAt: new Date(),
          mentorFeedback: feedback ? { approvalNote: feedback } : null,
          updatedAt: new Date(),
        })
        .where(eq(mentorshipRelationships.id, relationshipId))
        .returning();

      // Increment mentor's current mentees count
      await db
        .update(mentorProfiles)
        .set({
          currentMenteesCount: sql`${mentorProfiles.currentMenteesCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(mentorProfiles.userId, user.id));

      // Check if mentor should stop accepting new mentees
      const [mentorProfile] = await db
        .select()
        .from(mentorProfiles)
        .where(eq(mentorProfiles.userId, user.id))
        .limit(1);

      if (mentorProfile && mentorProfile.currentMenteesCount >= mentorProfile.maxMentees) {
        await db
          .update(mentorProfiles)
          .set({
            isAcceptingMentees: false,
            updatedAt: new Date(),
          })
          .where(eq(mentorProfiles.userId, user.id));
      }

      // Log activity
      await db.insert(activityLogs).values({
        userId: user.id,
        action: ActivityType.APPROVE_MENTEE,
        entityType: 'relationship',
        entityId: relationshipId,
        metadata: { menteeId: relationship.menteeId, feedback },
      });

    } else {
      // Reject the application
      [updatedRelationship] = await db
        .update(mentorshipRelationships)
        .set({
          status: 'rejected',
          mentorFeedback: feedback ? { rejectionReason: feedback } : null,
          updatedAt: new Date(),
        })
        .where(eq(mentorshipRelationships.id, relationshipId))
        .returning();

      // Log activity
      await db.insert(activityLogs).values({
        userId: user.id,
        action: ActivityType.REJECT_MENTEE,
        entityType: 'relationship',
        entityId: relationshipId,
        metadata: { menteeId: relationship.menteeId, feedback },
      });
    }

    // TODO: Send notification to mentee (email/in-app)

    return NextResponse.json({
      message: `Application ${action}d successfully`,
      relationship: updatedRelationship,
    });
  } catch (error) {
    console.error('Error processing mentorship application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}