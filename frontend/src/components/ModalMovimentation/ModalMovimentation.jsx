import { useEffect, useState } from 'react';
import { CATEGORIES } from '../../utils/categories';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './ModalMovimentation.module.css';

const EMPTY_FORM = {
  description: '',
  value: '',
  category: CATEGORIES[0].id,
  type: 'despesa',
  date: new Date().toISOString().slice(0, 10),
};

export default function ModalMovimentation({ open, onClose, onSave, initialData, loading }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? { ...initialData, value: String(initialData.value) }
          : EMPTY_FORM
      );
      setErrors({});
    }
  }, [open, initialData]);

  if (!open) return null;

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Informe uma descrição.';
    if (!form.value || Number(form.value) <= 0) errs.value = 'Informe um valor válido.';
    if (!form.date) errs.date = 'Informe a data.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, value: Number(form.value) });
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{isEditing ? 'Editar Movimentação' : 'Nova Movimentação'}</h3>
          <button className={styles.close} onClick={onClose} aria-label="Fechar">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Descrição"
            value={form.description}
            onChange={update('description')}
            placeholder="Ex: Supermercado"
            error={errors.description}
          />

          <div className={styles.row}>
            <Input
              label="Valor (R$)"
              type="number"
              value={form.value}
              onChange={update('value')}
              placeholder="0,00"
              error={errors.value}
            />
            <Input
              label="Data"
              type="date"
              value={form.date}
              onChange={update('date')}
              error={errors.date}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Categoria</label>
              <select className={styles.select} value={form.category} onChange={update('category')}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tipo</label>
              <div className={styles.typeToggle}>
                <button
                  type="button"
                  className={`${styles.typeBtn} ${form.type === 'despesa' ? styles.typeActiveExpense : ''}`}
                  onClick={() => setForm((f) => ({ ...f, type: 'despesa' }))}
                >
                  Despesa
                </button>
                <button
                  type="button"
                  className={`${styles.typeBtn} ${form.type === 'receita' ? styles.typeActiveIncome : ''}`}
                  onClick={() => setForm((f) => ({ ...f, type: 'receita' }))}
                >
                  Receita
                </button>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="secondary" type="button" onClick={onClose} full>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" loading={loading} full>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
