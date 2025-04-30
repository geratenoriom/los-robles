import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import AdminDashboard from "./screens/AdminDashboard";
import UserDashboard from "./screens/UserDashboard";
import Reportes from "./components/Reportes";
import Quejas from "./components/Quejas";
import Pagos from "./components/Pagos";
import Encuestas from "./components/Encuestas";
import Votaciones from "./components/Votaciones";
import UsuariosRegistrados from "./screens/UsuariosRegistrados";
import ReportesGenerados from "./components/ReportesGenerados";
import ConsultaQuejas from "./components/ConsultaQuejas";
import CrearConsultarVotaciones from "./components/CrearConsultarVotaciones";
import CrearConsultarEncuestas from "./components/CrearConsultarEncuestas";  // Importa el nuevo componente

import './styles/Login.css';
import './styles/UserDashboard.css';
import './styles/Reportes.css';
import './styles/Quejas.css';
import './styles/Pagos.css';
import './styles/Encuestas.css';
import './styles/Votaciones.css';
import './styles/AdminDashboard.css';
import './styles/UsuariosRegistrados.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/usuarios-registrados" element={<UsuariosRegistrados />} />
        <Route path="/usuario" element={<UserDashboard />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/quejas" element={<Quejas />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/encuestas" element={<Encuestas />} />
        <Route path="/votaciones" element={<Votaciones />} />
        <Route path="/reportes-generados" element={<ReportesGenerados />} />
        <Route path="/consulta-quejas" element={<ConsultaQuejas />} />
        <Route path="/votaciones-admin" element={<CrearConsultarVotaciones />} />
        <Route path="/encuestas-admin" element={<CrearConsultarEncuestas />} />  {/* Nueva ruta para el componente */}
      </Routes>
    </Router>
  );
}

export default App;
