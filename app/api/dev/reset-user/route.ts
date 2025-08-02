import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers, activityLogs, emailVerifications, passwordResets, passwordHistory } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// This endpoint is for development only!
export async function DELETE(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete related data in order
    await db.delete(emailVerifications).where(eq(emailVerifications.userId, user.id));
    await db.delete(passwordResets).where(eq(passwordResets.userId, user.id));
    await db.delete(passwordHistory).where(eq(passwordHistory.userId, user.id));
    await db.delete(activityLogs).where(eq(activityLogs.userId, user.id));
    await db.delete(teamMembers).where(eq(teamMembers.userId, user.id));
    
    // Finally delete the user
    await db.delete(users).where(eq(users.id, user.id));

    return NextResponse.json({
      success: true,
      message: `User ${email} and related data deleted successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}