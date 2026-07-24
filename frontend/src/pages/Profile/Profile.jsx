import { useState } from 'react';
import Card from '../../components/Card/Card';
import PageTitle from '../../components/PageTitle/PageTitle';
import Input from '../../components/Input/Input';
import Button from '../../components/button/Button.jsx';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import { useToast } from '../../components/Toast/ToastProvider';
import { formatDate } from '../../utils/formatters';
import '../../styles/global.css';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const toast = useToast();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    // ---- Substituir por chamada real: PUT /users/me ----
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast.success('Perfil atualizado com sucesso.');
  }

  return (
    <div className="page-wrap fade-in">
      <PageTitle title="Perfil" subtitle="Gerencie suas informações pessoais e preferências" />

      <div className={styles.grid}>
        <Card className={styles.profileCard}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatar}>{form.name ? form.name.charAt(0).toUpperCase() : 'U'}</div>
            <div>
              <h3 className={styles.name}>{form.name || 'Usuário'}</h3>
              <p className={styles.email}>{form.email}</p>
              <p className={styles.since}>Membro desde {formatDate(user?.createdAt)}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className={styles.form}>
            <Input label="Nome" value={form.name} onChange={update('name')} />
            <Input label="Email" type="email" value={form.email} onChange={update('email')} />
            <Button type="submit" loading={saving}>
              Salvar alterações
            </Button>
          </form>
        </Card>

        <Card className={styles.prefsCard}>
          <h3 className={styles.sectionTitle}>Preferências</h3>
          <div className={styles.prefRow}>
            <div>
              <span className={styles.prefLabel}>Tema da interface</span>
              <span className={styles.prefSub}>Alterne entre modo claro e escuro</span>
            </div>
            <button className={styles.themeToggle} onClick={toggleTheme}>
              <i className={`bi ${isDark ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`} />
              {isDark ? 'Escuro' : 'Claro'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
