import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "../styles/CrearConsultarEncuestas.css";

const CrearConsultarEncuestas = () => {
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", "", ""]);
  const [encuestas, setEncuestas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const navigate = useNavigate();

  // Cargar las encuestas y las respuestas al montar el componente
  useEffect(() => {
    const obtenerDatos = async () => {
      await obtenerEncuestas();
      await obtenerRespuestas();
    };
    obtenerDatos();
  }, []);

  const obtenerEncuestas = async () => {
    const querySnapshot = await getDocs(collection(db, "encuestas"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEncuestas(data);
  };

  const obtenerRespuestas = async () => {
    const snapshot = await getDocs(collection(db, "respuestasEncuesta"));
    const data = snapshot.docs.map(doc => doc.data());

    const conteo = {};
    data.forEach(({ idEncuesta, respuesta }) => {
      if (!conteo[idEncuesta]) conteo[idEncuesta] = {};
      if (!conteo[idEncuesta][respuesta]) conteo[idEncuesta][respuesta] = 0;
      conteo[idEncuesta][respuesta]++; 
    });

    setRespuestas(conteo);
  };

  const crearEncuesta = async () => {
    if (!pregunta || opciones.some(op => !op)) {
      alert("Completa todos los campos");
      return;
    }

    const nuevaEncuesta = {
      pregunta,
      opciones,
      fechaCreacion: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "encuestas"), nuevaEncuesta);
      alert("Encuesta creada con éxito");
      setPregunta("");
      setOpciones(["", "", ""]);
      await obtenerEncuestas();
    } catch (error) {
      alert("Error al crear la encuesta: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="encuestas-container">
      <h3>Crear Encuesta</h3>
      <input type="text" placeholder="Pregunta" value={pregunta} onChange={(e) => setPregunta(e.target.value)} />
      {opciones.map((op, index) => (
        <input key={index} type="text" placeholder={`Opción ${index + 1}`} value={op}
          onChange={(e) => {
            const nuevasOpciones = [...opciones];
            nuevasOpciones[index] = e.target.value;
            setOpciones(nuevasOpciones);
          }} />
      ))}
      <button onClick={crearEncuesta}>Crear Encuesta</button>

      <h3>Encuestas Creadas</h3>
      <ul>
        {encuestas.map((e) => (
          <li key={e.id}>
            <strong>{e.pregunta}</strong>
            <ul>
              {e.opciones.map((op, idx) => (
                <li key={idx}>
                  {op}: {respuestas[e.id]?.[op] || 0} respuestas
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

export default CrearConsultarEncuestas;
