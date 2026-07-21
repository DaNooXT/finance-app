import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider';
import AuthProvider from './context/AuthProvider';
import { ToastProvider } from './components/Toast/ToastProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardYear from './pages/DashboardYear/DashboardYear';
import Movimentations from './pages/Movimentations/Movimentations';
import Profile from './pages/Profile/Profile';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
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
