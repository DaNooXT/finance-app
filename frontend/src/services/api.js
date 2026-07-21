import axios from 'axios';
export const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Anexa automaticamente o Bearer token em toda requisição autenticada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('finovo_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Se a API responder 401, limpa a sessão e manda para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('finovo_token');
      localStorage.removeItem('finovo_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Simula latência de rede para o modo mock, para os estados de loading
// ficarem visíveis mesmo sem backend.
export function mockDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default api;
