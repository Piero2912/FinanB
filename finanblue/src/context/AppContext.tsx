import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Transaction,
  Budget,
  Goal,
  Category,
  PaymentMethod,
  Profile,
  AppState,
} from '../types/index.js';
import * as storage from '../services/storage.js';
import { MOCK_TRANSACTIONS, MOCK_BUDGETS, MOCK_GOALS, CATEGORIES, PAYMENT_METHODS, MOCK_PROFILE } from '../data/mockData.js';

interface AppContextType extends AppState {
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateProfile: (profile: Profile) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    transactions: [],
    budgets: [],
    goals: [],
    categories: CATEGORIES,
    paymentMethods: PAYMENT_METHODS,
    profile: MOCK_PROFILE,
  });

  // Initialize from localStorage
  useEffect(() => {
    const isInitialized = storage.isInitialized();

    if (!isInitialized) {
      // First time - load mock data
      storage.setTransactions(MOCK_TRANSACTIONS);
      storage.setBudgets(MOCK_BUDGETS);
      storage.setGoals(MOCK_GOALS);
      storage.setCategories(CATEGORIES);
      storage.setPaymentMethods(PAYMENT_METHODS);
      storage.setProfile(MOCK_PROFILE);
      storage.setInitialized();
    }

    // Load from storage
    setState({
      transactions: storage.getTransactions(),
      budgets: storage.getBudgets(),
      goals: storage.getGoals(),
      categories: storage.getCategories(),
      paymentMethods: storage.getPaymentMethods(),
      profile: storage.getProfile() || MOCK_PROFILE,
    });
  }, []);

  const addTransaction = (transaction: Transaction) => {
    storage.addTransaction(transaction);
    setState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    storage.updateTransaction(id, updates);
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  const deleteTransaction = (id: string) => {
    storage.deleteTransaction(id);
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id),
    }));
  };

  const addBudget = (budget: Budget) => {
    storage.addBudget(budget);
    setState(prev => ({
      ...prev,
      budgets: [...prev.budgets, budget],
    }));
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    storage.updateBudget(id, updates);
    setState(prev => ({
      ...prev,
      budgets: prev.budgets.map(b => (b.id === id ? { ...b, ...updates } : b)),
    }));
  };

  const deleteBudget = (id: string) => {
    storage.deleteBudget(id);
    setState(prev => ({
      ...prev,
      budgets: prev.budgets.filter(b => b.id !== id),
    }));
  };

  const addGoal = (goal: Goal) => {
    storage.addGoal(goal);
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, goal],
    }));
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    storage.updateGoal(id, updates);
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(g => (g.id === id ? { ...g, ...updates } : g)),
    }));
  };

  const deleteGoal = (id: string) => {
    storage.deleteGoal(id);
    setState(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id),
    }));
  };

  const updateProfile = (profile: Profile) => {
    storage.setProfile(profile);
    setState(prev => ({
      ...prev,
      profile,
    }));
  };

  const value: AppContextType = {
    ...state,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addGoal,
    updateGoal,
    deleteGoal,
    updateProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
