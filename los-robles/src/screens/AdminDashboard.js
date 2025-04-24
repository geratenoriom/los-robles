// src/screens/AdminDashboard.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [calle, setCalle] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");
  const navigate = useNavigate();

  const crearUsuario = async () => {
    if (!nombreCompleto || !calle || !codigoPostal || !telefono || !email || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        nombreCompleto,
        calle,
        codigoPostal,
        telefono,
        email,
        rol,
      });

      alert("Usuario creado con éxito");
      setNombreCompleto("");
      setCalle("");
      setCodigoPostal("");
      setTelefono("");
      setEmail("");
      setPassword("");
      setRol("usuario");
    } catch (error) {
      alert("Error al crear usuario: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Panel de Administrador</h2>

      <div className="admin-dashboard-form">
        <input type="text" placeholder="Nombre completo" className="admin-input" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
        <input type="text" placeholder="Calle" className="admin-input" value={calle} onChange={(e) => setCalle(e.target.value)} />
        <input type="text" placeholder="Código Postal" className="admin-input" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
        <input type="text" placeholder="Teléfono" className="admin-input" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input type="email" placeholder="Correo" className="admin-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="admin-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <select className="admin-input" value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button className="admin-button" onClick={crearUsuario}>Añadir Usuario</button>
      </div>

      <div className="admin-dashboard-actions">
        <button className="admin-secondary-button" onClick={() => navigate("/usuarios-registrados")}>Gestión de Usuarios</button>
        <button className="admin-secondary-button" onClick={() => navigate("/reportes-generados")}>Consulta de Reportes</button>
        <button className="admin-secondary-button" onClick={() => navigate("/consulta-quejas")}>Consulta de Quejas</button>
        <button className="admin-secondary-button" onClick={() => navigate("/consulta-encuestas")}>Crear y Consultar Encuestas</button>
        <button className="admin-secondary-button" onClick={() => navigate("/votaciones-admin")}>Crear y Consultar Votaciones</button>
        <button className="admin-logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
