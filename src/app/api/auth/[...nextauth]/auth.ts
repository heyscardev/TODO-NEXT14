import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInEmailPassword } from "@/auth/actions/auth-actions";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholser: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        const user = await SignInEmailPassword(
          credentials?.email!,
          credentials?.password!
        );

        if (user) return user;

        return null;
      },
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
