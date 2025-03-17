import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   profile(profile) {
        
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture || "https://example.com/default-image.png", // Ensure image is always present
    //     };
    //   },
     }),
  ],

  callbacks: {
    async signIn({ user }: { user: any }) {
      // console.log("🟢 User received in signIn callback:", user);

      await connectToDatabase();
      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // console.log("🟢 Creating new user in DB...");
        existingUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image || "https://example.com/default-image.png",
        });
      } else {
        // console.log("🟢 User already exists, checking image...");
        if (!existingUser.image) {
          existingUser.image = user.image;
          await existingUser.save();
          // console.log("🟢 Updated user image in DB!");
        }
      }

      // console.log("🟢 Final User in DB:", existingUser);
      return true;
    },

    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        // console.log("🟢 User inside JWT callback:", user);
        token.id = user.id;
        token.image = user.image; // Ensure image is stored in token
      }
      return token;
    },

    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      session.user.image = token.image; // Pass image in session
      return session;
    },

    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return "/userDashboard"; // Redirect to home page after login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
