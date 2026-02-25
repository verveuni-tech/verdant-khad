import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyAlNPWtP6Sod7X9_nsRkA0KZaCi0iSEMps",
  authDomain: "verdant-khad.firebaseapp.com",
  projectId: "verdant-khad",
  storageBucket: "verdant-khad.firebasestorage.app",
  messagingSenderId: "511722157387",
  appId: "1:511722157387:web:1a6f54235faa909b93a4ce"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
window.auth = auth; // TEMP DEBUG