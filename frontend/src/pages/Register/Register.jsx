import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/button/Button.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import useAuth from '../../hooks/useAuth.js';
import styles from '../Login/Login.module.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Preencha todos os campos.');
      return;
    }
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Não foi possível criar sua conta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>F</span>
          <span className={styles.brandName}>Finovo</span>
        </div>

        <h1 className={`${styles.title} font-display`}>Crie sua conta</h1>
        <p className={styles.subtitle}>Comece a organizar suas finanças em minutos.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Nome"
            icon="bi-person"
            value={form.name}
            onChange={update('name')}
            placeholder="Seu nome completo"
            autoComplete="name"
            required
          />
          <Input
            label="Email"
            type="email"
            icon="bi-envelope"
            value={form.email}
            onChange={update('email')}
            placeholder="voce@email.com"
            autoComplete="email"
            required
          />
          <Input
            label="Senha"
            type="password"
            icon="bi-lock"
            value={form.password}
            onChange={update('password')}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            required
          />
          <Input
            label="Confirmar senha"
            type="password"
            icon="bi-lock-fill"
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
            placeholder="Repita a senha"
            autoComplete="new-password"
            required
          />

          <ErrorMessage>{error}</ErrorMessage>

          <Button type="submit" full loading={loading}>
            Criar conta
          </Button>
        </form>

        <p className={styles.footerText}>
          Já tem conta? <Link to="/login" className={styles.link}>Entrar</Link>
        </p>
      </div>

      <div className={styles.showcase}>
        <div className={styles.showcaseGlow} />
        <div className={styles.showcaseContent}>
          <span className={styles.quote}>"Cada real registrado é uma decisão mais consciente."</span>
          <span className={styles.quoteSub}>Crie sua conta e comece hoje mesmo.</span>
        </div>
      </div>
    </div>
  );
}
