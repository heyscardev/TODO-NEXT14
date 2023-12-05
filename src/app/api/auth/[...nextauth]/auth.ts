import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, user, credentials, email, profile }) {
      return true;
    },
    async jwt({ token, user, account, profile }) {
      const dbUSer = await prisma.user.findUnique({
        where: { id: token.sub ?? "no-id" },
      });
      if (dbUSer?.isActive === false) throw Error("User No Active");
      token.roles = dbUSer?.roles ?? ["no-roles"];
      token.id = dbUSer?.id ?? "no-uuid";
      token.isActive = dbUSer?.isActive ?? false;
      return token;
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.isActive = token.isActive;
      }

      return session;
    },
  },
};
export const handler = NextAuth(authOptions);
