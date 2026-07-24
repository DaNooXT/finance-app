import { CATEGORIES } from '../../utils/categories.js';
import { MONTHS_PT } from '../../utils/formatters.js';
import SearchInput from '../SearchInput/SearchInput.jsx';
import styles from './Filters.module.css';

export default function Filters({ filters, onChange, years }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value, page: 1 });

  return (
    <div className={styles.wrap}>
      <SearchInput
        value={filters.search}
        onChange={(v) => onChange({ ...filters, search: v, page: 1 })}
        placeholder="Pesquisar descrição..."
      />

      <select className={styles.select} value={filters.category} onChange={set('category')}>
        <option value="">Todas categorias</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>

      <select className={styles.select} value={filters.type} onChange={set('type')}>
        <option value="">Todos os tipos</option>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>

      <select className={styles.select} value={filters.month} onChange={set('month')}>
        <option value="">Todos os meses</option>
        {MONTHS_PT.map((m, idx) => (
          <option key={m} value={idx}>{m}</option>
        ))}
      </select>

      <select className={styles.select} value={filters.year} onChange={set('year')}>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
