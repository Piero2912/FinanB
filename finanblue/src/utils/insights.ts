import { Transaction, Budget, Goal, Category, InsightData } from '../types/index.js';
import { format, parseISO, startOfMonth, endOfMonth, isBefore, isAfter } from 'date-fns';
import { getPercentage, calculateChange } from './formatters.js';

export const generateInsights = (
  transactions: Transaction[],
  budgets: Budget[],
  goals: Goal[],
  categories: Category[]
): InsightData[] => {
  const insights: InsightData[] = [];

  // Budget alerts
  insights.push(...generateBudgetAlerts(transactions, budgets, categories));

  // Trend analysis
  insights.push(...generateTrendAnalysis(transactions));

  // Goal progress
  insights.push(...generateGoalInsights(goals));

  // Spending patterns
  insights.push(...generateSpendingRecommendations(transactions, categories));

  return insights.slice(0, 5); // Limit to 5 insights
};

const generateBudgetAlerts = (
  transactions: Transaction[],
  budgets: Budget[],
  categories: Category[]
): InsightData[] => {
  const alerts: InsightData[] = [];
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  for (const budget of budgets) {
    const category = categories.find(c => c.id === budget.categoryId);
    if (!category) continue;

    const spent = transactions
      .filter(
        t =>
          t.type === 'expense' &&
          t.categoryId === budget.categoryId &&
          t.date.startsWith(currentMonth)
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = getPercentage(spent, budget.amount);

    if (percentage >= 100) {
      alerts.push({
        type: 'alert',
        emoji: '🚨',
        title: 'Límite excedido',
        message: `Has excedido tu presupuesto de ${category.name}. Gastaste S/ ${spent.toFixed(2)} de S/ ${budget.amount.toFixed(2)}.`,
      });
    } else if (percentage >= 90) {
      alerts.push({
        type: 'alert',
        emoji: '⚠️',
        title: 'Cerca del límite',
        message: `${category.name}: ${percentage}% del presupuesto. Te quedan S/ ${(budget.amount - spent).toFixed(2)}.`,
      });
    } else if (percentage >= 75) {
      alerts.push({
        type: 'alert',
        emoji: '📌',
        title: 'Presupuesto en uso',
        message: `${category.name}: ${percentage}% utilizado.`,
      });
    }
  }

  return alerts;
};

const generateTrendAnalysis = (transactions: Transaction[]): InsightData[] => {
  const trends: InsightData[] = [];
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const prevMonthStr = `${previousMonth.getFullYear()}-${String(previousMonth.getMonth() + 1).padStart(2, '0')}`;

  // Current month expenses
  const currentExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  // Previous month expenses
  const previousExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(prevMonthStr))
    .reduce((sum, t) => sum + t.amount, 0);

  const change = calculateChange(previousExpenses, currentExpenses);

  if (change > 10) {
    trends.push({
      type: 'trend',
      emoji: '📈',
      title: 'Gasto en aumento',
      message: `Tus gastos aumentaron ${Math.abs(change)}% respecto al mes anterior.`,
    });
  } else if (change < -10) {
    trends.push({
      type: 'trend',
      emoji: '📉',
      title: 'Gasto en descenso',
      message: `Tus gastos disminuyeron ${Math.abs(change)}% respecto al mes anterior. ¡Buen trabajo!`,
    });
  }

  return trends;
};

const generateGoalInsights = (goals: Goal[]): InsightData[] => {
  const insights: InsightData[] = [];

  for (const goal of goals) {
    const progress = getPercentage(goal.currentAmount, goal.targetAmount);
    const remaining = goal.targetAmount - goal.currentAmount;

    if (progress >= 100) {
      insights.push({
        type: 'goal',
        emoji: '🎉',
        title: 'Meta alcanzada',
        message: `¡Felicidades! Alcanzaste tu meta de ${goal.name}.`,
      });
    } else if (progress >= 75) {
      insights.push({
        type: 'goal',
        emoji: '🚀',
        title: 'Casi allá',
        message: `${goal.name}: ${progress}% completada. Te faltan S/ ${remaining.toFixed(2)}.`,
      });
    }
  }

  return insights;
};

const generateSpendingRecommendations = (
  transactions: Transaction[],
  categories: Category[]
): InsightData[] => {
  const recommendations: InsightData[] = [];
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // Find top spending category this month
  const categorySpending: Record<string, number> = {};
  transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .forEach(t => {
      categorySpending[t.categoryId] = (categorySpending[t.categoryId] || 0) + t.amount;
    });

  const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
  if (topCategory) {
    const category = categories.find(c => c.id === topCategory[0]);
    if (category) {
      recommendations.push({
        type: 'recommendation',
        emoji: '💡',
        title: 'Mayor gasto',
        message: `Este mes has gastado más en ${category.name} (S/ ${topCategory[1].toFixed(2)}).`,
      });
    }
  }

  return recommendations;
};
