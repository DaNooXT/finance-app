export const CATEGORIES = [
  { id: 'alimentacao', label: 'Alimentação', icon: 'bi-egg-fried', color: 'var(--cat-alimentacao)' },
  { id: 'transporte', label: 'Transporte', icon: 'bi-car-front', color: 'var(--cat-transporte)' },
  { id: 'moradia', label: 'Moradia', icon: 'bi-house-door', color: 'var(--cat-moradia)' },
  { id: 'saude', label: 'Saúde', icon: 'bi-heart-pulse', color: 'var(--cat-saude)' },
  { id: 'lazer', label: 'Lazer', icon: 'bi-controller', color: 'var(--cat-lazer)' },
  { id: 'assinaturas', label: 'Assinaturas', icon: 'bi-arrow-repeat', color: 'var(--cat-assinaturas)' },
  { id: 'roupas', label: 'Roupas', icon: 'bi-bag', color: 'var(--cat-roupas)' },
  { id: 'pets', label: 'Pets', icon: 'bi-paw', color: 'var(--cat-pets)' },
  { id: 'presentes', label: 'Presentes', icon: 'bi-gift', color: 'var(--cat-presentes)' },
  { id: 'outros', label: 'Outros', icon: 'bi-three-dots', color: 'var(--cat-outros)' },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
