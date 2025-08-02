import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { teams, teamMembers, users, invitations } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: Request) {
  const user = await getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get user's team membership
    const userTeamMember = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.userId, user.id))
      .limit(1);

    if (!userTeamMember || userTeamMember.length === 0) {
      return Response.json({ 
        members: [], 
        invitations: [],
        team: null 
      });
    }

    const teamId = userTeamMember[0].teamId;

    // Get team details
    const [team] = await db
      .select()
      .from(teams)
      .where(eq(teams.id, teamId))
      .limit(1);

    // Get all team members with user details
    const members = await db
      .select({
        id: teamMembers.id,
        userId: teamMembers.userId,
        teamId: teamMembers.teamId,
        role: teamMembers.role,
        joinedAt: teamMembers.joinedAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          emailVerifiedAt: users.emailVerifiedAt,
        }
      })
      .from(teamMembers)
      .innerJoin(users, eq(teamMembers.userId, users.id))
      .where(eq(teamMembers.teamId, teamId));

    // Get pending invitations
    const pendingInvitations = await db
      .select({
        id: invitations.id,
        email: invitations.email,
        role: invitations.role,
        status: invitations.status,
        invitedAt: invitations.invitedAt,
        invitedBy: invitations.invitedBy,
      })
      .from(invitations)
      .where(
        and(
          eq(invitations.teamId, teamId),
          eq(invitations.status, 'pending')
        )
      );

    return Response.json({
      team,
      members,
      invitations: pendingInvitations,
      currentUserRole: userTeamMember[0].role,
    });
  } catch (error) {
    console.error('Failed to fetch team data:', error);
    return Response.json({ error: 'Failed to fetch team data' }, { status: 500 });
  }
}