
// Storage utility for persisting data in localStorage

// Types
import { 
  Transaction, 
  SavingGoal, 
  CurrencyCode,
  RecurringTransaction 
} from "@/types";

// Keys for localStorage
const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-app-transactions',
  SAVING_GOALS: 'finance-app-saving-goals',
  SETTINGS: 'finance-app-settings',
  RECURRING_TRANSACTIONS: 'finance-app-recurring-transactions'
};

// Default settings
export const DEFAULT_SETTINGS = {
  currency: 'USD' as CurrencyCode,
  theme: 'Dark',
  security: 'PIN',
  securityValue: '1234',
  notifications: true
};

// Settings interface
export interface AppSettings {
  currency: CurrencyCode;
  theme: string;
  security: string;
  securityValue: string;
  notifications: boolean;
}

// Save transactions to localStorage
export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

// Get transactions from localStorage
export const getTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return stored ? JSON.parse(stored) : [];
};

// Save saving goals to localStorage
export const saveSavingGoals = (goals: SavingGoal[]): void => {
  localStorage.setItem(STORAGE_KEYS.SAVING_GOALS, JSON.stringify(goals));
};

// Get saving goals from localStorage
export const getSavingGoals = (): SavingGoal[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.SAVING_GOALS);
  return stored ? JSON.parse(stored) : [];
};

// Save recurring transactions to localStorage
export const saveRecurringTransactions = (recurring: RecurringTransaction[]): void => {
  localStorage.setItem(STORAGE_KEYS.RECURRING_TRANSACTIONS, JSON.stringify(recurring));
};

// Get recurring transactions from localStorage
export const getRecurringTransactions = (): RecurringTransaction[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.RECURRING_TRANSACTIONS);
  return stored ? JSON.parse(stored) : [];
};

// Save settings to localStorage
export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

// Get settings from localStorage
export const getSettings = (): AppSettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
};

// Initialize storage with mock data if empty
export const initializeStorage = (): void => {
  // Only initialize if storage is empty
  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    import('@/utils/mockData').then(({ mockTransactions }) => {
      saveTransactions(mockTransactions);
    });
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.SAVING_GOALS)) {
    import('@/utils/mockData').then(({ mockSavingGoals }) => {
      saveSavingGoals(mockSavingGoals);
    });
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.RECURRING_TRANSACTIONS)) {
    import('@/utils/mockData').then(({ mockRecurringTransactions }) => {
      saveRecurringTransactions(mockRecurringTransactions);
    });
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    saveSettings(DEFAULT_SETTINGS);
  }
};
