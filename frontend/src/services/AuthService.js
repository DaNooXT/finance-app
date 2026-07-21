import api from './api';

const AuthService = {
  async login({ email, password }) {
    const { data } = await api.post('/auth/login', {
      email,
      password,
    });

    return {
      token: data.access_token,
      user: data.user,
    };
  },

  async register({ name, email, password }) {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
    });

    return data;
  },

  logout() {
    localStorage.removeItem('finovo_token');
    localStorage.removeItem('finovo_user');
  },

  getStoredUser() {
    const raw = localStorage.getItem('finovo_user');
    return raw ? JSON.parse(raw) : null;
  },

  getToken() {
    return localStorage.getItem('finovo_token');
  },

  persistSession(token, user) {
    localStorage.setItem('finovo_token', token);
    localStorage.setItem('finovo_user', JSON.stringify(user));
  },
};

export default AuthService;