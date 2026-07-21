import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ children }) {
  if (!children) return null;
  return (
    <div className={styles.wrap} role="alert">
      <i className="bi bi-exclamation-triangle-fill" />
      <span>{children}</span>
    </div>
  );
}
