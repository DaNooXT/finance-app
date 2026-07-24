import Button from '../Button/Button.jsx';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({
  open,
  title = 'Confirmar ação',
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.iconWrap} ${danger ? styles.danger : ''}`}>
          <i className={`bi ${danger ? 'bi-exclamation-triangle' : 'bi-question-circle'}`} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel} full>
            {cancelLabel}
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} loading={loading} full>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
