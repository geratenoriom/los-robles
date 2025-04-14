import React, { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const crearUsuario = async () => {
    if (!newEmail || !newPassword) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        email: newEmail,
        rol: "usuario"
      });

      alert("Usuario creado con éxito");
      setNewEmail("");
      setNewPassword("");
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
        <input 
          type="email" 
          placeholder="Nuevo usuario" 
          className="admin-input" 
          onChange={(e) => setNewEmail(e.target.value)} 
          value={newEmail}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="admin-input" 
          onChange={(e) => setNewPassword(e.target.value)} 
          value={newPassword}
        />
        <button className="admin-button" onClick={crearUsuario}>Añadir Usuario</button>
      </div>
      
      <div className="admin-dashboard-actions">
        <button className="admin-logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
