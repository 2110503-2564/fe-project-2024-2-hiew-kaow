import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";
import { JWT } from "next-auth/jwt";
import { Session, DefaultSession } from "next-auth";

// Define the User interface to match the expected structure of the user object
interface User {
  _id: string;
  email: string;
  name: string;
  tel: string;
  password: string;  // Consider removing password in production
  role: string;
  token: string;  // JWT token
}

// Define the ExtendedJWT to include the user object
interface ExtendedJWT extends JWT {
  user?: User;
}

// Adjust the `session` callback to ensure proper types for `session` and `token`
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

        // Assuming userLogIn returns an object that matches the User interface
        const user = await userLogIn(credentials.email, credentials.password);

        if (user) {
          return user;  // Return user of type `User`
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // jwt callback: add the user to the token
    async jwt({ token, user }: { token: ExtendedJWT; user?: User }): Promise<ExtendedJWT> {
      if (user) {
        token.user = user;  // Add user to the token object
      }
      return token;
    },

    // session callback: properly type session and token
    async session({
      session,
      token,
    }: {
      session: Session | DefaultSession;
      token: JWT; // Default JWT type from NextAuth
      user: User | null; // The user from the callback
    }): Promise<Session | DefaultSession> {
      // Ensure token.user is accessible
      if (token && (token as ExtendedJWT).user) {
        session.user = (token as ExtendedJWT).user; // Safely assign user from token
      }
      return session; // Return the session object
    },
  },
};
