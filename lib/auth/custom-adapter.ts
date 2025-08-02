import { Adapter } from "next-auth/adapters";
import { db } from "@/lib/db/drizzle";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export function CustomDrizzleAdapter(): Adapter {
  return {
    async createUser(data) {
      const [user] = await db
        .insert(users)
        .values({
          email: data.email,
          name: data.name,
          image: data.image,
          emailVerified: data.emailVerified,
        })
        .returning();
      
      return {
        ...user,
        id: user.id.toString(),
        emailVerified: user.emailVerified || null,
        image: user.image || null,
        name: user.name || null,
      };
    },
    
    async getUser(id) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(id)))
        .limit(1);
      
      if (!user) return null;
      
      return {
        ...user,
        id: user.id.toString(),
        emailVerified: user.emailVerified || null,
        image: user.image || null,
        name: user.name || null,
      };
    },
    
    async getUserByEmail(email) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      
      if (!user) return null;
      
      return {
        ...user,
        id: user.id.toString(),
        emailVerified: user.emailVerified || null,
        image: user.image || null,
        name: user.name || null,
      };
    },
    
    async getUserByAccount({ providerAccountId, provider }) {
      const [result] = await db
        .select({
          user: users,
          account: accounts,
        })
        .from(accounts)
        .innerJoin(users, eq(accounts.userId, users.id))
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider)
          )
        )
        .limit(1);
      
      if (!result) return null;
      
      return {
        ...result.user,
        id: result.user.id.toString(),
        emailVerified: result.user.emailVerified || null,
        image: result.user.image || null,
        name: result.user.name || null,
      };
    },
    
    async updateUser(data) {
      const id = parseInt(data.id!);
      const [user] = await db
        .update(users)
        .set({
          name: data.name,
          email: data.email,
          image: data.image,
          emailVerified: data.emailVerified,
        })
        .where(eq(users.id, id))
        .returning();
      
      return {
        ...user,
        id: user.id.toString(),
        emailVerified: user.emailVerified || null,
        image: user.image || null,
        name: user.name || null,
      };
    },
    
    async deleteUser(userId) {
      await db
        .delete(users)
        .where(eq(users.id, parseInt(userId)));
    },
    
    async linkAccount(accountData) {
      await db.insert(accounts).values({
        userId: parseInt(accountData.userId),
        type: accountData.type,
        provider: accountData.provider,
        providerAccountId: accountData.providerAccountId,
        refresh_token: accountData.refresh_token as string | null | undefined,
        access_token: accountData.access_token as string | null | undefined,
        expires_at: accountData.expires_at as number | null | undefined,
        token_type: accountData.token_type as string | null | undefined,
        scope: accountData.scope as string | null | undefined,
        id_token: accountData.id_token as string | null | undefined,
        session_state: accountData.session_state as string | null | undefined,
      });
    },
    
    async unlinkAccount({ providerAccountId, provider }) {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider)
          )
        );
    },
    
    async createSession({ sessionToken, userId, expires }) {
      await db.insert(sessions).values({
        sessionToken,
        userId: parseInt(userId),
        expires,
      });
      
      return {
        sessionToken,
        userId,
        expires,
      };
    },
    
    async getSessionAndUser(sessionToken) {
      const [result] = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.sessionToken, sessionToken))
        .limit(1);
      
      if (!result) return null;
      
      return {
        session: {
          sessionToken: result.session.sessionToken,
          userId: result.session.userId.toString(),
          expires: result.session.expires,
        },
        user: {
          ...result.user,
          id: result.user.id.toString(),
          emailVerified: result.user.emailVerified || null,
          image: result.user.image || null,
          name: result.user.name || null,
        },
      };
    },
    
    async updateSession({ sessionToken, expires }) {
      if (expires) {
        await db
          .update(sessions)
          .set({ expires })
          .where(eq(sessions.sessionToken, sessionToken));
      }
      
      const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .limit(1);
      
      if (!session) return null;
      
      return {
        sessionToken: session.sessionToken,
        userId: session.userId.toString(),
        expires: session.expires,
      };
    },
    
    async deleteSession(sessionToken) {
      await db
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken));
    },
    
    async createVerificationToken({ identifier, expires, token }) {
      await db.insert(verificationTokens).values({
        identifier,
        expires,
        token,
      });
      
      return {
        identifier,
        expires,
        token,
      };
    },
    
    async useVerificationToken({ identifier, token }) {
      const [verificationToken] = await db
        .select()
        .from(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token)
          )
        )
        .limit(1);
      
      if (!verificationToken) return null;
      
      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token)
          )
        );
      
      return {
        identifier: verificationToken.identifier,
        expires: verificationToken.expires,
        token: verificationToken.token,
      };
    },
  };
}