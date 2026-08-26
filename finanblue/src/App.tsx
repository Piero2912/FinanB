import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { TopBar } from './components/layout/TopBar';
import { TransactionForm } from './components/transactions/TransactionForm';

import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Analytics } from './pages/Analytics';
import { Budgets } from './pages/Budgets';
import { Goals } from './pages/Goals';
import { Categories } from './pages/Categories';
import { Profile } from './pages/Profile';

export const App: React.FC = () => {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  return (
    <BrowserRouter>
      <AppProvider>
        <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-50">
          <Sidebar />
          <div className="flex-1 flex flex-col lg:ml-64">
            <TopBar />
            <main className="flex-1 pb-20 lg:pb-0">
              <Routes>
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
          <BottomNav onNewTransaction={() => setIsTransactionFormOpen(true)} />
          <TransactionForm
            isOpen={isTransactionFormOpen}
            onClose={() => setIsTransactionFormOpen(false)}
          />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
