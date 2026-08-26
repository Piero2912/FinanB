import React, { useState } from 'react';
import { Transaction, TransactionType } from '../../types/index.js';
import { useApp } from '../../context/AppContext.js';
import { Button, Input, Select, Modal } from '../shared/index.js';
import { getCurrentDate, generateId } from '../../utils/formatters.js';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingId?: string;
}

// Mapeo de categorías a imágenes
const categoryImages: Record<string, string> = {
  'cat-11': '/logos/Mandado por mamá.jpg',
  'cat-12': '/logos/Mandado por papá.jpg',
  'cat-13': '/logos/Propina.png',
  'cat-14': '/logos/dinero de chambita.jpg',
};

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingId?: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  editingId,
}) => {
  const { transactions, categories, paymentMethods, addTransaction, updateTransaction } =
    useApp();

  const editingTransaction = transactions.find(t => t.id === editingId);
  const isEditing = !!editingTransaction;

  const [type, setType] = useState<TransactionType>(
    editingTransaction?.type || 'expense'
  );
  const [amount, setAmount] = useState(editingTransaction?.amount.toString() || '');
  const [description, setDescription] = useState(editingTransaction?.description || '');
  const [categoryId, setCategoryId] = useState(editingTransaction?.categoryId || '');
  const [paymentMethodId, setPaymentMethodId] = useState(
    editingTransaction?.paymentMethodId || ''
  );
  const [date, setDate] = useState(editingTransaction?.date || getCurrentDate());
  const [notes, setNotes] = useState(editingTransaction?.notes || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCategories = categories.filter(c => c.type === type);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Monto debe ser mayor a 0';
    }
    if (!description.trim()) {
      newErrors.description = 'Descripción es requerida';
    }
    if (!categoryId) {
      newErrors.categoryId = 'Categoría es requerida';
    }
    if (!paymentMethodId) {
      newErrors.paymentMethodId = 'Método de pago es requerido';
    }
    if (!date) {
      newErrors.date = 'Fecha es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const transactionData = {
      type,
      amount: parseFloat(amount),
      description,
      categoryId,
      paymentMethodId,
      date,
      notes,
    };

    if (isEditing && editingId) {
      updateTransaction(editingId, transactionData);
    } else {
      const newTransaction: Transaction = {
        id: generateId('t'),
        ...transactionData,
      };
      addTransaction(newTransaction);
    }

    handleClose();
  };

  const handleClose = () => {
    setAmount('');
    setDescription('');
    setCategoryId('');
    setPaymentMethodId('');
    setDate(getCurrentDate());
    setNotes('');
    setErrors({});
    onClose();
  };

  const paymentLogos: Record<string, string> = {
    'pm-1': '/logos/efectivo.jpg',
    'pm-2': '/logos/bcp.jpg',
    'pm-3': '/logos/Yape.jpg',
    'pm-4': '/logos/plin.jpg',
    'pm-5': '/logos/bbva.jpg',
  };

  const getPaymentMethodLogo = (methodId: string): string => {
    return paymentLogos[methodId] || '/logos/efectivo.jpg';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Editar movimiento' : 'Nuevo movimiento'}
      size="md"
      footer={
        <>
          <Button onClick={handleClose} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            {isEditing ? 'Actualizar' : 'Registrar'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type */}
        <div className="flex gap-4">
          {(['income', 'expense'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={t}
                checked={type === t}
                onChange={(e) => {
                  setType(e.target.value as TransactionType);
                  setCategoryId('');
                }}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">
                {t === 'income' ? '💰 Ingreso' : '💸 Gasto'}
              </span>
            </label>
          ))}
        </div>

        {/* Amount */}
        <Input
          label="Monto"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />

        {/* Description */}
        <Input
          label="Descripción"
          placeholder="Ej: Almuerzo en restaurante"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-3">
            Categoría
            {errors.categoryId && (
              <span className="text-danger text-xs ml-2">({errors.categoryId})</span>
            )}
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCategories.map(category => {
              const categoryImg = categoryImages[category.id];
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setCategoryId(category.id)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border-2 transition-all ${
                    categoryId === category.id
                      ? 'border-primary-600 bg-primary-50 shadow-md'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                    {categoryImg ? (
                      <img
                        src={categoryImg}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-sm">{category.icon}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center text-neutral-900 line-clamp-2 leading-tight">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date */}
        <Input
          label="Fecha"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
        />

        {/* Payment Method - With Logos */}
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-3">
            Método de pago
            {errors.paymentMethodId && (
              <span className="text-danger text-xs ml-2">({errors.paymentMethodId})</span>
            )}
          </label>
          <div className="grid grid-cols-5 gap-1.5 md:gap-2">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethodId(method.id)}
                className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 transition-all ${
                  paymentMethodId === method.id
                    ? 'border-primary-600 bg-primary-50 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={getPaymentMethodLogo(method.id)}
                    alt={method.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-center text-neutral-900 line-clamp-1 md:line-clamp-2 leading-tight">
                  {method.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <Input
          label="Notas (opcional)"
          placeholder="Añade notas"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </form>
    </Modal>
  );
};
