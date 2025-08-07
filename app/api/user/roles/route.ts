import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { userRoles, activityLogs, ActivityType } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's active roles
    const roles = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, user.id),
          eq(userRoles.isActive, true)
        )
      );

    const activeRoles = roles.map(r => r.roleType);

    return NextResponse.json({
      activeRoles,
      roles: roles.map(r => ({
        type: r.roleType,
        isActive: r.isActive,
        activatedAt: r.activatedAt,
        verifiedAt: r.verifiedAt,
        activationStep: r.activationStep
      }))
    });
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user roles' },
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

    const { roleType } = await request.json();

    if (!['mentor', 'mentee', 'admin'].includes(roleType)) {
      return NextResponse.json(
        { error: 'Invalid role type' },
        { status: 400 }
      );
    }

    // Check if role already exists
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, user.id),
          eq(userRoles.roleType, roleType)
        )
      )
      .limit(1);

    if (existingRole.length > 0) {
      // Reactivate if inactive
      if (!existingRole[0].isActive) {
        await db
          .update(userRoles)
          .set({ 
            isActive: true,
            activatedAt: new Date()
          })
          .where(
            and(
              eq(userRoles.userId, user.id),
              eq(userRoles.roleType, roleType)
            )
          );
      }
      
      return NextResponse.json({ 
        message: 'Role already active',
        roleType 
      });
    }

    // Create new role activation
    const [newRole] = await db
      .insert(userRoles)
      .values({
        userId: user.id,
        roleType,
        isActive: true,
        activationStep: 0
      })
      .returning();

    // Log activity
    const activityType = roleType === 'mentor' 
      ? ActivityType.ACTIVATE_MENTOR_ROLE
      : ActivityType.ACTIVATE_MENTEE_ROLE;

    await db.insert(activityLogs).values({
      userId: user.id,
      action: activityType,
      entityType: 'user',
      entityId: user.id,
      metadata: { roleType }
    });

    return NextResponse.json({
      message: 'Role activated successfully',
      role: newRole
    });
  } catch (error) {
    console.error('Error activating role:', error);
    return NextResponse.json(
      { error: 'Failed to activate role' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { roleType } = await request.json();

    // Deactivate role
    await db
      .update(userRoles)
      .set({ isActive: false })
      .where(
        and(
          eq(userRoles.userId, user.id),
          eq(userRoles.roleType, roleType)
        )
      );

    return NextResponse.json({
      message: 'Role deactivated successfully'
    });
  } catch (error) {
    console.error('Error deactivating role:', error);
    return NextResponse.json(
      { error: 'Failed to deactivate role' },
      { status: 500 }
    );
  }
}