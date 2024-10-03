import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
 
// Initialiser l'appli Firebase
const app = initializeApp(firebaseConfig);
 
// Obtenir une connexion à la BD Firestore
export const bd = getFirestore(app);
 
/*********** Initialiser Auth */
export const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
 
// Storage
export const stockage = getStorage(app);
 
// Noms des collections Firestore utilisées dans l'appli
export const collBandes = 'jse-bandes';
export const collComs = 'commentaires';
export const collUtilisateurs = 'jse-utilisateurs';