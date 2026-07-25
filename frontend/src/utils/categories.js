export const CATEGORIES = [
  { id: 'food', label: 'Alimentação', icon: 'bi-egg-fried', color: 'var(--cat-alimentacao)' },
  { id: 'transport', label: 'Transporte', icon: 'bi-car-front', color: 'var(--cat-transporte)' },
  { id: 'house', label: 'Moradia', icon: 'bi-house-door', color: 'var(--cat-moradia)' },
  { id: 'health', label: 'Saúde', icon: 'bi-heart-pulse', color: 'var(--cat-saude)' },
  { id: 'leisure', label: 'Lazer', icon: 'bi-controller', color: 'var(--cat-lazer)' },
  { id: 'sport', label: 'Esporte', icon: 'bi-bicycle', color: 'var(--cat-esporte)' },
  { id: 'reserve', label: 'Reserva', icon: 'bi-piggy-bank', color: 'var(--cat-reserva)' },
  { id: 'education', label: 'Educação', icon: 'bi-book', color: 'var(--cat-educacao)' },
  { id: 'subscriptions', label: 'Assinaturas', icon: 'bi-arrow-repeat', color: 'var(--cat-assinaturas)' },
  { id: 'clothing', label: 'Roupas', icon: 'bi-bag', color: 'var(--cat-roupas)' },
  { id: 'pets', label: 'Pets', icon: 'bi-paw', color: 'var(--cat-pets)' },
  { id: 'gifts', label: 'Presentes', icon: 'bi-gift', color: 'var(--cat-presentes)' },
  { id: 'others', label: 'Outros', icon: 'bi-three-dots', color: 'var(--cat-outros)' },
  { id: 'salary', label: 'Salário', icon: 'bi-cash-stack', color: 'var(--cat-salary)' },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}