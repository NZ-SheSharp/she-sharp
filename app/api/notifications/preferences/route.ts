import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's notification preferences
    const result = await db.execute(sql`
      SELECT * FROM notification_preferences
      WHERE user_id = ${user.id}
      LIMIT 1
    `);

    let preferences = result[0];

    // If no preferences exist, create default ones
    if (!preferences) {
      const [newPrefs] = await db.execute(sql`
        INSERT INTO notification_preferences (user_id)
        VALUES (${user.id})
        RETURNING *
      `);
      preferences = newPrefs;
    }

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notification preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 2; // Starting at $2 since $1 is user_id

    // Email preferences
    if (data.email_enabled !== undefined) {
      updates.push(`email_enabled = $${paramIndex++}`);
      values.push(data.email_enabled);
    }
    if (data.email_events !== undefined) {
      updates.push(`email_events = $${paramIndex++}`);
      values.push(data.email_events);
    }
    if (data.email_mentorship !== undefined) {
      updates.push(`email_mentorship = $${paramIndex++}`);
      values.push(data.email_mentorship);
    }
    if (data.email_resources !== undefined) {
      updates.push(`email_resources = $${paramIndex++}`);
      values.push(data.email_resources);
    }
    if (data.email_meetings !== undefined) {
      updates.push(`email_meetings = $${paramIndex++}`);
      values.push(data.email_meetings);
    }
    if (data.email_system !== undefined) {
      updates.push(`email_system = $${paramIndex++}`);
      values.push(data.email_system);
    }

    // In-app preferences
    if (data.inapp_enabled !== undefined) {
      updates.push(`inapp_enabled = $${paramIndex++}`);
      values.push(data.inapp_enabled);
    }
    if (data.inapp_events !== undefined) {
      updates.push(`inapp_events = $${paramIndex++}`);
      values.push(data.inapp_events);
    }
    if (data.inapp_mentorship !== undefined) {
      updates.push(`inapp_mentorship = $${paramIndex++}`);
      values.push(data.inapp_mentorship);
    }
    if (data.inapp_resources !== undefined) {
      updates.push(`inapp_resources = $${paramIndex++}`);
      values.push(data.inapp_resources);
    }
    if (data.inapp_meetings !== undefined) {
      updates.push(`inapp_meetings = $${paramIndex++}`);
      values.push(data.inapp_meetings);
    }
    if (data.inapp_system !== undefined) {
      updates.push(`inapp_system = $${paramIndex++}`);
      values.push(data.inapp_system);
    }

    // Frequency settings
    if (data.email_frequency !== undefined) {
      updates.push(`email_frequency = $${paramIndex++}`);
      values.push(data.email_frequency);
    }
    if (data.quiet_hours_start !== undefined) {
      updates.push(`quiet_hours_start = $${paramIndex++}`);
      values.push(data.quiet_hours_start);
    }
    if (data.quiet_hours_end !== undefined) {
      updates.push(`quiet_hours_end = $${paramIndex++}`);
      values.push(data.quiet_hours_end);
    }
    if (data.timezone !== undefined) {
      updates.push(`timezone = $${paramIndex++}`);
      values.push(data.timezone);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    updates.push('updated_at = NOW()');

    // Update preferences or create if not exists
    const query = `
      INSERT INTO notification_preferences (user_id, ${updates.map((_, i) => {
        const field = updates[i].split(' = ')[0];
        return field;
      }).join(', ')})
      VALUES ($1, ${values.map((_, i) => `$${i + 2}`).join(', ')})
      ON CONFLICT (user_id) DO UPDATE
      SET ${updates.join(', ')}
      RETURNING *
    `;

    const [updatedPrefs] = await db.execute(sql.raw(query, [user.id, ...values]));

    return NextResponse.json({
      message: 'Preferences updated successfully',
      preferences: updatedPrefs,
    });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update notification preferences' },
      { status: 500 }
    );
  }
}