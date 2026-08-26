import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Plus, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext.js';
import { Card, Button, ProgressBar } from '../components/shared/index.js';
import { TransactionForm } from '../components/transactions/TransactionForm.js';
import { formatCurrency, getCurrentMonth } from '../utils/formatters.js';

export const Dashboard: React.FC = () => {
  const { transactions, budgets, goals, categories, profile } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);

  const currentMonth = getCurrentMonth();
  const currentTxns = useMemo(
    () => transactions.filter(t => t.date.startsWith(currentMonth)),
    [transactions, currentMonth]
  );

  const income = useMemo(
    () => currentTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    [currentTxns]
  );

  const expenses = useMemo(
    () => currentTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [currentTxns]
  );

  const balance = income - expenses;

  // Gastos por categoría
  const categoryData = useMemo(() => {
    const data: Record<string, number> = {};
    currentTxns
      .filter(t => t.type === 'expense')
      .forEach(t => {
        data[t.categoryId] = (data[t.categoryId] || 0) + t.amount;
      });

    return Object.entries(data)
      .map(([catId, amount]) => {
        const cat = categories.find(c => c.id === catId);
        return {
          name: cat?.name || 'Otro',
          value: amount,
          color: cat?.color || '#ccc',
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [currentTxns, categories]);

  // Ingresos por categoría
  const incomeData = useMemo(() => {
    const data: Record<string, { amount: number; categoryId: string }> = {};
    currentTxns
      .filter(t => t.type === 'income')
      .forEach(t => {
        if (!data[t.categoryId]) {
          data[t.categoryId] = { amount: 0, categoryId: t.categoryId };
        }
        data[t.categoryId].amount += t.amount;
      });

    return Object.entries(data)
      .map(([catId, { amount }]) => {
        const cat = categories.find(c => c.id === catId);
        return {
          categoryId: catId,
          name: cat?.name || 'Otro',
          value: amount,
          color: cat?.color || '#ccc',
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [currentTxns, categories]);

  const COLORS = categoryData.map(d => d.color);

  // Mapeo de categorías a imágenes
  const categoryImages: Record<string, string> = {
    'cat-11': '/logos/Mandado por mamá.jpg',
    'cat-12': '/logos/Mandado por papá.jpg',
    'cat-13': '/logos/Propina.png',
    'cat-14': '/logos/dinero de chambita.jpg',
  };

  const getCategoryImage = (catId: string): string | null => {
    return categoryImages[catId] || null;
  };

  const getCategoryIcon = (catId: string) => categories.find(c => c.id === catId)?.icon || '📦';

  const topExpenses = useMemo(
    () => currentTxns.filter(t => t.type === 'expense').sort((a, b) => b.amount - a.amount).slice(0, 5),
    [currentTxns]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-50 p-4 md:p-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">Hola, {profile.name.split(' ')[0]} 👋</h1>
          <p className="text-neutral-600 mt-2">Aquí está tu resumen financiero</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} variant="primary" size="lg" className="hidden md:flex gap-2">
          <Plus className="w-5 h-5" />
          Nuevo
        </Button>
      </div>

      {/* Balance Principal */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="80" cy="20" r="30" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-primary-100 text-sm font-medium mb-2">Balance disponible</p>
              <p className="text-6xl font-bold">
                {hideBalance ? '•••••••' : formatCurrency(balance)}
              </p>
            </div>
            <button
              onClick={() => setHideBalance(!hideBalance)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              {hideBalance ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-primary-100 text-sm mb-1">Ingresos</p>
              <p className="text-2xl font-bold">{formatCurrency(income)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-primary-100 text-sm mb-1">Gastos</p>
              <p className="text-2xl font-bold">{formatCurrency(expenses)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Gastos por Categoría */}
        <Card padding="lg" className="lg:col-span-2">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Gastos por Categoría</h3>
          
          {categoryData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gráfico */}
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Lista */}
              <div className="space-y-3">
                {categoryData.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm font-medium text-neutral-900 truncate">{cat.name}</span>
                    </div>
                    <span className="text-sm font-bold text-neutral-900 ml-2">
                      {((cat.value / expenses) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-neutral-500">
              <p>Sin gastos registrados</p>
            </div>
          )}
        </Card>

        {/* Ingresos por Categoría */}
        <Card padding="lg">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Ingresos por Categoría</h3>
          {incomeData.length > 0 ? (
            <div className="space-y-3">
              {incomeData.map((cat, idx) => {
                const categoryImg = getCategoryImage(cat.categoryId);
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {categoryImg ? (
                        <img
                          src={categoryImg}
                          alt={cat.name}
                          className="w-8 h-8 object-cover rounded-lg flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                      )}
                      <span className="text-sm font-medium text-neutral-900 truncate">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-success">{formatCurrency(cat.value)}</p>
                      <p className="text-xs text-neutral-500">
                        {((cat.value / income) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-neutral-500">
              <p>Sin ingresos registrados</p>
            </div>
          )}
        </Card>
        <Card padding="lg">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Mis Metas</h3>
          <div className="space-y-4">
            {goals.length > 0 ? (
              goals.slice(0, 3).map(goal => {
                const pct = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{goal.icon}</span>
                        <span className="font-medium text-sm text-neutral-900">{goal.name}</span>
                      </div>
                      <span className="text-xs font-bold text-primary-600">{Math.min(pct, 100).toFixed(0)}%</span>
                    </div>
                    <ProgressBar value={goal.currentAmount} max={goal.targetAmount} showLabel={false} />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-neutral-500">Sin metas</p>
            )}
          </div>
        </Card>
      </div>

      {/* Presupuestos */}
      <Card padding="lg" className="mb-8">
        <h3 className="text-xl font-bold text-neutral-900 mb-6">Presupuestos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.length > 0 ? (
            budgets.map(budget => {
              const cat = categories.find(c => c.id === budget.categoryId);
              const spent = currentTxns
                .filter(t => t.type === 'expense' && t.categoryId === budget.categoryId)
                .reduce((s, t) => s + t.amount, 0);
              const pct = (spent / budget.amount) * 100;
              const status = pct >= 100 ? 'danger' : pct >= 75 ? 'warning' : 'success';

              return (
                <div
                  key={budget.id}
                  className={`p-4 rounded-xl border-2 ${
                    status === 'danger'
                      ? 'border-danger bg-red-50'
                      : status === 'warning'
                        ? 'border-warning bg-amber-50'
                        : 'border-success bg-green-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryImage(budget.categoryId) ? (
                      <img
                        src={getCategoryImage(budget.categoryId)!}
                        alt={cat?.name}
                        className="w-8 h-8 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-2xl">{cat?.icon}</span>
                    )}
                    <div>
                      <p className="font-semibold text-neutral-900">{budget.name}</p>
                      <p className="text-xs text-neutral-600">
                        {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                      </p>
                    </div>
                  </div>
                  <ProgressBar value={spent} max={budget.amount} showLabel />
                </div>
              );
            })
          ) : (
            <p className="text-sm text-neutral-500 col-span-full">Sin presupuestos</p>
          )}
        </div>
      </Card>

      {/* Top Gastos */}
      <Card padding="lg">
        <h3 className="text-xl font-bold text-neutral-900 mb-6">Mayores Gastos</h3>
        <div className="space-y-3">
          {topExpenses.length > 0 ? (
            topExpenses.map(txn => {
              const categoryImg = getCategoryImage(txn.categoryId);
              return (
                <div key={txn.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {categoryImg ? (
                      <img
                        src={categoryImg}
                        alt={categories.find(c => c.id === txn.categoryId)?.name}
                        className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-2xl">{getCategoryIcon(txn.categoryId)}</span>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{txn.description}</p>
                      <p className="text-xs text-neutral-500">{categories.find(c => c.id === txn.categoryId)?.name}</p>
                    </div>
                  </div>
                  <p className="font-bold text-danger ml-2 whitespace-nowrap">{formatCurrency(txn.amount)}</p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-neutral-500">Sin gastos registrados</p>
          )}
        </div>
      </Card>

      {/* Floating Button Mobile */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="md:hidden fixed bottom-24 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </button>

      <TransactionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};
