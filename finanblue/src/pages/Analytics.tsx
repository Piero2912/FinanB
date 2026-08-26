import React, { useMemo, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useApp } from '../context/AppContext.js';
import { Card, Select, Badge } from '../components/shared/index.js';
import { formatCurrency, formatMonthYear, getPercentage } from '../utils/formatters.js';

export const Analytics: React.FC = () => {
  const { transactions, categories, paymentMethods } = useApp();
  const [period, setPeriod] = useState<'3m' | '6m' | '12m'>('3m');

  const getMonthsBack = () => {
    return period === '3m' ? 3 : period === '6m' ? 6 : 12;
  };

  // Monthly trend
  const monthlyTrend = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {};
    const now = new Date();
    const monthsBack = getMonthsBack();

    for (let i = monthsBack - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months[key] = { income: 0, expense: 0 };
    }

    transactions.forEach(t => {
      const monthKey = t.date.substring(0, 7);
      if (months[monthKey]) {
        if (t.type === 'income') {
          months[monthKey].income += t.amount;
        } else {
          months[monthKey].expense += t.amount;
        }
      }
    });

    return Object.entries(months).map(([month, data]) => ({
      month: formatMonthYear(month + '-01'),
      income: data.income,
      expense: data.expense,
    }));
  }, [transactions, period]);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        breakdown[t.categoryId] = (breakdown[t.categoryId] || 0) + t.amount;
      });

    return Object.entries(breakdown)
      .map(([categoryId, amount]) => {
        const category = categories.find(c => c.id === categoryId);
        return {
          name: category?.name || 'Sin categoría',
          value: amount,
          color: category?.color || '#ccc',
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  // Payment method breakdown
  const paymentBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        breakdown[t.paymentMethodId] = (breakdown[t.paymentMethodId] || 0) + t.amount;
      });

    return Object.entries(breakdown)
      .map(([methodId, amount]) => {
        const method = paymentMethods.find(pm => pm.id === methodId);
        return {
          methodId,
          name: method?.name || 'Sin método',
          amount,
          icon: method?.icon || '💳',
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, paymentMethods]);

  // Income breakdown by category
  const incomeBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'income')
      .forEach(t => {
        breakdown[t.categoryId] = (breakdown[t.categoryId] || 0) + t.amount;
      });

    return Object.entries(breakdown)
      .map(([categoryId, amount]) => {
        const category = categories.find(c => c.id === categoryId);
        return {
          categoryId,
          name: category?.name || 'Sin categoría',
          amount,
          color: category?.color || '#ccc',
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, categories]);

  const categoryImages: Record<string, string> = {
    'cat-11': '/logos/Mandado por mamá.jpg',
    'cat-12': '/logos/Mandado por papá.jpg',
    'cat-13': '/logos/Propina.png',
    'cat-14': '/logos/dinero de chambita.jpg',
  };

  const getCategoryImage = (catId: string): string | null => {
    return categoryImages[catId] || null;
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

  // Summary stats
  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const avgMonthlyExpense = monthlyTrend.length > 0
      ? monthlyTrend.reduce((sum, m) => sum + m.expense, 0) / monthlyTrend.length
      : 0;

    return {
      totalIncome,
      totalExpense,
      avgMonthlyExpense,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0,
    };
  }, [transactions, monthlyTrend]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Estadísticas</h1>
          <p className="text-neutral-600">Análisis detallado de tus finanzas</p>
        </div>
        <Select
          value={period}
          onChange={(e) => setPeriod(e.target.value as '3m' | '6m' | '12m')}
          options={[
            { value: '3m', label: 'Últimos 3 meses' },
            { value: '6m', label: 'Últimos 6 meses' },
            { value: '12m', label: 'Últimos 12 meses' },
          ]}
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding="md">
          <p className="text-xs text-neutral-600 mb-1">Ingresos totales</p>
          <p className="text-xl md:text-2xl font-bold text-success">{formatCurrency(stats.totalIncome)}</p>
        </Card>
        <Card padding="md">
          <p className="text-xs text-neutral-600 mb-1">Gastos totales</p>
          <p className="text-xl md:text-2xl font-bold text-danger">{formatCurrency(stats.totalExpense)}</p>
        </Card>
        <Card padding="md">
          <p className="text-xs text-neutral-600 mb-1">Promedio mensual</p>
          <p className="text-xl md:text-2xl font-bold text-primary-600">
            {formatCurrency(stats.avgMonthlyExpense)}
          </p>
        </Card>
        <Card padding="md">
          <p className="text-xs text-neutral-600 mb-1">Tasa de ahorro</p>
          <p className="text-xl md:text-2xl font-bold text-success">{stats.savingsRate.toFixed(1)}%</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense Trend */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Ingresos vs Gastos</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#16A34A" name="Ingresos" />
                <Line type="monotone" dataKey="expense" stroke="#DC2626" name="Gastos" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Pie */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Gastos por Categoría</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Payment Methods */}
      {paymentBreakdown.length > 0 && (
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Gastos por Método de Pago</h3>
          <div className="space-y-3">
            {paymentBreakdown.map((method, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b border-neutral-200 last:border-0">
                <div className="flex items-center gap-3">
                  <img
                    src={getPaymentMethodLogo(method.methodId)}
                    alt={method.name}
                    className="w-10 h-10 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="font-medium text-neutral-900">{method.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900">{formatCurrency(method.amount)}</p>
                  <p className="text-xs text-neutral-500">
                    {((method.amount / stats.totalExpense) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Income by Category */}
      {incomeBreakdown.length > 0 && (
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Ingresos por Categoría</h3>
          <div className="space-y-3">
            {incomeBreakdown.map((income, index) => {
              const categoryImg = getCategoryImage(income.categoryId);
              return (
                <div key={index} className="flex items-center justify-between pb-3 border-b border-neutral-200 last:border-0">
                  <div className="flex items-center gap-3">
                    {categoryImg ? (
                      <img
                        src={categoryImg}
                        alt={income.name}
                        className="w-10 h-10 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: income.color }}
                      />
                    )}
                    <span className="font-medium text-neutral-900">{income.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{formatCurrency(income.amount)}</p>
                    <p className="text-xs text-neutral-500">
                      {((income.amount / stats.totalIncome) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
