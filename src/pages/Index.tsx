
import { useState } from "react";
import Header from "@/components/layout/Header";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { ExpansiveHomePage } from "@/components/dashboard/ExpansiveHomePage";

export default function Index() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  
  const handleAddTransaction = (data: any) => {
    console.log("Adding transaction:", data);
    setIsTransactionFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-20">
        <ExpansiveHomePage 
          budget={2000}
          spent={950}
          remaining={1090}
          todayExpenses={45}
          onAddTransaction={() => setIsTransactionFormOpen(true)}
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
