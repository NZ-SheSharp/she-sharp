import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { menteeProfiles, userRoles, activityLogs, ActivityType } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [profile] = await db
      .select()
      .from(menteeProfiles)
      .where(eq(menteeProfiles.userId, user.id))
      .limit(1);

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching mentee profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentee profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Prepare the profile data with proper array handling
    const profileData = {
      learningGoals: data.learningGoals || [],
      careerStage: data.currentLevel || data.careerStage || null,
      preferredExpertiseAreas: data.preferredMentorExpertise || data.preferredExpertiseAreas || [],
      preferredMeetingFrequency: data.preferredMeetingFrequency || null,
      bio: data.bio || null,
      currentChallenge: data.currentChallenge || null,
    };

    // Check if profile already exists
    const [existingProfile] = await db
      .select()
      .from(menteeProfiles)
      .where(eq(menteeProfiles.userId, user.id))
      .limit(1);

    let profile;
    if (existingProfile) {
      // Update existing profile
      [profile] = await db
        .update(menteeProfiles)
        .set({
          ...profileData,
          profileCompletedAt: existingProfile.profileCompletedAt || new Date(),
        })
        .where(eq(menteeProfiles.userId, user.id))
        .returning();
    } else {
      // Create new profile
      [profile] = await db
        .insert(menteeProfiles)
        .values({
          userId: user.id,
          ...profileData,
          profileCompletedAt: new Date(),
        })
        .returning();

      // Activate mentee role if not already active
      const [existingRole] = await db
        .select()
        .from(userRoles)
        .where(
          and(
            eq(userRoles.userId, user.id),
            eq(userRoles.roleType, 'mentee')
          )
        )
        .limit(1);

      if (!existingRole) {
        await db.insert(userRoles).values({
          userId: user.id,
          roleType: 'mentee',
          isActive: true,
          activationStep: 3, // Profile completed
        });

        // Log activity
        await db.insert(activityLogs).values({
          userId: user.id,
          action: ActivityType.ACTIVATE_MENTEE_ROLE,
          entityType: 'user',
          entityId: user.id,
          metadata: { profileCompleted: true }
        });
      }
    }

    // Log profile update activity
    await db.insert(activityLogs).values({
      userId: user.id,
      action: ActivityType.UPDATE_MENTEE_PROFILE,
      entityType: 'user',
      entityId: user.id,
      metadata: { profileId: profile.id }
    });

    return NextResponse.json({
      message: 'Mentee profile saved successfully',
      profile
    });
  } catch (error) {
    console.error('Error saving mentee profile:', error);
    return NextResponse.json(
      { error: 'Failed to save mentee profile' },
      { status: 500 }
    );
  }
}