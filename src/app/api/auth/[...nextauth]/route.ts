import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
