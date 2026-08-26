// Mock data for FinanBlue - Datos ficticios iniciales
import { Category, PaymentMethod, Transaction, Budget, Goal, Profile } from '../types/index.js';

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Alimentación', icon: '🍽️', color: '#EF4444', type: 'expense' },
  { id: 'cat-2', name: 'Transporte', icon: '🚗', color: '#F97316', type: 'expense' },
  { id: 'cat-3', name: 'Entretenimiento', icon: '🎬', color: '#8B5CF6', type: 'expense' },
  { id: 'cat-4', name: 'Salud', icon: '💊', color: '#EC4899', type: 'expense' },
  { id: 'cat-5', name: 'Educación', icon: '📚', color: '#14B8A6', type: 'expense' },
  { id: 'cat-6', name: 'Ropa', icon: '👔', color: '#F59E0B', type: 'expense' },
  { id: 'cat-7', name: 'Hogar', icon: '🏠', color: '#6366F1', type: 'expense' },
  { id: 'cat-8', name: 'Servicios', icon: '💡', color: '#0EA5E9', type: 'expense' },
  { id: 'cat-9', name: 'Suscripciones', icon: '📱', color: '#10B981', type: 'expense' },
  { id: 'cat-10', name: 'Otros gastos', icon: '💸', color: '#6B7280', type: 'expense' },
  { id: 'cat-11', name: 'Mandado por mamá', icon: '�', color: '#EC4899', type: 'income' },
  { id: 'cat-12', name: 'Mandado por papá', icon: '�', color: '#3B82F6', type: 'income' },
  { id: 'cat-13', name: 'Propina', icon: '�', color: '#F59E0B', type: 'income' },
  { id: 'cat-14', name: 'Dinero de chambita', icon: '�', color: '#10B981', type: 'income' },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm-1', name: 'Efectivo', icon: '💵', color: '#22C55E' },
  { id: 'pm-2', name: 'BCP', icon: '🟠', color: '#FF8C00' },
  { id: 'pm-3', name: 'YAPE', icon: '�', color: '#A855F7' },
  { id: 'pm-4', name: 'PLIN', icon: '�', color: '#06B6D4' },
  { id: 'pm-5', name: 'BBVA', icon: '🔵', color: '#0052CC' },
];

