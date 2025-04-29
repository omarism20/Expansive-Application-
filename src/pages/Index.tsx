import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { ExpansiveHomePage } from "@/components/dashboard/ExpansiveHomePage";
import { Transaction } from "@/types";
import { 
  getTransactions, 
  saveTransactions, 
  getSettings, 
  initializeStorage,
  saveBudget,
  getBudget
} from "@/utils/storage";
import { toast } from "@/hooks/use-toast";

export default function Index() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState(2000);
  const settings = getSettings();
  
  // Initialize storage if needed
  useEffect(() => {
    initializeStorage();
    loadTransactions();
    
    // Load saved budget from storage
    const savedBudget = getBudget();
    if (savedBudget) {
      setBudget(savedBudget);
    }
  }, []);
  
  const loadTransactions = () => {
    const storedTransactions = getTransactions();
    setTransactions(storedTransactions);
  };
  
  const handleAddTransaction = (data: Omit<Transaction, 'id'> & { id?: string }) => {
    const newTransaction = {
      ...data,
      id: data.id || crypto.randomUUID()
    } as Transaction;
    
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    
    toast({
      title: "Transaction Added",
      description: "Your transaction has been added successfully",
    });
    
    setIsTransactionFormOpen(false);
  };
  
  const handleBudgetChange = (newBudget: number) => {
    setBudget(newBudget);
    saveBudget(newBudget);
    
    toast({
      title: "Budget Updated",
      description: `Monthly budget updated to $${newBudget.toLocaleString()}`
    });
  };
  
  // Calculate totals
  const calculateTotals = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    let totalSpent = 0;
    let todayExpenses = 0;
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const isCurrentMonth = 
        transactionDate.getMonth() === currentMonth && 
        transactionDate.getFullYear() === currentYear;
      
      if (isCurrentMonth && transaction.type === 'expense') {
        totalSpent += transaction.amount;
      }
      
      if (transaction.date === today && transaction.type === 'expense') {
        todayExpenses += transaction.amount;
      }
    });
    
    const remaining = budget - totalSpent;
    
    return {
      spent: totalSpent,
      remaining: remaining > 0 ? remaining : 0,
      todayExpenses
    };
  };
  
  const { spent, remaining, todayExpenses } = calculateTotals();

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-24">
        <ExpansiveHomePage 
          budget={budget}
          spent={spent}
          remaining={remaining}
          todayExpenses={todayExpenses}
          onAddTransaction={() => setIsTransactionFormOpen(true)}
          onBudgetChange={handleBudgetChange}
        />
      </main>
      
      <TransactionForm
        open={isTransactionFormOpen}
        onClose={() => setIsTransactionFormOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}
