import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "./db";
import User from "@/lib/models/user"; // Import Mongoose User model

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      await connectToDatabase();
      const existingUser = await User.findOne({ email: user.email });
      

      if (!existingUser) {
        await User.create({ name: user.name, email: user.email, image: user.image });
      }
      return true; // Allow sign-in
    },

    async jwt({ token, user }: { token: any, user: any }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      return session;
    },

    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
        return "/"; // Redirect to dashboard after login
      },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
