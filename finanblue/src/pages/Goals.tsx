import React, { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.js';
import { Card, Button, Input, Modal, ProgressBar, EmptyState } from '../components/shared/index.js';
import { formatCurrency, generateId, formatDate } from '../utils/formatters.js';

export const Goals: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    icon: '🎯',
    color: '#3B82F6',
    notes: '',
  });

  const goalIcons = ['🎯', '💰', '🛡️', '💻', '✈️', '🏠', '🚗', '🎓', '⌚', '🎮'];
  const goalColors = [
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#F59E0B',
    '#10B981',
    '#14B8A6',
    '#06B6D4',
    '#EF4444',
    '#6366F1',
    '#F97316',
  ];

  const handleOpenForm = (goal?: typeof goals[0]) => {
    if (goal) {
      setEditingId(goal.id);
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        deadline: goal.deadline,
        icon: goal.icon,
        color: goal.color,
        notes: goal.notes || '',
      });
    } else {
      setEditingId(undefined);
      setFormData({
        name: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        icon: '🎯',
        color: '#3B82F6',
        notes: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount || !formData.deadline) return;

    if (editingId) {
      updateGoal(editingId, {
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount || '0'),
        deadline: formData.deadline,
        icon: formData.icon,
        color: formData.color,
        notes: formData.notes,
      });
    } else {
      addGoal({
        id: generateId('g'),
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount || '0'),
        deadline: formData.deadline,
        icon: formData.icon,
        color: formData.color,
        notes: formData.notes,
      });
    }

    setIsModalOpen(false);
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      icon: '🎯',
      color: '#3B82F6',
      notes: '',
    });
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      icon: '🎯',
      color: '#3B82F6',
      notes: '',
    });
  };

  const calculateDaysLeft = (deadline: string): number => {
    const today = new Date();
    const target = new Date(deadline);
    const diff = target.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Metas de Ahorro</h1>
          <p className="text-neutral-600">Persigue tus objetivos financieros</p>
        </div>
        <Button onClick={() => handleOpenForm()} variant="primary" size="md">
          <Plus className="w-5 h-5" />
          Nueva meta
        </Button>
      </div>

      {/* Goals Grid */}
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map(goal => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = calculateDaysLeft(goal.deadline);
            const isCompleted = percentage >= 100;
            const isOverdue = daysLeft < 0;

            return (
              <Card key={goal.id} padding="lg" hoverable>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-4xl">{goal.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900">{goal.name}</h3>
                      <p className="text-sm text-neutral-500">
                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenForm(goal)}
                      className="p-2 hover:bg-neutral-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-neutral-600" />
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-2 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-danger" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-neutral-600">Progreso</span>
                    <span className="text-sm font-bold text-neutral-900">
                      {Math.min(percentage, 100).toFixed(0)}%
                    </span>
                  </div>
                  <ProgressBar value={goal.currentAmount} max={goal.targetAmount} showLabel={false} />
                </div>

                {/* Status */}
                <div className="p-3 bg-neutral-50 rounded-lg space-y-2">
                  {isCompleted ? (
                    <div className="text-center">
                      <p className="text-sm font-bold text-success">✓ Meta alcanzada</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600">Falta:</span>
                        <span className="font-bold text-neutral-900">
                          {formatCurrency(goal.targetAmount - goal.currentAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600">Plazo:</span>
                        <span className={`font-bold ${isOverdue ? 'text-danger' : 'text-neutral-900'}`}>
                          {isOverdue
                            ? `Vencida hace ${Math.abs(daysLeft)} días`
                            : `${daysLeft} días`}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {goal.notes && (
                  <p className="text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-200">
                    {goal.notes}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card padding="lg">
          <EmptyState
            icon="🎯"
            title="Sin metas"
            message="Crea una meta para motivarte a ahorrar"
            action={{
              label: 'Crear meta',
              onClick: () => handleOpenForm(),
            }}
          />
        </Card>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseForm}
        title={editingId ? 'Editar meta' : 'Nueva meta de ahorro'}
        size="lg"
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
          {/* Icon Selector */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">Icono</label>
            <div className="grid grid-cols-5 gap-2">
              {goalIcons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-3 text-2xl rounded-lg border-2 transition-colors ${
                    formData.icon === icon
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <Input
            label="Nombre de la meta"
            placeholder="Ej: Viaje a Europa"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Amount */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Monto objetivo"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
            />
            <Input
              label="Ahorrado hasta ahora"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
            />
          </div>

          {/* Deadline */}
          <Input
            label="Fecha objetivo"
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />

          {/* Notes */}
          <Input
            label="Notas (opcional)"
            placeholder="Añade detalles sobre tu meta"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </form>
      </Modal>
    </div>
  );
};
