import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import '../styles/Encuestas.css';

const Encuestas = () => {
  const [respuesta, setRespuesta] = useState("");
  const navigate = useNavigate();

  const enviarEncuesta = async () => {
    if (!respuesta) {
      alert("Escribe tu respuesta.");
      return;
    }

    try {
      await addDoc(collection(db, "encuestas"), {
        respuesta,
        fecha: Timestamp.now(),
        usuario: localStorage.getItem("uid")
      });
      alert("Encuesta enviada");
      setRespuesta("");
    } catch (err) {
      alert("Error al enviar encuesta: " + err.message);
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
    <div className="encuestas-container">
      <h3 className="encuestas-title">Responder Encuesta</h3>
      <textarea
        className="encuestas-textarea"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe tu respuesta"
      />
      <button className="encuestas-button" onClick={enviarEncuesta}>Enviar</button>

      <div className="action-buttons">
        <button className="back-button" onClick={handleGoBack}>Regresar</button>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Encuestas;
