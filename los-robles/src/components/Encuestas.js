import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import "../styles/Encuestas.css";
import { onAuthStateChanged } from "firebase/auth";

const Encuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [userId, setUserId] = useState("");
  const [encuestasRespondidas, setEncuestasRespondidas] = useState([]);

  useEffect(() => {
    const obtenerUsuario = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        }
      });
    };

    const obtenerEncuestas = async () => {
      const querySnapshot = await getDocs(collection(db, "encuestas"));
      const encuestasData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((encuesta) => {
          const ahora = new Date();
          const fechaLimite = encuesta.fechaLimite?.toDate?.(); // prevenir errores si no existe
          return fechaLimite && ahora <= fechaLimite;
        });

      // Verificar las encuestas ya respondidas por el usuario
      const encuestasRespondidasData = await Promise.all(
        encuestasData.map(async (encuesta) => {
          const respuestaRef = query(
            collection(db, `encuestas/${encuesta.id}/respuestas`),
            where("usuarioId", "==", userId)
          );
          const respuestaSnapshot = await getDocs(respuestaRef);
          return respuestaSnapshot.empty ? null : encuesta.id;
        })
      );

      // Filtrar las encuestas respondidas
      setEncuestasRespondidas(encuestasRespondidasData.filter((id) => id !== null));
      setEncuestas(encuestasData);
    };

    obtenerUsuario();
    obtenerEncuestas();
  }, [userId]);

  const handleChange = (encuestaId, valor) => {
    setRespuestas({ ...respuestas, [encuestaId]: valor });
  };

  const enviarRespuesta = async (encuestaId) => {
    if (!respuestas[encuestaId]) {
      alert("Selecciona una respuesta.");
      return;
    }

    try {
      await addDoc(collection(db, `encuestas/${encuestaId}/respuestas`), {
        respuesta: respuestas[encuestaId],
        usuarioId: userId,
        fecha: Timestamp.now(),
      });
      alert("Respuesta enviada correctamente.");

      // Actualizamos la lista de encuestas respondidas para no mostrarla nuevamente
      setEncuestasRespondidas([...encuestasRespondidas, encuestaId]);
    } catch (error) {
      console.error("Error al guardar la respuesta: ", error);
      alert("Ocurrió un error al enviar la respuesta.");
    }
  };

  return (
    <div className="encuestas-container">
      <h2 className="encuestas-title">Encuestas activas</h2>
      {encuestas.length === 0 ? (
        <p>No hay encuestas activas en este momento.</p>
      ) : (
        encuestas.map((encuesta) => (
          !encuestasRespondidas.includes(encuesta.id) && (
            <div key={encuesta.id} className="encuesta-item">
              <h3>{encuesta.pregunta}</h3>
              <select
                className="encuesta-select"
                value={respuestas[encuesta.id] || ""}
                onChange={(e) => handleChange(encuesta.id, e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {encuesta.opciones.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
              <button className="encuesta-btn" onClick={() => enviarRespuesta(encuesta.id)}>
                Enviar respuesta
              </button>
            </div>
          )
        ))
      )}
    </div>
  );
};

export default Encuestas;
