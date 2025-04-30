import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../styles/ConsultaQuejas.css";

const ConsultaQuejas = () => {
  const [quejas, setQuejas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quejas"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuejas(data);
      } catch (error) {
        console.error("Error al obtener las quejas:", error.message);
      }
    };

    fetchQuejas();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="consulta-quejas">
      <h3>Lista de Quejas Recibidas</h3>
      <ul>
        {quejas.map((queja) => (
          <li key={queja.id}>
            <p><strong>Nombre:</strong> {queja.nombreCompleto}</p>
            <p><strong>Calle:</strong> {queja.calle}</p>
            <p><strong>Teléfono:</strong> {queja.telefono}</p>
            <p><strong>Correo:</strong> {queja.correo}</p>
            <p><strong>Descripción:</strong> {queja.descripcion}</p>
            <hr />
          </li>
        ))}
      </ul>

      <div className="consulta-quejas-buttons">
        <button className="back-button" onClick={handleGoBack}>Regresar</button>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default ConsultaQuejas;
