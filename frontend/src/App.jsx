import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { ToastProvider } from './components/Toast/ToastProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout.jsx';

import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import DashboardYear from './pages/DashboardYear/DashboardYear.jsx';
import Movimentations from './pages/Movimentations/Movimentations.jsx';
import Profile from './pages/Profile/Profile.jsx';
import SecretImage from "./components/SecretImage/SecretImage.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
          <SecretImage />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard-anual" element={<DashboardYear />} />
                  <Route path="/movimentacoes" element={<Movimentations />} />
                  <Route path="/perfil" element={<Profile />} />
                </Route>
              </Route>

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
