import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading/Loading';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading fullHeight label="Verificando sessão..." />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
