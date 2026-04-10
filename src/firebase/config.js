import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDJjkvsr9E8CnjXYCwg5BjHnJwgP4GNLK0",
  authDomain: "projeto-cinema-c32f6.firebaseapp.com",
  projectId: "projeto-cinema-c32f6",
  storageBucket: "projeto-cinema-c32f6.firebasestorage.app",
  messagingSenderId: "595951018419",
  appId: "1:595951018419:web:0e1f2291b478b5d650ebc6",
  measurementId: "G-GGQ744Y1CF"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };