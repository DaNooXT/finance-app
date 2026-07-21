import styles from './SearchInput.module.css';

export default function SearchInput({ value, onChange, placeholder = 'Pesquisar...' }) {
  return (
    <div className={styles.wrap}>
      <i className="bi bi-search" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Limpar pesquisa">
          <i className="bi bi-x-circle-fill" />
        </button>
      )}
    </div>
  );
}
