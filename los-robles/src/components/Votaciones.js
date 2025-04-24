import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "../styles/Votaciones.css";

function Votaciones() {
  const [votaciones, setVotaciones] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const navigate = useNavigate();

  const cargarVotaciones = async () => {
    const snapshot = await getDocs(collection(db, "votaciones"));
    const ahora = new Date();
    const data = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(v => v.tiempoLimite && v.tiempoLimite.toDate && v.tiempoLimite.toDate() > ahora);
    setVotaciones(data);
  };

  useEffect(() => {
    cargarVotaciones();
  }, []);

  const enviarRespuesta = async (idVotacion) => {
    const respuesta = respuestas[idVotacion];
    if (!respuesta) {
      alert("Selecciona una opción");
      return;
    }

    try {
      await addDoc(collection(db, "respuestasVotacion"), {
        idVotacion,
        respuesta,
        fecha: new Date(),
      });
      alert("Respuesta enviada");
    } catch (error) {
      console.error("Error al enviar respuesta: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleVolver = () => {
    navigate("/userDashboard");
  };

  return (
    <div className="votaciones-container">
      <h3 className="votaciones-title">Votaciones Activas</h3>

      {votaciones.length === 0 ? (
        <p className="votaciones-mensaje">No hay votaciones activas</p>
      ) : (
        votaciones.map(v => (
          <div className="votacion-box" key={v.id}>
            <h4 className="votacion-pregunta">{v.pregunta}</h4>
            {v.opciones.map((op, idx) => (
              <div className="votacion-opcion" key={idx}>
                <input
                  type="radio"
                  name={`votacion-${v.id}`}
                  value={op}
                  onChange={() => setRespuestas({ ...respuestas, [v.id]: op })}
                />
                {op}
              </div>
            ))}
            <button className="votacion-button" onClick={() => enviarRespuesta(v.id)}>
              Enviar respuesta
            </button>
          </div>
        ))
      )}

      <div className="votaciones-actions">
        <button className="admin-secondary-button1" onClick={handleVolver}>
          Regresar
        </button>
        <button className="admin-logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Votaciones;
