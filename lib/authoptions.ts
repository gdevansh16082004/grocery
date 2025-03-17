import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/user";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define a custom user type that includes an ID
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }: { user: CustomUser }) {
      await connectToDatabase();
      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        existingUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image || "https://example.com/default-image.png",
        });
      } else if (!existingUser.image) {
        existingUser.image = user.image;
        await existingUser.save();
      }

      return true;
    },

    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      if (user) {
        token.id = user.id; // Ensure ID is stored in token
        token.image = user.image ?? null; // Handle possible undefined values
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string, // Ensure TypeScript knows it's a string
          image: token.image as string | null,
        },
      };
    },

    async redirect() {
      return "/userDashboard";
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
