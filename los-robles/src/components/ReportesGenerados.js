import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import '../styles/ReportesGenerados.css';

const ReportesGenerados = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const reportesRef = collection(db, "reportes");
        const querySnapshot = await getDocs(reportesRef);

        const reportesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setReportes(reportesData);
      } catch (err) {
        console.error("Error al obtener los reportes:", err.message);
      }
    };

    fetchReportes();
  }, []);

  return (
    <div className="reportes-generados-container">
      <h3 className="reportes-generados-title">Reportes Generados</h3>
      <table className="reportes-generados-table">
        <thead>
          <tr>
            <th>Calle</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Nombre Completo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id}>
              <td>{reporte.calle || 'N/A'}</td>
              <td>{reporte.descripcion || 'Sin descripción'}</td>
              <td>{new Date(reporte.fecha.seconds * 1000).toLocaleString() || 'N/A'}</td> {/* Convertir timestamp a fecha */}
              <td>{reporte.nombreCompleto || 'N/A'}</td>
              <td>{reporte.telefono || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <button className="back-button" onClick={() => window.history.back()}>Regresar</button>
        <button className="logout-button" onClick={() => { /* Lógica de cierre de sesión */ }}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default ReportesGenerados;
