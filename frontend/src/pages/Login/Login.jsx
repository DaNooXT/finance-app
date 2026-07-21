import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import styles from './Login.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Não foi possível entrar. Verifique suas credenciais.');
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

        <h1 className={`${styles.title} font-display`}>Bem-vindo de volta</h1>
        <p className={styles.subtitle}>Entre para continuar controlando suas finanças.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          <ErrorMessage>{error}</ErrorMessage>

          <Button type="submit" full loading={loading}>
            Entrar
          </Button>
        </form>

        <p className={styles.footerText}>
          Ainda não tem conta? <Link to="/register" className={styles.link}>Criar conta</Link>
        </p>
      </div>

      <div className={styles.showcase}>
        <div className={styles.showcaseGlow} />
        <div className={styles.showcaseContent}>
          <span className={styles.quote}>"Clareza financeira começa com visibilidade."</span>
          <span className={styles.quoteSub}>Acompanhe receitas, despesas e metas em um só lugar.</span>
        </div>
      </div>
    </div>
  );
}
