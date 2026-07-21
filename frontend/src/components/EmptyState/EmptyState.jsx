import styles from './EmptyState.module.css';

export default function EmptyState({ icon = 'bi-inbox', title, description, action }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.iconWrap}>
        <i className={`bi ${icon}`} />
      </div>
      <h4 className={styles.title}>{title}</h4>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  );
}
