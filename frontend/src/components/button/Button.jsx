import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  type = 'button',
  full = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${full ? styles.full : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        icon && <i className={`bi ${icon} ${styles.icon}`} aria-hidden="true" />
      )}
      <span>{children}</span>
    </button>
  );
}
