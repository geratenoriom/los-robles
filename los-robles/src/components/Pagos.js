import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import '../styles/Pagos.css';

const Pagos = () => {
  const [monto, setMonto] = useState("");
  const navigate = useNavigate();

  const registrarPago = async () => {
    if (!monto) {
      alert("Ingresa el monto.");
      return;
    }

    try {
      await addDoc(collection(db, "pagos"), {
        monto: parseFloat(monto),
        fecha: Timestamp.now(),
        usuario: localStorage.getItem("uid")
      });
      alert("Pago registrado");
      setMonto("");
    } catch (err) {
      alert("Error al registrar pago: " + err.message);
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
    <div className="pagos-container">
      <h3 className="pagos-title">Registrar Pago</h3>
      <input
        className="pagos-input"
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto"
      />
      <button className="pagos-button" onClick={registrarPago}>Registrar</button>

      <div className="action-buttons">
        <button className="back-button" onClick={handleGoBack}>Regresar</button>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Pagos;
