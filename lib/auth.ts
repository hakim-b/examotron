import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/env/server";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth from "next-auth";
import { firestore } from "./firestore";
import { auth as fbAuth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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

      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          fbAuth,
          credentials.email as string,
          credentials.password as string
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }

            return null;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(`Error ${errorCode}: ${errorMessage}`);
          });
      },
    }),
  ],
});
