import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard Mensal', icon: 'bi-bar-chart-line' },
  { to: '/dashboard-anual', label: 'Dashboard Anual', icon: 'bi-graph-up-arrow' },
  { to: '/movimentacoes', label: 'Movimentações', icon: 'bi-credit-card-2-front' },
  { to: '/perfil', label: 'Perfil', icon: 'bi-person-circle' },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>R</span>
          <span className={styles.brandName}>Raul's App</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.bottom}>
          <button className={styles.navItem} onClick={toggleTheme}>
            <i className={`bi ${isDark ? 'bi-moon-stars' : 'bi-sun'}`} />
            <span>{isDark ? 'Tema Escuro' : 'Tema Claro'}</span>
          </button>
          <button className={`${styles.navItem} ${styles.logout}`} onClick={logout}>
            <i className="bi bi-box-arrow-right" />
            <span>Sair</span>
          </button>

          <div className={styles.userCard}>
            <div className={styles.avatar}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'Usuário'}</span>
              <span className={styles.userEmail}>{user?.email || ''}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
