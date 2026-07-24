import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters.js';
import styles from './BarChart.module.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      <div className={styles.tooltipValue}>{formatCurrency(payload[0].value)}</div>
    </div>
  );
}

export default function BarChart({ data }) {
  if (!data?.length) {
    return <div className={styles.empty}>Sem dados para exibir.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 6" stroke="var(--border-subtle)" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
          axisLine={{ stroke: 'var(--border-subtle)' }}
          tickLine={false}
          interval={0}
          angle={-25}
          textAnchor="end"
          height={54}
        />
        <YAxis
          tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={56}
          tickFormatter={(v) => `R$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />
        <Bar dataKey="valor" radius={[6, 6, 0, 0]} animationDuration={600}>
          {data.map((entry) => (
            <Cell key={entry.category} fill={entry.color} />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
}
