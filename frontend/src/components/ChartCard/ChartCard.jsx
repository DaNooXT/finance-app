import Card from '../Card/Card';
import styles from './ChartCard.module.css';

export default function ChartCard({ title, subtitle, action, children, height }) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className={styles.body} style={height ? { height } : undefined}>
        {children}
      </div>
    </Card>
  );
}
