import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { dbConnection } from '@/utils/db';
import User from '@/models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.ID,
      clientSecret: process.env.SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const userSession = await User.findOne({
        email: session.user.email,
      });

      session.user.id = userSession._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await dbConnection();
        const userPresent = await User.findOne({
          email: profile.email,
        });

        if (!userPresent) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, '').toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