const today = new Date();
const fmt = (d: Date) => d.toISOString().split('T')[0];
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return fmt(d);
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  // Ingresos
  { id: 't-1', type: 'income', amount: 150, description: 'Mandado de mamá', categoryId: 'cat-11', paymentMethodId: 'pm-1', date: daysAgo(2), notes: '' },
  { id: 't-2', type: 'income', amount: 200, description: 'Mandado de papá', categoryId: 'cat-12', paymentMethodId: 'pm-1', date: daysAgo(5), notes: '' },
  { id: 't-3', type: 'income', amount: 50, description: 'Propina por favor', categoryId: 'cat-13', paymentMethodId: 'pm-1', date: daysAgo(10), notes: '' },
  { id: 't-4', type: 'income', amount: 120, description: 'Trabajo en chambita', categoryId: 'cat-14', paymentMethodId: 'pm-2', date: daysAgo(14), notes: '' },
  { id: 't-5', type: 'income', amount: 180, description: 'Mandado de mamá', categoryId: 'cat-11', paymentMethodId: 'pm-1', date: daysAgo(32), notes: '' },
  { id: 't-6', type: 'income', amount: 100, description: 'Propina', categoryId: 'cat-13', paymentMethodId: 'pm-3', date: daysAgo(38), notes: '' },
  // Gastos este mes
  { id: 't-7', type: 'expense', amount: 45, description: 'Desayuno', categoryId: 'cat-1', paymentMethodId: 'pm-1', date: daysAgo(1), notes: '' },
  { id: 't-8', type: 'expense', amount: 25, description: 'Almuerzo', categoryId: 'cat-1', paymentMethodId: 'pm-3', date: daysAgo(3), notes: '' },
  { id: 't-9', type: 'expense', amount: 15, description: 'Pasaje', categoryId: 'cat-2', paymentMethodId: 'pm-1', date: daysAgo(3), notes: '' },
  { id: 't-10', type: 'expense', amount: 30, description: 'Pasajes ida y vuelta', categoryId: 'cat-2', paymentMethodId: 'pm-4', date: daysAgo(6), notes: '' },
  { id: 't-11', type: 'expense', amount: 20, description: 'Película', categoryId: 'cat-3', paymentMethodId: 'pm-5', date: daysAgo(7), notes: '' },
  { id: 't-12', type: 'expense', amount: 60, description: 'Ropa nueva', categoryId: 'cat-6', paymentMethodId: 'pm-2', date: daysAgo(8), notes: '' },
  { id: 't-13', type: 'expense', amount: 35, description: 'Farmacia', categoryId: 'cat-4', paymentMethodId: 'pm-1', date: daysAgo(9), notes: '' },
  { id: 't-14', type: 'expense', amount: 50, description: 'Libros', categoryId: 'cat-5', paymentMethodId: 'pm-2', date: daysAgo(11), notes: '' },
  { id: 't-15', type: 'expense', amount: 40, description: 'Internet', categoryId: 'cat-8', paymentMethodId: 'pm-2', date: daysAgo(12), notes: '' },
  { id: 't-16', type: 'expense', amount: 25, description: 'Streaming', categoryId: 'cat-9', paymentMethodId: 'pm-3', date: daysAgo(13), notes: '' },
  // Gastos mes anterior
  { id: 't-18', type: 'expense', amount: 50, description: 'Comida rápida', categoryId: 'cat-1', paymentMethodId: 'pm-1', date: daysAgo(33), notes: '' },
  { id: 't-19', type: 'expense', amount: 35, description: 'Pasajes', categoryId: 'cat-2', paymentMethodId: 'pm-1', date: daysAgo(35), notes: '' },
  { id: 't-20', type: 'expense', amount: 20, description: 'Música', categoryId: 'cat-3', paymentMethodId: 'pm-4', date: daysAgo(37), notes: '' },
];

export const MOCK_BUDGETS: Budget[] = [
  { id: 'b-1', categoryId: 'cat-1', amount: 200, period: 'monthly', name: 'Alimentación' },
  { id: 'b-2', categoryId: 'cat-2', amount: 100, period: 'monthly', name: 'Transporte' },
  { id: 'b-3', categoryId: 'cat-3', amount: 80, period: 'monthly', name: 'Entretenimiento' },
  { id: 'b-4', categoryId: 'cat-6', amount: 150, period: 'monthly', name: 'Ropa' },
  { id: 'b-5', categoryId: 'cat-8', amount: 100, period: 'monthly', name: 'Servicios' },
  { id: 'b-6', categoryId: 'cat-9', amount: 50, period: 'monthly', name: 'Suscripciones' },
];

export const MOCK_GOALS: Goal[] = [
  { id: 'g-1', name: 'Fondo de emergencia', targetAmount: 5000, currentAmount: 1800, deadline: '2026-12-31', icon: '🛡️', color: '#3B82F6', notes: '3 meses de gastos' },
  { id: 'g-2', name: 'Laptop nueva', targetAmount: 3500, currentAmount: 2100, deadline: '2026-10-01', icon: '💻', color: '#8B5CF6', notes: 'MacBook Air M2' },
  { id: 'g-3', name: 'Viaje a Europa', targetAmount: 12000, currentAmount: 3400, deadline: '2027-06-01', icon: '✈️', color: '#F59E0B', notes: 'España, Francia e Italia' },
  { id: 'g-4', name: 'Curso Máster', targetAmount: 8000, currentAmount: 500, deadline: '2027-03-01', icon: '🎓', color: '#14B8A6', notes: 'MBA Online' },
];

export const MOCK_PROFILE: Profile = {
  name: 'Carlos Mendoza',
  email: 'carlos.mendoza@email.com',
  currency: 'S/',
  avatar: 'CM',
  monthlyIncomeGoal: 6000,
  monthlySavingsGoal: 1500,
};
