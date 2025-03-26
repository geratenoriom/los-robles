import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy4EEsLtynTgBL56O-cvPz-_2UBfhpNKE",
  authDomain: "los-robles-2a5f5.firebaseapp.com",
  projectId: "los-robles-2a5f5",
  storageBucket: "los-robles-2a5f5.firebasestorage.app",
  messagingSenderId: "457573383298",
  appId: "1:457573383298:web:a3854aadacde0096cd089b"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
