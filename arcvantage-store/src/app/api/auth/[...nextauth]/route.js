export const runtime = "nodejs";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toLowerCase();

        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        const user = result.rows[0];
        if (!user || !user.password_hash) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          profileComplete: user.profile_complete,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const existing = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [user.email]
        );

        let dbUser;

        if (existing.rows.length === 0) {
          const inserted = await pool.query(
            `INSERT INTO users 
             (email, name, image, profile_complete, points_balance, created_at, updated_at)
             VALUES ($1, $2, $3, false, 0, NOW(), NOW())
             RETURNING *`,
            [user.email, user.name, user.image]
          );

          dbUser = inserted.rows[0];
        } else {
          dbUser = existing.rows[0];
        }

        user.id = dbUser.id;
        user.profileComplete = dbUser.profile_complete;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profileComplete = user.profileComplete;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.profileComplete = token.profileComplete;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/post-login`;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };