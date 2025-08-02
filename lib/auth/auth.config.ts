import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { CustomDrizzleAdapter } from "@/lib/auth/custom-adapter";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { comparePasswords } from "@/lib/auth/session";
import { eq } from "drizzle-orm";
import { validateOAuthEnv } from "@/lib/auth/validate-env";

// Validate environment on startup
const envValidation = validateOAuthEnv();
if (!envValidation.isValid) {
  console.error('OAuth Environment Configuration Errors:');
  envValidation.errors.forEach(error => console.error(`  - ${error}`));
}

const providers = [];

// Only add Google provider if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Only add GitHub provider if credentials are configured
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Always add Credentials provider
providers.push(
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, credentials.email as string))
        .limit(1);

      if (!user || !user.passwordHash) {
        return null;
      }

      const isValid = await comparePasswords(
        credentials.password as string,
        user.passwordHash
      );

      if (!isValid) {
        return null;
      }

      return {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerifiedAt,
      };
    }
  })
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: CustomDrizzleAdapter(),
  providers,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days for "remember me"
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/verify-email",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      // Allow OAuth sign in
      if (account?.provider !== "credentials") {
        return true;
      }
      
      // For credentials provider, check if email is verified
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email!))
        .limit(1);
        
      // Allow sign in even if email not verified (we'll show warning in UI)
      return true;
    }
  },
  events: {
    async signIn({ user, account }) {
      // Log sign in activity
      if (user?.id) {
        await db
          .update(users)
          .set({ lastLoginAt: new Date() })
          .where(eq(users.id, parseInt(user.id)));
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});