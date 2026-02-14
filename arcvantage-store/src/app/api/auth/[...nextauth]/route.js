import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    session: {
        strategy: "jwt"
    },
    cookies: {
        sessionToken:{
            name: "arcvantage_session",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production"
            }
        }
    },
    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions);

export{handler as GET, handler as POST};