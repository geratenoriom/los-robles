import React from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Bienvenido</h2>
      <p>Has iniciado sesión con: {auth.currentUser?.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
