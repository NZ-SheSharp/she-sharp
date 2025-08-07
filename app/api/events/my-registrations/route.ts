import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { events, eventRegistrations } from '@/lib/db/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all user's registrations with event details
    const registrations = await db
      .select({
        registrationId: eventRegistrations.id,
        registeredAt: eventRegistrations.registeredAt,
        roleInEvent: eventRegistrations.roleInEvent,
        checkedInAt: eventRegistrations.checkedInAt,
        feedbackSubmitted: eventRegistrations.feedbackSubmitted,
        certificateIssued: eventRegistrations.certificateIssued,
        certificateUrl: eventRegistrations.certificateUrl,
        event: {
          id: events.id,
          title: events.title,
          description: events.description,
          eventType: events.eventType,
          startTime: events.startTime,
          endTime: events.endTime,
          timezone: events.timezone,
          locationType: events.locationType,
          locationDetails: events.locationDetails,
          agenda: events.agenda,
          speakers: events.speakers,
          materials: events.materials,
        },
      })
      .from(eventRegistrations)
      .innerJoin(events, eq(eventRegistrations.eventId, events.id))
      .where(eq(eventRegistrations.userId, user.id))
      .orderBy(desc(events.startTime));

    // Categorize registrations
    const now = new Date();
    const upcoming = registrations.filter(r => new Date(r.event.startTime) > now);
    const ongoing = registrations.filter(r => {
      const start = new Date(r.event.startTime);
      const end = new Date(r.event.endTime);
      return start <= now && end >= now;
    });
    const past = registrations.filter(r => new Date(r.event.endTime) < now);

    return NextResponse.json({
      upcoming,
      ongoing,
      past,
      total: registrations.length,
    });
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}