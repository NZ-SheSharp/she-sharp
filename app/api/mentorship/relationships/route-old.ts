import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mentorshipRelationships, users, mentorProfiles, menteeProfiles } from '@/lib/db/schema';
import { eq, or, and, sql } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all relationships where user is either mentor or mentee
    const relationships = await db
      .select({
        id: mentorshipRelationships.id,
        mentorId: mentorshipRelationships.mentorUserId,
        menteeId: mentorshipRelationships.menteeUserId,
        status: mentorshipRelationships.status,
        startedAt: mentorshipRelationships.startedAt,
        endedAt: mentorshipRelationships.endedAt,
        totalMeetings: mentorshipRelationships.totalMeetings,
        nextMeetingDate: mentorshipRelationships.nextMeetingDate,
        notes: mentorshipRelationships.notes,
        mentorFeedback: mentorshipRelationships.mentorFeedback,
        menteeFeedback: mentorshipRelationships.menteeFeedback,
        createdAt: mentorshipRelationships.createdAt,
        updatedAt: mentorshipRelationships.updatedAt,
        // Mentor info
        mentorName: sql`mentor.name`,
        mentorEmail: sql`mentor.email`,
        mentorImage: sql`mentor.image`,
        // Mentee info
        menteeName: sql`mentee.name`,
        menteeEmail: sql`mentee.email`,
        menteeImage: sql`mentee.image`,
      })
      .from(mentorshipRelationships)
      .leftJoin(sql`${users} as mentor`, sql`mentor.id = ${mentorshipRelationships.mentorUserId}`)
      .leftJoin(sql`${users} as mentee`, sql`mentee.id = ${mentorshipRelationships.menteeUserId}`)
      .where(
        or(
          eq(mentorshipRelationships.mentorUserId, user.id),
          eq(mentorshipRelationships.menteeUserId, user.id)
        )
      )
      .orderBy(sql`
        CASE 
          WHEN ${mentorshipRelationships.status} = 'pending' THEN 1
          WHEN ${mentorshipRelationships.status} = 'active' THEN 2
          ELSE 3
        END,
        ${mentorshipRelationships.createdAt} DESC
      `);

    // Get additional details for active relationships
    const enrichedRelationships = await Promise.all(
      relationships.map(async (rel) => {
        let mentorRole = null;
        let menteeGoals = null;

        if (rel.status === 'active') {
          // Get mentor's current role if available
          if (rel.mentorId) {
            const [mentorProfile] = await db
              .select({
                jobTitle: mentorProfiles.jobTitle,
                company: mentorProfiles.company,
              })
              .from(mentorProfiles)
              .where(eq(mentorProfiles.userId, rel.mentorId))
              .limit(1);
            
            if (mentorProfile) {
              mentorRole = mentorProfile.jobTitle;
              if (mentorProfile.company) {
                mentorRole += ` at ${mentorProfile.company}`;
              }
            }
          }

          // Get mentee's learning goals if available
          if (rel.menteeId) {
            const [menteeProfile] = await db
              .select({
                learningGoals: menteeProfiles.learningGoals,
              })
              .from(menteeProfiles)
              .where(eq(menteeProfiles.userId, rel.menteeId))
              .limit(1);
            
            if (menteeProfile) {
              menteeGoals = menteeProfile.learningGoals;
            }
          }
        }

        return {
          ...rel,
          mentorRole,
          menteeGoals,
        };
      })
    );

    // Separate by status
    const active = enrichedRelationships.filter(r => r.status === 'active');
    const pending = enrichedRelationships.filter(r => r.status === 'pending');
    const ended = enrichedRelationships.filter(r => r.status === 'ended');
    const rejected = enrichedRelationships.filter(r => r.status === 'rejected');

    return NextResponse.json({
      active,
      pending,
      ended,
      rejected,
      total: relationships.length,
    });
  } catch (error) {
    console.error('Error fetching relationships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch relationships' },
      { status: 500 }
    );
  }
}