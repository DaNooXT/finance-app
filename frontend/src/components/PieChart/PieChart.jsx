import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency, formatPercent } from '../../utils/formatters.js';
import styles from './PieChart.module.css';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipRow}>
        <span className={styles.dot} style={{ background: d.color }} />
        <span className={styles.tooltipLabel}>{d.label}</span>
      </div>
      <div className={styles.tooltipValue}>{formatCurrency(d.total)}</div>
      <div className={styles.tooltipPercent}>{formatPercent(d.percent)} do total</div>
    </div>
  );
}

export default function PieChart({ data }) {
  if (!data?.length) {
    return <div className={styles.empty}>Sem despesas registradas neste período.</div>;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="label"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.id} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </RePieChart>
        </ResponsiveContainer>
        <div className={styles.centerLabel}>
          <span className={styles.centerValue}>{data.length}</span>
          <span className={styles.centerCaption}>categorias</span>
        </div>
      </div>
      <ul className={styles.legend}>
        {data.map((c) => (
          <li key={c.id} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: c.color }} />
            <span className={styles.legendLabel}>{c.label}</span>
            <span className={styles.legendPercent}>{formatPercent(c.percent, 0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
