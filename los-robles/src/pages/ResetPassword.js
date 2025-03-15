import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      setError("");
      setTimeout(() => navigate("/"), 5000); // Redirige al login después de 5 segundos
    } catch (err) {
      setError("No se pudo enviar el correo de recuperación. Verifica el email.");
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Recuperar Contraseña</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar correo de recuperación</button>
      </form>

      <p><Link to="/">Volver al inicio de sesión</Link></p>
    </div>
  );
};

export default ResetPassword;
