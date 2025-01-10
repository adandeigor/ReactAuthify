import credentialsSchema from "@/src/schema/userSchema"; // Zod schema pour valider les données
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { getFirestore } from "firebase/firestore"; // Firebase client pour Firestore
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Méthode de requête invalide, utilisez POST",
      success: false,
    });
  }

  const { email, password } = req.body;

  // Valider les données avec Zod
  try {
    credentialsSchema.parse({ email, password });
  } catch (error: any) {
    return res.status(400).json({
      message: "Données invalides",
      errors: error.errors,
      success: false,
    });
  }


  // Vérifier si l'utilisateur existe déjà
  try {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return res.status(409).json({
        message: "Cet email est déjà utilisé",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la vérification de l'utilisateur",
      success: false,
    });
  }

  // Hacher le mot de passe et enregistrer les données
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await setDoc(doc(db, "users", email), {
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({
      message: "Utilisateur enregistré avec succès",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de l'enregistrement des données",
      success: false,
    });
  }
};

export default SignUp;
