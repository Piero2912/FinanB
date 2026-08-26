import React, { useState, useMemo } from 'react';
import { Trash2, Edit2, Search } from 'lucide-react';
import { useApp } from '../context/AppContext.js';
import { Card, Button, Input, Select, EmptyState } from '../components/shared/index.js';
import { TransactionForm } from '../components/transactions/TransactionForm.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

type FilterType = 'all' | 'income' | 'expense';

export const Transactions: React.FC = () => {
  const { transactions, categories, paymentMethods, deleteTransaction } = useApp();

  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        if (filterType !== 'all' && t.type !== filterType) return false;
        if (searchText && !t.description.toLowerCase().includes(searchText.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterType, searchText]);

  // Group by date
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, typeof filteredTransactions> = {};
    filteredTransactions.forEach(t => {
      if (!groups[t.date]) {
        groups[t.date] = [];
      }
      groups[t.date].push(t);
    });
    return Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  }, [filteredTransactions]);

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.icon || '📦';
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

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setEditingId(undefined);
    setIsFormOpen(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Movimientos</h1>
          <p className="text-neutral-600">Historial de tus ingresos y gastos</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="primary"
          size="md"
        >
          Nuevo movimiento
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Buscar movimiento..."
          icon={<Search className="w-4 h-4" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
          options={[
            { value: 'all', label: 'Todos' },
            { value: 'income', label: '💰 Ingresos' },
            { value: 'expense', label: '💸 Gastos' },
          ]}
        />
      </div>

      {/* Transactions List */}
      {groupedTransactions.length > 0 ? (
        <div className="space-y-6">
          {groupedTransactions.map(([date, dayTransactions]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-neutral-600 mb-3 sticky top-0">
                {formatDate(date)}
              </h3>
              <div className="space-y-2">
                {dayTransactions.map(transaction => (
                  <Card key={transaction.id} padding="md" hoverable>
                    <div className="flex items-center gap-4 justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={getPaymentMethodLogo(transaction.paymentMethodId)}
                          alt={paymentMethods.find(pm => pm.id === transaction.paymentMethodId)?.name}
                          className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-neutral-900 truncate">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-neutral-500">{paymentMethods.find(pm => pm.id === transaction.paymentMethodId)?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-lg whitespace-nowrap ${
                          transaction.type === 'income' ? 'text-success' : 'text-danger'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <button
                          onClick={() => handleEdit(transaction.id)}
                          className="p-2 hover:bg-neutral-100 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="p-2 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </div>
                    {transaction.notes && (
                      <p className="text-xs text-neutral-500 mt-2 ml-14">{transaction.notes}</p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card padding="lg">
          <EmptyState
            icon="📋"
            title="Sin movimientos"
            message={searchText ? 'No se encontraron movimientos que coincidan' : 'Registra tu primer movimiento para comenzar'}
            action={{
              label: 'Nuevo movimiento',
              onClick: () => setIsFormOpen(true),
            }}
          />
        </Card>
      )}

      {/* Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        editingId={editingId}
      />
    </div>
  );
};
