import useAuth from '../../hooks/useAuth';
import styles from './Header.module.css';

const WEEKDAYS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const now = new Date();
  const dateLabel = `${WEEKDAYS[now.getDay()]}, ${now.getDate()} de ${MONTHS[now.getMonth()]}`;
  const firstName = user?.name?.split(' ')[0] || 'por aqui';

  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Abrir menu">
        <i className="bi bi-list" />
      </button>
      <div>
        <p className={styles.greeting}>Olá, {firstName} 👋</p>
        <p className={styles.date}>{dateLabel}</p>
      </div>
    </header>
  );
}
