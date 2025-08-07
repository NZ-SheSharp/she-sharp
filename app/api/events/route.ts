import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { events, eventRegistrations, adminPermissions } from '@/lib/db/schema';
import { eq, gte, lte, and, or, desc, asc, sql } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const membersOnly = searchParams.get('membersOnly');
    const sortBy = searchParams.get('sortBy') || 'startTime';
    const order = searchParams.get('order') || 'asc';

    // Build query conditions
    const conditions = [];
    
    if (eventType) {
      conditions.push(eq(events.eventType, eventType as any));
    }
    
    if (startDate) {
      conditions.push(gte(events.startTime, new Date(startDate)));
    }
    
    if (endDate) {
      conditions.push(lte(events.endTime, new Date(endDate)));
    }
    
    if (membersOnly === 'true') {
      conditions.push(eq(events.isMembersOnly, true));
    } else if (membersOnly === 'false') {
      conditions.push(eq(events.isMembersOnly, false));
    }

    // Get events with registration counts
    const eventsQuery = db
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
        createdAt: events.createdAt,
      })
      .from(events);

    if (conditions.length > 0) {
      eventsQuery.where(and(...conditions));
    }

    // Apply sorting
    if (sortBy === 'startTime') {
      eventsQuery.orderBy(order === 'desc' ? desc(events.startTime) : asc(events.startTime));
    } else if (sortBy === 'createdAt') {
      eventsQuery.orderBy(order === 'desc' ? desc(events.createdAt) : asc(events.createdAt));
    }

    const allEvents = await eventsQuery;

    // Get user's registrations if logged in
    const user = await getUser();
    let userRegistrations: number[] = [];
    
    if (user) {
      const registrations = await db
        .select({ eventId: eventRegistrations.eventId })
        .from(eventRegistrations)
        .where(eq(eventRegistrations.userId, user.id));
      
      userRegistrations = registrations.map(r => r.eventId);
    }

    // Add registration status to each event
    const eventsWithStatus = allEvents.map(event => ({
      ...event,
      isRegistered: userRegistrations.includes(event.id),
      spotsRemaining: event.capacity ? event.capacity - (event.currentRegistrations || 0) : null,
      isFull: event.capacity ? (event.currentRegistrations || 0) >= event.capacity : false,
      isPast: new Date(event.endTime) < new Date(),
      isUpcoming: new Date(event.startTime) > new Date(),
      isOngoing: new Date(event.startTime) <= new Date() && new Date(event.endTime) >= new Date(),
    }));

    // Separate events by status
    const upcomingEvents = eventsWithStatus.filter(e => e.isUpcoming);
    const ongoingEvents = eventsWithStatus.filter(e => e.isOngoing);
    const pastEvents = eventsWithStatus.filter(e => e.isPast);

    return NextResponse.json({
      upcoming: upcomingEvents,
      ongoing: ongoingEvents,
      past: pastEvents,
      total: eventsWithStatus.length,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const [adminRole] = await db
      .select()
      .from(adminPermissions)
      .where(eq(adminPermissions.userId, user.id))
      .limit(1);
    
    if (!adminRole || !adminRole.canManageEvents) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.eventType || !data.startTime || !data.endTime || !data.locationType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create event
    const [newEvent] = await db
      .insert(events)
      .values({
        title: data.title,
        description: data.description,
        eventType: data.eventType,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        timezone: data.timezone || 'America/Los_Angeles',
        locationType: data.locationType,
        locationDetails: data.locationDetails,
        capacity: data.capacity,
        registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : null,
        waitlistEnabled: data.waitlistEnabled || false,
        isMembersOnly: data.isMembersOnly || false,
        requiredMembershipTier: data.requiredMembershipTier,
        agenda: data.agenda,
        speakers: data.speakers,
        materials: data.materials,
        createdBy: user.id,
      })
      .returning();

    return NextResponse.json({
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}