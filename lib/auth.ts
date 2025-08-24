import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/env/server";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth from "next-auth";
import { firestore } from "./firestore";
import { auth as fbAuth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Try to create a new user first
          const userCredential = await createUserWithEmailAndPassword(
            fbAuth,
            credentials.email as string,
            credentials.password as string
          );

          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              emailVerified: userCredential.user.emailVerified,
              name: userCredential.user.displayName,
              image: userCredential.user.photoURL,
            };
          }
          return null;
        } catch (error: any) {
          // If user already exists, try to sign in
          if (error.code === "auth/email-already-in-use") {
            try {
              const signInResult = await signInWithEmailAndPassword(
                fbAuth,
                credentials.email as string,
                credentials.password as string
              );

              if (signInResult.user) {
                return {
                  id: signInResult.user.uid,
                  email: signInResult.user.email,
                  emailVerified: signInResult.user.emailVerified,
                  name: signInResult.user.displayName,
                  image: signInResult.user.photoURL,
                };
              }
            } catch (signInError) {
              console.error("Error signing in:", signInError);
              return null;
            }
          }
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],
});
