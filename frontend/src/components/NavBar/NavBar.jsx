import styles from './NavBar.module.css';

export default function Navbar({ label, onPrev, onNext, disableNext = false }) {
  return (
    <div className={styles.wrap}>
      <button className={styles.arrow} onClick={onPrev} aria-label="Período anterior">
        <i className="bi bi-chevron-left" />
      </button>
      <span className={`${styles.label} font-display`}>{label}</span>
      <button className={styles.arrow} onClick={onNext} disabled={disableNext} aria-label="Próximo período">
        <i className="bi bi-chevron-right" />
      </button>
    </div>
  );
}
