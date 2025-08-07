import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { mentorProfiles, userRoles, activityLogs, ActivityType } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [profile] = await db
      .select()
      .from(mentorProfiles)
      .where(eq(mentorProfiles.userId, user.id))
      .limit(1);

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching mentor profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentor profile' },
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
      expertiseAreas: data.expertiseAreas || [],
      yearsExperience: data.yearsExperience || 0,
      jobTitle: data.jobTitle || null,
      company: data.company || null,
      bio: data.bio || null,
      linkedinUrl: data.linkedinUrl || null,
      availabilityHoursPerMonth: data.availabilityHoursPerMonth || 4,
      maxMentees: data.maxMentees || 3,
      isAcceptingMentees: data.isAcceptingMentees !== undefined ? data.isAcceptingMentees : true,
    };

    // Check if profile already exists
    const [existingProfile] = await db
      .select()
      .from(mentorProfiles)
      .where(eq(mentorProfiles.userId, user.id))
      .limit(1);

    let profile;
    if (existingProfile) {
      // Update existing profile
      [profile] = await db
        .update(mentorProfiles)
        .set({
          ...profileData,
          profileCompletedAt: existingProfile.profileCompletedAt || new Date(),
        })
        .where(eq(mentorProfiles.userId, user.id))
        .returning();
    } else {
      // Create new profile
      [profile] = await db
        .insert(mentorProfiles)
        .values({
          userId: user.id,
          ...profileData,
          profileCompletedAt: new Date(),
        })
        .returning();

      // Activate mentor role if not already active
      const [existingRole] = await db
        .select()
        .from(userRoles)
        .where(
          and(
            eq(userRoles.userId, user.id),
            eq(userRoles.roleType, 'mentor')
          )
        )
        .limit(1);

      if (!existingRole) {
        await db.insert(userRoles).values({
          userId: user.id,
          roleType: 'mentor',
          isActive: true,
          activationStep: 3, // Profile completed
        });

        // Log activity
        await db.insert(activityLogs).values({
          userId: user.id,
          action: ActivityType.ACTIVATE_MENTOR_ROLE,
          entityType: 'user',
          entityId: user.id,
          metadata: { profileCompleted: true }
        });
      }
    }

    // Log profile update activity
    await db.insert(activityLogs).values({
      userId: user.id,
      action: ActivityType.UPDATE_MENTOR_PROFILE,
      entityType: 'user',
      entityId: user.id,
      metadata: { profileId: profile.id }
    });

    return NextResponse.json({
      message: 'Mentor profile saved successfully',
      profile
    });
  } catch (error) {
    console.error('Error saving mentor profile:', error);
    return NextResponse.json(
      { error: 'Failed to save mentor profile' },
      { status: 500 }
    );
  }
}