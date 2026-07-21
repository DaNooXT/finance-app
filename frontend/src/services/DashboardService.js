import api from './api';

const CATEGORY_NAMES = {
  food: 'Alimentação',
  transport: 'Transporte',
  house: 'Moradia',
  health: 'Saúde',
  leisure: 'Lazer',
  subscriptions: 'Assinaturas',
  clothing: 'Roupas',
  pets: 'Pets',
  gifts: 'Presentes',
  others: 'Outros',
};

const CATEGORY_COLORS = {
  food: '#22C55E',
  transport: '#3B82F6',
  house: '#F59E0B',
  health: '#EF4444',
  leisure: '#8B5CF6',
  subscriptions: '#06B6D4',
  clothing: '#EC4899',
  pets: '#84CC16',
  gifts: '#F97316',
  others: '#6B7280',
};

function normalizeDashboard(data) {
  const pieData = Object.entries(data.category ?? {})
    .map(([key, value]) => ({
      id: key,
      label: CATEGORY_NAMES[key] ?? key,
      total: Number(value.expense),
      percent: Number(value.porcentage),
      color: CATEGORY_COLORS[key] ?? '#22C55E',
    }))
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total);

  return {
    saldo: Number(data.summary.balence),
    receitas: Number(data.summary.total_income),
    despesas: Number(data.summary.total_expense),

    quantidade: data.statistics.total_movimentations,

    pieData,

    barData: pieData.map((item) => ({
      category: item.label,
      valor: item.total,
      color: item.color,
    })),

    categoriaMaiorGasto: pieData[0] ?? null,

    maiorGasto: data.statistics.top_movimentation
      ? {
          id: data.statistics.top_movimentation.id,
          description: data.statistics.top_movimentation.description,
          value: Number(data.statistics.top_movimentation.amount),
          category: data.statistics.top_movimentation.type,
          date: data.statistics.top_movimentation.movimentation_date,
        }
      : null,

    // O backend ainda não envia estes dados
    topGastos: [],
    ultimaMovimentacao: null,
  };
}

const DashboardService = {

  async getDashboardMonth({ year, month }) {
    const { data } = await api.get('/dashboard/month', {
      params: { year, month },
    });

    return normalizeDashboard(data);
  },

  async getDashboardYear({ year }) {
    const { data } = await api.get('/dashboard', {
      params: { year },
    });

    return normalizeDashboard(data);
  },
};

export default DashboardService;