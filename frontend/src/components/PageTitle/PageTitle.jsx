import styles from './PageTitle.module.css';

export default function PageTitle({ title, subtitle, action }) {
  return (
    <div className={styles.wrap}>
      <div>
        <h1 className={`${styles.title} font-display`}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
