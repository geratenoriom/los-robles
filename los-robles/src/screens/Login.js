import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";  // Importar desde el archivo config
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor llena todos los campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { rol } = docSnap.data();
        localStorage.setItem("rol", rol);
        localStorage.setItem("uid", uid);

        if (rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/usuario");
        }
      } else {
        alert("El usuario no tiene un rol asignado.");
      }

    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="login-container">
    <h1 className="titulo">Residencial los Robles</h1>
      <h2 className="login-title">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        className="login-input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="login-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
