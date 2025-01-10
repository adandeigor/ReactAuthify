import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt";
import { z } from "zod";
import config from "@/src/config";
import credentialsSchema from "@/src/schema/userSchema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}


const firebaseApp = initializeApp(config.firebase);
const db = getFirestore(firebaseApp);

// Schéma Zod pour valider les données d'entrée


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Custom Auth",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Valider les données d'entrée avec Zod
          const { email, password } = credentialsSchema.parse(credentials);
          // Récupérer les données utilisateur depuis Firestore
          const userDocRef = doc(db, "users", email);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            throw new Error("Utilisateur introuvable.");
          }

          const userData = userDoc.data();
          // Vérifier le mot de passe avec bcrypt
          const isPasswordValid = await bcrypt.compare(password, userData.password);
          if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect.");
          }

          // Si tout est correct, retourner les données utilisateur
          return {
            id: userDoc.id,
            email: userData.email,
            name: userData.name || "Utilisateur",
          };
        } catch (error) {
          console.error("Erreur d'authentification :", error);
          if (error instanceof Error) {
            throw new Error(error.message || "Erreur d'authentification.");
          }
          throw new Error("Erreur d'authentification.");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? "Utilisateur";
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  secret: config.nextAuth.secret, // Utilisation du secret depuis le fichier de config
  debug: process.env.NODE_ENV === "development",
});
