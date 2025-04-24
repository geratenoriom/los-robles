import React, { useEffect, useState } from "react";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../styles/Reportes.css";

const Reportes = () => {
  const [descripcion, setDescripcion] = useState("");
  const [usuarioData, setUsuarioData] = useState(null);
  const navigate = useNavigate();

  // Cargar los datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const uid = localStorage.getItem("uid");
      if (uid) {
        try {
          const docRef = doc(db, "usuarios", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUsuarioData(docSnap.data());
          } else {
            console.warn("No se encontró la información del usuario.");
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error.message);
        }
      }
    };

    fetchUserData();
  }, []);

  // Enviar el reporte a la base de datos
  const enviarReporte = async () => {
    if (!descripcion || !usuarioData) {
      alert("Faltan datos necesarios para enviar el reporte.");
      return;
    }

    try {
      await addDoc(collection(db, "reportes"), {
        descripcion,
        fecha: Timestamp.now(),
        uid: localStorage.getItem("uid"),
        nombreCompleto: usuarioData.nombreCompleto || "",
        calle: usuarioData.calle || "",
        telefono: usuarioData.telefono || "",
        correo: usuarioData.correo || ""
      });

      alert("Reporte enviado");
      setDescripcion("");
    } catch (err) {
      console.error("Error al enviar reporte:", err.message);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  // Regresar a la pantalla anterior
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="reportes-container">
      <h3 className="reportes-title">Enviar Reporte</h3>
      
      {/* Resumen del usuario */}
      {usuarioData && (
        <div className="usuario-resumen">
          <h4>Resumen de tus datos:</h4>
          <p><strong>Nombre completo:</strong> {usuarioData.nombreCompleto}</p>
          <p><strong>Calle:</strong> {usuarioData.calle}</p>
          <p><strong>Teléfono:</strong> {usuarioData.telefono}</p>
          <p><strong>Correo:</strong> {usuarioData.correo}</p>
        </div>
      )}

      <textarea
        className="reportes-textarea"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Describe el reporte"
      />
      <button className="reportes-button" onClick={enviarReporte}>
        Enviar
      </button>

      <div className="action-buttons">
        <button className="back-button" onClick={handleGoBack}>
          Regresar
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Reportes;
