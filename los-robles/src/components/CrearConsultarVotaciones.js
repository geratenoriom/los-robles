import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "../styles/CrearConsultarVotaciones.css";

const CrearConsultarVotaciones = () => {
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", "", ""]);
  const [tiempoLimite, setTiempoLimite] = useState("");
  const [votaciones, setVotaciones] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      await obtenerVotaciones();
      await obtenerRespuestas();
    };
    obtenerDatos();
  }, []);

  const obtenerVotaciones = async () => {
    const querySnapshot = await getDocs(collection(db, "votaciones"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVotaciones(data);
  };

  const obtenerRespuestas = async () => {
    const snapshot = await getDocs(collection(db, "respuestasVotacion"));
    const data = snapshot.docs.map(doc => doc.data());

    const conteo = {};
    data.forEach(({ idVotacion, respuesta }) => {
      if (!conteo[idVotacion]) conteo[idVotacion] = {};
      if (!conteo[idVotacion][respuesta]) conteo[idVotacion][respuesta] = 0;
      conteo[idVotacion][respuesta]++;
    });

    setRespuestas(conteo);
  };

  const crearVotacion = async () => {
    if (!pregunta || opciones.some(op => !op) || !tiempoLimite) {
      alert("Completa todos los campos");
      return;
    }

    const nuevaVotacion = {
      pregunta,
      opciones,
      tiempoLimite: Timestamp.fromDate(new Date(tiempoLimite)),
      creadaEn: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "votaciones"), nuevaVotacion);
      alert("Votación creada con éxito");
      setPregunta("");
      setOpciones(["", "", ""]);
      setTiempoLimite("");
      await obtenerVotaciones();
    } catch (error) {
      alert("Error al crear la votación: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="votaciones-container">
      <h3>Crear Votación</h3>
      <input type="text" placeholder="Pregunta" value={pregunta} onChange={(e) => setPregunta(e.target.value)} />
      {opciones.map((op, index) => (
        <input key={index} type="text" placeholder={`Opción ${index + 1}`} value={op}
          onChange={(e) => {
            const nuevasOpciones = [...opciones];
            nuevasOpciones[index] = e.target.value;
            setOpciones(nuevasOpciones);
          }} />
      ))}
      <input type="datetime-local" value={tiempoLimite} onChange={(e) => setTiempoLimite(e.target.value)} />
      <button onClick={crearVotacion}>Crear Votación</button>

      <h3>Votaciones Creadas</h3>
      <ul>
        {votaciones.map((v) => (
          <li key={v.id}>
            <strong>{v.pregunta}</strong> - Hasta:{" "}
            {new Date(v.tiempoLimite?.seconds * 1000).toLocaleString()}
            <ul>
              {v.opciones.map((op, idx) => (
                <li key={idx}>
                  {op}: {respuestas[v.id]?.[op] || 0} votos
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="botones-navegacion">
        <button onClick={() => navigate("/admin")}>Regresar</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default CrearConsultarVotaciones;
