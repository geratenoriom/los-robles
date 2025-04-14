import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHpre_oKIWy2oJXZzEkTHfWE2EYuYXRR4",
    authDomain: "los-robles-de450.firebaseapp.com",
    databaseURL: "https://los-robles-de450-default-rtdb.firebaseio.com",
    projectId: "los-robles-de450",
    storageBucket: "los-robles-de450.firebasestorage.app",
    messagingSenderId: "945360971660",
    appId: "1:945360971660:web:9a43e5e8f7b4454d2e58a9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
