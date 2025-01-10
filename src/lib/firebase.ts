import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "../config";

// Initialisation de Firebase
const firebaseApp = initializeApp(config.firebase);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
