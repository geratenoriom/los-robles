// Implementación en React para la plataforma de administración comunitaria

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import PaymentGateway from "./pages/PaymentGateway";
import WhatsAppIntegration from "./pages/WhatsAppIntegration";
import VotingSystem from "./pages/VotingSystem";
import Notifications from "./pages/Notifications";
import ComplaintForm from "./pages/ComplaintForm";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import MeetingLogs from "./pages/MeetingLogs";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
        <Route path="/whatsapp-integration" element={<WhatsAppIntegration />} />
        <Route path="/voting-system" element={<VotingSystem />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/complaint-form" element={<ComplaintForm />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meeting-logs" element={<MeetingLogs />} />
      </Routes>
    </Router>
  );
};

export default App;