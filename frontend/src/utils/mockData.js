import { CATEGORIES } from './categories';

// ---------------------------------------------------------------------------
// MOCK DATA — for visual demonstration only.
// Replace every consumer of this file with real FastAPI responses once the
// backend is connected (see services/*.js for the exact functions to edit).
// ---------------------------------------------------------------------------

const DESCRIPTIONS_BY_CATEGORY = {
  alimentacao: ['Supermercado Pão de Açúcar', 'iFood', 'Padaria do Bairro', 'Restaurante Sabor & Cia'],
  transporte: ['Uber', 'Combustível Shell', 'Estacionamento', 'Manutenção do carro'],
  moradia: ['Aluguel', 'Conta de Luz', 'Conta de Água', 'Condomínio'],
  saude: ['Farmácia São João', 'Plano de Saúde', 'Consulta Médica', 'Academia'],
  lazer: ['Cinema', 'Show Ingresso', 'Bar com amigos', 'Viagem fim de semana'],
  assinaturas: ['Netflix', 'Spotify', 'Amazon Prime', 'iCloud+'],
  roupas: ['Renner', 'Zara', 'Tênis Nike', 'Loja Online'],
  pets: ['Ração Premium', 'Veterinário', 'Pet Shop banho e tosa'],
  presentes: ['Aniversário Mãe', 'Amigo Secreto', 'Presente de casamento'],
  outros: ['Doação', 'Taxa bancária', 'Diversos'],
};

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateMovimentations(year, count = 140) {
  const rnd = seededRandom(year * 7 + 13);
  const items = [];
  for (let i = 0; i < count; i++) {
    const isIncome = rnd() < 0.18;
    const category = isIncome ? 'outros' : CATEGORIES[Math.floor(rnd() * (CATEGORIES.length - 1))].id;
    const descPool = isIncome
      ? ['Salário', 'Freelance', 'Rendimento Investimento', 'Reembolso']
      : DESCRIPTIONS_BY_CATEGORY[category];
    const description = descPool[Math.floor(rnd() * descPool.length)];
    const month = Math.floor(rnd() * 12);
    const day = 1 + Math.floor(rnd() * 27);
    const value = isIncome
      ? Math.round((1800 + rnd() * 4200) * 100) / 100
      : Math.round((15 + rnd() * 650) * 100) / 100;

    items.push({
      id: `${year}-${i + 1}`,
      description,
      category,
      type: isIncome ? 'receita' : 'despesa',
      value,
      date: new Date(year, month, day).toISOString().slice(0, 10),
    });
  }
  return items.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Cache per-year so repeated calls stay stable during a session
const cache = {};
export function getMockMovimentations(year) {
  if (!cache[year]) cache[year] = generateMovimentations(year);
  return cache[year];
}

export function getMockUser() {
  return {
    id: 'usr_1',
    name: 'Danilo Teixeira',
    email: 'danilo.teixeira@email.com',
    avatar: null,
    createdAt: '2024-02-11',
  };
}
