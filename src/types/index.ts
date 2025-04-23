
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

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
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
