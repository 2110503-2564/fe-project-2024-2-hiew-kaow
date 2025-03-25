import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";

// Define User interface to match the expected structure of the user object
interface User {
  _id: string;    // Required field
  email: string;
  name: string;
  tel: string;    // Assuming phone number is part of the user object
  password: string; // Assuming password is part of the user object (consider removing in production)
  role: string;
  token: string;   // JWT token, assuming it's part of the user object
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Assuming userLogIn returns an object that matches the User interface
        const user = await userLogIn(credentials.email, credentials.password);

        if (user) {
          return user;  // Make sure this returns a user of type `User`
        } else {
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }): Promise<any> {
      if (user) {
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    }
  }
};
