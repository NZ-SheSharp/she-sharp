import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { events, eventRegistrations, userMemberships } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
      .select()
      .from(events)
      .where(eq(events.id, eventId))
      .limit(1);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if registration is still open
    const now = new Date();
    const registrationDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;
    const eventStart = new Date(event.startTime);

    if (registrationDeadline && registrationDeadline < now) {
      return NextResponse.json(
        { error: 'Registration deadline has passed' },
        { status: 400 }
      );
    }

    if (eventStart < now) {
      return NextResponse.json(
        { error: 'Event has already started' },
        { status: 400 }
      );
    }

    // Check if event is members-only
    if (event.isMembersOnly) {
      const [membership] = await db
        .select()
        .from(userMemberships)
        .where(
          and(
            eq(userMemberships.userId, user.id),
            eq(userMemberships.status, 'active')
          )
        )
        .limit(1);

      if (!membership) {
        return NextResponse.json(
          { error: 'This event is for members only' },
          { status: 403 }
        );
      }

      // Check membership tier if required
      if (event.requiredMembershipTier) {
        const tierLevels = {
          basic: 1,
          premium: 2,
          lifetime: 3,
        };

        const requiredLevel = tierLevels[event.requiredMembershipTier as keyof typeof tierLevels] || 0;
        const userLevel = tierLevels[membership.membershipTier as keyof typeof tierLevels] || 0;

        if (userLevel < requiredLevel) {
          return NextResponse.json(
            { error: `This event requires ${event.requiredMembershipTier} membership or higher` },
            { status: 403 }
          );
        }
      }
    }

    // Check if already registered
    const [existingRegistration] = await db
      .select()
      .from(eventRegistrations)
      .where(
        and(
          eq(eventRegistrations.eventId, eventId),
          eq(eventRegistrations.userId, user.id)
        )
      )
      .limit(1);

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 }
      );
    }

    // Check capacity
    if (event.capacity && event.currentRegistrations >= event.capacity) {
      if (!event.waitlistEnabled) {
        return NextResponse.json(
          { error: 'Event is full' },
          { status: 400 }
        );
      }
      // TODO: Implement waitlist functionality
    }

    // Register for event
    const [registration] = await db
      .insert(eventRegistrations)
      .values({
        eventId,
        userId: user.id,
        roleInEvent: 'attendee',
      })
      .returning();

    // Update event registration count
    await db
      .update(events)
      .set({
        currentRegistrations: sql`COALESCE(current_registrations, 0) + 1`,
        updatedAt: new Date(),
      })
      .where(eq(events.id, eventId));

    return NextResponse.json({
      message: 'Successfully registered for event',
      registration,
    });
  } catch (error) {
    console.error('Error registering for event:', error);
    return NextResponse.json(
      { error: 'Failed to register for event' },
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

    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    // Check if registered
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

    if (!registration) {
      return NextResponse.json(
        { error: 'You are not registered for this event' },
        { status: 400 }
      );
    }

    // Check if event has already started
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId))
      .limit(1);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const now = new Date();
    const eventStart = new Date(event.startTime);

    if (eventStart < now) {
      return NextResponse.json(
        { error: 'Cannot cancel registration for events that have already started' },
        { status: 400 }
      );
    }

    // Delete registration
    await db
      .delete(eventRegistrations)
      .where(
        and(
          eq(eventRegistrations.eventId, eventId),
          eq(eventRegistrations.userId, user.id)
        )
      );

    // Update event registration count
    await db
      .update(events)
      .set({
        currentRegistrations: sql`GREATEST(COALESCE(current_registrations, 0) - 1, 0)`,
        updatedAt: new Date(),
      })
      .where(eq(events.id, eventId));

    return NextResponse.json({
      message: 'Successfully cancelled registration',
    });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    return NextResponse.json(
      { error: 'Failed to cancel registration' },
      { status: 500 }
    );
  }
}