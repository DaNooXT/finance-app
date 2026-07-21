import { getCategory } from '../../utils/categories';
import { formatCurrency, formatDate } from '../../utils/formatters';
import EmptyState from '../EmptyState/EmptyState';
import Skeleton from '../Skeleton/Skeleton';
import styles from './Table.module.css';

export default function Table({ items, loading, onEdit, onDelete, simple = false }) {

  if (loading) {
    return (
      <div className={styles.wrap}>
        <table className={styles.table}>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={simple ? 3 : 6}>
                  <Skeleton height="18px" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <EmptyState
        icon="bi-receipt"
        title="Nenhuma movimentação encontrada"
        description="Ajuste os filtros ou cadastre uma nova movimentação."
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            {!simple && <th>Tipo</th>}
            <th>Valor</th>
            <th>Data</th>
            {(onEdit || onDelete) && (
              <th className={styles.actionsCol}>
                Ações
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {

            // API retorna a categoria no campo "type"
            const cat = getCategory(item.type);

            // API retorna income/expense
            const isIncome = item.movimentation_type === 'income';

            return (
              <tr key={item.id}>

                <td className={styles.description}>
                  {item.description}
                </td>

                <td>
                  <span className={styles.catBadge}>
                    <span
                      className={styles.dot}
                      style={{ background: cat.color }}
                    />
                    {cat.label}
                  </span>
                </td>

                {!simple && (
                  <td>
                    <span
                      className={`${styles.typeBadge} ${
                        isIncome
                          ? styles.income
                          : styles.expense
                      }`}
                    >
                      {isIncome ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                )}

                <td
                  className={`${styles.value} tabular-nums ${
                    isIncome ? styles.income : ''
                  }`}
                >
                  {isIncome ? '+' : '-'}{' '}
                  {formatCurrency(item.amount)}
                </td>

                <td className={styles.date}>
                  {formatDate(item.movimentation_date)}
                </td>

                {(onEdit || onDelete) && (
                  <td>
                    <div className={styles.actions}>

                      {onEdit && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => onEdit(item)}
                          aria-label="Editar"
                        >
                          <i className="bi bi-pencil" />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => onDelete(item)}
                          aria-label="Excluir"
                        >
                          <i className="bi bi-trash3" />
                        </button>
                      )}

                    </div>
                  </td>
                )}

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}