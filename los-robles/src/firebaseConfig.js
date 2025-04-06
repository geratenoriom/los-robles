import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHpre_oKIWy2oJXZzEkTHfWE2EYuYXRR4",
  authDomain: "los-robles-de450.firebaseapp.com",
  databaseURL: "https://los-robles-de450-default-rtdb.firebaseio.com",
  projectId: "los-robles-de450",
  storageBucket: "los-robles-de450.firebasestorage.app",
  messagingSenderId: "945360971660",
  appId: "1:945360971660:web:9a43e5e8f7b4454d2e58a9"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
