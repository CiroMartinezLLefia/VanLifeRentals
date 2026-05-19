import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString() ?? "";
        const password = credentials?.password?.toString() ?? "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name ?? "",
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: JWT; user?: unknown }) {
      if (user) {
        const currentUser = user as { id: string; role?: string };
        token.id = currentUser.id;
        token.role = currentUser.role;
      }
      return token;
    },
    session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export const handlers = { GET: handler, POST: handler };

export function auth() {
  return getServerSession(authOptions);
}
