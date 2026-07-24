import { useEffect, useState } from 'react';
import { CATEGORIES } from '../../utils/categories.js';
import Button from '../button/Button.jsx';
import Input from '../Input/Input.jsx';
import styles from './ModalMovimentation.module.css';

const EMPTY_FORM = {
  description: '',
  amount: '',
  type: CATEGORIES[0].id,
  movimentation_type: 'expense',
  movimentation_date: new Date().toISOString().slice(0, 10),
};

export default function ModalMovimentation({
  open,
  onClose,
  onSave,
  initialData,
  loading,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        description: initialData.description,
        amount: String(initialData.amount),
        type: initialData.type,
        movimentation_type: initialData.movimentation_type,
        movimentation_date: initialData.movimentation_date.slice(0, 10),
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setErrors({});
  }, [open, initialData]);

  if (!open) return null;

  const update =
    (field) =>
    (e) =>
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

  function validate() {
    const errs = {};

    if (!form.description.trim())
      errs.description = 'Informe uma descrição.';

    if (!form.amount || Number(form.amount) <= 0)
      errs.amount = 'Informe um valor válido.';

    if (!form.movimentation_date)
      errs.movimentation_date = 'Informe uma data.';

    setErrors(errs);

    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    onSave({
      ...form,
      amount: Number(form.amount),
    });
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>
            {isEditing
              ? 'Editar Movimentação'
              : 'Nova Movimentação'}
          </h3>

          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Fechar"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
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
              value={form.amount}
              onChange={update('amount')}
              placeholder="0,00"
              error={errors.amount}
            />

            <Input
              label="Data"
              type="date"
              value={form.movimentation_date}
              onChange={update('movimentation_date')}
              error={errors.movimentation_date}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>
                Categoria
              </label>

              <select
                className={styles.select}
                value={form.type}
                onChange={update('type')}
              >
                {CATEGORIES.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Tipo
              </label>

              <div className={styles.typeToggle}>
                <button
                  type="button"
                  className={`${styles.typeBtn} ${
                    form.movimentation_type === 'expense'
                      ? styles.typeActiveExpense
                      : ''
                  }`}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      movimentation_type: 'expense',
                    }))
                  }
                >
                  Despesa
                </button>

                <button
                  type="button"
                  className={`${styles.typeBtn} ${
                    form.movimentation_type === 'income'
                      ? styles.typeActiveIncome
                      : ''
                  }`}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      movimentation_type: 'income',
                    }))
                  }
                >
                  Receita
                </button>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              full
            >
              Cancelar
            </Button>

            <Button
              variant="primary"
              type="submit"
              loading={loading}
              full
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}