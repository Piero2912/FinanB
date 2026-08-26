export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  categoryId: string;
  paymentMethodId: string;
  date: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'weekly';
  name: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
  notes?: string;
}

export interface AppState {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  profile: Profile;
}

export interface Profile {
  name: string;
  email: string;
  currency: string;
  avatar: string;
  monthlyIncomeGoal: number;
  monthlySavingsGoal: number;
}

export interface InsightData {
  type: 'alert' | 'trend' | 'goal' | 'recommendation';
  emoji: string;
  title: string;
  message: string;
}
