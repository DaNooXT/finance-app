import { useState, useId } from 'react';
import styles from './Input.module.css';

export default function Input({
  label,
  type = 'text',
  icon,
  error,
  value,
  onChange,
  placeholder,
  name,
  required = false,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  const isPassword = type === 'password';
  const resolvedType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.inputWrap} ${error ? styles.hasError : ''}`}>
        {icon && <i className={`bi ${icon} ${styles.leadingIcon}`} aria-hidden="true" />}
        <input
          id={id}
          name={name}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`${styles.input} ${icon ? styles.withIcon : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
          </button>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
