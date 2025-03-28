import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedUser = "taskger"; // Replace with your username or email
      return user.name === allowedUser || user.email === "moswit7@gmail.com";
    },
  },
};

// Named exports for GET and POST
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
