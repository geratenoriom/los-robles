import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const UsuarioRegistrado = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const obtenerUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const usuariosData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsuarios(usuariosData);
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      await deleteDoc(doc(db, "usuarios", id));
      obtenerUsuarios(); // refrescar la lista
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Usuarios Registrados</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Calle</th>
            <th>Código Postal</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.nombreCompleto}</td>
              <td>{usuario.calle}</td>
              <td>{usuario.codigoPostal}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol}</td>
              <td>
                <button className="admin-button" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-dashboard-actions">
        <button className="admin-secondary-button" onClick={() => navigate("/admin")}>
          ← Regresar
        </button>
      </div>
    </div>
  );
};

export default UsuarioRegistrado;
