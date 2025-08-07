import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mentorProfiles, users, userRoles } from '@/lib/db/schema';
import { eq, and, ilike, or, sql, gte, lte } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const expertise = searchParams.get('expertise');
    const minExperience = searchParams.get('minExperience');
    const maxExperience = searchParams.get('maxExperience');
    const isAccepting = searchParams.get('isAccepting');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Build query conditions
    const conditions = [];
    
    // Only show mentors with active roles
    conditions.push(eq(userRoles.roleType, 'mentor'));
    conditions.push(eq(userRoles.isActive, true));
    
    // Filter by accepting mentees
    if (isAccepting === 'true') {
      conditions.push(eq(mentorProfiles.isAcceptingMentees, true));
    }
    
    // Filter by experience years
    if (minExperience) {
      conditions.push(gte(mentorProfiles.yearsExperience, parseInt(minExperience)));
    }
    if (maxExperience) {
      conditions.push(lte(mentorProfiles.yearsExperience, parseInt(maxExperience)));
    }

    // Add search filter to conditions
    if (search) {
      conditions.push(
        or(
          ilike(users.name, `%${search}%`),
          ilike(mentorProfiles.bio, `%${search}%`),
          ilike(mentorProfiles.jobTitle, `%${search}%`),
          ilike(mentorProfiles.company, `%${search}%`),
          sql`${mentorProfiles.expertiseAreas}::text ILIKE ${'%' + search + '%'}`
        )
      );
    }
    
    // Add expertise filter to conditions
    if (expertise) {
      conditions.push(
        sql`${mentorProfiles.expertiseAreas} @> ARRAY[${expertise}]::text[]`
      );
    }

    // Get mentors with their user info
    const mentors = await db
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
      })
      .from(mentorProfiles)
      .innerJoin(users, eq(mentorProfiles.userId, users.id))
      .innerJoin(userRoles, eq(users.id, userRoles.userId))
      .where(and(...conditions))
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${mentorProfiles.yearsExperience} DESC NULLS LAST`);

    // Get total count for pagination
    const countQuery = await db
      .select({ count: sql`COUNT(*)` })
      .from(mentorProfiles)
      .innerJoin(users, eq(mentorProfiles.userId, users.id))
      .innerJoin(userRoles, eq(users.id, userRoles.userId))
      .where(and(...conditions));

    const totalCount = Number(countQuery[0]?.count || 0);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      mentors,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
}