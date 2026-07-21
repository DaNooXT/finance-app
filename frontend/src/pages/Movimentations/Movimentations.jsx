import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Filters from '../../components/Filters/Filters';
import Table from '../../components/Table/Table';
import ModalMovimentation from '../../components/ModalMovimentation/ModalMovimentation';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { useToast } from '../../components/Toast/ToastProvider';
import MovimentationService from '../../services/MovimentationService';
import '../../styles/global.css';
import styles from './Movimentations.module.css';

const now = new Date();
const YEARS = [now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2];

export default function Movimentations() {
  const toast = useToast();
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    month: '',
    year: now.getFullYear(),
    page: 1,
    pageSize: 8,
  });
  const [result, setResult] = useState({ items: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    const res = await MovimentationService.getMovimentations(filters);
    setResult(res);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setModalOpen(true);
  }

  async function handleSave(payload) {
    setSaving(true);
    try {
      if (editing) {
        await MovimentationService.updateMovimentation(editing.id, payload);
        toast.success('Movimentação atualizada com sucesso.');
      } else {
        await MovimentationService.createMovimentation(payload);
        toast.success('Movimentação criada com sucesso.');
      }
      setModalOpen(false);
      loadData();
    } catch {
      toast.error('Não foi possível salvar a movimentação.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteConfirm() {
    setDeleteLoading(true);
    try {
      await MovimentationService.deleteMovimentation(deleting.id);
      toast.success('Movimentação excluída.');
      setDeleting(null);
      loadData();
    } catch {
      toast.error('Não foi possível excluir a movimentação.');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="page-wrap fade-in">
      <PageTitle
        title="Movimentações"
        subtitle="Gerencie suas receitas e despesas"
        action={
          <Button icon="bi-plus-lg" onClick={openCreate}>
            Nova Movimentação
          </Button>
        }
      />

      <Card className={styles.filtersCard}>
        <Filters filters={filters} onChange={setFilters} years={YEARS} />
      </Card>

      <Card padded={false} className={styles.tableCard}>
        <Table items={result.items} loading={loading} onEdit={openEdit} onDelete={setDeleting} />
      </Card>

      {result.totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="secondary"
            size="sm"
            icon="bi-chevron-left"
            disabled={filters.page <= 1}
            onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
          >
            Anterior
          </Button>
          <span className={styles.pageInfo}>
            Página {result.page} de {result.totalPages} · {result.total} registros
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={filters.page >= result.totalPages}
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
          >
            Próxima
          </Button>
        </div>
      )}

      <ModalMovimentation
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editing}
        loading={saving}
      />

      <ConfirmModal
        open={Boolean(deleting)}
        danger
        title="Excluir movimentação?"
        message={`Tem certeza que deseja excluir "${deleting?.description}"? Essa ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        loading={deleteLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
