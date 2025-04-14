import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import '../styles/Reportes.css';

const Reportes = () => {
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const enviarReporte = async () => {
    if (!descripcion) {
      alert("Escribe una descripción.");
      return;
    }

    try {
      await addDoc(collection(db, "reportes"), {
        descripcion,
        fecha: Timestamp.now(),
        usuario: localStorage.getItem("uid")
      });
      alert("Reporte enviado");
      setDescripcion("");
    } catch (err) {
      console.error("Error al enviar reporte:", err.message);
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
    <div className="reportes-container">
      <h3 className="reportes-title">Enviar Reporte</h3>
      <textarea
        className="reportes-textarea"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Describe el reporte"
      />
      <button className="reportes-button" onClick={enviarReporte}>Enviar</button>

      <div className="action-buttons">
        <button className="back-button" onClick={handleGoBack}>Regresar</button>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Reportes;
