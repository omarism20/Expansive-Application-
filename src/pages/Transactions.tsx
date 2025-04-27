
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import Header from "@/components/layout/Header";
import { CurrencyCode } from "@/types";
import { CurrencySelector, currencyMap } from "@/components/settings/CurrencySelector";
import { mockTransactions } from "@/utils/mockData";
import { TransactionList } from "@/components/transactions/TransactionList";

export default function Transactions() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  
  const handleAddTransaction = (data: any) => {
    console.log("Adding transaction:", data);
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
              onClick={() => setIsTransactionFormOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <TransactionList transactions={mockTransactions} />
        </div>
      </main>

      <TransactionForm
        open={isTransactionFormOpen}
        onClose={() => setIsTransactionFormOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}
