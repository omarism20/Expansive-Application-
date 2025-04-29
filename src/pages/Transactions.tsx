
import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import Header from "@/components/layout/Header";
import { CurrencyCode, Transaction } from "@/types";
import { CurrencySelector, currencyMap } from "@/components/settings/CurrencySelector";
import { TransactionList } from "@/components/transactions/TransactionList";
import { getTransactions, saveTransactions, getSettings } from "@/utils/storage";

export default function Transactions() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  useEffect(() => {
    // Load transactions from storage
    loadTransactions();
    
    // Get currency from settings
    const settings = getSettings();
    setSelectedCurrency(settings.currency);
  }, []);
  
  const loadTransactions = () => {
    const storedTransactions = getTransactions();
    setTransactions(storedTransactions);
  };
  
  const handleAddTransaction = (data: Omit<Transaction, 'id'> & { id?: string }) => {
    let updatedTransactions: Transaction[];
    
    if (editingTransaction) {
      // Editing existing transaction
      updatedTransactions = transactions.map(tx => 
        tx.id === data.id ? { ...data as Transaction } : tx
      );
    } else {
      // Adding new transaction
      const newTransaction = {
        ...data,
        id: data.id || crypto.randomUUID()
      } as Transaction;
      
      updatedTransactions = [newTransaction, ...transactions];
    }
    
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    setIsTransactionFormOpen(false);
    setEditingTransaction(null);
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };
  
  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(tx => tx.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    setIsTransactionFormOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Transactions</h2>
          <div className="flex items-center gap-4">
            <CurrencySelector 
              value={selectedCurrency}
              onSelect={setSelectedCurrency}
            />
            <Button 
              onClick={() => {
                setEditingTransaction(null);
                setIsTransactionFormOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <TransactionList 
            transactions={transactions} 
            onSelectTransaction={handleEditTransaction}
          />
        </div>
      </main>

      <TransactionForm
        open={isTransactionFormOpen}
        onClose={() => {
          setIsTransactionFormOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleAddTransaction}
        onDelete={editingTransaction ? () => handleDeleteTransaction(editingTransaction.id) : undefined}
        initialData={editingTransaction}
      />
    </div>
  );
}
