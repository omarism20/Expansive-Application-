// Type definitions for the finance tracker app

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: TransactionType;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: TransactionType;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'RUB' | 'TRY' | 'INR';

export interface CurrencySettings {
  code: CurrencyCode;
  symbol: string;
  position: 'before' | 'after';
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

export type RecurrenceInterval = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurringTransaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
  interval: RecurrenceInterval;
  startDate: string;
  lastProcessed: string;
  isActive: boolean;
}

export interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
  topExpenseCategories: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  autoContribute: boolean;
  contributionAmount?: number;
  contributionInterval?: RecurrenceInterval;
}
