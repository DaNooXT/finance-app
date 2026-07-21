import { useCallback, useMemo, useState } from 'react';
import AuthContext from './AuthContext';
import AuthService from '../services/AuthService';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => AuthService.getStoredUser());
  const [token, setToken] = useState(() => AuthService.getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { token: newToken, user: newUser } = await AuthService.login(credentials);
      AuthService.persistSession(newToken, newUser);
      setToken(newToken);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message || 'Não foi possível entrar.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const { token: newToken, user: newUser } = await AuthService.register(payload);
      AuthService.persistSession(newToken, newUser);
      setToken(newToken);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message || 'Não foi possível criar a conta.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      loading,
      error,
      login,
      register,
      logout,
    }),
    [user, token, loading, error, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
