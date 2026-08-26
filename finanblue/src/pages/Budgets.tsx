import React, { useState, useMemo } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.js';
import { Card, Button, Input, Select, Modal, ProgressBar, EmptyState } from '../components/shared/index.js';
import { formatCurrency, generateId, getCurrentMonth } from '../utils/formatters.js';

export const Budgets: React.FC = () => {
  const { budgets, categories, transactions, addBudget, updateBudget, deleteBudget } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
  });

  const currentMonth = getCurrentMonth();

  // Calculate spent per category this month
  const budgetStatus = useMemo(() => {
    const currentMonthTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
    
    return budgets.map(budget => {
      const spent = currentMonthTransactions
        .filter(t => t.type === 'expense' && t.categoryId === budget.categoryId)
        .reduce((sum, t) => sum + t.amount, 0);

      const category = categories.find(c => c.id === budget.categoryId);
      const percentage = (spent / budget.amount) * 100;

      return {
        ...budget,
        spent,
        category,
        percentage,
        remaining: budget.amount - spent,
      };
    });
  }, [budgets, transactions, categories, currentMonth]);

  const handleOpenForm = (budget?: typeof budgets[0]) => {
    if (budget) {
      setEditingId(budget.id);
      setFormData({ categoryId: budget.categoryId, amount: budget.amount.toString() });
    } else {
      setEditingId(undefined);
      setFormData({ categoryId: '', amount: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.amount) return;

    if (editingId) {
      updateBudget(editingId, { amount: parseFloat(formData.amount) });
    } else {
      addBudget({
        id: generateId('b'),
        categoryId: formData.categoryId,
        amount: parseFloat(formData.amount),
        period: 'monthly',
        name: categories.find(c => c.id === formData.categoryId)?.name || 'Presupuesto',
      });
    }

    setIsModalOpen(false);
    setFormData({ categoryId: '', amount: '' });
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
    setFormData({ categoryId: '', amount: '' });
  };

  const expenseCategoryOptions = categories
    .filter(c => c.type === 'expense')
    .map(c => ({ value: c.id, label: c.name, icon: c.icon }));

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Presupuestos</h1>
          <p className="text-neutral-600">Controla tus límites de gasto</p>
        </div>
        <Button onClick={() => handleOpenForm()} variant="primary" size="md">
          <Plus className="w-5 h-5" />
          Nuevo presupuesto
        </Button>
      </div>

      {/* Budgets List */}
      {budgetStatus.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgetStatus.map(budget => (
            <Card key={budget.id} padding="lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{budget.category?.icon}</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{budget.name}</h3>
                    <p className="text-sm text-neutral-500">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenForm(budget)}
                    className="p-2 hover:bg-neutral-100 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-neutral-600" />
                  </button>
                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="p-2 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-danger" />
                  </button>
                </div>
              </div>

              <ProgressBar value={budget.spent} max={budget.amount} showLabel />

              <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-neutral-600">Disponible</span>
                  <span className="text-sm font-bold text-neutral-900">
                    {formatCurrency(Math.max(0, budget.remaining))}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-1">
                  <div
                    className="bg-primary-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, budget.percentage)}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card padding="lg">
          <EmptyState
            icon="💰"
            title="Sin presupuestos"
            message="Crea un presupuesto para controlar tus gastos"
            action={{
              label: 'Crear presupuesto',
              onClick: () => handleOpenForm(),
            }}
          />
        </Card>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseForm}
        title={editingId ? 'Editar presupuesto' : 'Nuevo presupuesto'}
        footer={
          <>
            <Button onClick={handleCloseForm} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} variant="primary">
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Categoría"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            options={expenseCategoryOptions}
            placeholder="Selecciona una categoría"
          />

          <Input
            label="Monto límite"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </form>
      </Modal>
    </div>
  );
};
