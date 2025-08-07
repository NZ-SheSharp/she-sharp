import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { events, eventRegistrations, users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    // Get event details
    const [event] = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        eventType: events.eventType,
        startTime: events.startTime,
        endTime: events.endTime,
        timezone: events.timezone,
        locationType: events.locationType,
        locationDetails: events.locationDetails,
        capacity: events.capacity,
        currentRegistrations: events.currentRegistrations,
        registrationDeadline: events.registrationDeadline,
        waitlistEnabled: events.waitlistEnabled,
        isMembersOnly: events.isMembersOnly,
        requiredMembershipTier: events.requiredMembershipTier,
        agenda: events.agenda,
        speakers: events.speakers,
        materials: events.materials,
        actualAttendance: events.actualAttendance,
        feedbackScore: events.feedbackScore,
        createdBy: events.createdBy,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      })
      .from(events)
      .where(eq(events.id, eventId))
      .limit(1);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Get creator info
    const [creator] = await db
      .select({
        name: users.name,
        email: users.email,
        image: users.image,
      })
      .from(users)
      .where(eq(users.id, event.createdBy))
      .limit(1);

    // Check if user is registered
    const user = await getUser();
    let registrationStatus = null;
    let userRegistration = null;

    if (user) {
      const [registration] = await db
        .select()
        .from(eventRegistrations)
        .where(
          and(
            eq(eventRegistrations.eventId, eventId),
            eq(eventRegistrations.userId, user.id)
          )
        )
        .limit(1);

      if (registration) {
        registrationStatus = 'registered';
        userRegistration = registration;
      }
    }

    // Get registration stats
    const registrations = await db
      .select({
        total: sql`COUNT(*)`,
        checkedIn: sql`COUNT(CASE WHEN checked_in_at IS NOT NULL THEN 1 END)`,
      })
      .from(eventRegistrations)
      .where(eq(eventRegistrations.eventId, eventId));

    const stats = registrations[0] || { total: 0, checkedIn: 0 };

    // Calculate event status
    const now = new Date();
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    const registrationDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;

    const eventStatus = {
      isPast: eventEnd < now,
      isOngoing: eventStart <= now && eventEnd >= now,
      isUpcoming: eventStart > now,
      isFull: event.capacity ? event.currentRegistrations >= event.capacity : false,
      registrationOpen: registrationDeadline ? registrationDeadline > now : eventStart > now,
      spotsRemaining: event.capacity ? event.capacity - event.currentRegistrations : null,
    };

    return NextResponse.json({
      event: {
        ...event,
        creator,
        ...eventStatus,
      },
      registration: {
        status: registrationStatus,
        details: userRegistration,
      },
      stats: {
        totalRegistrations: Number(stats.total),
        checkedIn: Number(stats.checkedIn),
      },
    });
  } catch (error) {
    console.error('Error fetching event details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const isAdmin = user.roles?.some(r => r.roleType === 'admin' && r.isActive);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Update event
    const [updatedEvent] = await db
      .update(events)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(events.id, eventId))
      .returning();

    if (!updatedEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const isAdmin = user.roles?.some(r => r.roleType === 'admin' && r.isActive);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    // Delete event (registrations will cascade delete)
    await db
      .delete(events)
      .where(eq(events.id, eventId));

    return NextResponse.json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}