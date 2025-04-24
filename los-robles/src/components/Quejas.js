import React, { useEffect, useState } from "react";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../styles/Quejas.css";

const Quejas = () => {
  const [descripcion, setDescripcion] = useState("");
  const [usuarioData, setUsuarioData] = useState(null);
  const navigate = useNavigate();

  // Cargar los datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const uid = localStorage.getItem("uid");
      if (uid) {
        try {
          const docRef = doc(db, "usuarios", uid); // Obtener documento de usuarios
          const docSnap = await getDoc(docRef); // Obtener datos del documento
          if (docSnap.exists()) {
            setUsuarioData(docSnap.data()); // Guardar los datos del usuario en el estado
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

  // Enviar la queja a Firestore
  const enviarQueja = async () => {
    if (!descripcion || !usuarioData) {
      alert("Faltan datos necesarios para enviar la queja.");
      return;
    }

    try {
      await addDoc(collection(db, "quejas"), {
        descripcion,
        fecha: Timestamp.now(),
        uid: localStorage.getItem("uid"),
        nombreCompleto: usuarioData.nombreCompleto || "",
        calle: usuarioData.calle || "",
        telefono: usuarioData.telefono || "",
        correo: usuarioData.correo || ""
      });

      alert("Queja enviada");
      setDescripcion(""); // Limpiar el campo de descripción
    } catch (err) {
      console.error("Error al enviar la queja:", err.message);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/"); // Redirigir al inicio
  };

  // Regresar a la pantalla anterior
  const handleGoBack = () => {
    navigate(-1); // Regresar a la página anterior
  };

  return (
    <div className="quejas-container">
      <h3 className="quejas-title">Enviar Queja</h3>
      
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
        className="quejas-textarea"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Describe tu queja"
      />
      <button className="quejas-button" onClick={enviarQueja}>
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

export default Quejas;
