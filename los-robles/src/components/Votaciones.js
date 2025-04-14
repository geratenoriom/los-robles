import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import '../styles/Votaciones.css';

const Votaciones = () => {
  const [opcion, setOpcion] = useState("");
  const navigate = useNavigate();

  const registrarVoto = async () => {
    if (!opcion) {
      alert("Selecciona una opción.");
      return;
    }

    try {
      await addDoc(collection(db, "votaciones"), {
        opcion,
        fecha: Timestamp.now(),
        usuario: localStorage.getItem("uid")
      });
      alert("Voto registrado");
      setOpcion("");
    } catch (err) {
      alert("Error al votar: " + err.message);
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
    <div className="votaciones-container">
      <h3 className="votaciones-title">Votación</h3>
      <input
        className="votaciones-input"
        type="text"
        value={opcion}
        onChange={(e) => setOpcion(e.target.value)}
        placeholder="Ingresa tu opción"
      />
      <button className="votaciones-button" onClick={registrarVoto}>Votar</button>

      <div className="action-buttons">
        <button className="back-button" onClick={handleGoBack}>Regresar</button>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Votaciones;
