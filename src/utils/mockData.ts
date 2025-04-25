import { Transaction, Category, Budget, SummaryData, SavingGoal } from '../types';

// Mock Categories
export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Housing', color: '#8B5CF6', icon: 'home', type: 'expense' },
  { id: 'cat2', name: 'Food', color: '#F97316', icon: 'utensils', type: 'expense' },
  { id: 'cat3', name: 'Transportation', color: '#0EA5E9', icon: 'car', type: 'expense' },
  { id: 'cat4', name: 'Entertainment', color: '#10B981', icon: 'film', type: 'expense' },
  { id: 'cat5', name: 'Shopping', color: '#EC4899', icon: 'shopping-bag', type: 'expense' },
  { id: 'cat6', name: 'Healthcare', color: '#EF4444', icon: 'medical-services', type: 'expense' },
  { id: 'cat7', name: 'Salary', color: '#22C55E', icon: 'wallet', type: 'income' },
  { id: 'cat8', name: 'Investments', color: '#6366F1', icon: 'trending-up', type: 'income' },
  { id: 'cat9', name: 'Gifts', color: '#D946EF', icon: 'gift', type: 'income' },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    amount: 1200,
    description: 'Monthly rent',
    category: 'cat1',
    date: '2023-04-01',
    type: 'expense',
  },
  {
    id: 'tx2',
    amount: 85.75,
    description: 'Grocery shopping',
    category: 'cat2',
    date: '2023-04-03',
    type: 'expense',
  },
  {
    id: 'tx3',
    amount: 45.50,
    description: 'Gas',
    category: 'cat3',
    date: '2023-04-05',
    type: 'expense',
  },
  {
    id: 'tx4',
    amount: 3500,
    description: 'Monthly salary',
    category: 'cat7',
    date: '2023-04-01',
    type: 'income',
  },
  {
    id: 'tx5',
    amount: 120,
    description: 'Concert tickets',
    category: 'cat4',
    date: '2023-04-10',
    type: 'expense',
  },
  {
    id: 'tx6',
    amount: 250,
    description: 'New headphones',
    category: 'cat5',
    date: '2023-04-15',
    type: 'expense',
  },
  {
    id: 'tx7',
    amount: 95,
    description: 'Doctor appointment',
    category: 'cat6',
    date: '2023-04-18',
    type: 'expense',
  },
  {
    id: 'tx8',
    amount: 200,
    description: 'Stock dividend',
    category: 'cat8',
    date: '2023-04-20',
    type: 'income',
  },
  {
    id: 'tx9',
    amount: 100,
    description: 'Birthday money',
    category: 'cat9',
    date: '2023-04-22',
    type: 'income',
  }
];

// Mock Budgets
export const mockBudgets: Budget[] = [
  { id: 'budget1', category: 'cat1', amount: 1300, spent: 1200, period: 'monthly' },
  { id: 'budget2', category: 'cat2', amount: 500, spent: 85.75, period: 'monthly' },
  { id: 'budget3', category: 'cat3', amount: 200, spent: 45.50, period: 'monthly' },
  { id: 'budget4', category: 'cat4', amount: 150, spent: 120, period: 'monthly' },
  { id: 'budget5', category: 'cat5', amount: 300, spent: 250, period: 'monthly' },
  { id: 'budget6', category: 'cat6', amount: 200, spent: 95, period: 'monthly' },
];

// Mock Summary Data
export const mockSummaryData: SummaryData = {
  totalIncome: 3800,
  totalExpenses: 1796.25,
  balance: 2003.75,
  savingsRate: 52.73,
  topExpenseCategories: [
    { category: 'cat1', amount: 1200, percentage: 66.81 },
    { category: 'cat5', amount: 250, percentage: 13.92 },
    { category: 'cat4', amount: 120, percentage: 6.68 },
  ]
};

// Mock Saving Goals
export const mockSavingGoals: SavingGoal[] = [
  {
    id: "1",
    name: "New Laptop",
    targetAmount: 1500,
    currentAmount: 750,
    deadline: "2024-08-01",
    autoContribute: true,
    contributionAmount: 200,
    contributionInterval: "monthly"
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 5000,
    currentAmount: 2500,
    autoContribute: false
  }
];

// Helper function to get a category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find(category => category.id === id);
};

// Helper to get transactions for a specific date range
export const getTransactionsByDateRange = (
  startDate: string, 
  endDate: string
): Transaction[] => {
  return mockTransactions.filter(
    tx => tx.date >= startDate && tx.date <= endDate
  );
};

// Monthly spending by category
export const getMonthlySpendingByCategory = () => {
  const result = mockTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc: {[key: string]: number}, tx) => {
      if (!acc[tx.category]) {
        acc[tx.category] = 0;
      }
      acc[tx.category] += tx.amount;
      return acc;
    }, {});
  
  return Object.entries(result).map(([category, amount]) => ({
    category,
    amount,
    name: getCategoryById(category)?.name || 'Unknown',
    color: getCategoryById(category)?.color || '#999',
  }));
};

// Income vs Expenses by month
export const getIncomeVsExpensesByMonth = () => {
  // In a real app, this would aggregate by month
  return [
    { month: 'Jan', income: 3500, expenses: 1650 },
    { month: 'Feb', income: 3500, expenses: 1720 },
    { month: 'Mar', income: 3700, expenses: 1850 },
    { month: 'Apr', income: 3800, expenses: 1796.25 }
  ];
};

/**
 * Calculate total expenses for today
 * @param transactions - array of transactions
 * @returns total expenses for today
 */
export const getTodayExpenses = (transactions: Transaction[]): number => {
  const today = new Date().toISOString().split('T')[0];
  return transactions
    .filter(tx => tx.type === 'expense' && tx.date === today)
    .reduce((sum, tx) => sum + tx.amount, 0);
};

// Get daily spending for the last 7 days
export const getDailySpending = () => {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return last7Days.map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    amount: mockTransactions
      .filter(tx => tx.date === date && tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0)
  }));
};
