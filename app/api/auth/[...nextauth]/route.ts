import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prismadb";

declare module "next-auth" {
  interface User {
    username: string;
  }

  interface Session {
    user: {
      username: string;
    };
  }
  interface JWT {
    username: string;
  }
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", name: "email", type: "email" },
        username: { label: "username", name: "username", type: "text" },
        password: { label: "password", name: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.username = token.username as string;
      console.log(session);

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30,
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
