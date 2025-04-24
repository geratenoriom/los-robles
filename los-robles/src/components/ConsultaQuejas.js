// src/components/ConsultaEncuestas.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config"; // Ajusta la ruta si es diferente
import { collection, getDocs, addDoc } from "firebase/firestore";
import "../styles/ConsultaEncuestas.css";

const ConsultaEncuestas = () => {
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", ""]);
  const [encuestas, setEncuestas] = useState([]);

  useEffect(() => {
    const cargarEncuestas = async () => {
      const encuestasRef = collection(db, "encuestas");
      const snapshot = await getDocs(encuestasRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEncuestas(data);
    };

    cargarEncuestas();
  }, []);

  const agregarOpcion = () => {
    setOpciones([...opciones, ""]);
  };

  const cambiarOpcion = (index, value) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index] = value;
    setOpciones(nuevasOpciones);
  };

  const guardarEncuesta = async () => {
    if (!pregunta.trim() || opciones.some(op => !op.trim())) {
      alert("Completa la pregunta y todas las opciones");
      return;
    }

    try {
      await addDoc(collection(db, "encuestas"), {
        pregunta,
        opciones,
        fechaCreacion: new Date()
      });
      alert("Encuesta guardada con éxito");
      setPregunta("");
      setOpciones(["", ""]);
    } catch (error) {
      console.error("Error al guardar la encuesta:", error);
      alert("Error al guardar la encuesta");
    }
  };

  return (
    <div className="consulta-encuestas">
      <h3>Crear nueva encuesta</h3>
      <input
        type="text"
        placeholder="Escribe la pregunta"
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
      />
      {opciones.map((opcion, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Opción ${index + 1}`}
          value={opcion}
          onChange={(e) => cambiarOpcion(index, e.target.value)}
        />
      ))}
      <button onClick={agregarOpcion}>Agregar opción</button>
      <button onClick={guardarEncuesta}>Guardar encuesta</button>

      <h4>Encuestas existentes</h4>
      <ul>
        {encuestas.map((encuesta) => (
          <li key={encuesta.id}>
            {encuesta.pregunta} ({encuesta.opciones.length} opciones)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultaEncuestas;
