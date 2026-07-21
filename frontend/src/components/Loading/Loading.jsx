import styles from './Loading.module.css';

export default function Loading({ label = 'Carregando...', fullHeight = false }) {
  return (
    <div className={`${styles.wrap} ${fullHeight ? styles.fullHeight : ''}`}>
      <span className={styles.spinner} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
