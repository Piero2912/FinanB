import React, { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.js';
import { Card, Button, Input, Modal, Badge, EmptyState } from '../components/shared/index.js';

export const Categories: React.FC = () => {
  const { categories } = useApp();

  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  const renderCategoryList = (cats: typeof categories) => {
    if (cats.length === 0) return null;

    return (
      <div className="space-y-2">
        {cats.map(category => (
          <Card key={category.id} padding="md" hoverable>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h4 className="font-medium text-neutral-900">{category.name}</h4>
                  <p className="text-xs text-neutral-500">{category.type === 'income' ? 'Ingreso' : 'Gasto'}</p>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: category.color }}
                title={category.color}
              />
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Categorías</h1>
        <p className="text-neutral-600">Organiza tus movimientos</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Categories */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">💸 Gastos</h3>
          {expenseCategories.length > 0 ? (
            renderCategoryList(expenseCategories)
          ) : (
            <EmptyState
              icon="📦"
              title="Sin categorías de gasto"
              message="No hay categorías de gasto"
            />
          )}
        </Card>

        {/* Income Categories */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">💰 Ingresos</h3>
          {incomeCategories.length > 0 ? (
            renderCategoryList(incomeCategories)
          ) : (
            <EmptyState
              icon="📦"
              title="Sin categorías de ingreso"
              message="No hay categorías de ingreso"
            />
          )}
        </Card>
      </div>

      {/* Info */}
      <Card padding="lg" className="bg-blue-50 border-primary-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-3">ℹ️ Información</h3>
        <p className="text-sm text-neutral-700">
          Las categorías predefinidas no pueden ser eliminadas, pero puedes crear nuevas categorías personalizadas en futuras versiones de la aplicación.
        </p>
      </Card>
    </div>
  );
};
