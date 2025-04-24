import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-title">Panel de Usuario</h2>

      <ul className="user-dashboard-menu">
        <li><button className="user-dashboard-button" onClick={() => navigate("/reportes")}>Reporte</button></li>
        <li><button className="user-dashboard-button" onClick={() => navigate("/quejas")}>Quejas</button></li>
        <li><button className="user-dashboard-button" onClick={() => navigate("/pagos")}>Pagos</button></li>
        <li><button className="user-dashboard-button" onClick={() => navigate("/encuestas")}>Encuestas</button></li>
        <li><button className="user-dashboard-button" onClick={() => navigate("/votaciones")}>Votaciones</button></li>
      </ul>

      <button className="user-dashboard-logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default UserDashboard;
