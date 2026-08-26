import { format, parseISO, isThisMonth, isThisYear, differenceInMonths } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatCurrency = (amount: number, currency: string = 'S/'): string => {
  return `${currency} ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'dd MMM yyyy', { locale: es });
};

export const formatDateShort = (dateString: string): string => {
  return format(parseISO(dateString), 'dd/MM', { locale: es });
};

export const formatDateLong = (dateString: string): string => {
  return format(parseISO(dateString), 'EEEE, dd MMMM yyyy', { locale: es });
};

export const formatMonthYear = (dateString: string): string => {
  return format(parseISO(dateString), 'MMMM yyyy', { locale: es });
};

export const formatTime = (dateString: string): string => {
  return format(parseISO(dateString), 'HH:mm', { locale: es });
};

export const isToday = (dateString: string): boolean => {
  const date = parseISO(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const groupByMonth = (dates: string[]): Record<string, number> => {
  return dates.reduce((acc, date) => {
    const monthKey = formatMonthYear(date);
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getPercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value}%`;
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getMonthsDifference = (date1: string, date2: string): number => {
  return differenceInMonths(parseISO(date2), parseISO(date1));
};

export const getCurrentMonth = (): string => {
  return format(new Date(), 'yyyy-MM');
};

export const getCurrentDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getPreviousMonth = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return format(date, 'yyyy-MM');
};
