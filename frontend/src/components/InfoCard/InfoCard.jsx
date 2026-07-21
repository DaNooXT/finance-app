import Card from '../Card/Card';
import styles from './InfoCard.module.css';

export default function InfoCard({ icon, label, value, sub }) {
  return (
    <Card className={styles.card}>
      <span className={styles.icon}>
        <i className={`bi ${icon}`} />
      </span>
      <div className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </div>
    </Card>
  );
}
