import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's notification preferences
    const result = await db.execute(sql`
      SELECT * FROM notification_preferences 
      WHERE user_id = ${user.id}
    `);

    if (result.rows.length === 0) {
      // Return default preferences if none exist
      return NextResponse.json({
        preferences: {
          user_id: user.id,
          email_enabled: true,
          email_events: true,
          email_mentorship: true,
          email_resources: true,
          email_meetings: true,
          email_system: true,
          inapp_enabled: true,
          inapp_events: true,
          inapp_mentorship: true,
          inapp_resources: true,
          inapp_meetings: true,
          inapp_system: true,
          email_frequency: 'immediate',
          quiet_hours_start: null,
          quiet_hours_end: null,
          timezone: 'America/Los_Angeles',
        },
      });
    }

    return NextResponse.json({ preferences: result.rows[0] });
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notification preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate email_frequency if provided
    if (data.email_frequency && !['immediate', 'daily', 'weekly'].includes(data.email_frequency)) {
      return NextResponse.json(
        { error: 'Invalid email frequency' },
        { status: 400 }
      );
    }

    // Simple upsert with only the most important fields
    const result = await db.execute(sql`
      INSERT INTO notification_preferences (
        user_id,
        email_enabled,
        inapp_enabled,
        email_frequency,
        timezone,
        created_at,
        updated_at
      )
      VALUES (
        ${user.id},
        ${data.email_enabled ?? true},
        ${data.inapp_enabled ?? true},
        ${data.email_frequency ?? 'immediate'},
        ${data.timezone ?? 'America/Los_Angeles'},
        NOW(),
        NOW()
      )
      ON CONFLICT (user_id) DO UPDATE
      SET 
        email_enabled = EXCLUDED.email_enabled,
        inapp_enabled = EXCLUDED.inapp_enabled,
        email_frequency = EXCLUDED.email_frequency,
        timezone = EXCLUDED.timezone,
        updated_at = NOW()
      RETURNING *
    `);

    return NextResponse.json({
      message: 'Preferences updated successfully',
      preferences: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update notification preferences' },
      { status: 500 }
    );
  }
}