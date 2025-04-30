import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import "../styles/Votaciones.css";

function Votaciones() {
  const [votaciones, setVotaciones] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [respuestasEnviadas, setRespuestasEnviadas] = useState({});
  const navigate = useNavigate();
  const usuarioId = "ID_DEL_USUARIO"; // Sustituye por auth.currentUser.uid si estás usando autenticación

  const cargarVotaciones = async () => {
    const snapshot = await getDocs(collection(db, "votaciones"));
    const ahora = new Date();
    const data = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(v => v.tiempoLimite && v.tiempoLimite.toDate && v.tiempoLimite.toDate() > ahora);
    
    const respuestasSnapshot = await getDocs(
      query(collection(db, "respuestasVotacion"), where("usuarioId", "==", usuarioId))
    );

    const respuestasUsuario = {};
    respuestasSnapshot.docs.forEach(doc => {
      const { idVotacion } = doc.data();
      respuestasUsuario[idVotacion] = true;
    });

    setRespuestasEnviadas(respuestasUsuario);
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
        usuarioId,
      });
      alert("Respuesta enviada");
      setRespuestasEnviadas(prev => ({ ...prev, [idVotacion]: true }));
    } catch (error) {
      console.error("Error al enviar respuesta: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleVolver = () => {
    navigate("/usuario");
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
                  disabled={respuestasEnviadas[v.id]}
                />
                {op}
              </div>
            ))}
            {respuestasEnviadas[v.id] ? (
              <p className="votacion-participado">Ya has participado en esta votación</p>
            ) : (
              <button className="votacion-button" onClick={() => enviarRespuesta(v.id)}>
                Enviar respuesta
              </button>
            )}
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
