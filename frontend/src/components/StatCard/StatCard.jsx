import Card from '../Card/Card.jsx';
import styles from './StatCard.module.css';

export default function StatCard({ label, value, icon, trend, tone = 'neutral', hero = false }) {
  return (
    <Card className={`${styles.stat} ${hero ? styles.hero : ''}`}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={`${styles.iconWrap} ${styles[tone]}`}>
          <i className={`bi ${icon}`} />
        </span>
      </div>
      <div className={`${styles.value} font-display tabular-nums`}>{value}</div>
      {trend && (
        <div className={`${styles.trend} ${trend.direction === 'up' ? styles.up : styles.down}`}>
          <i className={`bi ${trend.direction === 'up' ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`} />
          <span>{trend.label}</span>
        </div>
      )}
      {hero && <div className={styles.heroGlow} aria-hidden="true" />}
    </Card>
  );
}
