import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";
import { JWT } from "next-auth/jwt";

interface User {
  email: string;
  name: string;}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await userLogIn(credentials.email, credentials.password);

        if (user) {
          return user; 
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({token,user}) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = token as User;
      return session;
    },
  },
};
