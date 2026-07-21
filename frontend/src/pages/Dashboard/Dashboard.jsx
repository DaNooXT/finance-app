import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import StatCard from '../../components/StatCard/StatCard';
import ChartCard from '../../components/ChartCard/ChartCard';
import PieChart from '../../components/PieChart/PieChart';
import BarChart from '../../components/BarChart/BarChart';
import Table from '../../components/Table/Table';
import InfoCard from '../../components/InfoCard/InfoCard';
import NavigatorBar from '../../components/Navbar/Navbar';
import Skeleton from '../../components/Skeleton/Skeleton';
import DashboardService from '../../services/DashboardService';
import { formatCurrency, formatDate, MONTHS_PT } from '../../utils/formatters';
import '../../styles/global.css';

export default function Dashboard() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    DashboardService.getDashboardMonth({ year, month }).then((res) => {
      if (active) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [year, month]);

  function goPrev() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goNext() {
    const isCurrent = year === now.getFullYear() && month === now.getMonth();
    if (isCurrent) return;
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  return (
    <div className="page-wrap fade-in">
      <PageTitle
        title="Dashboard Mensal"
        subtitle="Visão geral das suas finanças no período selecionado"
        action={
          <NavigatorBar
            label={`${MONTHS_PT[month]} ${year}`}
            onPrev={goPrev}
            onNext={goNext}
            disableNext={isCurrentMonth}
          />
        }
      />

      <div className="grid-4 stagger" style={{ marginBottom: 16 }}>
        {loading || !data ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height="118px" radius="18px" />)
        ) : (
          <>
            <StatCard
              hero
              label="Saldo Atual"
              value={formatCurrency(data.saldo)}
              icon="bi-wallet2"
              tone="brand"
            />
            <StatCard label="Receitas" value={formatCurrency(data.receitas)} icon="bi-arrow-down-circle" tone="brand" />
            <StatCard label="Despesas" value={formatCurrency(data.despesas)} icon="bi-arrow-up-circle" tone="danger" />
            <StatCard label="Movimentações" value={data.quantidade} icon="bi-list-check" tone="neutral" />
          </>
        )}
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <ChartCard title="Gastos por categoria" subtitle="Distribuição percentual das despesas do período">
          {loading || !data ? <Skeleton height="260px" radius="16px" /> : <PieChart data={data.pieData} />}
        </ChartCard>
        <ChartCard title="Comparativo por categoria" subtitle="Valor total gasto em cada categoria">
          {loading || !data ? <Skeleton height="260px" radius="16px" /> : <BarChart data={data.barData} />}
        </ChartCard>
      </div>

      <div className="grid-4" style={{ marginBottom: 16 }}>
        {loading || !data ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height="72px" radius="14px" />)
        ) : (
          <>
            <InfoCard icon="bi-list-ol" label="Movimentações" value={data.quantidade} />
            <InfoCard
              icon="bi-exclamation-circle"
              label="Maior gasto"
              value={data.maiorGasto ? formatCurrency(data.maiorGasto.value) : '—'}
              sub={data.maiorGasto?.description}
            />
            <InfoCard
              icon="bi-tag"
              label="Categoria líder"
              value={data.categoriaMaiorGasto?.label || '—'}
              sub={data.categoriaMaiorGasto ? formatCurrency(data.categoriaMaiorGasto.total) : ''}
            />
            <InfoCard
              icon="bi-clock-history"
              label="Última movimentação"
              value={data.ultimaMovimentacao ? formatDate(data.ultimaMovimentacao.date) : '—'}
              sub={data.ultimaMovimentacao?.description}
            />
          </>
        )}
      </div>

      <ChartCard title="Top gastos do mês" subtitle="Suas maiores despesas no período" height="auto">
        <Table items={data?.topGastos} loading={loading} simple />
      </ChartCard>
    </div>
  );
}
