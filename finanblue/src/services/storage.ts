import { Transaction, Budget, Goal, Category, PaymentMethod, Profile } from '../types/index.js';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finanblue_transactions',
  BUDGETS: 'finanblue_budgets',
  GOALS: 'finanblue_goals',
  CATEGORIES: 'finanblue_categories',
  PAYMENT_METHODS: 'finanblue_payment_methods',
  PROFILE: 'finanblue_profile',
  INITIALIZED: 'finanblue_initialized',
};

// Transactions
export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return data ? JSON.parse(data) : [];
};

export const setTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const addTransaction = (transaction: Transaction): void => {
  const transactions = getTransactions();
  transactions.push(transaction);
  setTransactions(transactions);
};

export const updateTransaction = (id: string, updates: Partial<Transaction>): void => {
  const transactions = getTransactions();
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updates };
    setTransactions(transactions);
  }
};

export const deleteTransaction = (id: string): void => {
  const transactions = getTransactions().filter(t => t.id !== id);
  setTransactions(transactions);
};

// Budgets
export const getBudgets = (): Budget[] => {
  const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
  return data ? JSON.parse(data) : [];
};

export const setBudgets = (budgets: Budget[]): void => {
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
};

export const addBudget = (budget: Budget): void => {
  const budgets = getBudgets();
  budgets.push(budget);
  setBudgets(budgets);
};

export const updateBudget = (id: string, updates: Partial<Budget>): void => {
  const budgets = getBudgets();
  const index = budgets.findIndex(b => b.id === id);
  if (index !== -1) {
    budgets[index] = { ...budgets[index], ...updates };
    setBudgets(budgets);
  }
};

export const deleteBudget = (id: string): void => {
  const budgets = getBudgets().filter(b => b.id !== id);
  setBudgets(budgets);
};

// Goals
export const getGoals = (): Goal[] => {
  const data = localStorage.getItem(STORAGE_KEYS.GOALS);
  return data ? JSON.parse(data) : [];
};

export const setGoals = (goals: Goal[]): void => {
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
};

export const addGoal = (goal: Goal): void => {
  const goals = getGoals();
  goals.push(goal);
  setGoals(goals);
};

export const updateGoal = (id: string, updates: Partial<Goal>): void => {
  const goals = getGoals();
  const index = goals.findIndex(g => g.id === id);
  if (index !== -1) {
    goals[index] = { ...goals[index], ...updates };
    setGoals(goals);
  }
};

export const deleteGoal = (id: string): void => {
  const goals = getGoals().filter(g => g.id !== id);
  setGoals(goals);
};

// Categories
export const getCategories = (): Category[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : [];
};

export const setCategories = (categories: Category[]): void => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

// Payment Methods
export const getPaymentMethods = (): PaymentMethod[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
  return data ? JSON.parse(data) : [];
};

export const setPaymentMethods = (methods: PaymentMethod[]): void => {
  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
};

// Profile
export const getProfile = (): Profile | null => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
};

export const setProfile = (profile: Profile): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

// Initialization
export const isInitialized = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.INITIALIZED) === 'true';
};

export const setInitialized = (): void => {
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
};

export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
