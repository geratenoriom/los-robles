// Importa las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de tu app en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHpre_oKIWy2oJXZzEkTHfWE2EYuYXRR4",
  authDomain: "los-robles-de450.firebaseapp.com",
  projectId: "los-robles-de450",
  storageBucket: "los-robles-de450.appspot.com",
  messagingSenderId: "945360971660",
  appId: "1:945360971660:web:9a43e5e8f7b4454d2e58a9",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación
const auth = getAuth(app);

// Exporta 'auth' para poder usarla en otras partes del proyecto
export { auth };
