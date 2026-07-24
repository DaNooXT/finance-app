import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import StatCard from '../../components/StatCard/StatCard.jsx';
import ChartCard from '../../components/ChartCard/ChartCard.jsx';
import PieChart from '../../components/PieChart/PieChart.jsx';
import BarChart from '../../components/BarChart/BarChart.jsx';
import Table from '../../components/Table/Table.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import NavigatorBar from '../../components/NavBar/NavBar.jsx';
import Skeleton from '../../components/Skeleton/Skeleton.jsx';
import DashboardService from '../../services/DashboardService.js';
import { formatCurrency, formatPercent } from '../../utils/formatters.js';
import '../../styles/global.css';
import styles from './DashboardYear.module.css';

export default function DashboardYear() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    DashboardService.getDashboardYear({ year }).then((res) => {
      if (active) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [year]);

  return (
    <div className="page-wrap fade-in">
      <PageTitle
        title="Dashboard Anual"
        subtitle="Consolidado financeiro do ano selecionado"
        action={
          <NavigatorBar
            label={String(year)}
            onPrev={() => setYear((y) => y - 1)}
            onNext={() => setYear((y) => y + 1)}
            disableNext={year >= now.getFullYear()}
          />
        }
      />

      <div className="grid-4 stagger" style={{ marginBottom: 16 }}>
        {loading || !data ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height="118px" radius="18px" />)
        ) : (
          <>
            <StatCard hero label="Saldo Anual" value={formatCurrency(data.saldo)} icon="bi-wallet2" tone="brand" />
            <StatCard label="Receitas Anuais" value={formatCurrency(data.receitas)} icon="bi-arrow-down-circle" tone="brand" />
            <StatCard label="Despesas Anuais" value={formatCurrency(data.despesas)} icon="bi-arrow-up-circle" tone="danger" />
            <StatCard label="Movimentações" value={data.quantidade} icon="bi-list-check" tone="neutral" />
          </>
        )}
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <ChartCard title="Gastos por categoria" subtitle="Distribuição percentual das despesas no ano">
          {loading || !data ? <Skeleton height="260px" radius="16px" /> : <PieChart data={data.pieData} />}
        </ChartCard>
        <ChartCard title="Comparativo por categoria" subtitle="Valor total gasto em cada categoria no ano">
          {loading || !data ? <Skeleton height="260px" radius="16px" /> : <BarChart data={data.barData} />}
        </ChartCard>
      </div>

      <div className="grid-2" style={{ marginBottom: 16, alignItems: 'stretch' }}>
        <ChartCard title="Top gastos do ano" subtitle="Suas maiores despesas no período" height="auto">
          <Table items={data?.topGastos} loading={loading} simple />
        </ChartCard>

        <ChartCard title="Categorias mais utilizadas" subtitle="Ranking por total gasto no ano" height="auto">
          {loading || !data ? (
            <Skeleton height="220px" radius="12px" />
          ) : (
            <ul className={styles.rankList}>
              {data.pieData.slice(0, 6).map((c, idx) => (
                <li key={c.id} className={styles.rankItem}>
                  <span className={styles.rankNumber}>{idx + 1}</span>
                  <span className={styles.rankDot} style={{ background: c.color }} />
                  <span className={styles.rankLabel}>{c.label}</span>
                  <span className={styles.rankValue}>{formatCurrency(c.total)}</span>
                  <span className={styles.rankPercent}>{formatPercent(c.percent, 0)}</span>
                </li>
              ))}
            </ul>
          )}
        </ChartCard>
      </div>

      <div className="grid-4">
        {loading || !data ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height="72px" radius="14px" />)
        ) : (
          <>
            <InfoCard icon="bi-calendar3" label="Média mensal" value={formatCurrency(data.despesas / 12)} />
            <InfoCard
              icon="bi-exclamation-circle"
              label="Maior gasto do ano"
              value={data.maiorGasto ? formatCurrency(data.maiorGasto.value) : '—'}
              sub={data.maiorGasto?.description}
            />
            <InfoCard
              icon="bi-tag"
              label="Categoria líder"
              value={data.categoriaMaiorGasto?.label || '—'}
              sub={data.categoriaMaiorGasto ? formatCurrency(data.categoriaMaiorGasto.total) : ''}
            />
            <InfoCard icon="bi-graph-up" label="Categorias ativas" value={data.pieData.length} />
          </>
        )}
      </div>
    </div>
  );
}
