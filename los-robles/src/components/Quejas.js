import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import '../styles/Quejas.css';

const Quejas = () => {
  const [queja, setQueja] = useState("");
  const navigate = useNavigate();

  const enviarQueja = async () => {
    if (!queja) {
      alert("Escribe tu queja.");
      return;
    }

    try {
      await addDoc(collection(db, "quejas"), {
        queja,
        fecha: Timestamp.now(),
        usuario: localStorage.getItem("uid")
      });
      alert("Queja enviada");
      setQueja("");
    } catch (err) {
      alert("Error al enviar queja: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="quejas-container">
      <h3 className="quejas-title">Enviar Queja</h3>
      <textarea
        className="quejas-textarea"
        value={queja}
        onChange={(e) => setQueja(e.target.value)}
        placeholder="Describe tu queja"
      />
      <button className="quejas-button" onClick={enviarQueja}>Enviar</button>

      <div className="action-buttons">
        <button className="back-button" onClick={handleGoBack}>Regresar</button>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Quejas;
