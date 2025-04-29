
// Storage utility for persisting data in localStorage

// Types
import { 
  Transaction, 
  SavingGoal, 
  CurrencyCode,
  RecurringTransaction,
  Category 
} from "@/types";

// Keys for localStorage
const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-app-transactions',
  SAVING_GOALS: 'finance-app-saving-goals',
  SETTINGS: 'finance-app-settings',
  RECURRING_TRANSACTIONS: 'finance-app-recurring-transactions',
  CATEGORIES: 'finance-app-categories'
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
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving transactions to localStorage:", error);
  }
};

// Get transactions from localStorage
export const getTransactions = (): Transaction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving transactions from localStorage:", error);
    return [];
  }
};

// Save saving goals to localStorage
export const saveSavingGoals = (goals: SavingGoal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVING_GOALS, JSON.stringify(goals));
  } catch (error) {
    console.error("Error saving goals to localStorage:", error);
  }
};

// Get saving goals from localStorage
export const getSavingGoals = (): SavingGoal[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVING_GOALS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving goals from localStorage:", error);
    return [];
  }
};

// Save categories to localStorage
export const saveCategories = (categories: Category[]): void => {
  try {
    console.log("Saving categories:", categories);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error("Error saving categories to localStorage:", error);
  }
};

// Get categories from localStorage
export const getCategories = (): Category[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const parsedCategories = stored ? JSON.parse(stored) : [];
    console.log("Retrieved categories:", parsedCategories);
    return parsedCategories;
  } catch (error) {
    console.error("Error retrieving categories from localStorage:", error);
    return [];
  }
};

// Save recurring transactions to localStorage
export const saveRecurringTransactions = (recurring: RecurringTransaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.RECURRING_TRANSACTIONS, JSON.stringify(recurring));
  } catch (error) {
    console.error("Error saving recurring transactions to localStorage:", error);
  }
};

// Get recurring transactions from localStorage
export const getRecurringTransactions = (): RecurringTransaction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECURRING_TRANSACTIONS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving recurring transactions from localStorage:", error);
    return [];
  }
};

// Save settings to localStorage
export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings to localStorage:", error);
  }
};

// Get settings from localStorage
export const getSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error retrieving settings from localStorage:", error);
    return DEFAULT_SETTINGS;
  }
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
  
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    import('@/utils/mockData').then(({ mockCategories }) => {
      saveCategories(mockCategories);
    });
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.RECURRING_TRANSACTIONS)) {
    // Initialize with empty array since mockData may not have recurring transactions
    saveRecurringTransactions([]);
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    saveSettings(DEFAULT_SETTINGS);
  }
};
